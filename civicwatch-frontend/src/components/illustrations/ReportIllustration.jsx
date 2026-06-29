import React from "react";

const ReportIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Clipboard */}
    <g transform="translate(120, 20)">
      <rect x="10" y="15" width="140" height="180" rx="10" fill="#1a237e" opacity="0.08" />
      <rect x="50" y="0" width="60" height="22" rx="11" fill="#1a237e" opacity="0.12" />
      <circle cx="80" cy="11" r="5" fill="#FF9933" opacity="0.4" />
      
      {/* Form lines */}
      <rect x="28" y="40" width="60" height="5" rx="2.5" fill="#1a237e" opacity="0.12" />
      <rect x="28" y="55" width="105" height="8" rx="4" fill="#1a237e" opacity="0.06" stroke="#1a237e" strokeWidth="1" strokeOpacity="0.1" />
      
      <rect x="28" y="75" width="50" height="5" rx="2.5" fill="#1a237e" opacity="0.12" />
      <rect x="28" y="90" width="105" height="20" rx="4" fill="#1a237e" opacity="0.06" stroke="#1a237e" strokeWidth="1" strokeOpacity="0.1" />
      
      <rect x="28" y="125" width="45" height="5" rx="2.5" fill="#1a237e" opacity="0.12" />
      <rect x="28" y="140" width="105" height="35" rx="8" fill="#1a237e" opacity="0.04" stroke="#1a237e" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="4 3" />
      
      {/* Camera icon in upload area */}
      <g transform="translate(62, 147)">
        <rect x="0" y="5" width="20" height="15" rx="3" stroke="#1a237e" strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
        <circle cx="10" cy="13" r="4" stroke="#1a237e" strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
        <rect x="6" y="2" width="8" height="5" rx="1" fill="#1a237e" opacity="0.1" />
      </g>
    </g>

    {/* Location pin with pulse */}
    <g transform="translate(310, 60)">
      <circle cx="20" cy="30" r="25" fill="#FF9933" opacity="0.08" />
      <circle cx="20" cy="30" r="18" fill="#FF9933" opacity="0.12" />
      <path d="M20 8C12 8 5 15 5 23c0 11 15 25 15 25s15-14 15-25C35 15 28 8 20 8z" fill="#FF9933" opacity="0.6" />
      <circle cx="20" cy="22" r="5" fill="white" opacity="0.8" />
    </g>

    {/* Image / Evidence card */}
    <g transform="translate(300, 140)">
      <rect width="70" height="55" rx="8" fill="white" stroke="#1a237e" strokeWidth="1.5" strokeOpacity="0.15" />
      <rect x="5" y="5" width="60" height="32" rx="4" fill="#138808" opacity="0.08" />
      {/* Mountain/landscape icon */}
      <polygon points="15,32 30,18 40,28 50,15 60,32" fill="#138808" opacity="0.15" />
      <circle cx="20" cy="15" r="4" fill="#FF9933" opacity="0.3" />
      <rect x="10" y="42" width="30" height="4" rx="2" fill="#1a237e" opacity="0.1" />
    </g>

    {/* Checkmark circle */}
    <g transform="translate(50, 100)">
      <circle cx="22" cy="22" r="22" fill="#138808" opacity="0.1" />
      <path d="M12 22l7 7 13-15" stroke="#138808" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
    </g>

    {/* Arrow connecting elements */}
    <path d="M260 120 C 280 110, 295 100, 310 90" stroke="#FF9933" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="5 4" fill="none" />
    <path d="M260 150 C 280 155, 295 155, 300 160" stroke="#FF9933" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="5 4" fill="none" />

    {/* Ground */}
    <line x1="40" y1="260" x2="360" y2="260" stroke="#1a237e" strokeWidth="2" opacity="0.06" />
    
    {/* Decorative dots */}
    <circle cx="60" cy="50" r="3" fill="#FF9933" opacity="0.2" />
    <circle cx="380" cy="230" r="4" fill="#1a237e" opacity="0.08" />
    <circle cx="40" cy="230" r="3" fill="#138808" opacity="0.15" />
  </svg>
);

export default ReportIllustration;
