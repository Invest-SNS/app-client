import { baseInstance } from "./api";
import { setCookie } from "~/lib/apis/cookie";

export const postLogin = async (email, password) => {
  const baseUrl = "/user/login";
  try {
    const response = await baseInstance.post(baseUrl, {
      email,
      password,
    });
    setCookie("token", response.data.token, {
      path: "/",
      secure: true,
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
