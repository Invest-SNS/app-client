import React, { useEffect } from 'react';
import { LineSeries } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getWMAChart } from '../../../../../store/reducers/Chart/Indicators/chart';

export default function WMAChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.WMA);
  const WMAValue = useSelector((state) => state.chartValues.values.WMA);

  const calculateWMA = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      Object.keys(item).forEach(key => {
        if (key.includes('wma')) {
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
        const wmaKey = `wma${[WMAValue[0], WMAValue[1], WMAValue[2], WMAValue[3], WMAValue[4]][index]}`;
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
        "lineTime1" : WMAValue[0],
        "lineTime2" : WMAValue[1],
        "lineTime3" : WMAValue[2],
        "lineTime4" : WMAValue[3],
        "lineTime5" : WMAValue[4]
      }
      dispatch(getWMAChart(data))
        .then((res) =>  calculateWMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        WMAValue.forEach((value) => {
          delete newItem[`wma${value}`];
        });
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, WMAValue, isShow]);

  return (
    <>
      {WMAValue.map((value, index) => (
        <LineSeries
          key={`wma${value}`}
          yAccessor={(d) => d[`wma${value}`]}
          strokeStyle={['#b3009e', '#b33300', '#edda02', '#00b33f', '#0277ed'][index]}
        />
      ))}
    </>
  )
}
