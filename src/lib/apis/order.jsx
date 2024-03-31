import { baseUserInstance } from "./api";

export async function postOrderStock(code, buyOrSell, price, quantity, userId) {
  try {
    const response = await baseUserInstance.post(`/order/buyOrSell/${userId}`, {
      ownedShare: code,
      buyOrSell,
      price,
      quantity,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getOrderHistory(code, userId) {
  try {
    const response = await baseUserInstance.get(
      `/order/myHistory/${userId}/${code}`
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}
