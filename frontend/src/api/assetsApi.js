import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getAssets = async () => {
  const response = await axios.get(`${BASE_URL}/assets/`);
  return response.data;
};