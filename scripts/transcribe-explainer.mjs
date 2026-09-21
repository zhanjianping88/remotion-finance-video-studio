import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {toCaptions, transcribe} from '@remotion/install-whisper-cpp';

const root = process.cwd();
const audio = path.join(root, 'out/etf-explainer/ETF到底是个啥？.mp3');
const wav = path.join(root, 'out/etf-explainer/etf-explainer-16k.wav');
const whisperPath = path.join(root, 'whisper.cpp');

execFileSync('/opt/homebrew/bin/ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', audio, '-ar', '16000', '-ac', '1', wav]);
const whisperOutput = await transcribe({
  model: 'small',
  whisperPath,
  whisperCppVersion: '1.5.5',
  inputPath: wav,
  tokenLevelTimestamps: true,
  language: 'zh',
  printOutput: true,
});
const {captions} = toCaptions({whisperCppOutput: whisperOutput});
fs.writeFileSync(path.join(root, 'out/etf-explainer/etf-explainer-captions-raw.json'), JSON.stringify(captions, null, 2));
console.log(`Wrote ${captions.length} raw captions`);
