import { MarkdownEdit } from "../models/types";

const LOCAL_EDITS_KEY = "markdown_edits";

export const saveLocalEdit = (path: string, content: string) => {
  // Save current content to localStorage
  localStorage.setItem(`md_edit_${path}`, content);

  // Update edits history
  const edits = getLocalEdits();
  const existingEditIndex = edits.findIndex((edit) => edit.path === path);

  const newEdit: MarkdownEdit = {
    path,
    content,
    lastEdited: new Date().toISOString(),
  };

  if (existingEditIndex >= 0) {
    edits[existingEditIndex] = newEdit;
  } else {
    edits.push(newEdit);
  }

  localStorage.setItem(LOCAL_EDITS_KEY, JSON.stringify(edits));
};

export const getLocalEdits = (): MarkdownEdit[] => {
  const editsJson = localStorage.getItem(LOCAL_EDITS_KEY);
  return editsJson ? JSON.parse(editsJson) : [];
};

export const getOriginalContent = async (path: string): Promise<string> => {
  const mockFiles = await import("./markdownService").then((module) =>
    module.getMarkdownFile(path)
  );
  return mockFiles[0] || "";
};
