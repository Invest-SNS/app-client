import { shinhanInstance } from './api';

export async function getPopularStock() {
  return await shinhanInstance.get('/popularStock')
}

export async function getHotStock(paramId) {
  return await shinhanInstance.get(`/hotStock/${paramId}`)
}