import { LoginStore, useLogin } from "../State/userInfo";
import {
  sendCheckRequest,
  sendLogOutRequest,
  sendRefreshRequest,
} from "./auth";

// 특정 api 사용 할 때, access Token으로 권한 확인 ( is_admin 확인, 현재는 사용부분 X )
export const checkAccessToken = (loginState: LoginStore) => {
  console.log(
    loginState.isLogin,
    loginState.loginTime,
    loginState.email,
    loginState.nickname
  );
  sendCheckRequest()
    .then(() => loginState.setIsLogin(true))
    .catch((err) => {
      if (err.response.status === 401) {
        refreshAccessToken(loginState);
      }
    });
};

export const refreshAccessToken = (loginState: LoginStore) => {
  sendRefreshRequest()
    .then((res) => {
      loginState.setLoginTime(res.login_time);
    })
    .catch(() => {
      sendLogOutRequest().then(() => loginState.setInitialize());
    });
};
