import React from 'react';
import { 
  Compass, 
  Award, 
  FileText, 
  BrainCircuit, 
  Building2, 
  Target, 
  Share2,
  ShieldCheck 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tariffPoints: number;
  onOpenShareModal?: () => void;
  onOpenOwnershipModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  tariffPoints, 
  onOpenShareModal,
  onOpenOwnershipModal 
}) => {
  const navItems = [
    { id: 'pathways', label: 'Pathways', fullLabel: 'Degree Pathways', icon: Compass },
    { id: 'aptitude', label: 'RIASEC Profiler', fullLabel: 'RIASEC Career Profiler', icon: BrainCircuit },
    { id: 'scholarships', label: 'Scholarships', fullLabel: 'Scholarship Guides', icon: Award },
    { id: 'sbpp', label: 'SBPP Loan', fullLabel: 'SBPP Education Loan Scheme', icon: Building2 },
    { id: 'dashboard', label: 'My Journey', fullLabel: 'Student Progression Dashboard', icon: Target },
    { id: 'studio', label: 'Essay Studio', fullLabel: 'Personal Statement Studio', icon: FileText }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between h-14 border-b border-slate-100">
          {/* Brand Wordmark & Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('pathways')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-amber-400/90 shadow-sm shrink-0 bg-slate-950 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-architectural text-xl sm:text-2xl font-bold tracking-wider text-slate-900 group-hover:text-amber-800 transition-colors">
                Suluh Brunei
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium border-l border-slate-200 pl-3">
              Higher Education & Scholarships Portal
            </span>
          </div>

          {/* Right side metrics and actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50/80 border border-amber-200/60 rounded-md text-xs text-amber-900">
              <span className="font-medium text-[11px] text-amber-800">My Tariff:</span>
              <span className="font-mono font-bold tabular-nums text-amber-950 text-xs sm:text-sm">
                {tariffPoints} pts
              </span>
            </div>

            {onOpenOwnershipModal && (
              <button
                onClick={onOpenOwnershipModal}
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                title="View Intellectual Property, Terms of Use & Legal Advisory"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Ownership & Terms</span>
              </button>
            )}

            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
                title="Share link with students and school groups"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden sm:inline">Share with Students</span>
                <span className="sm:hidden">Share</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('aptitude')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">RIASEC Career Profiler</span>
              <span className="sm:hidden">Profiler</span>
            </button>
          </div>
        </div>

        {/* Dedicated Always-Visible Tab Navigation Row */}
        <nav 
          aria-label="Primary Navigation"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all focus:outline-none whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-amber-100/90 text-amber-950 font-bold border-amber-400 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:text-slate-950 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-800' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
