import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateReport from "./pages/CreateReport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapPage from "./pages/MapPage";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import MyReports from "./pages/MyReports";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a237e",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px 20px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            border: "1px solid rgba(255, 153, 51, 0.3)",
            boxShadow: "0 8px 32px rgba(26, 35, 126, 0.25)",
          },
          success: {
            iconTheme: {
              primary: "#FF9933",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="min-h-screen bg-gov-cream font-poppins">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateReport />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/map" element={<MapPage />} />
            <Route
              path="/admin"
              element={<AdminRoute>
                <AdminDashboard />
              </AdminRoute>}
            />
            <Route path="/my-reports" element={<MyReports />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;