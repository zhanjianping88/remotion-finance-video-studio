import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, Card, Dots, Footer, GridBackground, Headline, Pill, Subline, appear, rise} from './Shared';

const advantages = [
  ['01', '全身心研究企业', '把时间全部用在理解生意上。', C.blue],
  ['02', '保险浮存金撑底', '资金结构让他能长期持有。', C.green],
  ['03', '恐慌中敢砸巨资', '别人害怕时，他有能力下注。', C.orange],
  ['04', '没有赎回压力', '不用因为短期波动被迫卖出。', '#E4C9FF'],
];

export const BuffettAdvantages: React.FC = () => {
  const frame = useCurrentFrame();
  const last = frame > 1050;
  return <AbsoluteFill>
    <GridBackground page="03 / 06" kicker="优势 · 不可复制" accent={C.orange}>
      <Headline top={126} size={74} style={{opacity: appear(frame, 10, 20), translate: `0px ${rise(frame, 10)}px`}}>别忘了，他有4个普通人复制不了的优势</Headline>
      <Subline top={224} style={{opacity: appear(frame, 28, 20)}}>集中持股的结果，背后是更强的研究、资金和心理结构。</Subline>
      {!last && <div style={{position: 'absolute', left: 126, right: 126, top: 346, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28}}>{advantages.map(([num, title, desc, color], index) => <Card key={num} height={225} background={index % 2 === 0 ? '#FFFDF7' : '#F3FCDD'} shadow={`8px 10px 0 ${color}`} style={{position: 'relative', left: 0, top: 0, opacity: appear(frame, 70 + index * 90, 20), translate: `0px ${rise(frame, 70 + index * 90)}px`}}><div style={{display: 'flex', alignItems: 'center', gap: 18}}><div style={{width: 58, height: 58, borderRadius: '50%', background: color, border: `3px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: 24}}>{num}</div><div style={{fontSize: 34, fontWeight: 950}}>{title}</div></div><div style={{marginTop: 24, fontSize: 24, color: C.gray, fontWeight: 700}}>{desc}</div></Card>)}</div>}
      {last && <div style={{position: 'absolute', left: 126, right: 126, top: 362, opacity: appear(frame, 1050, 20), translate: `0px ${rise(frame, 1050)}px`}}><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}><div style={{height: 4, width: 150, background: C.ink}} /><Pill background={C.orange}>集中持股的前提</Pill><div style={{height: 4, width: 150, background: C.ink}} /></div><div style={{marginTop: 40, display: 'flex', justifyContent: 'center', gap: 26}}>{['研究够深', '资金够稳', '心理够强'].map((label, index) => <div key={label} style={{width: 430, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: index === 1 ? C.paleGreen : '#FFFDF7', border: `3px solid ${C.ink}`, borderRadius: 22, boxShadow: `8px 9px 0 ${index === 1 ? C.orange : C.blue}`, opacity: appear(frame, 1070 + index * 50, 16), translate: `0px ${rise(frame, 1070 + index * 50)}px`}}><div style={{fontSize: 34, fontWeight: 950}}>{label}</div><Dots color={index === 1 ? C.green : C.blue} frame={frame} from={1090 + index * 50}/></div>)}</div><div style={{marginTop: 38, textAlign: 'center', fontSize: 33, fontWeight: 950}}>普通人最难复制的，往往不是方法，而是条件。</div></div>}
      <Footer><span>{last ? '优势是系统，不是一个指标' : '集中持股之前，先看自己有没有这些底牌'}</span><span>会动的信息图 · 03</span></Footer>
    </GridBackground>
  </AbsoluteFill>;
};
