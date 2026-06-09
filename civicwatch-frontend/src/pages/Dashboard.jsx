import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import ReportCard from "../components/ReportCard";
import Navbar from "../components/Navbar";
import { Weight } from "lucide-react";

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const [search, setSearch] = useState("");

    const [reports, setReports] = useState([]);

    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        resolved: 0,
        pending: 0,
    });

    const statsData = [
        { label: "✅Verified Filings", value: stats.total },
        { label: "🏆Civic Resolutions", value: stats.resolved },
        { label: "⏳Pending Action", value: stats.pending },
    ];

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/my-reports", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const reports = res.data;
            setReports(reports);

            const total = reports.length;
            const resolved = reports.filter(
                (r) => r.status === "RESOLVED"
            ).length;
            const pending = reports.filter(
                (r) => r.status === "PENDING"
            ).length;

            setStats({ total, resolved, pending });
        } catch (error) {
            console.log(error);
        }
    };

    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const fetchTop = async () => {
            const res = await fetch("http://localhost:5000/api/top-contributors");
            const data = await res.json();
            setTopUsers(data);
        };

        fetchTop();
    }, []);

    const medal = ["🥇", "🥈", "🥉"];

    const filteredReports = reports.filter((r) =>
        r.issueType.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">

            <Navbar search={search} setSearch={setSearch} />

            <div className="max-w-5xl mx-auto px-6 py-12 text-center">

                {/* Hero Section */}
                <div className="text-center mb-8">
                    <p className="text-orange-500 text-xs font-bold tracking-widest">
                        NATIONAL CITIZEN MISSION
                    </p>

                    <h1 className="text-5xl font-extrabold mt-3">
                        <span className="text-black">See. Report. </span>
                        <span className="text-teal-600">Change.</span>
                    </h1>

                    <p className="text-gray-600 mt-3 text-lg">
                        Welcome back, {user?.name || "User"}. Your actions fuel the nation's progress.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={() => navigate("/map")}
                            className="px-6 py-2.5 border border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition font-medium"
                        >
                            View Map
                        </button>

                        <button
                            onClick={() => navigate("/create")}
                            className="px-6 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition shadow-md font-medium"
                        >
                            + New Filing
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300"
                        >
                            <h2 className="text-3xl font-bold text-gray-800">
                                {stat.value}
                            </h2>
                            <p className="text-gray-600 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>



                {/* Reports Section */}
                <br /><br />
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                        My Reports
                    </h2>

                    {reports.length === 0 ? (
                        <p className="text-gray-500 text-center">No reports yet</p>
                    ) : (
                        <div className="grid gap-6 mt-6">
                            <div className="mt-6 space-y-6">
                                {filteredReports.length === 0 ? (
                                    <p>No matching reports found</p>
                                ) : (
                                    filteredReports.map((report) => (
                                        <ReportCard key={report._id} report={report} />
                                    )))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 🏆 TOP CONTRIBUTORS */}
                <div style={{ marginTop: "30px", marginBottom: "20px", padding: "10px 15px" }}>
                    <h3 style={{ marginBottom: "10px", fontWeight: "500px", color: "#0f172a" }}>🏆 Top Contributors</h3>

                    {topUsers.map((user, index) => (
                        <div
                            key={user._id}
                            className="flex justify-between items-center bg-white px-4 py-4 rounded-xl mb-3 shadow-sm
hover:shadow-xl hover:scale-[1.03] hover:bg-teal-50 transition-all duration-300 cursor-pointer"
                        >
                            <span className="font-medium">
                                {index === 0 && "🥇 "}
                                {index === 1 && "🥈 "}
                                {index === 2 && "🥉 "}
                                {user.name}
                            </span>

                            <span style={{ color: "#10b981", fontWeight: "bold" }}>
                                <div style={{
                                    display: "flex",
                                    gap: "12px",
                                    alignItems: "center"
                                }}>
                                    <span style={{
                                        color: "#10b981",
                                        fontWeight: "bold"
                                    }}>
                                        ⭐ {user.credibilityScore} pts
                                    </span>

                                    <span style={{
                                        color: "#64748b",
                                        fontSize: "14px"
                                    }}>
                                        📋 {user.reportCount} reports
                                    </span>
                                </div>
                            </span>
                        </div>
                    ))}
                </div>

            </div>



            {/*Slogan Section*/}
            <div className="text-center py-0">
                <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                    Together We Build Better Cities
                </h3>

                <p className="text-gray-500 mt-2">
                    Every report contributes to a cleaner, safer and more accountable community.
                </p>
            </div>

            {/* Footer */}

            <footer
                style={{
                    marginTop: "60px",
                    backgroundColor: "#0f172a",
                    color: "white",
                    padding: "50px 0 20px",

                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        gap: "30px",
                        padding: "0 60px",
                    }}
                >
                    {/* Brand */}
                    <div>
                        <h2
                            style={{
                                marginBottom: "10px",
                                fontWeight: "700",
                            }}
                        >
                            CIVICWATCH
                            <span style={{ color: "#FF9933" }}>.IN</span>
                        </h2>

                        <p
                            style={{
                                color: "#cbd5e1",
                                maxWidth: "320px",
                                lineHeight: "1.6",
                            }}
                        >
                            Empowering citizens to report issues, improve
                            accountability and build cleaner, safer communities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: "12px" }}>
                            Quick Links
                        </h4>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                color: "#cbd5e1",
                            }}
                        >
                            <span
                                style={{
                                    cursor: "pointer",
                                    transition: "0.3s"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = "#14b8a6";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = "#cbd5e1";
                                }}
                                onClick={() => navigate("/")}
                            >
                                Home
                            </span>

                            <span
                                style={{
                                    cursor: "pointer",
                                    transition: "0.3s"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = "#14b8a6";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = "#cbd5e1";
                                }}
                                onClick={() => navigate("/map")}
                            >
                                Heat Map
                            </span>

                            <span
                                style={{
                                    cursor: "pointer",
                                    transition: "0.3s"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = "#14b8a6";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = "#cbd5e1";
                                }}
                                onClick={() => navigate("/create")}
                            >
                                New Report
                            </span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div>
                        <h4 style={{ marginBottom: "12px" }}>
                            Platform Stats
                        </h4>

                        <p style={{ color: "#cbd5e1" }}>
                            📋 Reports Filed: {stats.total}
                        </p>

                        <p style={{ color: "#cbd5e1" }}>
                            ✅ Resolved: {stats.resolved}
                        </p>

                        <p style={{ color: "#cbd5e1" }}>
                            ⏳ Pending: {stats.pending}
                        </p>
                    </div>
                </div>

                <hr
                    style={{
                        margin: "25px 0 15px",
                        borderColor: "#334155",
                    }}
                />

                <p
                    style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        fontSize: "14px",
                    }}
                >
                    © 2026 CivicWatch India • Digital India Initiative
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;