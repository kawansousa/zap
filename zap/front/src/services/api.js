import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/whatsapp",
});

export default api;
