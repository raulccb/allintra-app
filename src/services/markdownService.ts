import { SidebarItem } from "../models/types";
import {
  getMarkdownFileContent,
  getMarkdownFilesList,
} from "./bitbucketService";

export const getMarkdownFile = async (path: string): Promise<string> => {
  return (
    (await getMarkdownFileContent(path)) ||
    "# File not found\n\nThe requested file does not exist."
  );
};

export const getSidebarItens = async (): Promise<SidebarItem[]> => {
  // Get list of markdown files
  let parseDataMdFiles: SidebarItem[] = [];
  const markdownFiles = await getMarkdownFilesList();

  // Filter for .md files
  markdownFiles.forEach((file) => {
    parseDataMdFiles.push({
      title: file.path.split("/").pop() || "",
      path: file.path,
      isHomepage: file.path === "homepage.md" ? true : false,
    });
  });

  return parseDataMdFiles;

  // Example of the return
  // return [
  //   { title: "Home", path: "homepage.md", isHomepage: true },
  //   { title: "Getting Started", path: "getting-started.md" },
  //   { title: "API Reference", path: "api-reference.md" },
  //   { title: "Configuration", path: "configuration.md" },
  // ];
};
