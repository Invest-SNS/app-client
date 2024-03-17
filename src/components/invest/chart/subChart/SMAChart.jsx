import React, { useEffect } from 'react';
import { LineSeries } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../store/reducers/Chart/chart';
import { getSMAChart } from '../../../../store/reducers/Chart/SubChart/subChart';

export default function SMAChart({ datas }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.subChart.SMA);

  const calculateSMA = (data) => {
    const responses = [data.response1, data.response2, data.response3, data.response4, data.response5];
    const newData = [...datas];
    responses.forEach((response, index) => {
      const f_idx = response.begIndex;
      const l_idx = response.nbElement;
      const subData = response.result.outReal;
      for (let i = 0; i < l_idx; i++) {
        const smaKey = `sma${[5, 10, 30, 60, 100][index]}`;
        newData[f_idx + i] = {
          ...newData[f_idx + i], // 기존 객체를 복사
          [smaKey]: subData[i] // 새로운 속성 추가
        };
      }
    });
    // setSmaCalculated(true); // SMA 계산 완료
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
      dispatch(getSMAChart(data))
        .then((res) =>  calculateSMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.sma5;
        delete newItem.sma10;
        delete newItem.sma30;
        delete newItem.sma60;
        delete newItem.sma100;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive]);

  return (
    <>
      <LineSeries
        yAccessor={d => d.sma5} 
        strokeStyle='#b3009e'
      />
      <LineSeries 
        yAccessor={d => d.sma10} 
        strokeStyle='#b33300'
      />
      <LineSeries 
        yAccessor={d => d.sma30} 
        strokeStyle='#edda02'
      />
      <LineSeries 
        yAccessor={d => d.sma60} 
        strokeStyle='#00b33f'
      />  
      <LineSeries 
        yAccessor={d => d.sma100} 
        strokeStyle='#0277ed'
      />  
    </>
  )
}
