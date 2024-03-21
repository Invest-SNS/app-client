import React, { useEffect } from 'react';
import { BarSeries, SingleValueTooltip, StraightLine, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getAROONOSCChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function AROONOSCChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.AROONOSC);
  const AROONOSCValue = useSelector((state) => state.indicatorValues.values.AROONOSC);

  const calculateAROONOSC = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'AROONOSC'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "Date": AROONOSCValue[0],
      }
      dispatch(getAROONOSCChart(data))
        .then((res) =>  calculateAROONOSC(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.aroonosc;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, AROONOSCValue, isShow]);

  const pricesDisplayFormat = format(",");
  const volumeColor = (data) => {
    return data.aroonosc > 0
      ? "#EDD02B"
      : "#2679ED";
  };

  return (
    <>
      <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
      <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
      <StraightLine yValue={0} lineDash={"ShortDash2"} strokeStyle='#aeafb0' />
      <BarSeries 
        fillStyle={volumeColor} 
        yAccessor={d => d.aroonosc}
        baseAt={(xScale, yScale, d) => yScale(0)}
      />
      <SingleValueTooltip
        origin={[12, 30]}
        yAccessor={d => d.aroonosc}
        yLabel="Aroon Oscillator"
        yDisplayFormat={format(",")}
      />
    </>
  )
}
