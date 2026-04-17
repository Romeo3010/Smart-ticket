import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo-neon.jpg"; // Vérifie bien le chemin vers ton logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark border-bottom border-warning">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center fw-bold"
          to="/"
          style={{ color: "#d4af37" }}
        >
          <img
            src={logo}
            alt="Logo"
            width="40"
            className="me-2 rounded-circle border border-warning"
          />
          SMART TICKET
        </Link>

        {/* Bouton Hamburger */}
        <button
          className="navbar-toggler border-warning text-warning"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Liens */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                ACCUEIL
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/events"
                onClick={() => setIsOpen(false)}
              >
                ÉVÉNEMENTS
              </Link>
            </li>
          </ul>
          <Link
            to="/admin-login"
            className="btn btn-outline-warning btn-sm px-4 rounded-pill"
            onClick={() => setIsOpen(false)}
          >
            ADMIN
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
