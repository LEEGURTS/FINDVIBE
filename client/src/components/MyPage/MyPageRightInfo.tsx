import { useLogin } from "../../State/userInfo";
import { MyPageState } from "./MyPage";
import MyPageChangeNickname from "./MyPageChangeNickname";
import MyPageChangePassword from "./MyPageChangePassword";
import MyPageMyRecord from "./MyPageRecord/MyPageMyRecord";

interface MyPageRightInfoProps {
  selectedState: MyPageState;
  setSelectedState: React.Dispatch<React.SetStateAction<MyPageState>>;
}

const MyPageRightInfo: React.FunctionComponent<MyPageRightInfoProps> = ({
  selectedState,
  setSelectedState,
}) => {
  const userInfo = useLogin();
  switch (selectedState) {
    case MyPageState.CHANGENICKNAME:
      return <MyPageChangeNickname />;
    case MyPageState.CHANGEPASSWORD:
      return <MyPageChangePassword />;
    default:
      return <MyPageMyRecord />;
  }
};

export default MyPageRightInfo;
