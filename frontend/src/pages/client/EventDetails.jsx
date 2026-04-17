import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarDay, FaMapMarkerAlt, FaChevronLeft } from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // On contacte directement l'endpoint spécifique pour cet ID
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setError(true);
      });
  }, [id]);

  if (error)
    return (
      <div className="text-white text-center mt-5">
        ⚠️ Événement introuvable.
      </div>
    );
  if (!event)
    return <div className="text-white text-center mt-5">Chargement...</div>;

  return (
    <div className="min-vh-100 text-white bg-black">
      <div className="container py-5">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-link text-warning mb-4 p-0 text-decoration-none"
        >
          <FaChevronLeft /> Retour
        </button>

        <div className="row g-5">
          <div className="col-lg-7">
            <img
              src={`http://localhost:5000${event.image_url}`}
              className="img-fluid rounded-4 shadow-lg mb-4 border border-secondary"
              alt={event.title}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x400?text=Image+Indisponible")
              }
            />
            <h1 style={{ color: "#d4af37" }} className="display-4 fw-bold mb-3">
              {event.title}
            </h1>
            <p className="lead opacity-75">{event.description}</p>
          </div>

          <div className="col-lg-5">
            <div
              className="p-4 rounded-4 bg-dark border border-warning shadow-lg sticky-top"
              style={{ top: "100px" }}
            >
              <h4 className="text-center mb-4 fw-bold text-uppercase">
                Infos Réservation
              </h4>
              <div className="mb-4 bg-black p-3 rounded">
                <p>
                  <FaCalendarDay className="text-warning me-2" />{" "}
                  {new Date(event.date_event).toLocaleDateString("fr-FR")}
                </p>
                <p>
                  <FaMapMarkerAlt className="text-warning me-2" />{" "}
                  {event.location}
                </p>
              </div>
              <div className="d-flex justify-content-between p-2 border-bottom border-secondary">
                <span>Standard</span>
                <span className="text-warning fw-bold">
                  {event.price_standard} Ar
                </span>
              </div>
              <div className="d-flex justify-content-between p-2 mb-4">
                <span>VIP</span>
                <span className="text-warning fw-bold">
                  {event.price_vip} Ar
                </span>
              </div>
              <button
                className="btn btn-warning w-100 py-3 fw-bold rounded-pill"
                onClick={() => navigate(`/purchase/${event.id}`)}
              >
                RÉSERVER MAINTENANT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
