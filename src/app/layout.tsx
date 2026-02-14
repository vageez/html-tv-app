import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { SystemApi } from "../system/types";
import { pushBackHandler } from "../tv/back-handler";
import { Modal } from "../ui/components/modal";

export function AppLayout({ system }: { system: SystemApi }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    return pushBackHandler(() => {
      if (modalOpen) {
        setModalOpen(false);
        return true;
      }

      if (location.pathname !== "/") {
        navigate(-1);
        return true;
      }

      // let global remoteManager exit the app
      return false;
    });
  }, [modalOpen, location.pathname, navigate]);

  return (
    <div style={{ padding: 40 }}>
      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
        {/* mouse-friendly for now; we’ll convert to focusable later */}
        <button
          onClick={() => setModalOpen(true)}
          style={{ fontSize: 18, padding: "10px 14px" }}
        >
          Open Settings
        </button>
      </div>

      <Suspense fallback={<div>Loading…</div>}>
        <Outlet />
      </Suspense>

      {modalOpen && (
        <Modal title="Settings" onClose={() => setModalOpen(false)}>
          <p style={{ marginTop: 0 }}>Modal content here.</p>
        </Modal>
      )}
    </div>
  );
}
