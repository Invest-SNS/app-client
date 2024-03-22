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
      <SingleTooltip
        origin={[12, 40 + (chartIndi.indexOf('SMA') * 15)]}
        yLabel="단순 이동평균"
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
