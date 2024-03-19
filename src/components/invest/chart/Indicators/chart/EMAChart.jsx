import React, { useEffect } from 'react';
import { LineSeries } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getEMAChart } from '../../../../../store/reducers/Chart/Indicators/chart';

export default function EMAChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.EMA);
  const EMAValue = useSelector((state) => state.chartValues.values.EMA);

  const calculateEMA = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      Object.keys(item).forEach(key => {
        if (key.includes('ema')) {
          delete newItem[key];
        }
      });
      return newItem;
    });

    const responses = [data.response1, data.response2, data.response3, data.response4, data.response5];
    const newData = [...updatedDatas];
    responses.forEach((response, index) => {
      const f_idx = response.begIndex;
      const l_idx = response.nbElement;
      const subData = response.result.outReal;
      for (let i = 0; i < l_idx; i++) {
        const emaKey = `ema${[EMAValue[0], EMAValue[1], EMAValue[2], EMAValue[3], EMAValue[4]][index]}`;
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
        "lineTime1" : EMAValue[0],
        "lineTime2" : EMAValue[1],
        "lineTime3" : EMAValue[2],
        "lineTime4" : EMAValue[3],
        "lineTime5" : EMAValue[4]
      }
      dispatch(getEMAChart(data))
        .then((res) =>  calculateEMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        EMAValue.forEach((value) => {
          delete newItem[`ema${value}`];
        });
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, EMAValue, isShow]);

  return (
    <>
      {EMAValue.map((value, index) => (
        <LineSeries
          key={`ema${value}`}
          yAccessor={(d) => d[`ema${value}`]}
          strokeStyle={['#b3009e', '#b33300', '#edda02', '#00b33f', '#0277ed'][index]}
        />
      ))}
    </>
  )
}
