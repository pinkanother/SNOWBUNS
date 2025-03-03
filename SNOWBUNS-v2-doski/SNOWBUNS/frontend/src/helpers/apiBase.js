import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://localhost:5000", // Set your backend's base URL here
});

apiBase.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default apiBase;
