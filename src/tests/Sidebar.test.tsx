import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";

const mockItems = [
  { title: "Home", path: "home.md", isHomepage: true },
  { title: "Docs", path: "docs.md" },
  { title: "About", path: "about.md" },
];

const mockOnItemClick = jest.fn();

describe("Sidebar", () => {
  beforeEach(() => {
    render(<Sidebar items={mockItems} onItemClick={mockOnItemClick} />);
  });

  it("renders all items", () => {
    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("calls onItemClick with correct path when item is clicked", () => {
    fireEvent.click(screen.getByText("Docs"));
    expect(mockOnItemClick).toHaveBeenCalledWith("docs.md");
  });

  it("applies homepage class to homepage item", () => {
    const homeItem = screen.getByText("Home").parentElement;
    expect(homeItem).toHaveClass("homepage");
  });

  it("does not apply homepage class to non-homepage items", () => {
    const docsItem = screen.getByText("Docs").parentElement;
    expect(docsItem).not.toHaveClass("homepage");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Sidebar items={mockItems} onItemClick={mockOnItemClick} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
