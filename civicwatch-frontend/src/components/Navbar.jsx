import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ search, setSearch }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    

    const [showMenu, setShowMenu] = useState(false);


    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav
            style={{
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 30px",
                borderBottom: "1px solid #eee",
                backgroundColor: "white",
            }}
        >
            {/* LEFT: Logo */}
            <div
                style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                onClick={() => navigate("/")}
            >
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#008080",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ShieldCheck color="#FF9933" />
                </div>

                <div>
                    <h2 style={{ margin: 0, color: "#0f172a", fontWeight: "bold", letterSpacing: "1px" }}>
                        CIVICWATCH<span style={{ color: "#FF9933" }}>.IN</span>
                    </h2>
                    <p style={{ fontSize: "10px", color: "gray", margin: 0 }}>
                        Digital India Initiative
                    </p>
                </div>
            </div>

            {/* CENTER: Search
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f1f5f9",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    width: "250px",
                }}
            >
                <Search size={16} color="gray" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        marginLeft: "10px",
                        width: "100%",
                    }}
                />
            </div> */}

            {/* RIGHT SIDE */}
            <div className="cursor-pointer hover:text-gray-700 transition" style={{ display: "flex", alignItems: "center", gap: "20px" }}>


                {/* 🔥 AUTH LOGIC */}
                {token ? (
                    <>
                        {/* New Report Button */}
                        <button
                            onClick={() => navigate("/create")}
                            className="
    bg-gradient-to-r
    from-teal-500
    to-teal-700
    text-white
    px-5
    py-2.5
    rounded-xl
    font-semibold
    shadow-md
    hover:shadow-xl
    hover:-translate-y-0.5
    transition-all
    duration-300
  "
                        >
                            📢 Report Issue
                        </button>

                        {user?.role === "admin" && (
                            <button
                                onClick={() => navigate("/admin")}
                                className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
                            >
                                Admin Panel
                            </button>
                        )}

                        {/* Profile */}
                        <div
                            onClick={() => setShowMenu(!showMenu)}
                            className="
w-12 h-12
rounded-full
bg-gradient-to-r
from-teal-500
to-teal-700
shadow-md
text-white
font-bold
flex
items-center
justify-center
hover:scale-110
transition
"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#008080",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                position: "relative"
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                            {showMenu && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "45px",
                                        right: 0,
                                        background: "white",
                                        borderRadius: "10px",
                                        padding: "10px",
                                        minWidth: "155px",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                        zIndex: 1000,
                                        color: "#000"
                                    }}
                                >
                                    <div
                                        style={{
                                            borderBottom: "1px solid #eee",
                                            marginBottom: "8px",
                                            paddingBottom: "8px",
                                            fontWeight: "bold",
                                            color: "#0f172a"
                                        }}
                                    >
                                        {user?.name}
                                    </div>
                                    <div
                                        style={{
                                            padding: "10px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#f0fdfa";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                        onClick={() => navigate("/")}
                                    >
                                        👤 Profile
                                    </div>

                                    <div
                                        style={{
                                            padding: "10px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#f0fdfa";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                        onClick={() => navigate("/")}
                                    >
                                        📋 My Reports
                                    </div>

                                    <div
                                        style={{
                                            padding: "10px",
                                            borderRadius: "8px",
                                            cursor: "pointer"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#f0fdfa";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                        onClick={handleLogout}
                                    >
                                        🚪 Logout
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Logout
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-700 cursor-pointer transition"
                        // style={{
                        //     background: "none",
                        //     border: "none",
                        //     color: "red",
                        //     cursor: "pointer",
                        // }}
                        >
                            Logout
                        </button> */}
                    </>
                ) : (
                    <>
                        {/* Login */}
                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#0f172a",
                                fontWeight: "500",
                            }}
                        >
                            Login
                        </button>

                        {/* Register */}
                        <button
                            onClick={() => navigate("/register")}
                            style={{
                                backgroundColor: "#008080",
                                color: "white",
                                border: "none",
                                padding: "8px 14px",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;