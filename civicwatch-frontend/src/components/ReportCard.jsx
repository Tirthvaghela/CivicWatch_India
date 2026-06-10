import React from "react";

const ReportCard = ({ report }) => {
  return (
    <div className=" flex bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden p-4 gap-6 w-full max-w-4xl mx-auto">

      {/* IMAGE */}
      <img
        src={report.imageUrl || "https://via.placeholder.com/200"}
        alt="report"
        className="w-40 h-40 rounded-xl object-cover"
      />

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1">

        {/* TOP */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 capitalize">
            {report.issueType}
          </h3>

          <p className="text-gray-500 mt-1">
            {report.description}
          </p>

          <p style={{ fontSize: "12px", color: "#64748b" }}>
            👤 {report.reportedBy?.name || "Anonymous"}
          </p>

          <p style={{ fontSize: "12px", color: "#10b981" }}>
            ⭐ Credibility: {report.reportedBy?.credibilityScore || 1}
          </p>

          {/* META */}
          <div className="flex items-center gap-6 text-sm text-gray-400 mt-3">
            <span>📍 {report.location?.latitude?.toFixed(2)}, {report.location?.longitude?.toFixed(2)}</span>
            <span>🕒 {new Date(report.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}</span>
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-3">
          <span
            className={`px-4 py-1 text-sm font-medium rounded-full ${report.status === "RESOLVED"
              ? "bg-green-100 text-green-700"
              : report.status === "IN_PROGRESS"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {report.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;