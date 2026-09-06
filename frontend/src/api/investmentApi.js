import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getLatestInvestment = async (region) => {
  const response = await axios.post(
    `${API_URL}/analysis/`,
    {
      region: region,
    }
  );

  return response.data;
};
