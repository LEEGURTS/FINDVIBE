import { StateCreator, create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";

interface LoginState {
  isLogin: boolean;
  token: string;
  loginTime: Date;
  last_login_email: string;
}

interface LoginAction {
  setIsLogin: (isLoggined: boolean) => void;
  setToken: (token: string) => void;
  setLoginTime: (login_time: Date) => void;
  setInitialize: () => void;
  setLoginEmail: (email: string) => void;
}

export interface LoginStore extends LoginState, LoginAction {}

export type LoginStatePersist = (
  config: StateCreator<LoginStore>,
  options: PersistOptions<LoginState>
) => StateCreator<LoginStore>;

export const useLogin = create<LoginStore>(
  (persist as LoginStatePersist)(
    (set) => ({
      isLogin: false,
      token: "",
      loginTime: new Date(),
      last_login_email: "",
      setLoginEmail: (login_email) =>
        set((state) => ({ ...state, last_login_email: login_email })),
      setToken: (token) => set((state) => ({ ...state, token: token })),
      setIsLogin: (isLogin) => set((state) => ({ ...state, isLogin: isLogin })),
      setLoginTime: (login_time) => {
        set((state) => ({ ...state, loginTime: login_time }));
      },
      setInitialize: () =>
        set((state) => ({
          ...state,
          token: "",
          isLogin: false,
          loginTime: new Date(),
        })),
    }),
    { name: "loginStore" }
  )
);
