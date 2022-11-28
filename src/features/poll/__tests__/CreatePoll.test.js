import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import CreatePoll from "../CreatePoll";
// APIs
import * as PollAPI from "../../../apis/PollAPI";
import * as AuthAPI from "../../../apis/AuthAPI";

// Mocks
jest.mock("../../../apis/PollAPI");
jest.mock("../../../apis/AuthAPI");

describe("<CreatePoll/>", () => {
  beforeEach(() => {
    AuthAPI.getUser.mockResolvedValue({
      data: { 
        success: true,
        user: { _id: "000" }
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock API functions
    PollAPI.create.mockResolvedValue({
      data: { success: true }
    });

    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <CreatePoll handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("createPoll-topic"), "Topic1");
    userEvent.type(screen.getByTestId("createPoll-options"), "option1,option2");
    userEvent.click(screen.getByTestId("createPoll-submit"));
    
    await waitFor(() => {
      expect(PollAPI.create).toHaveBeenCalledWith("000", "Topic1", "option1,option2");
      expect(mockHandlePopUp).toHaveBeenCalledWith("Created poll", "success");
    });
  }),

  //----- Test 2 -----
  it("correctly handles empty topic field", async () => {
    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <CreatePoll handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("createPoll-options"), "option1,option2");
    userEvent.click(screen.getByTestId("createPoll-submit"));
    
    await waitFor(() => {
      expect(PollAPI.create).not.toHaveBeenCalled();
      expect(mockHandlePopUp).toHaveBeenCalledWith("No topic given", "error");
    });
  }),

  //----- Test 3 -----
  it("correctly handles empty options field", async () => {
    // Mock prop functions
    const mockHandlePopUp = jest.fn();

    render(
      <BrowserRouter>
        <CreatePoll handlePopUp={mockHandlePopUp}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("createPoll-topic"), "Topic1");
    userEvent.click(screen.getByTestId("createPoll-submit"));
    
    await waitFor(() => {
      expect(PollAPI.create).not.toHaveBeenCalled();
      expect(mockHandlePopUp).toHaveBeenCalledWith("No option(s) given", "error");
    });
  })
});
