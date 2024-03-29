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

export const fetchMyFeed = async (userId, page) => {
  const baseUrl = `/feed/user/${userId}?page=${page}&limit=10`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchOtherFeed = async (userId, page) => {
  const baseUrl = `/feed/anotherUser/${userId}?page=${page}&limit=100`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllFeed = async (page) => {
  const baseUrl = `/feed?page=${page}&limit=10`;
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
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteFeed = async (feedId) => {
  const baseUrl = `/feed/${feedId}`;
  try {
    const response = await baseUserInstance.delete(baseUrl);
    const data = response.data;
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
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postVote = async (feedId, voteResult) => {
  const baseUrl = "/feed/voted";
  try {
    const response = await baseUserInstance.post(baseUrl, {
      feedId,
      voteResult,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postLike = async (feedId) => {
  const baseUrl = `/feed/${feedId}/like`;
  try {
    const response = await baseUserInstance.post(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postUnlike = async (feedId) => {
  const baseUrl = `/feed/${feedId}/unlike`;
  try {
    const response = await baseUserInstance.post(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMyFeedCount = async (userId) => {
  const baseUrl = `/feed/user/${userId}/post-count`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
