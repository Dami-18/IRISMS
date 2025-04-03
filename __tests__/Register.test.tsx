import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "@/app/register-students/page";
import { validationStud } from "../auth";
import toast from "react-hot-toast";


jest.mock("../auth", () => ({
  validationStud: jest.fn(),
  verifyStud: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    loading: jest.fn(() => "toast-id"),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the registration form", () => {
    render(<Register />);
    expect(screen.getByText("User Registration")).toBeInTheDocument();
    
  });

  it("shows error toast on validation error", async () => {
    (validationStud as jest.Mock).mockResolvedValue({
      errors: { email: "Invalid email" },
    });

    render(<Register />);

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Registration failed. Please check your credentials.",
        { id: "toast-id" }
      );
    });
  });
});
