export type QualificationType = 'A-Level' | 'IB' | 'Politeknik-Diploma' | 'STPUB' | 'HNTec-IBTE';

export type ICStatus = 'Yellow IC (Citizen)' | 'Red IC (Permanent Resident)' | 'Green IC / International';

export type StudyDestination = 'all' | 'local' | 'uk' | 'australia' | 'singapore' | 'malaysia' | 'other';

export type FieldOfInterest =
  | 'all'
  | 'Medicine & Health Sciences'
  | 'Engineering & Technology'
  | 'Computer Science & AI'
  | 'Business, Economics & Finance'
  | 'Law & Shariah'
  | 'Natural & Environmental Sciences'
  | 'Islamic Studies & Education'
  | 'Architecture & Built Environment'
  | 'Arts & Humanities';

export interface SubjectGrade {
  id: string;
  subject: string;
  grade: string;
  isPredicted: boolean;
}

export interface StudentProfile {
  name: string;
  school: string;
  qualificationType: QualificationType;
  icStatus: ICStatus;
  subjects: SubjectGrade[];
  targetField: FieldOfInterest;
  targetDestination: StudyDestination;
  oLevelEnglishGrade: string;
  oLevelMalayGrade: string; // Prerequisite: Credit (C6 or better) required for scholarship at government institutions, otherwise fee-paying
  hasMedicalInterest: boolean;
  // Specific qualification fields for PB, IBTE, IB & STPUB graduates:
  pbDiplomaProgram?: string;       // e.g. "Level 5 Diploma in Information Technology"
  pbCgpa?: number;                 // e.g. 3.45 (scale 0.00 - 4.00)
  ibteSchool?: string;             // e.g. "IBTE Sultan Saiful Rijal Campus"
  ibteProgram?: string;            // e.g. "HNTec in Information Technology"
  ibteCgpa?: number;               // e.g. 3.20 (scale 0.00 - 4.00)
  ibteAward?: 'Distinction' | 'Merit' | 'Pass';
  ibPoints?: number;               // 24 - 45 points
  stpubGrade?: 'Mumtaz' | 'Jayyid Jiddan' | 'Jayyid' | 'Maqbul';
}

export interface Scholarship {
  id: string;
  title: string;
  malayTitle: string;
  provider: string;
  type: 'Government' | 'Corporate' | 'Royal' | 'University' | 'International';
  coverageType: 'Full Scholarship' | 'Tuition & Allowance' | 'Tuition Only' | 'Financial Assistance';
  destinationAllowed: 'Overseas Only' | 'Local Only' | 'Both Local & Overseas';
  bondYears: number; // 0 for unbonded
  bondEmployer: string;
  minPoints: number; // UCAS points or equivalent
  minGradesDescription: string;
  citizenshipRequirement: string;
  monthlyAllowanceEstimate: string; // e.g. "£1,150 - £1,350/month in UK or BND $350/mo local"
  benefits: string[];
  keyCriteria: string[];
  applicationPeriod: string;
  deadlineDate: string; // YYYY-MM-DD
  status: 'Open' | 'Opening Soon' | 'Closed';
  officialUrl: string;
  hecasRequired: boolean;
  mpecPriorityAligned: boolean;
  requiredDocuments: string[];
  selectionStages: string[];
  alumniTips: string[];
}

export type ProgramLevel = 'all' | 'Undergraduate Degree' | 'Foundation / Pre-University' | 'Diploma / HND';

export type InstitutionType = 'all' | 'Government University' | 'Private College' | 'Overseas University';

export interface UniversityProgram {
  id: string;
  name: string;
  institution: string;
  campusCountry: 'Brunei' | 'United Kingdom' | 'Australia' | 'Singapore' | 'Malaysia' | 'Other';
  field: FieldOfInterest;
  programLevel?: 'Undergraduate Degree' | 'Foundation / Pre-University' | 'Diploma / HND';
  institutionType?: 'Government University' | 'Private College' | 'Overseas University';
  partnerUniversity?: string;      // e.g. "University of Chester (UK)", "Limkokwing University", "University of Essex (UK)"
  tuitionFeeLocal?: string;        // e.g. "BND $18,000 total (SBPP loan eligible)"
  foundationProgression?: string;  // e.g. "Direct progression to Year 1 BA (Hons) or BSc (Hons) degrees"
  polytechnicAcceptance?: string;  // e.g. "Accepts PB Level 5 Diploma (cGPA 2.80+ / Merit) with credit exemption / direct Year 2 entry"
  ibteAcceptance?: string;         // e.g. "Direct entry with IBTE HNTec with Merit / Distinction into PB Diploma or Private College"
  duration: string;
  minPoints: number;
  gradeRequirementText: string;
  subjectPrerequisites: string[];
  hecasCode?: string;
  isScholarshipEligible: boolean;
  moeScholarshipApproved: boolean; // Approved for MOE Overseas Scholarship (minimum 120 pts / BBB)
  sbppLoanApproved: boolean;       // Approved for SBPP Education Loan Scheme (64–112+ pts)
  bspScholarshipApproved: boolean; // Approved for BSP Energy Scholarship
  localGovtApproved: boolean;      // Approved for Brunei Local Govt Tuition & Allowance Scheme
  mkpkAccredited: boolean;         // Accredited by Majlis Kebangsaan Pengiktirafan Kelayakan (MKPK)
  moePrioritySector: string;       // e.g. "Digital Economy (Cluster 4)", "Healthcare", "Energy & Downstream"
  overview: string;
  careerPathways: string[];
  officialUrl: string;
}

export interface ApplicationDeadline {
  id: string;
  title: string;
  category: 'HECAS' | 'Scholarship' | 'UCAS & Overseas' | 'Medical & Visa' | 'University Intake';
  institutionOrBody: string;
  date: string; // YYYY-MM-DD
  time?: string;
  description: string;
  actionRequired: string;
  link?: string;
  isCrucial: boolean;
}

export interface AlumniMentor {
  id: string;
  name: string;
  avatarUrl?: string;
  currentRole: string;
  companyOrMinistry: string;
  university: string;
  country: string;
  degree: string;
  graduationYear: number;
  sixthFormSchool: string;
  scholarshipAwarded: string;
  bio: string;
  specialties: string[];
  availableSlots: string[];
  isVerified: boolean;
  languages: string[];
  totalMenteesHelped: number;
  adviceQuote: string;
}

export interface MentorshipBooking {
  id: string;
  mentorId: string;
  mentorName: string;
  studentName: string;
  studentSchool: string;
  studentEmail: string;
  sessionType: '1-on-1 Video Advice' | 'Personal Statement Review' | 'Interview Simulation' | 'Scholarship Q&A';
  selectedSlot: string;
  topicsToCover: string;
  notes: string;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

export interface AlumniForumPost {
  id: string;
  title: string;
  category: 'MOE Overseas Interview' | 'UCAS Personal Statement' | 'Life in UK / Aus' | 'HECAS Tips' | 'Medicine & MMI' | 'Career in Brunei';
  authorName: string;
  authorRole: string;
  authorUni: string;
  content: string;
  tags: string[];
  upvotes: number;
  timestamp: string;
  replies: {
    id: string;
    authorName: string;
    authorRole: string;
    content: string;
    timestamp: string;
    isMentor: boolean;
  }[];
}

// --- Career Aptitude Test & Program Matcher Types ---
export type AptitudeDomain =
  | 'engineering'
  | 'medical'
  | 'computing'
  | 'law_policy'
  | 'business_finance'
  | 'environmental_creative';

export interface AptitudeOption {
  text: string;
  domainWeights: Record<AptitudeDomain, number>;
  bruneiContextNote?: string;
}

export interface AptitudeQuestion {
  id: number;
  scenario: string;
  contextKicker: string;
  options: AptitudeOption[];
}

export interface CareerMatch {
  id: string;
  title: string;
  malayTitle: string;
  industryCluster: string;
  primaryDomain: AptitudeDomain;
  averageSalaryBnd: string;
  keyEmployersInBrunei: string[];
  wawasanAlignment: string;
  recommendedDegrees: {
    programName: string;
    institution: string;
    country: string;
    minTariff: number;
  }[];
  fundingPathways: ("Sultan's Scholar" | 'MOE Scholarship' | 'BSP Scholarship' | 'SBPP Education Loan' | 'Local Govt Scheme')[];
  roleOverview: string;
  dayInTheLife: string;
}

export interface AptitudeResult {
  scores: Record<AptitudeDomain, number>;
  topDomain: AptitudeDomain;
  secondaryDomain: AptitudeDomain;
  matchedCareers: CareerMatch[];
  completedAt: string;
}

// --- SBPP (Skim Bantuan Pinjaman Pendidikan) Types ---
export interface SbppTier {
  destination: 'Local Institutions (e.g. LCB, PB, UBD, UTB)' | 'United Kingdom & Europe' | 'Australia & New Zealand' | 'Malaysia / Regional';
  minPoints: number;
  tuitionLoanMaxPerYear: number; // in BND
  monthlyAllowanceBnd: number;
  currency: string;
  firstClassConversionEligible: boolean;
  notes: string;
}

// --- Student Progression Dashboard Types ---
export type ApplicationStage = 1 | 2 | 3 | 4 | 5;

export interface TrackedApplication {
  id: string;
  title: string;
  type: 'Government Scholarship' | 'Corporate Scholarship' | 'Education Loan (SBPP)' | 'University HECAS' | 'UCAS Overseas';
  provider: string;
  targetInstitution: string;
  currentStage: ApplicationStage;
  stageName: string;
  deadlineDate: string;
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Interview Scheduled' | 'Awarded';
  tasks: {
    id: string;
    label: string;
    isDone: boolean;
  }[];
  notes?: string;
}

export interface TrackedEssay {
  id: string;
  title: string;
  targetScheme: 'UCAS Personal Statement' | 'MOE Intent Statement' | 'BSP Motivation Letter';
  charCount: number;
  wordCount: number;
  rubricScore: number;
  status: 'Drafting' | 'Alumni Review Requested' | 'Feedback Received' | 'Finalized';
  lastEdited: string;
  notes: string;
}

export interface JourneyMilestone {
  id: string;
  phase: number;
  title: string;
  description: string;
  isCompleted: boolean;
  actionTab: string;
}


