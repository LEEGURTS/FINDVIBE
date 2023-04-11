import axios from "axios";
import { sendPostRequest } from "./api";

export interface LogInUserInfo {
  email: string;
  password: string;
}

export const sendLogInRequest = (userData: LogInUserInfo) => {
  return sendPostRequest("/auth/login", userData);
};

export const sendLogOutRequest = () => {
  return sendPostRequest("/auth/logout", null);
};

export const sendLoginCheckRequest = () => {
  return sendPostRequest("/auth/check", null);
};

export const sendRefreshTokenRequest = () => {
  return sendPostRequest("/auth/refresh", null);
};
