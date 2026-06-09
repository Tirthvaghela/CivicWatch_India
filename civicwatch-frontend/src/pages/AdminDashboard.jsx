import React, { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
        fetchUsers();
    }, []);

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const fetchUsers = async () => {
        try {
            const res = await API.get("/users");
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const totalUsers = users.length;

    const totalReports = reports.length;

    const pendingReports = reports.filter(
        (r) => r.status === "PENDING"
    ).length;

    const resolvedReports = reports.filter(
        (r) => r.status === "RESOLVED"
    ).length;

    const inProgressReports = reports.filter(
        (r) => r.status === "IN_PROGRESS"
    ).length;

    const fetchReports = async () => {
        try {
            const res = await API.get("/reports");
            setReports(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.patch(
                `/reports/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            fetchReports();

            toast.success(
                `Status updated to ${status}`
            );
        } catch (error) {
            console.log("UPDATE ERROR:", error);
        }
    };

    const deleteReport = async (id) => {

        const confirmDelete = await Swal.fire({
            title: "Delete Report",
            text: "Are you sure you want to delete this report?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (!confirmDelete.isConfirmed) return;

        try {

            await API.delete(`/reports/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.success("Report deleted");

            fetchReports();

        } catch (error) {
            console.log(error);

            toast.error("Delete failed");
        }
    };

    const filteredReports = reports.filter((report) => {

        const matchesSearch =
            report.issueType
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL"
                ? true
                : report.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mb-10">
                <h1 className="text-5xl font-bold text-slate-900">
                    🛡️ Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage reports, users and city issue resolutions.
                </p>
            </div>

            <button
                onClick={() => navigate("/")}
                className="bg-white px-5 py-3 rounded-xl shadow hover:shadow-md"
            >
                ← Back to Dashboard
            </button>
            <br />
            <br />


            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8 ">

                <div
                    onClick={() => setStatusFilter("ALL")}
                    className="
    bg-white
    p-5
    rounded-2xl
    shadow
    bg-gradient-to-r
    from-indigo-50
    to-indigo-100
    cursor-pointer
    hover:scale-105
    transition
    "
                >
                    <h3 className="text-gray-500">Total Reports</h3>
                    <p className="text-3xl font-bold">{totalReports}</p>
                </div>

                <div
                    onClick={() => setStatusFilter("PENDING")}
                    className="
    bg-white
    p-5
    rounded-2xl
    shadow
    bg-gradient-to-r
    from-yellow-50
    to-yellow-100
    cursor-pointer
    hover:scale-105
    transition
    "
                >
                    <h3 className="text-gray-500">Pending</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                        {pendingReports}
                    </p>
                </div>

                <div
                    onClick={() => setStatusFilter("IN_PROGRESS")}
                    className="
    bg-white
    p-5
    rounded-2xl
    shadow
    bg-gradient-to-r
    from-blue-50
    to-blue-100
    cursor-pointer
    hover:scale-105
    transition
    "
                >
                    <h3 className="text-gray-500">In Progress</h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {inProgressReports}
                    </p>
                </div>

                <div
                    onClick={() => setStatusFilter("RESOLVED")}
                    className="
    bg-white
    p-5
    rounded-2xl
    shadow
    bg-gradient-to-r
    from-green-50
    to-green-100
    cursor-pointer
    hover:scale-105
    transition
    "
                >
                    <h3 className="text-gray-500">Resolved</h3>
                    <p className="text-3xl font-bold text-green-600">
                        {resolvedReports}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow bg-gradient-to-r from-purple-50 to-purple-100 hover:shadow-lg transition">
                    <h3 className="text-gray-500">
                        Total Users
                    </h3>

                    <p className="text-3xl font-bold text-purple-600">
                        {totalUsers}
                    </p>
                </div>

            </div>

            {/* <div className="flex flex-wrap gap-4 mb-8">

                <button
                    onClick={() => setStatusFilter("ALL")}
                    className="
        px-5 py-3
        bg-slate-800
        text-white
        rounded-xl
        hover:bg-slate-900
        transition
        "
                >
                    📋 All Reports
                </button>

                <button
                    onClick={() => setStatusFilter("PENDING")}
                    className="
        px-5 py-3
        bg-yellow-500
        text-white
        rounded-xl
        hover:bg-yellow-600
        transition
        "
                >
                    ⏳ Pending
                </button>

                <button
                    onClick={() => setStatusFilter("IN_PROGRESS")}
                    className="
        px-5 py-3
        bg-blue-500
        text-white
        rounded-xl
        hover:bg-blue-600
        transition
        "
                >
                    🔨 In Progress
                </button>

                <button
                    onClick={() => setStatusFilter("RESOLVED")}
                    className="
        px-5 py-3
        bg-green-500
        text-white
        rounded-xl
        hover:bg-green-600
        transition
        "
                >
                    ✅ Resolved
                </button>

            </div> */}


            <h2 className="text-2xl font-bold mb-4">
                🧑‍💼 User Management
            </h2>
            <div className="bg-white rounded-2xl shadow p-6 mb-8">

                <h2 className="text-2xl font-bold mb-4">
                    👥 Users
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3">Name</th>
                                <th className="text-left py-3">Email</th>
                                <th className="text-left py-3">Role</th>
                                <th className="text-left py-3">Credibility</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3">
                                        {user.name}
                                    </td>

                                    <td className="py-3">
                                        {user.email}
                                    </td>

                                    <td className="py-3">
                                        {user.role === "admin" ? (
                                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                                🟣Admin
                                            </span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                                ⚪User
                                            </span>
                                        )}
                                    </td>

                                    <td className="py-3">
                                        ⭐ {user.credibilityScore || 1}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="🔍 Search reports..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
        px-4
        py-3
        border
        rounded-xl
        w-full
        md:w-96
        "
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="
        px-4
        py-3
        border
        rounded-xl
        bg-white
        "
                >
                    <option value="ALL">
                        All Reports
                    </option>

                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="IN_PROGRESS">
                        In Progress
                    </option>

                    <option value="RESOLVED">
                        Resolved
                    </option>
                </select>

            </div>
            <div className="flex items-center justify-between mb-4 mt-10">

                <h2 className="text-2xl font-bold">
                    📋 Reports Management
                </h2>

                <span className="
    bg-slate-100
    text-slate-700
    px-4 py-2
    rounded-full
    text-sm
    font-medium
    ">
                    {filteredReports.length} Reports
                </span>

            </div>
            <div className="space-y-5">
                {filteredReports.map((report) => (
                    <div
                        key={report._id}
                        className="bg-white p-6 rounded-2xl shadow border border-gray-100 hover:shadow-lg transition"
                    >
                        <div className="flex items-start justify-between gap-6">

                            {/* Image */}
                            {report.imageUrl && (
                                <img
                                    src={report.imageUrl}
                                    alt="report"
                                    className="w-36 h-36 object-cover rounded-xl flex-shrink-0"
                                />
                            )}

                            {/* Content */}
                            <div className="flex-1">

                                <h3 className="text-2xl font-bold text-slate-800 capitalize">
                                    {report.issueType}
                                </h3>

                                <p className="text-gray-600 mt-2">
                                    {report.description}
                                </p>

                                <p className="text-sm text-gray-500 mt-3">
                                    👤 {report.reportedBy?.name}
                                </p>

                                <div className="mt-4">
                                    <select
                                        value={report.status}
                                        onChange={(e) =>
                                            updateStatus(report._id, e.target.value)
                                        }
                                        className="
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-2
                            bg-white
                            font-medium
                            "
                                    >
                                        <option value="PENDING">
                                            Pending
                                        </option>

                                        <option value="IN_PROGRESS">
                                            In Progress
                                        </option>

                                        <option value="RESOLVED">
                                            Resolved
                                        </option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => deleteReport(report._id)}
                                    className="
    mt-3
    bg-red-500
    hover:bg-red-600
    text-white
    px-4
    py-2
    rounded-lg
    transition
    "
                                >
                                    🗑 Delete
                                </button>

                            </div>

                            {/* Status Badge */}
                            <div className="flex-shrink-0">

                                {report.status === "PENDING" && (
                                    <span className="
                        bg-yellow-100
                        text-yellow-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        ">
                                        Pending
                                    </span>
                                )}

                                {report.status === "IN_PROGRESS" && (
                                    <span className="
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        ">
                                        In Progress
                                    </span>
                                )}

                                {report.status === "RESOLVED" && (
                                    <span className="
                        bg-green-100
                        text-green-700
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        ">
                                        Resolved
                                    </span>
                                )}

                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminDashboard;