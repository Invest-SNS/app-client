import { baseUserInstance, baseInstance } from "./api";

export const fetchFriends = async () => {
  const baseUrl = `/friend`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchPendingFriends = async () => {
  const baseUrl = `/friend/pending`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchFriendsState = async (friendId) => {
  const baseUrl = `/friend/state/${friendId}`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchFriendCount = async (userId) => {
  const baseUrl = `/friend/friend-count/${userId}`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postFriendRequest = async (friendId) => {
  const baseUrl = "/friend/request";
  try {
    const response = await baseUserInstance.post(baseUrl, { friendId });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postFriendAccept = async (friendId) => {
  const baseUrl = "/friend/accept";
  try {
    const response = await baseUserInstance.post(baseUrl, { friendId });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteFriendRequest = async (friendId) => {
  const baseUrl = `/friend/reject/${friendId}`;
  try {
    const response = await baseUserInstance.delete(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteFriend = async (friendId) => {
  const baseUrl = `/friend/${friendId}`;
  try {
    const response = await baseUserInstance.delete(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteMyRequest = async (friendId) => {
  const baseUrl = `/friend/request/${friendId}`;
  try {
    const response = await baseUserInstance.delete(baseUrl);
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postSearchFriend = async (nickname) => {
  const baseUrl = "/friend/search";
  try {
    const response = await baseInstance.post(baseUrl, { nickname });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
};
