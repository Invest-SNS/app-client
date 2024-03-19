// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import { format } from "d3-format";
// import { timeFormat } from "d3-time-format";
// import {
//   elderRay,
//   ema,
//   discontinuousTimeScaleProviderBuilder,
//   Chart,
//   ChartCanvas,
//   CurrentCoordinate,
//   BarSeries,
//   CandlestickSeries,
//   ElderRaySeries,
//   LineSeries,
//   MovingAverageTooltip,
//   OHLCTooltip,
//   SingleValueTooltip,
//   lastVisibleItemBasedZoomAnchor,
//   XAxis,
//   YAxis,
//   CrossHairCursor,
//   EdgeIndicator,
//   MouseCoordinateX,
//   MouseCoordinateY,
//   ZoomButtons,
//   withDeviceRatio,
//   withSize,
//   HoverTooltip,
// } from "react-financial-charts";
// import { chartInstance } from '../../../lib/apis/api';
// import { useSelector, useDispatch } from 'react-redux';
// // import { getChartDatas } from '../../../store/reducers/Chart/chart'
// import styled from "styled-components";
// // import SMAChart from "./subChart/SMAChart";

// export default function MainChart({ toggleCharts, toggleIndicators }) {
//   // const dataList = useSelector((state) => state.chart.datas)
//   const company = useSelector((state) => state.company.data)
//   // const dispatch = useDispatch();
//   const [datas, setDatas] = useState([]);
//   async function getData() {
//     const data = await chartInstance.post('/stockPrice', {
//       "code" : "005930",
//       "start_date" : "19990101",
//       "end_date" : "20240313",
//       // 분, 일, 월, 연봉
//       "time_format" : "D"
//     })
//     setDatas(data.data.reverse());
//   }

//   useEffect(() => {
//     getData();
//     // dispatch(getChartDatas())
//     //   .then((res) => {
//     //     console.log('data payload',res.payload)
//     //   })

//     // console.log('데이터:', dataList)
//   }, [])

//   useEffect(() => {
//     console.log('company: ',company)
//     // accvolume: "333333"
//     // code: "005930"
//     // favorite: true
//     // id: 1
//     // index: "코스피"
//     // name: "삼성전자"
//     // prdy_vrss: "1100"
//     // price: "72800"
//     // returns: "0.55%"
//   }, [company])

//   const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
//     (d) => {
//       const year = d.date.substr(0, 4)
//       const month = d.date.substr(4, 2)
//       const day = d.date.substr(6, 2)
//       const nDate = `${year}-${month}-${day}`
//       return new Date(nDate)
//     }
//   );
//   const margin = { left: 0, right: 78, top: 0, bottom: 24 };

//   const height = 800;
//   const width = 1150;

//   const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(
//     datas
//   );

//   // 소수점 이하 둘째짜리까지만 표현
//   const pricesDisplayFormat = format(".2f");
//   const x_max = xAccessor(data[data.length - 1]);
//   const x_min = xAccessor(data[Math.max(0, data.length - 100)]);
//   const xExtents = [x_min, x_max + 5];

//   const gridHeight = height - margin.top - margin.bottom;

//   const elder = elderRay();
//   const elderRayHeight = 100;
//   const elderRayOrigin = (_, h) => [0, h];
//   const barChartHeight = gridHeight / 4;
//   const barChartOrigin = (_, h) => [0, h - barChartHeight];
//   const chartHeight = gridHeight - barChartHeight;
//   const yExtents = (data) => {
//     return [data.high, data.low];
//   };
//   const dateTimeFormat = "%d %b";
//   const timeDisplayFormat = timeFormat(dateTimeFormat);

//   const hoverTimeFormat = "%B %d, %Y";
//   const HoverDisplayFormat = timeFormat(hoverTimeFormat);

//   const barChartExtents = (data) => {
//     return data.volume;
//   };

//   const candleChartExtents = (data) => {
//     return [data.high, data.low];
//   };

//   const yEdgeIndicator = (data) => {
//     return data.close;
//   };

//   const volumeColor = (data) => {
//     return data.close > data.open
//       ? "rgba(38, 166, 154, 0.3)"
//       : "rgba(239, 83, 80, 0.3)";
//   };

//   const volumeSeries = (data) => {
//     return data.volume;
//   };

//   const openCloseColor = (data) => {
//     return data.close > data.open ? "#26a69a" : "#ef5350";
//   };

//   function tooltipContent() {
//     return ({ currentItem, xAccessor }) => {
//       return {
//         x: HoverDisplayFormat(xAccessor(currentItem)),
//         y: [
//           {
//             label: "시가",
//             value: currentItem.open && pricesDisplayFormat(currentItem.open)
//           },
//           {
//             label: "고가",
//             value: currentItem.high && pricesDisplayFormat(currentItem.high)
//           },
//           {
//             label: "저가",
//             value: currentItem.low && pricesDisplayFormat(currentItem.low)
//           },
//           {
//             label: "종가",
//             value: currentItem.close && pricesDisplayFormat(currentItem.close)
//           },
//           {
//             label: "거래량",
//             value: currentItem.volume && pricesDisplayFormat(currentItem.volume)
//           },
//         ]
//       };
//     };
//   }

//   function volumeContent() {
//     return ({ currentItem, xAccessor }) => {
//       return {
//         x: HoverDisplayFormat(xAccessor(currentItem)),
//         y: [
//           {
//             label: "거래량",
//             value: currentItem.volume && pricesDisplayFormat(currentItem.volume)
//           },
//         ]
//       };
//     };
//   }

//   return (
//     <Container>
//       <CompanyContainer>
//         <CompanyLogo src="https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png" />
//         <FontContainer>
//           <MainFont>{company.name}</MainFont>
//           <SubFont>{company.code} {company.index}</SubFont>
//         </FontContainer>
//       </CompanyContainer>
//       <Content>
//         <button onClick={toggleCharts}>차트지표</button>
//         <button onClick={toggleIndicators}>보조지표</button>
//       </Content>
//       <ChartCanvas
//         height={height}
//         ratio={3}
//         width={width}
//         margin={margin}
//         data={data}
//         displayXAccessor={displayXAccessor}
//         seriesName="Data"
//         xScale={xScale}
//         xAccessor={xAccessor}
//         xExtents={xExtents}
//         zoomAnchor={lastVisibleItemBasedZoomAnchor}
//       >
//         {/* 거래량 차트 */}
//         <Chart
//           id={2}
//           height={barChartHeight}
//           origin={barChartOrigin}
//           yExtents={barChartExtents}
//         >
//           <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
//           <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
//           <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
//         </Chart>
//         <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
//           {/* 분봉 호버했을 때, 날짜/시가/종가/고가/저가 표시 */}
//           <HoverTooltip
//             // yAccessor={ema26.accessor()}
//             tooltip={{ content: tooltipContent()}}
//             fontSize={15}
//           />
//           <XAxis showGridLines showTickLabel={false} />
//           <YAxis showGridLines tickFormat={pricesDisplayFormat} />
//           <CandlestickSeries />

//           {/* <SMAChart /> */}

//           <MouseCoordinateX displayFormat={timeDisplayFormat} />
//           <MouseCoordinateY
//             rectWidth={margin.right}
//             displayFormat={pricesDisplayFormat}
//           />
//           <EdgeIndicator
//             itemType="last"
//             rectWidth={margin.right}
//             fill={openCloseColor}
//             lineStroke={openCloseColor}
//             displayFormat={pricesDisplayFormat}
//             yAccessor={yEdgeIndicator}
//           />

//           <ZoomButtons />
//           <OHLCTooltip origin={[8, 16]} />
//         </Chart>
//         <CrossHairCursor />
//       </ChartCanvas>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const CompanyContainer = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 5px;
// `

// const CompanyLogo = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 999px;
//   margin-right: 10px;
// `

// const FontContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const MainFont = styled.span`
//   font-weight: 700;
// `

// const SubFont = styled.span`
//   font-size: 12px;
// `

// const Content = styled.div`
//   display: flex;
//   align-items: center;
// `;
