import { useRef } from "react";
import { sendUpdatePasswordRequest } from "../../API/user";
import { useLogin } from '../../State/userInfo';

const MyPageChangePassword: React.FunctionComponent = () => {
  const userInfo = useLogin();

  const password = useRef<{ password: string; checkPassword: string }>({
    password: "",
    checkPassword: "",
  });

  const checkPassword = () => {
    if (password.current.password.length < 7) {
      alert("비밀번호 길이가 짧습니다.");
    } else if (
      !/[^0-9]/.test(password.current.password) ||
      !/[a-zA-Z]/.test(password.current.password)
    ) {
      alert("반드시 영어,숫자를 포함해야합니다.");
    } else if (password.current.password !== password.current.checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (checkPassword()) {
      sendUpdatePasswordRequest(password.current.password)
      .then((res)=>{
        if(!res.success){
          alert("이미 사용한 비밀번호입니다!");
          return;
        }
        alert("비밀번호 변경 성공!");
      });
    }
  };

  return (
    <main className="col-span-6 tablet:col-span-8 tablet:h-[calc(100svh-64px)] flex flex-col p-4 justify-center">
      <div className="my-[2em]">
        <label className="text-[1.5em] font-bold">
          변경하실 비밀번호를 입력해주세요.
        </label>
        <input
          className="w-full p-4 border border-gray rounded-[0.8em] bg-white drop-shadow-md mb-[1em]"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => (password.current.password = e.target.value)}
        />
        <label className="text-[1.5em] font-bold">
          다시 한번 입력해주세요.
        </label>
        <input
          className="w-full p-4 border border-gray rounded-[0.8em] bg-white drop-shadow-md"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => (password.current.checkPassword = e.target.value)}
        />
        <button
          className="w-full mt-[1em] p-4 bg-deeporange rounded-[0.8em] text-white font-bold text-[1.5em]"
          onClick={handleSubmit}
        >
          변경하기
        </button>
      </div>
    </main>
  );
};

export default MyPageChangePassword;
