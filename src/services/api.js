import axios from "axios";

export const api = axios.create({
  baseURL: "https://thesimpsonsapi.com/api",
  timeout: 10000,
});
