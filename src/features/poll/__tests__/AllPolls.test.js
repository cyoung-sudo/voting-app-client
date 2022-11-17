import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import AllPolls from "../AllPolls";
// APIs
import * as PollAPI from "../../../apis/PollAPI";

// Mocks
jest.mock("../../../apis/PollAPI");

describe("<AllPolls/>", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly displays polls", async () => {
    // Mock API function
    PollAPI.getAll.mockResolvedValue({
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
        <AllPolls/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("displayPolls-poll")).toHaveLength(2);
      expect(screen.getByText("Topic1")).toBeInTheDocument();
      expect(screen.getByText("Topic2")).toBeInTheDocument();
    });
  })
});
