import axios from "axios";
import { sendPostRequest } from "./api";

export interface SignUpUserInfo {
  email: string;
  password: { value: string; check: string };
  nickname: string;
}

export const sendSignUpRequest = (userInfo: SignUpUserInfo) => {
  const userData = {
    email: userInfo.email,
    password: userInfo.password.value,
    nickname: userInfo.nickname,
  };
  return sendPostRequest("/user/signup", userData);
};
