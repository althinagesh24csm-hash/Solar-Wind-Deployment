import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getSuitability = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/assessment/`,
    data
  );

  return response.data;
};