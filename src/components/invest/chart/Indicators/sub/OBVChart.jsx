import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getOBVChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function OBVChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.OBV);

  const calculateOBV = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'OBV'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
      }
      dispatch(getOBVChart(data))
        .then((res) =>  calculateOBV(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.obv;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.obv} strokeStyle='#b09409' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.obv}
        yLabel="OBV"
        yDisplayFormat={format(",")}
        labelFill='#b09409'
      />
    </>
  )
}
