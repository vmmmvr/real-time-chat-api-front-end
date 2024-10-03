import { SignInData, SignUpData, SignupResponse } from "@/app/lib/types/user";
import axios from "axios";
import { parse } from "cookie";

export const ALL_END_POINTS = {
  AUTH: {
    SIGN_IN: "/auth/login",
    SIGN_UP: "/auth/signup",
    REFRESH_TOKEN: "/auth/refresh-token",
  },
  USERS: {
    ME: "/users/me",
    CHANGE_PASSWORD: "/users/change-password",
    ADD_FRIEND: "/users/friends/:friendUsername",
    REMOVE_FRIEND: "/users/friends/:friendUsername",
    ALL_USERS: "/users",
  },
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for the base URL
  timeout: 10000, // Customize timeout as needed
});

// Helper to get cookies (assumed to be in the browser)
const getCookies = () => {
  if (typeof window === "undefined") return null;
  const cookieString = document.cookie; // Get cookies in the browser

  return parse(cookieString);
};

// Request interceptor to add the access token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = getCookies();
    const accessToken = cookies?.accessToken;

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let retry = 0;
// Response interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the access token is invalid (401 Unauthorized) and refresh token is available
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent endless retry loop

      const cookies = getCookies();
      const refreshToken = cookies?.refreshToken;

      if (refreshToken && retry < 5) {
        try {
          retry = retry + 1;
          // Attempt to refresh the token
          const refreshResponse = await axiosInstance.post(
            ALL_END_POINTS.AUTH.REFRESH_TOKEN,
            { refreshToken }
          );

          // Extract new access token from the refresh response
          const { accessToken } = refreshResponse.data?.["data"];
          if (accessToken) {
            retry = 0;
          }

          // Store the new access token in the cookies (optional, depending on your server implementation)
          document.cookie = `accessToken=${accessToken}; path=/`;

          // Retry the original request with the new token
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refreshing fails, clear the tokens and redirect to login
          // document.cookie = `accessToken=; Max-Age=0; path=/`;
          // document.cookie = `refreshToken=; Max-Age=0; path=/`;
          if (window.location.href !== "/auth/sign-in") {
            // window.location.href = "/auth/sign-in"; // Redirect to sign-in
          }
        }
      }
    }

    // Return the error if no retry is possible
    return Promise.reject(error);
  }
);

export const signUp = async (data: SignUpData) => {
  const response = await axiosInstance.post(ALL_END_POINTS.AUTH.SIGN_UP, data);
  return response.data;
};

export const signIn = async (data: SignInData) => {
  const response = await axiosInstance.post(ALL_END_POINTS.AUTH.SIGN_IN, data);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get(ALL_END_POINTS.USERS.ME);
  return response.data;
};

export const getUsers = async () => {
  const response = await axiosInstance.get(ALL_END_POINTS.USERS.ALL_USERS);
  return response.data;
};

export const addFriend = async (username?: String) => {
  const response = await axiosInstance.post(
    ALL_END_POINTS.USERS.ADD_FRIEND.replace(":friendUsername", String(username))
  );
  return response.data;
};

export const removeFriend = async (username?: String) => {
  const response = await axiosInstance.delete(
    ALL_END_POINTS.USERS.REMOVE_FRIEND.replace(
      ":friendUsername",
      String(username)
    )
  );
  return response.data;
};

export default axiosInstance;
