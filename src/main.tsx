// Vite entry point: mounts the root App component into the #root DOM element
// inside React.StrictMode.
import "../global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
