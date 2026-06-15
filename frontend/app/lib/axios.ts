import axios from "axios";

const api = axios.create({
  baseURL: "https://document-signature-app-skwy.onrender.com/api",
});

export default api;