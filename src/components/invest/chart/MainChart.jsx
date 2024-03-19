import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { format, formatLocale } from "d3-format";
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
  MovingAverageTooltip,
  SingleValueTooltip,
} from "react-financial-charts";

import default_Img from "../../../../public/icon/+.svg";

import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { getChartDatas, getMinuteDatas, setChartDatas } from "../../../store/reducers/Chart/chart";

// 차트지표
import SMAChart from "./Indicators/chart/SMAChart";
import WMAChart from "./Indicators/chart/WMAChart";
import EMAChart from "./Indicators/chart/EMAChart";
import BBANDSChart from "./Indicators/chart/BBANDSChart";
import SARChart from "./Indicators/chart/SARChart";
import MACDChart from "./Indicators/sub/MACDChart";
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
import AROONOSCChart from "./Indicators/sub/AROONOSCChart";
import STOCHRSIChart from "./Indicators/sub/STOCHRSIChart";
import ULTOSCChart from "./Indicators/sub/ULTOSCChart";
import PPOChart from "./Indicators/sub/PPOChart";

export default function MainChart({ toggleCharts, toggleIndicators }) {
  const dataList = useSelector((state) => state.chart.datas)
  const company = useSelector((state) => state.company.data)
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  
  function getData(format) {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const data = {
      "code" : company.code,
      "start_date" : "19990101",
      "end_date" : formattedDate,
      "time_format" : format
    }

    dispatch(getChartDatas(data))
  }

  // function getMinuteData(code) {
  //   const data = {
  //     "code" : code,
  //   }

  //   dispatch(getMinuteDatas(data))
  //     .then(() => setIsShow(prev => !prev))

  //   // 1분마다 요청 보내기
  //   const intervalId = setInterval(() => {
  //     dispatch(getMinuteDatas(data))
  //       .then(() => setIsShow(prev => !prev))
  //   }, 60000); // 1분 = 60,000 밀리초

  //   // 컴포넌트가 언마운트될 때 타이머 정리
  //   return () => clearInterval(intervalId);
  // }

  useEffect(() => {
    // 초기 데이터 '일'
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const data = {
      "code" : company.code,
      "start_date" : "19990101",
      "end_date" : formattedDate,
      "time_format" : "D"
    }
    
    dispatch(getChartDatas(data))
      .then(() => setIsShow(prev => !prev))

  }, [company])

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
  const width = 1250;

  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
    dataList
  );

  // 소수점 이하 둘째짜리까지만 표현
  const pricesDisplayFormat = format(',');

  const x_max = xAccessor(data[data.length - 1]);
  const x_min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [x_min, x_max + 2];

  const gridHeight = height - margin.top - margin.bottom;
  
  // 클릭한 보조지표
  const subIndi = useSelector((state) => state.clickIndicator.subIndi);

  // default : 4
  const barChartHeight = subIndi.length < 3 ? gridHeight / 4 : gridHeight / 6;

  // 차트 추가될 때마다 origin 변경해주어야 함
  const barChartOrigin = (_, h) => [0, gridHeight - (subIndi.length + 1) * barChartHeight];
  
  // * (차트 개수)
  const chartHeight = gridHeight - barChartHeight * (subIndi.length + 1);

  const yExtents = (data) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const hoverTimeFormat = "%B %d, %Y";
  const HoverDisplayFormat = timeFormat(hoverTimeFormat);

  const barChartExtents = (data) => {
    return [data.volume, data.volume];
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

  const getLogoFileName = (name, code) => {
    if (name.includes("스팩")) {
      return "SPAC_230706";
    } else if (name.includes("ETN")) {
      return "ETN_230706";
    } else if (
      name.includes("KODEX") ||
      name.includes("KOSEF") ||
      name.includes("KoAct") ||
      name.includes("TIGER") ||
      name.includes("ACE") ||
      name.includes("ARIRANG") ||
      name.includes("합성 H") ||
      name.includes("HANARO") ||
      name.includes("SOL")
    ) {
      return "ETF_230706";
    } else {
      return `kr/${code}`;
    }
  };

  const onErrorImg = (e) => {
    e.target.src = default_Img;
  };

  return (
    <Container>
      <CompanyContainer>
        <CompanyLogo 
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
            company.name,
            company.code
          )}.png`}
          onError={onErrorImg} 
        />
        <FontContainer>
          <MainFont>{company.name}</MainFont>
          <SubFont>{company.code} {company.index}</SubFont>
        </FontContainer>
      </CompanyContainer>
      <BtnContainer>
        <Content>
          <button onClick={toggleCharts}>차트지표</button>
          <button onClick={toggleIndicators}>보조지표</button>
        </Content>
        <Content>
          <button>분</button>
          <button onClick={() => getData("D")}>일</button>
          <button onClick={() => getData("W")}>주</button>
          <button onClick={() => getData("M")}>월</button>
          <button onClick={() => getData("Y")}>년</button>
        </Content>
      </BtnContainer>
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
          <YAxis ticks={4} />
          <BarSeries 
            fillStyle={volumeColor} 
            yAccessor={volumeSeries}
          />

          <SingleValueTooltip
            origin={[12, 24]}
            yAccessor={d => d.volume}
            yLabel="거래량"
						yDisplayFormat={format(",")}
          />
        </Chart>

        {/* MACD 차트 */}
        {/* <Chart id={3} height={barChartHeight}
					yExtents={d => d.macd}
					origin={MACDChartOrigin}
				>
          <MACDChart datas={dataList} />
        </Chart> */}

        {/* STOCHF 차트 */}
        {subIndi.includes('STOCHF') && (
          <Chart id={3 + subIndi.indexOf('STOCHF')} height={barChartHeight}
            yExtents={data => [data.outFastK - 50, data.outFastK + 50]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('STOCHF')) * barChartHeight]}
          >
            <STOCHFChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* STOCHF 차트 */}
        {subIndi.includes('STOCH') && (
          <Chart id={3 + subIndi.indexOf('STOCH')} height={barChartHeight}
            yExtents={data => [data.outSlowK - 50, data.outSlowK + 50]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('STOCH')) * barChartHeight]}
          >
            <STOCHChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* RSI 차트 */}
        {subIndi.includes('RSI') && (
          <Chart id={3 + subIndi.indexOf('RSI')} height={barChartHeight}
            yExtents={data => [data.rsi - 20, data.rsi + 20]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('RSI')) * barChartHeight]}
          >
            <RSIChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* CCI 차트 */}
        {subIndi.includes('CCI') && (
          <Chart id={3 + subIndi.indexOf('CCI')} height={barChartHeight}
            yExtents={data => [data.cci - 100, data.cci + 100]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('CCI')) * barChartHeight]}
          >
            <CCIChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* MOM 차트 */}
        {subIndi.includes('MOM') && (
          <Chart id={3 + subIndi.indexOf('MOM')} height={barChartHeight}
            yExtents={data => [data.mom - 1000, data.mom + 1000]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('MOM')) * barChartHeight]}
          >
            <MOMChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* ROC 차트 */}
        {subIndi.includes('ROC') && (
          <Chart id={3 + subIndi.indexOf('ROC')} height={barChartHeight}
            yExtents={data => [data.roc - 5, data.roc + 5]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('ROC')) * barChartHeight]}
          >
            <ROCChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* AD 차트 */}
        {subIndi.includes('AD') && (
          <Chart id={3 + subIndi.indexOf('AD')} height={barChartHeight}
            yExtents={data => [data.ad - 5000000, data.ad + 5000000]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('AD')) * barChartHeight]}
          >
            <ADChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* ATR 차트 */}
        {subIndi.includes('ATR') && (
          <Chart id={3 + subIndi.indexOf('ATR')} height={barChartHeight}
            yExtents={data => [data.atr - 100, data.atr + 100]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('ATR')) * barChartHeight]}
          >
            <ATRChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* MFI 차트 */}
        {subIndi.includes('MFI') && (
          <Chart id={3 + subIndi.indexOf('MFI')} height={barChartHeight}
            yExtents={data => [data.mfi - 10, data.mfi + 10]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('MFI')) * barChartHeight]}
          >
            <MFIChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* OBV 차트 */}
        {subIndi.includes('OBV') && (
          <Chart id={3 + subIndi.indexOf('OBV')} height={barChartHeight}
            yExtents={data => [data.obv - 50000000, data.obv + 50000000]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('OBV')) * barChartHeight]}
          >
            <OBVChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* ADOSC 차트 */}
        {subIndi.includes('ADOSC') && (
          <Chart id={3 + subIndi.indexOf('ADOSC')} height={barChartHeight}
            yExtents={data => [data.adosc - 10000000, data.adosc + 10000000]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('ADOSC')) * barChartHeight]}
          >
            <ADOSCChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* TRIX 차트 */}
        {subIndi.includes('TRIX') && (
          <Chart id={3 + subIndi.indexOf('TRIX')} height={barChartHeight}
            yExtents={data => [data.trix - 0.1, data.trix + 0.1]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('TRIX')) * barChartHeight]}
          >
            <TRIXChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* WILLR 차트 */}
        {subIndi.includes('WILLR') && (
          <Chart id={3 + subIndi.indexOf('WILLR')} height={barChartHeight}
            yExtents={data => [data.willr - 30, data.willr + 30]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('WILLR')) * barChartHeight]}
          >
            <WILLRChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* DMI (DX) 차트 */}
        {/* 값 제대로 받아오는지 확인 필요 */}
        {subIndi.includes('DX') && (
          <Chart id={3 + subIndi.indexOf('DX')} height={barChartHeight}
            yExtents={data => [data.dx - 10, data.dx + 10]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('DX')) * barChartHeight]}
          >
            <DMIChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* ADX 차트 */}
        {subIndi.includes('ADX') && (
          <Chart id={3 + subIndi.indexOf('ADX')} height={barChartHeight}
            yExtents={data => [data.adx - 5, data.adx + 5]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('ADX')) * barChartHeight]}
          >
            <ADXChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* ADXR 차트 */}
        {subIndi.includes('ADXR') && (
          <Chart id={3 + subIndi.indexOf('ADXR')} height={barChartHeight}
            yExtents={data => [data.adxr - 10, data.adxr + 10]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('ADXR')) * barChartHeight]}
          >
            <ADXRChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* AROON 차트 */}
        {subIndi.includes('AROON') && (
          <Chart id={3 + subIndi.indexOf('AROON')} height={barChartHeight}
            yExtents={data => [data.aroon - 10, data.aroon + 10]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('AROON')) * barChartHeight]}
          >
            <AROONChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* AROONOSC 차트 */}
        {subIndi.includes('AROONOSC') && (
          <Chart id={3 + subIndi.indexOf('AROONOSC')} height={barChartHeight}
            yExtents={data => [data.aroonosc - 10, data.aroonosc + 10]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('AROONOSC')) * barChartHeight]}
          >
            <AROONOSCChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* STOCHRSI 차트 */}
        {subIndi.includes('STOCHRSI') && (
          <Chart id={3 + subIndi.indexOf('STOCHRSI')} height={barChartHeight}
            yExtents={data => [data.stochRsiK - 10, data.stochRsiD + 10]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('STOCHRSI')) * barChartHeight]}
          >
            <STOCHRSIChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* ULTOSC 차트 */}
        {subIndi.includes('ULTOSC') && (
          <Chart id={3 + subIndi.indexOf('ULTOSC')} height={barChartHeight}
            yExtents={data => [data.ultosc - 10, data.ultosc + 10]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('ULTOSC')) * barChartHeight]}
          >
            <ULTOSCChart datas={dataList} isShow={isShow} />
          </Chart>
        )}

        {/* PPO 차트 */}
        {/* PPO Signal 데이터인듯 */}
        {subIndi.includes('PPO') && (
          <Chart id={3 + subIndi.indexOf('PPO')} height={barChartHeight}
            yExtents={data => [data.ppo - 1, data.ppo + 1]}
            origin={(_, h) => [0 , gridHeight - (subIndi.length - subIndi.indexOf('PPO')) * barChartHeight]}
          >
            <PPOChart datas={dataList} isShow={isShow} />
          </Chart>
        )}
      </ChartCanvas>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 650px);
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

const BtnContainer = styled.div`
  display: flex;
`
