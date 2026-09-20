import difflib
import json
import re
from pathlib import Path
from zhconv import convert

root = Path(__file__).resolve().parents[1]
script_path = root / 'out/retirement-dividend-etf/攒够100万，全买红利ETF退休？.txt'
raw_script = script_path.read_text()
raw_script = re.sub(r'^\s*\*\*《.*?》\*\*\s*$', '', raw_script, flags=re.M)
display_script = re.sub(r'\*\*', '', raw_script).strip()
display_script = convert(display_script, 'zh-cn')

raw_captions = json.loads((root / 'public/retirement-dividend-etf-captions.json').read_text())
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
source_key = ''.join(key_char(c) for c in source_chars)
source_key_indices = [i for i, c in enumerate(source_chars) if key_char(c)]
source_char_to_key = {}
for key_index, char_index in enumerate(source_key_indices):
    source_char_to_key[char_index] = key_index
recognized_key = ''.join(key_char(c['char']) for c in rec_chars)

matcher = difflib.SequenceMatcher(None, source_key, recognized_key, autojunk=False)
source_to_rec = {}
for tag, a1, a2, b1, b2 in matcher.get_opcodes():
    if tag == 'equal':
        for offset in range(a2 - a1):
            source_to_rec[a1 + offset] = b1 + offset
    else:
        span_a = max(1, a2 - a1)
        span_b = max(1, b2 - b1)
        for offset in range(a2 - a1):
            source_to_rec[a1 + offset] = min(len(rec_chars) - 1, b1 + round(offset * span_b / span_a))

def time_for_source_index(source_key_index, end=False):
    if not source_to_rec:
        return 0
    mapped = source_to_rec.get(source_key_index)
    if mapped is None:
        nearest = min(source_to_rec, key=lambda k: abs(k - source_key_index))
        mapped = source_to_rec[nearest]
    return rec_chars[mapped]['endMs' if end else 'startMs']

def attach_times(text, source_start):
    key_positions = [source_char_to_key[source_start + i] for i, c in enumerate(text) if key_char(c) and source_start + i in source_char_to_key]
    if not key_positions:
        return 0, 0
    start_key = min(key_positions)
    end_key = max(key_positions)
    return time_for_source_index(start_key), time_for_source_index(end_key, end=True)

def split_units(text):
    # Keep ETF, numbers, and Latin words intact so a caption never breaks them.
    return re.findall(r'ETF|[A-Za-z]+|\d+(?:\.\d+)?|.', text, flags=re.S)

chunks = []
source_cursor = 0
for paragraph in display_script.splitlines():
    paragraph = paragraph.strip()
    if not paragraph:
        source_cursor += 1
        continue
    units = split_units(paragraph)
    current = ''
    current_start = source_cursor
    for unit in units:
        if unit.isspace():
            source_cursor += len(unit)
            continue
        is_punctuation = not bool(key_char(unit[0]))
        if is_punctuation and not current:
            source_cursor += len(unit)
            continue
        if current and not is_punctuation and len(current) + len(unit) > 16:
            start_ms, end_ms = attach_times(current, current_start)
            chunks.append({'text': current, 'startMs': round(start_ms), 'endMs': round(end_ms), 'timestampMs': round(start_ms), 'confidence': 1})
            current = ''
            current_start = source_cursor
        current += unit
        source_cursor += len(unit)
        if is_punctuation:
            start_ms, end_ms = attach_times(current, current_start)
            chunks.append({'text': current, 'startMs': round(start_ms), 'endMs': round(end_ms), 'timestampMs': round(start_ms), 'confidence': 1})
            current = ''
            current_start = source_cursor
    if current:
        start_ms, end_ms = attach_times(current, current_start)
        chunks.append({'text': current, 'startMs': round(start_ms), 'endMs': round(end_ms), 'timestampMs': round(start_ms), 'confidence': 1})
    source_cursor += 1

# Remove any accidental leading punctuation and make each next caption start
# no earlier than the previous one. A small overlap is intentional for natural
# Chinese punctuation, but no caption begins with a comma or question mark.
cleaned = []
for chunk in chunks:
    text = chunk['text'].lstrip('，。！？；：,!?;: ')
    if not text:
        continue
    if cleaned:
        chunk['startMs'] = max(chunk['startMs'], cleaned[-1]['startMs'])
        if chunk['endMs'] <= chunk['startMs']:
            chunk['endMs'] = chunk['startMs'] + 120
    chunk['text'] = text
    cleaned.append(chunk)

payload = json.dumps(cleaned, ensure_ascii=False, indent=2)
(root / 'out/retirement-dividend-etf/retirement-dividend-etf-captions.json').write_text(payload)
(root / 'src/retirementCaptions.ts').write_text('export const RETIREMENT_CAPTIONS = ' + payload + ' as const;\n')
print(f'Wrote {len(cleaned)} script-aligned captions')
