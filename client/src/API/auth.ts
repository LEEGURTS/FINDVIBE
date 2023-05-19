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

export const sendCheckRequest = () => {
  return sendPostRequest("/auth/check", null);
};

export const sendRefreshRequest = () => {
  return sendPostRequest("/auth/refresh", null);
};
