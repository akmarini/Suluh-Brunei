import { StudentProfile, QualificationType } from '../types';
import { IBTE_PROGRAMMES_LIST, IBTE_CAMPUSES_OFFICIAL } from '../data/ibteData';

export const A_LEVEL_TARIFF_MAP: Record<string, number> = {
  'A*': 56,
  'A': 48,
  'B': 40,
  'C': 32,
  'D': 24,
  'E': 16,
  'U': 0
};

export const COMMON_SUBJECTS = [
  'Mathematics',
  'Further Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Economics',
  'Accounting',
  'Business Studies',
  'Law',
  'English Literature',
  'History',
  'Geography',
  'Sociology',
  'Psychology',
  'Syariah',
  'Usuluddin',
  'Bahasa Melayu',
  'Art & Design'
];

export const POLITEKNIK_SCHOOLS = [
  'School of Information & Communication Technology (Ong Sum Ping)',
  'School of Science & Engineering (Lumut Campus)',
  'School of Business (Ong Sum Ping)',
  'School of Health Sciences (PAPRSB IHS / RIPAS)',
  'School of Petrochemical (Lumut Campus)'
];

export const POLITEKNIK_DIPLOMAS = [
  'Level 5 Diploma in Information Technology',
  'Level 5 Diploma in Information Systems',
  'Level 5 Diploma in Business Accounting and Finance',
  'Level 5 Diploma in Business Studies (Marketing & Management)',
  'Level 5 Diploma in Civil Engineering',
  'Level 5 Diploma in Electrical and Electronic Engineering',
  'Level 5 Diploma in Mechanical Engineering',
  'Level 5 Diploma in Telecommunications & Systems Engineering',
  'Level 5 Diploma in Health Sciences (Nursing / Paramedic)',
  'Level 5 Diploma in Architecture & Interior Design',
  'Level 5 Diploma in Library & Information Management'
];

export const IBTE_PROGRAMMES = IBTE_PROGRAMMES_LIST;

export const IBTE_CAMPUSES = IBTE_CAMPUSES_OFFICIAL;

export const BRUNEI_SIXTH_FORMS = [
  'Maktab Duli Pengiran Muda Al-Muhtadee Billah (MDPMAMB)',
  'Pusat Tingkatan Enam Belait (PTEB)',
  'Pusat Tingkatan Enam Meragang (PTEM)',
  'Pusat Tingkatan Enam Tutong (PTET)',
  'Pusat Tingkatan Enam Sengkurong (PTES)',
  'Sekolah Menengah Arab Laki-Laki Hassanal Bolkiah (SMALHB)',
  'Institut Tahfiz Al-Quran Sultan Haji Hassanal Bolkiah (ITQSHHB)',
  'Politeknik Brunei (PB)',
  'IBTE (Institute of Brunei Technical Education)',
  'Jerudong International School (JIS)',
  'International School Brunei (ISB)',
  'Laksamana College of Business (LCB)',
  'Kolej International Graduate Studies (KIGS)',
  'Micronet International College (MIC)',
  'Cosmopolitan College of Commerce & Technology (CCCT)',
  'Kemuda Institute (KI)'
];

export const O_LEVEL_MALAY_GRADES = [
  { grade: 'A1', label: 'A1 (Distinction - Credit)', isCredit: true },
  { grade: 'A2', label: 'A2 (Distinction - Credit)', isCredit: true },
  { grade: 'B3', label: 'B3 (Credit - Strong Pass)', isCredit: true },
  { grade: 'B4', label: 'B4 (Credit - Standard Pass)', isCredit: true },
  { grade: 'C5', label: 'C5 (Credit - Satisfactory)', isCredit: true },
  { grade: 'C6', label: 'C6 (Credit - Minimum for Scholarship)', isCredit: true },
  { grade: 'D7', label: 'D7 (Pass - No Credit / Fee-Paying)', isCredit: false },
  { grade: 'E8', label: 'E8 (Pass - No Credit / Fee-Paying)', isCredit: false },
  { grade: 'U9', label: 'U9 (Ungraded / Fee-Paying)', isCredit: false },
  { grade: 'Pending / Not Taken', label: 'Pending / Not Taken (Fee-Paying)', isCredit: false }
];

export function hasOLevelMalayCredit(grade: string): boolean {
  if (!grade) return false;
  const cleanGrade = grade.trim().toUpperCase();
  const creditGrades = ['A1', 'A2', 'B3', 'B4', 'C5', 'C6'];
  return creditGrades.includes(cleanGrade);
}

export function calculateTariffPoints(grades: { grade: string }[]): number {
  return grades.reduce((acc, curr) => acc + (A_LEVEL_TARIFF_MAP[curr.grade] || 0), 0);
}

/**
 * Calculates effective entry tariff points and university progression equivalents
 * tailored for GCE A-Level, Politeknik Brunei Level 5 Diploma, IBTE HNTec / Diploma, IB, and STPUB.
 */
export function calculateStudentTariff(profile: StudentProfile): number {
  if (profile.qualificationType === 'Politeknik-Diploma') {
    const cgpa = typeof profile.pbCgpa === 'number' ? profile.pbCgpa : 3.45;
    // Politeknik Brunei Level 5 Diploma to University Equivalent (New UCAS Tariff Scale):
    if (cgpa >= 3.8) return 144; // High Distinction -> Direct Year 2 UTB/UBD + Overseas (equiv to AAA)
    if (cgpa >= 3.5) return 128; // Distinction -> Direct Year 2 UTB/UBD (equiv to AAB, qualifies for MoE Overseas 120+)
    if (cgpa >= 3.2) return 120; // High Merit -> MoE Overseas 120 pts benchmark (equiv to BBB)
    if (cgpa >= 3.0) return 112; // Strong Merit -> Standard UTB Engineering & Computing Year 2 (equiv to BBC)
    if (cgpa >= 2.8) return 96;  // Merit -> UTB Year 2 eligible / UBD Computing (equiv to CCC)
    if (cgpa >= 2.5) return 80;  // Pass / Low Merit -> UBD/UTB standard entry (equiv to CDD)
    if (cgpa >= 2.0) return 64;  // Pass -> Private College Degree Top-up (equiv to CC)
    return 48;                   // Foundation / Bridging (equiv to DD)
  }

  if (profile.qualificationType === 'IBTE-Diploma') {
    const cgpa = typeof profile.ibteCgpa === 'number' ? profile.ibteCgpa : 3.40;
    // IBTE Level 5 Diploma to University Equivalent (BNQF Level 5 Diploma):
    if (cgpa >= 3.8) return 144; // High Distinction -> Direct Year 2 UTB/UBD + Overseas eligible (equiv to AAA)
    if (cgpa >= 3.5) return 128; // Distinction -> Direct Year 2 UTB/UBD (equiv to AAB, qualifies for MoE Overseas 120+)
    if (cgpa >= 3.2) return 120; // High Merit -> MoE Overseas 120 pts benchmark (equiv to BBB)
    if (cgpa >= 3.0) return 112; // Strong Merit -> Standard UTB Engineering & Computing Year 2 (equiv to BBC)
    if (cgpa >= 2.8) return 96;  // Merit -> UTB Year 2 eligible / UBD Computing (equiv to CCC)
    if (cgpa >= 2.5) return 80;  // Pass / Low Merit -> UBD/UTB standard entry (equiv to CDD)
    if (cgpa >= 2.0) return 64;  // Pass -> Private College Degree Top-up (equiv to CC)
    return 48;                   // Foundation / Bridging
  }

  if (profile.qualificationType === 'HNTec-IBTE') {
    const isDip = profile.ibteProgram?.toLowerCase().includes('diploma');
    const award = profile.ibteAward || 'Merit';
    const cgpa = typeof profile.ibteCgpa === 'number' ? profile.ibteCgpa : 3.2;

    if (isDip) {
      // IBTE Level 5 Diploma Progression:
      if (cgpa >= 3.8 || award === 'Distinction') return 128; // Distinction -> Direct Year 2 UTB
      if (cgpa >= 3.2) return 112;                           // Merit -> Direct Year 2 UTB
      if (cgpa >= 2.8) return 96;                            // Pass with Merit
      return 64;                                             // Pass
    }

    // IBTE HNTec (BNQF Level 4) progression:
    if (award === 'Distinction' || cgpa >= 3.5) return 80; // High Merit / Distinction -> PB Level 5 & Private College entry
    if (award === 'Merit' || cgpa >= 2.8) return 64;       // Merit -> PB Level 5 Diploma & Private College Foundation/HND
    return 48;                                            // Pass -> PB Diploma (select) & Private College Foundation
  }

  if (profile.qualificationType === 'IB') {
    const points = typeof profile.ibPoints === 'number' ? profile.ibPoints : 34;
    // International Baccalaureate (IB) Diploma mapped directly to MoE Circular 14/2025:
    // 40+ pts -> 160 pts (A*A*A* equivalent / Sultan's Scholar candidate)
    // 38 pts  -> 144 pts (AAA equivalent / MoE Medicine & Dentistry benchmark - Para 1.1.1)
    // 36 pts  -> 136 pts (A*AB equivalent)
    // 34 pts  -> 128 pts (AAB equivalent / Shell BSP benchmark)
    // 32 pts  -> 120 pts (BBB equivalent / MoE Overseas General benchmark - Circular 14/2025)
    // 30 pts  -> 112 pts (BBC equivalent)
    // 28 pts  -> 96 pts  (BCC equivalent)
    // 26 pts  -> 80 pts  (CCC/CDD equivalent)
    // 24 pts  -> 64 pts  (Standard IB Pass / Local Degree threshold)
    if (points >= 40) return 160;
    if (points >= 38) return 144;
    if (points >= 36) return 136;
    if (points >= 34) return 128;
    if (points >= 32) return 120;
    if (points >= 30) return 112;
    if (points >= 28) return 96;
    if (points >= 26) return 80;
    if (points >= 24) return 64;
    return 48;
  }

  if (profile.qualificationType === 'STPUB') {
    const grade = profile.stpubGrade || 'Jayyid Jiddan';
    if (grade === 'Mumtaz') return 136;       // High First Class / A*AA equivalent (MoE Overseas eligible)
    if (grade === 'Jayyid Jiddan') return 120; // BBB equivalent (Qualified for MOE Overseas & UNISSA Double Degree)
    if (grade === 'Jayyid') return 96;        // CCC equivalent (Direct local degree admission)
    if (grade === 'Maqbul') return 64;        // Pass equivalent
    return 48;
  }

  // Default GCE A-Level
  return calculateTariffPoints(profile.subjects);
}

export function getQualificationDetails(profile: StudentProfile) {
  if (profile.qualificationType === 'Politeknik-Diploma') {
    const cgpa = typeof profile.pbCgpa === 'number' ? profile.pbCgpa : 3.45;
    const classification = cgpa >= 3.5 ? 'Distinction' : cgpa >= 3.0 ? 'Merit' : 'Pass';
    const isYear2Eligible = cgpa >= 2.8;
    const tariff = calculateStudentTariff(profile);
    return {
      title: 'Politeknik Brunei (PB) Level 5 Diploma',
      scoreText: `cGPA ${cgpa.toFixed(2)} / 4.00 (${classification})`,
      pointsDisplay: `cGPA ${cgpa.toFixed(2)} (${classification})`,
      equivTariff: tariff,
      progressionText: isYear2Eligible 
        ? '✓ Eligible for Direct Year 2 Entry into UTB & UBD Degree Programmes with Credit Exemptions, or Final-Year UK Degree Top-Up at LCB'
        : '✓ Eligible for Degree Admission into local and private universities (LCB Chester / KIGS Limkokwing)',
      levelTag: 'BNQF Level 5 Diploma',
      classification,
      isYear2Eligible
    };
  }

  if (profile.qualificationType === 'IBTE-Diploma') {
    const cgpa = typeof profile.ibteCgpa === 'number' ? profile.ibteCgpa : 3.40;
    const classification = cgpa >= 3.5 ? 'Distinction' : cgpa >= 3.0 ? 'Merit' : 'Pass';
    const isYear2Eligible = cgpa >= 2.8;
    const tariff = calculateStudentTariff(profile);
    return {
      title: 'IBTE Level 5 Diploma',
      scoreText: `cGPA ${cgpa.toFixed(2)} / 4.00 (${classification})`,
      pointsDisplay: `cGPA ${cgpa.toFixed(2)} (${classification})`,
      equivTariff: tariff,
      progressionText: isYear2Eligible 
        ? '✓ Eligible for Direct Year 2 Entry into UTB & UBD Degree Programmes with Credit Exemptions'
        : '✓ Eligible for Degree Admission into local and private universities',
      levelTag: 'BNQF Level 5 Diploma',
      classification,
      isYear2Eligible
    };
  }

  if (profile.qualificationType === 'HNTec-IBTE') {
    const isDip = profile.ibteProgram?.toLowerCase().includes('diploma');
    const award = profile.ibteAward || 'Merit';
    const cgpa = typeof profile.ibteCgpa === 'number' ? profile.ibteCgpa : 3.2;
    const tariff = calculateStudentTariff(profile);

    if (isDip) {
      return {
        title: 'IBTE Level 5 Diploma Programme',
        scoreText: `${award} (cGPA ${cgpa.toFixed(2)} / 4.00)`,
        pointsDisplay: `Level 5 Diploma (${award})`,
        equivTariff: tariff,
        progressionText: '✓ Direct Year 2 Entry into UTB BEng / BSc degree programmes with credit exemptions',
        levelTag: 'BNQF Level 5 Diploma',
        isPbEligible: true
      };
    }

    const isPbEligible = award === 'Distinction' || award === 'Merit' || cgpa >= 2.8;
    return {
      title: 'IBTE Technical Education Certificate (HNTec)',
      scoreText: `${award} (cGPA ${cgpa.toFixed(2)})`,
      pointsDisplay: `${award} (cGPA ${cgpa.toFixed(2)})`,
      equivTariff: tariff,
      progressionText: isPbEligible
        ? '✓ Direct progression into Politeknik Brunei Level 5 Diploma (3 Years) or Private College Pearson BTEC Level 5 HND with SBPP loan funding'
        : '✓ Eligible for Private College Foundation / Certificate or PB intake via interview',
      levelTag: 'BNQF Level 4 HNTec',
      isPbEligible
    };
  }

  if (profile.qualificationType === 'IB') {
    const pts = profile.ibPoints ?? 34;
    const tariff = calculateStudentTariff(profile);
    return {
      title: 'International Baccalaureate (IB) Diploma',
      scoreText: `${pts} / 45 IB points`,
      pointsDisplay: `${pts} / 45 points`,
      equivTariff: tariff,
      progressionText: pts >= 32 
        ? '✓ Meets MOE Overseas Scholarship benchmark (min 32 pts under Circular 14/2025)' 
        : pts >= 24 
        ? 'Qualified for direct undergraduate entry into local universities (UBD, UTB, UNISSA)' 
        : 'Undergraduate pathway candidate',
      levelTag: 'IB Diploma'
    };
  }

  if (profile.qualificationType === 'STPUB') {
    const grade = profile.stpubGrade || 'Jayyid Jiddan';
    const tariff = calculateStudentTariff(profile);
    return {
      title: 'Sijil Tinggi Pelajaran Ugama Brunei (STPUB)',
      scoreText: `Pangkat: ${grade}`,
      pointsDisplay: `Pangkat ${grade}`,
      equivTariff: tariff,
      progressionText: grade === 'Mumtaz' || grade === 'Jayyid Jiddan'
        ? '✓ Eligible for MOE Overseas Islamic scholarship or UNISSA Shariah & Law double degree'
        : 'Direct entry into UNISSA, KUPU SB, or overseas Islamic universities (Al-Azhar / Yarmouk)',
      levelTag: 'STPUB'
    };
  }

  // Default A-Level
  const total = calculateTariffPoints(profile.subjects);
  return {
    title: 'GCE Advanced Level (A-Level)',
    scoreText: `${total} UCAS Points from ${profile.subjects.length} Subjects`,
    pointsDisplay: `${total} UCAS pts`,
    equivTariff: total,
    progressionText: total >= 120 
      ? 'Exceeds MOE Overseas Scholarship benchmark (120+ pts / BBB)' 
      : total >= 64 
      ? 'Meets HECAS local university degree entry threshold (64–112+ pts)' 
      : 'Below 64 pts: Private College Foundation / Diploma pathway recommended',
    levelTag: 'GCE A-Level'
  };
}

export function evaluateScholarshipReadiness(
  tariffPoints: number, 
  icStatus: string,
  oLevelMalayGrade: string = 'C6',
  profile?: StudentProfile
) {
  const isCitizen = icStatus.includes('Yellow');
  const hasMalayCredit = hasOLevelMalayCredit(oLevelMalayGrade);
  const qualType = profile?.qualificationType || 'A-Level';

  // --- 1. MOE Overseas General (Circular 14/2025) ---
  let moeOverseasEligible = false;
  let moeOverseasGap = 0;
  let moeOverseasBenchmark = 'Min 120 points (3 subjects in 1 sitting, no grade < C) + Yellow IC + O-Level BM C6 (Circular 14/2025)';
  let moeOverseasStatusNotice = '';

  if (qualType === 'IB') {
    const ibPts = profile?.ibPoints ?? 34;
    moeOverseasEligible = isCitizen && hasMalayCredit && ibPts >= 32;
    moeOverseasGap = Math.max(0, 32 - ibPts);
    moeOverseasBenchmark = 'IB Diploma: Min 32 points in ONE sitting within 2 yrs + Yellow IC + BM C6 (Circular 14/2025)';
    moeOverseasStatusNotice = !hasMalayCredit
      ? 'Ineligible: Requires Credit (C6) in GCE O-Level Bahasa Melayu'
      : ibPts >= 32 ? 'Qualified (32+ IB pts meets Circular 14/2025)' : `${32 - ibPts} IB pts away from 32 threshold`;
  } else if (qualType === 'Politeknik-Diploma' || qualType === 'IBTE-Diploma') {
    const cgpa = qualType === 'IBTE-Diploma' ? (profile?.ibteCgpa ?? 3.40) : (profile?.pbCgpa ?? 3.45);
    moeOverseasEligible = isCitizen && hasMalayCredit && cgpa >= 3.50;
    moeOverseasGap = cgpa >= 3.50 ? 0 : Number((3.50 - cgpa).toFixed(2));
    moeOverseasBenchmark = 'Level 5 Diploma: Distinction (cGPA ≥ 3.50 / 120+ equiv pts) within 2 yrs + BM C6 (Circular 14/2025)';
    moeOverseasStatusNotice = !hasMalayCredit
      ? 'Ineligible: Requires Credit (C6) in GCE O-Level Bahasa Melayu'
      : cgpa >= 3.50 ? 'Qualified (Distinction cGPA ≥ 3.50)' : `Needs Distinction (cGPA ≥ 3.50, currently ${cgpa.toFixed(2)})`;
  } else if (qualType === 'STPUB') {
    const grade = profile?.stpubGrade || 'Jayyid Jiddan';
    moeOverseasEligible = isCitizen && hasMalayCredit && (grade === 'Mumtaz' || grade === 'Jayyid Jiddan');
    moeOverseasGap = moeOverseasEligible ? 0 : 1;
    moeOverseasBenchmark = 'STPUB: Mumtaz / Jayyid Jiddan ranking + Yellow IC + BM C6 (Circular 14/2025)';
    moeOverseasStatusNotice = !hasMalayCredit
      ? 'Ineligible: Requires Credit (C6) in GCE O-Level Bahasa Melayu'
      : moeOverseasEligible ? 'Qualified (Mumtaz / Jayyid Jiddan)' : 'Requires Mumtaz or Jayyid Jiddan';
  } else if (qualType === 'HNTec-IBTE') {
    moeOverseasEligible = false;
    moeOverseasGap = 0;
    moeOverseasBenchmark = 'Requires BNQF Level 5 Diploma progression first (Politeknik Brunei / IBTE Diploma)';
    moeOverseasStatusNotice = 'Articulate via Level 5 Diploma first (or SBPP loan for private college)';
  } else {
    // A-Level
    moeOverseasEligible = isCitizen && tariffPoints >= 120 && hasMalayCredit;
    moeOverseasGap = tariffPoints >= 120 ? 0 : 120 - tariffPoints;
    moeOverseasBenchmark = 'Min 120 points (3 subjects in 1 sitting, no grade < C) + Yellow IC + O-Level BM C6 (Circular 14/2025)';
    moeOverseasStatusNotice = !hasMalayCredit
      ? 'Ineligible: Requires Credit (C6) in GCE O-Level Bahasa Melayu'
      : tariffPoints >= 120 ? 'Qualified' : `${120 - tariffPoints} pts away`;
  }

  // --- 2. MOE Medicine & Dentistry (Circular 14/2025 Para 1.1.1) ---
  let moeMedEligible = false;
  let moeMedGap = 0;
  let moeMedBenchmark = 'Min 144 points (3 subjects in 1 sitting, no grade < A / AAA) + O-Level English B3 + BM C6 (Para 1.1.1)';
  let moeMedStatusNotice = '';

  if (qualType === 'IB') {
    const ibPts = profile?.ibPoints ?? 34;
    moeMedEligible = isCitizen && hasMalayCredit && ibPts >= 38;
    moeMedGap = Math.max(0, 38 - ibPts);
    moeMedBenchmark = 'IB Diploma: Min 38 points (Para 1.1.1) + O-Level English B3 & BM C6';
    moeMedStatusNotice = !hasMalayCredit
      ? 'Ineligible: Requires Credit (C6) in GCE O-Level Bahasa Melayu'
      : ibPts >= 38 ? 'Qualified (38+ IB pts)' : `${38 - ibPts} IB pts away from 38 threshold`;
  } else if (qualType === 'Politeknik-Diploma' || qualType === 'IBTE-Diploma' || qualType === 'HNTec-IBTE' || qualType === 'STPUB') {
    moeMedEligible = false;
    moeMedGap = 0;
    moeMedBenchmark = 'Overseas Medicine / Dentistry requires GCE A-Level (144 pts / AAA) or IB (38 pts)';
    moeMedStatusNotice = 'Requires GCE A-Level or IB Diploma pathway';
  } else {
    // A-Level
    moeMedEligible = isCitizen && tariffPoints >= 144 && hasMalayCredit;
    moeMedGap = tariffPoints >= 144 ? 0 : 144 - tariffPoints;
    moeMedBenchmark = 'Min 144 points (3 subjects in 1 sitting, no grade < A / AAA) + O-Level English B3 + BM C6 (Para 1.1.1)';
    moeMedStatusNotice = !hasMalayCredit
      ? 'Ineligible: Requires Credit (C6) in GCE O-Level Bahasa Melayu'
      : tariffPoints >= 144 ? 'Qualified' : `${144 - tariffPoints} pts away`;
  }

  // --- 3. BSP Shell Scholarship ---
  let bspEligible = false;
  let bspGap = 0;
  if (qualType === 'IB') {
    const ibPts = profile?.ibPoints ?? 34;
    bspEligible = isCitizen && ibPts >= 34;
    bspGap = Math.max(0, 34 - ibPts);
  } else if (qualType === 'Politeknik-Diploma' || qualType === 'IBTE-Diploma') {
    const cgpa = qualType === 'IBTE-Diploma' ? (profile?.ibteCgpa ?? 3.40) : (profile?.pbCgpa ?? 3.45);
    bspEligible = isCitizen && cgpa >= 3.50;
    bspGap = cgpa >= 3.50 ? 0 : Number((3.50 - cgpa).toFixed(2));
  } else {
    bspEligible = isCitizen && tariffPoints >= 128;
    bspGap = tariffPoints >= 128 ? 0 : 128 - tariffPoints;
  }

  // --- 4. Sultan's Scholar ---
  let sultansEligible = false;
  let sultansGap = 0;
  if (qualType === 'IB') {
    const ibPts = profile?.ibPoints ?? 34;
    sultansEligible = isCitizen && ibPts >= 40;
    sultansGap = Math.max(0, 40 - ibPts);
  } else {
    sultansEligible = isCitizen && tariffPoints >= 152;
    sultansGap = tariffPoints >= 152 ? 0 : 152 - tariffPoints;
  }

  // --- 5. Local Government Higher Education (UBD, UTB, UNISSA, PB, IBTE) ---
  let localGovtEligible = false;
  let localGovtNotice = '';

  if (qualType === 'Politeknik-Diploma' || qualType === 'IBTE-Diploma') {
    const cgpa = qualType === 'IBTE-Diploma' ? (profile?.ibteCgpa ?? 3.40) : (profile?.pbCgpa ?? 3.45);
    localGovtEligible = isCitizen && hasMalayCredit && cgpa >= 2.0;
    localGovtNotice = !hasMalayCredit
      ? 'Fee-Paying Status: Admitted without scholarship allowance due to missing BM Credit (C6)'
      : cgpa >= 2.80 
      ? 'Direct Year 2 UTB/UBD Degree with Full Scholarship + $350/mo allowance'
      : 'Degree Admission Eligible (Tuition-free + $350/mo allowance)';
  } else if (qualType === 'HNTec-IBTE') {
    const award = profile?.ibteAward || 'Merit';
    const cgpa = profile?.ibteCgpa ?? 3.2;
    const isDip = profile?.ibteProgram?.toLowerCase().includes('diploma');
    localGovtEligible = isCitizen && hasMalayCredit && (award === 'Distinction' || award === 'Merit' || cgpa >= 2.8);
    localGovtNotice = !hasMalayCredit
      ? 'Fee-Paying Status: Admitted without scholarship allowance due to missing BM Credit (C6)'
      : isDip 
      ? 'Level 5 Diploma Qualified (Tuition-free + $350/mo allowance, articulates to UTB)' 
      : 'Scholarship Qualified for PB Level 5 Diploma (Tuition-free + $350/mo allowance)';
  } else {
    localGovtEligible = isCitizen && tariffPoints >= 64 && hasMalayCredit;
    localGovtNotice = !hasMalayCredit
      ? 'Fee-Paying Status: Admitted without scholarship allowance due to missing BM Credit (C6)'
      : tariffPoints >= 64 ? 'Scholarship Qualified (Tuition Free + $350/mo allowance)' : `${64 - tariffPoints} pts away`;
  }

  return {
    hasMalayCredit,
    isFeePayingForGovtInstitutions: isCitizen && !hasMalayCredit,
    feePayingWarning: !hasMalayCredit
      ? "Warning: Under Brunei Higher Education policy, all government institutions (UBD, UTB, UNISSA, Politeknik Brunei, IBTE, KUPU SB) require a Credit (C6 or better) in GCE 'O' Level Bahasa Melayu to be eligible for government scholarship and monthly living allowance. Without this credit, you will be admitted on a Fee-Paying status (Pelajar Berbayar)."
      : null,
    moeOverseas: {
      eligible: moeOverseasEligible,
      gap: moeOverseasGap,
      hasMalayCredit,
      benchmark: moeOverseasBenchmark,
      statusNotice: moeOverseasStatusNotice
    },
    moeMedicineDentistry: {
      eligible: moeMedEligible,
      gap: moeMedGap,
      hasMalayCredit,
      benchmark: moeMedBenchmark,
      statusNotice: moeMedStatusNotice
    },
    sultansScholar: {
      eligible: sultansEligible,
      gap: sultansGap,
      benchmark: qualType === 'IB' ? 'Min 40+ IB Points + Yellow IC' : 'Min 152 points (A*AA / A*A*A) + Yellow IC'
    },
    bspScholarship: {
      eligible: bspEligible,
      gap: bspGap,
      benchmark: qualType === 'IB' ? 'Min 34 IB Points + STEM focus' : qualType === 'Politeknik-Diploma' ? 'Distinction (cGPA ≥ 3.50) in Engineering/IT' : 'Min 128 points (ABB / AAB) + STEM focus'
    },
    localGovtScholarship: {
      eligible: localGovtEligible,
      isFeePaying: isCitizen && !hasMalayCredit,
      gap: tariffPoints >= 64 ? 0 : 64 - tariffPoints,
      hasMalayCredit,
      benchmark: qualType === 'Politeknik-Diploma' ? 'Direct Year 2 UTB/UBD (cGPA ≥ 2.80) + BM Credit C6' : qualType === 'HNTec-IBTE' ? 'Direct PB Level 5 Entry with Merit/Distinction + BM Credit C6' : 'Min 64–112 pts + Yellow IC + Credit in O-Level Bahasa Melayu',
      statusNotice: localGovtNotice
    }
  };
}

/**
 * Returns higher-level program categories than the student's current qualification according
 * to the Brunei Darussalam National Qualifications Framework (BDQF / BNQF):
 * - HNTec (BDQF Level 4): Progresses to Level 5 (Diploma / HND) or Level 6 (Undergraduate Degree).
 * - Politeknik Brunei Diploma & IBTE Diploma (BDQF Level 5): Progresses to Level 6 (Undergraduate Degree).
 * - GCE A-Level, IB Diploma, STPUB (Pre-University terminal): Progresses to Level 6 (Undergraduate Degree).
 */
export function getHigherProgramLevels(qualType: QualificationType): ('Undergraduate Degree' | 'Diploma / HND' | 'Foundation / Pre-University')[] {
  switch (qualType) {
    case 'HNTec-IBTE':
      return ['Diploma / HND', 'Undergraduate Degree'];

    case 'Politeknik-Diploma':
    case 'IBTE-Diploma':
      return ['Undergraduate Degree'];

    case 'A-Level':
    case 'IB':
    case 'STPUB':
    default:
      return ['Undergraduate Degree'];
  }
}

/**
 * Checks whether a given program level represents a higher qualification than the student's current qualification.
 */
export function isHigherLevelProgram(programLevel: string | undefined, qualType: QualificationType): boolean {
  if (!programLevel) return false;
  const higherLevels = getHigherProgramLevels(qualType);
  return higherLevels.includes(programLevel as any);
}

/**
 * Returns user-friendly summary of the higher level progression for the current qualification.
 */
export function getHigherLevelsDescription(qualType: QualificationType): string {
  switch (qualType) {
    case 'HNTec-IBTE':
      return 'Level 5 Diplomas & Level 6 Degrees';
    case 'Politeknik-Diploma':
      return 'Level 6 Undergraduate Degrees (Direct Year 2 / Top-Up)';
    case 'IBTE-Diploma':
      return 'Level 6 Undergraduate Degrees (Direct Year 2 / Top-Up)';
    case 'A-Level':
      return 'Undergraduate Degrees (Level 6)';
    case 'IB':
      return 'Undergraduate Degrees (Level 6)';
    case 'STPUB':
      return 'Undergraduate Degrees (Level 6)';
    default:
      return 'Undergraduate Degrees (Level 6)';
  }
}
