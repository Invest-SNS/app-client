import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getROCChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function ROCChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.ROC);
  const ROCValue = useSelector((state) => state.indicatorValues.values.ROC);

  const calculateROC = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.roc;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const roc = data.result.outReal;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["roc"]: roc[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date" : ROCValue[0],
      }
      dispatch(getROCChart(data))
        .then((res) =>  calculateROC(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.roc;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, ROCValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <LineSeries yAccessor={d => d.roc} strokeStyle='#680A08' />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.roc}
        yLabel="ROC"
        yDisplayFormat={format(",")}
      />
    </>
  )
}
