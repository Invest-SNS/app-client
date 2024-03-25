import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChartDatas } from '../../../../../store/reducers/Chart/chart';
import { getSARChart } from '../../../../../store/reducers/Chart/Indicators/chart';
import { SARSeries, SingleTooltip } from 'react-financial-charts';

export default function SARChart({ datas, isShow, chartIndi }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator.SAR);
  const SARValue = useSelector((state) => state.chartValues.values.SAR);

  const calculateSAR = (data) => {
    dispatch(setChartDatas({
      newData: datas, 
      data: data, 
      name: 'SAR'
    }));
  }

  useEffect(() => {
    if (isActive) {
      const data = {
        "chart": datas,
        "acc" : SARValue[0],
        "accMax" : SARValue[1],
      }
      dispatch(getSARChart(data))
      .then((res) => calculateSAR(res.payload))
    } else if (!isActive) {
      const updatedDatas = datas.map(item => {
        const newItem = { ...item };
        delete newItem.sar;
        return newItem;
      });
      dispatch(setChartDatas(updatedDatas));
    }
  }, [isActive, SARValue, isShow]);

  return (
    <>
      <SingleTooltip
        origin={[12, 40 + (chartIndi.indexOf('SAR') * 15)]}
        yLabel="Parabolic SAR"
      />
      <SARSeries yAccessor={d => d.sar} />
    </>
  )
}
