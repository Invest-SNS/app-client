import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getADXChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function ADXChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.ADX);
  const ADXValue = useSelector((state) => state.indicatorValues.values.ADX);

  const calculateADX = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'ADX'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": ADXValue[0],
      }
      dispatch(getADXChart(data))
        .then((res) =>  calculateADX(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.adx;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, ADXValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.adx} strokeStyle='#09b06d' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.adx}
        yLabel="ADX"
        yDisplayFormat={format(",")}
        labelFill='#09b06d'
      />
    </>
  )
}
