import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  HoverTooltip,
  MACDSeries,
} from "react-financial-charts";

import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { getChartDatas, setChartDatas } from "../../../store/reducers/Chart/chart";

// 차트지표
import SMAChart from "./Indicators/chart/SMAChart";
import WMAChart from "./Indicators/chart/WMAChart";
import EMAChart from "./Indicators/chart/EMAChart";
import BBANDSChart from "./Indicators/chart/BBANDSChart";
import SARChart from "./Indicators/chart/SARChart";
import MACDChart from "./Indicators/sub/MACDChart";
import { getMACDChart } from "../../../store/reducers/Chart/Indicators/sub";
import STOCHFastChart from "./Indicators/sub/STOCHFast";
import STOCHFChart from "./Indicators/sub/STOCHFast";
import STOCHChart from "./Indicators/sub/STOCH";
import RSIChart from "./Indicators/sub/RSIChart";
import CCIChart from "./Indicators/sub/CCIChart";
import MOMChart from "./Indicators/sub/MOMChart";
import ROCChart from "./Indicators/sub/ROCChart";
import ADChart from "./Indicators/sub/ADChart";
import ATRChart from "./Indicators/sub/ATRChart";
import MFIChart from "./Indicators/sub/MFIChart";
import OBVChart from "./Indicators/sub/OBVChart";
import ADOSCChart from "./Indicators/sub/ADOSCChart";
import TRIXChart from "./Indicators/sub/TRIXChart";
import WILLRChart from "./Indicators/sub/WILLRChart";
import DMIChart from "./Indicators/sub/DMIChart";
import ADXChart from "./Indicators/sub/ADXChart";
import ADXRChart from "./Indicators/sub/ADXRChart";
import AROONChart from "./Indicators/sub/AROONChart";

export default function MainChart({ toggleCharts, toggleIndicators }) {
  const dataList = useSelector((state) => state.chart.datas)
  console.log(dataList)
  const company = useSelector((state) => state.company.data)
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    // getData()
    dispatch(getChartDatas())
      .then(() => setIsShow(true))

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

  const height = 760;
  const width = 1150;

  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
    dataList
  );

  // 소수점 이하 둘째짜리까지만 표현
  const pricesDisplayFormat = format(".2f");
  const x_max = xAccessor(data[data.length - 1]);
  const x_min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [x_min, x_max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const barChartHeight = gridHeight / 4;

  // 차트 추가될 때마다 origin 변경해주어야 함
  const barChartOrigin = (_, h) => [0, gridHeight - 2 * barChartHeight];
  const MACDChartOrigin = (_, h) => [0 , gridHeight - barChartHeight];
  
  // * (차트 개수)
  const chartHeight = gridHeight - barChartHeight * 2;

  const yExtents = (data) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const hoverTimeFormat = "%B %d, %Y";
  const HoverDisplayFormat = timeFormat(hoverTimeFormat);

  const barChartExtents = (data) => {
    return [data.volume - 10000000, data.volume + 10000000];
  };

  const STOCHFChartExtents = (data) => {
    return [data.outFastK - 50, data.outFastD + 50];
  };

  const candleChartExtents = (data) => {
    return [data.high + 2000, data.low - 2000];
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

  function BarChartContent() {
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
    <Container>
      <CompanyContainer>
        <CompanyLogo src="https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png" />
        <FontContainer>
          <MainFont>{company.name}</MainFont>
          <SubFont>{company.code} {company.index}</SubFont>
        </FontContainer>
      </CompanyContainer>
      <Content>
        <button onClick={toggleCharts}>차트지표</button>
        <button onClick={toggleIndicators}>보조지표</button>
      </Content>
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
        {/* 일반 차트 */}
        <Chart id={1} height={chartHeight} yExtents={candleChartExtents}>
          {/* 분봉 호버했을 때, 날짜/시가/종가/고가/저가 표시 */}
          <HoverTooltip
            // yAccessor={ema26.accessor()}
            tooltip={{ content: tooltipContent()}}
            fontSize={15}
          />
          <XAxis showGridLines showTickLabel={false} />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />
          <CandlestickSeries />

          {/* 차트지표 */}
          <SMAChart datas={dataList} isShow={isShow} />
          <WMAChart datas={dataList} isShow={isShow} />
          <EMAChart datas={dataList} isShow={isShow} />
          <BBANDSChart datas={dataList} isShow={isShow} />
          <SARChart datas={dataList} isShow={isShow} />

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
        <CrossHairCursor />

        {/* 거래량 차트 */}
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={barChartExtents}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>

        {/* MACD 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={d => d.macd}
					origin={MACDChartOrigin}
				>
          <MACDChart datas={dataList} />
        </Chart> */}

        {/* STOCHF 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.outFastK - 50, data.outFastD + 50]}
					origin={MACDChartOrigin}
				>
          <STOCHFChart datas={dataList} />
        </Chart> */}

        {/* STOCHF 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.outSlowK - 50, data.outSlowD + 50]}
					origin={MACDChartOrigin}
				>
          <STOCHChart datas={dataList} />
        </Chart> */}

        {/* RSI 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.rsi - 20, data.rsi + 20]}
					origin={MACDChartOrigin}
				>
          <RSIChart datas={dataList} />
        </Chart> */}

        {/* CCI 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.cci - 100, data.cci + 100]}
					origin={MACDChartOrigin}
				>
          <CCIChart datas={dataList} />
        </Chart> */}

        {/* MOM 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.mom - 1000, data.mom + 1000]}
					origin={MACDChartOrigin}
				>
          <MOMChart datas={dataList} />
        </Chart> */}

        {/* ROC 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.roc - 5, data.roc + 5]}
					origin={MACDChartOrigin}
				>
          <ROCChart datas={dataList} />
        </Chart> */}

        {/* AD 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.ad - 5000000, data.ad + 5000000]}
					origin={MACDChartOrigin}
				>
          <ADChart datas={dataList} />
        </Chart> */}

        {/* ATR 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.atr - 100, data.atr + 100]}
					origin={MACDChartOrigin}
				>
          <ATRChart datas={dataList} />
        </Chart> */}

        {/* MFI 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.mfi - 10, data.mfi + 10]}
					origin={MACDChartOrigin}
				>
          <MFIChart datas={dataList} />
        </Chart> */}

        {/* OBV 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.obv - 50000000, data.obv + 50000000]}
					origin={MACDChartOrigin}
				>
          <OBVChart datas={dataList} />
        </Chart> */}

        {/* ADOSC 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.adosc - 10000000, data.adosc + 10000000]}
					origin={MACDChartOrigin}
				>
          <ADOSCChart datas={dataList} />
        </Chart> */}

        {/* TRIX 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.trix - 0.1, data.trix + 0.1]}
					origin={MACDChartOrigin}
				>
          <TRIXChart datas={dataList} />
        </Chart> */}

        {/* WILLR 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.willr - 30, data.willr + 30]}
					origin={MACDChartOrigin}
				>
          <WILLRChart datas={dataList} />
        </Chart> */}

        {/* DMI (DX) 차트 */}
        {/* 값 제대로 받아오는지 확인 필요 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.dx - 10, data.dx + 10]}
					origin={MACDChartOrigin}
				>
          <DMIChart datas={dataList} />
        </Chart> */}

        {/* ADX 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.adx - 5, data.adx + 5]}
					origin={MACDChartOrigin}
				>
          <ADXChart datas={dataList} />
        </Chart> */}

        {/* ADXR 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={data => [data.adxr - 10, data.adxr + 10]}
					origin={MACDChartOrigin}
				>
          <ADXRChart datas={dataList} />
        </Chart> */}

        {/* ADXR 차트 */}
        <Chart id={3} height={barChartHeight}
					yExtents={data => [data.aroon - 10, data.aroon + 10]}
					origin={MACDChartOrigin}
				>
          <AROONChart datas={dataList} />
        </Chart>
      </ChartCanvas>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 720px);
  padding: 0 10px;
`

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`

const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  margin-right: 10px;
`

const FontContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MainFont = styled.span`
  font-weight: 700;
`

const SubFont = styled.span`
  font-size: 12px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
`;