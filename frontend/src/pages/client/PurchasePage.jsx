import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMinus, FaPlus, FaLock } from "react-icons/fa";

const PurchasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [qtyS, setQtyS] = useState(0);
  const [qtyV, setQtyV] = useState(0);

  useEffect(() => {
    // CORRECTION : Utilisation de l'URL directe (plus rapide et propre)
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.error("Erreur chargement événement:", err);
      });
  }, [id]);

  const total = event
    ? qtyS * event.price_standard + qtyV * event.price_vip
    : 0;

  // Sécurité écran noir : si l'event n'est pas encore chargé
  if (!event) {
    return (
      <div className="min-vh-100 bg-black text-white d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status"></div>
        <span className="ms-3">Chargement sécurisé...</span>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-black text-white py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 bg-dark p-5 rounded-4 border border-secondary shadow-lg">
            <h2 className="text-center mb-5" style={{ color: "#d4af37" }}>
              <FaLock className="me-2 small" /> Paiement Sécurisé
            </h2>

            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <div className="p-3 bg-black rounded border border-secondary text-center">
                  <h6>STANDARD</h6>
                  <h4 className="text-warning">
                    {event.price_standard?.toLocaleString()} Ar
                  </h4>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setQtyS(Math.max(0, qtyS - 1))}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-4 fw-bold fs-5">{qtyS}</span>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => setQtyS(qtyS + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 bg-black rounded border border-warning text-center">
                  <h6>VIP</h6>
                  <h4 className="text-warning">
                    {event.price_vip?.toLocaleString()} Ar
                  </h4>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setQtyV(Math.max(0, qtyV - 1))}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-4 fw-bold fs-5">{qtyV}</span>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => setQtyV(qtyV + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4 border-top border-secondary">
              <h5 className="opacity-75">Total à régler</h5>
              <h1 className="display-4 fw-bold text-warning mb-4">
                {total.toLocaleString()} Ar
              </h1>
              <button
                className="btn btn-warning w-100 py-3 fw-bold rounded-pill"
                disabled={total === 0}
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      eventId: id,
                      totalPrice: total,
                      qtyS: qtyS,
                      qtyV: qtyV,
                      eventTitle: event.title,
                    },
                  })
                }
              >
                VALIDER L'ACHAT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
