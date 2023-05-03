import { useState } from "react";
import GridLayout from "../Layout/GridLayout";
import MyPageLeftInfo from "./MyPageLeftInfo";
import MyPageRightInfo from "./MyPageRightInfo";

export enum MyPageState {
  CHANGENICKNAME,
  CHANGEPASSWORD,
  SHOWHISTORY,
}

const MyPage: React.FunctionComponent = () => {
  const [selectedState, setSelectedState] = useState<MyPageState>(
    MyPageState.CHANGENICKNAME
  );
  return (
    <main className="relative w-full top-[64px] min-h-[calc(100vh-64px)]">
      <GridLayout>
        <MyPageLeftInfo
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
        <MyPageRightInfo
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      </GridLayout>
    </main>
  );
};

export default MyPage;
