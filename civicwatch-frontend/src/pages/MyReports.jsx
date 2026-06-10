import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MyReports = () => {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        total: 0,
        resolved: 0,
        pending: 0
    });

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/my-reports", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = res.data;

            setReports(data);

            setStats({
                total: data.length,
                resolved: data.filter(
                    r => r.status === "RESOLVED"
                ).length,
                pending: data.filter(
                    r => r.status === "PENDING"
                ).length
            });

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Back Button */}

                <button
                    onClick={() => navigate("/")}
                    className="
                    flex items-center gap-2
                    text-teal-600
                    font-semibold
                    hover:text-teal-700
                    mb-8
                    "
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>

                {/* Heading */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-gray-900">
                        My Reports
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and track all issues submitted by you
                    </p>

                </div>

                {/* Stats */}

                <div className="flex gap-4 flex-wrap mb-10">

                    <div className="bg-white px-5 py-3 rounded-xl shadow hover:shadow-md transition">
                        📋 {stats.total} Reports
                    </div>

                    <div className="bg-green-100 text-green-700 px-5 py-3 rounded-xl hover:shadow-md transition">
                        ✅ {stats.resolved} Resolved
                    </div>

                    <div className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-xl hover:shadow-md transition">
                        ⏳ {stats.pending} Pending
                    </div>

                </div>

                {/* Cards */}

                {loading ? (
                    <p>Loading...</p>
                ) : reports.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl shadow text-center">
                        No Reports Found
                    </div>
                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {reports.map((report) => (

                            <div
                                key={report._id}
                                className="
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                shadow-md
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                                "
                            >

                                {/* Image */}

                                <img
                                    src={report.imageUrl}
                                    alt=""
                                    className="
                                    w-full
                                    h-56
                                    object-cover
                                    "
                                />

                                {/* Content */}

                                <div className="p-5">

                                    <div className="flex justify-between items-center">

                                        <h2 className="font-bold text-xl text-gray-800">
                                            {report.issueType}
                                        </h2>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                report.status === "RESOLVED"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {report.status}
                                        </span>

                                    </div>

                                    <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                                        {report.description}
                                    </p>

                                    <div className="mt-4 text-sm text-gray-500">

                                        <p>
                                            📅 {new Date(report.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
})}
                                        </p>

                                        {/* {report.location && (
                                            <p className="mt-1">
                                                📍 {report.location.lat?.toFixed(2)},
                                                {" "}
                                                {report.location.lng?.toFixed(2)}
                                            </p>
                                        )} */}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
};

export default MyReports;