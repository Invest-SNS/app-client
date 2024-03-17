import React, { useEffect, useState } from 'react';
import { Chart, ChartCanvas, CurrentCoordinate, LineSeries, ema } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../store/reducers/Chart/chart';
import { getWMAChart } from '../../../../store/reducers/Chart/SubChart/subChart';

export default function WMAChart({ datas }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.subChart.WMA);

  const calculateWMA = (data) => {
    const responses = [data.response1, data.response2, data.response3, data.response4, data.response5];
    const newData = [...datas];
    responses.forEach((response, index) => {
      const f_idx = response.begIndex;
      const l_idx = response.nbElement;
      const subData = response.result.outReal;
      for (let i = 0; i < l_idx; i++) {
        const wmaKey = `wma${[5, 10, 30, 60, 100][index]}`;
        newData[f_idx + i] = {
          ...newData[f_idx + i], // 기존 객체를 복사
          [wmaKey]: subData[i] // 새로운 속성 추가
        };
      }
    });
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "lineTime1" : 5,
        "lineTime2" : 10,
        "lineTime3" : 30,
        "lineTime4" : 60,
        "lineTime5" : 120
      }
      dispatch(getWMAChart(data))
        .then((res) =>  calculateWMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.wma5;
        delete newItem.wma10;
        delete newItem.wma30;
        delete newItem.wma60;
        delete newItem.wma100;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive]);

  return (
    <>
      <LineSeries
        yAccessor={d => d.wma5} 
        strokeStyle='#b3009e'
      />
      <LineSeries 
        yAccessor={d => d.wma10} 
        strokeStyle='#b33300'
      />
      <LineSeries 
        yAccessor={d => d.wma30} 
        strokeStyle='#edda02'
      />
      <LineSeries 
        yAccessor={d => d.wma60} 
        strokeStyle='#00b33f'
      />  
      <LineSeries 
        yAccessor={d => d.wma100} 
        strokeStyle='#0277ed'
      />  
    </>
  )
}
