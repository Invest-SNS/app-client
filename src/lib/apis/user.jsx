import { baseInstance, baseUserInstance } from "./api";

export const signup = async (email, password, nickname) => {
  const baseUrl = "/user/sign-up";
  try {
    const response = await baseInstance.post(baseUrl, {
      email: email,
      password: password,
      nickname: nickname,
    });

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const login = async (email, password) => {
  const baseUrl = "/user/login";
  try {
    const response = await baseInstance.post(baseUrl, {
      email: email,
      password: password,
    });

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const logout = async (token) => {
  const baseUrl = "/user/logout";
  try {
    const response = await baseUserInstance.post(
      baseUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
};
