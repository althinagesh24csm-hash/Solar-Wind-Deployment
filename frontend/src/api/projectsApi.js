import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// -----------------------------
// GET ALL PROJECTS
// -----------------------------
export const getProjects = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/projects/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// -----------------------------
// CREATE PROJECT
// -----------------------------
export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/projects/`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// -----------------------------
// GET SINGLE PROJECT
// -----------------------------
export const getProject = async (projectId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${BASE_URL}/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// -----------------------------
// UPDATE PROJECT
// -----------------------------
export const updateProject = async (
  projectId,
  projectData
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${BASE_URL}/projects/${projectId}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// -----------------------------
// DELETE PROJECT
// -----------------------------
export const deleteProject = async (projectId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${BASE_URL}/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};