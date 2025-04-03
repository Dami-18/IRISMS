import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/Components/Navbar";
import React from "react";

describe("Navbar Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders tabs and sets active tab on click", () => {
    const setActiveTab = jest.fn();
    render(<Navbar activeTab="internships" setActiveTab={setActiveTab} />);

    const internshipsTab = screen.getByText("Internships");
    const scholarshipsTab = screen.getByText("Scholarships");

    expect(internshipsTab).toBeInTheDocument();
    expect(scholarshipsTab).toBeInTheDocument();

    fireEvent.click(scholarshipsTab);
    expect(setActiveTab).toHaveBeenCalledWith("scholarships");
    expect(localStorage.getItem("activeTab")).toBe("scholarships");
  });

  it("restores active tab from localStorage on mount", () => {
    localStorage.setItem("activeTab", "scholarships");

    const setActiveTab = jest.fn();
    render(<Navbar activeTab="" setActiveTab={setActiveTab} />);

    expect(setActiveTab).toHaveBeenCalledWith("scholarships");
  });
});
