import React from 'react';
import { ArrowRight, Compass, Award, Calendar, Users, GraduationCap, Building2 } from 'lucide-react';
import heroImg from '../assets/images/hero_brunei_students_1790996845553.jpg';
import brandLogo from '../assets/images/suluhbrunei_logo_1790999633328.jpg';

interface HeroBannerProps {
  onNavigate: (tab: string) => void;
  calculatedPoints: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigate, calculatedPoints }) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden rounded-2xl border border-slate-800 shadow-xl mb-10">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Bruneian students preparing for higher education"
          className="w-full h-full object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Resilient fallback container if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Domain-specific context kicker with Official Logo Emblem */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400/90 shadow-md shrink-0 bg-slate-950 p-0.5">
            <img
              src={brandLogo}
              alt="Suluh Brunei Official Logo"
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span className="font-architectural text-sm font-bold text-amber-300 tracking-wider">Suluh Brunei</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Higher Education & Scholarship Navigator</span>
            </div>
            <div className="text-white text-xs font-medium text-slate-300">
              Suluh Harapan Generasi Masa Depan · In support of Wawasan Brunei 2035
            </div>
          </div>
        </div>

        {/* Primary Headline with balanced wrap */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl leading-tight">
          Navigate your path to world-class local & overseas universities.
        </h1>

        {/* Editorial Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
          Personalized scholarship guides for the MOE Government Overseas Scheme & BSP, SBPP education loan financing, career aptitude matching, real-time HECAS/UCAS deadline tracking, and 1-on-1 alumni mentorship.
        </p>

        {/* Quick Action Controls */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={() => onNavigate('aptitude')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-md"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>Career Aptitude Test</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => onNavigate('pathways')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Explore Degrees</span>
          </button>

          <button
            onClick={() => onNavigate('scholarships')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Scholarships</span>
          </button>

          <button
            onClick={() => onNavigate('sbpp')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>SBPP Loan Scheme</span>
          </button>
        </div>

        {/* Adjacency Proof Numbers & Institutional Context */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-xs sm:text-sm">
          <div>
            <div className="text-slate-400 text-xs mb-0.5">Local Universities</div>
            <div className="font-semibold text-white">UBD, UTB, UNISSA, PB</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs mb-0.5">Top Overseas Targets</div>
            <div className="font-semibold text-white">UK, Australia, Singapore</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs mb-0.5">Funding Pathways</div>
            <div className="font-semibold text-white">MOE, BSP & SBPP Loan</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs mb-0.5">Alumni Mentors</div>
            <div className="font-semibold text-white">Verified Bruneian Scholars</div>
          </div>
        </div>
      </div>
    </div>
  );
};
