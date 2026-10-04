import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  QrCode, 
  Info,
  Sparkles
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAnnouncement, setCopiedAnnouncement] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'announcement'>('link');

  if (!isOpen) return null;

  // The permanent production shared URL for this applet
  const sharedAppUrl = 'https://ais-pre-damcezbg24vkoaynom2od3-880627128751.asia-southeast1.run.app';
  
  // Use current window location if available, preferring the shared URL if running locally
  const currentUrl = typeof window !== 'undefined' ? window.location.href : sharedAppUrl;
  const effectiveShareUrl = sharedAppUrl;

  const announcementText = `📢 *Suluh Brunei - Higher Education & Scholarship Navigator for Students*

Assalamualaikum & Greetings!

Here is the link to Suluh Brunei, the comprehensive guidance portal for Brunei sixth-form and college students:
👉 ${effectiveShareUrl}

Key Features for Students:
✓ GCE A-Level & IB UCAS Tariff Points Calculator
✓ Admission criteria for UBD, UTB, UNISSA, Politeknik Brunei & KUPU SB
✓ Brunei Government Local & MOE Overseas Scholarship eligibility check
✓ Mandatory O-Level Bahasa Melayu credit verification & fee-paying warnings
✓ SBPP Education Loan Scheme requirements & payment tables
✓ Real-time HECAS, OAS, and UCAS deadline tracking with calendar export
✓ RIASEC Holland Career Profiler & My Journey Progression Hub
✓ Personal Statement & Scholarship Essay Studio

Please share with your classmates, teachers, and school counselors!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(effectiveShareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleCopyAnnouncement = () => {
    navigator.clipboard.writeText(announcementText).then(() => {
      setCopiedAnnouncement(true);
      setTimeout(() => setCopiedAnnouncement(false), 2500);
    });
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(effectiveShareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Share Suluh Brunei</h3>
              <p className="text-xs text-amber-200/90">Distribute to students, parents, and school counselors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('link')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'link' 
                ? 'border-amber-600 text-amber-900 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Shareable Link
          </button>
          <button
            onClick={() => setActiveTab('announcement')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'announcement' 
                ? 'border-amber-600 text-amber-900 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            WhatsApp / Classroom Announcement
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'qr' 
                ? 'border-amber-600 text-amber-900 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Classroom QR Code
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Official Public Link for Students
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={effectiveShareUrl}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-800 select-all focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick sharing action buttons */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-slate-500 mb-2">Quick Share via:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check your Brunei higher education pathways and scholarships on Suluh Brunei: ' + effectiveShareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(effectiveShareUrl)}&text=${encodeURIComponent('Suluh Brunei - Higher Education & Scholarship Navigator for Students')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </a>

                  <a
                    href={`mailto:?subject=${encodeURIComponent('Suluh Brunei - Higher Education Portal')}&body=${encodeURIComponent(announcementText)}`}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Login Required for Students</span>
                </div>
                <p>
                  Students can open this link on phones, tablets, or laptops to calculate their points, check HECAS degree entries, test career aptitude, and track scholarships without needing an account.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'announcement' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ready-to-Send Classroom Announcement
                </label>
                <button
                  onClick={handleCopyAnnouncement}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  {copiedAnnouncement ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                readOnly
                rows={9}
                value={announcementText}
                className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none select-all leading-relaxed"
              />
              <p className="text-[11px] text-slate-500">
                Tip: Copy and paste this directly into your Sixth Form WhatsApp group, Google Classroom stream, or Telegram channel.
              </p>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="flex flex-col items-center justify-center py-2 space-y-4 text-center">
              <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-md">
                <img
                  src={qrCodeUrl}
                  alt="Suluh Brunei Student Access QR Code"
                  className="w-48 h-48 rounded-lg"
                />
              </div>
              <div className="max-w-sm">
                <h4 className="font-bold text-sm text-slate-900">Project on Classroom Screen</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Project this QR code during assembly or career counseling sessions. Students can scan it directly with their phone cameras to open Suluh Brunei instantly.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Suluh Brunei · Wawasan Brunei 2035</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
