import { baseInstance } from "./api";
import { setCookie } from "~/lib/apis/cookie";

export const signup = async (email, password, nickname) => {
  const baseUrl = "/user/sign-up";
  try {
    const response = await baseInstance.post(baseUrl, {
      email: email,
      password: password,
      nickName: nickname,
    });

    return response.data;
  } catch (err) {
    // console.error(err);
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

    return response.data;
  } catch (err) {
    // console.error(err);
    return err;
  }
};
