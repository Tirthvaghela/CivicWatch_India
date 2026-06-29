import React, { useState } from "react";
import { ShieldCheck, Menu, X, LayoutDashboard, ShieldAlert, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <>
      {/* Tricolor Stripe */}
      <div className="tricolor-stripe" />

      <nav className="bg-gov-navy border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LEFT: Branding */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 bg-gov-saffron rounded-lg flex items-center justify-center shadow-md">
                <ShieldCheck size={20} color="white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base tracking-tight font-poppins">
                  CIVICWATCH<span className="text-gov-saffron">.IN</span>
                </h1>
                <p className="text-[9px] text-gray-300 font-medium tracking-wider uppercase leading-none mt-0.5">
                  Digital India Initiative
                </p>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* RIGHT: Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {token ? (
                <>
                  <button
                    onClick={() => navigate("/")}
                    className="text-gray-300 hover:text-white text-xs font-semibold tracking-wide transition-colors font-poppins uppercase flex items-center gap-1.5"
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </button>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="text-gray-300 hover:text-white text-xs font-semibold tracking-wide transition-colors font-poppins uppercase flex items-center gap-1.5"
                    >
                      <ShieldAlert size={14} />
                      Admin Panel
                    </button>
                  )}

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="w-8 h-8 rounded-full bg-gov-saffron text-white font-bold flex items-center justify-center hover:scale-105 transition-transform text-xs font-poppins"
                    >
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </button>

                    {showMenu && (
                      <div className="absolute top-10 right-0 bg-white rounded-xl p-1.5 min-w-[180px] shadow-gov-lg border border-gray-150 animate-fade-in z-50">
                        <div className="px-3 py-2 border-b border-gray-100 mb-1">
                          <p className="font-semibold text-gov-navy text-xs font-poppins leading-tight">{user?.name}</p>
                          <p className="text-[10px] text-gray-400 font-poppins mt-0.5">{user?.email}</p>
                        </div>

                        <button
                          onClick={() => { navigate("/my-reports"); setShowMenu(false); }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gov-cream transition font-poppins flex items-center gap-2"
                        >
                          <FileText size={14} />
                          My Reports
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition font-poppins flex items-center gap-2"
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-300 hover:text-white text-xs font-semibold tracking-wide transition-colors font-poppins uppercase"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-gov-saffron hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-xs transition shadow-sm font-poppins uppercase"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-gov-navy-light border-t border-white/5 px-6 py-4 space-y-2 animate-fade-in">
            {token ? (
              <>
                <button onClick={() => { navigate("/"); setMobileOpen(false); }} className="w-full text-left text-gray-200 py-2 px-3 rounded-lg hover:bg-white/5 transition font-poppins text-xs font-semibold uppercase flex items-center gap-2">
                  <LayoutDashboard size={14} />
                  Dashboard
                </button>
                {user?.role === "admin" && (
                  <button onClick={() => { navigate("/admin"); setMobileOpen(false); }} className="w-full text-left text-gray-200 py-2 px-3 rounded-lg hover:bg-white/5 transition font-poppins text-xs font-semibold uppercase flex items-center gap-2">
                    <ShieldAlert size={14} />
                    Admin Panel
                  </button>
                )}
                <button onClick={() => { navigate("/my-reports"); setMobileOpen(false); }} className="w-full text-left text-gray-200 py-2 px-3 rounded-lg hover:bg-white/5 transition font-poppins text-xs font-semibold uppercase flex items-center gap-2">
                  <FileText size={14} />
                  My Reports
                </button>
                <button onClick={handleLogout} className="w-full text-left text-red-300 py-2 px-3 rounded-lg hover:bg-red-900/10 transition font-poppins text-xs font-semibold uppercase flex items-center gap-2">
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate("/login"); setMobileOpen(false); }} className="w-full text-left text-gray-200 py-2 px-3 rounded-lg hover:bg-white/5 transition font-poppins text-xs font-semibold uppercase">Login</button>
                <button onClick={() => { navigate("/register"); setMobileOpen(false); }} className="w-full bg-gov-saffron text-white py-2 px-3 rounded-lg font-semibold transition font-poppins text-xs text-center uppercase">Register</button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;