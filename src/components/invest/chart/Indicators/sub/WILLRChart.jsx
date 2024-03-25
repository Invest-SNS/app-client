import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getWILLRChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function WILLRChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.WILLR);
  const WILLRValue = useSelector((state) => state.indicatorValues.values.WILLR);

  const calculateWILLR = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'WILLR'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": WILLRValue[0],
      }
      dispatch(getWILLRChart(data))
        .then((res) =>  calculateWILLR(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.willr;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, WILLRValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.willr} strokeStyle='#095db0' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.willr}
        yLabel="Williams %R"
        yDisplayFormat={format(",")}
        labelFill='#095db0'
      />
    </>
  )
}
