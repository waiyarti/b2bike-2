
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 300 200" fill="none" className={className || "h-16"}>
    <g transform="translate(75, 40) scale(0.6)">
      <circle cx="40" cy="100" r="35" stroke="currentColor" strokeWidth="6" />
      <circle cx="180" cy="100" r="35" stroke="currentColor" strokeWidth="6" />
      <path d="M40 100 L90 40 L170 40 L130 100 L40 100" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M90 40 L80 100" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <path d="M170 40 L180 100" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <path d="M170 40 L170 25 C170 25 190 25 190 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M80 40 L70 35 H95" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <path d="M110 40 Q 110 10 130 0 Q 130 20 110 40" fill="#14B8A6" /> 
      <path d="M110 40 L 110 -10" stroke="#14B8A6" strokeWidth="4" />
    </g>
    <text x="50" y="195" fontFamily="Arial" fontSize="48" fontWeight="900" fill="currentColor">B2</text>
    <text x="115" y="195" fontFamily="Arial" fontSize="48" fontWeight="900" fill="#14B8A6">Bike</text>
    <text x="215" y="195" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="currentColor" transform="rotate(-5 230 190)">& CO</text>
  </svg>
);
