import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Arrow, C, Card, Footer, GridBackground, Headline, Pill, Subline, Tag, appear, rise, settle} from './Shared';

const questions = ['这公司靠什么赚钱？', '护城河能撑多久？', '5年后的盈利能估出来吗？', '估不出来怎么办？'];

export const BuffettQuestions: React.FC = () => {
  const frame = useCurrentFrame();
  const qPhase = frame < 780;
  const circlePhase = frame >= 780 && frame < 1080;
  const typePhase = frame >= 1080;
  const titleOpacity = appear(frame, 10, 20);
  const contentOpacity = appear(frame, 70, 22);
  return <AbsoluteFill>
    <GridBackground page="02 / 06" kicker="能力圈 · 4个问题" accent={C.blue}>
      {qPhase && <>
        <Headline top={126} size={74} style={{opacity: titleOpacity, translate: `0px ${rise(frame, 10)}px`}}>真正的选股，先过这4关</Headline>
        <Subline top={224} style={{opacity: titleOpacity}}>巴菲特不先看热闹，他先确认：自己到底能不能回答。</Subline>
        <div style={{position: 'absolute', left: 126, right: 126, top: 340, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, opacity: contentOpacity, translate: `0px ${rise(frame, 70)}px`}}>
          {questions.map((question, index) => <Card key={question} height={190} background={index % 2 === 0 ? '#FFFDF7' : C.paleGreen} shadow={index % 2 === 0 ? `8px 10px 0 ${C.blue}` : `8px 10px 0 ${C.orange}`} style={{position: 'relative', left: 0, top: 0, opacity: appear(frame, 90 + index * 70, 18), translate: `0px ${rise(frame, 90 + index * 70)}px`}}><div style={{display: 'flex', gap: 20, alignItems: 'center'}}><div style={{width: 58, height: 58, borderRadius: '50%', background: index === 3 ? C.orange : C.green, border: `3px solid ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, fontWeight: 950}}>0{index + 1}</div><div style={{fontSize: 31, fontWeight: 950}}>{question}</div></div><div style={{marginTop: 31, height: 3, width: `${50 + index * 12}%`, background: C.ink, opacity: 0.15}} /></Card>)}
        </div>
      </>}
      {circlePhase && <>
        <Headline top={136} size={80} style={{opacity: appear(frame, 780, 20), translate: `0px ${rise(frame, 780)}px`}}>承认不知道，本身就是能力</Headline>
        <Subline top={244} style={{opacity: appear(frame, 805, 20)}}>如果回答不出，就直接看下一家。</Subline>
        <div style={{position: 'absolute', left: 360, top: 385, width: 560, height: 260, borderRadius: '50%', border: `5px solid ${C.ink}`, background: 'rgba(142,217,239,0.52)', opacity: appear(frame, 820, 20), scale: settle(frame, 820)}}><div style={{position: 'absolute', left: 172, top: 74, fontSize: 42, fontWeight: 950, textAlign: 'center'}}>我能理解<br/><span style={{color: C.gray, fontSize: 26}}>企业 · 价格 · 风险</span></div></div>
        <div style={{position: 'absolute', left: 1000, top: 385, width: 560, height: 260, borderRadius: '50%', border: `5px solid ${C.ink}`, background: 'rgba(183,243,74,0.52)', opacity: appear(frame, 850, 20), scale: settle(frame, 850)}}><div style={{position: 'absolute', left: 168, top: 74, fontSize: 42, fontWeight: 950, textAlign: 'center'}}>我能坚持<br/><span style={{color: C.gray, fontSize: 26}}>波动 · 十年 · 不追热点</span></div></div>
        <div style={{position: 'absolute', left: 760, top: 480, fontSize: 45, fontWeight: 950, color: C.orange, opacity: appear(frame, 900, 20)}}>能力圈</div>
      </>}
      {typePhase && <>
        <Headline top={126} size={74} style={{opacity: appear(frame, 1080, 20), translate: `0px ${rise(frame, 1080)}px`}}>投资者，其实可以分成两类</Headline>
        <Subline top={224} style={{opacity: appear(frame, 1100, 20)}}>关键不是勇不勇，而是你到底懂不懂企业。</Subline>
        <Card x={126} y={350} width={730} height={350} background={C.paleGreen} shadow={`9px 11px 0 ${C.orange}`} style={{opacity: appear(frame, 1120, 20), translate: `0px ${rise(frame, 1120)}px`}}><Pill background={C.orange}>01 · 不懂企业</Pill><div style={{marginTop: 30, fontSize: 43, fontWeight: 950}}>想长期拥有美国企业</div><div style={{marginTop: 24, fontSize: 27, color: C.gray, fontWeight: 750}}>买指数基金，成本低，犯错少。</div><div style={{position: 'absolute', right: 40, bottom: 32, fontSize: 78, fontWeight: 950, color: C.orange}}>500</div></Card>
        <Card x={1064} y={350} width={730} height={350} background="#FFFDF7" shadow={`9px 11px 0 ${C.blue}`} style={{opacity: appear(frame, 1180, 20), translate: `0px ${rise(frame, 1180)}px`}}><Pill background={C.green}>02 · 真懂企业</Pill><div style={{marginTop: 30, fontSize: 43, fontWeight: 950}}>可以集中持股</div><div style={{marginTop: 24, fontSize: 27, color: C.gray, fontWeight: 750}}>5到10家公司，足够了。</div><div style={{position: 'absolute', right: 38, bottom: 20, fontSize: 86, fontWeight: 950, color: C.blue}}>5—10</div></Card>
        <div style={{position: 'absolute', left: 760, top: 770, opacity: appear(frame, 1260, 20)}}><Arrow size={58}/></div>
      </>}
      <Footer><span>{qPhase ? '4个问题 = 能力圈的入口' : circlePhase ? '知道边界，才知道怎么下注' : '懂企业的人集中，不懂的人分散'}</span><span>会动的信息图 · 02</span></Footer>
    </GridBackground>
  </AbsoluteFill>;
};
