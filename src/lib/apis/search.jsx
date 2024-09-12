import { baseInstance, baseUserInstance } from "./api";

export const postSearch = async (searchQuery) => {
  const baseUrl = "/stockCode/search";
  try {
    const response = await baseInstance.post(baseUrl, {
      searchQuery,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postSearchUser = async (searchQuery, userId) => {
  const baseUrl = "/stockCode/userSearch";
  try {
    const response = await baseInstance.post(baseUrl, {
      searchQuery,
      userId,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postLikeStock = async (likeStock, userId) => {
  const baseUrl = "/stockCode/likeStock";
  try {
    const response = await baseInstance.post(baseUrl, {
      likeStock,
      userId,
    });
    const data = response.data.likeStock;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchLikeStock = async (userId) => {
  const baseUrl = `/stockCode/likeStock/${userId}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchLikeStockArr = async (userId) => {
  const baseUrl = `/stockCode/likeStockArr/${userId}`;
  try {
    const response = await baseInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
