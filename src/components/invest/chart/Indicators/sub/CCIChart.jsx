import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getCCIChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function CCIChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.CCI);
  const CCIValue = useSelector((state) => state.indicatorValues.values.CCI);

  const calculateCCI = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'CCI'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date" : CCIValue[0],
      }
      dispatch(getCCIChart(data))
        .then((res) =>  calculateCCI(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.cci;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, CCIValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.cci} strokeStyle='#6a1cad' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.cci}
        yLabel="CCI"
        yDisplayFormat={format(",")}
        labelFill='#6a1cad'
      />
    </>
  )
}
