import React, { useState } from 'react';
import { Scholarship, StudentProfile } from '../types';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { calculateTariffPoints, evaluateScholarshipReadiness } from '../utils/tariffCalculator';
import scholarshipEmblem from '../assets/images/scholarship_emblem_1790996860311.jpg';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  FileText, 
  Plane, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  Info, 
  Download,
  CheckSquare,
  Square,
  Sparkles
} from 'lucide-react';

interface ScholarshipGuideProps {
  profile: StudentProfile;
  onBookAlumniForScholarship: (scholarshipTitle: string) => void;
  onNavigateToDeadlines: () => void;
}

export const ScholarshipGuide: React.FC<ScholarshipGuideProps> = ({
  profile,
  onBookAlumniForScholarship,
  onNavigateToDeadlines
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeScholarshipModal, setActiveScholarshipModal] = useState<Scholarship | null>(null);

  // Document checklist state (stored in local component state)
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'doc-yellow-ic': true,
    'doc-birth-cert': true
  });

  const toggleDoc = (docKey: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docKey]: !prev[docKey]
    }));
  };

  const tariffPoints = calculateTariffPoints(profile.subjects);
  const readiness = evaluateScholarshipReadiness(tariffPoints, profile.icStatus, profile.oLevelMalayGrade || 'B3');

  // Filter scholarships
  const filteredScholarships = SCHOLARSHIPS_DATA.filter((item) => {
    if (selectedDestination === 'overseas' && item.destinationAllowed === 'Local Only') return false;
    if (selectedDestination === 'local' && item.destinationAllowed === 'Overseas Only') return false;
    if (selectedType !== 'all' && item.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-10">
      {/* SECTION 1: Personalized Scholarship Readiness Assessment */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-amber-50">
              <img
                src={scholarshipEmblem}
                alt="Brunei Scholarship Emblem"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                <span>Personalized Analysis</span>
                <span aria-hidden="true">·</span>
                <span>Brunei Citizenship & Grade Audit</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Your Scholarship Eligibility Overview
              </h2>
              <div className="text-xs text-slate-600 mt-0.5">
                Evaluated for: <strong className="text-slate-900">{profile.school}</strong> · Status: <span className="text-amber-800 font-semibold">{profile.icStatus}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block">Your Current Score</span>
              <span className="font-mono font-bold text-slate-900 text-lg tabular-nums">
                {tariffPoints} UCAS pts
              </span>
            </div>
          </div>
        </div>

        {/* Readiness Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: MOE Overseas */}
          <div className={`p-4 rounded-xl border transition-all ${
            readiness.moeOverseas.eligible 
              ? 'bg-emerald-50/50 border-emerald-200' 
              : 'bg-slate-50/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-900">MOE Overseas</span>
              {readiness.moeOverseas.eligible ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                </span>
              ) : !readiness.hasMalayCredit ? (
                <span className="text-[11px] font-semibold text-rose-700">
                  No BM Credit
                </span>
              ) : (
                <span className="text-[11px] font-medium text-amber-700">
                  {readiness.moeOverseas.gap} pts away
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 mb-2">
              300 pts + Yellow IC + O-Level BM Credit
            </div>
            <div className="text-[11px] text-slate-500">
              {!readiness.hasMalayCredit ? (
                <span className="text-rose-700 font-medium">Ineligible without Credit (C6) in O-Level Bahasa Melayu.</span>
              ) : (
                <span>Covers full tuition, £1,150–£1,350/mo UK stipend, flights, medical.</span>
              )}
            </div>
          </div>

          {/* Card 2: BSP Shell */}
          <div className={`p-4 rounded-xl border transition-all ${
            readiness.bspScholarship.eligible 
              ? 'bg-emerald-50/50 border-emerald-200' 
              : 'bg-slate-50/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-900">BSP Scholarship</span>
              {readiness.bspScholarship.eligible ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                </span>
              ) : (
                <span className="text-[11px] font-medium text-amber-700">
                  {readiness.bspScholarship.gap} pts away
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 mb-2">
              320 pts threshold (ABB/AAB + STEM focus)
            </div>
            <div className="text-[11px] text-slate-500">
              Corporate fast-track, industrial attachment, energy career at BSP Seria.
            </div>
          </div>

          {/* Card 3: Sultan's Scholar */}
          <div className={`p-4 rounded-xl border transition-all ${
            readiness.sultansScholar.eligible 
              ? 'bg-emerald-50/50 border-emerald-200' 
              : 'bg-slate-50/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-900">Sultan's Scholar</span>
              {readiness.sultansScholar.eligible ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Elite Profile
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-500">
                  {readiness.sultansScholar.gap} pts away
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 mb-2">
              360 pts threshold (Multiple A*s)
            </div>
            <div className="text-[11px] text-slate-500">
              Prestigious royal scholarship for Oxford, Cambridge, Imperial, Harvard.
            </div>
          </div>

          {/* Card 4: Local UBD / UTB / UNISSA / PB */}
          <div className={`p-4 rounded-xl border transition-all ${
            readiness.localGovtScholarship.isFeePaying
              ? 'bg-rose-50/60 border-rose-300'
              : 'bg-emerald-50/50 border-emerald-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-900">Local Govt Higher Ed</span>
              {readiness.localGovtScholarship.isFeePaying ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  <AlertCircle className="w-3 h-3 text-rose-600" /> Fee-Paying
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Scholarship
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 mb-2">
              160–280 pts via HECAS
            </div>
            <div className="text-[11px]">
              {readiness.localGovtScholarship.isFeePaying ? (
                <span className="text-rose-900 font-medium">
                  <strong>Fee-Paying Status:</strong> Lacks O-Level BM Credit (C6). Must pay tuition fees; no BND $350/mo allowance.
                </span>
              ) : (
                <span className="text-slate-500">
                  Free tuition + BND $350/mo allowance for Yellow IC citizens.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* National Policy Notice: O-Level BM Credit at All Government Higher Education Institutions */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 font-mono font-bold rounded text-[11px]">
                BRUNEI HIGHER EDUCATION REGULATION
              </span>
              <span className="font-semibold text-white">
                Mandatory Prerequisite: Credit in GCE 'O' Level Bahasa Melayu
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Enforced at: UBD · UTB · UNISSA · Politeknik Brunei · IBTE · KUPU SB
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-slate-300 leading-relaxed text-[11px]">
            <div>
              <strong className="text-amber-300 block mb-0.5">Government Scholarship Exemption Criteria:</strong>
              Brunei citizens (Yellow IC holders) who achieve both the university academic entry requirement (A-Level/IB tariff) AND hold at least a <strong>Credit (Grade C6 or better) in GCE 'O' Level Bahasa Melayu</strong> are awarded a full government tuition scholarship and a monthly living allowance of <strong>BND $300 – $350/month</strong>.
            </div>
            <div>
              <strong className="text-rose-300 block mb-0.5">Fee-Paying Status Condition (Pelajar Berbayar):</strong>
              Applicants who meet degree academic points but <strong>DO NOT possess a Credit in O-Level Bahasa Melayu</strong> are admitted strictly on a <strong>Fee-Paying status</strong>. They must pay full tuition fees and will not receive any government living allowance unless/until a Credit in O-Level BM is obtained.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Comprehensive Scholarships Directory */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Brunei Scholarships & Sponsorship Schemes
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Verified criteria, living stipends, bond commitments, and selection timelines.
            </p>
          </div>

          {/* Filter Controls (Segmented buttons) */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedDestination('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedDestination === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Schemes
              </button>
              <button
                onClick={() => setSelectedDestination('overseas')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedDestination === 'overseas' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Overseas Only
              </button>
              <button
                onClick={() => setSelectedDestination('local')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedDestination === 'local' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Local Only
              </button>
            </div>
          </div>
        </div>

        {/* Scholarship Cards List */}
        <div className="space-y-5">
          {filteredScholarships.map((s) => {
            const isPointMet = tariffPoints >= s.minPoints;

            return (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Clean unboxed metadata with separators (Anti-slop) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-amber-800">{s.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{s.destinationAllowed}</span>
                      <span aria-hidden="true">·</span>
                      <span>{s.coverageType}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">Bond: {s.bondYears > 0 ? `${s.bondYears} Years` : 'Unbonded'}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {s.title}
                    </h3>
                    <div className="text-xs text-slate-500 italic">
                      {s.malayTitle}
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Provided by: <strong className="text-slate-800 font-medium">{s.provider}</strong>
                    </p>

                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-3">
                      <div className="font-medium text-slate-900 mb-1">Eligibility Criteria & Benchmarks:</div>
                      <div>{s.minGradesDescription}</div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Citizenship: <strong className="text-slate-700">{s.citizenshipRequirement}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right side allowance summary & actions */}
                  <div className="lg:w-72 shrink-0 bg-slate-50/80 rounded-xl p-4 border border-slate-200/60 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
                        Estimated Maintenance
                      </div>
                      <div className="text-xs font-semibold text-slate-900 leading-relaxed mb-3">
                        {s.monthlyAllowanceEstimate}
                      </div>

                      <div className="text-[11px] text-slate-500 mb-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Application Period:</span>
                          <span className="font-medium text-slate-700">{s.applicationPeriod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Status:</span>
                          <span className="font-semibold text-emerald-700">{s.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200/80">
                      <button
                        onClick={() => setActiveScholarshipModal(s)}
                        className="w-full py-2 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors text-center shadow-2xs"
                      >
                        View Full Details & Document Checklist
                      </button>

                      <button
                        onClick={() => onBookAlumniForScholarship(s.title)}
                        className="w-full py-1.5 px-3 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors text-center"
                      >
                        Ask Alumni Scholar About This
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Brunei Document Readiness Checklist */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Brunei Scholarship Application Document Preparation
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Standard required documents for the Ministry of Education (MOE) and HECAS submissions.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Click to track your readiness
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {[
            { id: 'doc-yellow-ic', label: 'Certified true copy of Brunei Yellow IC (Kad Pengenalan Kuning) - 3 copies' },
            { id: 'doc-birth-cert', label: 'Certified true copy of Sijil Beranak (Birth Certificate)' },
            { id: 'doc-o-level', label: 'Original & certified copies of GCE O-Level Certificate / Results' },
            { id: 'doc-a-level', label: 'Original & certified copies of GCE A-Level / IB / Diploma Transcript' },
            { id: 'doc-hecas', label: 'HECAS Application confirmation slip and payment receipt ($5)' },
            { id: 'doc-referees', label: 'Two confidential Academic Referee letters from your Sixth Form tutors' },
            { id: 'doc-cca', label: 'Comprehensive CCA Record & Testimonial (Kegiatan Luar Sekolah)' },
            { id: 'doc-uni-offer', label: 'University Conditional / Firm Offer Letter or UCAS Hub statement' }
          ].map(doc => {
            const isChecked = !!checkedDocs[doc.id];
            return (
              <div
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span className="text-xs leading-relaxed">{doc.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Remember: Copies must be certified true by a recognized Commissioner for Oaths or your school principal.</span>
          <button
            onClick={onNavigateToDeadlines}
            className="text-amber-800 font-semibold hover:underline"
          >
            Check Submission Deadlines →
          </button>
        </div>
      </section>

      {/* Scholarship In-Depth Details Modal */}
      {activeScholarshipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-semibold text-amber-800 mb-1">
                  {activeScholarshipModal.provider}
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {activeScholarshipModal.title}
                </h3>
                <div className="text-xs text-slate-500 italic mt-0.5">
                  {activeScholarshipModal.malayTitle}
                </div>
              </div>
              <button
                onClick={() => setActiveScholarshipModal(null)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6 my-6 text-xs text-slate-700">
              {/* Benefits Breakdown */}
              <div>
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Scholarship Financial Benefits & Allowances
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {activeScholarshipModal.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bond Terms & Conditions */}
              <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5">
                <div className="font-semibold text-amber-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Bond Commitment & Terms</span>
                </div>
                <div className="text-amber-900 leading-relaxed">
                  Bond duration: <strong className="text-amber-950">{activeScholarshipModal.bondYears > 0 ? `${activeScholarshipModal.bondYears} Years` : 'No bond (return required for 2 years)'}</strong> with {activeScholarshipModal.bondEmployer}. Scholars are required to complete their degree with good standing and return to serve.
                </div>
              </div>

              {/* Selection Process Stages */}
              <div>
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Official Selection Stages
                </h4>
                <div className="space-y-2">
                  {activeScholarshipModal.selectionStages.map((stage, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded border border-slate-100">
                      <span className="font-mono font-bold text-slate-500">{i + 1}.</span>
                      <span className="text-slate-700">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alumni Insider Tips */}
              <div>
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Alumni Scholars' Advice for the Interview
                </h4>
                <div className="space-y-2">
                  {activeScholarshipModal.alumniTips.map((tip, i) => (
                    <div key={i} className="p-3 bg-slate-100/70 rounded-lg text-slate-800 leading-relaxed italic">
                      "{tip}"
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <a
                href={activeScholarshipModal.officialUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 hover:underline"
              >
                <span>Official Scholarship Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const title = activeScholarshipModal.title;
                    setActiveScholarshipModal(null);
                    onBookAlumniForScholarship(title);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Book Mock Interview with Scholar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
