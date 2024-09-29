import axios from "axios";
import { API_KEY } from "@env";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": API_KEY, // Replace with your actual API key
  },
});

export default api;
