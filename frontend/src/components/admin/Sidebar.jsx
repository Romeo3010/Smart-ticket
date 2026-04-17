import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-neon.jpg";
import Swal from "sweetalert2";

const Sidebar = ({ setView, activeView }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen(false);
    Swal.fire({
      title: "Déconnexion ?",
      text: "Voulez-vous vraiment quitter la session administrateur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d4af37",
      cancelButtonColor: "#333",
      confirmButtonText: "Oui, déconnexion",
      background: "#1a1a1a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken"); // Correction de la clé
        localStorage.removeItem("adminName");
        navigate("/admin-login");
      }
    });
  };

  return (
    <>
      <button
        className="btn btn-dark d-lg-none position-fixed top-0 start-0 m-3 z-3"
        onClick={() => setIsOpen(!isOpen)}
        style={{ borderColor: "#d4af37" }}
      >
        <i
          className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}
          style={{ color: "#d4af37" }}
        ></i>
      </button>

      <div
        className="bg-dark border-end border-secondary position-fixed h-100 p-4 z-2"
        style={{
          width: "280px",
          left: isOpen ? "0" : "-280px",
          transition: "0.3s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="d-flex align-items-center mb-5 mt-4 mt-lg-0">
          <img
            src={logo}
            alt="Logo"
            width="40"
            className="rounded-circle me-3 border border-warning"
          />
          <h4 className="text-white mb-0 fw-bold">
            SMART <span style={{ color: "#d4af37" }}>TICKET</span>
          </h4>
        </div>

        <nav className="nav flex-column gap-2 flex-grow-1">
          <button
            className={`btn text-start py-3 border-0 ${activeView === "list" ? "bg-warning text-dark fw-bold" : "text-secondary"}`}
            onClick={() => {
              setView("list");
              setIsOpen(false);
            }}
          >
            <i className="fas fa-th-list me-3"></i> Événements
          </button>
          <button
            className={`btn text-start py-3 border-0 ${activeView === "add" ? "bg-warning text-dark fw-bold" : "text-secondary"}`}
            onClick={() => {
              setView("add");
              setIsOpen(false);
            }}
          >
            <i className="fas fa-plus-circle me-3"></i> Nouveau
          </button>
        </nav>

        <button
          className="btn btn-outline-danger w-100 py-3 fw-bold"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt me-2"></i> DÉCONNEXION
        </button>
      </div>

      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50 z-1 d-lg-none"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <style>{`@media (min-width: 992px) { .bg-dark { left: 0 !important; } }`}</style>
    </>
  );
};

export default Sidebar;
