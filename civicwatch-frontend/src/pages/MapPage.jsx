import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import API from "../services/api";
import MarkerClusterGroup from "react-leaflet-cluster";
import "../styles/map.css";
import { useNavigate } from "react-router-dom";
import EmptyStateIllustration from "../components/illustrations/EmptyStateIllustration";
import { ArrowLeft, BarChart2, User, Calendar } from "lucide-react";

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const getMarkerIcon = (issueType) => {
  if (issueType === "spitting") return redIcon;
  if (issueType === "garbage") return greenIcon;
  if (issueType === "animal_feeding") return yellowIcon;
  return redIcon;
};

// Helper component to bind Leaflet map instance to ref
const MapInstanceSetter = ({ mapRef }) => {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
};

const MapPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("markers");
  const [filter, setFilter] = useState("ALL");
  const [reports, setReports] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/reports");
        setReports(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (viewMode !== "heatmap") {
      if (mapRef.current && mapRef.current._heatLayer) {
        mapRef.current.removeLayer(mapRef.current._heatLayer);
      }
      return;
    }

    if (!mapRef.current || reports.length === 0) return;

    const heatData = reports
      .map((r) => {
        if (!r.location) return null;
        let lat = null;
        let lng = null;
        if (r.location.latitude && r.location.longitude) {
          lat = r.location.latitude;
          lng = r.location.longitude;
        } else if (r.location.lat && r.location.lng) {
          lat = r.location.lat;
          lng = r.location.lng;
        } else if (r.location.coordinates) {
          lat = r.location.coordinates[1];
          lng = r.location.coordinates[0];
        }
        if (lat === null || lng === null) return null;
        return [parseFloat(lat), parseFloat(lng), 5];
      })
      .filter(Boolean);

    if (mapRef.current._heatLayer) {
      mapRef.current.removeLayer(mapRef.current._heatLayer);
    }

    const heatLayer = L.heatLayer(heatData, {
      radius: 60,
      blur: 30,
      maxZoom: 10,
    });

    heatLayer.addTo(mapRef.current);
    mapRef.current._heatLayer = heatLayer;
  }, [reports, viewMode]);

  const filteredReports =
    filter === "ALL"
      ? reports
      : reports.filter((report) => report.issueType === filter);

  const filterButtons = [
    { key: "ALL", label: "All" },
    { key: "spitting", label: "Spitting" },
    { key: "garbage", label: "Garbage" },
    { key: "animal_feeding", label: "Animal" },
  ];

  return (
    <div className="relative">
      {/* Back button shifted next to Leaflet zoom controls using inline style to ensure no overlap */}
      <div className="absolute top-4 z-[1000]" style={{ left: "64px" }}>
        <button
          onClick={() => navigate("/")}
          className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-gov-lg hover:shadow-gov-hover transition font-bold text-gov-navy text-xs font-poppins border border-gray-200 flex items-center gap-1.5"
        >
          <ArrowLeft size={12} />
          Dashboard
        </button>
      </div>

      {/* Legend Panel */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm shadow-gov-lg rounded-xl p-4 border border-gray-200 max-w-[200px]">
        <p className="font-bold text-gov-navy text-xs font-poppins flex items-center gap-1.5">
          <BarChart2 size={14} className="text-gov-navy" />
          Reports count: {filteredReports.length}
        </p>
        <div className="mt-3 space-y-2 text-[11px] font-semibold text-gray-500 font-poppins">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Spitting</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gov-green" />
            <span>Garbage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gov-saffron" />
            <span>Animal Feeding</span>
          </div>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-1.5 rounded-xl border border-gray-200 flex gap-1 shadow-gov-lg">
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-poppins transition-all ${
              filter === btn.key
                ? "bg-gov-navy text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* View mode toggle */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm p-1.5 rounded-xl border border-gray-200 flex gap-1 shadow-gov-lg">
        <button
          onClick={() => setViewMode("markers")}
          className={`px-4 py-2 rounded-lg text-xs font-bold font-poppins transition-all ${
            viewMode === "markers"
              ? "bg-gov-navy text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          📍 Markers
        </button>
        <button
          onClick={() => setViewMode("heatmap")}
          className={`px-4 py-2 rounded-lg text-xs font-bold font-poppins transition-all ${
            viewMode === "heatmap"
              ? "bg-gov-navy text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          🔥 Heatmap
        </button>
      </div>

      {/* Empty state */}
      {filteredReports.length === 0 && (
        <div className="absolute inset-0 z-[999] flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-gov-lg text-center border border-gray-200 max-w-sm">
            <EmptyStateIllustration className="w-32 mx-auto mb-3 opacity-80" />
            <h2 className="text-base font-bold text-gov-navy font-poppins">No Active Filings</h2>
            <p className="text-gray-400 mt-1 text-xs font-poppins">
              No reports registered for this category in Raipur.
            </p>
          </div>
        </div>
      )}

      <MapContainer
        center={[21.2673, 81.6324]}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
      >
        <MapInstanceSetter mapRef={mapRef} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {viewMode === "markers" && (
          <MarkerClusterGroup>
            {filteredReports.map((report) => (
              <Marker
                key={report._id}
                position={[
                  report.location.latitude,
                  report.location.longitude,
                ]}
                icon={getMarkerIcon(report.issueType)}
              >
                <Popup>
                  <div className="w-56 font-poppins">
                    {report.imageUrl && (
                      <img
                        src={report.imageUrl}
                        alt=""
                        className="w-full h-28 object-cover rounded-lg mb-2 border border-gray-100"
                      />
                    )}
                    <h3 className="font-bold capitalize text-gov-navy text-xs">
                      {report.issueType?.replace("_", " ")}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                      {report.description}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between border-t border-gray-50 pt-2 text-[10px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <User size={10} />
                        {report.reportedBy?.name || "Citizen"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;