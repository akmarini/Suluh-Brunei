import { TrackedApplication, TrackedEssay, MentorshipBooking, JourneyMilestone } from '../types';

export const DEFAULT_TRACKED_APPLICATIONS: TrackedApplication[] = [
  {
    id: 'app-moe-overseas',
    title: 'Brunei Government Overseas Scholarship',
    type: 'Government Scholarship',
    provider: 'Jabatan Pengurusan Biasiswa, Kementerian Pendidikan (MOE)',
    targetInstitution: 'University of Southampton (MEng Mechanical) / Imperial',
    currentStage: 3,
    stageName: 'Stage 3: Document Dossier Delivery & Tariff Verification',
    deadlineDate: '2027-03-05',
    status: 'In Progress',
    notes: 'Minimum 120 UCAS points (BBB) required. Target interview batch in April. Credit in O-Level BM confirmed.',
    tasks: [
      { id: 't0', label: 'Verify Credit (C6 or better) in GCE O-Level Bahasa Melayu', isDone: true },
      { id: 't1', label: 'Certified true copy of Yellow IC (3 copies)', isDone: true },
      { id: 't2', label: 'Certified true copy of Sijil Beranak', isDone: true },
      { id: 't3', label: 'Official GCE O-Level & A-Level result slips', isDone: true },
      { id: 't4', label: 'Academic Referee Letter 1 (Maths Tutor)', isDone: true },
      { id: 't5', label: 'Academic Referee Letter 2 (Physics Tutor)', isDone: false },
      { id: 't6', label: 'Submit hardcopy dossier to Lapangan Terbang Lama Berakas', isDone: false }
    ]
  },
  {
    id: 'app-hecas-local',
    title: 'HECAS 2027 First Round (Local Higher Education)',
    type: 'University HECAS',
    provider: 'Kementerian Pendidikan Brunei Darussalam',
    targetInstitution: 'Universiti Brunei Darussalam (UBD) & UTB',
    currentStage: 2,
    stageName: 'Stage 2: Choice Confirmation & Application Fee Payment',
    deadlineDate: '2027-03-05',
    status: 'In Progress',
    notes: 'Choice 1: UBD-HS01 (Medicine) / Choice 2: UTB-ENG05. Credit in O-Level BM mandatory for govt scholarship & allowance; otherwise fee-paying.',
    tasks: [
      { id: 'h0', label: 'Verify Credit in GCE O-Level Bahasa Melayu (Prerequisite for Scholarship & $350/mo allowance)', isDone: true },
      { id: 'h1', label: 'Complete personal profile on HECAS portal', isDone: true },
      { id: 'h2', label: 'Select 2 institutions & 4 prioritized programmes', isDone: true },
      { id: 'h3', label: 'Pay BND $5 per institution application fee (BIBD Online)', isDone: true },
      { id: 'h4', label: 'Print and sign HECAS acknowledgement slip', isDone: false }
    ]
  },
  {
    id: 'app-bsp-scholarship',
    title: 'Brunei Shell Petroleum (BSP) Scholarship Scheme',
    type: 'Corporate Scholarship',
    provider: 'Brunei Shell Petroleum Co. Sdn Bhd',
    targetInstitution: 'UK Engineering Degree / UTB Petroleum',
    currentStage: 2,
    stageName: 'Stage 2: Online Cognitive & CAR Video Assessment',
    deadlineDate: '2027-03-12',
    status: 'In Progress',
    notes: 'Practicing CAR (Context, Action, Result) interview methodology with alumni.',
    tasks: [
      { id: 'b1', label: 'Submit online application via Shell Careers portal', isDone: true },
      { id: 'b2', label: 'Complete numerical and logical reasoning tests', isDone: true },
      { id: 'b3', label: 'Complete On-Demand Video Interview (CAR format)', isDone: false },
      { id: 'b4', label: 'Prepare for Shell Live Virtual Assessment (Business Case)', isDone: false }
    ]
  },
  {
    id: 'app-sbpp-backup',
    title: 'SBPP Education Loan Scheme (Back-up Financing)',
    type: 'Education Loan (SBPP)',
    provider: 'Kementerian Pendidikan (Jabatan Pengurusan Biasiswa)',
    targetInstitution: 'Laksamana College of Business (LCB) / MKPK Approved Overseas',
    currentStage: 1,
    stageName: 'Stage 1: Guarantors (Penjamin) Identification & Budgeting',
    deadlineDate: '2027-06-30',
    status: 'Not Started',
    notes: 'No government service bond. First Class Honours conversion eligible!',
    tasks: [
      { id: 's1', label: 'Secure firm offer letter from MKPK-recognized institution', isDone: false },
      { id: 's2', label: 'Identify 2 working Bruneian citizen guarantors (Penjamin)', isDone: false },
      { id: 's3', label: 'Obtain latest 3 months salary slips of guarantors', isDone: false },
      { id: 's4', label: 'Submit online SBPP loan form with tuition estimate', isDone: false }
    ]
  }
];

export const DEFAULT_TRACKED_ESSAYS: TrackedEssay[] = [
  {
    id: 'essay-ucas',
    title: 'UCAS Undergraduate Personal Statement (Engineering & Computing)',
    targetScheme: 'UCAS Personal Statement',
    charCount: 3450,
    wordCount: 560,
    rubricScore: 75,
    status: 'Alumni Review Requested',
    lastEdited: 'Today, 2:15 PM',
    notes: 'Draft submitted to Amirul Syafiq (Imperial / BSP Alum) for supercurricular critique.'
  },
  {
    id: 'essay-moe',
    title: 'MOE Overseas Scholarship Statement of Intent (Wawasan 2035)',
    targetScheme: 'MOE Intent Statement',
    charCount: 2240,
    wordCount: 485,
    rubricScore: 85,
    status: 'Drafting',
    lastEdited: 'Yesterday, 8:40 PM',
    notes: 'Focused on Brunei’s downstream diversification and renewable grid transition.'
  }
];

export const DEFAULT_SCHEDULED_CALLS: MentorshipBooking[] = [
  {
    id: 'call-1',
    mentorId: 'mentor-amirul',
    mentorName: 'Amirul Syafiq Pg Hj Metussin',
    studentName: 'Siti Nurhaliza',
    studentSchool: 'Maktab Duli PMAMB',
    studentEmail: 'siti.nurhaliza@md.edu.bn',
    sessionType: 'Personal Statement Review',
    selectedSlot: 'Friday 4:30 PM (Brunei Time)',
    topicsToCover: 'Reviewing draft personal statement, supercurricular project discussion, and BSP interview CAR format tips.',
    notes: 'Google Meet link generated: meet.google.com/suluh-bsp-prep',
    status: 'Confirmed',
    createdAt: '2026-10-01T14:00:00Z'
  },
  {
    id: 'call-2',
    mentorId: 'mentor-nadhirah',
    mentorName: 'Dr. Nadhirah Hj Awang',
    studentName: 'Siti Nurhaliza',
    studentSchool: 'Maktab Duli PMAMB',
    studentEmail: 'siti.nurhaliza@md.edu.bn',
    sessionType: 'Interview Simulation',
    selectedSlot: 'Saturday 10:00 AM (Brunei Time)',
    topicsToCover: 'Mock UBD PAPRSB IHS Multiple Mini Interview (MMI) clinical ethics station simulation.',
    notes: 'Google Meet link generated: meet.google.com/suluh-mmi-sim',
    status: 'Confirmed',
    createdAt: '2026-10-02T09:30:00Z'
  }
];

export const DEFAULT_JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'm1',
    phase: 1,
    title: 'Sixth Form Qualifications & Tariff Points Calculated',
    description: 'Calculated 136+ UCAS tariff points from predicted GCE A-Levels (Maths A, Physics A, Chemistry B).',
    isCompleted: true,
    actionTab: 'pathways'
  },
  {
    id: 'm2',
    phase: 2,
    title: 'Career Aptitude Assessment & University Degree Matching',
    description: 'Completed aptitude analysis matching with Engineering Operations and AI/Data infrastructure careers in Brunei.',
    isCompleted: true,
    actionTab: 'aptitude'
  },
  {
    id: 'm3',
    phase: 3,
    title: 'Personal Statement & Motivation Letter Drafting',
    description: 'Drafted 3,450 characters in Essay Studio. Currently under review with Imperial / BSP alumnus.',
    isCompleted: true,
    actionTab: 'studio'
  },
  {
    id: 'm4',
    phase: 4,
    title: '1-on-1 Mentorship Sessions Scheduled with Verified Scholars',
    description: 'Booked 2 sessions with Dr. Nadhirah (UBD MMI) and Amirul Syafiq (BSP Engineering).',
    isCompleted: true,
    actionTab: 'mentorship'
  },
  {
    id: 'm5',
    phase: 5,
    title: 'Certified Brunei Document Dossier Assembly',
    description: 'Obtain certified true copies of Yellow IC, Birth Cert, O-Levels, and 2 Academic Referee recommendations.',
    isCompleted: false,
    actionTab: 'scholarships'
  },
  {
    id: 'm6',
    phase: 6,
    title: 'HECAS Round 1 & MOE Overseas / SBPP Formal Submissions',
    description: 'Submit online portal forms and deliver physical verification slips before March 5 deadline.',
    isCompleted: false,
    actionTab: 'deadlines'
  },
  {
    id: 'm7',
    phase: 7,
    title: 'RIPAS Hospital Medical Check & Pre-Departure Briefing (PDB)',
    description: 'Chest X-ray / TB clearance at Berakas Health Centre and attending the Brunei Students’ Union PDB.',
    isCompleted: false,
    actionTab: 'deadlines'
  }
];
