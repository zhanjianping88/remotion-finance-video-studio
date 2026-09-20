import React from 'react';
import {Easing, interpolate} from 'remotion';

export const C = {
  ink: '#171717',
  paper: '#F8F7EF',
  gray: '#656565',
  orange: '#FF725B',
  green: '#B7F34A',
  blue: '#8ED9EF',
  paleGreen: '#EFFFCC',
  paleBlue: '#E7F7FB',
  paleOrange: '#FFF0EA',
};

export const appear = (frame: number, from: number, duration = 18) => interpolate(frame, [from, from + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
export const rise = (frame: number, from: number, duration = 18) => interpolate(frame, [from, from + duration], [28, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});
export const settle = (frame: number, from: number, duration = 26) => interpolate(frame, [from, from + duration], [0.86, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)});

export const GridBackground: React.FC<{children: React.ReactNode; page: string; kicker: string; accent?: string}> = ({children, page, kicker, accent = C.orange}) => (
  <div style={{position: 'absolute', inset: 0, backgroundColor: C.paper, color: C.ink, fontFamily: '"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", Arial, sans-serif', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, opacity: 0.75, backgroundImage: 'linear-gradient(rgba(24,24,24,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,24,0.08) 1px, transparent 1px)', backgroundSize: '48px 48px'}} />
    <div style={{position: 'absolute', left: -66, top: 285, width: 160, height: 160, border: `18px solid ${accent}`, borderRadius: 42, rotate: '-12deg', opacity: 0.62}} />
    <div style={{position: 'absolute', right: -105, bottom: -145, width: 430, height: 430, borderRadius: '50%', background: accent, opacity: 0.72}} />
    <div style={{position: 'absolute', left: 126, top: 72, display: 'flex', alignItems: 'center', gap: 16, color: accent, fontSize: 22, fontWeight: 900, letterSpacing: 4}}><span style={{display: 'inline-block', width: 42, height: 12, background: accent}} />{kicker}</div>
    <div style={{position: 'absolute', right: 126, top: 70, color: '#555', fontSize: 19, fontWeight: 800, letterSpacing: 4}}>{page}</div>
    {children}
  </div>
);

export const Headline: React.FC<{children: React.ReactNode; top?: number; size?: number; color?: string; style?: React.CSSProperties}> = ({children, top = 128, size = 72, color = C.ink, style}) => (
  <div style={{position: 'absolute', left: 126, right: 126, top, fontSize: size, fontWeight: 950, lineHeight: 1.12, letterSpacing: -2, color, ...style}}>{children}</div>
);

export const Subline: React.FC<{children: React.ReactNode; top?: number; style?: React.CSSProperties}> = ({children, top = 235, style}) => (
  <div style={{position: 'absolute', left: 126, right: 126, top, color: C.gray, fontSize: 28, fontWeight: 700, letterSpacing: 1, ...style}}>{children}</div>
);

export const Card: React.FC<{children: React.ReactNode; x?: number; y?: number; width?: number; height?: number; background?: string; shadow?: string; style?: React.CSSProperties}> = ({children, x, y, width = 560, height, background = C.paper, shadow = `8px 10px 0 ${C.blue}`, style}) => (
  <div style={{position: x !== undefined || y !== undefined ? 'absolute' : 'relative', left: x, top: y, width, height, padding: '30px 34px', boxSizing: 'border-box', background, border: `3px solid ${C.ink}`, borderRadius: 24, boxShadow: shadow, ...style}}>{children}</div>
);

export const Pill: React.FC<{children: React.ReactNode; background?: string; color?: string; style?: React.CSSProperties}> = ({children, background = C.green, color = C.ink, style}) => (
  <span style={{display: 'inline-block', padding: '9px 18px', border: `3px solid ${C.ink}`, borderRadius: 999, background, color, fontSize: 22, fontWeight: 900, ...style}}>{children}</span>
);

export const Tag: React.FC<{children: React.ReactNode; background?: string; style?: React.CSSProperties}> = ({children, background = C.orange, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', padding: '10px 16px', background, border: `3px solid ${C.ink}`, borderRadius: 12, boxShadow: `5px 5px 0 ${C.ink}`, fontSize: 22, fontWeight: 950, ...style}}>{children}</div>
);

export const Dots: React.FC<{count?: number; color?: string; frame?: number; from?: number}> = ({count = 6, color = C.blue, frame = 0, from = 0}) => (
  <div style={{display: 'flex', gap: 9, alignItems: 'end', height: 50}}>{Array.from({length: count}).map((_, index) => <span key={index} style={{display: 'block', width: 14, height: 13 + (index % 4) * 8, borderRadius: 4, background: color, transformOrigin: 'bottom', scale: `${interpolate(frame, [from + index * 5, from + index * 5 + 14], [0.1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)})} 1`}} />)}</div>
);

export const Footer: React.FC<{children: React.ReactNode; opacity?: number}> = ({children, opacity = 1}) => (
  <div style={{position: 'absolute', left: 126, right: 126, bottom: 42, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20, fontWeight: 800, color: '#626262', letterSpacing: 1, opacity}}>{children}</div>
);

export const Arrow: React.FC<{direction?: 'right' | 'down' | 'up'; color?: string; size?: number}> = ({direction = 'right', color = C.orange, size = 52}) => <span style={{fontSize: size, lineHeight: 1, color, fontWeight: 950}}>{direction === 'right' ? '→' : direction === 'down' ? '↓' : '↑'}</span>;
