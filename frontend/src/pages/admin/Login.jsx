import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-neon.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // CORRECTION : Ajout de http:// devant localhost
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        // Stockage du token pour ProtectedRoute
        localStorage.setItem("adminToken", res.data.token);

        if (res.data.username) {
          localStorage.setItem("adminName", res.data.username);
        }

        // Redirection
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Erreur login:", err);
      // Message plus précis si le serveur est éteint
      const errorMsg = err.response
        ? err.response.data.message
        : "Le serveur ne répond pas. Vérifiez que node server.js est lancé.";

      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#000" }}
    >
      <div
        className="form-container shadow-lg p-5"
        style={{
          width: "450px",
          backgroundColor: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: "25px",
        }}
      >
        <div className="text-center mb-5">
          <img
            src={logo}
            alt="Smart Ticket"
            width="100"
            height="100"
            className="rounded-circle mb-3 border border-info shadow-sm"
            style={{ objectFit: "cover" }}
          />
          <h2 className="text-white fw-bold">
            ADMIN<span style={{ color: "#FFD700" }}>ISTRATION</span>
          </h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-secondary small fw-bold mb-2 d-block">
              EMAIL PROFESSIONNEL
            </label>
            <input
              type="email"
              className="form-control bg-transparent text-white border-secondary py-2"
              placeholder="admin@pme.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-5">
            <label className="text-secondary small fw-bold mb-2 d-block">
              MOT DE PASSE
            </label>
            <input
              type="password"
              className="form-control bg-transparent text-white border-secondary py-2"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-outline-warning w-100 py-3 fw-bold shadow-sm"
            style={{ borderRadius: "10px", transition: "0.3s" }}
          >
            {loading ? "Vérification..." : "ENTRER DANS LE SYSTÈME"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
