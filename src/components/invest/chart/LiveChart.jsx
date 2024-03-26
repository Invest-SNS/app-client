import React, { useEffect } from 'react'
import { Chart, ChartCanvas, LineSeries, discontinuousTimeScaleProviderBuilder } from 'react-financial-charts'
import { useWebSocket } from '../../../lib/hooks/useWebSocket';
import { useSelector } from 'react-redux';

export default function LiveChart({ dataList }) {
  // const { askPrice, nowPrice } = useWebSocket();
  // useEffect(() => {
  //   console.log('nowPrice',nowPrice)
  // }, [])

  return (
    <LineSeries yAccessor={d => d.close} />
  )
}
