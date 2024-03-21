import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getDXChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function DMIChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.DX);
  const DXValue = useSelector((state) => state.indicatorValues.values.DX);

  const calculateDX = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'DMI'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": DXValue[0],
      }
      dispatch(getDXChart(data))
        .then((res) =>  calculateDX(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.dx;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, DXValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.dx} strokeStyle='#8109b0' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.dx}
        yLabel="DMI"
        yDisplayFormat={format(",")}
        labelFill='#8109b0'
      />
    </>
  )
}
