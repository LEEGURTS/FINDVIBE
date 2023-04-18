import {
  sendLoginCheckRequest,
  sendLogOutRequest,
  sendRefreshTokenRequest,
} from "./auth";

export const checkJWTToken = (
  /* 유효성 검사 실패 시, 로그인 페이지로 이동 */
  goLoginPage: () => void,
  /* 로그인 했는지 확인 */
  setIsLogin: (result: boolean) => void
) => {
  sendLoginCheckRequest()
    .then(() => {
      setIsLogin(true);
    })
    .catch((error) => {
      // access token 만료
      if (error.response.status === 401) {
        // 토큰 재발행
        sendRefreshTokenRequest()
          .then(() => {
            setIsLogin(false);
          })
          .catch((error) => {
            // 재발행 토큰 만료 시, 로그아웃 + login page로 이동
            if (error.response.status === 401) {
              sendLogOutRequest().then(() => {
                goLoginPage();
              });
            }
          });
      }
    });
};
