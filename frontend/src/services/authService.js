import api from "./api";

export const loginUser = async (email, password) => {
  const { data } = await api.post("/api/user/login", { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await api.post("/api/user/register", { name, email, password });
  return data;
};

export const getUserData = async () => {
  const { data } = await api.get("/api/user/data");
  return data;
};
