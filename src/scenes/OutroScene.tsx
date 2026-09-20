import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

const font = '"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", Arial, sans-serif';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 22, 78, 105], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const y = interpolate(frame, [0, 24], [25, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const line = interpolate(frame, [18, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{fontFamily: font, backgroundColor: '#07111f', color: '#F4F8FC', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 42%, rgba(38, 119, 117, 0.26), transparent 48%)', opacity}} />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity, translate: `0px ${y}px`}}>
        <div style={{fontSize: 74, fontWeight: 800, letterSpacing: 3, textAlign: 'center'}}>20周均线 ≈ 一个中期节奏参考线</div>
        <div style={{marginTop: 35, width: 560, height: 5, borderRadius: 5, background: 'linear-gradient(90deg, #58A6FF, #F4C95D, #57D3B8)', scale: `${line} 1`, transformOrigin: 'center'}} />
        <div style={{marginTop: 38, fontSize: 46, color: '#B9CBD8', letterSpacing: 3}}>低了分批买，高了适当减</div>
      </div>
      <div style={{position: 'absolute', bottom: 96, left: 120, right: 120, display: 'flex', justifyContent: 'space-between', color: '#6F8999', fontSize: 21, letterSpacing: 2, opacity}}>红利ETF · 模拟示意<span>20W RHYTHM</span></div>
    </AbsoluteFill>
  );
};
