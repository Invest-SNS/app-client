import React, { useEffect } from 'react';
import { LineSeries, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getADChart, getADXChart, getADXRChart, getAROONChart, getATRChart, getCCIChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function AROONChart({ datas }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.AROON);
  const AROONValue = useSelector((state) => state.indicatorValues.values.AROON);

  const calculateAROON = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.aroon;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const aroon = data.result.outAroonDown;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["aroon"]: aroon[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": AROONValue[0],
      }
      dispatch(getAROONChart(data))
        .then((res) =>  calculateAROON(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.aroon;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive]);

  const pricesDisplayFormat = format(".2f");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <LineSeries yAccessor={d => d.aroon} strokeStyle='#680A08' />
    </>
  )
}
