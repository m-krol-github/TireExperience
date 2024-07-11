import React from "react";
import { createRoot } from "react-dom/client";
import Game from ".";
import "./style.css";

const root = createRoot(document.getElementById("app")!);

root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
