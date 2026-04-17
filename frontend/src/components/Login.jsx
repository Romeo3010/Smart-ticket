import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Ajout d'un état de chargement
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        // IMPORTANT : Utiliser "adminToken" pour correspondre à ProtectedRoute et App.js
        localStorage.setItem("adminToken", res.data.token);
        // Optionnel : stocker le nom de l'admin pour l'afficher sur le dashboard
        localStorage.setItem("adminName", res.data.username || "Admin");

        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Identifiants incorrects ou erreur serveur",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "400px",
          backgroundColor: "#1e1e1e",
          borderRadius: "20px",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            width="100"
            className="rounded-circle mb-3 border border-warning shadow"
          />
          <h3 className="text-white fw-bold">Espace Admin</h3>
          <p className="text-white-50 small">Veuillez vous identifier</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary py-2"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-warning w-100 fw-bold py-2 rounded-pill"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
