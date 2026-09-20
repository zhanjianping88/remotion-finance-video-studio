import json
import re
from pathlib import Path
from zhconv import convert

root = Path(__file__).resolve().parents[1]
script = (root / 'out/retirement-dividend-etf/攒够100万，全买红利ETF退休？.txt').read_text()
script = re.sub(r'^\s*\*\*《.*?》\*\*\s*$', '', script, flags=re.M)
script = re.sub(r'\*\*', '', script).strip()
script = convert(script, 'zh-cn').replace('"', '').replace('“', '').replace('”', '')
paragraphs = [p.strip() for p in re.split(r'\n\s*\n', script) if p.strip()]

first_rate, second_rate = paragraphs[5].split('换个假设试试：', 1)
first_spend, second_spend = paragraphs[9].split('但你要花5000', 1)
groups = [
    [paragraphs[0], paragraphs[1], paragraphs[2]],
    [paragraphs[3], paragraphs[4], first_rate + '换个假设试试：'],
    [second_rate, paragraphs[6]],
    [paragraphs[7], paragraphs[8], first_spend],
    ['但你要花5000' + second_spend],
    [paragraphs[10]],
    [paragraphs[11], paragraphs[12]],
    [paragraphs[13], paragraphs[14]],
    [paragraphs[15]],
    [paragraphs[16], paragraphs[17]],
    [paragraphs[18], paragraphs[19]],
    [paragraphs[20], paragraphs[21]],
    [paragraphs[22]],
    [paragraphs[23], paragraphs[24], paragraphs[25], paragraphs[26], paragraphs[27]],
    [paragraphs[28], paragraphs[29]],
    [paragraphs[30]],
    [paragraphs[31]],
    [paragraphs[32]],
]

scene_starts = [0, 17.1, 37.0, 62.0, 76.0, 90.5, 110.0, 130.0, 150.0, 175.0, 190.5, 196.7, 224.0, 230.0, 256.0, 284.5, 306.0, 313.0]
scene_ends = scene_starts[1:] + [322.822]

def key_count(text):
    return len(re.findall(r'[\u4e00-\u9fffA-Za-z0-9%]', text))

def units(text):
    return re.findall(r'ETF|[A-Za-z]+|\d+(?:\.\d+)?|.', text, flags=re.S)

captions = []
for group_index, group in enumerate(groups):
    text = ''.join(group)
    group_start = scene_starts[group_index] * 1000
    group_end = scene_ends[group_index] * 1000
    duration = group_end - group_start
    total = max(1, key_count(text))
    consumed = 0
    current = ''
    current_start_weight = 0
    for unit in units(text):
        if unit.isspace():
            continue
        punctuation = not bool(re.match(r'[\u4e00-\u9fffA-Za-z0-9%]', unit[0]))
        if punctuation and not current:
            continue
        if current and not punctuation and len(current) + len(unit) > 16:
            start_ms = group_start + duration * current_start_weight / total
            end_ms = group_start + duration * consumed / total
            captions.append({'text': current, 'startMs': round(start_ms), 'endMs': max(round(end_ms), round(start_ms) + 120), 'timestampMs': round(start_ms), 'confidence': 1})
            current = ''
            current_start_weight = consumed
        if not current:
            current_start_weight = consumed
        current += unit
        consumed += key_count(unit)
        if punctuation:
            start_ms = group_start + duration * current_start_weight / total
            end_ms = group_start + duration * consumed / total
            captions.append({'text': current, 'startMs': round(start_ms), 'endMs': max(round(end_ms), round(start_ms) + 120), 'timestampMs': round(start_ms), 'confidence': 1})
            current = ''
    if current:
        start_ms = group_start + duration * current_start_weight / total
        end_ms = group_start + duration * consumed / total
        captions.append({'text': current, 'startMs': round(start_ms), 'endMs': max(round(end_ms), round(start_ms) + 120), 'timestampMs': round(start_ms), 'confidence': 1})

# Clamp any rounding overlap and ensure punctuation stays at the end of a caption.
for i, caption in enumerate(captions):
    caption['text'] = caption['text'].lstrip('，。！？；：,!?;: ')
    if i and caption['startMs'] < captions[i - 1]['startMs']:
        caption['startMs'] = captions[i - 1]['startMs']
    if caption['endMs'] <= caption['startMs']:
        caption['endMs'] = caption['startMs'] + 120

payload = json.dumps(captions, ensure_ascii=False, indent=2)
(root / 'out/retirement-dividend-etf/retirement-dividend-etf-captions.json').write_text(payload)
(root / 'src/retirementCaptions.ts').write_text('export const RETIREMENT_CAPTIONS = ' + payload + ' as const;\n')
print(f'Wrote {len(captions)} script captions')
