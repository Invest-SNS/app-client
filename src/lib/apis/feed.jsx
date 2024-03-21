import { baseUserInstance, formdataInstance } from "./api";

export const fetchAFeed = async (feedId) => {
  const baseUrl = `/feed/${feedId}`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMyFeed = async (userId) => {
  const baseUrl = `/feed/user/${userId}`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllFeed = async () => {
  const baseUrl = `/feed`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postBoardFeed = async (formData) => {
  const baseUrl = "/feed";
  try {
    const response = await formdataInstance.post(baseUrl, formData);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postVoteFeed = async (body) => {
  const baseUrl = "/feed/vote";
  try {
    const response = await baseUserInstance.post(baseUrl, {
      body,
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
