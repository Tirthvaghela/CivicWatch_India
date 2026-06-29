import React from "react";

const EmptyStateIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Empty box */}
    <g transform="translate(85, 50)">
      {/* Box body */}
      <rect x="10" y="50" width="110" height="80" rx="6" fill="#1a237e" opacity="0.06" stroke="#1a237e" strokeWidth="1.5" strokeOpacity="0.1" />
      {/* Box flaps */}
      <path d="M10 50 L0 35 L55 20 L65 35" fill="#1a237e" opacity="0.04" stroke="#1a237e" strokeWidth="1.5" strokeOpacity="0.1" />
      <path d="M65 35 L55 20 L130 20 L120 50" fill="#1a237e" opacity="0.08" stroke="#1a237e" strokeWidth="1.5" strokeOpacity="0.1" />
      
      {/* Question mark */}
      <text x="60" y="105" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#1a237e" opacity="0.12" fontFamily="Poppins, sans-serif">?</text>
    </g>

    {/* Floating elements */}
    <circle cx="70" cy="80" r="8" fill="#FF9933" opacity="0.12" />
    <circle cx="70" cy="80" r="4" fill="#FF9933" opacity="0.2" />
    
    <circle cx="235" cy="65" r="6" fill="#1a237e" opacity="0.08" />
    
    {/* Small document icons floating away */}
    <g transform="translate(60, 120)" opacity="0.15">
      <rect width="18" height="22" rx="3" fill="#1a237e" />
      <rect x="4" y="5" width="10" height="2" rx="1" fill="white" />
      <rect x="4" y="10" width="7" height="2" rx="1" fill="white" />
    </g>
    
    <g transform="translate(220, 95)" opacity="0.1">
      <rect width="18" height="22" rx="3" fill="#FF9933" />
      <rect x="4" y="5" width="10" height="2" rx="1" fill="white" />
      <rect x="4" y="10" width="7" height="2" rx="1" fill="white" />
    </g>

    {/* Search magnifier */}
    <g transform="translate(195, 140)">
      <circle cx="18" cy="18" r="15" stroke="#1a237e" strokeWidth="2" strokeOpacity="0.12" fill="none" />
      <line x1="29" y1="29" x2="40" y2="40" stroke="#1a237e" strokeWidth="2.5" strokeOpacity="0.12" strokeLinecap="round" />
    </g>

    {/* Bottom text area placeholder */}
    <rect x="90" y="195" width="120" height="6" rx="3" fill="#1a237e" opacity="0.08" />
    <rect x="110" y="210" width="80" height="5" rx="2.5" fill="#1a237e" opacity="0.05" />

    {/* Decorative dots */}
    <circle cx="50" cy="180" r="2" fill="#FF9933" opacity="0.2" />
    <circle cx="255" cy="170" r="3" fill="#138808" opacity="0.12" />
    <circle cx="150" cy="40" r="2" fill="#1a237e" opacity="0.1" />
  </svg>
);

export default EmptyStateIllustration;
