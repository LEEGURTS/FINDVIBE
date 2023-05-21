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

export const sendCheckDuplicateNicknameRequest = (nickname: string) => {
  const userData = {
    nickname: nickname
  };
  return sendPostRequest("/user/check/nickname", userData);
};

export const sendUpdateNicknameRequest = (new_nickname: string) => {
  const userData = {
    nickname: new_nickname
  };
  return sendPostRequest("/user/update/nickname", userData);
};

export const sendUpdatePasswordRequest = (new_password: string) => {
  const userData = {
    password: new_password
  };
  return sendPostRequest("/user/update/password", userData);
};

export const sendGetUserPredictLogRequest = (time: Date) => {
  const userData = {
    time: time
  };
  return sendPostRequest("/user/get/log", userData);
};

export const sendGetUserAllPredictLogRequest = () => {
  return sendPostRequest("/user/get-all/log", null);
};
