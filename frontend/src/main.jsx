import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// 1. Import du CSS de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// 2. IMPORT CRUCIAL : Le JavaScript de Bootstrap (pour le menu mobile)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// 3. FontAwesome pour tes icônes
import "@fortawesome/fontawesome-free/css/all.min.css";
// 4. Ton CSS personnalisé (toujours en dernier pour pouvoir écraser Bootstrap)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
