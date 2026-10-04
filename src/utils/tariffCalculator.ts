import { StudentProfile } from '../types';
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
 * tailored for GCE A-Level, Politeknik Brunei Level 5 Diploma, IBTE HNTec, IB, and STPUB.
 */
export function calculateStudentTariff(profile: StudentProfile): number {
  if (profile.qualificationType === 'Politeknik-Diploma') {
    const cgpa = typeof profile.pbCgpa === 'number' ? profile.pbCgpa : 3.45;
    // Politeknik Brunei Level 5 Diploma to University Equivalent (New UCAS Tariff Scale):
    if (cgpa >= 3.8) return 144; // High Distinction -> Direct Year 2 UTB/UBD + Overseas (equiv to AAA)
    if (cgpa >= 3.5) return 128; // Distinction -> Direct Year 2 UTB/UBD (equiv to AAB)
    if (cgpa >= 3.0) return 112; // Strong Merit -> Standard UTB Engineering & Computing Year 2 (equiv to BBC)
    if (cgpa >= 2.8) return 96;  // Merit -> UTB Year 2 eligible / UBD Computing (equiv to CCC)
    if (cgpa >= 2.5) return 80;  // Pass / Low Merit -> UBD/UTB standard entry (equiv to CDD)
    if (cgpa >= 2.0) return 64;  // Pass -> Private College Degree Top-up (equiv to CC)
    return 48;                   // Foundation / Bridging (equiv to DD)
  }

  if (profile.qualificationType === 'HNTec-IBTE') {
    const award = profile.ibteAward || 'Merit';
    const cgpa = typeof profile.ibteCgpa === 'number' ? profile.ibteCgpa : 3.2;
    // IBTE HNTec (BNQF Level 4) progression:
    if (award === 'Distinction' || cgpa >= 3.5) return 80; // High Merit / Distinction -> PB Level 5 & Private College entry
    if (award === 'Merit' || cgpa >= 2.8) return 64;       // Merit -> PB Level 5 Diploma & Private College Foundation/HND
    return 48;                                            // Pass -> PB Diploma (select) & Private College Foundation
  }

  if (profile.qualificationType === 'IB') {
    const points = typeof profile.ibPoints === 'number' ? profile.ibPoints : 34;
    if (points >= 38) return 144; // AAA equivalent
    if (points >= 34) return 128; // AAB equivalent (exceeds MOE Overseas 120 pts)
    if (points >= 30) return 104; // BCC equivalent
    if (points >= 26) return 80;  // CDD equivalent
    return 64;                    // CC equivalent
  }

  if (profile.qualificationType === 'STPUB') {
    const grade = profile.stpubGrade || 'Jayyid Jiddan';
    if (grade === 'Mumtaz') return 128;       // AAB equivalent (MOE Overseas)
    if (grade === 'Jayyid Jiddan') return 104; // BCC equivalent (UNISSA Double Degree)
    if (grade === 'Jayyid') return 80;        // CDD equivalent
    return 64;                                // CC equivalent
  }

  // Default GCE A-Level
  return calculateTariffPoints(profile.subjects);
}

export function getQualificationDetails(profile: StudentProfile) {
  if (profile.qualificationType === 'Politeknik-Diploma') {
    const cgpa = typeof profile.pbCgpa === 'number' ? profile.pbCgpa : 3.45;
    const classification = cgpa >= 3.5 ? 'Distinction' : cgpa >= 3.0 ? 'Merit' : 'Pass';
    const isYear2Eligible = cgpa >= 2.8;
    return {
      title: 'Politeknik Brunei (PB) Level 5 Diploma',
      scoreText: `cGPA ${cgpa.toFixed(2)} / 4.00 (${classification})`,
      progressionText: isYear2Eligible 
        ? '✓ Eligible for Direct Year 2 Entry into UTB & UBD Degree Programmes with Credit Exemptions, or Final-Year UK Degree Top-Up at LCB'
        : '✓ Eligible for Degree Admission into local and private universities (LCB Chester / KIGS Limkokwing)',
      levelTag: 'BNQF Level 5 Diploma',
      classification,
      isYear2Eligible
    };
  }

  if (profile.qualificationType === 'HNTec-IBTE') {
    const award = profile.ibteAward || 'Merit';
    const cgpa = typeof profile.ibteCgpa === 'number' ? profile.ibteCgpa : 3.2;
    const isPbEligible = award === 'Distinction' || award === 'Merit' || cgpa >= 2.8;
    return {
      title: 'IBTE Higher National Technical Education Certificate (HNTec)',
      scoreText: `${award} (cGPA ${cgpa.toFixed(2)})`,
      progressionText: isPbEligible
        ? '✓ Direct progression into Politeknik Brunei Level 5 Diploma (3 Years) or Private College Pearson BTEC Level 5 HND with SBPP loan funding'
        : '✓ Eligible for Private College Foundation / Certificate or PB intake via interview',
      levelTag: 'BNQF Level 4 HNTec',
      isPbEligible
    };
  }

  if (profile.qualificationType === 'IB') {
    const pts = profile.ibPoints ?? 34;
    return {
      title: 'International Baccalaureate (IB) Diploma',
      scoreText: `${pts} / 45 points`,
      progressionText: pts >= 30 ? 'Qualified for direct undergraduate entry into local & overseas universities' : 'Undergraduate pathway candidate',
      levelTag: 'IB Diploma'
    };
  }

  if (profile.qualificationType === 'STPUB') {
    const grade = profile.stpubGrade || 'Jayyid Jiddan';
    return {
      title: 'Sijil Tinggi Pelajaran Ugama Brunei (STPUB)',
      scoreText: `Pangkat: ${grade}`,
      progressionText: 'Direct entry into UNISSA Shariah & Law double degree, KUPU SB, or overseas Islamic universities (Al-Azhar / Yarmouk)',
      levelTag: 'STPUB'
    };
  }

  // Default A-Level
  const total = calculateTariffPoints(profile.subjects);
  return {
    title: 'GCE Advanced Level (A-Level)',
    scoreText: `${total} UCAS Points from ${profile.subjects.length} Subjects`,
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
  oLevelMalayGrade: string = 'C6'
) {
  const isCitizen = icStatus.includes('Yellow');
  const hasMalayCredit = hasOLevelMalayCredit(oLevelMalayGrade);

  return {
    hasMalayCredit,
    isFeePayingForGovtInstitutions: isCitizen && !hasMalayCredit,
    feePayingWarning: !hasMalayCredit
      ? "Warning: Under Brunei Higher Education policy, all government institutions (UBD, UTB, UNISSA, Politeknik Brunei, IBTE, KUPU SB) require a Credit (C6 or better) in GCE 'O' Level Bahasa Melayu to be eligible for government scholarship and monthly living allowance. Without this credit, you will be admitted on a Fee-Paying status (Pelajar Berbayar)."
      : null,
    moeOverseas: {
      eligible: isCitizen && tariffPoints >= 120 && hasMalayCredit,
      gap: tariffPoints >= 120 ? 0 : 120 - tariffPoints,
      hasMalayCredit,
      benchmark: 'Min 120 points (BBB / ABB) + Yellow IC + Credit in O-Level Bahasa Melayu',
      statusNotice: !hasMalayCredit
        ? 'Ineligible: Requires Credit (C6) in GCE O-Level Bahasa Melayu'
        : tariffPoints >= 120 ? 'Qualified' : `${120 - tariffPoints} pts away`
    },
    sultansScholar: {
      eligible: isCitizen && tariffPoints >= 152,
      gap: tariffPoints >= 152 ? 0 : 152 - tariffPoints,
      benchmark: 'Min 152 points (A*AA / A*A*A) + Yellow IC'
    },
    bspScholarship: {
      eligible: isCitizen && tariffPoints >= 128,
      gap: tariffPoints >= 128 ? 0 : 128 - tariffPoints,
      benchmark: 'Min 128 points (ABB / AAB) + STEM focus'
    },
    localGovtScholarship: {
      eligible: isCitizen && tariffPoints >= 64 && hasMalayCredit,
      isFeePaying: isCitizen && !hasMalayCredit,
      gap: tariffPoints >= 64 ? 0 : 64 - tariffPoints,
      hasMalayCredit,
      benchmark: 'Min 64–112 pts + Yellow IC + Credit in O-Level Bahasa Melayu',
      statusNotice: !hasMalayCredit
        ? 'Fee-Paying Status: Admitted without scholarship allowance due to missing BM Credit (C6)'
        : tariffPoints >= 64 ? 'Scholarship Qualified (Tuition Free + $350/mo allowance)' : `${64 - tariffPoints} pts away`
    }
  };
}
