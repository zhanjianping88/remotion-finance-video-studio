import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, Card, Footer, GridBackground, Headline, Pill, Subline, Tag, appear, rise, settle} from './Shared';

export const BuffettIndexMechanics: React.FC = () => {
  const frame = useCurrentFrame();
  const allocation = frame >= 600;
  const bars = [42, 30, 18, 10];
  const weightProgress = interpolate(frame, [110, 460], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill>
    <GridBackground page="05 / 06" kicker="指数基金 · 自动运行" accent={C.green}>
      {!allocation && <>
        <Headline top={128} size={88} style={{opacity: appear(frame, 8, 20), translate: `0px ${rise(frame, 8)}px`}}>其实就6个字：不去猜测市场</Headline>
        <Subline top={250} style={{opacity: appear(frame, 30, 20)}}>指数按照市值加权，把“谁更强”交给时间自己筛选。</Subline>
        <div style={{position: 'absolute', left: 126, top: 380, width: 700, opacity: appear(frame, 70, 20), translate: `0px ${rise(frame, 70)}px`}}><div style={{fontSize: 27, color: C.gray, fontWeight: 800, marginBottom: 20}}>一篮子公司</div>{bars.map((value, index) => <div key={value} style={{display: 'flex', alignItems: 'center', gap: 17, margin: '18px 0'}}><div style={{width: 120, fontSize: 22, fontWeight: 850}}>公司 {String.fromCharCode(65 + index)}</div><div style={{height: 36, width: 520, background: '#E6E6DD', border: `3px solid ${C.ink}`, borderRadius: 9, overflow: 'hidden'}}><div style={{height: '100%', width: `${value * weightProgress}%`, background: index === 0 ? C.orange : index === 1 ? C.blue : C.green}} /></div></div>)}</div>
        <Card x={970} y={360} width={824} height={360} background={C.paleGreen} shadow={`9px 11px 0 ${C.orange}`} style={{opacity: appear(frame, 160, 20), translate: `0px ${rise(frame, 160)}px`}}><Pill background={C.orange}>自动发生</Pill><div style={{marginTop: 28, fontSize: 34, fontWeight: 950}}>厉害的公司不断变大权重</div><div style={{marginTop: 19, fontSize: 34, fontWeight: 950}}>弱一点的公司自动被替换</div><div style={{marginTop: 32, color: C.gray, fontSize: 24, fontWeight: 750}}>你不需要押中下一家伟大公司。</div></Card>
      </>}
      {allocation && <>
        <Headline top={130} size={76} style={{opacity: appear(frame, 600, 20), translate: `0px ${rise(frame, 600)}px`}}>巴菲特给妻子的信托，怎么配？</Headline>
        <Subline top={240} style={{opacity: appear(frame, 625, 20)}}>答案非常简单：90%标普500 + 10%短期国债。</Subline>
        <div style={{position: 'absolute', left: 230, top: 390, width: 520, height: 260, borderRadius: '50%', background: C.green, border: `4px solid ${C.ink}`, opacity: appear(frame, 650, 20), scale: settle(frame, 650)}}><div style={{position: 'absolute', left: 118, top: 78, fontSize: 80, fontWeight: 950}}>90%</div><div style={{position: 'absolute', left: 153, top: 170, fontSize: 24, fontWeight: 900}}>标普500</div></div>
        <div style={{position: 'absolute', left: 720, top: 420, fontSize: 52, fontWeight: 950, color: C.orange, opacity: appear(frame, 700, 18)}}>＋</div>
        <div style={{position: 'absolute', left: 905, top: 420, width: 330, height: 190, borderRadius: '50%', background: C.blue, border: `4px solid ${C.ink}`, opacity: appear(frame, 720, 20), scale: settle(frame, 720)}}><div style={{position: 'absolute', left: 87, top: 50, fontSize: 68, fontWeight: 950}}>10%</div><div style={{position: 'absolute', left: 88, top: 130, fontSize: 23, fontWeight: 900}}>短期国债</div></div>
        <div style={{position: 'absolute', left: 1310, top: 394, width: 430, opacity: appear(frame, 760, 20), translate: `0px ${rise(frame, 760)}px`}}><Tag background={C.paleOrange}>不猜市场，也不把所有钱压在波动上</Tag></div>
      </>}
      <Footer><span>{allocation ? '简单配置，长期持有' : '把复杂的判断，交给指数的规则'}</span><span>会动的信息图 · 05</span></Footer>
    </GridBackground>
  </AbsoluteFill>;
};
