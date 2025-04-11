import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Editor from "../components/Editor";

describe("Editor", () => {
  const initialContent = "Initial content";
  const mockOnChange = jest.fn();

  beforeEach(() => {
    render(<Editor content={initialContent} onChange={mockOnChange} />);
  });

  it("renders with initial content", () => {
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue(initialContent);
  });

  it("calls onChange when content changes", () => {
    const textarea = screen.getByRole("textbox");
    const newValue = "New content";
    fireEvent.change(textarea, { target: { value: newValue } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility attributes", () => {
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("spellcheck", "false");
    expect(textarea).toHaveClass("markdown-editor");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Editor content={initialContent} onChange={mockOnChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
