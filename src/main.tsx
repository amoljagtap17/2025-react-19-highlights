import "@fontsource/open-sans/400.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container">
      <h1>Todo App</h1>
      <App />
    </div>
  </StrictMode>
);
