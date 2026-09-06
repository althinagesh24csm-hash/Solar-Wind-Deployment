import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

// LOGIN
export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${BASE_URL}/auth/login`,
    {
      email: email.trim(),
      password,
    }
  );

  // Save token immediately
  if (response.data?.access_token) {
    localStorage.setItem(
      "token",
      response.data.access_token
    );
  }

  return response.data;
};

// REGISTER
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/auth/register`,
    userData
  );

  return response.data;
};

// CURRENT USER
export const getMyProfile = async () => {
  const response = await axios.get(
    `${BASE_URL}/auth/me`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

// UPDATE PROFILE
export const updateProfile = async (profileData) => {
  const response = await axios.put(
    `${BASE_URL}/auth/profile`,
    profileData,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};