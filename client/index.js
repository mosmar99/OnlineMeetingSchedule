import React from "react";
import { App } from "./app";
import { createRoot } from "react-dom/client"; 
import { StyledEngineProvider } from "@mui/material/styles";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);
root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </React.StrictMode>
);