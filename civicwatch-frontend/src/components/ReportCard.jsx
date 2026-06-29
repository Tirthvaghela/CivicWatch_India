import React from "react";
import { User, Star } from "lucide-react";

const ReportCard = ({ report }) => {
  const statusConfig = {
    RESOLVED: { class: "gov-badge-resolved", label: "Resolved", accent: "bg-gov-green" },
    IN_PROGRESS: { class: "gov-badge-progress", label: "In Progress", accent: "bg-gov-navy" },
    PENDING: { class: "gov-badge-pending", label: "Pending", accent: "bg-gov-saffron" },
  };

  const status = statusConfig[report.status] || statusConfig.PENDING;

  return (
    <div className="bento-card p-5 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 animate-slide-up">
      {/* Accent color bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${status.accent}`} />

      {/* Left side details */}
      <div className="flex items-center gap-4 pl-1">
        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
          <img
            src={report.imageUrl || "/civic_banner.png"}
            alt="evidence"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-gov-navy capitalize text-sm font-poppins">
            {report.issueType?.replace("_", " ")}
          </h4>
          <p className="text-[11px] text-gray-500 font-poppins mt-0.5 leading-snug max-w-[400px] line-clamp-2">
            {report.description}
          </p>
          <div className="flex flex-wrap items-center gap-2.5 text-[10px] text-gray-400 mt-2 font-poppins">
            <span className="flex items-center gap-1">
              <User size={10} />
              {report.reportedBy?.name || "Citizen"}
            </span>
            <span>•</span>
            <span className="text-gov-saffron font-semibold flex items-center gap-1">
              <Star size={10} className="fill-gov-saffron text-gov-saffron" />
              {report.credibilityScore || 1} pts
            </span>
            <span>•</span>
            <span>
              {new Date(report.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Right side badge */}
      <div className="shrink-0 pl-1 sm:pl-0">
        <span className={status.class}>
          {status.label}
        </span>
      </div>
    </div>
  );
};

export default ReportCard;