import React from "react";
import { render, screen } from "@testing-library/react";
import SyncStatus from "../components/SyncStatus";

describe("SyncStatus", () => {
  it("shows synced status when no changes", () => {
    render(<SyncStatus hasChanges={false} />);
    expect(screen.getByText("Synchronized")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
    expect(screen.getByTestId("sync-status")).toHaveClass("synced");
  });

  it("shows unsynced status when changes exist", () => {
    render(<SyncStatus hasChanges={true} />);
    expect(
      screen.getByText("Local changes not synchronized")
    ).toBeInTheDocument();
    expect(screen.getByText("⚠️")).toBeInTheDocument();
    expect(screen.getByTestId("sync-status")).toHaveClass("unsynced");
  });

  it("shows last synced time when provided", () => {
    const lastSynced = new Date("2023-01-01T12:00:00");
    render(<SyncStatus hasChanges={false} lastSynced={lastSynced} />);
    expect(screen.getByText(/Last synced:/)).toBeInTheDocument();
    expect(screen.getByText("1/1/2023, 12:00:00 PM")).toBeInTheDocument();
  });

  it("shows sync button when hasChanges and onSyncClick provided", () => {
    const mockSync = jest.fn();
    render(<SyncStatus hasChanges={true} onSyncClick={mockSync} />);
    const button = screen.getByRole("button", { name: /Sync Now/i });
    expect(button).toBeInTheDocument();
    button.click();
    expect(mockSync).toHaveBeenCalled();
  });

  it("matches snapshot for synced state", () => {
    const { asFragment } = render(<SyncStatus hasChanges={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for unsynced state", () => {
    const { asFragment } = render(
      <SyncStatus
        hasChanges={true}
        lastSynced={new Date("2023-01-01T12:00:00")}
        onSyncClick={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
