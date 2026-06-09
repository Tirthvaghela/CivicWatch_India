import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import API from "../services/api";
import { useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "../styles/map.css";
import { useNavigate } from "react-router-dom";


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

function FitBounds({ reports }) {
  const map = useMap();

  useEffect(() => {
    if (reports.length === 0) return;

    const bounds = reports.map((r) => [
      r.location.latitude,
      r.location.longitude,
    ]);

    map.fitBounds(bounds);
  }, [reports, map]);

  return null;
}

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
        console.log("REPORTS:", res.data);

        res.data.forEach(report => {
          console.log(
            report.issueType,
            report.location?.latitude,
            report.location?.longitude
          );
        });

        setReports(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {

    if (viewMode !== "heatmap") {

      if (
        mapRef.current &&
        mapRef.current._heatLayer
      ) {
        mapRef.current.removeLayer(
          mapRef.current._heatLayer
        );
      }

      return;
    }


    if (!mapRef.current || reports.length === 0) return;

    // 🔥 FIX: handle ALL possible formats
    const heatData = reports
      .map((r) => {
        if (!r.location) return null;

        let lat = null;
        let lng = null;

        // Case 1: latitude / longitude
        if (r.location.latitude && r.location.longitude) {
          lat = r.location.latitude;
          lng = r.location.longitude;
        }

        // Case 2: lat / lng
        else if (r.location.lat && r.location.lng) {
          lat = r.location.lat;
          lng = r.location.lng;
        }

        // Case 3: GeoJSON [lng, lat]
        else if (r.location.coordinates) {
          lat = r.location.coordinates[1];
          lng = r.location.coordinates[0];
        }

        if (lat === null || lng === null) return null;

        return [parseFloat(lat), parseFloat(lng), 5]; // 🔥 increased intensity
      })
      .filter(Boolean);

    console.log("FINAL HEAT DATA:", heatData);
    console.log("HEAT DATA:", heatData);

    if (mapRef.current._heatLayer) {
      mapRef.current.removeLayer(mapRef.current._heatLayer);
    }

    const heatLayer = L.heatLayer(heatData, {
      radius: 60,
      blur: 30,
      maxZoom: 10,
    });

    if (heatData.length < 3) {
      heatData.push([23.25, 77.41, 10]);
    }

    heatLayer.addTo(mapRef.current);
    mapRef.current._heatLayer = heatLayer;

  }, [reports, viewMode]);

  const filteredReports =
    filter === "ALL"
      ? reports
      : reports.filter(
        (report) => report.issueType === filter
      );

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-[1000]">

        <button
          onClick={() => navigate("/")}
          className="
    bg-white
    px-4
    py-2
    rounded-xl
    shadow-lg
    hover:bg-gray-100
    transition
    font-medium
    relative
    left-9
    "
        >
          ← Dashboard
        </button>

      </div>
      <div className="absolute bottom-4 left-4 z-[1000] bg-white shadow-lg rounded-xl p-4">

        <p className="font-medium text-gray-700">
          📊 Showing {filteredReports.length} Reports
        </p>
        <hr />
        <h3 className="font-semibold mb-3">
          Issue Types
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>Spitting</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>Garbage</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span>Animal Feeding</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-xl shadow-lg flex gap-2">

        <button
          onClick={() => setFilter("ALL")}
          className="px-3 py-1 rounded bg-gray-200"
        >
          All
        </button>

        <button
          onClick={() => setFilter("spitting")}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          Spitting
        </button>

        <button
          onClick={() => setFilter("garbage")}
          className="px-3 py-1 rounded bg-green-500 text-white"
        >
          Garbage
        </button>

        <button
          onClick={() => setFilter("animal_feeding")}
          className="px-3 py-1 rounded bg-yellow-500 text-white"
        >
          Animal
        </button>

      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white p-2 rounded-xl shadow-lg flex gap-2">

        <button
          onClick={() => setViewMode("markers")}
          className={`px-4 py-2 rounded-lg ${viewMode === "markers"
            ? "bg-teal-600 text-white"
            : "bg-gray-100"
            }`}
        >
          📍 Markers
        </button>

        <button
          onClick={() => setViewMode("heatmap")}
          className={`px-4 py-2 rounded-lg ${viewMode === "heatmap"
            ? "bg-orange-500 text-white"
            : "bg-gray-100"
            }`}
        >
          🔥 Heatmap
        </button>

      </div>

      {filteredReports.length === 0 && (
        <div
          className="
    absolute
    inset-0
    z-[999]
    flex
    items-center
    justify-center
    "
        >
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">

            <div className="text-5xl mb-3">
              📭
            </div>

            <h2 className="text-xl font-bold">
              No Reports Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing the filter or create a new report.
            </p>

          </div>
        </div>
      )}

      <MapContainer
        center={[21.2673, 81.6324]}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        {/* <FitBounds reports={reports} /> */}
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
                  <div className="w-60">

                    <img
                      src={report.imageUrl}
                      alt={report.issueType}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />

                    <h3 className="font-bold capitalize">
                      {report.issueType}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {report.description}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      👤 {report.reportedBy?.name}
                    </p>

                    <div className="mt-2">
                      <span
                        className={
                          report.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs"
                            : report.status === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                              : "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                        }
                      >
                        {report.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      📅 {new Date(report.createdAt).toLocaleDateString()}
                    </p>

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