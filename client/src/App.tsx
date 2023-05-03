import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import MyPlacePage from "./pages/MyPlacePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MyPagePage from "./pages/MyPagePage";

const App: React.FunctionComponent = () => {
  const SignInPage = lazy(() => import("./pages/SignInPage"));
  const SignUpPage = lazy(() => import("./pages/SignUpPage"));
  const FindLocationPage = lazy(() => import("./pages/FindLocationPage"));
  const HotPlacePage = lazy(() => import("./pages/HotPlacePage"));
  return (
    <div
      className="w-full min-h-screen font-pretendard text-[16px] whitespace-pre-line scrollbar-hide"
      style={{
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <Suspense>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPagePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/myplace" element={<MyPlacePage />} />
            <Route path="/findvibe" element={<FindLocationPage />} />
            <Route path="/hotplace" element={<HotPlacePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
