# Remotion 财经知识短视频

这是一个使用 React + Remotion 制作财经知识类短视频的项目，画面采用动态 HTML 信息图的方式生成，并支持旁白、字幕和音效同步。

## 快速开始

```bash
npm install
npm run start
```

打开 Remotion Studio 后，可以预览这些 Composition：

- `ETFGridTradingVideo`：ETF 网格交易操作指南
- `ETFExplainerVideo`：ETF 到底是个啥？
- `DividendRetirementVideo`：攒够100万，全买红利ETF退休？
- `20WeekMovingAverage`：20周均线做T
- `BuffettFullVideo`：巴菲特选股知识视频

## 渲染 ETF 网格交易视频

```bash
npx remotion render ETFGridTradingVideo out/etf-grid-trading/etf-grid-trading.mp4
```

渲染 ETF 入门视频：

```bash
npx remotion render ETFExplainerVideo out/etf-explainer/etf-explainer.mp4
```

视频使用的旁白、字幕和音效位于 `public/`。当前网格交易视频采用：

- 那不勒斯黄：`#fdca17`
- 琉璃色：`#1e50a2`
- 白粉：`#fff2df`

最终示例成片位于 `examples/etf-grid-trading/`。
ETF 入门示例成片位于 `examples/etf-explainer/`，包含 MP4、原稿和时间轴字幕。
