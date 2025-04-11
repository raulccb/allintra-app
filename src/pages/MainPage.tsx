import React from "react";
import { useMarkdownFiles } from "../hooks/useMarkdownFiles";
import Sidebar from "../components/Sidebar";
import MarkdownViewer from "../components/MarkdownViewer";
import Editor from "../components/Editor";
import SyncStatus from "../components/SyncStatus";
import "../assets/css/MainPage.css";

const MainPage: React.FC = () => {
  const {
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
  } = useMarkdownFiles();

  const handleSyncClick = () => {
    // Implement your sync logic here
    console.log("Syncing changes...");
    // After sync:
    // setHasLocalChanges(false);
  };

  return (
    <div className="main-page">
      <section>
        <Sidebar items={sidebarItems} onItemClick={loadFile} />

        <article>
          <div className="content-area">
            {currentFile && (
              <>
                <SyncStatus
                  hasChanges={hasLocalChanges}
                  lastSynced={new Date()}
                  onSyncClick={handleSyncClick}
                />
                <div className="toolbar">
                  {!isEditing ? (
                    <button onClick={startEditing}>Edit</button>
                  ) : (
                    <>
                      <button onClick={saveEditing}>Save</button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </>
                  )}
                </div>
                {isEditing ? (
                  <Editor
                    content={editContent}
                    onChange={handleContentChange}
                  />
                ) : (
                  <MarkdownViewer content={currentFile.content} />
                )}
              </>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default MainPage;
