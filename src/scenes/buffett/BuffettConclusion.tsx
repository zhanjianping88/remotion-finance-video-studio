import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, Card, Footer, GridBackground, Headline, Pill, Subline, Tag, appear, rise, settle} from './Shared';

export const BuffettConclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const caution = frame >= 510;
  return <AbsoluteFill>
    <GridBackground page="06 / 06" kicker="普通人的答案" accent={C.orange}>
      {!caution && <>
        <Headline top={126} size={78} style={{opacity: appear(frame, 8, 20), translate: `0px ${rise(frame, 8)}px`}}>指数对普通人的两个好处</Headline>
        <Subline top={242} style={{opacity: appear(frame, 26, 20)}}>把问题变简单，把成本降下来。</Subline>
        <Card x={126} y={382} width={790} height={300} background="#FFFDF7" shadow={`9px 11px 0 ${C.blue}`} style={{opacity: appear(frame, 70, 20), translate: `0px ${rise(frame, 70)}px`}}><Pill background={C.blue}>01 · 把问题变简单</Pill><div style={{marginTop: 28, fontSize: 35, fontWeight: 950}}>选股要判断公司、管理层、估值</div><div style={{marginTop: 18, fontSize: 28, color: C.gray, fontWeight: 750}}>买指数，只需要相信国运。</div></Card>
        <Card x={1004} y={382} width={790} height={300} background={C.paleGreen} shadow={`9px 11px 0 ${C.orange}`} style={{opacity: appear(frame, 180, 20), translate: `0px ${rise(frame, 180)}px`}}><Pill background={C.orange}>02 · 成本更低</Pill><div style={{marginTop: 28, fontSize: 35, fontWeight: 950}}>费率在买入之前就能锁定</div><div style={{marginTop: 18, fontSize: 28, color: C.gray, fontWeight: 750}}>每年少扣一点，复利下来就是天壤之别。</div></Card>
        <div style={{position: 'absolute', left: 126, right: 126, bottom: 112, display: 'flex', justifyContent: 'center', opacity: appear(frame, 360, 20)}}><Tag background={C.green}>简单、便宜、容易拿得住</Tag></div>
      </>}
      {caution && <>
        <Headline top={120} size={78} style={{opacity: appear(frame, 510, 20), translate: `0px ${rise(frame, 510)}px`}}>最后，泼一盆冷水</Headline>
        <Subline top={230} style={{opacity: appear(frame, 530, 20)}}>指数不消灭波动，巴菲特自己也跌过50%。</Subline>
        <div style={{position: 'absolute', left: 126, top: 360, width: 720, height: 250, border: `3px solid ${C.ink}`, borderRadius: 22, background: '#FFFDF7', boxShadow: `8px 10px 0 ${C.blue}`, opacity: appear(frame, 560, 20), translate: `0px ${rise(frame, 560)}px`}}><div style={{position: 'absolute', left: 42, top: 34, fontSize: 23, fontWeight: 850, color: C.gray}}>浮亏承受力</div><div style={{position: 'absolute', left: 42, top: 78, fontSize: 70, fontWeight: 950, color: C.orange}}>-50%</div><div style={{position: 'absolute', left: 42, right: 42, bottom: 39, height: 16, background: '#E7E7DF', borderRadius: 12, overflow: 'hidden'}}><div style={{width: `${interpolate(frame, [590, 680], [0, 50], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`, height: '100%', background: C.orange}} /></div></div>
        <Card x={980} y={360} width={814} height={250} background={C.paleGreen} shadow={`8px 10px 0 ${C.orange}`} style={{opacity: appear(frame, 610, 20), translate: `0px ${rise(frame, 610)}px`}}><Pill background={C.orange}>买之前再看两眼</Pill><div style={{marginTop: 25, display: 'flex', gap: 16, alignItems: 'center'}}><div style={{fontSize: 32, fontWeight: 950}}>场内溢价</div><div style={{fontSize: 35, color: C.orange}}>＋</div><div style={{fontSize: 32, fontWeight: 950}}>跟踪误差</div></div><div style={{marginTop: 20, color: C.gray, fontSize: 23, fontWeight: 750}}>溢价太高，好指数也可能赚不到钱。</div></Card>
        <div style={{position: 'absolute', left: 126, right: 126, bottom: 96, textAlign: 'center', opacity: appear(frame, 760, 20), translate: `0px ${rise(frame, 760)}px`}}><div style={{fontSize: 30, fontWeight: 900, color: C.gray}}>实在不知道怎么看？</div><div style={{marginTop: 13}}><Tag background={C.green}>就买场外的。你是主动选股，还是被动指数？</Tag></div></div>
      </>}
      <Footer opacity={interpolate(frame, [0, 20, 940, 960], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}><span>点赞 · 收藏 · 关注</span><span>{caution ? '下期见' : '会动的信息图 · 06'}</span></Footer>
    </GridBackground>
  </AbsoluteFill>;
};
