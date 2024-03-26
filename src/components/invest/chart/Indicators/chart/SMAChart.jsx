import React, { useEffect } from 'react';
import { Label, LineSeries, MovingAverageTooltip, SingleTooltip, SingleValueTooltip, ToolTipTSpanLabel, ToolTipText } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSMAChart } from '../../../../../store/reducers/Chart/Indicators/chart';
import styled from 'styled-components';

export default function SMAChart({ datas, isShow, chartIndi }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.SMA);
  const SMAValue = useSelector((state) => state.chartValues.values.SMA);

  const calculateSMA = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'SMA',
      value: SMAValue,
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "lineTime1" : SMAValue[0],
        "lineTime2" : SMAValue[1],
        "lineTime3" : SMAValue[2],
        "lineTime4" : SMAValue[3],
        "lineTime5" : SMAValue[4]
      }
      dispatch(getSMAChart(data))
        .then((res) =>  calculateSMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map((item) => {
        const newItem = { ...item };
        SMAValue.forEach((value) => {
          delete newItem[`sma${value}`];
        });
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, SMAValue, isShow]);

  return (
    <>
      <MovingAverageTooltip
        origin={[12, 40 + (chartIndi.indexOf('SMA') * 40)]}
        options={[
          {
            yAccessor: d => d[`sma${SMAValue[0]}`],
            type: `SMA`,
						stroke: '#b3009e',
            windowSize: SMAValue[0]
          },
          {
            yAccessor: d => d[`sma${SMAValue[1]}`],
            type: `SMA`,
						stroke: '#b33300',
            windowSize: SMAValue[1]
          },
          {
            yAccessor: d => d[`sma${SMAValue[2]}`],
            type: `SMA`,
						stroke: '#edda02',
            windowSize: SMAValue[2]
          },
          {
            yAccessor: d => d[`sma${SMAValue[3]}`],
            type: `SMA`,
						stroke: '#00b33f',
            windowSize: SMAValue[3]
          },
          {
            yAccessor: d => d[`sma${SMAValue[4]}`],
            type: `SMA`,
						stroke: '#0277ed',
            windowSize: SMAValue[4]
          },
        ]}
      />
      {SMAValue.map((value, index) => (
        <LineSeries
          key={`sma${value}`}
          yAccessor={(d) => d[`sma${value}`]}
          strokeStyle={['#b3009e', '#b33300', '#edda02', '#00b33f', '#0277ed'][index]}
        />
      ))}
    </>
  )
}
