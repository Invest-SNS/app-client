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
  SingleValueTooltip,
} from "react-financial-charts";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  getChartDatas,
  setLiveData,
} from "../../../store/reducers/Chart/chart";

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

import { useWebSocket } from "../../../lib/hooks/useWebSocket";
import ButtonContainer from "./ButtonContainer";
import TitleContainer from "./TitleContainer";

export default function MainChart({ toggleCharts, toggleIndicators, showCharts, showIndicators }) {
  const dataList = useSelector((state) => state.chart.datas);
  const clickDate = useSelector((state) => state.chart.date);
  const company = useSelector((state) => state.company.data[1]);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  // 클릭한 보조지표
  const subIndi = useSelector((state) => state.clickIndicator.subIndi);
  const chartIndi = useSelector((state) => state.clickIndicator.chartIndi);

  const { askPrice, nowPrice } = useWebSocket();
  const [upNum, setUpNum] = useState(0);
  
  // 일, 주, 월, 년 데이터 불러오는 함수
  function getData(format) {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, "");
    const data = {
      code: company.code,
      start_date: "19990101",
      end_date: formattedDate,
      time_format: format,
    };

    dispatch(getChartDatas(data)).then((res) => setIsShow((prev) => !prev));
  }

  useEffect(() => {
    getData(clickDate);
  }, [company]);

  // socket 연결 시, 현재가 불러올때마다 data에 저장
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, "");

    if (nowPrice) {
      setUpNum(parseFloat(nowPrice.message.close) - parseFloat(dataList[dataList.length - 2].close))
      nowPrice.message['date'] = formattedDate;
      dispatch(setLiveData(nowPrice.message));
    }
  }, [nowPrice]);

  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => {
      const year = d?.date?.substr(0, 4);
      const month = d?.date?.substr(4, 2);
      const day = d?.date?.substr(6, 2);
      const nDate = `${year}-${month}-${day}`;
      return new Date(nDate);
    });

  const margin = { left: 5, right: 75, top: 10, bottom: 24 };

  // window 사이즈에 맞춘 넓이/높이
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // 브라우저 높이에서 178px을 빼서 height 상태 업데이트
    const updateHeight = () => {
      const calculatedHeight = window.innerHeight - 178;
      setHeight(calculatedHeight);
    };

    // 브라우저 넓이에서 650px을 빼서 width 상태 업데이트
    const updateWidth = () => {
      const calculatedWidth = window.innerWidth - 650;
      setWidth(calculatedWidth);
    };

    // 컴포넌트 마운트 시 높이, 넓이 계산
    updateHeight();
    updateWidth();

    // 브라우저 창 크기가 변경될 때마다 높이 재계산
    window.addEventListener('resize', updateHeight);
    window.addEventListener('resize', updateWidth);

    // cleanup 함수
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(dataList);

  // 소수점 이하 둘째짜리까지만 표현
  const pricesDisplayFormat = format(",");

  const x_max = xAccessor(data[data.length - 1]);
  const x_min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [x_min, x_max + 2];

  const gridHeight = height - margin.top - margin.bottom;

  // default : 4
  const barChartHeight = subIndi.length < 3 ? gridHeight / 4 : gridHeight / 6;

  // 차트 추가될 때마다 origin 변경
  const barChartOrigin = (_, h) => [
    0,
    gridHeight - (subIndi.length + 1) * barChartHeight,
  ];

  // * (차트 개수)
  const chartHeight = gridHeight - barChartHeight * (subIndi.length + 1);

  const dateTimeFormat = "%Y/%m/%d";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const hoverTimeFormat = "%Y년 %m월 %d일";
  const HoverDisplayFormat = timeFormat(hoverTimeFormat);

  const barChartExtents = (data) => {
    return data?.volume;
  };

  const candleChartExtents = (data) => {
    return [data?.high, data?.low];
  };

  const yEdgeIndicator = (data) => {
    return data?.close;
  };

  const volumeColor = (data) => {
    return data?.close > data?.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data) => {
    return data?.volume;
  };

  const openCloseColor = (data) => {
    return data?.close > data?.open ? "#26a69a" : "#ef5350";
  };

  // hover 했을 때 보여줄 데이터
  function tooltipContent() {
    return ({ currentItem, xAccessor }) => {
      return {
        x: HoverDisplayFormat(xAccessor(currentItem)),
        y: [
          {
            label: "시가",
            value: currentItem?.open && pricesDisplayFormat(currentItem?.open),
          },
          {
            label: "종가",
            value:
              currentItem?.close && pricesDisplayFormat(currentItem?.close),
          },
          {
            label: "고가",
            value: currentItem?.high && pricesDisplayFormat(currentItem?.high),
          },
          {
            label: "저가",
            value: currentItem?.low && pricesDisplayFormat(currentItem?.low),
          },
          {
            label: "거래량",
            value:
              currentItem?.volume && pricesDisplayFormat(currentItem?.volume),
          },
        ],
      };
    };
  }

  return (
    <Container>
      {dataList?.length > 0 ? (
        <>
          <TitleContainer
            nowPrice={nowPrice}
            company={company}
            upNum={upNum}
            dataList={dataList}
          />
          <ButtonContainer
            showCharts={showCharts}
            showIndicators={showIndicators}
            toggleCharts={toggleCharts}
            toggleIndicators={toggleIndicators}
            getData={getData}
            clickDate={clickDate}
          />
          {/* 차트 */}
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
            {/* 주식 캔들 차트 및 차트 지표 */}
            <Chart
              id={1}
              height={chartHeight}
              yExtents={candleChartExtents}
              padding={20}
            >
              {/* 분봉 호버했을 때, 날짜/시가/종가/고가/저가 표시 */}
              <HoverTooltip
                tooltip={{ content: tooltipContent() }}
                fontSize={14}
                toolTipStrokeStyle="#fca57e"
                toolTipFillStyle="#fff"
                background={{
                  fillStyle: "rgba(255, 227, 215, 0.3)",
                  strokeStyle: "ShortDash2",
                }}
              />
              <XAxis showGridLines showTickLabel={false} />
              <YAxis showGridLines tickFormat={pricesDisplayFormat} />
              <CandlestickSeries />

              {/* 차트지표 */}
              {chartIndi.includes("SMA") && (
                <SMAChart
                  datas={dataList}
                  chartIndi={chartIndi}
                  isShow={isShow}
                />
              )}
              {chartIndi.includes("WMA") && (
                <WMAChart
                  datas={dataList}
                  chartIndi={chartIndi}
                  isShow={isShow}
                />
              )}
              {chartIndi.includes("EMA") && (
                <EMAChart
                  datas={dataList}
                  chartIndi={chartIndi}
                  isShow={isShow}
                />
              )}
              {chartIndi.includes("BBANDS") && (
                <BBANDSChart
                  datas={dataList}
                  chartIndi={chartIndi}
                  isShow={isShow}
                />
              )}
              {chartIndi.includes("SAR") && (
                <SARChart
                  datas={dataList}
                  chartIndi={chartIndi}
                  isShow={isShow}
                />
              )}

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
                fullWidth={true}
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
              padding={{
                top: 30,
                bottom: 0,
              }}
            >
              <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
              <YAxis tickFormat={pricesDisplayFormat} />
              <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />

              <SingleValueTooltip
                origin={[12, 24]}
                yAccessor={(d) => d.volume}
                yLabel="거래량"
                yDisplayFormat={format(",")}
              />
            </Chart>

            {/* MACD 차트 */}
            {subIndi.includes("MACD") && (
              <Chart
                id={3 + subIndi.indexOf("MACD")}
                height={barChartHeight}
                yExtents={(d) => d.macd}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("MACD")) * barChartHeight,
                ]}
              >
                <MACDChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* STOCHF 차트 */}
            {subIndi.includes("STOCHF") && (
              <Chart
                id={3 + subIndi.indexOf("STOCHF")}
                height={barChartHeight}
                yExtents={(data) => data.outFastK}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("STOCHF")) *
                      barChartHeight,
                ]}
              >
                <STOCHFChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* STOCHF 차트 */}
            {subIndi.includes("STOCH") && (
              <Chart
                id={3 + subIndi.indexOf("STOCH")}
                height={barChartHeight}
                yExtents={(data) => data.outSlowK}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("STOCH")) *
                      barChartHeight,
                ]}
              >
                <STOCHChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* RSI 차트 */}
            {subIndi.includes("RSI") && (
              <Chart
                id={3 + subIndi.indexOf("RSI")}
                height={barChartHeight}
                yExtents={(data) => data.rsi}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("RSI")) * barChartHeight,
                ]}
              >
                <RSIChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* CCI 차트 */}
            {subIndi.includes("CCI") && (
              <Chart
                id={3 + subIndi.indexOf("CCI")}
                height={barChartHeight}
                yExtents={(data) => data.cci}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("CCI")) * barChartHeight,
                ]}
              >
                <CCIChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* MOM 차트 */}
            {subIndi.includes("MOM") && (
              <Chart
                id={3 + subIndi.indexOf("MOM")}
                height={barChartHeight}
                yExtents={(data) => data.mom}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("MOM")) * barChartHeight,
                ]}
              >
                <MOMChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* ROC 차트 */}
            {subIndi.includes("ROC") && (
              <Chart
                id={3 + subIndi.indexOf("ROC")}
                height={barChartHeight}
                yExtents={(data) => data.roc}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("ROC")) * barChartHeight,
                ]}
              >
                <ROCChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* AD 차트 */}
            {subIndi.includes("AD") && (
              <Chart
                id={3 + subIndi.indexOf("AD")}
                height={barChartHeight}
                yExtents={(data) => data.ad}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("AD")) * barChartHeight,
                ]}
              >
                <ADChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* ATR 차트 */}
            {subIndi.includes("ATR") && (
              <Chart
                id={3 + subIndi.indexOf("ATR")}
                height={barChartHeight}
                yExtents={(data) => data.atr}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("ATR")) * barChartHeight,
                ]}
              >
                <ATRChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* MFI 차트 */}
            {subIndi.includes("MFI") && (
              <Chart
                id={3 + subIndi.indexOf("MFI")}
                height={barChartHeight}
                yExtents={(data) => data.mfi}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("MFI")) * barChartHeight,
                ]}
              >
                <MFIChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* OBV 차트 */}
            {subIndi.includes("OBV") && (
              <Chart
                id={3 + subIndi.indexOf("OBV")}
                height={barChartHeight}
                yExtents={(data) => data.obv}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("OBV")) * barChartHeight,
                ]}
              >
                <OBVChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* ADOSC 차트 */}
            {subIndi.includes("ADOSC") && (
              <Chart
                id={3 + subIndi.indexOf("ADOSC")}
                height={barChartHeight}
                yExtents={(data) => data.adosc}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("ADOSC")) *
                      barChartHeight,
                ]}
              >
                <ADOSCChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* TRIX 차트 */}
            {subIndi.includes("TRIX") && (
              <Chart
                id={3 + subIndi.indexOf("TRIX")}
                height={barChartHeight}
                yExtents={(data) => data.trix}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("TRIX")) * barChartHeight,
                ]}
              >
                <TRIXChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* WILLR 차트 */}
            {subIndi.includes("WILLR") && (
              <Chart
                id={3 + subIndi.indexOf("WILLR")}
                height={barChartHeight}
                yExtents={(data) => data.willr}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("WILLR")) *
                      barChartHeight,
                ]}
              >
                <WILLRChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* DMI (DX) 차트 */}
            {/* 값 제대로 받아오는지 확인 필요 */}
            {subIndi.includes("DX") && (
              <Chart
                id={3 + subIndi.indexOf("DX")}
                height={barChartHeight}
                yExtents={(data) => data.dx}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("DX")) * barChartHeight,
                ]}
              >
                <DMIChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* ADX 차트 */}
            {subIndi.includes("ADX") && (
              <Chart
                id={3 + subIndi.indexOf("ADX")}
                height={barChartHeight}
                yExtents={(data) => data.adx}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("ADX")) * barChartHeight,
                ]}
              >
                <ADXChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* ADXR 차트 */}
            {subIndi.includes("ADXR") && (
              <Chart
                id={3 + subIndi.indexOf("ADXR")}
                height={barChartHeight}
                yExtents={(data) => data.adxr}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("ADXR")) * barChartHeight,
                ]}
              >
                <ADXRChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* AROON 차트 */}
            {subIndi.includes("AROON") && (
              <Chart
                id={3 + subIndi.indexOf("AROON")}
                height={barChartHeight}
                yExtents={(data) => data.aroonDown}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("AROON")) *
                      barChartHeight,
                ]}
              >
                <AROONChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* AROONOSC 차트 */}
            {subIndi.includes("AROONOSC") && (
              <Chart
                id={3 + subIndi.indexOf("AROONOSC")}
                height={barChartHeight}
                yExtents={(data) => data.aroonosc}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("AROONOSC")) *
                      barChartHeight,
                ]}
              >
                <AROONOSCChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* STOCHRSI 차트 */}
            {subIndi.includes("STOCHRSI") && (
              <Chart
                id={3 + subIndi.indexOf("STOCHRSI")}
                height={barChartHeight}
                yExtents={(data) => data.stochRsiK}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("STOCHRSI")) *
                      barChartHeight,
                ]}
              >
                <STOCHRSIChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* ULTOSC 차트 */}
            {subIndi.includes("ULTOSC") && (
              <Chart
                id={3 + subIndi.indexOf("ULTOSC")}
                height={barChartHeight}
                yExtents={(data) => data.ultosc}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("ULTOSC")) *
                      barChartHeight,
                ]}
              >
                <ULTOSCChart datas={dataList} isShow={isShow} />
              </Chart>
            )}

            {/* PPO 차트 */}
            {/* PPO Signal 데이터인듯 */}
            {subIndi.includes("PPO") && (
              <Chart
                id={3 + subIndi.indexOf("PPO")}
                height={barChartHeight}
                yExtents={(data) => data.ppo}
                padding={20}
                origin={(_, h) => [
                  0,
                  gridHeight -
                    (subIndi.length - subIndi.indexOf("PPO")) * barChartHeight,
                ]}
              >
                <PPOChart datas={dataList} isShow={isShow} />
              </Chart>
            )}
          </ChartCanvas>
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 650px);
  // padding: 0 10px;
`;

