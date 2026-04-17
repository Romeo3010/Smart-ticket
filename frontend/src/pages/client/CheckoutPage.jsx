import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // AJOUT DE AXIOS
import Navbar from "../../components/Navbar";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
  });

  if (!state) {
    return (
      <div className="bg-black min-vh-100 text-white d-flex flex-column align-items-center justify-content-center">
        <h3>Aucune réservation en cours</h3>
        <button
          className="btn btn-warning mt-3"
          onClick={() => navigate("/events")}
        >
          Retour aux événements
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // CONNEXION RÉELLE AU BACKEND
    try {
      const payload = {
        ...formData,
        ...state, // Contient eventId, eventTitle, totalPrice, qtyS, qtyV
      };

      const res = await axios.post("localhost:5000/api/reservations", payload);

      if (res.data.success) {
        alert("Félicitations ! Votre billet PDF a été envoyé par email.");
        navigate("/");
      }
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Une erreur est survenue lors de la réservation.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-vh-100 text-white">
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="bg-dark p-4 rounded-4 border border-secondary shadow-lg">
              <h2 className="text-center mb-4" style={{ color: "#d4af37" }}>
                FINALISER MA RÉSERVATION
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white-50 small text-uppercase">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    className="form-control bg-black text-white border-secondary"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white-50 small text-uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-black text-white border-secondary"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-white-50 small text-uppercase">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="form-control bg-black text-white border-secondary"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, telephone: e.target.value })
                    }
                  />
                </div>
                <div className="bg-black p-3 rounded border border-warning mb-4 text-center">
                  <h5 className="text-white-50 mb-1">Total à payer</h5>
                  <h3 className="text-warning">
                    {state.totalPrice.toLocaleString()} Ar
                  </h3>
                </div>
                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold py-3 rounded-pill"
                  disabled={loading}
                >
                  {loading ? "GÉNÉRATION DU BILLET..." : "CONFIRMER L'ACHAT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
