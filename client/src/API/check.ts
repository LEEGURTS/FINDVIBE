import { LoginStore } from "../State/userInfo";
import {
  sendCheckRequest,
  sendLogOutRequest,
} from "./auth";

// 특정 api 사용 할 때, access Token으로 권한 확인 ( is_admin 확인, 현재는 사용부분 X )
export const checkToken = (loginState: LoginStore) => {
  sendCheckRequest()
    .then((res) =>{ 
        loginState.setIsLogin(true);
        loginState.setLoginTime(res.login_time);

      }
    )
    .catch((err) => {
      if (err.response.status === 401) {
        sendLogOutRequest().then(() => loginState.setInitialize());
      }
    });
};
