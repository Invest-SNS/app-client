import { BASE_URL, chartInstance } from './api';

export async function getChartData() {
  return await chartInstance.post('/', {
    "code" : "005930",
    "start_date" : "20220101",
    "end_date" : "20220809",
    "time_format" : "D"
  })
}