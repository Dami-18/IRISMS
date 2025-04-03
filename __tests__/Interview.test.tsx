import { render, screen } from "@testing-library/react";
import MeetingPage from "@/app/interview/[slug]/page"; // adjust path if needed
import { useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("@jitsi/react-sdk", () => ({
  JitsiMeeting: ({ roomName }: { roomName: string }) => (
    <div data-testid="jitsi-meeting">Meeting Room: {roomName}</div>
  ),
}));

describe("MeetingPage", () => {
  it("renders error if no room is provided", () => {
    (useParams as jest.Mock).mockReturnValue({});
    render(<MeetingPage />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    
  });

  it("renders JitsiMeeting if room is present", () => {
    (useParams as jest.Mock).mockReturnValue({ slug: "room-123" });
    render(<MeetingPage />);

    expect(screen.getByTestId("jitsi-meeting")).toHaveTextContent("room-123");
  });
});
