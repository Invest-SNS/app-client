import React, { useEffect } from 'react';
import { Chart, ChartCanvas, CurrentCoordinate, LineSeries, ema } from 'react-financial-charts';
import { fakeData } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { setSubDatas } from '../../../../store/reducers/Chart/chart';

export default function SMAChart({ema5, ema10, ema30, ema60, ema120}) {
  
  return (
    <>
      {/* <LineSeries yAccessor={ema5.accessor()} strokeStyle={ema5.stroke()} />
      <LineSeries yAccessor={ema5.accessor()} strokeStyle={ema5.stroke()} />
      <CurrentCoordinate
        yAccessor={ema5.accessor()}
        fillStyle={ema5.stroke()}
      />
      <CurrentCoordinate
        yAccessor={ema10.accessor()}
        fillStyle={ema10.stroke()}
      />
      <LineSeries yAccessor={ema30.accessor()} strokeStyle={ema30.stroke()} />
      <CurrentCoordinate
        yAccessor={ema30.accessor()}
        fillStyle={ema30.stroke()}
      />
      <LineSeries yAccessor={ema60.accessor()} strokeStyle={ema60.stroke()} />
      <CurrentCoordinate
        yAccessor={ema60.accessor()}
        fillStyle={ema60.stroke()}
      />
      <LineSeries yAccessor={ema120.accessor()} strokeStyle={ema120.stroke()} />
      <CurrentCoordinate
        yAccessor={ema120.accessor()}
        fillStyle={ema120.stroke()}
      /> */}
    </>
  )
}
