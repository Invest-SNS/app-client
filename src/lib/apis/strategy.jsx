import { shinhanInstance } from './api';

export async function getStrategy() {
  return await shinhanInstance.get('/strategy')
}
