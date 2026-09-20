import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

const font = '"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", Arial, sans-serif';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 16], [0, 1], {extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const titleScale = interpolate(frame, [0, 78, 105], [0.86, 1, 0.84], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const titleY = interpolate(frame, [78, 105], [0, -250], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const subtitleOpacity = interpolate(frame, [15, 34, 78, 105], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glowOpacity = interpolate(frame, [0, 25, 82, 105], [0, 0.8, 0.8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{fontFamily: font, backgroundColor: '#07111f', color: '#F4F8FC', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 44%, rgba(34, 109, 122, 0.3), transparent 44%)', opacity: glowOpacity}} />
      <div style={{position: 'absolute', left: 120, right: 120, top: 110, height: 1, background: 'rgba(151, 182, 199, 0.16)', opacity: titleOpacity}} />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: titleOpacity, scale: titleScale, translate: `0px ${titleY}px`}}>
        <div style={{fontSize: 94, fontWeight: 800, letterSpacing: 8, lineHeight: 1.12}}>20周均线做T</div>
        <div style={{marginTop: 34, fontSize: 42, color: '#B9CBD8', letterSpacing: 2, opacity: subtitleOpacity}}>用中期均线，寻找分批低吸和止盈的位置</div>
      </div>
      <div style={{position: 'absolute', bottom: 98, left: 120, right: 120, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6F8999', fontSize: 22, letterSpacing: 2, opacity: titleOpacity}}>
        <span>红利ETF · 模拟示意</span>
        <span>PRICE × 20W MA</span>
      </div>
    </AbsoluteFill>
  );
};
