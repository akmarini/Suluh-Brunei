import { TrackedApplication, TrackedEssay, MentorshipBooking, JourneyMilestone } from '../types';

// Cleared defaults for fresh student experience
export const DEFAULT_TRACKED_APPLICATIONS: TrackedApplication[] = [];

export const DEFAULT_TRACKED_ESSAYS: TrackedEssay[] = [];

export const DEFAULT_SCHEDULED_CALLS: MentorshipBooking[] = [];

export const DEFAULT_JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'm1',
    phase: 1,
    title: 'Calculate Qualifications & Tariff Points',
    description: 'Calculate your UCAS tariff points and entry points from predicted or actual GCE A-Levels, IB, Politeknik Level 5 Diploma, or STPUB.',
    isCompleted: false,
    actionTab: 'pathways'
  },
  {
    id: 'm2',
    phase: 2,
    title: 'Complete Career & Degree Aptitude Assessment',
    description: 'Take the Brunei career & degree aptitude assessment matching your interests with high-priority national development sectors (Wawasan 2035).',
    isCompleted: false,
    actionTab: 'aptitude'
  },
  {
    id: 'm3',
    phase: 3,
    title: 'Draft Personal Statement & Motivation Letter',
    description: 'Draft and refine your UCAS personal statement, MOE intent statement, or scholarship letter in the Essay Studio.',
    isCompleted: false,
    actionTab: 'studio'
  },
  {
    id: 'm4',
    phase: 4,
    title: 'Book 1-on-1 Consultation with Alumni Scholar',
    description: 'Schedule a free session with verified Bruneian scholars (BSJV, MOE Overseas, UBD/UTB) for essay reviews and interview prep.',
    isCompleted: false,
    actionTab: 'mentorship'
  },
  {
    id: 'm5',
    phase: 5,
    title: 'Assemble Certified Document Dossier',
    description: 'Obtain certified true copies of Yellow IC, Birth Certificate (Sijil Beranak), GCE O-Level results, and 2 Academic Referee recommendations.',
    isCompleted: false,
    actionTab: 'scholarships'
  },
  {
    id: 'm6',
    phase: 6,
    title: 'Submit HECAS / Overseas Scholarship Portals',
    description: 'Complete online portal submissions (HECAS Round 1/2, MOE Scholarship, or BSP) and submit physical endorsement slips before deadlines.',
    isCompleted: false,
    actionTab: 'deadlines'
  },
  {
    id: 'm7',
    phase: 7,
    title: 'Medical Check & Pre-Departure Briefing (PDB)',
    description: 'Complete medical screening at designated health centres and attend Brunei Students’ Union / MOE pre-departure briefings.',
    isCompleted: false,
    actionTab: 'deadlines'
  }
];

// Curated Brunei Application Presets students can add with 1 click
export const PRESET_APPLICATION_TEMPLATES: TrackedApplication[] = [
  {
    id: 'preset-hecas-local',
    title: 'HECAS 2027 (Local Higher Education)',
    type: 'University HECAS',
    provider: 'Kementerian Pendidikan Brunei Darussalam',
    targetInstitution: 'Universiti Brunei Darussalam (UBD) / UTB / UNISSA / PB',
    currentStage: 1,
    stageName: 'Stage 1: Programme Selection & Requirement Check',
    deadlineDate: '2027-03-05',
    status: 'In Progress',
    notes: 'Credit (C6 or better) in GCE O-Level Bahasa Melayu is mandatory for govt scholarship & $350/mo allowance.',
    tasks: [
      { id: 'h1', label: 'Verify Credit in GCE O-Level Bahasa Melayu (Credit prerequisite for allowance)', isDone: false },
      { id: 'h2', label: 'Create and complete personal profile on the online HECAS portal', isDone: false },
      { id: 'h3', label: 'Select up to 2 institutions and 4 prioritized programmes', isDone: false },
      { id: 'h4', label: 'Pay BND $5 per institution application fee (BIBD Online or Counter)', isDone: false },
      { id: 'h5', label: 'Print, sign, and deliver HECAS physical verification slip', isDone: false }
    ]
  },
  {
    id: 'preset-moe-overseas',
    title: 'Brunei Government Overseas Scholarship',
    type: 'Government Scholarship',
    provider: 'Jabatan Pengurusan Biasiswa, Kementerian Pendidikan (MOE)',
    targetInstitution: 'Top Ranked Overseas University (UK / Australia / New Zealand)',
    currentStage: 1,
    stageName: 'Stage 1: Document Dossier Delivery & Tariff Verification',
    deadlineDate: '2027-03-05',
    status: 'In Progress',
    notes: 'Minimum 120-144 UCAS points required depending on field. Yellow IC citizen required.',
    tasks: [
      { id: 'm1', label: 'Verify Credit in GCE O-Level Bahasa Melayu', isDone: false },
      { id: 'm2', label: 'Certified true copy of Yellow IC (3 copies)', isDone: false },
      { id: 'm3', label: 'Certified true copy of Sijil Beranak (Birth Certificate)', isDone: false },
      { id: 'm4', label: 'Official GCE O-Level & A-Level certified result slips', isDone: false },
      { id: 'm5', label: 'Academic Referee Letter 1 (Subject Tutor)', isDone: false },
      { id: 'm6', label: 'Academic Referee Letter 2 (Subject Tutor)', isDone: false },
      { id: 'm7', label: 'Submit hardcopy dossier to Lapangan Terbang Lama Berakas', isDone: false }
    ]
  },
  {
    id: 'preset-bsp-scholarship',
    title: 'Brunei Shell Petroleum (BSP) Scholarship Scheme',
    type: 'Corporate Scholarship',
    provider: 'Brunei Shell Petroleum Co. Sdn Bhd',
    targetInstitution: 'Engineering / Geosciences / Digital Tech (UK or UTB)',
    currentStage: 1,
    stageName: 'Stage 1: Online Application & Assessment Prep',
    deadlineDate: '2027-03-12',
    status: 'In Progress',
    notes: 'Emphasizes technical excellence, CAR interview methodology, and energy transition alignment.',
    tasks: [
      { id: 'b1', label: 'Submit online application form via Shell Careers portal', isDone: false },
      { id: 'b2', label: 'Complete timed cognitive reasoning assessments (numerical & logical)', isDone: false },
      { id: 'b3', label: 'Complete On-Demand Video Interview (CAR format: Context, Action, Result)', isDone: false },
      { id: 'b4', label: 'Prepare for Shell Live Virtual Assessment & Case Study Presentation', isDone: false }
    ]
  },
  {
    id: 'preset-sbpp-loan',
    title: 'SBPP Education Loan Scheme (Skim Bantuan Pinjaman Pendidikan)',
    type: 'Education Loan (SBPP)',
    provider: 'Kementerian Pendidikan (Jabatan Pengurusan Biasiswa)',
    targetInstitution: 'Laksamana College of Business (LCB) / MKPK Approved Overseas',
    currentStage: 1,
    stageName: 'Stage 1: Guarantors (Penjamin) Identification & Budgeting',
    deadlineDate: '2027-06-30',
    status: 'In Progress',
    notes: 'No government service bond. Eligible for full loan conversion into scholarship upon achieving First Class Honours.',
    tasks: [
      { id: 's1', label: 'Secure unconditional or conditional offer letter from MKPK-recognized institution', isDone: false },
      { id: 's2', label: 'Identify 2 working Bruneian citizen guarantors (Penjamin)', isDone: false },
      { id: 's3', label: 'Obtain latest 3 consecutive months salary slips and bank statements of guarantors', isDone: false },
      { id: 's4', label: 'Submit online SBPP loan application with detailed tuition estimate', isDone: false }
    ]
  },
  {
    id: 'preset-bia-scholarship',
    title: 'Brunei Investment Agency (BIA) Scholarship Scheme',
    type: 'Corporate Scholarship',
    provider: 'Brunei Investment Agency (Ministry of Finance & Economy)',
    targetInstitution: 'Global Finance, Economics, Law & Quantitative Sciences (UK / US / Australia)',
    currentStage: 1,
    stageName: 'Stage 1: CV, Statement of Purpose & Portal Submission',
    deadlineDate: '2027-03-31',
    status: 'In Progress',
    notes: 'Prestigious financial sovereign wealth scholarship. Minimum AAA/AAB requirement.',
    tasks: [
      { id: 'bia1', label: 'Draft tailored finance/economics statement of purpose', isDone: false },
      { id: 'bia2', label: 'Submit academic transcript and CV to BIA careers recruitment portal', isDone: false },
      { id: 'bia3', label: 'Complete online psychometric & situational judgment tests', isDone: false },
      { id: 'bia4', label: 'Attend BIA Panel Assessment Centre and interview presentation', isDone: false }
    ]
  }
];
