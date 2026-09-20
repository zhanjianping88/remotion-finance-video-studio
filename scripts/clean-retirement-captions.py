import json
import re
from pathlib import Path
from zhconv import convert

root = Path(__file__).resolve().parents[1]
raw = json.loads((root / 'public/retirement-dividend-etf-captions.json').read_text())
tokens = []
for item in raw:
    text = convert(item['text'], 'zh-cn')
    text = re.sub(r'[\s"“”]', '', text).replace('�', '')
    text = text.replace('健平', '剑平').replace('自助房', '自住房')
    if text:
        tokens.append({**item, 'text': text})

chunks = []
current = ''
start = None
end = None
for token in tokens:
    token_start = token['startMs']
    token_end = token['endMs']
    should_flush = current and (
        token_start - start >= 1650 or
        len(current) + len(token['text']) > 17 or
        (token['text'] in '。！？' and token_start - start > 650)
    )
    if should_flush:
        chunks.append({'text': current, 'startMs': start, 'endMs': end, 'timestampMs': start, 'confidence': 1})
        current = ''
        start = None
    if start is None:
        start = token_start
    current += token['text']
    end = token_end
if current:
    chunks.append({'text': current, 'startMs': start, 'endMs': end, 'timestampMs': start, 'confidence': 1})

for chunk in chunks:
    chunk['text'] = (chunk['text']
        .replace('健平', '剑平')
        .replace('说他到100万', '说他攒到100万')
        .replace('正的做法是把钱分成三', '正确的做法是把钱分成三桶')
        .replace('立于市的应急钱', '独立于股市的应急钱')
        .replace('出正在下的资产', '迫卖出正在下跌的资产')
        .replace('自助房', '自住房'))

(root / 'out/retirement-dividend-etf/retirement-dividend-etf-captions.json').write_text(json.dumps(chunks, ensure_ascii=False, indent=2))
(root / 'src/retirementCaptions.ts').write_text('export const RETIREMENT_CAPTIONS = ' + json.dumps(chunks, ensure_ascii=False, indent=2) + ' as const;\n')
print(f'Wrote {len(chunks)} cleaned captions')
