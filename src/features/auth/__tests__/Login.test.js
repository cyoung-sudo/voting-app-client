import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Login from "../Login";
// APIs
import * as AuthAPI from "../../../apis/AuthAPI";

// Mocks
jest.mock("../../../apis/AuthAPI");

describe("<Login/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock API function
    AuthAPI.login.mockResolvedValue({
      data: {
        success: true,
        user: {}
      }
    });

    // Mock prop functions
    const mockSetUser = jest.fn();
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <Login
          setUser={mockSetUser}
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("form-username"), "User1");
    userEvent.type(screen.getByTestId("form-password"), "Pass1");
    userEvent.click(screen.getByTestId("form-submit"));
    
    await waitFor(() => {
      expect(AuthAPI.login).toHaveBeenCalledWith("User1", "Pass1");
      expect(mockSetUser).toHaveBeenCalledWith({});
      expect(mockHandlePopUp).toHaveBeenCalledWith("Successfully logged in", "success");
    });
  }),

  //----- Test 2 -----
  it("correctly handles empty username field", async () => {
    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <Login handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("form-password"), "Pass1");
    userEvent.click(screen.getByTestId("form-submit"));
    
    await waitFor(() => {
      expect(AuthAPI.login).not.toHaveBeenCalled();
      expect(mockHandlePopUp).toHaveBeenCalledWith("No username given", "error");
    });
  }),

  //----- Test 3 -----
  it("correctly handles empty password field", async () => {
    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <Login handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("form-username"), "User1");
    userEvent.click(screen.getByTestId("form-submit"));
    
    await waitFor(() => {
      expect(AuthAPI.login).not.toHaveBeenCalled();
      expect(mockHandlePopUp).toHaveBeenCalledWith("No password given", "error");
    });
  })
});
