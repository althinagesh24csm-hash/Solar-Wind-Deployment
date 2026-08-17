import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const predictSolar = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/prediction/solar`,
    data
  );

  return response.data;
};

export const predictWind = async (data) => {
  const response = await axios.post(
    `${BASE_URL}/prediction/wind`,
    data
  );

  return response.data;
};
