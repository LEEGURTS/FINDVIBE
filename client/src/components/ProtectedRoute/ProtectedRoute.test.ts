import { useLogin } from "../../State/userInfo";
import renderWithHistoryRouter from "./renderWithHistoryRouter";
import { screen } from "@testing-library/react";

describe("ProtectedRoute", () => {
  it("Loginned", () => {
    useLogin.setState({ isLogin: true });
    renderWithHistoryRouter();
    expect(screen.getByText("main")).toBeInTheDocument();
  });

  it("not Loginned", () => {
    useLogin.setState({ isLogin: false });
    renderWithHistoryRouter();
    expect(screen.getByText("signin")).toBeInTheDocument();
  });
});
