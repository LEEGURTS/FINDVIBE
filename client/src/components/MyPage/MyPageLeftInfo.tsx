import { useLogin } from "../../State/userInfo";
import { MyPageState } from "./MyPage";

interface MyPageLeftInfoProps {
  selectedState: MyPageState;
  setSelectedState: React.Dispatch<React.SetStateAction<MyPageState>>;
}

const MyPageLeftInfo: React.FunctionComponent<MyPageLeftInfoProps> = ({
  selectedState,
  setSelectedState,
}) => {
  const userinfo = useLogin();
  return (
    <nav className="col-span-4 flex flex-col items-center justify-center h-[calc(100svh-64px)] shadow drop-shadow-xl bg-white">
      <div className="flex flex-col items-center">
        <div className="rounded-full w-[6vw] aspect-square bg-deeporange" />
        <p className="mt-[0.3em] text-[1.7em] font-bold">닉네임</p>
        <p className="text-gray">
          {userinfo.email || "rmstjd333@gmail.com"}
        </p>
      </div>
      <div className="w-full flex flex-col items-start justify-center p-12">
        <button
          className={
            selectedState === MyPageState.CHANGENICKNAME
              ? "font-bold text-[1.2em] shadow-[0_-2px_inset] py-2 pr-2 ml-2"
              : "text-[1.2em] p-2"
          }
          onClick={() => setSelectedState(MyPageState.CHANGENICKNAME)}
        >
          닉네임 변경
        </button>
        <button
          className={
            selectedState === MyPageState.CHANGEPASSWORD
              ? "font-bold text-[1.2em] shadow-[0_-2px_inset] py-2 pr-2 ml-2"
              : "text-[1.2em] p-2 "
          }
          onClick={() => setSelectedState(MyPageState.CHANGEPASSWORD)}
        >
          비밀번호 변경
        </button>
        <button
          className={
            selectedState === MyPageState.SHOWHISTORY
              ? "font-bold text-[1.2em] shadow-[0_-2px_inset] py-2 pr-2 ml-2"
              : "text-[1.2em] p-2"
          }
          onClick={() => setSelectedState(MyPageState.SHOWHISTORY)}
        >
          나의 기록
        </button>
      </div>
    </nav>
  );
};

export default MyPageLeftInfo;
