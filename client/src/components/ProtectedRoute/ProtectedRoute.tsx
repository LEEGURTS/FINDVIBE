import { Navigate, Outlet, useLocation } from "react-router";
import { useLogin } from "../../State/userInfo";

const ProtectedRoute: React.FunctionComponent = () => {
  const { isLogin } = useLogin();
  const currentLocation = useLocation();

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/signin"}
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  );
};

export default ProtectedRoute;
