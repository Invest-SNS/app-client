import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSTOCHFChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function STOCHFChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.STOCHF);
  const STOCHFValue = useSelector((state) => state.indicatorValues.values.STOCHF);

  const calculateSTOCHF = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'STOCHF'
    }));
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
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.outFastK} strokeStyle='#680A08' strokeWidth={1.3} />
      <LineSeries yAccessor={d => d.outFastD} strokeStyle='#B87A80' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.outFastK}
        yLabel="Fast STO %K"
        yDisplayFormat={format(",")}
        labelFill='#680A08'
      />
      <SingleValueTooltip
        origin={[12, 45]}
        yAccessor={d => d.outFastD}
        yLabel="Fast STO %D"
        yDisplayFormat={format(",")}
        labelFill='#B87A80'
      />
    </>
  )
}
