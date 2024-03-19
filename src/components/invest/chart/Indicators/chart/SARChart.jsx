import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSARChart } from '../../../../../store/reducers/Chart/Indicators/chart';
import { SARSeries } from 'react-financial-charts';

export default function SARChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.SAR);
  const SARValue = useSelector((state) => state.chartValues.values.SAR);

  const calculateSAR = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.sar;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const sarData = data.result.outReal;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["sar"]: sarData[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "acc" : SARValue[0],
        "accMax" : SARValue[1],
      }
      dispatch(getSARChart(data))
        .then((res) =>  calculateSAR(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.sar;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, SARValue, isShow]);

  return (
    <>
      <SARSeries yAccessor={d => d.sar} />
    </>
  )
}
