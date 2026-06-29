import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { ArrowLeft, MapPin, Camera, CheckCircle, Loader2 } from "lucide-react";

const CreateReport = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, []);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: null,
    image: null,
  });

  const getLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setForm(prev => ({
          ...prev,
          location: { latitude: lat, longitude: lng }
        }));
        toast.success("Location captured!");
        setLoadingLocation(false);
      },
      (error) => {
        console.log(error);
        toast.error("Unable to fetch location. Please enable GPS.");
        setLoadingLocation(false);
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.location) {
      toast("Please capture your location first");
      return;
    }

    if (!form.image) {
      toast("Please upload evidence image");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("issueType", form.title);
      data.append("description", form.description);
      data.append("location", JSON.stringify(form.location));
      data.append("image", form.image);

      const token = localStorage.getItem("token");
      await API.post("/reports", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Report submitted successfully!");
      setForm({ title: "", description: "", location: null, image: null });
      setImagePreview(null);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error submitting report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gov-cream bg-structure font-poppins">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gov-navy text-white relative pt-12 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-gov-saffron/10 text-gov-saffron text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-3 font-poppins border border-gov-saffron/20">
              Citizen Filing
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Report a Civic Issue
            </h1>
            <p className="text-indigo-200 mt-2 text-xs md:text-sm font-light">
              Help keep your city cleaner, safer and more accountable.
            </p>
          </div>
        </div>
        
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="relative block w-full h-[60px]">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,70L1320,70C1200,70,960,70,720,70C480,70,240,70,120,70L0,70Z" fill="#FFF8F0"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-16 -mt-10 relative z-20">
        
        {/* Back link */}
        <div className="mb-6 flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="text-indigo-200 hover:text-white hover:scale-105 transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 space-y-6 shadow-gov">

          {/* Issue Type */}
          <div>
            <label className="gov-label text-xs">Issue Type</label>
            <select
              className="gov-input text-xs"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            >
              <option value="">Select Issue Type</option>
              <option value="garbage">Garbage Dumping</option>
              <option value="animal_feeding">Animal Feeding Violation</option>
              <option value="spitting">Spitting</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="gov-label text-xs">Description</label>
            <textarea
              placeholder="Describe the issue in detail..."
              className="gov-input text-xs min-h-[120px] resize-y"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="gov-label text-xs">Location</label>
            <button
              type="button"
              onClick={getLocation}
              disabled={loadingLocation}
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                form.location
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-gov-navy hover:bg-gov-navy-light text-white shadow-md"
              }`}
            >
              {loadingLocation ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Capturing GPS coordinates...
                </>
              ) : form.location ? (
                <>
                  <CheckCircle size={14} className="text-emerald-700" />
                  Location captured ({form.location.latitude.toFixed(4)}, {form.location.longitude.toFixed(4)})
                </>
              ) : (
                <>
                  <MapPin size={14} />
                  Capture Current Location
                </>
              )}
            </button>
          </div>

          {/* Image Upload */}
          <div>
            <label className="gov-label text-xs">Upload Evidence</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gov-saffron transition-colors cursor-pointer bg-white"
              onClick={() => document.getElementById("file-input").click()}
            >
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full max-h-48 object-cover rounded-lg mx-auto"
                  />
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Change Image</p>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center justify-center">
                  <Camera size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Select photo evidence
                  </p>
                  <p className="text-[10px] text-gray-300 mt-1">
                    JPG or PNG formats
                  </p>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !form.location}
            className="gov-btn-primary w-full py-3 text-xs font-bold uppercase tracking-wider mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting Report..." : "Submit Official Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReport;