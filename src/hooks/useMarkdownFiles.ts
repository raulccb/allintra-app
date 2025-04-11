import { useState, useEffect } from "react";
import { getSidebarItens } from "../services/markdownService";
import { saveLocalEdit } from "../services/storageService";
import { MarkdownFile, SidebarItem } from "../models/types";
import { getMarkdownFileContent } from "../services/bitbucketService";

export const useMarkdownFiles = () => {
  const [currentFile, setCurrentFile] = useState<MarkdownFile | null>(null);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  useEffect(() => {
    const loadSidebar = async () => {
      const sidebarContent = await getSidebarItens();
      setSidebarItems(sidebarContent);

      if (!currentFile) {
        loadFile("docs/homepage.md");
      }
    };

    loadSidebar();
  }, [currentFile]);

  const loadFile = async (path: string) => {
    const fileContent = await getMarkdownFileContent(path);
    const localContent = localStorage.getItem(`md_edit_${path}`);

    setCurrentFile({
      path,
      content: fileContent,
      lastUpdated: new Date().toISOString(),
    });

    setEditContent(localContent || fileContent);
    setHasLocalChanges(!!localContent);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditContent(currentFile?.content || "");
  };

  const saveEditing = () => {
    if (!currentFile) return;

    saveLocalEdit(currentFile.path, editContent);
    setIsEditing(false);
    setHasLocalChanges(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  return {
    currentFile,
    sidebarItems,
    isEditing,
    editContent,
    hasLocalChanges,
    loadFile,
    startEditing,
    cancelEditing,
    saveEditing,
    handleContentChange,
  };
};
