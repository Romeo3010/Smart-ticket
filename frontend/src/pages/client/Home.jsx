import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const Home = () => {
  // Initialisation avec un tableau vide pour éviter "events.map is not a function"
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Ton IP locale
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((res) => {
        // On vérifie que la réponse est bien un tableau avant de faire le slice
        if (res.data && Array.isArray(res.data)) {
          setEvents(res.data.slice(0, 3));
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Erreur de connexion au serveur:", err);
        setEvents([]); // Sécurité en cas de serveur éteint
      });
  }, []);

  return (
    <div className="bg-black min-vh-100 text-white">
      <Navbar />

      {/* Hero Section */}
      <header
        className="py-5 text-center shadow-lg"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85))",
        }}
      >
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3 text-white">
            L'EXCELLENCE DE LA{" "}
            <span style={{ color: "#d4af37" }}>BILLETTERIE</span>
          </h1>
          <p className="lead mb-4 text-white-50">
            Réservez vos places pour les plus grands événements à Madagascar.
          </p>
          <Link
            to="/events"
            className="btn btn-warning btn-lg px-5 fw-bold rounded-pill shadow"
          >
            VOIR TOUT
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-5 pt-4">
        <h2 className="mb-5 border-start border-warning border-4 ps-3 fw-bold text-white">
          À L'AFFICHE
        </h2>

        <div className="row g-4">
          {/* On vérifie si events est un tableau et s'il n'est pas vide */}
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="col-md-4">
                <div className="card h-100 bg-dark border-secondary shadow-lg border-hover overflow-hidden">
                  <div className="position-relative">
                    <img
                      // Construction de l'URL complète pour l'image
                      src={`${API_BASE_URL}${event.image_url}`}
                      className="card-img-top"
                      style={{ height: "260px", objectFit: "cover" }}
                      alt={event.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x260?text=Image+Indisponible";
                      }}
                    />
                  </div>

                  <div className="card-body p-4">
                    <h4 className="fw-bold text-white mb-3 text-uppercase">
                      {event.title}
                    </h4>
                    <div className="mb-4">
                      <p className="text-white-50 small mb-1">
                        <FaCalendarAlt className="text-warning me-2" />{" "}
                        {event.date_event
                          ? new Date(event.date_event).toLocaleDateString(
                              "fr-FR",
                            )
                          : "Date à venir"}
                      </p>
                      <p className="text-white-50 small text-truncate">
                        <FaMapMarkerAlt className="text-warning me-2" />{" "}
                        {event.location || "Lieu non défini"}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3">
                      <span className="fs-4 fw-bold text-warning">
                        {parseFloat(event.price_standard).toLocaleString()} Ar
                      </span>
                      <button
                        className="btn btn-outline-warning rounded-pill px-4 btn-sm fw-bold"
                        onClick={() => navigate(`/event/${event.id}`)}
                      >
                        Détails <FaArrowRight className="ms-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Message affiché pendant le chargement ou si la liste est vide
            <div className="col-12 text-center py-5">
              <div
                className="spinner-border text-warning mb-3"
                role="status"
              ></div>
              <p className="text-white-50">
                Recherche des meilleurs événements...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
