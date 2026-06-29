import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import RegisterIllustration from "../components/illustrations/RegisterIllustration";
import { ShieldCheck } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);

      if (res.status === 201) {
        toast.success("Registered successfully! Please login. 🎉");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-poppins relative">
      {/* Tricolor stripe */}
      <div className="tricolor-stripe absolute top-0 left-0 right-0 z-50" />

      {/* LEFT PANEL */}
      <div className="hidden md:flex md:w-1/2 bg-gov-navy relative flex-col items-center justify-between p-12 text-center text-white overflow-hidden min-h-screen">
        {/* Background circle decorative elements */}
        <div className="absolute top-10 right-10 w-36 h-36 border border-white/5 rounded-full" />
        <div className="absolute bottom-10 left-10 w-44 h-44 border border-white/5 rounded-full" />

        <div className="flex items-center gap-2 self-start opacity-75">
          <ShieldCheck size={20} className="text-gov-saffron" />
          <span className="text-white text-xs font-bold tracking-wider">CIVICWATCH.IN</span>
        </div>

        <div className="my-auto z-10">
          <RegisterIllustration className="w-64 mx-auto mb-8 opacity-90" />
          <h2 className="text-3xl font-bold tracking-tight">Join the Movement</h2>
          <p className="text-indigo-200 mt-3 text-xs leading-relaxed max-w-[280px] mx-auto">
            Become a registered citizen and help build a cleaner, safer, and more accountable India.
          </p>
        </div>

        <div className="opacity-30 text-[9px] uppercase tracking-widest">
          National Citizen Mission
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gov-cream bg-structure px-6 py-16 min-h-screen">
        <div className="w-full max-w-md animate-slide-up">
          
          {/* Logo header */}
          <div className="flex items-center gap-2 mb-8 justify-start">
            <div className="w-8 h-8 bg-gov-saffron rounded-lg flex items-center justify-center shadow-md">
              <ShieldCheck size={18} color="white" />
            </div>
            <h1 className="text-gov-navy font-bold text-sm tracking-wider font-poppins">
              CIVICWATCH<span className="text-gov-saffron">.IN</span>
            </h1>
          </div>

          <h2 className="text-3xl font-extrabold text-gov-navy tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 mt-1 text-xs mb-8">
            Register as a citizen to start reporting
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="gov-label text-xs">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="gov-input text-xs"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="gov-label text-xs">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="gov-input text-xs"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="gov-label text-xs">Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="gov-input text-xs"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gov-btn-primary mt-6 text-xs font-bold"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-gov-saffron font-bold cursor-pointer hover:underline"
            >
              Sign in here
            </span>
          </p>

          <div className="mt-12 text-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
              In A Digital India Initiative
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;