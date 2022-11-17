import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Settings from "../Settings";
// APIs
import * as UserAPI from "../../../apis/UserAPI";
import * as AuthAPI from "../../../apis/AuthAPI";

// Mocks
jest.mock("../../../apis/UserAPI");
jest.mock("../../../apis/AuthAPI");

describe("<Settings/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly deletes user account", async () => {
    // Mock API functions
    UserAPI.deleteUser.mockResolvedValue({
      data: { success: true }
    });
    AuthAPI.logout.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockSetUser = jest.fn();
    const mockHandlePopUp = jest.fn();

    // Other mocks
    window.confirm = jest.fn(() => true);

    render(
      <BrowserRouter>
        <Settings
          setUser={mockSetUser}
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.click(screen.getByTestId("settings-delete"));

    await waitFor(() => {
      expect(UserAPI.deleteUser).toHaveBeenCalled();
      expect(AuthAPI.logout).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(null);
      expect(mockHandlePopUp).toHaveBeenCalledWith("Account deleted", "success");
    });
  })
});
