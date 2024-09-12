import { marketCloseInstance } from "./api";

export async function getMarketClosePrice(code) {
  try {
    const response = await marketCloseInstance.get(`/${code}`);
    return response;
  } catch (err) {
    console.error(err);
  }
}
