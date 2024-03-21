import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getTRIXChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function TRIXChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.TRIX);
  const TRIXValue = useSelector((state) => state.indicatorValues.values.TRIX);

  const calculateTRIX = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'TRIX'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": TRIXValue[0],
      }
      dispatch(getTRIXChart(data))
        .then((res) =>  calculateTRIX(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.trix;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, TRIXValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.trix} strokeStyle='#b03609' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.trix}
        yLabel="TRIX"
        yDisplayFormat={format(",")}
        labelFill='#b03609'
      />
    </>
  )
}
