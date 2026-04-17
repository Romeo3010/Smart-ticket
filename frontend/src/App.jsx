import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Imports des pages Client
import Home from "./pages/client/Home";
import EventDetails from "./pages/client/EventDetails";
import PurchasePage from "./pages/client/PurchasePage";
import AllEvents from "./pages/client/AllEvents";
import CheckoutPage from "./pages/client/CheckoutPage";

// Imports des pages Admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

// IMPORT DU GARDIEN
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PARTIE CLIENT (VITRINE) --- */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/purchase/:id" element={<PurchasePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* --- PARTIE ADMIN --- */}
        <Route path="/admin-login" element={<Login />} />

        {/* Dashboard protégé : On utilise le composant ProtectedRoute.
          C'est lui qui décidera s'il affiche le Dashboard ou s'il 
          redirige vers /admin-login AVANT que la route "*" ne s'active.
        */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirection automatique UNIQUEMENT si l'URL ne correspond à rien du tout */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
