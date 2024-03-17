import React, { useEffect, useState } from 'react';
import { Chart, ChartCanvas, CurrentCoordinate, LineSeries, ema } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../store/reducers/Chart/chart';
import { getBBANDSChart, getWMAChart } from '../../../../store/reducers/Chart/SubChart/subChart';

export default function BBANDSChart({ datas }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.subChart.BBANDS);

  const calculateBBANDS = (data) => {
    console.log('bbands', data)
    const newData = [...datas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const upData = data.result.outRealUpperBand;
    const midData = data.result.outRealMiddleBand;
    const lowData = data.result.outRealLowerBand;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["upper"]: upData[i], // 새로운 속성 추가
        ["middle"]: midData[i], // 새로운 속성 추가
        ["lower"]: lowData[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "lineTime" : 5,
        "stdev" : 2,
      }
      dispatch(getBBANDSChart(data))
        .then((res) =>  calculateBBANDS(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.upper;
        delete newItem.middle;
        delete newItem.lower;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive]);

  return (
    <>
      <LineSeries
        yAccessor={d => d.upper} 
        strokeStyle='#b3009e'
      />
      <LineSeries 
        yAccessor={d => d.middle} 
        strokeStyle='#b33300'
      />
      <LineSeries 
        yAccessor={d => d.lower} 
        strokeStyle='#edda02'
      />
    </>
  )
}
