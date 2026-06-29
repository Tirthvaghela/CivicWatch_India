import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import ReportCard from "../components/ReportCard";
import Navbar from "../components/Navbar";
import HeroIllustration from "../components/illustrations/HeroIllustration";
import EmptyStateIllustration from "../components/illustrations/EmptyStateIllustration";
import { Map, CheckCircle, Trophy, Clock, FileText, Search, Megaphone, Award, Star } from "lucide-react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetchReports();
    fetchTop();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/my-reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reports = res.data;
      setReports(reports);
      const total = reports.length;
      const resolved = reports.filter((r) => r.status === "RESOLVED").length;
      const pending = reports.filter((r) => r.status === "PENDING").length;
      setStats({ total, resolved, pending });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTop = async () => {
    try {
      const res = await API.get("/top-contributors");
      setTopUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredReports = reports.filter((r) =>
    r.issueType.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gov-cream bg-structure w-full overflow-x-hidden font-poppins">
      <Navbar />

      {/* ═══ HERO / BANNER ═══ */}
      <div className="bg-gov-navy text-white relative pt-12 pb-24 overflow-hidden">
        {/* Curved backdrop */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left animate-slide-up">
            <span className="inline-block bg-gov-saffron/10 text-gov-saffron text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 font-poppins border border-gov-saffron/20">
              National Citizen Mission
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
              See. Report. <span className="text-gov-saffron">Change.</span>
            </h1>
            <p className="text-indigo-200 mt-4 text-sm md:text-base leading-relaxed font-light">
              Welcome back, <span className="text-white font-semibold">{user?.name || "Citizen"}</span>. Your actions fuel the nation's progress.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              <button
                onClick={() => navigate("/map")}
                className="px-6 py-2.5 rounded-xl border border-white/20 hover:border-white text-white font-semibold text-sm transition-all duration-200 flex items-center gap-2"
              >
                <Map size={16} />
                View Map
              </button>
              <button
                onClick={() => navigate("/create")}
                className="bg-gov-saffron hover:bg-gov-saffron-dark text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                + New Filing
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center animate-fade-in md:justify-end">
            <HeroIllustration className="w-full max-w-sm md:max-w-md" />
          </div>
        </div>

        {/* Wave curve bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="relative block w-full h-[70px]">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,70L1320,70C1200,70,960,70,720,70C480,70,240,70,120,70L0,70Z" fill="#FFF8F0"></path>
          </svg>
        </div>
      </div>

      {/* ═══ STATS CARDS ═══ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col items-center justify-center text-center shadow-gov hover:shadow-gov-hover hover:-translate-y-0.5 transition-all duration-300 animate-slide-up">
            <CheckCircle size={28} className="text-emerald-500 mb-2" />
            <span className="text-3xl font-bold text-gov-navy leading-none">{stats.total}</span>
            <span className="text-gray-400 text-xs mt-2 font-semibold font-poppins">Verified Filings</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col items-center justify-center text-center shadow-gov hover:shadow-gov-hover hover:-translate-y-0.5 transition-all duration-300 animate-slide-up" style={{ animationDelay: '80ms' }}>
            <Trophy size={28} className="text-gov-saffron mb-2" />
            <span className="text-3xl font-bold text-gov-navy leading-none">{stats.resolved}</span>
            <span className="text-gray-400 text-xs mt-2 font-semibold font-poppins">Civic Resolutions</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col items-center justify-center text-center shadow-gov hover:shadow-gov-hover hover:-translate-y-0.5 transition-all duration-300 animate-slide-up" style={{ animationDelay: '160ms' }}>
            <Clock size={28} className="text-amber-500 mb-2" />
            <span className="text-3xl font-bold text-gov-navy leading-none">{stats.pending}</span>
            <span className="text-gray-400 text-xs mt-2 font-semibold font-poppins">Pending Action</span>
          </div>

        </div>
      </div>

      {/* ═══ MY REPORTS SECTION ═══ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        
        {/* Title bar */}
        <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
          <h2 className="text-lg font-bold text-gov-navy flex items-center gap-2 font-poppins">
            <FileText size={18} className="text-gov-navy" />
            My Reports
          </h2>
          <span className="bg-gov-navy/5 text-gov-navy font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gov-navy/10">
            {reports.length} Total
          </span>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md relative">
          <input
            type="text"
            placeholder="Search your reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="gov-input pl-10"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </span>
        </div>

        {/* Content list */}
        {reports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-150 p-12 text-center shadow-gov">
            <EmptyStateIllustration className="w-44 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">No reports filed yet. Start contributing!</p>
            <button
              onClick={() => navigate("/create")}
              className="bg-gov-saffron text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-md hover:bg-gov-saffron-dark mt-4 flex items-center gap-2 mx-auto"
            >
              <Megaphone size={14} />
              File a Cleanliness Report
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-150 p-6 text-center text-gray-400 text-sm">
                No matching reports found
              </div>
            ) : (
              filteredReports.map((report) => (
                <ReportCard key={report._id} report={report} />
              ))
            )}
          </div>
        )}
      </div>

      {/* ═══ TOP CONTRIBUTORS ═══ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14">
        
        {/* Title bar */}
        <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
          <h2 className="text-lg font-bold text-gov-navy flex items-center gap-2 font-poppins">
            <Trophy size={18} className="text-gov-navy" />
            Top Contributors
          </h2>
        </div>

        {/* Leaderboard items */}
        <div className="space-y-3">
          {topUsers.slice(0, 5).map((contributor, index) => {
            const medalColors = {
              0: "text-amber-500 fill-amber-500", // Gold
              1: "text-gray-400 fill-gray-400",   // Silver
              2: "text-amber-700 fill-amber-700", // Bronze
            };
            return (
              <div
                key={contributor._id}
                className="bg-white rounded-2xl border border-gray-150 px-6 py-4 flex items-center justify-between shadow-gov hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg w-6 flex justify-center">
                    {index < 3 ? (
                      <Award size={18} className={medalColors[index]} />
                    ) : (
                      <span className="text-xs font-bold text-gray-400">{index + 1}</span>
                    )}
                  </span>
                  <span className="font-bold text-gov-navy text-sm font-poppins">{contributor.name}</span>
                </div>

                <div className="flex items-center gap-6 text-xs font-semibold">
                  <span className="text-gov-saffron flex items-center gap-1">
                    <Star size={12} className="fill-gov-saffron text-gov-saffron" />
                    {contributor.credibilityScore} pts
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <FileText size={12} />
                    {contributor.reportCount || 0} reports
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slogan */}
      <div className="text-center py-12 bg-white border-t border-gray-100">
        <div className="w-16 h-0.5 bg-gov-saffron mx-auto rounded-full mb-4" />
        <h3 className="text-xl font-extrabold text-gov-navy font-poppins">
          Together We Build Better Cities
        </h3>
        <p className="text-gray-400 mt-2 text-xs leading-relaxed max-w-sm mx-auto">
          Every report contributes to a cleaner, safer and more accountable community.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-gov-navy-dark text-white border-t border-white/5">
        <div className="tricolor-stripe" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <p className="text-center text-indigo-300 text-xs font-light">
            © 2026 CivicWatch India • National Citizen Mission • Digital India Initiative
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;