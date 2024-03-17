import React from 'react'
import { BarSeries, Chart, ChartCanvas, XAxis, YAxis, discontinuousTimeScaleProviderBuilder } from 'react-financial-charts'
import { useSelector } from 'react-redux';
import { format } from 'd3-format';

export default function MACDChart() {
  return (
    <></>
    // <ChartCanvas
    //     height={200}
    //     ratio={3}
    //     width={width}
    //     margin={margin}
    //     data={data}
    //     displayXAccessor={displayXAccessor}
    //     seriesName="subdata"
    //     xScale={xScale}
    //     xAccessor={xAccessor}
    //     xExtents={xExtents}
    //   >
    //     {/* MACD 차트 */}
    //     <Chart
    //       id={4}
    //       height={barChartHeight}
    //       origin={barChartOrigin}
    //       yExtents={MACDExtents}
    //     >
    //       <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
    //       <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
    //       <BarSeries fillStyle="rgba(38, 166, 154, 0.3)" yAccessor={MACDData}/>
    //     </Chart>
    //   </ChartCanvas>
  )
}
