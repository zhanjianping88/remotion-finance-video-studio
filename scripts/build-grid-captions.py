import difflib
import json
import re
from pathlib import Path
from zhconv import convert

root = Path(__file__).resolve().parents[1]
script = (root / 'out/etf-grid-trading/ETF网格交易操作指南.txt').read_text()
script = re.sub(r'^\s*\*\*《.*?》\*\*\s*$', '', script, flags=re.M)
script = re.sub(r'\*\*', '', script).strip()
script = convert(script, 'zh-cn').replace('“', '').replace('”', '').replace('"', '')
raw = json.loads((root / 'out/etf-grid-trading/etf-grid-trading-captions-raw.json').read_text())

rec_chars = []
for item in raw:
    txt = convert(item['text'], 'zh-cn')
    txt = re.sub(r'[\s"“”]', '', txt).replace('�', '')
    if not txt:
        continue
    span = max(1, len(txt))
    for i, ch in enumerate(txt):
        rec_chars.append({'char': ch, 'startMs': item['startMs'] + (item['endMs'] - item['startMs']) * i / span, 'endMs': item['startMs'] + (item['endMs'] - item['startMs']) * (i + 1) / span})

def key_char(ch):
    return ch if re.match(r'[\u4e00-\u9fffA-Za-z0-9%]', ch) else ''

source_chars = list(script)
source_key_indices = [i for i, ch in enumerate(source_chars) if key_char(ch)]
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
    mapped = source_to_rec.get(key_index)
    if mapped is None:
        nearest = min(source_to_rec, key=lambda k: abs(k - key_index))
        mapped = source_to_rec[nearest]
    return rec_chars[mapped]['endMs' if end else 'startMs']

def source_time(char_index, end=False):
    keys = [source_char_to_key[i] for i in range(char_index, len(source_chars)) if i in source_char_to_key]
    return time_for_key(keys[0] if keys else 0, end=end)

def split_units(text):
    return re.findall(r'ETF|A股|\d+(?:\.\d+)?|[A-Za-z]+|.', text, flags=re.S)

captions = []
cursor = 0
paragraph_bounds = []
for paragraph in script.splitlines():
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
            cursor += len(unit)
            continue
        if current and not is_punctuation and len(current) + len(unit) > 16:
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

# The scene plan follows complete spoken sections, using the first paragraph of each group.
groups = [[0, 1], [2, 3], [4], [5, 6], [7], [8, 9], [10], [11, 12, 13], [14], [15, 16], [17, 18], [19], [20, 21], [22], [23]]
starts = [source_time(paragraph_bounds[group[0]][1]) / 1000 for group in groups]
starts[0] = 0.0
duration = 386.252
print('scene_starts =', [round(x, 3) for x in starts])
print('paragraph_starts =')
for i, (txt, pos) in enumerate(paragraph_bounds):
    print(i, round(source_time(pos) / 1000, 3), txt[:50])

payload = json.dumps(cleaned, ensure_ascii=False, indent=2)
(root / 'out/etf-grid-trading/etf-grid-trading-captions.json').write_text(payload)
(root / 'src/etfGridCaptions.ts').write_text('export const ETF_GRID_CAPTIONS = ' + payload + ' as const;\n')
(root / 'out/etf-grid-trading/scene-starts.json').write_text(json.dumps(starts, ensure_ascii=False, indent=2))
print(f'Wrote {len(cleaned)} script-aligned captions')
