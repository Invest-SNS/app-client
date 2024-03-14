import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
  HoverTooltip,
} from "react-financial-charts";
import { chartInstance } from '../../../lib/apis/api';
import { useSelector, useDispatch } from 'react-redux';
import { getChartDatas } from '../../../store/reducers/Chart/chart'

export default function MainChart() {
  const dataList = useSelector((state) => state.chart.datas)
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);
  async function getData() {
    const data = await chartInstance.post('/', {
      "code" : "005930",
      "start_date" : "20220101",
      "end_date" : "20220809",
      "time_format" : "D"
    })
    setDatas(data.data);
  }

  useEffect(() => {
    getData();
    dispatch(getChartDatas())
      .then((res) => {
        console.log('data payload',res.payload)
      })

    console.log('데이터:', dataList)
  }, [])

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => {
      const year = d.date.substr(0, 4)
      const month = d.date.substr(4, 2)
      const day = d.date.substr(6, 2)
      const nDate = `${year}-${month}-${day}`
      return new Date(nDate)
    }
  );
  const margin = { left: 0, right: 78, top: 0, bottom: 24 };

  const height = 800;
  const width = 1200;
  
  // 이동평균선(EMA) 계산하는 함수
  // const ema12 = ema()
  //   .id(1)
  //   .options({ windowSize: 12 })
  //   .merge((d, c) => {
  //     d.ema12 = c;
  //   })
  //   .accessor((d) => d.ema12);

  // const ema26 = ema()
  //   .id(2)
  //   .options({ windowSize: 26 })
  //   .merge((d, c) => {
  //     d.ema26 = c;
  //   })
  //   .accessor((d) => d.ema26);

  // const elder = elderRay();

  // const calculatedData = elder(ema26(ema12(initialData)));
  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
    datas.reverse()
  );

  // 소수점 이하 둘째짜리까지만 표현
  const pricesDisplayFormat = format(".2f");
  const x_max = xAccessor(data[data.length - 1]);
  const x_min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [x_min, x_max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 100;
  const elderRayOrigin = (_, h) => [0, h];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight];
  const chartHeight = gridHeight - barChartHeight;
  const yExtents = (data) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const hoverTimeFormat = "%B %d, %Y";
  const HoverDisplayFormat = timeFormat(hoverTimeFormat);

  const barChartExtents = (data) => {
    return data.volume;
  };

  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };

  const volumeColor = (data) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data) => {
    return data.volume;
  };

  const openCloseColor = (data) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  function tooltipContent() {
    return ({ currentItem, xAccessor }) => {
      return {
        x: HoverDisplayFormat(xAccessor(currentItem)),
        y: [
          {
            label: "시가",
            value: currentItem.open && pricesDisplayFormat(currentItem.open)
          },
          {
            label: "고가",
            value: currentItem.high && pricesDisplayFormat(currentItem.high)
          },
          {
            label: "저가",
            value: currentItem.low && pricesDisplayFormat(currentItem.low)
          },
          {
            label: "종가",
            value: currentItem.close && pricesDisplayFormat(currentItem.close)
          },
          {
            label: "거래량",
            value: currentItem.volume && pricesDisplayFormat(currentItem.volume)
          },
        ]
      };
    };
  }

  function volumeContent() {
    return ({ currentItem, xAccessor }) => {
      return {
        x: HoverDisplayFormat(xAccessor(currentItem)),
        y: [
          {
            label: "거래량",
            value: currentItem.volume && pricesDisplayFormat(currentItem.volume)
          },
        ]
      };
    };
  }

  return (
    <ChartCanvas
      height={height}
      ratio={3}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName="Data"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        {/* 분봉 호버했을 때, 날짜/시가/종가/고가/저가 표시 */}
        <HoverTooltip
          // yAccessor={ema26.accessor()}
          tooltip={{ content: tooltipContent()}}
          fontSize={15}
        />
        <XAxis showGridLines showTickLabel={false} />
        <YAxis showGridLines tickFormat={pricesDisplayFormat} />
        <CandlestickSeries />

        <MouseCoordinateX displayFormat={timeDisplayFormat} />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={pricesDisplayFormat}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={pricesDisplayFormat}
          yAccessor={yEdgeIndicator}
        />

        <ZoomButtons />
        <OHLCTooltip origin={[8, 16]} />
      </Chart>
      {/* 거래량 차트 */}
      <Chart
        id={2}
        height={barChartHeight}
        origin={barChartOrigin}
        yExtents={barChartExtents}
      >
        {/* <HoverTooltip
          // yAccessor={ema26.accessor()}
          tooltip={{ content: volumeContent()}}
          fontSize={15}
        /> */}
        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
        <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
      </Chart>
      
      <CrossHairCursor />
    </ChartCanvas>
  );
}