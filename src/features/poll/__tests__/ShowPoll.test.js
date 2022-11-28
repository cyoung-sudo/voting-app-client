import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import ShowPoll from "../ShowPoll";
// APIs
import * as PollAPI from "../../../apis/PollAPI";
import * as AuthAPI from "../../../apis/AuthAPI";

// Mocked APIs
jest.mock("../../../apis/PollAPI");
jest.mock("../../../apis/AuthAPI");

// Mocked to fix "ResponsiveContainer" testing error
jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: props => <div {...props} />,
}))

describe("<ShowPoll/>", () => {
  
  beforeEach(() => {
    // Mock API function
    PollAPI.getOne.mockResolvedValue({
      data: { 
        success: true,
        poll: {
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
        }
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly displays poll", async () => {
    render(
      <BrowserRouter>
        <ShowPoll/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(PollAPI.getOne).toHaveBeenCalled();
    expect(screen.getByText("Topic1")).toBeInTheDocument();
  });

  //----- Test 2 -----
  it("correctly submits vote", async () => {
    // Mock API function
    PollAPI.vote.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <ShowPoll handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getAllByTestId("showPoll-vote-option")[0]);
    userEvent.click(screen.getByTestId("showPoll-vote-submit"));

    await waitFor(() => {
      expect(mockHandlePopUp).toHaveBeenCalledWith("Successfully voted", "success");
    });
  });

  //----- Test 3 -----
  it("correctly adds new option", async () => {
    // Mock API function
    PollAPI.addOption.mockResolvedValue({
      data: { success: true }
    });

    AuthAPI.getUser.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <ShowPoll 
          user={{ _id: "111"}}
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("showPoll-newOption"), "third");
    userEvent.click(screen.getByTestId("showPoll-newOption-submit"));

    await waitFor(() => {
      expect(mockHandlePopUp).toHaveBeenCalledWith("Option(s) added", "success");
    });
  });

  //----- Test 4 -----
  it("correctly deletes poll", async () => {
    // Mock API function
    PollAPI.deletePoll.mockResolvedValue({
      data: { success: true }
    });

    AuthAPI.getUser.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    // Other mocks
    window.confirm = jest.fn(() => true);

    render(
      <BrowserRouter>
        <ShowPoll 
          user={{ _id: "111"}}
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("showPoll-delete"));

    await waitFor(() => {
      expect(mockHandlePopUp).toHaveBeenCalledWith("Poll deleted", "success");
    });
  });

  //----- Test 5 -----
  it("correctly changes poll status", async () => {
    // Mock API function
    PollAPI.setStatus.mockResolvedValue({
      data: { success: true }
    });

    AuthAPI.getUser.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <ShowPoll 
          user={{ _id: "111"}}
          handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("showPoll-close"));

    await waitFor(() => {
      expect(mockHandlePopUp).toHaveBeenCalledWith("Poll status changed", "success");
    });
  });

  //----- Test 6 -----
  it("correctly refreshed poll data", async () => {
    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <ShowPoll handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("showPoll-refresh"));

    await waitFor(() => {
      expect(mockHandlePopUp).toHaveBeenCalledWith("Data refreshed", "success");
    });
  });
});
