import { App } from "./app";
import { createRoot } from "react-dom/client"; 

const mainContainer = document.createElement("div");
document.body.append(mainContainer);

const root = createRoot(mainContainer);
root.render(<App />)