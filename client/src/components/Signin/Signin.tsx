import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogInUserInfo, sendLogInRequest } from "../../API/auth";
import GridLayout from "../Layout/GridLayout";

const Signin: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [userData, setUserDate] = useState<LogInUserInfo>({
    email: "",
    password: "",
  });

  return (
    <main
      className="relative w-full h-full top-[64px] "
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      <GridLayout>
        <div
          className="col-start-5 col-end-9  flex flex-col items-center justify-center"
          style={{
            height: "calc(100vh - 64px)",
          }}
        >
          <div className="text-[#FF7B54] font-bold text-[2em]">로그인</div>
          <input
            className="w-full rounded-[0.4em] border border-[1px] border-gray outline-0 px-4 py-2 my-2"
            placeholder="이메일"
            value={userData.email}
            onChange={(e) => {
              setUserDate({ ...userData, email: e.target.value });
            }}
          ></input>
          <input
            className="w-full rounded-[0.4em] border border-[1px] border-gray outline-0 px-4 py-2"
            placeholder="비밀번호"
            value={userData.password}
            onChange={(e) => {
              setUserDate({ ...userData, password: e.target.value });
            }}
          ></input>
          <div className="w-full flex items-center justify-between my-4">
            <div className="flex items-center">
              <button className="text-gray mx-4">이메일 찾기</button>
              <button className="text-gray mx-4">비밀번호 찾기</button>
            </div>
            <button
              className="bg-gradient-to-r from-deeporange to-shalloworange px-4 py-2 rounded-full text-white flex items-center justify-center font-bold"
              onClick={() => {
                sendLogInRequest(userData).then((res) => {
                  if (res.success) {
                    navigate("/findvibe");
                  }
                });
              }}
            >
              로그인
            </button>
          </div>
          <div className="w-full border border-b border-gray border-[0px]"></div>
          <button
            className="text-gray my-4"
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </button>
          <button className="w-full py-2 px-4 bg-white drop-shadow-xl">
            구글 로그인
          </button>
        </div>
      </GridLayout>
    </main>
  );
};

export default Signin;
