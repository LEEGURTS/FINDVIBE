/* eslint-disable react-hooks/exhaustive-deps */
import GridLayout from "../Layout/GridLayout";
import Footer from "../Footer/Footer";
import FindLocationImageHandle from "./FindLocationImageHandle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../State/userInfo";

const FindLocation: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const loginState = useLogin();

  useEffect(() => {
    if (!loginState.isLogin) {
      navigate("/signin");
      return;
    }
  }, [loginState]);

  return (
    <main className="relative w-full top-[64px] z-40 min-h-[calc(100vh-64px)]">
      <GridLayout>
        <div className="mt-[4em] col-span-6 tablet:col-start-2 tablet:col-end-12 flex flex-col items-center">
          <p className="font-pretendardBold text-transparent text-[2em] bg-clip-text bg-gradient-to-r from-deeporange to-shalloworange">
            FINDVIBE와 함께
          </p>
          <p className="text-[#767676]">
            이미지를 업로드하여 촬영한 장소를 찾아보세요.
          </p>
          {loginState.isLogin && <p>로그인 중!</p>}
        </div>
        <FindLocationImageHandle />
      </GridLayout>
      <Footer />
    </main>
  );
};

export default FindLocation;
