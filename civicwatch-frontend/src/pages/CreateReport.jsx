import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateReport = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
        }
    }, []);

    const [loadingLocation, setLoadingLocation] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: null,
        image: null,
    });

    const getLocation = () => {
        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            // ✅ SUCCESS
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setForm(prev => ({
                    ...prev,
                    location: { latitude: lat, longitude: lng }
                }));

                toast.success("Location captured!", {
                    icon: "📍",
                    style: {
                        borderRadius: "14px",
                        background: "#14b8a6",
                        color: "#fff",
                    },
                });
                setLoadingLocation(false);
            },
            (error) => {
                console.log(error);
                toast.error("Unable to fetch location", {
                    icon: "📍",
                    style: {
                        borderRadius: "14px",
                        background: "#14b8a6",
                        color: "#fff",
                    },
                });
                setLoadingLocation(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.location) {
            toast("📍 Please select location first", {
                icon: "📍",
                style: {
                    borderRadius: "14px",
                    background: "#14b8a6",
                    color: "#fff",
                },
            });
            return;
        }

        console.log("Submitting location:", form.location);

        try {
            setLoading(true);


            const data = new FormData();

            data.append("issueType", form.title);
            data.append("description", form.description);
            data.append("location", JSON.stringify(form.location));
            data.append("image", form.image);

            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/api/reports", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            });

            const result = await res.json();

            if (!res.ok) {
                console.log(result);
                toast.error("Failed to submit report", {
                    icon: "📍",
                    style: {
                        borderRadius: "14px",
                        background: "#14b8a6",
                        color: "#fff",
                    },
                });
                setLoading(false);
                return;
            }

            toast.success("🎉 Report submitted successfully!", {
                icon: "📍",
                style: {
                    borderRadius: "14px",
                    background: "#14b8a6",
                    color: "#fff",
                },
            });

            // ✅ Reset form
            setForm({
                title: "",
                description: "",
                location: null,
                image: null,
            });

            // ✅ REDIRECT TO DASHBOARD
            navigate("/");

        } catch (error) {
            console.log(error);
            toast.error("Error submitting report", {
                icon: "📍",
                style: {
                    borderRadius: "14px",
                    background: "#14b8a6",
                    color: "#fff",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-2xl mx-auto text-center mb-8">

                <div className="text-5xl mb-3">🚨</div>

                <h1 className="text-4xl font-bold text-gray-900">
                    Report a Civic Issue
                </h1>

                <p className="text-gray-500 mt-3">
                    Help keep your city cleaner, safer and more accountable.
                </p>
            </div>

            <div className="max-w-2xl mx-auto mb-4">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition"
                >
                    ← Back to Dashboard
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="
bg-white
p-8
rounded-3xl
shadow-lg
border
border-gray-100
w-full
max-w-2xl
mx-auto
"
            >


                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Issue Type
                </label>

                {/* Title */}
                <select
                    className="w-full p-3 border rounded-lg mb-3"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                >
                    <option value="">Select Issue</option>
                    <option value="garbage">Garbage</option>
                    <option value="animal_feeding">Animal-feeding</option>
                    <option value="spitting">Spitting</option>

                </select>

                {/* Description */}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    placeholder="Description"
                    className="w-full p-3 border rounded-lg mb-3"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                    required
                />

                {/* Location Button */}
                <button
                    type="button"
                    onClick={getLocation}
                    className="
w-full
bg-teal-600
text-white
py-3
rounded-xl
hover:bg-teal-700
transition
font-medium
"
                >
                    {loadingLocation ? "Getting location..." : "📍 Use Current Location"}
                </button>

                {/* Show location */}
                {form.location && (
                    <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 mt-3 mb-3">
                        ✅ Location captured successfully
                    </div>
                )}

                {/* Image */}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Evidence
                </label>
                <input
                    type="file"
                    className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4"
                    onChange={(e) =>
                        setForm({ ...form, image: e.target.files[0] })
                    }
                    required
                />
                <br /><br />
                {/* Button */}
                <button
                    type="submit"
                    disabled={loading || !form.location}
                    className="
w-full
bg-teal-600
text-white
py-3
rounded-xl
font-semibold
hover:bg-teal-700
transition
shadow-md
"
                >
                    {loading ? "Submitting..." : "🚀 Submit Report"}
                </button>
            </form>
        </div>
    );
};

export default CreateReport;