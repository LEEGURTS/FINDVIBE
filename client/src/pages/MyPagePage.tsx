import GlobalNavigationBar from "../components/Header/GlobalNavigationBar";
import MyPage from "../components/MyPage/MyPage";

const MyPagePage: React.FunctionComponent = () => {
  return (
    <>
      <GlobalNavigationBar></GlobalNavigationBar>
      <MyPage />
    </>
  );
};

export default MyPagePage;
