import React from "react";
import { SidebarItem } from "../models/types";
import "../assets/css/Sidebar.css";

interface SidebarProps {
  items?: SidebarItem[];
  contentFile?: string;
  onItemClick: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  contentFile = "Not Found",
  onItemClick,
}) => {
  return (
    <div className="sidebar">
      {/* <ul className="menu">
        {items.map((item) => (
          <li
            key={item.path}
            className={item.isHomepage ? "homepage" : ""}
            onClick={() => onItemClick(item.path)}
          >
            {item.title}
          </li>
        ))}
      </ul> */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items?.map((file, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <button
              onClick={() => onItemClick(file.path)}
              style={{
                background: "none",
                border: "none",
                color: "#0366d6",
                cursor: "pointer",
                textAlign: "left",
                padding: "5px",
                borderRadius: "3px",
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {file.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
