import { chartInstance, subChartInstance } from './api';

export async function getChartData(data) {
  return await chartInstance.post('/stockPrice', data)
}

export async function getMinuteData(data) {
  return await chartInstance.post('/stockPrice/minute', data)
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

export async function getSAR(data) {
  return await subChartInstance.post('/SAR', data)
}

export async function getMACD(data) {
  return await subChartInstance.post('/MACD', data)
}

export async function getSTOCHF(data) {
  return await subChartInstance.post('/STOCHF', data)
}

export async function getSTOCH(data) {
  return await subChartInstance.post('/STOCH', data)
}

export async function getRSI(data) {
  return await subChartInstance.post('/RSI', data)
}

export async function getCCI(data) {
  return await subChartInstance.post('/CCI', data)
}

export async function getMOM(data) {
  return await subChartInstance.post('/MOM', data)
}

export async function getROC(data) {
  return await subChartInstance.post('/ROC', data)
}

export async function getAD(data) {
  return await subChartInstance.post('/AD', data)
}

export async function getATR(data) {
  return await subChartInstance.post('/ATR', data)
}

export async function getMFI(data) {
  return await subChartInstance.post('/MFI', data)
}

export async function getOBV(data) {
  return await subChartInstance.post('/OBV', data)
}

export async function getADOSC(data) {
  return await subChartInstance.post('/ADOSC', data)
}

export async function getTRIX(data) {
  return await subChartInstance.post('/TRIX', data)
}

export async function getWILLR(data) {
  return await subChartInstance.post('/WILLR', data)
}

export async function getDX(data) {
  return await subChartInstance.post('/DX', data)
}

export async function getADX(data) {
  return await subChartInstance.post('/ADX', data)
}

export async function getADXR(data) {
  return await subChartInstance.post('/ADXR', data)
}

export async function getAROON(data) {
  return await subChartInstance.post('/AROON', data)
}

export async function getAROONOSC(data) {
  return await subChartInstance.post('/AROONOSC', data)
}

export async function getSTOCHRSI(data) {
  return await subChartInstance.post('/STOCHRSI', data)
}

export async function getULTOSC(data) {
  return await subChartInstance.post('/ULTOSC', data)
}

export async function getPPO(data) {
  return await subChartInstance.post('/PPO', data)
}