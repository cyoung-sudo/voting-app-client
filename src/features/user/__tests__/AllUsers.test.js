import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import AllUsers from "../AllUsers";
// APIs
import * as UserAPI from "../../../apis/UserAPI";

// Mocked APIs
jest.mock("../../../apis/UserAPI");

// Mocked child components
jest.mock("../../../components/user/PollCount", () => () => (
  <div className="pollCount">
    Polls: 1
  </div>
));

describe("<AllUsers/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly displays users", async () => {
    // Mock API function
    UserAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        users: [
          {
            _id: "000",
            username: "bob",
            password: "12345",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: "111",
            username: "bill",
            password: "12345",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    });

    render(
      <BrowserRouter>
        <AllUsers/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("allUsers-user")).toHaveLength(2);
      expect(screen.getByText("bob")).toBeInTheDocument();
      expect(screen.getByText("bill")).toBeInTheDocument();
    });
  })
});
