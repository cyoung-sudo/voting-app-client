import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import App from "./App";
// APIs
import * as AuthAPI from "./apis/AuthAPI";

// Mocks
jest.mock("./apis/AuthAPI");

describe("<App/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly retrieves authenticated user if possible", async () => {
    // Mock API function
    AuthAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: {
          _id: "000",
          username: "bob",
          password: "12345",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    });

    render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(AuthAPI.getUser).toHaveBeenCalled();
    });
  })
});
