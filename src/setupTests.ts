// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jest-canvas-mock"; // If you're using canvas-based components

// Mock for react-markdown if needed
// jest.mock("react-markdown", () => (props: { children: React.ReactNode }) => {
//   return <>{props.children}</>;
// });

jest.mock("remark-gfm", () => () => ({}));
