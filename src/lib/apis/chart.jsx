import { chartInstance, subChartInstance } from './api';

export async function getChartData() {
  return await chartInstance.post('/stockPrice', {
    "code" : "005930",
    "start_date" : "19990101",
    "end_date" : "20240313",
    // 분, 일, 월, 연봉
    "time_format" : "D"
  })
}

export async function getSMA(data) {
  return await subChartInstance.post('/SMA', data)
}