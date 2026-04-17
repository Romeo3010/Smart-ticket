import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // CORRECTION 1 : Utilisez "adminToken" pour correspondre à votre Login.jsx
  const token = localStorage.getItem("adminToken");

  // Si le token n'existe pas, on redirige vers l'URL exacte du login admin
  if (!token) {
    // CORRECTION 2 : Utilisez "/admin-login" car c'est le chemin défini dans App.js
    return <Navigate to="/admin-login" replace />;
  }

  // Si le token existe, on affiche la page demandée (le Dashboard)
  return children;
};

export default ProtectedRoute;
