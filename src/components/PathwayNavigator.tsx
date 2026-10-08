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
import { IBTE_HNTEC_CATALOG, IBTE_DIPLOMA_CATALOG, getIbteProgramByName } from '../data/ibteData';
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
  O_LEVEL_MALAY_GRADES,
  getHigherProgramLevels,
  isHigherLevelProgram,
  getHigherLevelsDescription,
  checkProgramEligibility,
  getProgramDisciplineRequirements,
  getDisciplineRequirementLabel,
  ProgramEligibilityResult
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
  CheckCircle2,
  Stethoscope,
  X,
  RotateCcw
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProgram, setActiveModalProgram] = useState<UniversityProgram | null>(null);
  const [showOnlyEligible, setShowOnlyEligible] = useState(false);
  const [autoFilterHigherLevel, setAutoFilterHigherLevel] = useState(true);

  const tariffPoints = calculateStudentTariff(profile);
  const hasMalayCredit = hasOLevelMalayCredit(profile.oLevelMalayGrade || 'B3');
  const qualDetails = getQualificationDetails(profile);

  // Quick qualification selector handler that also syncs default school
  const handleSelectQualification = (newQual: QualificationType) => {
    let newSchool = profile.school;
    let extraProfileUpdates: Partial<StudentProfile> = {};

    if (newQual === 'Politeknik-Diploma') {
      newSchool = 'Politeknik Brunei (PB)';
    } else if (newQual === 'IBTE-Diploma') {
      newSchool = 'IBTE (Institute of Brunei Technical Education)';
      extraProfileUpdates.ibteProgram = profile.ibteProgram && profile.ibteProgram.toLowerCase().includes('diploma') ? profile.ibteProgram : IBTE_DIPLOMA_CATALOG[0].name;
    } else if (newQual === 'HNTec-IBTE') {
      newSchool = 'IBTE (Institute of Brunei Technical Education)';
      extraProfileUpdates.ibteProgram = profile.ibteProgram && !profile.ibteProgram.toLowerCase().includes('diploma') ? profile.ibteProgram : IBTE_HNTEC_CATALOG[0].name;
    } else if (newQual === 'STPUB') {
      newSchool = 'Sekolah Menengah Arab Laki-Laki Hassanal Bolkiah (SMALHB)';
    } else if (newQual === 'IB') {
      newSchool = 'Jerudong International School (JIS)';
    } else if (newQual === 'A-Level') {
      if (profile.school.includes('Politeknik') || profile.school.includes('IBTE') || profile.school.includes('SMALHB')) {
        newSchool = 'Maktab Duli Pengiran Muda Al-Muhtadee Billah (MDPMAMB)';
      }
    }

    const higherLevels = getHigherProgramLevels(newQual);
    if (selectedProgramLevel !== 'all' && !higherLevels.includes(selectedProgramLevel as any)) {
      setSelectedProgramLevel('all');
    }

    setProfile(prev => ({
      ...prev,
      ...extraProfileUpdates,
      qualificationType: newQual,
      school: newSchool
    }));
  };

  const isALevelSelected = profile.qualificationType === 'A-Level';

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

  // Reset all active filters
  const handleResetFilters = () => {
    setSelectedField('all');
    setSelectedDestination('all');
    setSelectedFundingScheme('all');
    setSelectedProgramLevel('all');
    setSelectedInstitutionType('all');
    setSearchQuery('');
  };

  const isAnyFilterActive = 
    searchQuery.trim() !== '' ||
    selectedDestination !== 'all' ||
    selectedField !== 'all' ||
    selectedFundingScheme !== 'all' ||
    selectedProgramLevel !== 'all' ||
    selectedInstitutionType !== 'all';

  // Filter programs
  const filteredPrograms = UNIVERSITY_PROGRAMS.filter(program => {
    const isHigher = isHigherLevelProgram(program.programLevel, profile.qualificationType);

    // Auto-filter: only show higher level programs than current qualification
    if (autoFilterHigherLevel && !isHigher) {
      return false;
    }

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

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        program.name.toLowerCase().includes(q) ||
        program.institution.toLowerCase().includes(q) ||
        (program.field && program.field.toLowerCase().includes(q)) ||
        (program.partnerUniversity && program.partnerUniversity.toLowerCase().includes(q)) ||
        (program.programLevel && program.programLevel.toLowerCase().includes(q)) ||
        (program.gradeRequirementText && program.gradeRequirementText.toLowerCase().includes(q)) ||
        (program.subjectPrerequisites && program.subjectPrerequisites.some(s => s.toLowerCase().includes(q))) ||
        (program.careerPathways && program.careerPathways.some(c => c.toLowerCase().includes(q))) ||
        (program.foundationProgression && program.foundationProgression.toLowerCase().includes(q)) ||
        (program.polytechnicAcceptance && program.polytechnicAcceptance.toLowerCase().includes(q)) ||
        (program.ibteAcceptance && program.ibteAcceptance.toLowerCase().includes(q)) ||
        program.overview.toLowerCase().includes(q) ||
        program.moePrioritySector.toLowerCase().includes(q) ||
        (program.hecasCode && program.hecasCode.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Eligibility toggle: Must be a higher-level program than current qualification AND meet entry / articulation criteria
    if (showOnlyEligible) {
      if (!isHigher) return false;
      const eligibility = checkProgramEligibility(program, profile, tariffPoints);
      if (!eligibility.isEligible) {
        return false;
      }
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
                ? 'Input your Politeknik Brunei (PB) Advanced Diploma cGPA to evaluate degree pathways and direct Year 2 entry into UTB (case-to-case basis) / UBD.'
                : profile.qualificationType === 'IBTE-Diploma'
                ? 'Input your IBTE Diploma cGPA to evaluate degree pathways and direct Year 2 entry into UTB (case-to-case basis) / UBD, MoE Overseas.'
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
                  : profile.qualificationType === 'IBTE-Diploma'
                  ? 'IBTE Diploma cGPA'
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
                  : profile.qualificationType === 'IBTE-Diploma'
                  ? `${(profile.ibteCgpa ?? 3.40).toFixed(2)}`
                  : profile.qualificationType === 'HNTec-IBTE'
                  ? `${profile.ibteAward || 'Merit'}`
                  : profile.qualificationType === 'IB'
                  ? `${profile.ibPoints ?? 34}`
                  : profile.qualificationType === 'STPUB'
                  ? `${profile.stpubGrade || 'Jayyid Jiddan'}`
                  : `${tariffPoints}`}
                <span className="text-xs sm:text-sm font-normal text-slate-500 ml-1">
                  {profile.qualificationType === 'Politeknik-Diploma' || profile.qualificationType === 'IBTE-Diploma' ? '/ 4.00' : profile.qualificationType === 'IB' ? '/ 45' : profile.qualificationType === 'A-Level' ? 'pts' : ''}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-800">
                ≈ {tariffPoints} UCAS equivalent
              </div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div className="text-xs space-y-1">
              {profile.qualificationType === 'Politeknik-Diploma' || profile.qualificationType === 'IBTE-Diploma' ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${((profile.qualificationType === 'IBTE-Diploma' ? (profile.ibteCgpa ?? 3.40) : (profile.pbCgpa ?? 3.45))) >= 2.8 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className={((profile.qualificationType === 'IBTE-Diploma' ? (profile.ibteCgpa ?? 3.40) : (profile.pbCgpa ?? 3.45))) >= 2.8 ? 'text-emerald-800 font-semibold' : 'text-slate-500'}>
                      UTB Year 2 (Case-by-Case)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${((profile.qualificationType === 'IBTE-Diploma' ? (profile.ibteCgpa ?? 3.40) : (profile.pbCgpa ?? 3.45))) >= 2.0 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    <span className={((profile.qualificationType === 'IBTE-Diploma' ? (profile.ibteCgpa ?? 3.40) : (profile.pbCgpa ?? 3.45))) >= 2.0 ? 'text-emerald-800 font-semibold' : 'text-slate-500'}>
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
            { id: 'Politeknik-Diploma', label: '🏛️ Politeknik Brunei (Advanced Diploma)' },
            { id: 'IBTE-Diploma', label: '📜 IBTE (Diploma)' },
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
                else if (newSchool.includes('IBTE')) newQual = profile.qualificationType === 'IBTE-Diploma' ? 'IBTE-Diploma' : 'HNTec-IBTE';
                else if (newSchool.includes('JIS') || newSchool.includes('ISB')) newQual = 'IB';
                else if (newSchool.includes('SMALHB') || newSchool.includes('Tahfiz')) newQual = 'STPUB';
                else newQual = 'A-Level';

                const higherLevels = getHigherProgramLevels(newQual);
                if (selectedProgramLevel !== 'all' && !higherLevels.includes(selectedProgramLevel as any)) {
                  setSelectedProgramLevel('all');
                }

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
              <option value="Politeknik-Diploma">Politeknik Brunei (Advanced Diploma)</option>
              <option value="IBTE-Diploma">IBTE (Diploma)</option>
              <option value="HNTec-IBTE">IBTE (HNTec Level 4 Technical Certificate)</option>
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
            /* POLITEKNIK BRUNEI (ADVANCED DIPLOMA) PANEL */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <span>Politeknik Brunei (PB) Advanced Diploma Profile</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your 3-year BDNVQ / BNQF Advanced Diploma and input your Cumulative GPA (cGPA) out of 4.00.
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
                    value={profile.pbDiplomaProgram || 'Advanced Diploma in Information Technology'}
                    onChange={(e) => setProfile(prev => ({ ...prev, pbDiplomaProgram: e.target.value }))}
                    className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {POLITEKNIK_DIPLOMAS.map((dip) => (
                      <option key={dip} value={dip}>{dip}</option>
                    ))}
                  </select>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Accredited by BDNAC (Advanced Diploma / UK HND Equivalence)
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
                    <span>UTB Year 2 (Case-by-Case)</span>
                  </div>
                  {(profile.pbCgpa ?? 3.45) >= 2.80 ? (
                    <span className="text-[11px] text-emerald-800">
                      <strong>Threshold Met (cGPA ≥ 2.80):</strong> Eligible to apply for Direct Year 2. Note: Direct Year 2 admission is granted on a <strong>case-to-case basis</strong> subject to faculty syllabus mapping &amp; module exemptions; otherwise Year 1 admission applies.
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      Requires cGPA 2.80+ to be considered for Year 2 direct entry (granted on a case-to-case basis). Applicants below 2.80 are considered for Year 1.
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
          ) : profile.qualificationType === 'HNTec-IBTE' || profile.qualificationType === 'IBTE-Diploma' ? (
            /* IBTE (LEVEL 5 DIPLOMA & HNTEC LEVEL 4) PANEL */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 uppercase tracking-wider">
                    <Wrench className="w-4 h-4 text-amber-700" />
                    <span>IBTE Technical Education (Diploma &amp; HNTec) Profile</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your IBTE Programme (Diploma or HNTec) and award classification to evaluate progression into Politeknik Brunei, UTB, and industry.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300">
                    {profile.qualificationType === 'IBTE-Diploma' || profile.ibteProgram?.toLowerCase().includes('diploma') ? 'Diploma' : 'HNTec Technical'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200/70">
                {/* Programme Level */}
                <div className="lg:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Programme Level
                  </label>
                  <select
                    value={profile.qualificationType === 'IBTE-Diploma' || profile.ibteProgram?.toLowerCase().includes('diploma') ? 'Diploma' : 'HNTec'}
                    onChange={(e) => {
                      if (e.target.value === 'Diploma') {
                        setProfile(prev => ({ 
                          ...prev, 
                          qualificationType: 'IBTE-Diploma',
                          ibteProgram: IBTE_DIPLOMA_CATALOG[0].name 
                        }));
                      } else {
                        setProfile(prev => ({ 
                          ...prev, 
                          qualificationType: 'HNTec-IBTE',
                          ibteProgram: IBTE_HNTEC_CATALOG[0].name 
                        }));
                      }
                    }}
                    className="w-full text-xs font-bold text-amber-950 bg-white border border-amber-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Diploma">Diploma (All Programmes)</option>
                    <option value="HNTec">HNTec (Level 4 Technical)</option>
                  </select>
                </div>

                {/* IBTE Program Dropdown (Expanded for all official Diplomas) */}
                <div className="sm:col-span-2 lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>IBTE Programme</span>
                    <span className="text-[10px] text-amber-900 font-normal">
                      {IBTE_DIPLOMA_CATALOG.length} Diplomas available
                    </span>
                  </label>
                  <select
                    value={profile.ibteProgram || IBTE_DIPLOMA_CATALOG[0].name}
                    onChange={(e) => {
                      const newProg = e.target.value;
                      const isDip = newProg.toLowerCase().includes('diploma');
                      setProfile(prev => ({ 
                        ...prev, 
                        ibteProgram: newProg,
                        qualificationType: isDip ? 'IBTE-Diploma' : 'HNTec-IBTE'
                      }));
                    }}
                    className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {/* Diplomas Grouped by Academic School & Discipline */}
                    <optgroup label="⚡ Energy, Chemical & Petrochemical Engineering">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-refinery-petrochemical' || 
                        p.id === 'ibte-dip-control-automation' || 
                        p.id === 'ibte-dip-chemical-eng' || 
                        p.id === 'ibte-dip-plant-eng' || 
                        p.id === 'ibte-dip-instrumentation-control'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="⚙️ Mechanical, Electrical & Automotive Engineering">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-mech-eng' || 
                        p.id === 'ibte-dip-elec-electronic' || 
                        p.id === 'ibte-dip-telecom-network' || 
                        p.id === 'ibte-dip-electronic-comm' || 
                        p.id === 'ibte-dip-automotive-tech' || 
                        p.id === 'ibte-dip-aircraft-maintenance'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="🏛️ Civil Engineering & Built Environment">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-civil-eng' || 
                        p.id === 'ibte-dip-building-services' || 
                        p.id === 'ibte-dip-architectural-tech' || 
                        p.id === 'ibte-dip-quantity-surveying' || 
                        p.id === 'ibte-dip-geomatics'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="💻 Computing, Data Analytics & Cybersecurity">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-it' || 
                        p.id === 'ibte-dip-data-analytics' || 
                        p.id === 'ibte-dip-network-cyber' || 
                        p.id === 'ibte-dip-web-digital-media'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="📈 Business, Accounting & Supply Chain">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-business-admin' || 
                        p.id === 'ibte-dip-accounting-finance' || 
                        p.id === 'ibte-dip-marketing-digital' || 
                        p.id === 'ibte-dip-human-resource' || 
                        p.id === 'ibte-dip-logistics-supply-chain'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="🍽️ Hospitality, Culinary Arts & Tourism">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-culinary-ops' || 
                        p.id === 'ibte-dip-hospitality-mgmt' || 
                        p.id === 'ibte-dip-tourism-mgmt' || 
                        p.id === 'ibte-dip-event-mgmt' || 
                        p.id === 'ibte-dip-pastry-bakery'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="🌿 Agro-Technology, Food Science & Applied Sciences">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-agrotechnology' || 
                        p.id === 'ibte-dip-food-science' || 
                        p.id === 'ibte-dip-veterinary-animal' || 
                        p.id === 'ibte-dip-aquaculture'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="⚓ Brunei Maritime Academy (BMA)">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-marine-eng' || 
                        p.id === 'ibte-dip-nautical-studies'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="📚 Technical Education & Pedagogy">
                      {IBTE_DIPLOMA_CATALOG.filter(p => 
                        p.id === 'ibte-dip-tech-education'
                      ).map(prog => (
                        <option key={prog.id} value={prog.name}>{prog.name}</option>
                      ))}
                    </optgroup>

                    <optgroup label="⚙️ IBTE HNTec Programmes (Level 4 Technical)">
                      {IBTE_HNTEC_CATALOG.map((prog) => (
                        <option key={prog.id} value={prog.name}>
                          {prog.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* IBTE Award */}
                <div className="lg:col-span-1">
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
                <div className="lg:col-span-1">
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

              {/* Selected IBTE Programme Deep-Dive Card */}
              {(() => {
                const selectedProg = getIbteProgramByName(profile.ibteProgram || IBTE_DIPLOMA_CATALOG[0].name);
                if (!selectedProg) return null;
                const isDiploma = selectedProg.name.toLowerCase().includes('diploma');
                const pbArtic = 'pbArticulationDiploma' in selectedProg ? selectedProg.pbArticulationDiploma : null;
                
                return (
                  <div className="p-4 bg-white rounded-xl border border-amber-300/80 shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            {selectedProg.cluster}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {selectedProg.school} · {isDiploma ? 'Diploma' : 'HNTec'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {selectedProg.name}
                        </h4>
                      </div>
                      <div className="text-[11px] text-slate-500 sm:text-right">
                        <span className="font-semibold block text-slate-700">Official Duration:</span>
                        <span>{selectedProg.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedProg.overview}
                    </p>

                    {/* Core competencies */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[11px] font-semibold text-slate-500 mr-1">Key Modules &amp; Skills:</span>
                      {selectedProg.keyCompetencies.map((comp, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded text-[10px] font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>

                    {/* Articulation & Employment mapping */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1">
                        <span className="font-bold text-emerald-950 flex items-center gap-1 text-xs">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{isDiploma ? 'University Degree Articulation' : 'Politeknik Brunei Direct Articulation'}</span>
                        </span>
                        {pbArtic && (
                          <p className="text-[11px] text-emerald-900 font-medium">
                            {pbArtic}
                          </p>
                        )}
                        <span className="text-[11px] text-emerald-800 font-semibold block">
                          Degree Articulation: <strong>{selectedProg.utbDegreeTarget}</strong>
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                        <span className="font-bold text-slate-800 flex items-center gap-1 text-xs">
                          <Building className="w-3.5 h-3.5 text-blue-600" />
                          <span>Industry Opportunities &amp; Key Employers in Brunei</span>
                        </span>
                        <p className="text-[11px] text-slate-600">
                          {selectedProg.industryOpportunities.join(' · ')}
                        </p>
                        <span className="text-[10px] text-emerald-700 font-medium block">
                          ✓ National TVET qualification accredited by BDNAC (MKPK)
                        </span>
                      </div>
                    </div>

                    {/* Entry requirement */}
                    <div className="text-[11px] text-slate-500 pt-1 flex items-start gap-1.5 bg-amber-50/40 p-2 rounded border border-amber-200/50">
                      <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span><strong>Admission Requirements:</strong> {selectedProg.entryRequirements}</span>
                    </div>
                  </div>
                );
              })()}

              {/* IBTE Progression Opportunities */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className={`p-3 rounded-lg border leading-relaxed ${
                  profile.ibteAward === 'Distinction' || profile.ibteAward === 'Merit' || (profile.ibteCgpa ?? 3.2) >= 2.80
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <GraduationCap className={`w-3.5 h-3.5 ${profile.ibteAward !== 'Pass' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>Politeknik Brunei Advanced Diploma</span>
                  </div>
                  <span className="text-[11px] text-emerald-900">
                    <strong>Direct Admission:</strong> HNTec with Merit or Distinction satisfies direct entry into Politeknik Brunei 3-year Advanced Diploma programmes.
                  </span>
                </div>

                <div className="p-3 rounded-lg border bg-purple-50/80 border-purple-200 text-purple-950 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Layers className="w-3.5 h-3.5 text-purple-700" />
                    <span>Private Pearson BTEC HND</span>
                  </div>
                  <span className="text-[11px] text-purple-900">
                    Direct entry into 2-year BTEC HND at LCB or KIGS, eligible for 100% MOE SBPP study loan financing.
                  </span>
                </div>

                <div className="p-3 rounded-lg border bg-amber-50/80 border-amber-200 text-amber-950 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Degree Progression</span>
                  </div>
                  <span className="text-[11px] text-amber-900">
                    {profile.qualificationType === 'IBTE-Diploma' || profile.ibteProgram?.toLowerCase().includes('diploma')
                      ? 'IBTE Diploma → Eligible for Direct Year 2 at UTB (case-to-case basis) & UBD degree programmes (or 1-Year Top-up UK Degree)!'
                      : 'Step 1: IBTE HNTec → Step 2: PB Advanced Diploma (or BTEC HND) → Step 3: UTB Year 2 (case-to-case) or 1-Year Top-up UK Degree!'}
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

          {/* Eligibility & Higher-Level Auto-Filter Toggles */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-950 bg-emerald-50 border border-emerald-300 px-3 py-2 rounded-lg shadow-2xs hover:bg-emerald-100/70 transition-colors">
              <input
                type="checkbox"
                checked={autoFilterHigherLevel}
                onChange={(e) => setAutoFilterHigherLevel(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Auto-filter: Higher level programs only</span>
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={showOnlyEligible}
                onChange={(e) => setShowOnlyEligible(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
              />
              <span>Show courses I qualify for ({tariffPoints}+ pts)</span>
            </label>
          </div>
        </div>

        {/* Quick Focus Spotlights: Medicine & Healthcare + Private College Degrees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Spotlight A: Medical & Health Sciences Priority Track */}
          <div className="bg-gradient-to-br from-blue-900 via-sky-950 to-slate-900 text-white p-4 sm:p-5 rounded-xl border border-blue-800/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/30 text-blue-200 border border-blue-400/40 rounded text-[10px] font-bold uppercase tracking-wider">
                  <Stethoscope className="w-3 h-3" />
                  Medical &amp; Health Track
                </span>
                <span className="text-[10px] text-blue-300">MOE Priority Circular 14/2025</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Clinical Medicine, Dentistry &amp; Health Sciences
              </h3>
              <p className="text-xs text-blue-200/90 leading-relaxed mb-3">
                UBD PAPRSB IHS (twinning with Aberdeen, Glasgow, ANU) &amp; top UK medical schools (KCL, Imperial, UCL, Edinburgh, Dundee).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-blue-800/70">
              <button
                type="button"
                onClick={() => {
                  setSelectedField('Medicine & Health Sciences');
                  setSelectedDestination('local');
                  setSelectedProgramLevel('all');
                  setSelectedFundingScheme('all');
                  setSearchQuery('');
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedField === 'Medicine & Health Sciences' && selectedDestination === 'local'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                🏛️ UBD PAPRSB IHS
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedField('Medicine & Health Sciences');
                  setSelectedDestination('uk');
                  setSelectedProgramLevel('all');
                  setSelectedFundingScheme('all');
                  setSearchQuery('');
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedField === 'Medicine & Health Sciences' && selectedDestination === 'uk'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                🇬🇧 UK Medical Schools
              </button>
              {selectedField === 'Medicine & Health Sciences' && (
                <button
                  type="button"
                  onClick={() => setSelectedField('all')}
                  className="text-xs text-amber-300 hover:underline ml-auto cursor-pointer"
                >
                  Reset Field ✕
                </button>
              )}
            </div>
          </div>

          {/* Spotlight B: Private College Degrees & Foundation Bridge */}
          <div className="bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-xl border border-purple-800/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded text-[10px] font-bold uppercase tracking-wider">
                  <Layers className="w-3 h-3" />
                  Private College Bridge
                </span>
                <span className="text-[10px] text-amber-300 font-semibold">100% MOE SBPP Loan Eligible</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Local Private Honours Degrees &amp; UK Twinning
              </h3>
              <p className="text-xs text-purple-200/90 leading-relaxed mb-3">
                LCB (Chester &amp; Essex), KIGS (Limkokwing), Micronet (Salford), CCCT, &amp; Kemuda. 1-Year Pre-U Foundation bridges or direct degree top-ups.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-purple-800/70">
              <button
                type="button"
                onClick={() => {
                  setSelectedInstitutionType('Private College');
                  setSelectedFundingScheme('sbpp');
                  setSelectedDestination('local');
                  setSearchQuery('');
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedInstitutionType === 'Private College' && selectedFundingScheme === 'sbpp'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                🎓 SBPP Private Degrees
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProgramLevel('Foundation / Pre-University');
                  setSelectedDestination('local');
                  setSearchQuery('');
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors cursor-pointer ${
                  selectedProgramLevel === 'Foundation / Pre-University'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                🌉 1-Year Pre-U Foundation
              </button>
              {(selectedInstitutionType === 'Private College' || selectedProgramLevel === 'Foundation / Pre-University') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedInstitutionType('all');
                    setSelectedProgramLevel('all');
                    setSelectedFundingScheme('all');
                  }}
                  className="text-xs text-amber-300 hover:underline ml-auto cursor-pointer"
                >
                  Reset ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search & Multi-Tier Filter Console */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
          {/* Row 1: Search Input & Destination Segmented Control */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by degree (e.g., Computer Science, Civil, Medicine, Accounting), institution, or keyword..."
                className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 p-0.5 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Destination Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full shrink-0">
              {[
                { id: 'all', label: 'All Destinations' },
                { id: 'local', label: '🇧🇳 Brunei Local' },
                { id: 'uk', label: '🇬🇧 United Kingdom' },
                { id: 'australia', label: '🇦🇺 Australia' }
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

          {/* Row 2: Clean 4-Column Dropdown Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-slate-100">
            {/* Field of Study */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Field of Study
              </label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value as FieldOfInterest)}
                className={`w-full text-xs py-2 px-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer transition-colors ${
                  selectedField !== 'all'
                    ? 'bg-amber-50/70 border-amber-300 font-semibold text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <option value="all">All Fields of Study</option>
                <option value="Medicine & Health Sciences">🩺 Medicine & Health Sciences</option>
                <option value="Computer Science & AI">💻 Computing & AI</option>
                <option value="Engineering & Technology">⚙️ Engineering & Technology</option>
                <option value="Business, Economics & Finance">📈 Business, Economics & Finance</option>
                <option value="Arts & Humanities">🎨 Creative Arts & Humanities</option>
                <option value="Law & Shariah">⚖️ Law & Shariah</option>
                <option value="Natural & Environmental Sciences">🌿 Environmental Sciences</option>
                <option value="Architecture & Built Environment">🏛️ Architecture & Built Environment</option>
              </select>
            </div>

            {/* Program Level */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Program Level
              </label>
              {(() => {
                const higherLevels = getHigherProgramLevels(profile.qualificationType);
                return (
                  <select
                    value={selectedProgramLevel}
                    onChange={(e) => setSelectedProgramLevel(e.target.value)}
                    className={`w-full text-xs py-2 px-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer transition-colors ${
                      selectedProgramLevel !== 'all'
                        ? 'bg-purple-50/70 border-purple-300 font-semibold text-purple-950'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {autoFilterHigherLevel ? (
                      <>
                        <option value="all">
                          {higherLevels.length === 1 ? 'All Higher Levels (Undergraduate Degrees)' : 'All Higher Levels (Diplomas & Degrees)'}
                        </option>
                        {higherLevels.includes('Undergraduate Degree') && (
                          <option value="Undergraduate Degree">🎓 Undergraduate Degrees (Level 6)</option>
                        )}
                        {higherLevels.includes('Diploma / HND') && (
                          <option value="Diploma / HND">📜 Advanced Diploma / Diploma / HND</option>
                        )}
                      </>
                    ) : (
                      <>
                        <option value="all">All Program Levels</option>
                        <option value="Undergraduate Degree">🎓 Undergraduate Degrees (Level 6)</option>
                        <option value="Diploma / HND">📜 Advanced Diploma / Diploma / HND</option>
                        <option value="Foundation / Pre-University">🌉 Foundation / Pre-U Bridge</option>
                      </>
                    )}
                  </select>
                );
              })()}
            </div>

            {/* Institution Category */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Institution Category
              </label>
              <select
                value={selectedInstitutionType}
                onChange={(e) => setSelectedInstitutionType(e.target.value)}
                className={`w-full text-xs py-2 px-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer transition-colors ${
                  selectedInstitutionType !== 'all'
                    ? 'bg-blue-50/70 border-blue-300 font-semibold text-blue-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <option value="all">All Institutions</option>
                <option value="Government University">🏛️ Brunei Govt Universities (UBD, UTB, UNISSA, PB)</option>
                <option value="Private College">🎓 Brunei Private Colleges (LCB, KIGS, CCCT, MIC)</option>
                <option value="Overseas University">🌐 Overseas Universities (UK, Australia, Malaysia)</option>
              </select>
            </div>

            {/* Funding & Scholarship */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Funding &amp; Scholarship
              </label>
              <select
                value={selectedFundingScheme}
                onChange={(e) => setSelectedFundingScheme(e.target.value)}
                className={`w-full text-xs py-2 px-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer transition-colors ${
                  selectedFundingScheme !== 'all'
                    ? 'bg-emerald-50/70 border-emerald-300 font-semibold text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <option value="all">All Funding Schemes</option>
                <option value="local">🏛️ Local Govt Scheme (HECAS Tuition-Free)</option>
                <option value="sbpp">💳 SBPP Education Loan Scheme</option>
                <option value="moe">✈️ MOE Overseas Scholarship (120+ pts)</option>
                <option value="bsp">⚡ BSP Energy Scholarship</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Clear All */}
          {isAnyFilterActive && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 text-[11px] font-medium mr-1">Active Filters:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-800 rounded-md text-[11px]">
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button type="button" onClick={() => setSearchQuery('')} className="hover:text-rose-600 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedDestination !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-800 rounded-md text-[11px]">
                  <span>Destination: {selectedDestination.toUpperCase()}</span>
                  <button type="button" onClick={() => setSelectedDestination('all')} className="hover:text-rose-600 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedField !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-[11px]">
                  <span>Field: {selectedField}</span>
                  <button type="button" onClick={() => setSelectedField('all')} className="hover:text-rose-600 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedProgramLevel !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-md text-[11px]">
                  <span>Level: {selectedProgramLevel}</span>
                  <button type="button" onClick={() => setSelectedProgramLevel('all')} className="hover:text-rose-600 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedInstitutionType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-md text-[11px]">
                  <span>Institution: {selectedInstitutionType}</span>
                  <button type="button" onClick={() => setSelectedInstitutionType('all')} className="hover:text-rose-600 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedFundingScheme !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md text-[11px]">
                  <span>Funding: {selectedFundingScheme.toUpperCase()}</span>
                  <button type="button" onClick={() => setSelectedFundingScheme('all')} className="hover:text-rose-600 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-rose-700 hover:text-rose-900 hover:bg-rose-50 rounded transition-colors ml-auto cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Counter & Active Criteria */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 px-1">
          <div className="flex flex-wrap items-center gap-2">
            <div>
              Showing <span className="font-semibold text-slate-800 tabular-nums">{filteredPrograms.length}</span> programmes
            </div>
            {autoFilterHigherLevel ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full text-[11px] font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Auto-filtered: Higher level than {qualDetails.title} ({getHigherLevelsDescription(profile.qualificationType)})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-medium">
                Showing all program levels
              </span>
            )}
            {showOnlyEligible && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-[11px] font-semibold">
                🎯 Eligible only (≥ {tariffPoints} pts)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span>Your Current Points: <strong className="font-mono text-slate-800">{tariffPoints} pts</strong></span>
          </div>
        </div>

        {/* Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPrograms.map((prog) => {
            const isHigher = isHigherLevelProgram(prog.programLevel, profile.qualificationType);
            const eligibility = checkProgramEligibility(prog, profile, tariffPoints);
            const isEligible = eligibility.isEligible;
            const pointsDiff = prog.minPoints - tariffPoints;
            const isLevel5Student = profile.qualificationType === 'Politeknik-Diploma' || profile.qualificationType === 'IBTE-Diploma';

            return (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Clean unboxed metadata with separators (Anti-slop) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {/* Degree Level Badge + Location Pin directly adjacent (never wrapped below) */}
                      <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                          prog.programLevel === 'Foundation / Pre-University'
                            ? 'bg-purple-100 text-purple-900 border border-purple-200'
                            : prog.programLevel === 'Diploma / HND'
                            ? 'bg-teal-100 text-teal-900 border border-teal-200'
                            : 'bg-sky-100 text-sky-900 border border-sky-200'
                        }`}>
                          {prog.programLevel === 'Foundation / Pre-University' ? 'Foundation' : prog.programLevel === 'Diploma / HND' ? 'Diploma / HND' : 'Degree'}
                        </span>
                        <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap font-medium text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{prog.campusCountry}</span>
                        </span>
                      </div>
                      {prog.field && (
                        <>
                          <span aria-hidden="true" className="text-slate-300 shrink-0 hidden sm:inline">·</span>
                          <span className="text-slate-400 truncate text-[11px] hidden sm:inline">{prog.field}</span>
                        </>
                      )}
                    </div>

                    {/* Eligibility state tag with icon (shrink-0) */}
                    <div className="shrink-0">
                      {isEligible ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold whitespace-nowrap bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            {eligibility.entryYear
                              ? eligibility.entryYear.includes('Case-by-Case')
                                ? eligibility.entryYear
                                : `${eligibility.entryYear} Eligible`
                              : 'Eligible'}
                          </span>
                        </span>
                      ) : !eligibility.qualificationAccepted ? (
                        <span className="flex items-center gap-1 text-slate-700 font-semibold whitespace-nowrap bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>{isLevel5Student ? 'Diplomas Not Accepted' : 'Not Accepted'}</span>
                        </span>
                      ) : !isHigher ? (
                        <span className="flex items-center gap-1 text-slate-400 font-medium whitespace-nowrap text-[11px]">
                          <span>Current / Peer Level</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-700 font-medium whitespace-nowrap text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{eligibility.minCgpaRequired ? `cGPA ≥ ${eligibility.minCgpaRequired.toFixed(2)} needed` : `+${pointsDiff} pts needed`}</span>
                        </span>
                      )}
                    </div>
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

                  {/* Unified Diploma Acceptance & Articulation Banner (Single authoritative display, no duplicates) */}
                  {isLevel5Student && prog.programLevel === 'Undergraduate Degree' && (
                    prog.acceptsDiplomaLevel5 ? (
                      eligibility.disciplineMatched ? (
                        <div className="mt-2.5 p-2.5 bg-emerald-50/90 rounded-lg border border-emerald-200 text-[11px] text-emerald-950 flex items-start gap-2 leading-relaxed">
                          <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-emerald-900 flex items-center justify-between gap-1.5 flex-wrap">
                              <span>Diploma Articulation ({prog.diplomaLevel5Details?.entryYear || 'Direct Degree Entry'})</span>
                              {isEligible ? (
                                <span className="bg-emerald-200 text-emerald-950 text-[10px] px-2 py-0.5 rounded font-semibold">
                                  {prog.institution.includes('UTB') ? '✓ Threshold Met (Case-by-Case Entry)' : '✓ Qualified (cGPA Satisfied)'}
                                </span>
                              ) : (
                                <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] px-2 py-0.5 rounded font-semibold">
                                  cGPA ≥ {eligibility.minCgpaRequired?.toFixed(2) || '2.80'} needed
                                </span>
                              )}
                            </div>
                            <div className="text-emerald-800 text-[11px] mt-1">
                              {prog.diplomaLevel5Details?.notes || prog.polytechnicAcceptance || 'Recognized for direct advanced entry.'}
                            </div>
                            {prog.institution.includes('UTB') && (
                              <div className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                                ⚠️ Note: Direct Year 2 entry is evaluated strictly on a case-to-case basis by UTB faculty.
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2.5 p-2.5 bg-amber-50/90 rounded-lg border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2 leading-relaxed">
                          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-amber-900">
                              Discipline Requirement: Requires Diploma in {eligibility.requiredDisciplinesText || getDisciplineRequirementLabel(getProgramDisciplineRequirements(prog))}
                            </div>
                            <div className="text-amber-800 text-[11px] mt-0.5">
                              Your current diploma ({profile.qualificationType === 'Politeknik-Diploma' ? (profile.pbDiplomaProgram || 'selected diploma') : (profile.ibteProgram || 'selected diploma')}) does not match the prerequisite discipline cluster for this degree.
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="mt-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2 leading-relaxed">
                        <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 font-semibold block mb-0.5">
                            Technical / Advanced Diplomas Not Accepted by this Degree
                          </strong>
                          <span className="text-slate-500">
                            {prog.diplomaLevel5Details?.notes || 'Direct university admission strictly requires GCE A-Levels or IB. Technical and vocational diplomas are not eligible for direct entry.'}
                          </span>
                        </div>
                      </div>
                    )
                  )}

                  {/* Foundation Progression Guarantee Banner */}
                  {prog.foundationProgression && (
                    <div className="mt-2.5 p-2.5 bg-purple-50/80 rounded-lg border border-purple-200/80 text-[11px] text-purple-950 flex items-start gap-2 leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-900 font-bold block mb-0.5">Progression Route:</strong>
                        {prog.foundationProgression}
                      </div>
                    </div>
                  )}

                  {/* IBTE HNTec Pathway Banner (Only for HNTec-IBTE stream) */}
                  {profile.qualificationType === 'HNTec-IBTE' && prog.ibteAcceptance && (
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
                    className="text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>View Details & Entry Prerequisites</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {prog.institution}
                  </span>
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

        {/* Advisory & Non-Endorsement Disclaimer Box */}
        <div className="mt-8 p-4.5 bg-amber-50/80 rounded-xl border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider">
              Official Advisory &amp; Institutional Verification Disclaimer
            </h4>
            <p className="text-amber-950/90 leading-relaxed text-[11px]">
              SuluhBrunei is an independent higher education pathway directory and academic decision support tool. This portal is <strong>not officially endorsed</strong> by or affiliated with the Ministry of Education (MOE) Brunei Darussalam, HECAS, BDNAC, or any featured educational institutions. Entry criteria, tariff points, articulation policies, and scholarship provisions may be modified by respective authorities at any time. Prospective students and applicants must always verify current admission prerequisites directly with the relevant institutions and government circulars before submitting formal applications.
            </p>
          </div>
        </div>
      </section>

      {/* Program Deep Dive Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                      activeModalProgram.programLevel === 'Foundation / Pre-University'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : activeModalProgram.programLevel === 'Diploma / HND'
                        ? 'bg-teal-100 text-teal-900 border border-teal-200'
                        : 'bg-sky-100 text-sky-900 border border-sky-200'
                    }`}>
                      {activeModalProgram.programLevel === 'Foundation / Pre-University' ? 'Foundation' : activeModalProgram.programLevel === 'Diploma / HND' ? 'Diploma / HND' : 'Degree'}
                    </span>
                    <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{activeModalProgram.campusCountry}</span>
                    </span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <span className="font-semibold text-slate-700">{activeModalProgram.institution}</span>
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

              {/* Diploma Articulation & Degree Acceptance Policy */}
              {activeModalProgram.programLevel === 'Undergraduate Degree' && (() => {
                const isLevel5Student = profile.qualificationType === 'Politeknik-Diploma' || profile.qualificationType === 'IBTE-Diploma';
                const modalElig = checkProgramEligibility(activeModalProgram, profile, tariffPoints);
                const studentDipName = profile.qualificationType === 'Politeknik-Diploma' 
                  ? (profile.pbDiplomaProgram || 'Advanced Diploma in Information Technology') 
                  : (profile.ibteProgram || 'Diploma in Information Technology');

                return activeModalProgram.acceptsDiplomaLevel5 ? (
                  <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                    isLevel5Student && !modalElig.disciplineMatched 
                      ? 'bg-amber-50/90 border-amber-300 text-amber-950' 
                      : 'bg-emerald-50 rounded-xl border-emerald-200 text-emerald-950'
                  }`}>
                    <GraduationCap className={`w-5 h-5 shrink-0 mt-0.5 ${
                      isLevel5Student && !modalElig.disciplineMatched ? 'text-amber-700' : 'text-emerald-700'
                    }`} />
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className={isLevel5Student && !modalElig.disciplineMatched ? 'text-amber-900 font-bold' : 'text-emerald-900 font-bold'}>
                          Diploma Articulation Standing (Politeknik Brunei &amp; IBTE Diploma):
                        </strong>
                        <span className="bg-emerald-200 text-emerald-950 font-bold px-2 py-0.5 rounded text-[10px]">
                          {activeModalProgram.diplomaLevel5Details?.entryYear || 'Direct Degree Entry'}
                        </span>
                        <span className="text-slate-600 text-[11px] font-medium">
                          Min cGPA: {activeModalProgram.diplomaLevel5Details?.minCgpa?.toFixed(2) || '2.80'}
                        </span>
                        {isLevel5Student && (
                          modalElig.disciplineMatched ? (
                            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                              ✓ Discipline Match
                            </span>
                          ) : (
                            <span className="bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded text-[10px]">
                              ⚠️ Discipline Mismatch
                            </span>
                          )
                        )}
                      </div>
                      <p className="leading-relaxed text-xs">
                        {activeModalProgram.diplomaLevel5Details?.notes || activeModalProgram.polytechnicAcceptance}
                      </p>
                      {activeModalProgram.institution.includes('UTB') && (
                        <div className="mt-1.5 p-2 rounded-lg bg-amber-100/80 border border-amber-300 text-amber-950 text-[11px] leading-relaxed">
                          <strong>⚠️ UTB Admission Regulation:</strong> Direct entry into UTB Year 2 is evaluated strictly on a <strong>case-to-case basis</strong> by the university faculty board. Fulfilling the minimum cGPA requirement (≥ 2.80) permits application review, but admission into Year 2 depends on detailed diploma course mapping and module credit exemptions. Where credit exemptions are insufficient, applicants are offered entry into Year 1.
                        </div>
                      )}
                      {isLevel5Student && !modalElig.disciplineMatched && (
                        <div className="mt-1 text-[11px] text-amber-900 font-medium bg-amber-100/70 p-2 rounded border border-amber-200">
                          <strong>Prerequisite Notice:</strong> This degree program requires a relevant diploma in <strong>{modalElig.requiredDisciplinesText || getDisciplineRequirementLabel(getProgramDisciplineRequirements(activeModalProgram))}</strong>. Your diploma ({studentDipName}) does not satisfy this specific entry requirement.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-bold block mb-0.5">
                        University Degree Acceptance Policy: Diplomas NOT Accepted for Direct Entry
                      </strong>
                      <p className="leading-relaxed text-slate-600 text-xs">
                        {activeModalProgram.diplomaLevel5Details?.notes || 'This programme strictly requires GCE A-Levels or IB qualifications for direct admission. Technical and vocational diplomas are not eligible for direct entry.'}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* IBTE Progression Highlight (Hidden for A-Level stream) */}
              {!isALevelSelected && activeModalProgram.ibteAcceptance && (
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

            {/* Modal Advisory Disclaimer */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Academic Disclaimer:</strong> SuluhBrunei is not an officially endorsed site. Entry prerequisites, credit transfers, and scholarship quotas must be verified directly with the institution and relevant government agencies.
              </span>
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
                  onClick={() => setActiveModalProgram(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
