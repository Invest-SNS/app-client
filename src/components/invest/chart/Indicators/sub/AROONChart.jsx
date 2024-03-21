import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getAROONChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function AROONChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.AROON);
  const AROONValue = useSelector((state) => state.indicatorValues.values.AROON);

  const calculateAROON = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'AROON'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": AROONValue[0],
      }
      dispatch(getAROONChart(data))
        .then((res) =>  calculateAROON(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.aroonDown;
        delete newItem.aroonUp;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, AROONValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.aroonUp} strokeStyle='#EDD02B' strokeWidth={1.3} />
      <LineSeries yAccessor={d => d.aroonDown} strokeStyle='#680A08' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.aroonUp}
        yLabel="Aroon Up"
        yDisplayFormat={format(",")}
        labelFill='#EDD02B'
      />
      <SingleValueTooltip
        origin={[12, 45]}
        yAccessor={d => d.aroonDown}
        yLabel="Aroon Down"
        yDisplayFormat={format(",")}
        labelFill='#680A08'
      />
    </>
  )
}
