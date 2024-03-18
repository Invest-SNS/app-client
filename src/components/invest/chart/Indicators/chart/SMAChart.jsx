import React, { useEffect } from 'react';
import { LineSeries } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSMAChart } from '../../../../../store/reducers/Chart/Indicators/chart';

export default function SMAChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.SMA);
  const SMAValue = useSelector((state) => state.chartValues.values.SMA);

  const calculateSMA = (data) => {
    const updatedDatas = datas.map((item) => {
      const newItem = { ...item };
      Object.keys(item).forEach(key => {
        if (key.includes('sma')) {
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
        const smaKey = `sma${[SMAValue[0], SMAValue[1], SMAValue[2], SMAValue[3], SMAValue[4]][index]}`;
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
