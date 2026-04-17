import React from "react";

const AdminEventDetails = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="card bg-white text-dark shadow-lg overflow-hidden border-0">
      <div className="card-header bg-dark text-warning d-flex justify-content-between align-items-center py-3">
        <h4 className="m-0 fw-bold">DÉTAILS TECHNIQUES : {event.title}</h4>
        <button
          className="btn-close btn-close-white"
          onClick={onClose}
        ></button>
      </div>
      <div className="card-body p-4">
        <div className="row g-4">
          <div className="col-lg-4 text-center">
            <div
              className="rounded border bg-light p-2"
              style={{ height: "250px" }}
            >
              {event.image_url ? (
                <img
                  src={`http://localhost:5000${event.image_url}`}
                  alt="Affiche"
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                  Pas d'affiche
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-8">
            <h6 className="text-uppercase fw-bold text-secondary small mb-2">
              Description
            </h6>
            <p className="p-3 bg-light rounded border mb-4">
              {event.description || "Aucune description."}
            </p>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 border rounded border-primary bg-light text-center">
                  <span className="d-block fw-bold text-primary small">
                    STANDARD
                  </span>
                  <div className="fs-3 fw-bold">{event.price_standard} Ar</div>
                  <small className="text-muted">
                    En stock : {event.stock_standard}
                  </small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded border-warning bg-light text-center">
                  <span className="d-block fw-bold text-warning small">
                    VIP
                  </span>
                  <div className="fs-3 fw-bold">{event.price_vip} Ar</div>
                  <small className="text-muted">
                    En stock : {event.stock_vip}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetails;
