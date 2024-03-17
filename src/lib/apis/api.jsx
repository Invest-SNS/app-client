import axios from "axios";
import { getCookie } from "./cookie";

export const BASE_URL = "http://127.0.0.1:3000/api";

export const chartInstance = axios.create({
  baseURL: BASE_URL,
});

export const subChartInstance = axios.create({
  baseURL: BASE_URL + "/subChart",
});

export const baseInstance = axios.create({
  baseURL: BASE_URL,
});

export const baseUserInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

