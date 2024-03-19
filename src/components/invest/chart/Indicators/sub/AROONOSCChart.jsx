import React, { useEffect } from 'react';
import { BarSeries, SingleValueTooltip, XAxis, YAxis } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getAROONOSCChart } from '../../../../../store/reducers/Chart/Indicators/sub';
import { format } from 'd3-format';

export default function AROONOSCChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.AROONOSC);
  const AROONOSCValue = useSelector((state) => state.indicatorValues.values.AROONOSC);

  const calculateAROONOSC = (data) => {
    const updatedDatas = datas.map(item => {
      const newItem = { ...item };
      delete newItem.aroonosc;
      return newItem;
    });

    const newData = [...updatedDatas];
    
    const f_idx = data.begIndex;
    const l_idx = data.nbElement;
    const aroonosc = data.result.outReal;
    for (let i = 0; i < l_idx; i++) {
      newData[f_idx + i] = {
        ...newData[f_idx + i], // 기존 객체를 복사
        ["aroonosc"]: aroonosc[i], // 새로운 속성 추가
      };
    }
    dispatch(setChartDatas(newData));
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
