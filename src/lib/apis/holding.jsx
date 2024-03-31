import { baseUserInstance } from "./api";

export async function getBalance(userId) {
  try {
    const response = await baseUserInstance.get(`/holding/balance/${userId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getHoldingQuantity(userId, code) {
  try {
    const response = await baseUserInstance.get(
      `/holding/quantity/${userId}/${code}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
