import React, { useEffect, useState } from "react";
import { getLocalEdits, getOriginalContent } from "../services/storageService";
import DiffViewer from "../components/DiffViewer";
import { MarkdownEdit } from "../models/types";
import "../assets/css/AdminPage.css";

const AdminPage: React.FC = () => {
  const [edits] = useState<MarkdownEdit[]>(getLocalEdits());
  const [selectedEdit, setSelectedEdit] = useState<MarkdownEdit | null>(null);
  const [diffContent, setDiffContent] = useState<{
    original: string;
    edited: string;
  } | null>(null);

  console.log("edits", edits);

  const handleSelectEdit = async (edit: MarkdownEdit) => {
    setSelectedEdit(edit);
    const original = await getOriginalContent(edit.path);
    setDiffContent({
      original,
      edited: edit.content,
    });
  };

  return (
    <div className="admin-page">
      <h2>Administration</h2>
      <div className="admin-content">
        <div className="edits-list">
          <h3>Local Edits</h3>
          <ul>
            {edits.map((edit) => (
              <li
                key={`${edit.path}-${edit.lastEdited}`}
                className={selectedEdit === edit ? "selected" : ""}
                onClick={() => handleSelectEdit(edit)}
              >
                <div className="edit-path">{edit.path}</div>
                <div className="edit-date">
                  {new Date(edit.lastEdited).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="diff-viewer">
          {diffContent ? (
            <>
              <h3>Changes for {selectedEdit?.path}</h3>
              <DiffViewer
                original={diffContent.original}
                edited={diffContent.edited}
              />
            </>
          ) : (
            <p>Select an edit to view changes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
