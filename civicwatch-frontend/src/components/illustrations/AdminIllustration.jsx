import React from "react";

const AdminIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Glow */}
    <circle cx="250" cy="200" r="160" fill="white" opacity="0.02" filter="blur(20px)" />

    {/* Main Administrative Dashboard Frame */}
    <g transform="translate(30, 60)">
      {/* Outer Window */}
      <rect width="440" height="280" rx="16" fill="white" opacity="0.06" stroke="white" strokeWidth="2" strokeOpacity="0.15" />
      
      {/* Top Header Bar */}
      <rect width="440" height="40" rx="16" fill="white" opacity="0.04" />
      <path d="M 0 16 A 16 16 0 0 1 16 0 L 424 0 A 16 16 0 0 1 440 16 L 440 40 L 0 40 Z" fill="white" opacity="0.02" />
      
      {/* Window Controls (Red/Saffron/Green dots) */}
      <circle cx="20" cy="20" r="5" fill="#FF9933" opacity="0.8" />
      <circle cx="36" cy="20" r="5" fill="white" opacity="0.3" />
      <circle cx="52" cy="20" r="5" fill="#138808" opacity="0.8" />
      
      {/* Header text placeholder */}
      <rect x="80" y="16" width="100" height="8" rx="4" fill="white" opacity="0.15" />

      {/* Sidebar Panel */}
      <path d="M 0 40 L 100 40 L 100 264 A 16 16 0 0 1 84 280 L 0 280 Z" fill="white" opacity="0.02" />
      <line x1="100" y1="40" x2="100" y2="280" stroke="white" strokeWidth="1" strokeOpacity="0.08" />
      
      {/* Sidebar Items */}
      <rect x="15" y="60" width="70" height="8" rx="4" fill="#FF9933" opacity="0.6" />
      <rect x="15" y="85" width="70" height="8" rx="4" fill="white" opacity="0.15" />
      <rect x="15" y="110" width="70" height="8" rx="4" fill="white" opacity="0.15" />
      <rect x="15" y="135" width="70" height="8" rx="4" fill="white" opacity="0.1" />
      
      <circle cx="30" cy="230" r="12" fill="white" opacity="0.08" />
      <circle cx="30" cy="230" r="6" fill="#FF9933" opacity="0.4" />

      {/* Main Panel Content Area */}
      
      {/* Stat Card 1: Reports Analysis */}
      <g transform="translate(120, 60)">
        <rect width="145" height="80" rx="10" fill="white" opacity="0.05" stroke="white" strokeWidth="1" strokeOpacity="0.08" />
        <rect x="15" y="15" width="60" height="6" rx="3" fill="white" opacity="0.25" />
        <rect x="15" y="27" width="90" height="4" rx="2" fill="white" opacity="0.12" />
        
        {/* Bars Chart */}
        <rect x="15" y="45" width="12" height="20" rx="3" fill="#FF9933" opacity="0.8" />
        <rect x="32" y="38" width="12" height="27" rx="3" fill="white" opacity="0.5" />
        <rect x="49" y="48" width="12" height="17" rx="3" fill="white" opacity="0.2" />
        <rect x="66" y="42" width="12" height="23" rx="3" fill="#138808" opacity="0.8" />
        <rect x="83" y="35" width="12" height="30" rx="3" fill="white" opacity="0.6" />
        <rect x="100" y="50" width="12" height="15" rx="3" fill="white" opacity="0.15" />
      </g>

      {/* Stat Card 2: Status Indicator */}
      <g transform="translate(280, 60)">
        <rect width="145" height="80" rx="10" fill="white" opacity="0.05" stroke="white" strokeWidth="1" strokeOpacity="0.08" />
        <rect x="15" y="15" width="70" height="6" rx="3" fill="white" opacity="0.25" />
        <rect x="15" y="27" width="50" height="4" rx="2" fill="white" opacity="0.12" />
        
        {/* Progress Gauge */}
        <circle cx="105" cy="48" r="22" stroke="white" strokeWidth="5" strokeOpacity="0.08" fill="none" />
        <path d="M 105 26 A 22 22 0 1 1 85.3 58" stroke="#FF9933" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="105" cy="48" r="14" fill="white" opacity="0.05" />
        <circle cx="105" cy="48" r="4" fill="#FF9933" />
      </g>

      {/* Moderation Controls Area */}
      <g transform="translate(120, 155)">
        <rect width="305" height="110" rx="12" fill="white" opacity="0.03" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
        <rect x="15" y="12" width="110" height="8" rx="4" fill="white" opacity="0.25" />
        
        {/* Moderation Item Row 1 */}
        <g transform="translate(15, 32)">
          <rect width="275" height="30" rx="6" fill="white" opacity="0.04" />
          <circle cx="20" cy="15" r="7" fill="#138808" opacity="0.2" />
          <path d="M 17 15 L 19 17 L 23 13" stroke="#138808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="36" y="11" width="100" height="5" rx="2.5" fill="white" opacity="0.25" />
          <rect x="36" y="19" width="40" height="3" rx="1.5" fill="white" opacity="0.1" />
          <rect x="220" y="8" width="45" height="14" rx="7" fill="#138808" opacity="0.25" />
          <circle cx="242" cy="15" r="2" fill="white" opacity="0.8" />
        </g>

        {/* Moderation Item Row 2 */}
        <g transform="translate(15, 68)">
          <rect width="275" height="30" rx="6" fill="white" opacity="0.04" />
          <circle cx="20" cy="15" r="7" fill="#FF9933" opacity="0.2" />
          <path d="M 20 10 L 20 16 M 20 19 L 20 20" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="36" y="11" width="120" height="5" rx="2.5" fill="white" opacity="0.25" />
          <rect x="36" y="19" width="60" height="3" rx="1.5" fill="white" opacity="0.1" />
          <rect x="220" y="8" width="45" height="14" rx="7" fill="#FF9933" opacity="0.25" />
          <circle cx="242" cy="15" r="2" fill="white" opacity="0.8" />
        </g>
      </g>
    </g>

    {/* Big Shield Badge overlaying the left section */}
    <g transform="translate(15, 150)">
      {/* Drop Shadow representation */}
      <path d="M30 4L60 16V40C60 60 48 72 30 80C12 72 0 60 0 40V16L30 4Z" fill="black" opacity="0.15" transform="translate(4, 4)" />
      
      {/* Main Shield */}
      <path d="M30 0L60 12V36C60 56 48 68 30 76C12 68 0 56 0 36V12L30 0Z" fill="#1a237e" stroke="#FF9933" strokeWidth="2.5" />
      
      {/* Glossy inner shield */}
      <path d="M30 4L54 14V36C54 52 44 62 30 70C16 62 6 52 6 36V14L30 4Z" fill="white" opacity="0.06" />
      
      {/* Checkmark in shield */}
      <path d="M20 36L27 43L40 28" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>

    {/* Sparkles / Stars decorations */}
    <g transform="translate(430, 40)">
      <path d="M0 6L2 2L6 0L2 -2L0 -6L-2 -2L-6 0L-2 2Z" fill="#FF9933" opacity="0.7" />
    </g>
    <g transform="translate(450, 310)">
      <path d="M0 4L1 1L4 0L1 -1L0 -4L-1 -1L-4 0L-1 1Z" fill="white" opacity="0.5" />
    </g>
    <g transform="translate(20, 330)">
      <path d="M0 5L1.5 1.5L5 0L1.5 -1.5L0 -5L-1.5 -1.5L-5 0L-1.5 1.5Z" fill="#138808" opacity="0.6" />
    </g>

    {/* Small decorative circles */}
    <circle cx="80" cy="40" r="3" fill="white" opacity="0.3" />
    <circle cx="460" cy="180" r="4" fill="#FF9933" opacity="0.4" />
    <circle cx="340" cy="20" r="2.5" fill="white" opacity="0.2" />
    <circle cx="20" cy="110" r="3.5" fill="white" opacity="0.2" />
  </svg>
);

export default AdminIllustration;
