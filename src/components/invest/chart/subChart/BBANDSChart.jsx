import React, { useEffect, useState } from 'react';
import { fakeData } from './data';
import { LineSeries } from 'react-financial-charts';

export default function BBANDSChart({ datas, click }) {
  const [smaCalculated, setSmaCalculated] = useState(false);

  const calculateBBANDS = () => {
    const responses = [fakeData.response1, fakeData.response2, fakeData.response3, fakeData.response4, fakeData.response5];
    responses.forEach((response, index) => {
      const f_idx = response.begIndex;
      const l_idx = response.nbElement;
      const subData = response.result.outReal;
      for (let i = 0; i < l_idx; i++) {
        const smaKey = `sma${[5, 10, 30, 60, 100][index]}`; // 예시에서는 100이 마지막 값이지만, 실제 데이터에 따라 조정 필요
        datas[datas.length - i - 1][smaKey] = subData[i];
      }
    });
    // setSmaCalculated(true); // SMA 계산 완료
  }

  useEffect(() => {
    if (click) {
      calculateBBANDS()
    }
  }, [click]);

  return (
    <>
      <LineSeries
        yAccessor={d => d.sma5} 
        strokeStyle='#b3009e'
      />
      <LineSeries 
        yAccessor={d => d.sma10} 
        strokeStyle='#b33300'
      />
      <LineSeries 
        yAccessor={d => d.sma30} 
        strokeStyle='#edda02'
      />
      <LineSeries 
        yAccessor={d => d.sma60} 
        strokeStyle='#00b33f'
      />  
      <LineSeries 
        yAccessor={d => d.sma100} 
        strokeStyle='#0277ed'
      />  
    </>
  )
}
