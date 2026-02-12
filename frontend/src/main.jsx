import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChatProvider from "./context/ChatProvider.jsx";

const theme = createTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ChatProvider>    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ChatProvider>
    </BrowserRouter>
  </StrictMode>
);
