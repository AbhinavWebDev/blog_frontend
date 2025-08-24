import axios from "axios";
import useAuthStore from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Public requests (no token)
export const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, // refresh token will be sent via cookies
});

// ✅ Private requests (with access token)
export const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// 🔄 Attach access token from Zustand before request
privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  console.log(token,"token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔄 Handle token refresh
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await publicApi.post("/auth/refresh");
        const newAccessToken = res.data.accessToken;

        // ✅ Save new token in Zustand
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateApi(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout(); // clear store + redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
