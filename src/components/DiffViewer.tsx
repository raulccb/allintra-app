import React from "react";
import { diffLines } from "diff";
import "../assets/css/DiffViewer.css";

interface DiffViewerProps {
  original: string;
  edited: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, edited }) => {
  const differences = diffLines(original, edited);

  return (
    <div className="diff-viewer">
      {differences.map((part, index) => {
        const className = part.added
          ? "added"
          : part.removed
          ? "removed"
          : "unchanged";
        return (
          <div key={index} className={`diff-line ${className}`}>
            {part.value.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < part.value.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default DiffViewer;
