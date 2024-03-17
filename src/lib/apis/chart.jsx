import { chartInstance, subChartInstance } from './api';

export async function getChartData() {
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
  return await chartInstance.post('/stockPrice', {
    "code" : "005930",
    "start_date" : "19990101",
    "end_date" : formattedDate,
    // 분, 일, 월, 연봉
    "time_format" : "D"
  })
}

export async function getSMA(data) {
  return await subChartInstance.post('/SMA', data)
}

export async function getWMA(data) {
  return await subChartInstance.post('/WMA', data)
}

export async function getEMA(data) {
  return await subChartInstance.post('/EMA', data)
}

export async function getBBANDS(data) {
  return await subChartInstance.post('/BBANDS', data)
}