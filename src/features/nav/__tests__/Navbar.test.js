import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Navbar from "../Navbar";
// APIs
import * as AuthAPI from "../../../apis/AuthAPI";

// Mocks
jest.mock("../../../apis/AuthAPI");

describe("<Navbar/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly logs user out", async () => {
    // Mock API function
    AuthAPI.logout.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockSetUser = jest.fn();
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <Navbar 
          user={{}}
          setUser={mockSetUser}
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.click(screen.getByTestId("navbar-logout"));
    
    await waitFor(() => {
      expect(AuthAPI.logout).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(null);
      expect(mockHandlePopUp).toHaveBeenCalledWith("Successfully logged out", "success");
    });
  })
});
