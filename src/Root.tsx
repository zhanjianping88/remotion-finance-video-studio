import React from 'react';
import {Composition, Folder} from 'remotion';
import {MainVideo} from './MainVideo';
import {IntroScene} from './scenes/IntroScene';
import {ChartScene} from './scenes/ChartScene';
import {OutroScene} from './scenes/OutroScene';
import {BuffettIndex10s} from './scenes/BuffettIndex10s';
import {FullBuffettVideo} from './FullBuffettVideo';
import {DividendRetirementVideo} from './DividendRetirementVideo';
import {ETFGridTradingVideo} from './ETFGridTradingVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="20周均线做T">
        <Composition
          id="20WeekMovingAverage"
          component={MainVideo}
          durationInFrames={510}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="场景预览">
        <Composition id="Intro" component={IntroScene} durationInFrames={105} fps={30} width={1920} height={1080} />
        <Composition id="Chart" component={ChartScene} durationInFrames={300} fps={30} width={1920} height={1080} />
        <Composition id="Outro" component={OutroScene} durationInFrames={105} fps={30} width={1920} height={1080} />
      </Folder>
      <Folder name="财经短视频试片">
        <Composition
          id="BuffettIndex10s"
          component={BuffettIndex10s}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="财经短视频完整稿">
        <Composition
          id="BuffettFullVideo"
          component={FullBuffettVideo}
          durationInFrames={6840}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="红利ETF退休新视频">
        <Composition
          id="DividendRetirementVideo"
          component={DividendRetirementVideo}
          durationInFrames={9685}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="ETF网格交易新视频">
        <Composition
          id="ETFGridTradingVideo"
          component={ETFGridTradingVideo}
          durationInFrames={11588}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
