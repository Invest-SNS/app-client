import React, { useEffect } from 'react';
import { Chart, LineSeries, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getMACDChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function MACDChart({ datas }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.MACD);

  const calculateMACD = (data) => {
    const newData = [...datas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const macd = data.result.outMACD;
    const macdSignal = data.result.outMACDSignal;
    const macdHist = data.result.outMACDHist;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["macd"]: macd[i], // 새로운 속성 추가
        ["macdSignal"]: macdSignal[i], // 새로운 속성 추가
        ["macdHist"]: macdHist[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "shortPeriod" : 12,
        "longPeriod" : 26,
        "signalPeriod" : 9
      }
      dispatch(getMACDChart(data))
        .then((res) =>  calculateMACD(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.macd;
        delete newItem.macdSignal;
        delete newItem.macdHist;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive]);

  const barChartHeight = 250;
  // const barChartOrigin = (w, h) => [0, h - barChartHeight];
  const pricesDisplayFormat = format(".2f");
  const MACDChartExtents = (data) => {
    return data.macd;
  };

  return (
    <>
      <Chart
        id={4}
        height={barChartHeight}
        // origin={barChartOrigin}
        yExtents={MACDChartExtents}
        >
        <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
        <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
        <LineSeries
          yAccessor={d => d.macd} 
          strokeStyle='#b3009e'
        />
        <LineSeries 
          yAccessor={d => d.macdSignal} 
          strokeStyle='#b33300'
        />
        {/* <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} /> */}
      </Chart>
    </>
  )
}
