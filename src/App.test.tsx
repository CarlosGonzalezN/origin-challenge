import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./components/LoginForm";
import { validate } from "./hooks/useLogin";
import { useNavigate } from "react-router-dom";

jest.mock("./hooks/useLogin", () => ({
  validate: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the login form", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar sesión" })
    ).toBeInTheDocument();
  });

  it("submits the form with valid credentials", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (validate as jest.Mock).mockResolvedValue(true);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    await waitFor(() => {
      expect(validate).toHaveBeenCalledWith({
        username: "john",
        password: "password",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
  });
});
