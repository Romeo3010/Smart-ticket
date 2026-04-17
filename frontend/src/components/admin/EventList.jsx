import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const EventList = ({ onEdit, onViewDetails }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events"); // URL complète
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (loading)
    return <div className="text-center py-5 text-warning">Chargement...</div>;

  return (
    <div className="table-responsive card bg-dark border-secondary shadow">
      {events.length > 0 ? (
        <table className="table table-dark table-hover align-middle mb-0">
          <thead className="table-light text-dark">
            <tr>
              <th>ÉVÉNEMENT</th>
              <th className="d-none d-md-table-cell">DATE</th>
              <th className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="fw-bold text-warning">{event.title}</td>
                <td className="d-none d-md-table-cell">
                  {new Date(event.date_event).toLocaleDateString("fr-FR")}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => onViewDetails(event)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => onEdit(event)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(event.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center text-secondary">
          Aucun événement trouvé.
        </div>
      )}
    </div>
  );
};

export default EventList;
