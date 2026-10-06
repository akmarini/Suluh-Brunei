import React, { useState } from 'react';
import suluhLogoImg from '../assets/images/suluhbrunei_logo_1790999633328.jpg';

interface SuluhLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

/**
 * SuluhLogo Component
 * Features the official heraldic emblem of Suluh Brunei:
 * The golden torch of guidance (Suluh Harapan), the open book of knowledge,
 * and Brunei royal yellow & gold motifs.
 * Built with resilient multi-layer SVG vector rendering + image fallback,
 * ensuring the logo is NEVER gone or broken in any browser environment.
 */
export const SuluhLogo: React.FC<SuluhLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  variant = 'dark'
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const dimensionClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className={`${dimensionClasses} relative rounded-lg overflow-hidden border border-amber-400/90 shadow-sm shrink-0 bg-slate-950 flex items-center justify-center transition-transform hover:scale-105`}
        title="Suluh Brunei - Higher Education & Scholarship Navigator"
      >
        {!imgFailed ? (
          <img 
            src={suluhLogoImg} 
            alt="Suluh Brunei Official Logo" 
            className="w-full h-full object-cover object-center"
            onError={() => setImgFailed(true)}
          />
        ) : (
          /* High-Definition Vector SVG Heraldic Emblem Fallback */
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full p-1"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Deep Royal Navy Background with Gold Ring */}
            <circle cx="50" cy="50" r="48" fill="#020617" />
            <circle cx="50" cy="50" r="44" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
            
            {/* Open Academic Book / Kitab Ilmu at base */}
            <path 
              d="M26 70 C36 65, 46 68, 50 71 C54 68, 64 65, 74 70 L74 76 C64 71, 54 74, 50 77 C46 74, 36 71, 26 76 Z" 
              fill="#F8FAFC" 
              stroke="#D97706" 
              strokeWidth="1.2"
            />
            {/* Book spine line */}
            <line x1="50" y1="71" x2="50" y2="77" stroke="#92400E" strokeWidth="1.5" />
            {/* Book page lines */}
            <line x1="33" y1="69" x2="44" y2="71" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="56" y1="71" x2="67" y2="69" stroke="#94A3B8" strokeWidth="0.8" />

            {/* The Golden Torch Handle (Suluh) */}
            <path 
              d="M47 52 L53 52 L51 68 L49 68 Z" 
              fill="url(#torchGoldGrad)" 
              stroke="#B45309" 
              strokeWidth="0.8"
            />
            {/* Torch Collar / Capital */}
            <path 
              d="M43 49 L57 49 L55 53 L45 53 Z" 
              fill="#F59E0B" 
              stroke="#78350F" 
              strokeWidth="0.8"
            />
            <path 
              d="M42 48 C42 46, 58 46, 58 48 Z" 
              fill="#FDE047" 
            />

            {/* Radiating Beacon Rays */}
            <path d="M50 14 L50 20" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            <path d="M30 26 L35 30" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M70 26 L65 30" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M22 42 L28 43" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <path d="M78 42 L72 43" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

            {/* Majestic Outer Flame (Brunei Royal Yellow & Amber) */}
            <path 
              d="M50 21 C53 28, 62 33, 60 41 C59 46, 54 48, 50 48 C46 48, 41 46, 40 41 C38 33, 47 28, 50 21 Z" 
              fill="url(#outerFlameGrad)" 
            />

            {/* Inner Vibrant Flame (Brilliant Gold & Crimson tip) */}
            <path 
              d="M50 28 C52 33, 56 37, 55 42 C54 45, 51 47, 50 47 C49 47, 46 45, 45 42 C44 37, 48 33, 50 28 Z" 
              fill="url(#innerFlameGrad)" 
            />

            {/* Flame Core Sparkle */}
            <ellipse cx="50" cy="42" rx="2" ry="3.5" fill="#FEF08A" />

            {/* Gradients */}
            <defs>
              <linearGradient id="torchGoldGrad" x1="47" y1="52" x2="53" y2="68" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="0.5" stopColor="#D97706" />
                <stop offset="1" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="outerFlameGrad" x1="50" y1="21" x2="50" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047" />
                <stop offset="0.4" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#DC2626" />
              </linearGradient>
              <linearGradient id="innerFlameGrad" x1="50" y1="28" x2="50" y2="47" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.5" stopColor="#FEF08A" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-architectural font-bold tracking-wider leading-none ${
            variant === 'dark' ? 'text-white text-base sm:text-lg' : 'text-slate-900 text-base sm:text-lg'
          }`}>
            Suluh Brunei
          </span>
          <span className={`text-[10px] tracking-tight ${
            variant === 'dark' ? 'text-amber-400/90' : 'text-amber-800 font-medium'
          }`}>
            Higher Education &amp; Scholarships
          </span>
        </div>
      )}
    </div>
  );
};
export default SuluhLogo;
