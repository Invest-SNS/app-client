import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getMOMChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function MOMChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.MOM);
  const MOMValue = useSelector((state) => state.indicatorValues.values.MOM);

  const calculateMOM = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'MOM'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date" : MOMValue[0],
      }
      dispatch(getMOMChart(data))
        .then((res) =>  calculateMOM(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.mom;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, MOMValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.mom} strokeStyle='#c215ae' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.mom}
        yLabel="모멘텀"
        yDisplayFormat={format(",")}
        labelFill='#c215ae'
      />
    </>
  )
}
