import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {downloadWhisperModel, installWhisperCpp, toCaptions, transcribe} from '@remotion/install-whisper-cpp';

const root = process.cwd();
const audio = path.join(root, 'out/retirement-dividend-etf/攒够100万，全买红利ETF退休？.mp3');
const wav = path.join(root, 'out/retirement-dividend-etf/retirement-dividend-etf-16k.wav');
const whisperPath = path.join(root, 'whisper.cpp');

execFileSync('/opt/homebrew/bin/ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', audio, '-ar', '16000', '-ac', '1', wav]);
await installWhisperCpp({to: whisperPath, version: '1.5.5'});
await downloadWhisperModel({model: 'small', folder: whisperPath});

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
fs.writeFileSync(path.join(root, 'public/retirement-dividend-etf-captions.json'), JSON.stringify(captions, null, 2));
fs.writeFileSync(path.join(root, 'out/retirement-dividend-etf/retirement-dividend-etf-captions.json'), JSON.stringify(captions, null, 2));
console.log(`Wrote ${captions.length} captions`);
