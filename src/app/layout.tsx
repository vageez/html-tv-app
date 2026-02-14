import React, { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { SystemApi } from "../system/types";
import { pushBackHandler } from "../tv/back-handler";
import { Modal } from "../ui/components/modal";
import { FocusButton } from "../ui/components/focus-button";

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
    <div className="p-10">
      <div className="mb-4 flex gap-3">
        <FocusButton label="Open Settings" onPress={() => setModalOpen(true)} />
      </div>

      <Suspense fallback={<div>Loading…</div>}>
        <Outlet />
      </Suspense>

      {modalOpen && (
        <Modal title="Settings" onClose={() => setModalOpen(false)}>
          <p className="mt-0">Modal content here.</p>
        </Modal>
      )}
    </div>
  );
}
