import React from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';

const font = '"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", Arial, sans-serif';
const ink = '#171717';
const paper = '#F8F7EF';
const orange = '#FF725B';
const green = '#B7F34A';
const blue = '#8ED9EF';

const rise = (frame: number, from: number, duration = 18) => interpolate(frame, [from, from + duration], [28, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
const appear = (frame: number, from: number, duration = 14) => interpolate(frame, [from, from + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});

const ShadowCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  shadow?: string;
}> = ({children, style, shadow = `8px 10px 0 ${blue}, 14px 16px 0 ${orange}`}) => (
  <div style={{background: paper, border: `3px solid ${ink}`, borderRadius: 26, boxShadow: shadow, ...style}}>{children}</div>
);

const DotMatrix: React.FC<{frame: number; color: string; count?: number}> = ({frame, color, count = 5}) => (
  <div style={{display: 'flex', alignItems: 'end', gap: 9, height: 48}}>
    {Array.from({length: count}).map((_, index) => (
      <div key={index} style={{width: 13, height: 12 + (index % 3) * 8, borderRadius: 4, background: color, transformOrigin: 'bottom', scale: `${interpolate(frame, [70 + index * 4, 86 + index * 4], [0.1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)})} 1`}} />
    ))}
  </div>
);

export const BuffettIndex10s: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = appear(frame, 10, 18);
  const titleY = rise(frame, 10);
  const titleScale = interpolate(frame, [0, 78, 110], [0.97, 1, 0.92], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const underlineWidth = interpolate(frame, [55, 92], [0, 490], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const compareOpacity = appear(frame, 82, 18);
  const compareY = rise(frame, 82);
  const answerOpacity = appear(frame, 205, 18);
  const answerY = rise(frame, 205);
  const answerScale = interpolate(frame, [205, 230], [0.92, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const pageNumberOpacity = interpolate(frame, [0, 15, 282, 300], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: paper, color: ink, fontFamily: font, overflow: 'hidden'}}>
      <Audio src={staticFile('buffett-index-intro.mp3')} />
      <div style={{position: 'absolute', inset: 0, opacity: 0.8, backgroundImage: 'linear-gradient(rgba(24,24,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,24,0.08) 1px, transparent 1px)', backgroundSize: '48px 48px'}} />
      <div style={{position: 'absolute', left: -55, top: 260, width: 155, height: 155, border: `18px solid ${orange}`, borderRadius: 42, rotate: '-12deg', opacity: 0.65}} />
      <div style={{position: 'absolute', right: -80, bottom: -120, width: 420, height: 420, borderRadius: '50%', background: orange, opacity: 0.8}} />
      <div style={{position: 'absolute', right: 100, top: 60, color: '#555', fontSize: 19, fontWeight: 800, letterSpacing: 4, opacity: pageNumberOpacity}}>01 / 04</div>

      <div style={{position: 'absolute', left: 126, top: 74, display: 'flex', alignItems: 'center', gap: 16, color: orange, fontSize: 24, fontWeight: 900, letterSpacing: 5, opacity: titleOpacity, translate: `0px ${titleY}px`}}>
        <span style={{display: 'inline-block', width: 42, height: 12, background: orange}} />巴菲特 · 指数基金
      </div>

      <div style={{position: 'absolute', left: 126, top: 140, right: 126, opacity: titleOpacity, translate: `0px ${titleY}px`, scale: titleScale, transformOrigin: 'left top'}}>
        <div style={{fontSize: 82, lineHeight: 1.12, fontWeight: 950, letterSpacing: -3}}>巴菲特会选股，</div>
        <div style={{position: 'relative', display: 'inline-block', fontSize: 82, lineHeight: 1.12, fontWeight: 950, letterSpacing: -3}}>
          为什么却建议普通人买指数？
          <div style={{position: 'absolute', left: 10, bottom: -2, width: underlineWidth, height: 21, background: orange, zIndex: -1, borderRadius: 9}} />
        </div>
        <div style={{marginTop: 22, color: '#595959', fontSize: 30, fontWeight: 700, letterSpacing: 1}}>一个特别有意思的矛盾，藏着他的能力圈答案。</div>
      </div>

      <div style={{position: 'absolute', left: 126, right: 126, top: 454, display: 'flex', alignItems: 'center', gap: 36, opacity: compareOpacity, translate: `0px ${compareY}px`}}>
        <ShadowCard style={{width: 634, height: 270, padding: '34px 42px', background: '#FFFDF7'}} shadow={`8px 10px 0 ${blue}`}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
            <div><div style={{fontSize: 22, color: '#666', fontWeight: 800, letterSpacing: 3}}>他自己</div><div style={{marginTop: 6, fontSize: 40, fontWeight: 950}}>巴菲特</div></div>
            <div style={{width: 62, height: 62, borderRadius: '50%', border: `3px solid ${ink}`, background: green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 29, fontWeight: 950}}>股</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}><span style={{fontSize: 32}}>↗</span><span style={{fontSize: 26, fontWeight: 850}}>挑公司 · 集中持股</span></div>
            <DotMatrix frame={frame} color={blue} />
          </div>
          <div style={{marginTop: 19, color: '#6C6C6C', fontSize: 21, fontWeight: 700}}>能研究 · 能判断 · 能拿住十年</div>
        </ShadowCard>

        <div style={{width: 86, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: interpolate(frame, [120, 145], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          <div style={{fontSize: 18, fontWeight: 900, letterSpacing: 2, color: '#555'}}>但是</div>
          <div style={{fontSize: 62, fontWeight: 950, color: orange, lineHeight: 0.8}}>↔</div>
          <div style={{width: 3, height: 36, background: ink}} />
        </div>

        <ShadowCard style={{width: 634, height: 270, padding: '34px 42px', background: '#EFFFCC'}} shadow={`8px 10px 0 ${orange}`}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
            <div><div style={{fontSize: 22, color: '#666', fontWeight: 800, letterSpacing: 3}}>给普通人</div><div style={{marginTop: 6, fontSize: 40, fontWeight: 950}}>标普500指数</div></div>
            <div style={{width: 62, height: 62, borderRadius: '50%', border: `3px solid ${ink}`, background: orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, fontWeight: 950}}>500</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}><span style={{fontSize: 32}}>☰</span><span style={{fontSize: 26, fontWeight: 850}}>低成本 · 少犯错</span></div>
            <DotMatrix frame={frame} color={green} />
          </div>
          <div style={{marginTop: 19, color: '#6C6C6C', fontSize: 21, fontWeight: 700}}>不用押中下一家伟大公司</div>
        </ShadowCard>
      </div>

      <div style={{position: 'absolute', left: 126, right: 126, bottom: 58, opacity: answerOpacity, translate: `0px ${answerY}px`, scale: answerScale, transformOrigin: 'center bottom'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22}}>
          <div style={{width: 84, height: 4, background: ink}} />
          <div style={{fontSize: 25, fontWeight: 900, letterSpacing: 3}}>重点不是“选股无效”</div>
          <div style={{width: 84, height: 4, background: ink}} />
        </div>
        <div style={{marginTop: 14, textAlign: 'center', fontSize: 38, fontWeight: 950}}>
          <span style={{background: green, padding: '4px 18px', border: `3px solid ${ink}`, borderRadius: 14, boxShadow: `6px 6px 0 ${ink}`}}>而是先承认自己的能力圈</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
