import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {IntroScene} from './scenes/IntroScene';
import {ChartScene} from './scenes/ChartScene';
import {OutroScene} from './scenes/OutroScene';

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#07111f'}}>
      <Sequence from={0} durationInFrames={105} name="开场">
        <IntroScene />
      </Sequence>
      <Sequence from={105} durationInFrames={300} name="走势图">
        <ChartScene />
      </Sequence>
      <Sequence from={405} durationInFrames={105} name="结尾总结">
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
