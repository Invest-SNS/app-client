import { baseInstance } from "./api";

export async function fetchChatBot(input){
    const url = `/chatBot`;
    try {
      const response = await baseInstance.post(url, {prompt : input});
      console.log(response);
      const data = response.data;
      return data;
    } catch (err) {
      console.error(err);
    }
}
