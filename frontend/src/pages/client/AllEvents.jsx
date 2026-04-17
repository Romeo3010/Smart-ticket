import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const AllEvents = () => {
  // CORRECTION 1 : Toujours initialiser avec un tableau vide []
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        // CORRECTION 2 : Vérifier que la réponse est bien un tableau
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement événements:", err);
        setEvents([]); // En cas d'erreur, on garde un tableau vide
      })
      .finally(() => setLoading(false));
  }, []);

  // CORRECTION 3 : Sécurisation du filter avec l'opérateur optionnel ?.
  const filteredEvents = (events || []).filter(
    (e) =>
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-black min-vh-100 text-white">
      <Navbar />
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white">
            TOUS NOS <span style={{ color: "#d4af37" }}>ÉVÉNEMENTS</span>
          </h1>
          <div className="row justify-content-center mt-4">
            <div className="col-md-6 position-relative">
              <FaSearch
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                style={{ color: "#d4af37", zIndex: 10 }}
              />
              <input
                type="text"
                className="form-control form-control-lg bg-dark text-white border-warning ps-5 rounded-pill shadow-sm"
                placeholder="Rechercher un artiste, un lieu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: "1rem" }}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="col-md-4 col-lg-3">
                  <div className="card bg-dark border-secondary h-100 shadow border-hover overflow-hidden">
                    <img
                      src={`http://localhost:5000${event.image_url}`}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                      alt={event.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x180?text=No+Image";
                      }}
                    />
                    <div className="card-body p-3 d-flex flex-column">
                      <h6 className="fw-bold text-white text-uppercase text-truncate mb-3">
                        {event.title}
                      </h6>
                      <div className="mb-3">
                        <p className="small text-white-50 mb-1 d-flex align-items-center">
                          <FaCalendarAlt
                            className="me-2"
                            style={{ color: "#d4af37" }}
                          />
                          {new Date(event.date_event).toLocaleDateString(
                            "fr-FR",
                          )}
                        </p>
                        <p className="small text-white-50 mb-1 d-flex align-items-center text-truncate">
                          <FaMapMarkerAlt
                            className="me-2"
                            style={{ color: "#d4af37" }}
                          />
                          {event.location}
                        </p>
                        <p className="small text-warning mb-0 mt-2">
                          Places : {event.stock_standard} Std /{" "}
                          {event.stock_vip} VIP
                        </p>
                      </div>
                      <div className="mt-auto d-flex justify-content-between align-items-center border-top border-secondary pt-3">
                        <span
                          className="fw-bold"
                          style={{ color: "#d4af37", fontSize: "1.1rem" }}
                        >
                          {Number(event.price_standard).toLocaleString()} Ar
                        </span>
                        <button
                          className="btn btn-warning btn-sm fw-bold px-3 rounded-pill"
                          onClick={() => navigate(`/event/${event.id}`)}
                        >
                          DÉTAILS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">
                  Aucun événement trouvé pour "{search}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        .border-hover:hover {
          border-color: #d4af37 !important;
          transform: translateY(-5px);
          transition: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default AllEvents;
