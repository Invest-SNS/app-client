import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getATRChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function ATRChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.ATR);
  const ATRValue = useSelector((state) => state.indicatorValues.values.ATR);

  const calculateATR = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.atr;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const atr = data.result.outReal;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["atr"]: atr[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": ATRValue[0],
      }
      dispatch(getATRChart(data))
        .then((res) =>  calculateATR(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.atr;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, ATRValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <LineSeries yAccessor={d => d.atr} strokeStyle='#680A08' />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.atr}
        yLabel="ATR"
        yDisplayFormat={format(",")}
      />
    </>
  )
}
