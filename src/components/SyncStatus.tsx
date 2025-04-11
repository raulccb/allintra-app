import React from "react";
import "../assets/css/SyncStatus.css";

interface SyncStatusProps {
  hasChanges: boolean;
  lastSynced?: Date;
  onSyncClick?: () => void;
}

const SyncStatus: React.FC<SyncStatusProps> = ({
  hasChanges,
  lastSynced,
  onSyncClick,
}) => {
  const formatLastSynced = () => {
    if (!lastSynced) return "Never";
    return lastSynced.toLocaleString();
  };

  return (
    <div className="sync-status-container">
      <div className={`sync-status ${hasChanges ? "unsynced" : "synced"}`}>
        {hasChanges ? (
          <>
            <span className="status-icon">⚠️</span>
            <span className="status-text">Local changes not synchronized</span>
          </>
        ) : (
          <>
            <span className="status-icon">✓</span>
            <span className="status-text">Synchronized</span>
          </>
        )}
      </div>

      <div className="sync-details">
        <div className="last-synced">Last synced: {formatLastSynced()}</div>
        {hasChanges && onSyncClick && (
          <button className="sync-button" onClick={onSyncClick}>
            Sync Now
          </button>
        )}
      </div>
    </div>
  );
};

export default SyncStatus;
