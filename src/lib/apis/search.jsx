import { baseInstance, baseUserInstance } from "./api";

export const postSearch = async (searchQuery) => {
  const baseUrl = "/stockCode/search";
  try {
    const response = await baseInstance.post(baseUrl, {
      searchQuery,
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postSearchUser = async (searchQuery) => {
  const baseUrl = "/stockCode/userSearch";
  try {
    const response = await baseUserInstance.post(baseUrl, {
      searchQuery,
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postLikeStock = async (likeStock) => {
  const baseUrl = "/stockCode/likeStock";
  try {
    const response = await baseUserInstance.post(baseUrl, {
      likeStock,
    });
    const data = response.data.likeStock;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
