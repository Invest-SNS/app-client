import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getROCChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function ROCChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.ROC);
  const ROCValue = useSelector((state) => state.indicatorValues.values.ROC);

  const calculateROC = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'ROC'
    }));
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
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.roc} strokeStyle='#c2155a' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.roc}
        yLabel="ROC"
        yDisplayFormat={format(",")}
        labelFill='#c2155a'
      />
    </>
  )
}
