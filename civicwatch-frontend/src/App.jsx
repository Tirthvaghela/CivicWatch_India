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
            background: "#0f172a",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
          },
        }}
      />



      <div className="min-h-screen bg-gray-100">
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