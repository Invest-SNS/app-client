import { baseUserInstance } from "./api";

export const fetchComments = async (feedId) => {
  const baseUrl = `/comment/${feedId}`;
  try {
    const response = await baseUserInstance.get(baseUrl);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postComment = async (feedId, content) => {
  const baseUrl = `/comment/${feedId}`;
  try {
    const response = await baseUserInstance.post(baseUrl, { content });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const putComment = async (commentId, content) => {
  const baseUrl = `/comment/${commentId}`;
  try {
    const response = await baseUserInstance.put(baseUrl, { content });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async (commentId) => {
  const baseUrl = `/comment/${commentId}`;
  try {
    const response = await baseUserInstance.delete(baseUrl);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
