import { App } from "./app";
import { createRoot } from "react-dom/client"; 
import React from "react";

const mainContainer = document.createElement("div");
document.body.append(mainContainer);

const root = createRoot(mainContainer);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>    
);