import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

const mockSetIsAdmin = jest.fn();

const renderHeader = (isAdmin: boolean) => {
  return render(
    <BrowserRouter>
      <Header isAdmin={isAdmin} setIsAdmin={mockSetIsAdmin} />
    </BrowserRouter>
  );
};

describe("Header", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and links", () => {
    renderHeader(false);
    expect(screen.getByText("Markdown Viewer")).toBeInTheDocument();
    expect(screen.getByText("Admin Mode")).toBeInTheDocument();
  });

  it("shows admin panel link when in admin mode", () => {
    renderHeader(true);
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    expect(screen.getByText("Exit Admin")).toBeInTheDocument();
  });

  it("calls setIsAdmin when toggle button is clicked", () => {
    renderHeader(false);
    fireEvent.click(screen.getByText("Admin Mode"));
    expect(mockSetIsAdmin).toHaveBeenCalledWith(true);
  });

  it("changes button text based on admin mode", () => {
    const { rerender } = renderHeader(false);
    expect(screen.getByText("Admin Mode")).toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <Header isAdmin={true} setIsAdmin={mockSetIsAdmin} />
      </BrowserRouter>
    );
    expect(screen.getByText("Exit Admin")).toBeInTheDocument();
  });

  it("matches snapshot in non-admin mode", () => {
    const { asFragment } = renderHeader(false);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot in admin mode", () => {
    const { asFragment } = renderHeader(true);
    expect(asFragment()).toMatchSnapshot();
  });
});
