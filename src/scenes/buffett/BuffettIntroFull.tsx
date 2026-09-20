import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Arrow, C, Card, Dots, Footer, GridBackground, Headline, Pill, Subline, Tag, appear, rise, settle} from './Shared';

export const BuffettIntroFull: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = appear(frame, 10, 24);
  const titleY = rise(frame, 10);
  const titleScale = interpolate(frame, [0, 190, 250], [0.96, 1, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cardsOpacity = appear(frame, 240, 24);
  const cardsY = rise(frame, 240);
  const closeOpacity = appear(frame, 570, 24);
  return <AbsoluteFill>
    <GridBackground page="01 / 06" kicker="巴菲特 · 指数基金">
      <div style={{position: 'absolute', left: 126, right: 126, top: 124, opacity: titleOpacity, translate: `0px ${titleY}px`, scale: titleScale, transformOrigin: 'left top'}}>
        <div style={{fontSize: 78, fontWeight: 950, lineHeight: 1.1}}>巴菲特一辈子都在挑公司，</div>
        <div style={{position: 'relative', display: 'inline-block', marginTop: 8, fontSize: 78, fontWeight: 950, lineHeight: 1.1}}>却建议普通人买指数？<div style={{position: 'absolute', left: 8, right: 0, bottom: -4, height: 18, background: C.orange, zIndex: -1, borderRadius: 8}} /></div>
        <div style={{marginTop: 22, color: C.gray, fontSize: 30, fontWeight: 700}}>这不是一句矛盾的话，而是一条能力圈的分界线。</div>
      </div>
      <div style={{position: 'absolute', left: 126, right: 126, top: 435, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: cardsOpacity, translate: `0px ${cardsY}px`}}>
        <Card width={620} height={250} background="#FFFDF7" shadow={`9px 11px 0 ${C.blue}`}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}><div><div style={{color: C.gray, fontWeight: 800, fontSize: 22, letterSpacing: 3}}>他自己</div><div style={{fontSize: 42, fontWeight: 950, marginTop: 8}}>挑公司 · 集中持股</div></div><div style={{width: 64, height: 64, borderRadius: '50%', border: `3px solid ${C.ink}`, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 950}}>股</div></div>
          <div style={{marginTop: 33, display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}><div style={{fontSize: 22, color: C.gray, fontWeight: 750}}>懂企业 · 懂价格 · 拿得住</div><Dots color={C.blue} frame={frame} from={260} /></div>
        </Card>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}><div style={{fontSize: 19, fontWeight: 900, color: C.gray}}>但是</div><Arrow size={58}/></div>
        <Card width={620} height={250} background={C.paleGreen} shadow={`9px 11px 0 ${C.orange}`}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}><div><div style={{color: C.gray, fontWeight: 800, fontSize: 22, letterSpacing: 3}}>给普通人</div><div style={{fontSize: 42, fontWeight: 950, marginTop: 8}}>低成本标普500</div></div><div style={{width: 64, height: 64, borderRadius: '50%', border: `3px solid ${C.ink}`, background: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 950}}>500</div></div>
          <div style={{marginTop: 33, display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}><div style={{fontSize: 22, color: C.gray, fontWeight: 750}}>成本低 · 少犯错 · 更容易坚持</div><Dots color={C.green} frame={frame} from={275} /></div>
        </Card>
      </div>
      <div style={{position: 'absolute', left: 126, right: 126, bottom: 100, textAlign: 'center', opacity: closeOpacity, translate: `0px ${rise(frame, 570)}px`, scale: settle(frame, 570)}}><Tag background={C.green}>先别急着问“谁更好”——先问自己“我能做到哪一种”</Tag></div>
      <Footer opacity={interpolate(frame, [0, 18, 690, 720], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}><span>《巴菲特让普通人买指数？》</span><span>会动的信息图 · 01</span></Footer>
    </GridBackground>
  </AbsoluteFill>;
};
