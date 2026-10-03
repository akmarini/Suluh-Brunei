import React from 'react';
import { ShieldCheck, Copyright, AlertTriangle, FileText, X, Lock, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import brandLogo from '../assets/images/suluhbrunei_logo_1790999633328.jpg';

interface OwnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName?: string;
  creatorContact?: string;
}

export const OwnershipModal: React.FC<OwnershipModalProps> = ({
  isOpen,
  onClose,
  creatorName = 'SuluhBrunei Initiative',
  creatorContact = 'irs.iniramka@gmail.com'
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ownership-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/80 bg-slate-950 shrink-0 p-0.5">
              <img
                src={brandLogo}
                alt="Suluh Brunei Logo"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Intellectual Property & Fair Use</span>
              </div>
              <h2 id="ownership-modal-title" className="text-lg font-bold text-white">
                Ownership, Terms & Academic Advisory
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Section 1: Copyright & Provenance */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-start gap-3">
              <Copyright className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-950 text-sm">
                  Official Ownership & Creator Rights
                </h3>
                <p className="text-xs text-amber-900/90 mt-1">
                  SuluhBrunei is an original educational platform curated and developed for Bruneian pre-university, college leavers, and scholarship candidates.
                </p>
                <div className="mt-3 pt-3 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Project Ownership:</span>{' '}
                    <strong className="text-slate-900">{creatorName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Official Contact:</span>{' '}
                    <a href={`mailto:${creatorContact}`} className="text-amber-800 font-semibold underline hover:text-amber-950">
                      {creatorContact}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Permitted vs Prohibited Use */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>Terms of Fair Use & Platform Protection</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1.5">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Authorized Uses</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-emerald-950">
                  <li>Free educational use by Bruneian students, teachers, and school counselors.</li>
                  <li>Sharing the official link directly in classroom groups, WhatsApp, and school channels.</li>
                  <li>Using the tariff calculator and pathway data for personal academic planning.</li>
                </ul>
              </div>

              <div className="p-3.5 bg-rose-50/60 border border-rose-200 rounded-lg space-y-1.5">
                <div className="font-bold text-rose-900 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-rose-700" />
                  <span>Strictly Prohibited</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-rose-950">
                  <li>Unauthorized resale, commercial monetization, or charging students for access.</li>
                  <li>Copying, scraping, or re-hosting this application under another brand name.</li>
                  <li>Misrepresenting the tool as a guarantee of university admission or scholarship approval.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Legal Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Academic Guidance Disclaimer</span>
            </div>
            <p>
              SuluhBrunei is an independent higher education decision support tool designed to demystify entry requirements, UCAS tariffs, HECAS procedures, and scholarship criteria in Brunei Darussalam. While entry points and guidelines are verified against official sources (Ministry of Education, UBD, UTB, UNISSA, PB, IBTE), admission requirements are subject to change. Candidates must always verify their final application details with official Ministry of Education circulars and their respective institution's admission office.
            </p>
          </div>

          {/* Section 4: Inquiries */}
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <span className="text-slate-500">Have licensing or school partnership inquiries?</span>
            <a
              href={`mailto:${creatorContact}?subject=SuluhBrunei%20Inquiry`}
              className="inline-flex items-center gap-1 text-amber-800 font-semibold hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Creator</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            © 2026 {creatorName} · All Rights Reserved
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
