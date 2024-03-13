import axios from "axios";

export const BASE_URL = 'http://127.0.0.1:3000/api';

export const chartInstance = axios.create({
  baseURL: BASE_URL + "/stockPrice",
});