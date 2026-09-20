import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {downloadWhisperModel, installWhisperCpp, toCaptions, transcribe} from '@remotion/install-whisper-cpp';

const root = process.cwd();
const audio = path.join(root, 'out/etf-grid-trading/ETF网格交易操作指南.mp3');
const wav = path.join(root, 'out/etf-grid-trading/etf-grid-trading-16k.wav');
const whisperPath = path.join(root, 'whisper.cpp');

execFileSync('/opt/homebrew/bin/ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', audio, '-ar', '16000', '-ac', '1', wav]);
await installWhisperCpp({to: whisperPath, version: '1.5.5'});
await downloadWhisperModel({model: 'small', folder: whisperPath});
const whisperOutput = await transcribe({model: 'small', whisperPath, whisperCppVersion: '1.5.5', inputPath: wav, tokenLevelTimestamps: true, language: 'zh', printOutput: true});
const {captions} = toCaptions({whisperCppOutput: whisperOutput});
fs.writeFileSync(path.join(root, 'public/etf-grid-trading-captions.json'), JSON.stringify(captions, null, 2));
fs.writeFileSync(path.join(root, 'out/etf-grid-trading/etf-grid-trading-captions-raw.json'), JSON.stringify(captions, null, 2));
console.log(`Wrote ${captions.length} raw captions`);
