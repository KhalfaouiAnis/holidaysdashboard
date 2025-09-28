import axios from "axios";

import { getToken, signOut } from "@/stores/auth/auth";
import { getCookieAuthToken } from "@/server/user/auth";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

client.interceptors.request.use(
  async (config) => {
    let token = await getCookieAuthToken()
    
    if (!token && typeof window !== "undefined") {
      token = getToken();
    }

    if (!token && config.headers["Authorization"]) {
      token = config.headers["Authorization"].toString()
    }

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response.status === 403 && typeof window !== "undefined")
    ) {
      signOut();
    }
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ error });
    if ((error.response && error.response.status === 401) || error.response.status === 403) {
      signOut();
    }
    return Promise.reject(error);
  },
);
