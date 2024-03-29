import { baseUserInstance } from "./api";

export async function postOrderStock(code, buyOrSell, price, quantity) {
  try {
    const response = await baseUserInstance.post("/order/buyOrSell", {
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
