import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getADChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function ADChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.AD);

  const calculateAD = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'AD'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
      }
      dispatch(getADChart(data))
        .then((res) =>  calculateAD(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.ad;
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
      <LineSeries yAccessor={d => d.ad} strokeStyle='#09b01f' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.ad}
        yLabel="AD Line"
        yDisplayFormat={format(",")}
        labelFill='#09b01f'
      />
    </>
  )
}
