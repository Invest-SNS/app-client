import { orderInstance } from "./api";

export async function postOrderStock(code, buyOrSell, price, quantity) {
  try {
    const response = await orderInstance.post("/", {
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
