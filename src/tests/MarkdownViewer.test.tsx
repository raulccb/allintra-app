import React from "react";
import { render, screen } from "@testing-library/react";
import MarkdownViewer from "../components/MarkdownViewer";

describe("MarkdownViewer", () => {
  const markdownContent = `
    # Heading 1
    ## Heading 2
    [Link](https://example.com)
    \`code\`
  `;

  it("renders markdown content correctly", () => {
    render(<MarkdownViewer content={markdownContent} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText("code")).toBeInTheDocument();
  });

  it("renders empty content without errors", () => {
    render(<MarkdownViewer content="" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("handles code blocks correctly", () => {
    const codeContent = "```javascript\nconst x = 1;\n```";
    render(<MarkdownViewer content={codeContent} />);
    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<MarkdownViewer content={markdownContent} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
