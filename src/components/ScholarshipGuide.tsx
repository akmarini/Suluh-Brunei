import React, { useState } from 'react';
import { Scholarship, StudentProfile } from '../types';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { MOE_CIRCULAR_14_2025, MoePriorityCourse } from '../data/moeCircularData';
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
  Sparkles,
  Search,
  BookOpen,
  Building2,
  GraduationCap,
  Stethoscope,
  Briefcase,
  ChevronRight,
  Filter
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
  const [showCircularModal, setShowCircularModal] = useState<boolean>(false);
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [courseSearchQuery, setCourseSearchQuery] = useState<string>('');

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

  // Filter 32 Priority Courses from MOE Circular 14/2025
  const filteredPriorityCourses = MOE_CIRCULAR_14_2025.courses.filter(course => {
    if (courseCategoryFilter !== 'all' && course.category !== courseCategoryFilter) return false;
    if (courseSearchQuery.trim()) {
      const q = courseSearchQuery.toLowerCase();
      const match = 
        course.title.toLowerCase().includes(q) ||
        course.field.toLowerCase().includes(q) ||
        course.degreeType.toLowerCase().includes(q) ||
        course.careerOutcomes.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }
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

        {/* Readiness Cards Grid (5-column responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-6">
          {/* Card 1: MOE Overseas General */}
          <div className={`p-4 rounded-xl border transition-all ${
            readiness.moeOverseas.eligible 
              ? 'bg-emerald-50/50 border-emerald-200' 
              : 'bg-slate-50/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-900">MOE General</span>
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
            <div className="text-xs text-slate-600 mb-1.5">
              120 pts (BBB) · Min Grade C
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed">
              {!readiness.hasMalayCredit ? (
                <span className="text-rose-700 font-medium">Requires Credit (C6) in O-Level Bahasa Melayu.</span>
              ) : (
                <span>1 sitting within 2 yrs, age ≤ 26. Top 250 QS/THE 2026.</span>
              )}
            </div>
          </div>

          {/* Card 2: MOE Medicine & Dentistry */}
          <div className={`p-4 rounded-xl border transition-all ${
            readiness.moeMedicineDentistry.eligible 
              ? 'bg-emerald-50/50 border-emerald-200' 
              : 'bg-slate-50/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-900">MOE Medicine / Dental</span>
              {readiness.moeMedicineDentistry.eligible ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                </span>
              ) : !readiness.hasMalayCredit ? (
                <span className="text-[11px] font-semibold text-rose-700">
                  No BM Credit
                </span>
              ) : (
                <span className="text-[11px] font-medium text-amber-700">
                  {readiness.moeMedicineDentistry.gap} pts away
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 mb-1.5">
              144 pts (AAA) · Min Grade A
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed">
              <span>Para 1.1.1: O-Level English B3, 1 sitting in 2 yrs. IB: 38 pts.</span>
            </div>
          </div>

          {/* Card 3: BSP Shell */}
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
            <div className="text-xs text-slate-600 mb-1.5">
              128 pts threshold (ABB/AAB)
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed">
              Energy STEM focus, corporate fast-track & BSP attachment.
            </div>
          </div>

          {/* Card 4: Sultan's Scholar */}
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
            <div className="text-xs text-slate-600 mb-1.5">
              152+ pts (A*AA/A*A*A)
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed">
              Royal scholarship for top global universities (Oxbridge/Ivy).
            </div>
          </div>

          {/* Card 5: Local UBD / UTB / UNISSA / PB */}
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
            <div className="text-xs text-slate-600 mb-1.5">
              64–112 pts via HECAS
            </div>
            <div className="text-[11px] leading-relaxed">
              {readiness.localGovtScholarship.isFeePaying ? (
                <span className="text-rose-900 font-medium">
                  <strong>Fee-Paying:</strong> Lacks BM Credit. No $350 allowance.
                </span>
              ) : (
                <span className="text-slate-500">
                  Free tuition + BND $350/mo allowance for Yellow IC.
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

      {/* SECTION 2: Official MOE Overseas Circular 14/2025 Hub & Lampiran A (32 Courses) */}
      <section className="bg-white rounded-xl border border-amber-200/90 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-amber-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1.5">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold">
                KEMENTERIAN PENDIDIKAN BRUNEI
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">SURAT PEMBERITAHUAN BILANGAN: 14 / 2025</span>
              <span aria-hidden="true">·</span>
              <span>SESI AKADEMIK 2026/2027</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
              Biasiswa Kerajaan Ke Luar Negeri (Umum) Sesi 2026/2027
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Rujukan: <span className="font-mono font-medium text-slate-800">KPE/S19/C/SUT</span> (Bertarikh 23 Disember 2025 / 02 Rejab 1447) · Ditandatangani oleh Dr Haji Azman bin Ahmad, Setiausaha Tetap (Pengajian Tinggi).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowCircularModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-950" />
              <span>Read Full Circular Terms (Bil. 14/2025)</span>
            </button>
          </div>
        </div>

        {/* 4 Official Rule Summary Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-xs">
          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-1.5">
            <div className="font-semibold text-amber-950 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-800 shrink-0" />
              <span>1.1 First Degree (Umum)</span>
            </div>
            <div className="text-slate-700 leading-relaxed text-[11px]">
              Min <strong>120 UCAS tariff (300 old)</strong> across 3 A-Levels in <strong>ONE sitting within 2 years</strong> with <strong>no grade &lt; C</strong>. (IB: 32 pts; HND/Level 5: Distinction/Grade A).
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/70 space-y-1.5">
            <div className="font-semibold text-blue-950 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-blue-800 shrink-0" />
              <span>1.1.1 Medicine &amp; Dentistry</span>
            </div>
            <div className="text-slate-700 leading-relaxed text-[11px]">
              Min <strong>144 UCAS tariff (360 old)</strong> across 3 relevant A-Levels in 1 sitting, <strong>no grade &lt; A (AAA)</strong>. IB: 38 pts. English: <strong>Credit B3 in O-Level</strong> / IGCSE B.
            </div>
          </div>

          <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-200/70 space-y-1.5">
            <div className="font-semibold text-purple-950 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-purple-800 shrink-0" />
              <span>World University Rankings</span>
            </div>
            <div className="text-slate-700 leading-relaxed text-[11px]">
              Offer from <strong>Top 250 World Universities</strong> (QS/THE 2026) OR <strong>Top 20 World by subject</strong>, and accredited by <strong>MKPK</strong> Brunei.
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-1.5">
            <div className="font-semibold text-emerald-950 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>HECAS &amp; Document Submission</span>
            </div>
            <div className="text-slate-700 leading-relaxed text-[11px]">
              Apply via <strong>HECAS Round 1 ONLY</strong>. Submit hardcopies to <strong>Kaunter 3 Blok C MOE</strong> + softcopy to <strong>applyscholarship@moe.gov.bn</strong> within 3 working days.
            </div>
          </div>
        </div>

        {/* Special Spotlight: Integrated Medicine & Healthcare Pathways (UBD PAPRSB IHS & Top UK Universities) */}
        <div className="mt-8 pt-6 border-t border-amber-200/60">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-indigo-50/60 border border-blue-200 text-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-blue-200/80">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-600 text-white rounded-lg">
                  <Stethoscope className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-blue-950">
                    Integrated Medicine &amp; Health Pathways: UBD PAPRSB IHS &amp; Top UK Medical Universities
                  </h3>
                  <p className="text-[11px] text-blue-800">
                    Official clinical tracks under Surat Pemberitahuan Bil. 14/2025 (Para 1.1.1) &amp; Brunei Medical Board
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-blue-100 text-blue-900 border border-blue-300 font-bold rounded-md text-[10px] uppercase tracking-wider shrink-0">
                144 UCAS Pts (AAA in 1 Sitting)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4 text-[11px]">
              {/* UBD PAPRSB IHS */}
              <div className="p-3 bg-white/90 rounded-xl border border-blue-200/70 shadow-2xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>🏛️ UBD PAPRSB IHS (Brunei)</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">Local + Twinning</span>
                </div>
                <div className="text-slate-600 leading-relaxed">
                  <strong>BHSc Medicine (6 Yrs):</strong> 3 Years at UBD PAPRSB IHS + 3 Years Clinical Partner (Aberdeen, Glasgow, or ANU Australia).<br/>
                  <strong>BHSc Dentistry (5–6 Yrs):</strong> 3 Yrs UBD + Partner Dental School.<br/>
                  <strong>Pharmacy &amp; Biomedical:</strong> 4 Yrs clinical &amp; lab diagnostic training.<br/>
                  <strong>Nursing &amp; Midwifery:</strong> 4 Yrs clinical hospital training.
                </div>
                <div className="pt-1.5 border-t border-slate-100 text-[10px] text-blue-900 font-medium">
                  HECAS Round 1 · Yellow IC non-fee paying with O-Level BM Credit
                </div>
              </div>

              {/* Direct UK Medical Universities */}
              <div className="p-3 bg-white/90 rounded-xl border border-blue-200/70 shadow-2xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>🇬🇧 Top UK Medical Schools</span>
                  <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-semibold border border-purple-200">Top 250 / Top 20</span>
                </div>
                <div className="text-slate-600 leading-relaxed">
                  <strong>Aberdeen &amp; Glasgow:</strong> Official UBD twinning partners &amp; full MOE overseas medical scholarship.<br/>
                  <strong>King’s College London (KCL):</strong> MBBS Medicine &amp; BDS Dentistry (Top 5 Dental School).<br/>
                  <strong>Imperial College &amp; UCL:</strong> Elite 6-Year MBBS/BSc programmes.<br/>
                  <strong>Edinburgh &amp; Dundee:</strong> Historic Scottish medical &amp; #1 UK dental training.<br/>
                  <strong>Oxford &amp; Cambridge:</strong> Sultan’s Scholar &amp; MOE Overseas.
                </div>
                <div className="pt-1.5 border-t border-slate-100 text-[10px] text-purple-900 font-medium">
                  Min 144 pts (AAA) · Chemistry &amp; Biology · O-Level English B3 · UCAT
                </div>
              </div>

              {/* Allied Health Specialties */}
              <div className="p-3 bg-white/90 rounded-xl border border-blue-200/70 shadow-2xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>🩺 Top UK Allied Clinical Tracks</span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold border border-amber-200">120 Pts (BBB)</span>
                </div>
                <div className="text-slate-600 leading-relaxed">
                  <strong>Speech &amp; Language:</strong> Manchester &amp; Newcastle (Priority #5).<br/>
                  <strong>Occupational Therapy:</strong> Liverpool &amp; Cardiff (Priority #6).<br/>
                  <strong>Nutrition &amp; Dietetics:</strong> Nottingham &amp; Surrey (Priority #7).<br/>
                  <strong>Cardiac Physiology &amp; Podiatry:</strong> Southampton (Priority #8 &amp; #9).<br/>
                  <strong>Paramedic Science:</strong> Surrey &amp; Oxford Brookes (Priority #11).
                </div>
                <div className="pt-1.5 border-t border-slate-100 text-[10px] text-amber-900 font-medium">
                  Single sitting within 2 yrs · No grade &lt; C · Bonded with MOH Brunei
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lampiran A: 32 National Priority Courses Explorer */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-900 text-amber-400 font-mono text-[10px] font-bold rounded">
                  LAMPIRAN A
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Senarai 32 Kursus Yang Diperlukan Bagi Penganugerahan Biasiswa 2026/2027
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Penganugerahan biasiswa ke luar negeri terhad kepada bidang-bidang keperluan negara yang disenaraikan di bawah.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All 32 Courses' },
                { id: 'A', label: 'A: Life Sciences & Medicine (15)' },
                { id: 'B', label: 'B: Social Sciences & Management (12)' },
                { id: 'C', label: 'C: Skim Pendidik (5)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCourseCategoryFilter(cat.id as any)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    courseCategoryFilter === cat.id
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar for 32 Priority Courses */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={courseSearchQuery}
              onChange={(e) => setCourseSearchQuery(e.target.value)}
              placeholder="Search by degree title, field (e.g. Medicine, Dentistry, UBD, Forensic, AI, Law), or government career..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* 32 Priority Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPriorityCourses.map((c) => (
              <div
                key={c.number}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-amber-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                      #{c.number}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      c.category === 'A'
                        ? 'bg-emerald-100 text-emerald-800'
                        : c.category === 'B'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {c.category === 'C' ? 'Skim Pendidik' : c.categoryTitle}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {c.title}
                  </h4>

                  <div className="text-[11px] text-slate-500 mt-1">
                    {c.degreeType} · <span className="text-slate-700 font-medium">{c.field}</span>
                  </div>

                  {/* Featured Institutions (UBD & UK Top Universities) */}
                  {c.featuredInstitutions && c.featuredInstitutions.length > 0 && (
                    <div className="mt-2.5 p-2 bg-slate-100/70 rounded-lg text-[10px] text-slate-700">
                      <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-amber-700" />
                        <span>Recommended Institutions (UBD / Top UK):</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {c.featuredInstitutions.slice(0, 3).map((inst, i) => (
                          <span
                            key={i}
                            className={`px-1.5 py-0.5 rounded font-medium ${
                              inst.includes('UBD') || inst.includes('Brunei')
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-white text-slate-700 border border-slate-200'
                            }`}
                          >
                            {inst}
                          </span>
                        ))}
                        {c.featuredInstitutions.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-slate-200/80 text-slate-600 rounded font-medium">
                            +{c.featuredInstitutions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[11px] text-slate-600">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 mb-0.5">
                    Target Government / National Roles:
                  </div>
                  <div className="line-clamp-2 leading-relaxed">
                    {c.careerOutcomes.join(' · ')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>
              Showing {filteredPriorityCourses.length} of 32 official priority courses listed in Lampiran A (Circular Bil. 14/2025).
            </span>
            <button
              onClick={() => setShowCircularModal(true)}
              className="text-amber-800 font-semibold hover:underline cursor-pointer"
            >
              View Document Requirements &amp; Guidelines →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Comprehensive Scholarships Directory */}
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
                        className="w-full py-2 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors text-center shadow-2xs cursor-pointer"
                      >
                        View Full Details & Document Checklist
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

              {/* Interview & Assessment Insider Tips */}
              <div>
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Scholar Selection Interview & Assessment Guidance
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
                  onClick={() => setActiveScholarshipModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Circular 14/2025 Deep Dive Modal */}
      {showCircularModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-8">
            {/* Modal Header with Government Styling */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 p-1 shrink-0 flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-800" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                    KEMENTERIAN PENDIDIKAN, NEGARA BRUNEI DARUSSALAM
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                    Surat Pemberitahuan Bilangan: 14 / 2025
                  </h3>
                  <div className="text-xs text-slate-600">
                    Biasiswa Kerajaan Ke Luar Negeri (Umum) Sesi Akademik 2026/2027 · Ref: <span className="font-mono font-medium">KPE/S19/C/SUT</span> (23 Disember 2025)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCircularModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-6 space-y-6 text-xs text-slate-700">
              {/* Introduction Callout */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-amber-950 leading-relaxed text-xs">
                <strong>Pendahuluan Rasmi:</strong> Skim Biasiswa Kerajaan Kebawah Duli Yang Maha Mulia diteruskan dalam usaha Kerajaan melahirkan rakyat berpengetahuan tinggi di institusi teratas dunia bagi menampung keperluan tenaga manusia sektor-sektor Kerajaan selaras dengan Wawasan Brunei 2035.
              </div>

              {/* Side-by-side Requirements: General Degree vs Medicine/Dentistry */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-800" />
                  <span>1.0 Syarat-Syarat Utama Peringkat Ijazah Sarjana Muda</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* General First Degree */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-xs">1.1 Kursus Umum (First Degree)</span>
                      <span className="font-mono text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        120 UCAS pts
                      </span>
                    </div>
                    <ul className="space-y-2 text-[11px] leading-relaxed text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Kad Pengenalan:</strong> Pemegang Kad Pengenalan Kuning (Rakyat Brunei).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Bahasa Melayu:</strong> Sekurang-kurangnya <strong>Kredit C6</strong> BC-GCE ‘O’ Level.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Bahasa Inggeris:</strong> O-Level English Kredit C6 / IGCSE English Gred C / ‘AS’ GP Gred c / IELTS 6.5.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Had Umur:</strong> Tidak melebihi 26 tahun pada <strong>01/09/2026</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Kelayakan A-Level:</strong> Sekurang-kurangnya 3 mata pelajaran dalam <strong>sekali duduk (tempoh 2 tahun)</strong> dengan UCAS minima 120 (300 old) bagi 3 subjek terbaik dan <strong>setiap mata pelajaran TIDAK KURANG daripada Gred C</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Kelayakan Lain:</strong> IB Diploma minima 32 mata / Diploma Lanjutan atau Level 5 Diploma dengan Distinction / Gred A.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Medicine & Dentistry */}
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                      <span className="font-bold text-blue-950 text-xs">1.1.1 Kursus Perubatan &amp; Pergigian</span>
                      <span className="font-mono text-[11px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        144 UCAS pts (AAA)
                      </span>
                    </div>
                    <ul className="space-y-2 text-[11px] leading-relaxed text-blue-950">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Memenuhi syarat warganegara, Kad Pengenalan Kuning, dan umur ≤ 26 tahun.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Bahasa Melayu:</strong> Sekurang-kurangnya <strong>Kredit C6</strong> BC-GCE ‘O’ Level.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Bahasa Inggeris (Khas):</strong> Sekurang-kurangnya <strong>Kredit B3</strong> BC-GCE ‘O’ Level ATAU Gred B IGCSE English Language as a Second Language.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>A-Level Perubatan:</strong> Sekurang-kurangnya 3 mata pelajaran yang bersesuaian dalam <strong>sekali duduk dalam 2 tahun</strong> dengan UCAS minima 144 (360 old) dan <strong>setiap mata pelajaran TIDAK KURANG daripada Gred A (AAA)</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>IB Perubatan:</strong> Kelulusan IB Diploma dalam tempoh 2 tahun dengan <strong>Gred minima 38 mata</strong>.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* World University Ranking Rules */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span>Kedudukan Universiti (World University Rankings) &amp; Pengiktirafan MKPK</span>
                </h4>
                <div className="space-y-2 text-[11px] leading-relaxed text-slate-700">
                  <div>
                    • <strong>Top 250 Dunia:</strong> Mendapat tawaran di universiti berkedudukan 250 teratas dunia (Top 250 World Universities) mengikut <strong>QS World University (QSWU) Rankings 2026</strong> ATAU <strong>Times Higher Education World University (THEWU) Rankings 2026</strong>.
                  </div>
                  <div>
                    • <strong>Top 20 Mengikut Bidang:</strong> ATAU mendapat tawaran di universiti berkedudukan 20 teratas dunia (Top 20 World Universities) mengikut bidang (subjek) QSWU 2026 atau THEWU 2026.
                  </div>
                  <div>
                    • <strong>Top 20 Keseluruhan:</strong> Tawaran di universiti 20 teratas dunia secara keseluruhan diberi pertimbangan secara case-by-case.
                  </div>
                  <div>
                    • <strong>Pengiktirafan Rasmi:</strong> Universiti dan kursus dipilih hendaklah diiktiraf oleh <strong>Majlis Kebangsaan Pengiktirafan Kelulusan (MKPK)</strong>, Kementerian Pendidikan.
                  </div>
                </div>
              </div>

              {/* Application Procedures (HECAS Round 1 & Counter 3) */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>2.0 Tatacara Permohonan Biasiswa Ke Luar Negeri</span>
                </h4>
                <div className="space-y-2 text-[11px] leading-relaxed text-slate-800">
                  <div>
                    1. Permohonan dibuat secara dalam talian (online) melalui <strong>HECAS Pusingan Pertama Sahaja</strong> di <a href="https://hecas.moe.gov.bn" target="_blank" rel="noreferrer" className="text-emerald-800 font-semibold underline">https://hecas.moe.gov.bn</a>.
                  </div>
                  <div>
                    2. Menghadapkan dokumen fizikal ke: <strong>Jabatan Pengurusan Biasiswa, Kaunter No. 3, Lantai Dasar, Blok C, Pusat Perkhidmatan Setempat, Kementerian Pendidikan</strong>:
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700">
                      <li>Senarai semak permohonan Biasiswa dari HECAS</li>
                      <li>Salinan borang HECAS (1 keping) dan Borang B (3 keping)</li>
                      <li>Salinan Kad Pengenalan Kuning</li>
                      <li>Salinan surat tawaran (Conditional/Unconditional Offer) atau bukti permohonan</li>
                      <li>Isi kandungan kursus (course structure)</li>
                      <li>Salinan sijil yang disahkan (certified true copies) oleh Pengetua Sekolah / Pendaftar Mahkamah</li>
                      <li>Surat pengiktirafan kursus dan tempat pengajian dari MKPK</li>
                      <li>Borang deklarasi maklumat Biasiswa</li>
                    </ul>
                  </div>
                  <div>
                    3. Menghantar borang dan dokumen secara <strong>softcopy melalui emel ke applyscholarship@moe.gov.bn</strong> selewat-lewatnya <strong>3 hari waktu bekerja</strong> selepas tarikh tutup HECAS.
                  </div>
                  <div>
                    4. <strong>Kemasukan Pengajian:</strong> Bermula bulan Ogos / September 2026 atau Januari / Februari 2027.
                  </div>
                </div>
              </div>

              {/* Ineligibility Clauses (Permohonan Tidak Dipertimbangkan) */}
              <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200">
                <h4 className="font-bold text-rose-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                  <span>5.0 Permohonan Yang Tidak Akan Dipertimbangkan</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-relaxed text-rose-900">
                  <li>Tidak memenuhi syarat-syarat utama dan tambahan.</li>
                  <li>Sedang berkhidmat dengan Kerajaan (jawatan tetap, percubaan, open vote, atau gaji hari - Surat Keliling JPM 27/1988 &amp; 10/2006) dan mana-mana syarikat swasta yang established.</li>
                  <li>Permohonan dihantar selepas tarikh tutup, tidak lengkap, sijil tidak disahkan, atau mempunyai maklumat palsu.</li>
                  <li>Pemohon yang sudah diterima atau sedang mengikuti pengajian di IPTA tempatan di bawah Biasiswa Kerajaan Dalam Negeri di tahap pengajian yang sama (BDQF).</li>
                  <li>Pemohon yang telah memperolehi kelulusan di tahap pengajian yang sama mengikut BDQF sama ada di dalam atau di luar negara.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 text-[11px]">
                Surat Pemberitahuan Kementerian Pendidikan Bilangan 14/2025 · Brunei Darussalam
              </span>
              <button
                onClick={() => setShowCircularModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close Circular Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
