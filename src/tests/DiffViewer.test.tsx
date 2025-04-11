import React from "react";
import { render, screen } from "@testing-library/react";
import DiffViewer from "../components/DiffViewer";

describe("DiffViewer", () => {
  const originalText = "Hello\nWorld";
  const editedText = "Hello\nReact\nWorld";

  it("renders without crashing", () => {
    render(<DiffViewer original={originalText} edited={editedText} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("shows added lines correctly", () => {
    render(<DiffViewer original={originalText} edited={editedText} />);
    const addedLine = screen.getByText("React");
    expect(addedLine).toHaveClass("added");
  });

  it("shows unchanged lines correctly", () => {
    render(<DiffViewer original={originalText} edited={editedText} />);
    const unchangedLines = screen.getAllByText("Hello");
    unchangedLines.forEach((line) => {
      expect(line).toHaveClass("unchanged");
    });
  });

  it("handles empty original text", () => {
    render(<DiffViewer original="" edited={editedText} />);
    expect(screen.getAllByText(/.+/).length).toBeGreaterThan(0);
  });

  it("handles empty edited text", () => {
    render(<DiffViewer original={originalText} edited="" />);
    expect(screen.getAllByText(/.+/).length).toBeGreaterThan(0);
  });
});
