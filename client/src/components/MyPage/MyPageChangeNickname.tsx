import { useLogin } from "../../State/userInfo";

const MyPageChangeNickname: React.FunctionComponent = () => {
  const userInfo = useLogin();
  return (
    <main className="col-span-8 h-[calc(100svh-64px)] flex flex-col p-4 justify-center">
      <div className="p-8 border-2 rounded-[0.8em] bg-white border-deeporange drop-shadow-md">
        <label className="text-[1.5em] font-bold">현재 닉네임</label>
        <p className="text-[2em]">닉네임</p>
      </div>
      <div className="my-[2em]">
        <label className="text-[1.5em] font-bold">
          변경하실 닉네임을 작성해주세요.
        </label>
        <input
          className="w-full p-4 border border-gray rounded-[0.8em] bg-white drop-shadow-md"
          type="text"
          placeholder="닉네임"
        />
        <button className="mt-[1em] border p-2 rounded-[0.5em] bg-[#e0e0e0] text-gray font-bold ">
          중복확인
        </button>
        <button className="w-full mt-[1em] p-4 bg-deeporange rounded-[0.8em] text-white font-bold text-[1.5em]">
          변경하기
        </button>
      </div>
    </main>
  );
};

export default MyPageChangeNickname;
