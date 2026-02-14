import React from "react";
import ReactDOM from "react-dom/client";
import { createSystem } from "./system/createSystem";
import { initRemoteManager } from "./tv/remote-manager";

import { App } from "./app";

async function bootstrap() {
  const system = await createSystem();
  system.log("Boot", { platform: system.platform });

  initRemoteManager(system);

  ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
      <App system={system} />
    </React.StrictMode>,
  );
}

bootstrap();
