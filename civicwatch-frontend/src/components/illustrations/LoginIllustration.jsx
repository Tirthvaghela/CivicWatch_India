import React from "react";

const LoginIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield / Security badge */}
    <g transform="translate(120, 50)">
      <path d="M80 0L160 30V90C160 145 125 175 80 195C35 175 0 145 0 90V30L80 0Z" fill="white" opacity="0.1" />
      <path d="M80 15L145 40V90C145 135 115 160 80 178C45 160 15 135 15 90V40L80 15Z" fill="white" opacity="0.08" />
      {/* Checkmark inside shield */}
      <path d="M55 95L75 115L110 75" stroke="#FF9933" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    {/* Person */}
    <circle cx="200" cy="220" r="28" fill="#FF9933" opacity="0.9" />
    <rect x="175" y="252" width="50" height="60" rx="25" fill="white" opacity="0.2" />
    
    {/* Laptop / Form */}
    <g transform="translate(130, 290)">
      <rect width="140" height="85" rx="8" fill="white" opacity="0.12" />
      <rect x="10" y="12" width="60" height="6" rx="3" fill="white" opacity="0.15" />
      <rect x="10" y="26" width="120" height="8" rx="4" fill="white" opacity="0.08" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
      <rect x="10" y="42" width="120" height="8" rx="4" fill="white" opacity="0.08" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
      <rect x="10" y="60" width="50" height="14" rx="7" fill="#FF9933" opacity="0.4" />
    </g>

    {/* Key icon */}
    <g transform="translate(290, 180)">
      <circle cx="20" cy="20" r="16" stroke="white" strokeWidth="3" strokeOpacity="0.25" fill="none" />
      <rect x="32" y="16" width="30" height="8" rx="4" fill="white" opacity="0.2" />
      <rect x="50" y="24" width="8" height="10" rx="2" fill="white" opacity="0.15" />
    </g>

    {/* Lock icon */}
    <g transform="translate(80, 260)">
      <rect x="5" y="15" width="30" height="22" rx="4" fill="white" opacity="0.12" />
      <path d="M10 15V10C10 4 14 0 20 0S30 4 30 10V15" stroke="white" strokeWidth="2.5" strokeOpacity="0.2" fill="none" />
      <circle cx="20" cy="27" r="3" fill="#FF9933" opacity="0.4" />
    </g>

    {/* Decorative circles */}
    <circle cx="320" cy="100" r="6" fill="#FF9933" opacity="0.2" />
    <circle cx="80" cy="120" r="4" fill="white" opacity="0.15" />
    <circle cx="340" cy="300" r="8" fill="white" opacity="0.08" />
    <circle cx="60" cy="350" r="5" fill="#FF9933" opacity="0.15" />
    
    {/* Dots pattern */}
    <circle cx="350" cy="150" r="2" fill="white" opacity="0.2" />
    <circle cx="365" cy="150" r="2" fill="white" opacity="0.2" />
    <circle cx="350" cy="165" r="2" fill="white" opacity="0.2" />
    <circle cx="365" cy="165" r="2" fill="white" opacity="0.2" />
  </svg>
);

export default LoginIllustration;
