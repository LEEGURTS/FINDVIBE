import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { render } from "@testing-library/react";

const renderWithHistoryRouter = () => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<div>signin</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>main</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default renderWithHistoryRouter;
