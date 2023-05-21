import { useNavigate } from "react-router-dom";
import { useIsRN } from "../../State/isNative";
import { useLogin } from "../../State/userInfo";
import CursorSvg from "../../assets/Svg/CursorSvg";
import HomeSvg from "../../assets/Svg/HomeSvg";
import HotPlaceSvg from "../../assets/Svg/HotPlaceSvg";
import ListSvg from "../../assets/Svg/ListSvg";
import UserSvg from "../../assets/Svg/UserSvg";

const RNNavigateBar: React.FunctionComponent = () => {
  const { isLogin } = useLogin();
  const { isNative } = useIsRN();
  const navigate = useNavigate();

  if (isNative && !isLogin) {
    return (
      <>
        <div className="h-[64px]"></div>
        <div className="fixed z-50 bottom-0 grid grid-cols-5 justify-items-center place-items-end w-full text-[12px] bg-white border-t py-4 border-gray">
          <button
            onClick={() => navigate("/")}
            className="w-full flex flex-col items-center"
          >
            <HomeSvg />
            <p className="mt-2">홈</p>
          </button>
          <button
            onClick={() => navigate("/findvibe")}
            className="w-full flex flex-col items-center"
          >
            <CursorSvg />
            <p className="mt-1">FindVibe</p>
          </button>
          <button
            onClick={() => navigate("/myplace")}
            className="w-full flex flex-col items-center "
          >
            <ListSvg />
            <p className="mt-1">나의 기록</p>
          </button>
          <button
            onClick={() => navigate("/hotplace")}
            className="w-full flex flex-col items-center"
          >
            <HotPlaceSvg />
            <p className="mt-1">인기순위</p>
          </button>
          <button
            onClick={() => navigate("/mypage")}
            className="w-full flex flex-col items-center"
          >
            <UserSvg />
            <p className="mt-1">마이페이지</p>
          </button>
        </div>
      </>
    );
  }

  return <></>;
};

export default RNNavigateBar;
