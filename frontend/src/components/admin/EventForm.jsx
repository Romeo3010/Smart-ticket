import React, { useState } from "react";
import axios from "axios";

const EventForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_event: "",
    location: "",
    price_standard: "",
    price_vip: "",
    stock_standard: "",
    stock_vip: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "number" ? Math.max(0, parseInt(value) || 0) : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const preventMinus = (e) => {
    if (e.key === "-" || e.key === "+") e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Ajout des données textuelles
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    // Ajout de l'image si elle existe
    if (image) data.append("image", image);

    try {
      // CORRECTION : Ajout de http:// devant localhost
      await axios.post("http://localhost:5000/api/events", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Événement publié avec succès !");
      onSuccess(); // Recharge la liste des événements
    } catch (err) {
      console.error("Détails de l'erreur :", err);
      alert(
        "Erreur lors de l'envoi : " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ backgroundColor: "#1a1d21", color: "#fff", minHeight: "100vh" }}
    >
      <div
        className="card shadow-sm border-0"
        style={{ backgroundColor: "#212529" }}
      >
        <div
          className="card-header border-bottom border-secondary py-3"
          style={{ backgroundColor: "#212529" }}
        >
          <h4 className="m-0 fw-bold" style={{ color: "#ffc107" }}>
            NOUVEL ÉVÉNEMENT
          </h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4 text-start">
              {/* SECTION GAUCHE */}
              <div className="col-12 col-lg-7">
                <label className="fw-bold small text-secondary mb-1">
                  TITRE
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control mb-3 bg-dark text-white border-secondary"
                  onChange={handleChange}
                  required
                />

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="fw-bold small text-secondary mb-1">
                      DATE / HEURE
                    </label>
                    <input
                      type="datetime-local"
                      name="date_event"
                      className="form-control bg-dark text-white border-secondary"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-bold small text-secondary mb-1">
                      LIEU
                    </label>
                    <input
                      type="text"
                      name="location"
                      className="form-control bg-dark text-white border-secondary"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <label className="fw-bold small text-secondary mt-3 mb-1">
                  DESCRIPTION DE L'ÉVÉNEMENT
                </label>
                <textarea
                  name="description"
                  rows="6"
                  className="form-control bg-dark text-white border-secondary"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* SECTION DROITE */}
              <div className="col-12 col-lg-5">
                <div
                  className="p-3 rounded mb-4"
                  style={{
                    backgroundColor: "#16191c",
                    border: "1px solid #343a40",
                  }}
                >
                  <h6 className="fw-bold mb-3" style={{ color: "#0dcaf0" }}>
                    BILLETTERIE
                  </h6>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="small text-secondary">
                        PRIX STD (Ar)
                      </label>
                      <input
                        type="number"
                        name="price_standard"
                        onKeyDown={preventMinus}
                        className="form-control bg-dark text-white border-info"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="small text-secondary">STOCK STD</label>
                      <input
                        type="number"
                        name="stock_standard"
                        onKeyDown={preventMinus}
                        className="form-control bg-dark text-white border-info"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="small text-secondary">
                        PRIX VIP (Ar)
                      </label>
                      <input
                        type="number"
                        name="price_vip"
                        onKeyDown={preventMinus}
                        className="form-control bg-dark text-white border-warning"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="small text-secondary">STOCK VIP</label>
                      <input
                        type="number"
                        name="stock_vip"
                        onKeyDown={preventMinus}
                        className="form-control bg-dark text-white border-warning"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="fw-bold small text-secondary mb-2">
                    AFFICHE / PHOTO
                  </label>
                  <div
                    className="border border-secondary rounded mb-2 bg-dark d-flex align-items-center justify-content-center"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt="Aperçu"
                      />
                    ) : (
                      <span className="text-muted small">
                        Aucun fichier choisi
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    className="form-control bg-dark text-white border-secondary"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top border-secondary text-end">
              <button type="submit" className="btn btn-warning fw-bold px-5">
                PUBLIER L'ÉVÉNEMENT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
