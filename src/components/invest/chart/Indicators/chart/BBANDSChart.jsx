import React, { useEffect, useState } from 'react';
import { BollingerBandTooltip, BollingerSeries } from 'react-financial-charts';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getBBANDSChart } from '../../../../../store/reducers/Chart/Indicators/chart';

export default function BBANDSChart({ datas, isShow }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.BBANDS);
  const BBANDSValue = useSelector((state) => state.chartValues.values.BBANDS);
  
  const calculateBBANDS = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'BBANDS'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "lineTime" : BBANDSValue[0],
        "stdev" : BBANDSValue[1],
      }
      dispatch(getBBANDSChart(data))
        .then((res) => calculateBBANDS(res.payload))

    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.upper;
        delete newItem.middle;
        delete newItem.lower;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, BBANDSValue, isShow]);

  return (
    <>
      {/* <BollingerBandTooltip
        origin={[12, 40]}
        yAccessor={d => (
          {
            top: d.upper,
            middle: d.middle,
            bottom: d.lower
          }
        )}
      /> */}
      <BollingerSeries
        yAccessor={d => (
          {
            top: d.upper,
            middle: d.middle,
            bottom: d.lower
          }
        )}
      />
    </>
  )
}
