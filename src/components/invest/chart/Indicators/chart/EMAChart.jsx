import React, { useEffect } from 'react';
import { LineSeries, MovingAverageTooltip, SingleTooltip } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getEMAChart } from '../../../../../store/reducers/Chart/Indicators/chart';

export default function EMAChart({ datas, isShow, chartIndi }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.EMA);
  const EMAValue = useSelector((state) => state.chartValues.values.EMA);

  const calculateEMA = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'EMA',
      value: EMAValue,
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "lineTime1" : EMAValue[0],
        "lineTime2" : EMAValue[1],
        "lineTime3" : EMAValue[2],
        "lineTime4" : EMAValue[3],
        "lineTime5" : EMAValue[4]
      }
      dispatch(getEMAChart(data))
      .then((res) => calculateEMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        EMAValue.forEach((value) => {
          delete newItem[`ema${value}`];
        });
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, EMAValue, isShow]);

  return (
    <>
      <MovingAverageTooltip
        origin={[12, 40 + (chartIndi.indexOf('EMA') * 40)]}
        options={[
          {
            yAccessor: d => d[`ema${EMAValue[0]}`],
            type: `EMA`,
						stroke: '#b3009e',
            windowSize: EMAValue[0]
          },
          {
            yAccessor: d => d[`ema${EMAValue[1]}`],
            type: `EMA`,
						stroke: '#b33300',
            windowSize: EMAValue[1]
          },
          {
            yAccessor: d => d[`ema${EMAValue[2]}`],
            type: `EMA`,
						stroke: '#edda02',
            windowSize: EMAValue[2]
          },
          {
            yAccessor: d => d[`ema${EMAValue[3]}`],
            type: `EMA`,
						stroke: '#00b33f',
            windowSize: EMAValue[3]
          },
          {
            yAccessor: d => d[`ema${EMAValue[4]}`],
            type: `EMA`,
						stroke: '#0277ed',
            windowSize: EMAValue[4]
          },
        ]}
      />
      {EMAValue.map((value, index) => (
        <LineSeries
          key={`ema${value}`}
          yAccessor={(d) => d[`ema${value}`]}
          strokeStyle={['#b3009e', '#b33300', '#edda02', '#00b33f', '#0277ed'][index]}
        />
      ))}
    </>
  )
}
