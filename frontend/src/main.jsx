import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import App from "./App";

import { Toaster } from 'react-hot-toast';

import "./tailwind.css";
import "./index.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Toaster position="top-right" toastOptions={{ style: { background: '#1f2937', color: '#fff' } }} />
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
