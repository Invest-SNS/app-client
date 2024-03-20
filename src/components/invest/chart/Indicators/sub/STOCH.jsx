import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSTOCHChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function STOCHChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.STOCH);
  const STOCHValue = useSelector((state) => state.indicatorValues.values.STOCH);

  const calculateSTOCH = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.outSlowK;
      delete newItem.outSlowD;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const outSlowK = data.result.outSlowK;
    const outSlowD = data.result.outSlowD;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["outSlowK"]: outSlowK[i], // 새로운 속성 추가
        ["outSlowD"]: outSlowD[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date" : STOCHValue[0],
        "period_K" : STOCHValue[1],
        "period_D" : STOCHValue[2]
      }
      dispatch(getSTOCHChart(data))
        .then((res) =>  calculateSTOCH(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.outSlowK;
        delete newItem.outSlowD;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, STOCHValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.outSlowK} strokeStyle='#363602' strokeWidth={1.3} />
      <LineSeries yAccessor={d => d.outSlowD} strokeStyle='#87870b' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.outSlowK}
        yLabel="Slow STO %K"
        yDisplayFormat={format(",")}
        labelFill='#363602'
      />
      <SingleValueTooltip
        origin={[12, 45]}
        yAccessor={d => d.outSlowD}
        yLabel="Slow STO %D"
        yDisplayFormat={format(",")}
        labelFill='#87870b'
      />
    </>
  )
}
