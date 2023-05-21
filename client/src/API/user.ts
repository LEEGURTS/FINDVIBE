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


export const sendUpdateNicknameRequest = (nickname: string) => {
  const userData = {
    nickname: nickname
  };
  return sendPostRequest("/user/update/nickname", userData);
};
