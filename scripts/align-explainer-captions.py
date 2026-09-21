import difflib
import json
import re
from pathlib import Path

try:
    from zhconv import convert
except ImportError:
    convert = lambda value, _: value

root = Path(__file__).resolve().parents[1]
script_path = root / 'out/etf-explainer/ETF到底是个啥？.txt'
raw_script = script_path.read_text()
display_script = re.sub(r'\*\*', '', raw_script).strip()
display_script = convert(display_script, 'zh-cn')
raw_captions = json.loads((root / 'out/etf-explainer/etf-explainer-captions-raw.json').read_text())

rec_chars = []
for item in raw_captions:
    text = convert(item['text'], 'zh-cn')
    text = re.sub(r'[\s"“”]', '', text).replace('�', '')
    if not text:
        continue
    span = max(1, len(text))
    for i, char in enumerate(text):
        rec_chars.append({
            'char': char,
            'startMs': item['startMs'] + (item['endMs'] - item['startMs']) * i / span,
            'endMs': item['startMs'] + (item['endMs'] - item['startMs']) * (i + 1) / span,
        })

def key_char(char):
    return char if re.match(r'[\u4e00-\u9fffA-Za-z0-9%]', char) else ''

source_chars = list(display_script)
source_key_indices = [i for i, char in enumerate(source_chars) if key_char(char)]
source_key = ''.join(key_char(source_chars[i]) for i in source_key_indices)
source_char_to_key = {char_index: key_index for key_index, char_index in enumerate(source_key_indices)}
recognized_key = ''.join(key_char(item['char']) for item in rec_chars)
matcher = difflib.SequenceMatcher(None, source_key, recognized_key, autojunk=False)
source_to_rec = {}
for tag, a1, a2, b1, b2 in matcher.get_opcodes():
    if tag == 'equal':
        for offset in range(a2 - a1):
            source_to_rec[a1 + offset] = b1 + offset
    else:
        span_a, span_b = max(1, a2 - a1), max(1, b2 - b1)
        for offset in range(a2 - a1):
            source_to_rec[a1 + offset] = min(len(rec_chars) - 1, b1 + round(offset * span_b / span_a))

def time_for_key(key_index, end=False):
    if not source_to_rec or not rec_chars:
        return 0
    mapped = source_to_rec.get(key_index)
    if mapped is None:
        nearest = min(source_to_rec, key=lambda key: abs(key - key_index))
        mapped = source_to_rec[nearest]
    return rec_chars[mapped]['endMs' if end else 'startMs']

def source_time(char_index, end=False):
    keys = [source_char_to_key[i] for i in range(char_index, len(source_chars)) if i in source_char_to_key]
    return time_for_key(keys[0] if keys else 0, end=end)

def split_units(text):
    return re.findall(r'ETF|APP|A股|\d+(?:\.\d+)?|[A-Za-z]+|.', text, flags=re.S)

captions = []
cursor = 0
paragraph_bounds = []
for paragraph in display_script.splitlines():
    line_start = cursor
    line = paragraph.strip()
    if not line:
        cursor += 1
        continue
    left = line_start + len(paragraph) - len(paragraph.lstrip())
    paragraph_bounds.append((line, left))
    current = ''
    current_start = left
    local_cursor = left
    for unit in split_units(line):
        if unit.isspace():
            local_cursor += len(unit)
            continue
        is_punctuation = not bool(key_char(unit[0]))
        if is_punctuation and not current:
            local_cursor += len(unit)
            continue
        if current and not is_punctuation and len(current) + len(unit) > 17:
            start = source_time(current_start)
            end = source_time(current_start + len(current), end=True)
            captions.append({'text': current, 'startMs': round(start), 'endMs': max(round(end), round(start) + 120), 'timestampMs': round(start), 'confidence': 1})
            current = ''
            current_start = local_cursor
        current += unit
        local_cursor += len(unit)
        if is_punctuation:
            start = source_time(current_start)
            end = source_time(current_start + len(current), end=True)
            captions.append({'text': current, 'startMs': round(start), 'endMs': max(round(end), round(start) + 120), 'timestampMs': round(start), 'confidence': 1})
            current = ''
            current_start = local_cursor
    if current:
        start = source_time(current_start)
        end = source_time(current_start + len(current), end=True)
        captions.append({'text': current, 'startMs': round(start), 'endMs': max(round(end), round(start) + 120), 'timestampMs': round(start), 'confidence': 1})
    cursor += len(paragraph) + 1

cleaned = []
for item in captions:
    item['text'] = item['text'].lstrip('，。！？；：、,!?;: ')
    if not item['text']:
        continue
    if cleaned:
        item['startMs'] = max(item['startMs'], cleaned[-1]['startMs'])
        if item['endMs'] <= item['startMs']:
            item['endMs'] = item['startMs'] + 120
    cleaned.append(item)

# Scene groups follow complete spoken sections. Each scene starts at the first
# paragraph in the group, so the page never advances before its narration.
groups = [
    [0], [1], [2], [3, 4], [5], [6, 7, 8], [9, 10], [11, 12, 13, 14, 15],
    [16, 17, 18], [19, 20, 21, 22, 23], [24, 25, 26], [27, 28, 29, 30],
    [31, 32, 33, 34], [35, 36, 37], [38, 39, 40], [41, 42, 43, 44, 45],
    [46], [47, 48], [49, 50], [51], [52],
]
starts = [source_time(paragraph_bounds[group[0]][1]) / 1000 for group in groups]
starts[0] = 0.0
# The fee paragraph contains two distinct visual beats. Split it at the
# sentence that begins the account-rate explanation instead of holding one
# page on screen for the whole long paragraph.
fee_split = source_time(paragraph_bounds[46][1] + 106) / 1000
starts.insert(17, fee_split)

payload = json.dumps(cleaned, ensure_ascii=False, indent=2)
(root / 'out/etf-explainer/etf-explainer-captions.json').write_text(payload)
(root / 'src/etfExplainerCaptions.ts').write_text('export const ETF_EXPLAINER_CAPTIONS = ' + payload + ' as const;\n')
(root / 'src/etfExplainerSceneStarts.ts').write_text('export const ETF_EXPLAINER_SCENE_STARTS = ' + json.dumps([round(value, 3) for value in starts]) + ' as const;\n')
(root / 'out/etf-explainer/scene-starts.json').write_text(json.dumps(starts, ensure_ascii=False, indent=2))
print('scene_starts =', [round(value, 3) for value in starts])
print(f'Wrote {len(cleaned)} script-aligned captions')
