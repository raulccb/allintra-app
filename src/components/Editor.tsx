import React from "react";
import "../assets/css/Editor.css";

interface EditorProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <div className="editor-container">
      <textarea
        className="markdown-editor"
        value={content}
        onChange={onChange}
        spellCheck="false"
      />
    </div>
  );
};

export default Editor;
