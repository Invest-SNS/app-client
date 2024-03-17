import React, { useEffect } from 'react';
import { LineSeries } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../store/reducers/Chart/chart';
import { getEMAChart } from '../../../../store/reducers/Chart/SubChart/subChart';

export default function EMAChart({ datas }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.subChart.EMA);

  const calculateEMA = (data) => {
    const responses = [data.response1, data.response2, data.response3, data.response4, data.response5];
    const newData = [...datas];
    responses.forEach((response, index) => {
      const f_idx = response.begIndex;
      const l_idx = response.nbElement;
      const subData = response.result.outReal;
      for (let i = 0; i < l_idx; i++) {
        const emaKey = `ema${[5, 10, 30, 60, 100][index]}`;
        newData[f_idx + i] = {
          ...newData[f_idx + i], // 기존 객체를 복사
          [emaKey]: subData[i] // 새로운 속성 추가
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
      dispatch(getEMAChart(data))
        .then((res) =>  calculateEMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.ema5;
        delete newItem.ema10;
        delete newItem.ema30;
        delete newItem.ema60;
        delete newItem.ema100;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive]);

  return (
    <>
      <LineSeries
        yAccessor={d => d.ema5} 
        strokeStyle='#b3009e'
      />
      <LineSeries 
        yAccessor={d => d.ema10} 
        strokeStyle='#b33300'
      />
      <LineSeries 
        yAccessor={d => d.ema30} 
        strokeStyle='#edda02'
      />
      <LineSeries 
        yAccessor={d => d.ema60} 
        strokeStyle='#00b33f'
      />  
      <LineSeries 
        yAccessor={d => d.ema100} 
        strokeStyle='#0277ed'
      />  
    </>
  )
}
