import React from 'react';


export const SethuLogo = () => (
  <div className="w-full h-full">
    <img 
        src="public/Sethu_Institute_of_Technology_Logo.png"
        alt="Sethu Institute of Technology Logo"
        className="w-full h-full object-contain"
    />
  </div>
);

export const NaacLogo = () => (
    <div className="w-full h-full">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <radialGradient id="redGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: '#c1272d' }} />
                    <stop offset="100%" style={{ stopColor: '#8a0f14' }} />
                </radialGradient>
                <path id="arc-accredited" d="M 25 50 A 25 25 0 1 1 75 50" />
            </defs>
            {/* Starburst */}
            <g fill="#f7b733">
                {Array.from({ length: 32 }).map((_, i) => (
                    <path key={i} transform={`rotate(${i * 11.25}, 50, 50)`} d="M 50 0 L 52 15 L 48 15 Z" />
                ))}
            </g>
            {/* Center Circle */}
            <circle cx="50" cy="50" r="30" fill="url(#redGradient)" />
            {/* Ribbon */}
            <path d="M 5 65 L 95 65 L 90 75 L 50 85 L 10 75 Z" fill="#a51c21" />
             <path d="M 5 65 L 10 75 L 10 60 Z" fill="#8a0f14" />
             <path d="M 95 65 L 90 75 L 90 60 Z" fill="#8a0f14" />
            
            {/* Text */}
            <text fill="#f7b733" fontSize="6" fontWeight="bold">
                <textPath href="#arc-accredited" startOffset="50%" textAnchor="middle">ACCREDITED WITH GRADE</textPath>
            </text>
            <text x="50" y="52" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">A++</text>
            <text x="50" y="75" textAnchor="middle" fill="#f7b733" fontSize="14" fontWeight="bold">NAAC</text>
        </svg>
    </div>
);