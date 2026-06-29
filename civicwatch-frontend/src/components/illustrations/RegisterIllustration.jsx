import React from "react";

const RegisterIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Community circle */}
    <circle cx="200" cy="170" r="100" stroke="white" strokeWidth="2" strokeOpacity="0.1" fill="none" />
    <circle cx="200" cy="170" r="130" stroke="white" strokeWidth="1" strokeOpacity="0.06" fill="none" strokeDasharray="8 8" />

    {/* Center person (main) */}
    <circle cx="200" cy="140" r="24" fill="#FF9933" opacity="0.9" />
    <rect x="180" y="168" width="40" height="45" rx="20" fill="white" opacity="0.2" />

    {/* Person left */}
    <circle cx="120" cy="180" r="16" fill="white" opacity="0.2" />
    <rect x="108" y="200" width="24" height="30" rx="12" fill="white" opacity="0.12" />

    {/* Person right */}
    <circle cx="280" cy="180" r="16" fill="white" opacity="0.2" />
    <rect x="268" y="200" width="24" height="30" rx="12" fill="white" opacity="0.12" />

    {/* Person top */}
    <circle cx="200" cy="85" r="14" fill="white" opacity="0.15" />
    <rect x="190" y="102" width="20" height="25" rx="10" fill="white" opacity="0.1" />

    {/* Plus / Join icon */}
    <g transform="translate(155, 250)">
      <circle cx="45" cy="30" r="28" fill="white" opacity="0.1" stroke="#FF9933" strokeWidth="2" strokeOpacity="0.4" />
      <rect x="37" y="18" width="16" height="24" rx="2" fill="#FF9933" opacity="0.5" />
      <rect x="33" y="26" width="24" height="8" rx="2" fill="#FF9933" opacity="0.5" />
    </g>

    {/* ID Card */}
    <g transform="translate(260, 260)">
      <rect width="80" height="55" rx="8" fill="white" opacity="0.1" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
      <circle cx="25" cy="22" r="10" fill="white" opacity="0.15" />
      <rect x="42" y="15" width="28" height="4" rx="2" fill="white" opacity="0.2" />
      <rect x="42" y="24" width="20" height="3" rx="1.5" fill="white" opacity="0.12" />
      <rect x="10" y="40" width="60" height="4" rx="2" fill="#FF9933" opacity="0.25" />
    </g>

    {/* Handshake lines */}
    <path d="M140 195 L160 185" stroke="white" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 3" />
    <path d="M260 195 L240 185" stroke="white" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 3" />

    {/* Decorative elements */}
    <circle cx="60" cy="100" r="4" fill="#FF9933" opacity="0.2" />
    <circle cx="340" cy="120" r="6" fill="white" opacity="0.1" />
    <circle cx="50" cy="300" r="5" fill="white" opacity="0.08" />
    <circle cx="350" cy="80" r="3" fill="#FF9933" opacity="0.25" />
    
    {/* Stars */}
    <g transform="translate(310, 290)" opacity="0.15">
      <polygon points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6" fill="white" />
    </g>
    <g transform="translate(70, 250)" opacity="0.12">
      <polygon points="6,0 7.5,4.5 12,4.5 8.5,7.5 10,12 6,9 2,12 3.5,7.5 0,4.5 4.5,4.5" fill="white" />
    </g>
  </svg>
);

export default RegisterIllustration;
