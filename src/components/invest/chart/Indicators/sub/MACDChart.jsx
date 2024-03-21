import React, { useEffect } from 'react';
import { BarSeries, Chart, LineSeries, MACDSeries, MACDTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getMACDChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function MACDChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.MACD);
  const MACDValue = useSelector((state) => state.indicatorValues.values.MACD);

  const calculateMACD = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'MACD'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "longPeriod" : MACDValue[0],
        "shortPeriod" : MACDValue[1],
        "signalPeriod" : MACDValue[2]
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
  }, [isActive, MACDValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <MACDSeries
        yAccessor={d => ({
          divergence: d.macdHist,
          macd: d.macd,
          signal: d.macdSignal
        })}
        strokeStyle={{
          macd: '#680A08',
          signal: '#A8693D'
        }}
        fillStyle={{divergence: d => d.macdHist > 0 ? '#F5E872' : '#A3E79A'}}
      />
      <MACDTooltip
        origin={[12, 30]}
        options={{
          fast: MACDValue[0],
          slow: MACDValue[1],
          signal: MACDValue[2]
        }}
        yAccessor={d => ({
          divergence: d.macdHist,
          macd: d.macd,
          signal: d.macdSignal
        })}
        appearance={{
          strokeStyle: {
            macd: '#680A08',
            signal: '#A8693D'
          },
          fillStyle: {divergence: d => d.macdHist > 0 ? '#F5E872' : '#A3E79A'}
        }}
      />
    </>
  )
}
