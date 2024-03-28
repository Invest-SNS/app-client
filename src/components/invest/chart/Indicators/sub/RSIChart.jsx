import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getRSIChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function RSIChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.RSI);
  const RSIValue = useSelector((state) => state.indicatorValues.values.RSI);

  const calculateRSI = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'RSI'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date" : RSIValue[0],
      }
      dispatch(getRSIChart(data))
        .then((res) =>  calculateRSI(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.rsi;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, RSIValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.rsi} strokeStyle='#15857b' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.rsi}
        yLabel="RSI"
        yDisplayFormat={format(",")}
        labelFill='#15857b'
      />
    </>
  )
}
