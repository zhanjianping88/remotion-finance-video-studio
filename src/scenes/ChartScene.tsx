import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

const font = '"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", Arial, sans-serif';
const W = 1920;
const H = 1080;
const chart = {left: 210, top: 245, width: 1500, height: 535};
const prices = [100, 102, 104, 107, 109, 111, 113, 112, 115, 118, 120, 119, 117, 114, 112, 110, 108, 106, 103, 101, 99, 98, 96, 94, 93, 95, 97, 99, 101, 104, 106, 109, 112, 114, 116, 119, 122, 124, 126, 128, 129, 131, 135, 139, 143, 147, 149, 152];
const movingAverage = [100.5, 102, 104, 106, 108, 110, 111, 112, 113, 114.5, 116.5, 117.5, 117.5, 117, 116, 114.5, 112.5, 110.5, 108.5, 106.5, 104.5, 102.5, 100.5, 98.5, 96.5, 96, 96, 97, 98.5, 100.5, 102.5, 104.5, 106.5, 109, 112, 115, 118, 121, 124, 127, 130, 133, 136, 139, 142, 145, 147, 149];
const minValue = 88;
const maxValue = 158;

type Point = {x: number; y: number};

const toPoints = (values: number[]): Point[] => values.map((value, index) => ({
  x: chart.left + (index / (values.length - 1)) * chart.width,
  y: chart.top + chart.height - ((value - minValue) / (maxValue - minValue)) * chart.height,
}));

const smoothPath = (points: Point[]): string => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1];
    const current = points[i];
    const previousPrevious = points[i - 2] ?? previous;
    const next = points[i + 1] ?? current;
    const c1x = previous.x + (current.x - previousPrevious.x) / 6;
    const c1y = previous.y + (current.y - previousPrevious.y) / 6;
    const c2x = current.x - (next.x - previous.x) / 6;
    const c2y = current.y - (next.y - previous.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${current.x} ${current.y}`;
  }
  return d;
};

const labelOpacity = (frame: number, start: number, end: number) => interpolate(frame, [start, start + 10, end - 10, end], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const ChartScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pricePoints = toPoints(prices);
  const maPoints = toPoints(movingAverage);
  const pricePath = smoothPath(pricePoints);
  const maPath = smoothPath(maPoints);
  const draw = interpolate(frame, [18, 160], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.85, 0.2, 1)});
  const chartOpacity = interpolate(frame, [0, 16], [0, 1], {extrapolateRight: 'clamp'});
  const chartScale = interpolate(frame, [252, 300], [1, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const titleY = interpolate(frame, [0, 28], [-35, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const breachPulse = interpolate(frame, [132, 148, 175, 190], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const standPulse = interpolate(frame, [218, 233, 266, 282], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const currentIndex = Math.min(prices.length - 1, Math.max(0, Math.floor(draw * (prices.length - 1))));
  const currentPoint = pricePoints[currentIndex];
  const maPoint = maPoints[currentIndex];
  const distance = Math.max(0, maPoint.y - currentPoint.y);
  const eventText1 = labelOpacity(frame, 132, 194);
  const eventText2 = labelOpacity(frame, 155, 215);
  const eventText3 = labelOpacity(frame, 218, 276);
  const eventText4 = labelOpacity(frame, 239, 292);

  const yTicks = [150, 130, 110, 90];

  return (
    <AbsoluteFill style={{fontFamily: font, backgroundColor: '#07111f', color: '#F4F8FC', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, opacity: chartOpacity, scale: chartScale, transformOrigin: '50% 45%'}}>
        <div style={{position: 'absolute', left: 210, top: 74, color: '#F4F8FC', fontSize: 42, fontWeight: 700, letterSpacing: 1, translate: `0px ${titleY}px`}}>红利ETF价格 <span style={{color: '#6F8999', fontWeight: 400}}>vs</span> <span style={{color: '#F4C95D'}}>20周均线</span></div>
        <div style={{position: 'absolute', right: 210, top: 83, display: 'flex', gap: 28, fontSize: 21, color: '#9EB2BF'}}>
          <span><i style={{display: 'inline-block', width: 28, height: 4, borderRadius: 4, background: '#58A6FF', marginRight: 10, verticalAlign: 'middle'}} />价格</span>
          <span><i style={{display: 'inline-block', width: 28, height: 4, borderRadius: 4, background: '#F4C95D', marginRight: 10, verticalAlign: 'middle'}} />20周均线</span>
        </div>

        <div style={{position: 'absolute', left: 155, top: 178, width: 1610, height: 660, borderRadius: 28, background: 'rgba(19, 38, 57, 0.72)', border: '1px solid rgba(155, 194, 210, 0.14)', boxShadow: '0 24px 70px rgba(0,0,0,0.22)'}} />
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
          <defs>
            <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#58A6FF" stopOpacity="0.28" /><stop offset="100%" stopColor="#58A6FF" stopOpacity="0" /></linearGradient>
            <filter id="softGlow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {yTicks.map((tick) => {
            const y = chart.top + chart.height - ((tick - minValue) / (maxValue - minValue)) * chart.height;
            return <g key={tick}><line x1={chart.left} x2={chart.left + chart.width} y1={y} y2={y} stroke="rgba(157, 190, 204, 0.13)" strokeDasharray="5 12" /><text x={chart.left - 24} y={y + 7} textAnchor="end" fontSize="20" fill="#6F8999">{tick}</text></g>;
          })}
          <line x1={chart.left} x2={chart.left + chart.width} y1={chart.top + chart.height} y2={chart.top + chart.height} stroke="rgba(157, 190, 204, 0.25)" />
          <path d={`${pricePath} L ${chart.left + chart.width} ${chart.top + chart.height} L ${chart.left} ${chart.top + chart.height} Z`} fill="url(#priceGlow)" opacity={draw * 0.55} />
          <path d={pricePath} pathLength="1" fill="none" stroke="#58A6FF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset={1 - draw} filter="url(#softGlow)" />
          <path d={maPath} pathLength="1" fill="none" stroke="#F4C95D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset={1 - draw} />
          {draw > 0.01 && <g>
            <circle cx={currentPoint.x} cy={currentPoint.y} r="10" fill="#58A6FF" stroke="#EAF5FF" strokeWidth="4" />
            <circle cx={currentPoint.x} cy={currentPoint.y} r="20" fill="none" stroke="#58A6FF" strokeOpacity="0.35" strokeWidth="3" />
          </g>}
          {distance > 4 && frame > 225 && <g opacity={interpolate(frame, [225, 246], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}>
            <line x1={pricePoints[44].x} x2={pricePoints[44].x} y1={pricePoints[44].y} y2={maPoints[44].y} stroke="#F18F9B" strokeWidth="5" strokeDasharray="8 8" />
            <line x1={pricePoints[45].x} x2={pricePoints[45].x} y1={pricePoints[45].y} y2={maPoints[45].y} stroke="#F18F9B" strokeWidth="5" strokeDasharray="8 8" />
          </g>}
        </svg>

        <div style={{position: 'absolute', left: 450, top: 355, width: 330, padding: '16px 24px', borderRadius: 16, background: 'rgba(225, 99, 119, 0.16)', border: '1px solid rgba(241, 143, 155, 0.7)', color: '#FFB8C0', fontSize: 30, fontWeight: 700, opacity: eventText1, boxShadow: `0 0 ${28 * breachPulse}px rgba(241, 143, 155, 0.45)`}}>跌破20周均线</div>
        <div style={{position: 'absolute', left: 585, top: 595, width: 240, padding: '12px 20px', textAlign: 'center', borderRadius: 16, background: '#E7F8F5', color: '#0B5F62', fontSize: 31, fontWeight: 800, opacity: eventText2, scale: interpolate(frame, [155, 170], [0.82, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.spring({damping: 18, stiffness: 130})})}}>分批介入</div>

        <div style={{position: 'absolute', left: 630, top: 520, display: 'flex', gap: 24, opacity: eventText2}}>
          {[0, 1, 2].map((index) => <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: interpolate(frame, [154 + index * 12, 164 + index * 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: `0px ${interpolate(frame, [154 + index * 12, 164 + index * 12], [16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`}}><span style={{fontSize: 25, color: '#57D3B8'}}>↓</span><span style={{width: 18, height: 18, borderRadius: '50%', background: '#57D3B8', boxShadow: '0 0 0 6px rgba(87,211,184,0.14)'}} /></div>)}
        </div>

        <div style={{position: 'absolute', left: 1280, top: 265, width: 360, padding: '16px 24px', borderRadius: 16, background: 'rgba(87, 211, 184, 0.14)', border: '1px solid rgba(87, 211, 184, 0.72)', color: '#8FF1D6', fontSize: 30, fontWeight: 700, opacity: eventText3, boxShadow: `0 0 ${28 * standPulse}px rgba(87, 211, 184, 0.4)`}}>明显站上20周均线</div>
        <div style={{position: 'absolute', left: 1370, top: 548, width: 250, padding: '12px 20px', textAlign: 'center', borderRadius: 16, background: '#FFF0F2', color: '#A54056', fontSize: 31, fontWeight: 800, opacity: eventText4, scale: interpolate(frame, [239, 254], [0.82, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.spring({damping: 18, stiffness: 130})})}}>适当减一点</div>
        <div style={{position: 'absolute', left: 1460, top: 460, display: 'flex', gap: 25, opacity: eventText4}}>
          {[0, 1].map((index) => <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: interpolate(frame, [244 + index * 14, 254 + index * 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: `0px ${interpolate(frame, [244 + index * 14, 254 + index * 14], [14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`}}><span style={{fontSize: 26, color: '#F18F9B'}}>↑</span><span style={{height: 24, width: 3, background: '#F18F9B', borderRadius: 3}} /></div>)}
        </div>

        <div style={{position: 'absolute', left: 210, top: 872, right: 210, height: 82, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: interpolate(frame, [260, 282], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          {['跌破', '分批介入', '上涨', '偏离均线', '减仓'].map((label, index) => <React.Fragment key={label}><div style={{padding: '14px 26px', borderRadius: 50, background: index === 1 ? '#E7F8F5' : index === 4 ? '#FFF0F2' : 'rgba(89, 123, 142, 0.22)', color: index === 1 ? '#0B5F62' : index === 4 ? '#A54056' : '#D6E4EC', fontSize: 22, fontWeight: 700, whiteSpace: 'nowrap'}}>{label}</div>{index < 4 && <div style={{flex: 1, height: 2, margin: '0 14px', background: 'linear-gradient(90deg, #6A8797, #A4BBC7)', position: 'relative'}}><span style={{position: 'absolute', right: -2, top: -6, width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '10px solid #A4BBC7'}} /></div>}</React.Fragment>)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
