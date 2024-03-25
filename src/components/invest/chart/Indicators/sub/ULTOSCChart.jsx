import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getULTOSCChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function ULTOSCChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.ULTOSC);
  const ULTOSCValue = useSelector((state) => state.indicatorValues.values.ULTOSC);

  const calculateULTOSC = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'ULTOSC'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "longPeriod" : ULTOSCValue[0],
        "middlePeriod" : ULTOSCValue[1],
        "shortPeriod" : ULTOSCValue[2]
      }
      dispatch(getULTOSCChart(data))
        .then((res) =>  calculateULTOSC(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.ultosc;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, ULTOSCValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.ultosc} strokeStyle='#ada50c' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.ultosc}
        yLabel="Ultimate Oscillator"
        yDisplayFormat={format(",")}
        labelFill='#ada50c'
      />
    </>
  )
}
