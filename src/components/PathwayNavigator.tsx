import React, { useState } from 'react';
import { 
  StudentProfile, 
  UniversityProgram, 
  FieldOfInterest, 
  StudyDestination, 
  QualificationType,
  ICStatus
} from '../types';
import { UNIVERSITY_PROGRAMS } from '../data/pathways';
import { 
  BRUNEI_SIXTH_FORMS, 
  COMMON_SUBJECTS, 
  POLITEKNIK_DIPLOMAS,
  POLITEKNIK_SCHOOLS,
  IBTE_PROGRAMMES,
  IBTE_CAMPUSES,
  A_LEVEL_TARIFF_MAP,
  calculateTariffPoints,
  calculateStudentTariff,
  getQualificationDetails,
  hasOLevelMalayCredit,
  O_LEVEL_MALAY_GRADES
} from '../utils/tariffCalculator';
import { 
  CheckCircle, 
  AlertCircle, 
  Search, 
  GraduationCap, 
  Building, 
  Clock, 
  ExternalLink, 
  Plus, 
  Trash2, 
  SlidersHorizontal,
  Info,
  MapPin,
  Sparkles,
  BookOpen,
  Layers,
  Award,
  Wrench,
  CheckCircle2
} from 'lucide-react';

interface PathwayNavigatorProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onSelectScholarshipTab: () => void;
  onBookAlumniForCourse: (courseName: string) => void;
}

export const PathwayNavigator: React.FC<PathwayNavigatorProps> = ({
  profile,
  setProfile,
  onSelectScholarshipTab,
  onBookAlumniForCourse
}) => {
  const [selectedField, setSelectedField] = useState<FieldOfInterest>('all');
  const [selectedDestination, setSelectedDestination] = useState<StudyDestination>('all');
  const [selectedFundingScheme, setSelectedFundingScheme] = useState<string>('all');
  const [selectedProgramLevel, setSelectedProgramLevel] = useState<string>('all');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>('all');
  const [selectedTechnicalFilter, setSelectedTechnicalFilter] = useState<'all' | 'accepts-pb' | 'accepts-ibte'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProgram, setActiveModalProgram] = useState<UniversityProgram | null>(null);
  const [showOnlyEligible, setShowOnlyEligible] = useState(false);

  const tariffPoints = calculateStudentTariff(profile);
  const hasMalayCredit = hasOLevelMalayCredit(profile.oLevelMalayGrade || 'B3');
  const qualDetails = getQualificationDetails(profile);

  // Quick qualification selector handler that also syncs default school
  const handleSelectQualification = (newQual: QualificationType) => {
    let newSchool = profile.school;
    if (newQual === 'Politeknik-Diploma') {
      newSchool = 'Politeknik Brunei (PB)';
    } else if (newQual === 'HNTec-IBTE') {
      newSchool = 'IBTE (Institute of Brunei Technical Education)';
    } else if (newQual === 'STPUB') {
      newSchool = 'Sekolah Menengah Arab Laki-Laki Hassanal Bolkiah (SMALHB)';
    } else if (newQual === 'IB') {
      newSchool = 'Jerudong International School (JIS)';
    } else if (newQual === 'A-Level') {
      if (profile.school.includes('Politeknik') || profile.school.includes('IBTE') || profile.school.includes('SMALHB')) {
        newSchool = 'Maktab Duli Pengiran Muda Al-Muhtadee Billah (MDPMAMB)';
      }
    }
    setProfile(prev => ({
      ...prev,
      qualificationType: newQual,
      school: newSchool
    }));
  };

  // Subject management
  const handleAddSubject = () => {
    const available = COMMON_SUBJECTS.find(
      s => !profile.subjects.some(sub => sub.subject === s)
    ) || 'Economics';

    setProfile(prev => ({
      ...prev,
      subjects: [
        ...prev.subjects,
        { id: `sub-${Date.now()}`, subject: available, grade: 'B', isPredicted: true }
      ]
    }));
  };

  const handleRemoveSubject = (id: string) => {
    if (profile.subjects.length <= 1) return;
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.id !== id)
    }));
  };

  const handleUpdateSubject = (id: string, field: 'subject' | 'grade', value: string) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  // Filter programs
  const filteredPrograms = UNIVERSITY_PROGRAMS.filter(program => {
    // Program Level filter (Foundation vs Degree vs Diploma)
    if (selectedProgramLevel !== 'all' && program.programLevel !== selectedProgramLevel) return false;

    // Institution Type filter (Government University vs Private College vs Overseas)
    if (selectedInstitutionType !== 'all' && program.institutionType !== selectedInstitutionType) return false;

    // Destination filter
    if (selectedDestination === 'local' && program.campusCountry !== 'Brunei') return false;
    if (selectedDestination === 'uk' && program.campusCountry !== 'United Kingdom') return false;
    if (selectedDestination === 'australia' && program.campusCountry !== 'Australia') return false;

    // Field filter
    if (selectedField !== 'all' && program.field !== selectedField) return false;

    // Funding Scheme filter (MOE Scholarship vs SBPP vs Local)
    if (selectedFundingScheme === 'moe' && !program.moeScholarshipApproved) return false;
    if (selectedFundingScheme === 'sbpp' && !program.sbppLoanApproved) return false;
    if (selectedFundingScheme === 'local' && !program.localGovtApproved) return false;
    if (selectedFundingScheme === 'bsp' && !program.bspScholarshipApproved) return false;

    // Technical Articulation filter (Politeknik Brunei vs IBTE)
    if (selectedTechnicalFilter === 'accepts-pb') {
      const hasPb = !!program.polytechnicAcceptance || program.institution.includes('Politeknik');
      if (!hasPb) return false;
    }
    if (selectedTechnicalFilter === 'accepts-ibte') {
      const hasIbte = !!program.ibteAcceptance || program.institution.includes('IBTE');
      if (!hasIbte) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        program.name.toLowerCase().includes(q) ||
        program.institution.toLowerCase().includes(q) ||
        (program.partnerUniversity && program.partnerUniversity.toLowerCase().includes(q)) ||
        (program.programLevel && program.programLevel.toLowerCase().includes(q)) ||
        (program.foundationProgression && program.foundationProgression.toLowerCase().includes(q)) ||
        (program.polytechnicAcceptance && program.polytechnicAcceptance.toLowerCase().includes(q)) ||
        (program.ibteAcceptance && program.ibteAcceptance.toLowerCase().includes(q)) ||
        program.overview.toLowerCase().includes(q) ||
        program.moePrioritySector.toLowerCase().includes(q) ||
        (program.hecasCode && program.hecasCode.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Eligibility toggle
    if (showOnlyEligible && tariffPoints < program.minPoints) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-10">
      {/* SECTION 1: Interactive Sixth Form Profile & Tariff Points Deck */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Student Profile</span>
              <span aria-hidden="true">·</span>
              <span>{qualDetails.title}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Your Qualifications & University Progression
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {profile.qualificationType === 'Politeknik-Diploma'
                ? 'Input your Politeknik Brunei (PB) Level 5 Diploma cGPA to evaluate direct Year 2 entry into UTB/UBD and degree pathways.'
                : profile.qualificationType === 'HNTec-IBTE'
                ? 'Input your IBTE HNTec certification and award level to evaluate Politeknik Brunei and higher diploma / degree progression.'
                : 'Input your actual or predicted academic qualifications to calculate equivalent entry points and unlock matching university pathways.'}
            </p>
          </div>

          {/* Real-time Points Scorecard */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4 shrink-0">
            <div>
              <div className="text-xs text-slate-500 font-medium">
                {profile.qualificationType === 'Politeknik-Diploma'
                  ? 'PB Diploma cGPA'
                  : profile.qualificationType === 'HNTec-IBTE'
                  ? 'IBTE HNTec Award'
                  : profile.qualificationType === 'IB'
                  ? 'IB Points'
                  : profile.qualificationType === 'STPUB'
                  ? 'STPUB Pangkat'
                  : 'Calculated Tariff'}
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 tabular-nums">
                {profile.qualificationType === 'Politeknik-Diploma'
                  ? `${(profile.pbCgpa ?? 3.45).toFixed(2)}`
                  : profile.qualificationType === 'HNTec-IBTE'
                  ? `${profile.ibteAward || 'Merit'}`
                  : profile.qualificationType === 'IB'
                  ? `${profile.ibPoints ?? 34}`
                  : profile.qualificationType === 'STPUB'
                  ? `${profile.stpubGrade || 'Jayyid Jiddan'}`
                  : `${tariffPoints}`}
                <span className="text-xs sm:text-sm font-normal text-slate-500 ml-1">
                  {profile.qualificationType === 'Politeknik-Diploma' ? '/ 4.00' : profile.qualificationType === 'IB' ? '/ 45' : profile.qualificationType === 'A-Level' ? 'pts' : ''}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-800">
                ≈ {tariffPoints} UCAS equivalent
              </div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div className="text-xs space-y-1">
              {profile.qualificationType === 'Politeknik-Diploma' ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${(profile.pbCgpa ?? 3.45) >= 2.8 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className={(profile.pbCgpa ?? 3.45) >= 2.8 ? 'text-emerald-800 font-semibold' : 'text-slate-500'}>
                      UTB Year 2 Direct
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${(profile.pbCgpa ?? 3.45) >= 2.0 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className={(profile.pbCgpa ?? 3.45) >= 2.0 ? 'text-emerald-800 font-semibold' : 'text-slate-500'}>
                      Degree Top-Up / SBPP
                    </span>
                  </div>
                </>
              ) : profile.qualificationType === 'HNTec-IBTE' ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-emerald-800 font-semibold">
                      Politeknik Brunei Direct
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-amber-800 font-semibold">
                      Private HND / SBPP
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${tariffPoints >= 120 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className={tariffPoints >= 120 ? 'text-emerald-800 font-semibold' : 'text-slate-500'}>
                      MOE Overseas (120+)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${tariffPoints >= 64 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className={tariffPoints >= 64 ? 'text-emerald-800 font-semibold' : 'text-slate-500'}>
                      Local UBD/UTB (64–112+)
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick Qualification Switcher Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-6 border-b border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
            Stream:
          </span>
          {[
            { id: 'A-Level', label: '🎓 GCE A-Level' },
            { id: 'Politeknik-Diploma', label: '🏛️ Politeknik Brunei (Level 5 Diploma)' },
            { id: 'HNTec-IBTE', label: '⚙️ IBTE (HNTec Technical Certificate)' },
            { id: 'IB', label: '🌐 International Baccalaureate (IB)' },
            { id: 'STPUB', label: '🕌 STPUB (Sijil Tinggi Agama)' }
          ].map((qual) => (
            <button
              key={qual.id}
              type="button"
              onClick={() => handleSelectQualification(qual.id as QualificationType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                profile.qualificationType === qual.id
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {qual.label}
            </button>
          ))}
        </div>

        {/* Profile Inputs Grid - 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Institution / School
            </label>
            <select
              value={profile.school}
              onChange={(e) => {
                const newSchool = e.target.value;
                let newQual = profile.qualificationType;
                if (newSchool.includes('Politeknik')) newQual = 'Politeknik-Diploma';
                else if (newSchool.includes('IBTE')) newQual = 'HNTec-IBTE';
                else if (newSchool.includes('JIS') || newSchool.includes('ISB')) newQual = 'IB';
                else if (newSchool.includes('SMALHB') || newSchool.includes('Tahfiz')) newQual = 'STPUB';
                else newQual = 'A-Level';
                setProfile(prev => ({ ...prev, school: newSchool, qualificationType: newQual }));
              }}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              {BRUNEI_SIXTH_FORMS.map((school) => (
                <option key={school} value={school}>{school}</option>
              ))}
              {!BRUNEI_SIXTH_FORMS.includes(profile.school) && (
                <option value={profile.school}>{profile.school}</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Qualification Type
            </label>
            <select
              value={profile.qualificationType}
              onChange={(e) => handleSelectQualification(e.target.value as QualificationType)}
              className="w-full text-sm bg-amber-50/80 border-2 border-amber-400 font-semibold rounded-lg px-3 py-2 text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="A-Level">GCE A-Level</option>
              <option value="Politeknik-Diploma">Politeknik Brunei (Level 5 Diploma)</option>
              <option value="HNTec-IBTE">IBTE (HNTec Level 4 Certificate)</option>
              <option value="IB">International Baccalaureate (IB)</option>
              <option value="STPUB">STPUB (Sijil Tinggi Agama)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Brunei IC Status (Citizenship)
            </label>
            <select
              value={profile.icStatus}
              onChange={(e) => setProfile(prev => ({ ...prev, icStatus: e.target.value as ICStatus }))}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="Yellow IC (Citizen)">Yellow IC (Brunei Citizen - Scholarship Eligible)</option>
              <option value="Red IC (Permanent Resident)">Red IC (Permanent Resident)</option>
              <option value="Green IC / International">Green IC / International Student</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              O-Level Bahasa Melayu <span className="text-amber-800 font-bold">*Prerequisite</span>
            </label>
            <select
              value={profile.oLevelMalayGrade || 'B3'}
              onChange={(e) => setProfile(prev => ({ ...prev, oLevelMalayGrade: e.target.value }))}
              className={`w-full text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 ${
                hasMalayCredit 
                  ? 'bg-slate-50 border border-slate-300 text-slate-900 focus:ring-amber-500' 
                  : 'bg-amber-50 border-2 border-amber-400 text-amber-950 focus:ring-amber-600'
              }`}
            >
              {O_LEVEL_MALAY_GRADES.map((item) => (
                <option key={item.grade} value={item.grade}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              O-Level English Grade (or IELTS)
            </label>
            <select
              value={profile.oLevelEnglishGrade}
              onChange={(e) => setProfile(prev => ({ ...prev, oLevelEnglishGrade: e.target.value }))}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="A1">A1 (Distinction)</option>
              <option value="A2">A2 (Distinction)</option>
              <option value="B3">B3 (Credit - MOE & UK Safe)</option>
              <option value="B4">B4 (Credit - MOE Benchmark)</option>
              <option value="C5">C5 (Credit)</option>
              <option value="C6">C6 (Minimum Credit for UBD/UTB)</option>
              <option value="D7">D7 (Needs Resit or IELTS 6.5+)</option>
            </select>
          </div>
        </div>

        {/* Government Higher Education Institutions Prerequisite Callout */}
        <div className={`mt-5 p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed transition-all ${
          hasMalayCredit
            ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
            : 'bg-amber-50 border-2 border-amber-400/90 text-amber-950 shadow-xs'
        }`}>
          <div className="mt-0.5 shrink-0">
            {hasMalayCredit ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-xs mb-1 flex items-center gap-2">
              <span>Government Higher Education Prerequisite Policy:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                hasMalayCredit 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-200 text-amber-900 border border-amber-300'
              }`}>
                {hasMalayCredit 
                  ? `✓ Credit Verified (${profile.oLevelMalayGrade || 'B3'}) · Scholarship Eligible` 
                  : `⚠️ No Credit (${profile.oLevelMalayGrade}) · Fee-Paying Status Applies`}
              </span>
            </div>
            <p className={hasMalayCredit ? 'text-emerald-800' : 'text-amber-900 font-medium'}>
              {hasMalayCredit ? (
                <>
                  Under Brunei Ministry of Education policy, all government institutions (<strong>UBD, UTB, UNISSA, Politeknik Brunei, IBTE</strong>) require a minimum <strong>Credit (C6 or better) in GCE 'O' Level Bahasa Melayu</strong>. Your credit satisfies the prerequisite for <strong>100% Tuition Fee Exemption and BND $350/month Government Living Allowance</strong>.
                </>
              ) : (
                <>
                  <strong>CRITICAL REQUIREMENT:</strong> Under Brunei Government Higher Education policy, a <strong>Credit (Grade C6 or better) in GCE 'O' Level Bahasa Melayu</strong> is a mandatory prerequisite for the Brunei Government Local Scholarship. Since you do not currently hold a credit in Bahasa Melayu, you will be admitted to UBD, UTB, UNISSA, or Politeknik Brunei strictly as a <strong>Fee-Paying Student (Pelajar Berbayar)</strong> and will <strong>not receive the monthly living allowance ($350/mo)</strong> unless a credit is obtained.
                </>
              )}
            </p>
          </div>
        </div>

        {/* DYNAMIC QUALIFICATION PANEL: Politeknik Brunei, IBTE, IB, STPUB, or GCE A-Level */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          {profile.qualificationType === 'Politeknik-Diploma' ? (
            /* POLITEKNIK BRUNEI (LEVEL 5 DIPLOMA) PANEL */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <span>Politeknik Brunei (PB) Level 5 Diploma Profile</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your 3-year BDNVQ / BNQF Level 5 Diploma and input your Cumulative GPA (cGPA) out of 4.00.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    (profile.pbCgpa ?? 3.45) >= 3.50
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : (profile.pbCgpa ?? 3.45) >= 3.00
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-slate-100 text-slate-800 border border-slate-300'
                  }`}>
                    {(profile.pbCgpa ?? 3.45) >= 3.50 ? 'Distinction (Cemerlang)' : (profile.pbCgpa ?? 3.45) >= 3.00 ? 'Merit (Kepujian)' : 'Pass (Lulus)'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-200/70">
                {/* PB Diploma Program Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Diploma Programme
                  </label>
                  <select
                    value={profile.pbDiplomaProgram || 'Level 5 Diploma in Information Technology'}
                    onChange={(e) => setProfile(prev => ({ ...prev, pbDiplomaProgram: e.target.value }))}
                    className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {POLITEKNIK_DIPLOMAS.map((dip) => (
                      <option key={dip} value={dip}>{dip}</option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Accredited by BDNAC (BNQF Level 5 / UK HND Equivalence)
                  </span>
                </div>

                {/* PB cGPA Slider & Number Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Cumulative GPA (cGPA / 4.00)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="2.00"
                        max="4.00"
                        step="0.01"
                        value={profile.pbCgpa ?? 3.45}
                        onChange={(e) => setProfile(prev => ({ ...prev, pbCgpa: parseFloat(e.target.value) || 0 }))}
                        className="w-20 text-center font-mono font-bold text-sm bg-white border border-blue-300 rounded px-2 py-1 text-blue-950 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="text-xs text-slate-500 font-mono">/ 4.00</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="2.00"
                    max="4.00"
                    step="0.01"
                    value={profile.pbCgpa ?? 3.45}
                    onChange={(e) => setProfile(prev => ({ ...prev, pbCgpa: parseFloat(e.target.value) }))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>2.00 (Pass)</span>
                    <span>3.00 (Merit)</span>
                    <span>3.50 (Distinction)</span>
                    <span>4.00 (Max)</span>
                  </div>
                </div>
              </div>

              {/* 3 Real-time Articulation Opportunities for PB */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className={`p-3 rounded-lg border leading-relaxed ${
                  (profile.pbCgpa ?? 3.45) >= 2.80
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${(profile.pbCgpa ?? 3.45) >= 2.80 ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>UTB Direct Year 2 Entry</span>
                  </div>
                  {(profile.pbCgpa ?? 3.45) >= 2.80 ? (
                    <span className="text-[11px] text-emerald-800">
                      <strong>Qualified!</strong> Receive advanced standing and full 1-year credit exemptions into UTB Computing or Engineering degrees.
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      Requires cGPA 2.80+ (or department interview) for Year 2 direct entry.
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-lg border bg-amber-50/80 border-amber-200 text-amber-950 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>1-Year UK Degree Top-Up</span>
                  </div>
                  <span className="text-[11px] text-amber-900">
                    <strong>Guaranteed at LCB:</strong> Complete your full British University of Chester BA/BSc honours degree in just 1 Year (100% MOE SBPP loan eligible).
                  </span>
                </div>

                <div className="p-3 rounded-lg border bg-blue-50/80 border-blue-200 text-blue-950 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Award className="w-3.5 h-3.5 text-blue-700" />
                    <span>HECAS Degree Admission</span>
                  </div>
                  <span className="text-[11px] text-blue-900">
                    PB Diploma graduates are fully recognized for HECAS applications to UBD, UTB, and UNISSA with government monthly allowance.
                  </span>
                </div>
              </div>
            </div>
          ) : profile.qualificationType === 'HNTec-IBTE' ? (
            /* IBTE (HNTEC LEVEL 4 CERTIFICATE) PANEL */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 uppercase tracking-wider">
                    <Wrench className="w-4 h-4 text-amber-700" />
                    <span>IBTE Technical Education (HNTec) Profile</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your IBTE Campus, HNTec Programme, and Award classification to evaluate progression pathways.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300">
                    BNQF Level 4 Technical
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200/70">
                {/* IBTE Campus */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    IBTE Campus
                  </label>
                  <select
                    value={profile.ibteSchool || 'IBTE Sultan Saiful Rijal Campus'}
                    onChange={(e) => setProfile(prev => ({ ...prev, ibteSchool: e.target.value }))}
                    className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {IBTE_CAMPUSES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* IBTE Program */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    HNTec Programme
                  </label>
                  <select
                    value={profile.ibteProgram || 'HNTec in Information Technology'}
                    onChange={(e) => setProfile(prev => ({ ...prev, ibteProgram: e.target.value }))}
                    className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {IBTE_PROGRAMMES.map((prog) => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                </div>

                {/* IBTE Award */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Award Level
                  </label>
                  <select
                    value={profile.ibteAward || 'Merit'}
                    onChange={(e) => setProfile(prev => ({ ...prev, ibteAward: e.target.value as any }))}
                    className="w-full text-xs font-bold text-slate-900 bg-white border border-amber-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Distinction">Distinction (cGPA 3.50 - 4.00)</option>
                    <option value="Merit">Merit (cGPA 2.80 - 3.49)</option>
                    <option value="Pass">Pass (cGPA 2.00 - 2.79)</option>
                  </select>
                </div>

                {/* Cumulative GPA */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cumulative GPA
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="2.00"
                      max="4.00"
                      step="0.01"
                      value={profile.ibteCgpa ?? 3.20}
                      onChange={(e) => setProfile(prev => ({ ...prev, ibteCgpa: parseFloat(e.target.value) || 0 }))}
                      className="w-full text-center font-mono font-bold text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 font-mono shrink-0">/ 4.00</span>
                  </div>
                </div>
              </div>

              {/* IBTE Progression Opportunities */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className={`p-3 rounded-lg border leading-relaxed ${
                  profile.ibteAward === 'Distinction' || profile.ibteAward === 'Merit' || (profile.ibteCgpa ?? 3.2) >= 2.80
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <GraduationCap className={`w-3.5 h-3.5 ${profile.ibteAward !== 'Pass' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>Politeknik Brunei Diploma</span>
                  </div>
                  <span className="text-[11px] text-emerald-900">
                    <strong>Direct Admission:</strong> HNTec with Merit or Distinction satisfies direct entry into Politeknik Brunei 3-year Level 5 Diploma programmes.
                  </span>
                </div>

                <div className="p-3 rounded-lg border bg-purple-50/80 border-purple-200 text-purple-950 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Layers className="w-3.5 h-3.5 text-purple-700" />
                    <span>Private Pearson BTEC HND</span>
                  </div>
                  <span className="text-[11px] text-purple-900">
                    Direct entry into 2-year BTEC Level 5 HND at LCB or KIGS, eligible for 100% MOE SBPP study loan financing.
                  </span>
                </div>

                <div className="p-3 rounded-lg border bg-amber-50/80 border-amber-200 text-amber-950 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Fast-Track to Degree</span>
                  </div>
                  <span className="text-[11px] text-amber-900">
                    Step 1: IBTE HNTec → Step 2: PB Diploma (or BTEC HND) → Step 3: Direct Year 2 at UTB or 1-Year Top-up UK Degree!
                  </span>
                </div>
              </div>
            </div>
          ) : profile.qualificationType === 'IB' ? (
            /* INTERNATIONAL BACCALAUREATE (IB) PANEL */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    International Baccalaureate (IB) Diploma Score
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Input your total IB Diploma points score (maximum 45 points).
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-slate-900">
                    {profile.ibPoints ?? 34} / 45
                  </span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="range"
                  min="24"
                  max="45"
                  value={profile.ibPoints ?? 34}
                  onChange={(e) => setProfile(prev => ({ ...prev, ibPoints: parseInt(e.target.value) }))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <input
                  type="number"
                  min="24"
                  max="45"
                  value={profile.ibPoints ?? 34}
                  onChange={(e) => setProfile(prev => ({ ...prev, ibPoints: parseInt(e.target.value) || 24 }))}
                  className="w-20 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded px-2 py-1 text-slate-900"
                />
              </div>
            </div>
          ) : profile.qualificationType === 'STPUB' ? (
            /* STPUB (SIJIL TINGGI PELAJARAN UGAMA BRUNEI) PANEL */
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Sijil Tinggi Pelajaran Ugama Brunei (STPUB) Profile
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Graduates of Sekolah Menengah Arab Laki-Laki Hassanal Bolkiah (SMALHB) progressing to UNISSA, KUPU SB, or overseas Islamic universities.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    STPUB Pangkat (Overall Grade)
                  </label>
                  <select
                    value={profile.stpubGrade || 'Jayyid Jiddan'}
                    onChange={(e) => setProfile(prev => ({ ...prev, stpubGrade: e.target.value as any }))}
                    className="w-full text-xs font-bold text-slate-900 bg-white border border-emerald-300 rounded-lg px-3 py-2"
                  >
                    <option value="Mumtaz">Mumtaz (Distinction - Equivalent to 300+ pts)</option>
                    <option value="Jayyid Jiddan">Jayyid Jiddan (Very Good - Equivalent to 240 pts)</option>
                    <option value="Jayyid">Jayyid (Good - Equivalent to 180 pts)</option>
                    <option value="Maqbul">Maqbul (Pass - Equivalent to 140 pts)</option>
                  </select>
                </div>
                <div className="text-xs text-emerald-950 flex flex-col justify-center">
                  <span className="font-bold">UNISSA Direct Pathway:</span>
                  <span>Qualified for Bachelor of Laws (LL.B) & Bachelor of Shariah (BSL) Double Degree or Islamic Finance with Yellow IC + BM Credit.</span>
                </div>
              </div>
            </div>
          ) : (
            /* GCE A-LEVEL SUBJECTS & GRADES TABLE */
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Current / Predicted A-Level Subjects & Grades
                </span>
                <button
                  onClick={handleAddSubject}
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-900 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Subject
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {profile.subjects.map((sub, idx) => (
                  <div 
                    key={sub.id} 
                    className="flex items-center gap-2 p-3 bg-slate-50/80 border border-slate-200 rounded-lg"
                  >
                    <div className="text-xs font-mono text-slate-400 w-4">{idx + 1}.</div>
                    <select
                      value={sub.subject}
                      onChange={(e) => handleUpdateSubject(sub.id, 'subject', e.target.value)}
                      className="flex-1 text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded px-2 py-1.5"
                    >
                      {COMMON_SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    <select
                      value={sub.grade}
                      onChange={(e) => handleUpdateSubject(sub.id, 'grade', e.target.value)}
                      className="w-16 text-xs font-bold font-mono text-center bg-white border border-slate-300 rounded px-2 py-1.5 text-slate-900"
                    >
                      {Object.keys(A_LEVEL_TARIFF_MAP).map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>

                    <div className="text-xs font-mono text-slate-500 tabular-nums w-12 text-right">
                      {A_LEVEL_TARIFF_MAP[sub.grade]} pts
                    </div>

                    {profile.subjects.length > 1 && (
                      <button
                        onClick={() => handleRemoveSubject(sub.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove subject"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Guidance Alert for Bruneian Students with New Tariff Scale */}
              <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 space-y-2.5">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-semibold">New UCAS Tariff System:</span> The Ministry of Education (MOE) Government Overseas Scholarship requires at least <strong>120 points from 3 A-Level subjects (e.g. BBB)</strong>. Local admissions to UBD and UTB accept combinations from 64 to 112+ points (e.g. CC to BBC), with Medicine requiring 144 points (AAA).
                  </div>
                </div>

                {/* Grade breakdown pill row */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-amber-200/60 font-mono text-[11px]">
                  <span className="font-sans text-slate-600 font-semibold mr-1">New Points Scale:</span>
                  <span className="px-2 py-0.5 bg-white border border-amber-200 rounded font-bold text-amber-950">A* = 56 pts</span>
                  <span className="px-2 py-0.5 bg-white border border-amber-200 rounded font-bold text-amber-950">A = 48 pts</span>
                  <span className="px-2 py-0.5 bg-white border border-amber-200 rounded font-bold text-amber-950">B = 40 pts</span>
                  <span className="px-2 py-0.5 bg-white border border-amber-200 rounded font-bold text-amber-950">C = 32 pts</span>
                  <span className="px-2 py-0.5 bg-white border border-amber-200 rounded font-bold text-amber-950">D = 24 pts</span>
                  <span className="px-2 py-0.5 bg-white border border-amber-200 rounded font-bold text-amber-950">E = 16 pts</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 2: Explore Degree Pathways Catalog */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Higher Education Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Degree & Foundation Pathways</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Higher Education Degree & Foundation Catalog
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Comprehensive accredited programmes across Brunei government universities (UBD, UTB, UNISSA, PB), private colleges (LCB, KIGS, CCCT, Micronet, Kemuda, Bicpa-FTMS), and top overseas destinations.
            </p>
          </div>

          {/* Eligibility Toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto text-xs font-medium text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-2xs hover:bg-slate-50">
            <input
              type="checkbox"
              checked={showOnlyEligible}
              onChange={(e) => setShowOnlyEligible(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
            />
            <span>Show courses I qualify for ({tariffPoints}+ pts)</span>
          </label>
        </div>

        {/* Private Colleges & Foundation Bridge Educational Spotlight */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50/60 to-amber-50/70 border border-purple-200/80 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-600 text-white shrink-0 mt-0.5 shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-purple-950 text-sm">
                  Private College Foundations & Degrees in Brunei Darussalam
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-200/80 text-purple-900">
                  Direct UK / Limkokwing Twinning
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                  SBPP Loan Eligible
                </span>
              </div>
              <p>
                Did you know? If your A-Level points fall below 160 or you have 3–4 GCE 'O' Level credits, you can enter <strong>1-Year Pre-University Foundation Programmes</strong> at <strong>Laksamana College of Business (LCB)</strong>, <strong>Kolej International Graduate Studies (KIGS)</strong>, <strong>Cosmopolitan (CCCT)</strong>, <strong>Micronet (MIC)</strong>, or <strong>Kemuda Institute (KI)</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-medium text-[11px] text-slate-800">
                <div className="p-2 bg-white/80 rounded border border-purple-100">
                  <strong className="text-purple-900 block">1. Guaranteed Degree Bridge:</strong>
                  Complete a 1-year foundation to progress straight into Year 1 UK Honours Degrees (Chester, Essex, Salford) or Limkokwing.
                </div>
                <div className="p-2 bg-white/80 rounded border border-purple-100">
                  <strong className="text-amber-900 block">2. MOE SBPP Loan Financing:</strong>
                  Brunei citizens are eligible for up to 100% study financing under the Ministry of Education's SBPP loan scheme for approved local private degrees.
                </div>
                <div className="p-2 bg-white/80 rounded border border-purple-100">
                  <strong className="text-emerald-900 block">3. MKPK / Civil Service:</strong>
                  Degrees franchised at LCB, KIGS, and Micronet are accredited by MKPK (BDNAC) and recognized by the Public Service Commission (SPA).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Multi-Tier Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by degree, foundation, institution (UBD, LCB, KIGS, UTB, CCCT), or partner university..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
              />
            </div>

            {/* Destination Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full shrink-0">
              {[
                { id: 'all', label: 'All Destinations' },
                { id: 'local', label: 'Brunei Local' },
                { id: 'uk', label: 'United Kingdom' },
                { id: 'australia', label: 'Australia' }
              ].map(dest => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDestination(dest.id as StudyDestination)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedDestination === dest.id
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {dest.label}
                </button>
              ))}
            </div>
          </div>

          {/* Program Level Filter Bar (Foundation vs Degree vs Diploma) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs border-t border-slate-100">
            <span className="text-slate-500 shrink-0 font-medium mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-700" />
              <span>Level:</span>
            </span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'Foundation / Pre-University', label: 'Foundation / Pre-U (32+ pts / 4 O-Levels)' },
              { id: 'Undergraduate Degree', label: 'Undergraduate Degrees' },
              { id: 'Diploma / HND', label: 'Diploma / HND Pathways' }
            ].map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedProgramLevel(level.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedProgramLevel === level.id
                    ? 'bg-purple-900 text-white font-semibold shadow-2xs'
                    : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200/60'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>

          {/* Institution Type Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-500 shrink-0 font-medium mr-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-amber-700" />
              <span>Institution:</span>
            </span>
            {[
              { id: 'all', label: 'All Institutions' },
              { id: 'Private College', label: 'Brunei Private Colleges (LCB, KIGS, CCCT, MIC, KI, Bicpa)' },
              { id: 'Government University', label: 'Brunei Govt Universities (UBD, UTB, UNISSA, PB)' },
              { id: 'Overseas University', label: 'Overseas Universities (UK, Australia, Malaysia)' }
            ].map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedInstitutionType(inst.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedInstitutionType === inst.id
                    ? 'bg-amber-900 text-white font-semibold shadow-2xs'
                    : 'bg-amber-50/70 text-amber-950 hover:bg-amber-100 border border-amber-200/70'
                }`}
              >
                {inst.label}
              </button>
            ))}
          </div>

          {/* Field of Study Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-500 shrink-0 font-medium mr-1">Field:</span>
            {[
              { id: 'all', label: 'All Fields' },
              { id: 'Medicine & Health Sciences', label: 'Medicine & Health' },
              { id: 'Computer Science & AI', label: 'Computing & AI' },
              { id: 'Engineering & Technology', label: 'Engineering' },
              { id: 'Business, Economics & Finance', label: 'Business & Finance' },
              { id: 'Arts & Humanities', label: 'Creative Arts & Design' },
              { id: 'Law & Shariah', label: 'Law & Shariah' },
              { id: 'Natural & Environmental Sciences', label: 'Environmental' },
              { id: 'Architecture & Built Environment', label: 'Architecture' }
            ].map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id as FieldOfInterest)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedField === field.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {field.label}
              </button>
            ))}
          </div>

          {/* Funding Scheme Filter Bar (MOE Overseas vs SBPP vs Local Govt vs BSP) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-500 shrink-0 font-medium mr-1">Funding:</span>
            {[
              { id: 'all', label: 'All Funding Schemes' },
              { id: 'sbpp', label: 'SBPP Education Loan Approved (LCB, KIGS, Overseas)' },
              { id: 'local', label: 'Local Govt Scheme (HECAS: UBD, UTB, UNISSA, PB)' },
              { id: 'moe', label: 'MOE Overseas Scholarship (120+ pts)' },
              { id: 'bsp', label: 'BSP Energy Scholarship' }
            ].map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setSelectedFundingScheme(scheme.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedFundingScheme === scheme.id
                    ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {scheme.label}
              </button>
            ))}
          </div>

          {/* Technical Progression Filter Bar (PB Diploma vs IBTE) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 pt-2">
            <span className="text-slate-500 shrink-0 font-medium mr-1 flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-blue-700" />
              <span>Technical Progression:</span>
            </span>
            {[
              { id: 'all', label: 'All Entry Types' },
              { id: 'accepts-pb', label: '🏛️ Accepts PB Level 5 Diploma (UTB Year 2 / Top-Up)' },
              { id: 'accepts-ibte', label: '⚙️ Accepts IBTE HNTec (PB Diploma & Private HND)' }
            ].map((tech) => (
              <button
                key={tech.id}
                onClick={() => setSelectedTechnicalFilter(tech.id as any)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedTechnicalFilter === tech.id
                    ? 'bg-blue-900 text-white font-semibold shadow-2xs'
                    : 'bg-blue-50/70 text-blue-950 hover:bg-blue-100 border border-blue-200/70'
                }`}
              >
                {tech.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Criteria */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div>
            Showing <span className="font-semibold text-slate-800 tabular-nums">{filteredPrograms.length}</span> programmes
          </div>
          <div className="flex items-center gap-2">
            <span>Your Current Points: <strong className="font-mono text-slate-800">{tariffPoints} pts</strong></span>
          </div>
        </div>

        {/* Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPrograms.map((prog) => {
            const isEligible = tariffPoints >= prog.minPoints;
            const pointsDiff = prog.minPoints - tariffPoints;

            return (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Clean unboxed metadata with separators (Anti-slop) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5 font-medium flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        prog.programLevel === 'Foundation / Pre-University'
                          ? 'bg-purple-100 text-purple-900 border border-purple-200'
                          : prog.programLevel === 'Diploma / HND'
                          ? 'bg-teal-100 text-teal-900 border border-teal-200'
                          : 'bg-sky-100 text-sky-900 border border-sky-200'
                      }`}>
                        {prog.programLevel === 'Foundation / Pre-University' ? 'Foundation' : prog.programLevel === 'Diploma / HND' ? 'Diploma / HND' : 'Degree'}
                      </span>
                      <span>·</span>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prog.campusCountry}</span>
                      <span aria-hidden="true">·</span>
                      <span>{prog.field}</span>
                    </div>

                    {/* Eligibility state tag with icon */}
                    {isEligible ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium whitespace-nowrap">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Eligible</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-700 font-medium whitespace-nowrap">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>+{pointsDiff} pts needed</span>
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-amber-800 transition-colors cursor-pointer"
                    onClick={() => setActiveModalProgram(prog)}
                  >
                    {prog.name}
                  </h3>

                  {/* Institution Name & Partner University */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1.5 font-medium">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-800">{prog.institution}</span>
                    {prog.partnerUniversity && (
                      <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200/80">
                        {prog.partnerUniversity}
                      </span>
                    )}
                    {prog.hecasCode && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-500">HECAS: {prog.hecasCode}</span>
                      </>
                    )}
                  </div>

                  {/* Foundation Progression Guarantee Banner */}
                  {prog.foundationProgression && (
                    <div className="mt-3 p-2.5 bg-purple-50/80 rounded-lg border border-purple-200/80 text-[11px] text-purple-950 flex items-start gap-2 leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-900 font-bold block mb-0.5">Progression Route:</strong>
                        {prog.foundationProgression}
                      </div>
                    </div>
                  )}

                  {/* Politeknik Brunei Articulation Banner */}
                  {prog.polytechnicAcceptance && (
                    <div className="mt-2.5 p-2.5 bg-blue-50/80 rounded-lg border border-blue-200/80 text-[11px] text-blue-950 flex items-start gap-2 leading-relaxed">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-blue-900 font-bold block mb-0.5">Politeknik Brunei Diploma Pathway:</strong>
                        {prog.polytechnicAcceptance}
                      </div>
                    </div>
                  )}

                  {/* IBTE HNTec Pathway Banner */}
                  {prog.ibteAcceptance && (
                    <div className="mt-2.5 p-2.5 bg-amber-50/80 rounded-lg border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2 leading-relaxed">
                      <Award className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-900 font-bold block mb-0.5">IBTE HNTec Pathway:</strong>
                        {prog.ibteAcceptance}
                      </div>
                    </div>
                  )}

                  {/* Program Brief */}
                  <p className="text-xs text-slate-600 line-clamp-2 mt-3 leading-relaxed">
                    {prog.overview}
                  </p>

                  {/* Requirements & Fee Box */}
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span>Tariff Requirement:</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {prog.minPoints} UCAS pts
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px] line-clamp-1">
                      {prog.gradeRequirementText}
                    </div>
                    {prog.tuitionFeeLocal && (
                      <div className="flex items-center justify-between text-slate-700 font-medium pt-1 border-t border-slate-100/80 text-[11px]">
                        <span>Local Tuition & Loan:</span>
                        <span className="font-semibold text-amber-950">
                          {prog.tuitionFeeLocal}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Accreditation & Funding Status Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
                    {prog.mkpkAccredited && (
                      <span className="inline-flex items-center gap-1 text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>MKPK Accredited</span>
                      </span>
                    )}

                    {prog.sbppLoanApproved && (
                      <span className="inline-flex items-center gap-1 text-amber-900 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        <span>SBPP Loan Approved</span>
                      </span>
                    )}

                    {prog.moeScholarshipApproved && (
                      <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        <span>MOE Overseas (120+ pts)</span>
                      </span>
                    )}

                    {prog.localGovtApproved && (
                      <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded ${
                        hasMalayCredit 
                          ? 'text-blue-900 bg-blue-50 border border-blue-200' 
                          : 'text-rose-900 bg-rose-50 border border-rose-300'
                      }`}>
                        {hasMalayCredit ? (
                          <span>HECAS Local Scheme (Scholarship)</span>
                        ) : (
                          <span>Fee-Paying (No BM Credit)</span>
                        )}
                      </span>
                    )}

                    {prog.bspScholarshipApproved && (
                      <span className="inline-flex items-center gap-1 text-indigo-900 font-semibold bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        <span>BSP Approved</span>
                      </span>
                    )}
                  </div>

                  {/* Fee-Paying Warning Callout for Local Govt Institutions when BM credit is missing */}
                  {prog.localGovtApproved && !hasMalayCredit && profile.icStatus.includes('Yellow') && (
                    <div className="mt-2.5 p-2 bg-rose-50/80 rounded border border-rose-200 text-[11px] text-rose-900 flex items-start gap-1.5 leading-snug">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Fee-Paying Status:</strong> Meets tariff points but lacks O-Level Bahasa Melayu Credit (C6). Admitted as self-funding student without BND $350/mo allowance.
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalProgram(prog)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors cursor-pointer"
                  >
                    View Details & Prerequisites →
                  </button>

                  <button
                    onClick={() => onBookAlumniForCourse(prog.name)}
                    className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Ask Alumni
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-700">No matching programmes found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try adjusting your field filters, clearing search terms, or unchecking the points threshold.
            </p>
          </div>
        )}
      </section>

      {/* Program Deep Dive Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">
                  {activeModalProgram.campusCountry} · {activeModalProgram.institution}
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {activeModalProgram.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 my-6 text-sm text-slate-700">
              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">
                  Programme Overview & Structure
                </h4>
                <p className="text-xs leading-relaxed text-slate-600">
                  {activeModalProgram.overview}
                </p>
              </div>

              {/* Foundation Progression Highlight */}
              {activeModalProgram.foundationProgression && (
                <div className="p-3 bg-purple-50/90 rounded-xl border border-purple-200 text-xs text-purple-950 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-900 font-bold block mb-0.5">
                      Direct Foundation Progression Route:
                    </strong>
                    <span>{activeModalProgram.foundationProgression}</span>
                  </div>
                </div>
              )}

              {/* Politeknik Brunei Articulation Highlight */}
              {activeModalProgram.polytechnicAcceptance && (
                <div className="p-3.5 bg-blue-50/90 rounded-xl border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-900 font-bold block mb-0.5">
                      Politeknik Brunei (PB) Level 5 Diploma Articulation:
                    </strong>
                    <span className="leading-relaxed">{activeModalProgram.polytechnicAcceptance}</span>
                  </div>
                </div>
              )}

              {/* IBTE Progression Highlight */}
              {activeModalProgram.ibteAcceptance && (
                <div className="p-3.5 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-900 font-bold block mb-0.5">
                      IBTE HNTec Progression Pathway:
                    </strong>
                    <span className="leading-relaxed">{activeModalProgram.ibteAcceptance}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5">Level of Study</span>
                  <span className="font-semibold text-slate-900">{activeModalProgram.programLevel || 'Degree'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Duration</span>
                  <span className="font-semibold text-slate-900">{activeModalProgram.duration}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">HECAS / Course Code</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {activeModalProgram.hecasCode || 'Direct Private/Overseas'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Minimum Tariff Required</span>
                  <span className="font-mono font-bold text-slate-900">{activeModalProgram.minPoints} UCAS Points</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">MKPK Accreditation</span>
                  <span className="font-semibold text-emerald-800 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>MKPK Verified</span>
                  </span>
                </div>
                {activeModalProgram.partnerUniversity && (
                  <div>
                    <span className="text-slate-500 block mb-0.5">Awarding / Partner Univ</span>
                    <span className="font-semibold text-amber-900">{activeModalProgram.partnerUniversity}</span>
                  </div>
                )}
              </div>

              {/* Tuition & Local Loan Terms */}
              {activeModalProgram.tuitionFeeLocal && (
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs flex items-center justify-between gap-2">
                  <span className="text-amber-900 font-medium">Estimated Tuition & Financing:</span>
                  <span className="font-bold text-amber-950 font-mono">{activeModalProgram.tuitionFeeLocal}</span>
                </div>
              )}

              {/* Official Brunei Government Recognition & Funding Status Box */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2.5 text-xs">
                <span className="font-bold text-amber-950 uppercase tracking-wider block">
                  Brunei Government Funding & Scholarship Eligibility:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${activeModalProgram.moeScholarshipApproved ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span><strong>MOE Overseas Scheme:</strong> {activeModalProgram.moeScholarshipApproved ? 'Approved (120+ pts)' : 'Not Listed'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${activeModalProgram.sbppLoanApproved ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span><strong>SBPP Education Loan:</strong> {activeModalProgram.sbppLoanApproved ? 'Approved (Full/Tuition)' : 'Not Eligible'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${activeModalProgram.localGovtApproved ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span><strong>HECAS Local Scheme:</strong> {activeModalProgram.localGovtApproved ? 'Available (Tuition + Subsidy)' : 'N/A (Overseas/Private)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${activeModalProgram.bspScholarshipApproved ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span><strong>BSP Energy Scholarship:</strong> {activeModalProgram.bspScholarshipApproved ? 'Approved Energy Field' : 'Not Sponsored'}</span>
                  </div>
                </div>
                <div className="text-[11px] text-amber-900 pt-1.5 border-t border-amber-200/60">
                  Priority Sector: <strong>{activeModalProgram.moePrioritySector}</strong>
                </div>

                {/* Government Institutions O-Level BM Prerequisite Audit */}
                {activeModalProgram.localGovtApproved && (
                  <div className={`mt-2 p-3 rounded-lg border text-xs leading-relaxed ${
                    hasMalayCredit 
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}>
                    <div className="font-semibold flex items-center gap-1.5 mb-1">
                      {hasMalayCredit ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      <span>
                        Government Higher Education Prerequisite: Credit in O-Level Bahasa Melayu
                      </span>
                    </div>
                    <p className="text-[11px]">
                      {hasMalayCredit ? (
                        <>
                          <strong>Status: Prerequisite Met ({profile.oLevelMalayGrade || 'B3'}).</strong> As a Brunei Yellow IC citizen with O-Level BM credit, you qualify for 100% government tuition fee exemption and BND $350/month living allowance at this institution.
                        </>
                      ) : (
                        <>
                          <strong>Status: Prerequisite NOT Met ({profile.oLevelMalayGrade}).</strong> Under Brunei policy, students without a Credit (C6 or better) in GCE 'O' Level Bahasa Melayu are admitted strictly on a <strong>FEE-PAYING STATUS (Pelajar Berbayar)</strong> and are not entitled to the government scholarship or monthly allowance.
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                  Detailed Entry Requirements & Subject Prerequisites
                </h4>
                <p className="text-xs text-slate-600 bg-amber-50/50 p-3 rounded border border-amber-200/60">
                  {activeModalProgram.gradeRequirementText}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Brunei Career & National Development Prospects
                </h4>
                <div className="space-y-1.5">
                  {activeModalProgram.careerPathways.map((career, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <a
                href={activeModalProgram.officialUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 hover:underline"
              >
                <span>Visit Official Faculty Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const progName = activeModalProgram.name;
                    setActiveModalProgram(null);
                    onBookAlumniForCourse(progName);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Ask a Bruneian Graduate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
