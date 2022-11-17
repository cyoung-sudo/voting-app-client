import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Signup from "../Signup";
// APIs
import * as AuthAPI from "../../../apis/AuthAPI";

// Mocks
jest.mock("../../../apis/AuthAPI");

describe("<Signup/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock API function
    AuthAPI.signup.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <Signup handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("form-username"), "User1");
    userEvent.type(screen.getByTestId("form-password"), "Pass1");
    userEvent.click(screen.getByTestId("form-submit"));
    
    await waitFor(() => {
      expect(AuthAPI.signup).toHaveBeenCalledWith("User1", "Pass1");
      expect(mockHandlePopUp).toHaveBeenCalledWith("Successfully signed up", "success");
    });
  }),

  //----- Test 2 -----
  it("correctly handles empty username field", async () => {
    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <Signup
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("form-password"), "Pass1");
    userEvent.click(screen.getByTestId("form-submit"));
    
    await waitFor(() => {
      expect(AuthAPI.signup).not.toHaveBeenCalled();
      expect(mockHandlePopUp).toHaveBeenCalledWith("No username given", "error");
    });
  }),

  //----- Test 3 -----
  it("correctly handles empty password field", async () => {
    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <Signup
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("form-username"), "User1");
    userEvent.click(screen.getByTestId("form-submit"));
    
    await waitFor(() => {
      expect(AuthAPI.signup).not.toHaveBeenCalled();
      expect(mockHandlePopUp).toHaveBeenCalledWith("No password given", "error");
    });
  })
});
