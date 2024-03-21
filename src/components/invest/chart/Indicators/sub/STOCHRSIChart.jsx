import React, { useEffect } from 'react';
import { LineSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSTOCHRSIChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function STOCHRSIChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.STOCHRSI);
  const STOCHRSIValue = useSelector((state) => state.indicatorValues.values.STOCHRSI);

  const calculateSTOCHRSI = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'STOCHRSI'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date" : STOCHRSIValue[0],
        "period_K" : STOCHRSIValue[1],
        "period_D" : STOCHRSIValue[2]
      }
      dispatch(getSTOCHRSIChart(data))
        .then((res) =>  calculateSTOCHRSI(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.stochRsiK;
        delete newItem.stochRsiD;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, STOCHRSIValue, isShow]);

  const pricesDisplayFormat = format(",");

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <LineSeries yAccessor={d => d.stochRsiK} strokeStyle='#04590b' strokeWidth={1.3} />
      <LineSeries yAccessor={d => d.stochRsiD} strokeStyle='#55a35b' strokeWidth={1.3} />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.stochRsiK}
        yLabel="Stochastic RSI %K"
        yDisplayFormat={format(",")}
        labelFill='#04590b'
      />
      <SingleValueTooltip
        origin={[12, 45]}
        yAccessor={d => d.stochRsiD}
        yLabel="Stochastic RSI %D"
        yDisplayFormat={format(",")}
        labelFill='#55a35b'
      />
    </>
  )
}
