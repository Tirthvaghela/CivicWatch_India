import React from "react";

const HeroIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* City skyline */}
    <rect x="40" y="180" width="60" height="120" rx="4" fill="#1a237e" opacity="0.15" />
    <rect x="50" y="200" width="12" height="12" rx="2" fill="#FF9933" opacity="0.4" />
    <rect x="70" y="200" width="12" height="12" rx="2" fill="#FF9933" opacity="0.4" />
    <rect x="50" y="220" width="12" height="12" rx="2" fill="#FF9933" opacity="0.3" />
    <rect x="70" y="220" width="12" height="12" rx="2" fill="#FF9933" opacity="0.4" />
    <rect x="50" y="240" width="12" height="12" rx="2" fill="#FF9933" opacity="0.3" />
    <rect x="70" y="240" width="12" height="12" rx="2" fill="#FF9933" opacity="0.3" />

    <rect x="115" y="140" width="50" height="160" rx="4" fill="#1a237e" opacity="0.2" />
    <rect x="125" y="155" width="10" height="10" rx="2" fill="#FF9933" opacity="0.5" />
    <rect x="140" y="155" width="10" height="10" rx="2" fill="#FF9933" opacity="0.4" />
    <rect x="125" y="175" width="10" height="10" rx="2" fill="#FF9933" opacity="0.4" />
    <rect x="140" y="175" width="10" height="10" rx="2" fill="#FF9933" opacity="0.5" />
    <rect x="125" y="195" width="10" height="10" rx="2" fill="#FF9933" opacity="0.3" />
    <rect x="140" y="195" width="10" height="10" rx="2" fill="#FF9933" opacity="0.4" />

    <rect x="180" y="200" width="45" height="100" rx="4" fill="#1a237e" opacity="0.12" />
    <rect x="190" y="215" width="8" height="8" rx="2" fill="#FF9933" opacity="0.4" />
    <rect x="205" y="215" width="8" height="8" rx="2" fill="#FF9933" opacity="0.3" />

    {/* Person with phone reporting */}
    <circle cx="300" cy="195" r="22" fill="#FF9933" />
    <rect x="282" y="220" width="36" height="55" rx="18" fill="#1a237e" />
    <rect x="290" y="275" width="8" height="30" rx="4" fill="#1a237e" />
    <rect x="310" y="275" width="8" height="30" rx="4" fill="#1a237e" />
    
    {/* Phone in hand */}
    <rect x="325" y="230" width="22" height="38" rx="4" fill="#283593" stroke="#FF9933" strokeWidth="2" />
    <circle cx="336" cy="260" r="3" fill="#FF9933" opacity="0.6" />
    <rect x="330" y="236" width="12" height="16" rx="2" fill="#3949ab" />
    
    {/* Arm holding phone */}
    <rect x="318" y="238" width="12" height="6" rx="3" fill="#1a237e" />

    {/* Location pin */}
    <g transform="translate(390, 140)">
      <path d="M20 0C9 0 0 9 0 20c0 15 20 32 20 32s20-17 20-32C40 9 31 0 20 0z" fill="#FF9933" />
      <circle cx="20" cy="18" r="8" fill="white" />
      <circle cx="20" cy="18" r="4" fill="#FF9933" />
    </g>

    {/* Report card floating */}
    <g transform="translate(360, 220)">
      <rect width="70" height="55" rx="8" fill="white" stroke="#1a237e" strokeWidth="1.5" opacity="0.9" />
      <rect x="10" y="10" width="30" height="3" rx="1.5" fill="#1a237e" opacity="0.3" />
      <rect x="10" y="18" width="50" height="3" rx="1.5" fill="#1a237e" opacity="0.2" />
      <rect x="10" y="26" width="40" height="3" rx="1.5" fill="#1a237e" opacity="0.2" />
      <rect x="10" y="38" width="25" height="8" rx="4" fill="#138808" opacity="0.3" />
      <circle cx="55" cy="42" r="4" fill="#FF9933" opacity="0.5" />
    </g>

    {/* Checkmark / resolved icon */}
    <g transform="translate(430, 180)">
      <circle cx="15" cy="15" r="15" fill="#138808" opacity="0.2" />
      <path d="M8 15l5 5 9-10" stroke="#138808" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    {/* Ground line */}
    <line x1="20" y1="300" x2="480" y2="300" stroke="#1a237e" strokeWidth="2" opacity="0.1" />
    
    {/* Trees */}
    <circle cx="250" cy="270" r="18" fill="#138808" opacity="0.15" />
    <rect x="247" y="285" width="6" height="15" rx="3" fill="#138808" opacity="0.2" />
    
    <circle cx="460" cy="275" r="14" fill="#138808" opacity="0.12" />
    <rect x="457" y="287" width="6" height="13" rx="3" fill="#138808" opacity="0.15" />

    {/* Decorative dots */}
    <circle cx="80" cy="130" r="3" fill="#FF9933" opacity="0.3" />
    <circle cx="220" cy="120" r="4" fill="#1a237e" opacity="0.15" />
    <circle cx="450" cy="130" r="3" fill="#138808" opacity="0.25" />
    <circle cx="350" cy="110" r="2" fill="#FF9933" opacity="0.4" />
  </svg>
);

export default HeroIllustration;
