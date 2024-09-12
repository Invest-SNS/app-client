import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getPPOChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function PPOChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.PPO);
  const PPOValue = useSelector((state) => state.indicatorValues.values.PPO);

  const calculatePPO = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'PPO'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "longPeriod": PPOValue[0],
        "shortPeriod": PPOValue[1]
      }
      dispatch(getPPOChart(data))
        .then((res) =>  calculatePPO(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.ppo;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, PPOValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.ppo} strokeStyle='#0c5fad' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.ppo}
        yLabel="PPO"
        yDisplayFormat={format(",")}
        labelFill='#0c5fad'
      />
    </>
  )
}
