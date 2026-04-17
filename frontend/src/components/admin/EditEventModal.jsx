import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEventModal = ({ event, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date_event: "",
    description: "",
    price_standard: 0,
    price_vip: 0,
    stock_standard: 0,
    stock_vip: 0,
  });

  // Chargement des données de l'événement au montage
  useEffect(() => {
    if (event) {
      // On formatte la date pour l'input type datetime-local (YYYY-MM-DDTHH:mm)
      const dateFormatted = event.date_event
        ? new Date(event.date_event).toISOString().substring(0, 16)
        : "";
      setFormData({ ...event, date_event: dateFormatted });
    }
  }, [event]);

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Si c'est un nombre, on s'assure qu'il n'est pas négatif
    const finalValue =
      type === "number" ? Math.max(0, parseInt(value) || 0) : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ URL avec http://
      await axios.put(`http://localhost:5000/api/events/${event.id}`, formData);
      alert("Modifications enregistrées avec succès !");
      onSuccess(); // Rafraîchit la liste et ferme le modal
    } catch (err) {
      console.error(err);
      alert(
        "Erreur lors de la mise à jour : " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div
      className="modal-custom-overlay d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        padding: "15px",
      }}
    >
      <div
        className="bg-white rounded shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: "700px", color: "#333" }}
      >
        <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0 fw-bold">Modifier l'événement</h4>
          <button
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <div className="row g-3">
            {/* Titre */}
            <div className="col-12">
              <label className="form-label small fw-bold">
                NOM DE L'ÉVÉNEMENT
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Lieu et Date */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">LIEU</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">DATE ET HEURE</label>
              <input
                type="datetime-local"
                name="date_event"
                className="form-control"
                value={formData.date_event}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label small fw-bold">DESCRIPTION</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Tarifs et Stocks */}
            <div className="col-md-6">
              <div className="p-3 border rounded bg-light">
                <h6 className="fw-bold text-primary mb-3">Secteur Standard</h6>
                <div className="mb-2">
                  <label className="small">Prix (Ar)</label>
                  <input
                    type="number"
                    name="price_standard"
                    className="form-control"
                    value={formData.price_standard}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="small">Stock Billets</label>
                  <input
                    type="number"
                    name="stock_standard"
                    className="form-control"
                    value={formData.stock_standard}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 border rounded bg-light border-warning">
                <h6 className="fw-bold text-warning mb-3">Secteur VIP</h6>
                <div className="mb-2">
                  <label className="small">Prix (Ar)</label>
                  <input
                    type="number"
                    name="price_vip"
                    className="form-control"
                    value={formData.price_vip}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="small">Stock Billets</label>
                  <input
                    type="number"
                    name="stock_vip"
                    className="form-control"
                    value={formData.stock_vip}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="text-end mt-4 pt-3 border-top">
            <button
              type="button"
              className="btn btn-light border me-2 px-4"
              onClick={onClose}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary px-5 fw-bold">
              ENREGISTRER LES MODIFICATIONS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
