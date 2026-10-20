import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { App } from "./App";
import "./index.css";

registerSW({ immediate: true });

// Ask the browser not to evict progress under storage pressure (granted automatically for installed PWAs on Android).
navigator.storage?.persist?.().catch(() => {});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
