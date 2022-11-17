import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Profile from "../Profile";
// APIs
import * as UserAPI from "../../../apis/UserAPI";
import * as PollAPI from "../../../apis/PollAPI";

// Mocks
jest.mock("../../../apis/UserAPI");
jest.mock("../../../apis/PollAPI");

describe("<Profile/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly displays users", async () => {
    // Mock API function
    UserAPI.getOne.mockResolvedValue({
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

    PollAPI.getAllUser.mockResolvedValue({
      data: {
        success: true,
        polls: [
          {
            _id: "000",
            userId: "111",
            topic: "Topic1",
            options: [ 
              {
                value: "first",
                votes: 0
              },
              {
                value: "second",
                votes: 0
              }
            ],
            closed: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: "222",
            userId: "333",
            topic: "Topic2",
            options: [ 
              {
                value: "first",
                votes: 0
              },
              {
                value: "second",
                votes: 0
              }
            ],
            closed: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    });

    render(
      <BrowserRouter>
        <Profile/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(UserAPI.getOne).toHaveBeenCalled();
      expect(PollAPI.getAllUser).toHaveBeenCalled();
      expect(screen.getAllByTestId("displayPolls-poll")).toHaveLength(2);
      expect(screen.getByText("Topic1")).toBeInTheDocument();
      expect(screen.getByText("Topic2")).toBeInTheDocument();
    });
  })
});
