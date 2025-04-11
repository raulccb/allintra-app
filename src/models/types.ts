export interface SidebarItem {
  title: string;
  path: string;
  isHomepage?: boolean;
}

export interface MarkdownFile {
  path: string;
  content: string;
  lastUpdated: string;
}

export interface MarkdownEdit {
  path: string;
  content: string;
  lastEdited: string;
}
