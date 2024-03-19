import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSTOCHFChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function STOCHFChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.STOCHF);
  const STOCHFValue = useSelector((state) => state.indicatorValues.values.STOCHF);

  const calculateSTOCHF = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.outFastK;
      delete newItem.outFastD;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const outFastK = data.result.outFastK;
    const outFastD = data.result.outFastD;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["outFastK"]: outFastK[i], // 새로운 속성 추가
        ["outFastD"]: outFastD[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "period_K" : STOCHFValue[0],
        "period_D" : STOCHFValue[1]
      }
      dispatch(getSTOCHFChart(data))
        .then((res) =>  calculateSTOCHF(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.outFastK;
        delete newItem.outFastD;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, STOCHFValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <LineSeries yAccessor={d => d.outFastK} strokeStyle='#680A08' />
      <LineSeries yAccessor={d => d.outFastD} strokeStyle='#A8693D' />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.outFastK}
        yLabel="Stochastic Fast"
        yDisplayFormat={format(",")}
      />
    </>
  )
}
