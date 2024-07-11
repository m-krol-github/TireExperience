import { createRoot } from "react-dom/client";
import ExampleGame from ".";
import "./style.css";

const root = createRoot(document.getElementById("app")!);

root.render(<ExampleGame />);
