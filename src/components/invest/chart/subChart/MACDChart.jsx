import React from 'react'
import { BarSeries, Chart, ChartCanvas, XAxis, YAxis, discontinuousTimeScaleProviderBuilder } from 'react-financial-charts'
import { fakeData } from './data';
import { useSelector } from 'react-redux';
import { format } from 'd3-format';

export default function MACDChart() {
  const dataList = useSelector((state) => state.chart.datas)
  const margin = { left: 0, right: 78, top: 0, bottom: 24 };

  const height = 800;
  const width = 1150;

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => {
      const year = d.date.substr(0, 4)
      const month = d.date.substr(4, 2)
      const day = d.date.substr(6, 2)
      const nDate = `${year}-${month}-${day}`
      return new Date(nDate)
    }
  );

  const dataPoints = fakeData.result.outMACDHist.map((item, idx) => {
    return { 
      date: dataList[fakeData.begIndex + idx].date,
      y: item 
    }
  });

  const MACDData = (data) => {
    return data.y;
  }

  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
    dataPoints
  );

  const barChartHeight = height - margin.top - margin.bottom / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight];

  const pricesDisplayFormat = format(".2f");
  const x_max = xAccessor(data[data.length - 1]);
  const x_min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [x_min, x_max + 5];

  console.log('MACD', data)

  const MACDExtents = (data) => {
    return data.y;
  };

  return (
    <ChartCanvas
        height={200}
        ratio={3}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="subdata"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
      >
        {/* MACD 차트 */}
        <Chart
          id={4}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={MACDExtents}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
          <BarSeries fillStyle="rgba(38, 166, 154, 0.3)" yAccessor={MACDData}/>
        </Chart>
      </ChartCanvas>
  )
}
