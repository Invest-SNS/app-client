import React, { useEffect } from 'react';
import { LineSeries, MovingAverageTooltip, SingleTooltip } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getWMAChart } from '../../../../../store/reducers/Chart/Indicators/chart';

export default function WMAChart({ datas, isShow, chartIndi }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.WMA);
  const WMAValue = useSelector((state) => state.chartValues.values.WMA);

  const calculateWMA = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'WMA',
      value: WMAValue,
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "lineTime1" : WMAValue[0],
        "lineTime2" : WMAValue[1],
        "lineTime3" : WMAValue[2],
        "lineTime4" : WMAValue[3],
        "lineTime5" : WMAValue[4]
      }
      dispatch(getWMAChart(data))
        .then((res) =>  calculateWMA(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        WMAValue.forEach((value) => {
          delete newItem[`wma${value}`];
        });
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, WMAValue, isShow]);

  return (
    <>
      <MovingAverageTooltip
        origin={[12, 40 + (chartIndi.indexOf('WMA') * 40)]}
        options={[
          {
            yAccessor: d => d[`wma${WMAValue[0]}`],
            type: `WMA`,
						stroke: '#b3009e',
            windowSize: WMAValue[0]
          },
          {
            yAccessor: d => d[`wma${WMAValue[1]}`],
            type: `WMA`,
						stroke: '#b33300',
            windowSize: WMAValue[1]
          },
          {
            yAccessor: d => d[`wma${WMAValue[2]}`],
            type: `WMA`,
						stroke: '#edda02',
            windowSize: WMAValue[2]
          },
          {
            yAccessor: d => d[`wma${WMAValue[3]}`],
            type: `WMA`,
						stroke: '#00b33f',
            windowSize: WMAValue[3]
          },
          {
            yAccessor: d => d[`wma${WMAValue[4]}`],
            type: `WMA`,
						stroke: '#0277ed',
            windowSize: WMAValue[4]
          },
        ]}
      />
      {WMAValue.map((value, index) => (
        <LineSeries
          key={`wma${value}`}
          yAccessor={(d) => d[`wma${value}`]}
          strokeStyle={['#b3009e', '#b33300', '#edda02', '#00b33f', '#0277ed'][index]}
        />
      ))}
    </>
  )
}
