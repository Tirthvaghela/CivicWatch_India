import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmptyStateIllustration from "../components/illustrations/EmptyStateIllustration";
import { ArrowLeft, FileText, CheckCircle, Clock, Loader2, MapPin, Calendar } from "lucide-react";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/my-reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setReports(data);
      setStats({
        total: data.length,
        resolved: data.filter((r) => r.status === "RESOLVED").length,
        pending: data.filter((r) => r.status === "PENDING").length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gov-cream bg-structure font-poppins pb-16">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gov-navy text-white relative pt-12 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <span className="inline-block bg-gov-saffron/10 text-gov-saffron text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-3 font-poppins border border-gov-saffron/20">
            Citizen Filings
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            My Reports
          </h1>
          <p className="text-indigo-200 mt-2 text-xs md:text-sm font-light">
            Monitor and track status of issues reported by you.
          </p>
        </div>
        
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="relative block w-full h-[60px]">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,70L1320,70C1200,70,960,70,720,70C480,70,240,70,120,70L0,70Z" fill="#FFF8F0"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-10 relative z-20">

        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="text-indigo-200 hover:text-white hover:scale-105 transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
          >
            <ArrowLeft size={12} />
            Back to Dashboard
          </button>
        </div>

        {/* Stats Summary */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="bg-white rounded-xl border border-gray-150 px-5 py-3 flex items-center gap-2 shadow-gov text-gov-navy">
            <FileText size={14} />
            <span className="font-bold text-xs uppercase tracking-wide">{stats.total} Reports</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-150 px-5 py-3 flex items-center gap-2 shadow-gov text-emerald-700">
            <CheckCircle size={14} />
            <span className="font-bold text-xs uppercase tracking-wide">{stats.resolved} Resolved</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-150 px-5 py-3 flex items-center gap-2 shadow-gov text-amber-700">
            <Clock size={14} />
            <span className="font-bold text-xs uppercase tracking-wide">{stats.pending} Pending</span>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-150 p-12 text-center shadow-gov flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-gov-navy mb-2" size={24} />
            <p className="text-gray-400 text-xs font-semibold">Loading your filings...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-150 p-12 text-center flex flex-col items-center justify-center shadow-gov">
            <EmptyStateIllustration className="w-40 mx-auto mb-4 opacity-75" />
            <h3 className="text-lg font-bold text-gov-navy">No Reports Registered</h3>
            <p className="text-gray-400 mt-1 text-xs">Start helping build a cleaner, safer city.</p>
            <button
              onClick={() => navigate("/create")}
              className="bg-gov-saffron text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md hover:bg-gov-saffron-dark mt-4 uppercase tracking-wider"
            >
              File a Report
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => {
              const statusConfig = {
                RESOLVED: { class: "gov-badge-resolved", label: "Resolved", accent: "bg-gov-green" },
                IN_PROGRESS: { class: "gov-badge-progress", label: "In Progress", accent: "bg-gov-navy" },
                PENDING: { class: "gov-badge-pending", label: "Pending", accent: "bg-gov-saffron" },
              };
              const status = statusConfig[report.status] || statusConfig.PENDING;

              return (
                <div
                  key={report._id}
                  className="bg-white rounded-2xl border border-gray-150 overflow-hidden flex flex-col justify-between h-[280px] shadow-gov hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="h-36 relative overflow-hidden bg-gray-100 border-b border-gray-50">
                    <img
                      src={report.imageUrl || "/civic_banner.png"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={status.class}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between relative">
                    {/* Indicator bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${status.accent}`} />
                    
                    <div className="pl-2">
                      <h3 className="font-bold text-gov-navy capitalize text-sm">
                        {report.issueType?.replace("_", " ")}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {report.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pl-2 mt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} />
                        {report.location?.latitude?.toFixed(3)}, {report.location?.longitude?.toFixed(3)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(report.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;