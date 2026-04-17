import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import EventList from "../../components/admin/EventList";
import EventForm from "../../components/admin/EventForm";
import EditEventModal from "../../components/admin/EditEventModal";
import AdminEventDetails from "../../components/admin/AdminEventDetails";

const Dashboard = () => {
  const [view, setView] = useState("list"); // 'list', 'add', 'view'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fonction pour rafraîchir la liste après action
  const refreshList = () => {
    setView("list");
    setSelectedEvent(null);
  };

  return (
    <div className="d-flex bg-black min-vh-100 text-white">
      <Sidebar setView={setView} activeView={view} />

      <main
        className="flex-grow-1 p-3 p-lg-5"
        style={{ marginLeft: "auto", maxWidth: "100%" }}
      >
        <div className="container-fluid mt-4 mt-lg-0">
          {/* VUE : LISTE DES ÉVÉNEMENTS */}
          {view === "list" && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">
                  Gestion des <span className="text-warning">Événements</span>
                </h2>
                <button
                  className="btn btn-warning fw-bold d-none d-md-block"
                  onClick={() => setView("add")}
                >
                  + Nouvel Événement
                </button>
              </div>
              <EventList
                onEdit={(event) => {
                  setSelectedEvent(event);
                  setIsEditModalOpen(true);
                }}
                onViewDetails={(event) => {
                  setSelectedEvent(event);
                  setView("view");
                }}
              />
            </>
          )}

          {/* VUE : AJOUTER UN ÉVÉNEMENT */}
          {view === "add" && (
            <div>
              <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => setView("list")}
              >
                ← Retour
              </button>
              <EventForm onSuccess={refreshList} />
            </div>
          )}

          {/* VUE : DÉTAILS TECHNIQUES (ADMIN SEULEMENT) */}
          {view === "view" && (
            <div>
              <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => setView("list")}
              >
                ← Retour à la liste
              </button>
              <AdminEventDetails
                event={selectedEvent}
                onClose={() => setView("list")}
              />
            </div>
          )}

          {/* MODAL DE MODIFICATION */}
          {isEditModalOpen && (
            <EditEventModal
              event={selectedEvent}
              onClose={() => setIsEditModalOpen(false)}
              onSuccess={() => {
                setIsEditModalOpen(false);
                refreshList();
              }}
            />
          )}
        </div>
      </main>

      <style>{`
        @media (min-width: 992px) { main { margin-left: 280px !important; } }
      `}</style>
    </div>
  );
};

export default Dashboard;
