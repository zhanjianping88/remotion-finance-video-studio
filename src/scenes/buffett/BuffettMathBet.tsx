import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, Card, Footer, GridBackground, Headline, Pill, Subline, Tag, appear, rise, settle} from './Shared';

export const BuffettMathBet: React.FC = () => {
  const frame = useCurrentFrame();
  const math = frame < 660;
  const bet = frame >= 660;
  const fees = interpolate(frame, [280, 600], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const indexWidth = interpolate(frame, [800, 1040], [0, 410], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const activeWidth = interpolate(frame, [850, 1090], [0, 284], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill>
    <GridBackground page="04 / 06" kicker="主动基金 · 数学题" accent={C.blue}>
      {math && <>
        <Headline top={128} size={74} style={{opacity: appear(frame, 8, 20), translate: `0px ${rise(frame, 8)}px`}}>主动基金加在一起，拿到的就是市场本身</Headline>
        <Subline top={228} style={{opacity: appear(frame, 28, 20)}}>扣除成本以前，平均收益不可能超过市场。</Subline>
        <div style={{position: 'absolute', left: 126, top: 372, width: 760, height: 340, opacity: appear(frame, 70, 20), translate: `0px ${rise(frame, 70)}px`}}><div style={{position: 'absolute', left: 70, top: 120, width: 540, height: 6, background: C.ink, rotate: '-9deg'}} /><div style={{position: 'absolute', left: 610, top: 105, width: 90, height: 90, border: `4px solid ${C.ink}`, background: C.green, rotate: '12deg', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 33, fontWeight: 950}}>市场</div><div style={{position: 'absolute', left: 116, top: 28, fontSize: 31, fontWeight: 950}}>有人跑赢</div><div style={{position: 'absolute', left: 90, top: 205, fontSize: 31, fontWeight: 950}}>就有人跑输</div><div style={{position: 'absolute', left: 320, top: 145, fontSize: 46, color: C.orange, fontWeight: 950}}>↔</div></div>
        <Card x={980} y={348} width={814} height={390} background="#FFFDF7" shadow={`9px 11px 0 ${C.orange}`} style={{opacity: appear(frame, 140, 20), translate: `0px ${rise(frame, 140)}px`}}><Pill background={C.orange}>但主动还要付额外代价</Pill><div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 17}}>{['管理费', '佣金', '税收', '情绪损耗'].map((label, index) => <div key={label} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: appear(frame, 260 + index * 55, 14)}}><div style={{width: 18, height: 18, borderRadius: '50%', background: index === 3 ? C.orange : C.blue, border: `2px solid ${C.ink}`}} /><div style={{fontSize: 27, fontWeight: 850}}>{label}</div><div style={{height: 12, flex: 1, background: '#E8E8E0', borderRadius: 8, overflow: 'hidden'}}><div style={{width: `${(index + 1) * 18 * fees}%`, height: '100%', background: index === 3 ? C.orange : C.blue}} /></div></div>)}</div><div style={{marginTop: 26, fontSize: 31, fontWeight: 950}}>主动的整体，必然落后市场平均。</div></Card>
      </>}
      {bet && <>
        <Headline top={130} size={80} style={{opacity: appear(frame, 660, 20), translate: `0px ${rise(frame, 660)}px`}}>2007年，巴菲特做了一个赌约</Headline>
        <Subline top={240} style={{opacity: appear(frame, 685, 20)}}>十年后，数字把“平均”这件事说得很直白。</Subline>
        <div style={{position: 'absolute', left: 126, right: 126, top: 370, opacity: appear(frame, 720, 20), translate: `0px ${rise(frame, 720)}px`}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 18}}><div style={{fontSize: 25, fontWeight: 900, color: C.gray}}>十年累计收益</div><div style={{fontSize: 21, color: C.gray}}>2007 → 2017</div></div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 30}}><div style={{display: 'flex', alignItems: 'center', gap: 25}}><div style={{width: 150, fontSize: 31, fontWeight: 950}}>标普500</div><div style={{height: 70, width: 620, border: `3px solid ${C.ink}`, borderRadius: 14, overflow: 'hidden', background: '#FFFDF7'}}><div style={{height: '100%', width: indexWidth, background: C.green}} /></div><div style={{fontSize: 66, fontWeight: 950, color: C.ink}}>125.8%</div></div><div style={{display: 'flex', alignItems: 'center', gap: 25}}><div style={{width: 150, fontSize: 31, fontWeight: 950}}>最佳主动</div><div style={{height: 70, width: 620, border: `3px solid ${C.ink}`, borderRadius: 14, overflow: 'hidden', background: '#FFFDF7'}}><div style={{height: '100%', width: activeWidth, background: C.orange}} /></div><div style={{fontSize: 66, fontWeight: 950, color: C.ink}}>87.7%</div></div></div>
          <div style={{marginTop: 55, display: 'flex', justifyContent: 'center'}}><Tag background={C.paleGreen}>到了2025年：79%的美国大型主动基金跑输标普500</Tag></div>
        </div>
      </>}
      <Footer><span>{math ? '成本，是主动管理最容易忽略的变量' : '平均收益，不等于平庸的结果'}</span><span>会动的信息图 · 04</span></Footer>
    </GridBackground>
  </AbsoluteFill>;
};
