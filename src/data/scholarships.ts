import { Scholarship } from '../types';

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'moe-overseas',
    title: 'Brunei Government Overseas Scholarship',
    malayTitle: 'Skim Biasiswa Kerajaan Ke Luar Negeri (Kementerian Pendidikan)',
    provider: 'Jabatan Pengurusan Biasiswa, Kementerian Pendidikan (MOE)',
    type: 'Government',
    coverageType: 'Full Scholarship',
    destinationAllowed: 'Overseas Only',
    bondYears: 5,
    bondEmployer: "Government of His Majesty The Sultan and Yang Di-Pertuan of Brunei Darussalam",
    minPoints: 120,
    minGradesDescription: 'Minimum 120 UCAS tariff points from 3 A-Level subjects (e.g. BBB / ABB), or IB equivalent (typically 32-34+ points), with mandatory Credit (Grade C6 or better) in GCE O-Level Bahasa Melayu and English Language / IELTS 6.5+',
    citizenshipRequirement: 'Citizens of Brunei Darussalam (Holders of Brunei Yellow IC only)',
    monthlyAllowanceEstimate: 'Approx. £1,150 – £1,350/mo (UK) or AUD $1,600 – $1,850/mo (Australia) plus warm clothing and book allowances',
    benefits: [
      '100% Tuition and university exam fees',
      'Monthly maintenance allowance',
      'Return economy flight tickets at start/end and mid-term',
      'Warm clothing allowance upon initial departure',
      'Annual book & equipment allowance',
      'Comprehensive National Health Service (IHS / OSHC) health cover',
      'Excess luggage allowance for departure & final return'
    ],
    keyCriteria: [
      'Must hold a valid Brunei Darussalam Yellow Identity Card',
      'MANDATORY PREREQUISITE: Credit (Grade C6 or better) in GCE O-Level Bahasa Melayu (Brunei-Cambridge). Applicants without this credit are not eligible for government scholarship.',
      'Course must be aligned with Manpower Planning and Employment Council (MPEC) priority areas (Digital Economy, Energy, Green Technology, Engineering, Healthcare, Law)',
      'Conditional or unconditional offer from an approved overseas university (typically Top 50-100 worldwide or Russell Group / Go8)',
      'Pass medical examination at RIPAS Hospital including chest X-ray / TB clearance',
      'Successful performance at the MOE Scholarship Interview Panel'
    ],
    applicationPeriod: 'Mid-January to early March (aligned with HECAS 1st Round)',
    deadlineDate: '2027-03-05',
    status: 'Open',
    officialUrl: 'https://moe.gov.bn/SitePages/Scholarship.aspx',
    hecasRequired: true,
    mpecPriorityAligned: true,
    requiredDocuments: [
      'Certified copy of Brunei Yellow IC (Kad Pengenalan Kuning)',
      'Certified copy of Sijil Beranak (Birth Certificate)',
      'Official GCE O-Level & A-Level or IB result certificates',
      'HECAS Application acknowledgement slip',
      'Firm university admission letter / UCAS track screenshot',
      'Co-Curricular Activities (CCA) certificates & testimonial records',
      'Two academic referee recommendations'
    ],
    selectionStages: [
      'Stage 1: HECAS Online Application & Document Submission to Scholarship Section',
      'Stage 2: Eligibility screening & tariff point verification (minimum 120 points)',
      'Stage 3: Written assessment & aptitude screening (for select disciplines)',
      'Stage 4: Panel Interview with senior Ministry officials and university deans',
      'Stage 5: Conditional award letter, medical check at RIPAS Hospital, and bond signing'
    ],
    alumniTips: [
      'Align your personal statement with Brunei Vision 2035 (Wawasan Brunei 2035) goals.',
      'During the panel interview, be ready to answer in both English and Malay regarding how your degree contributes back to Brunei.',
      'Keep abreast of current local news via Pelita Brunei and RTB, especially economic diversification topics.'
    ]
  },
  {
    id: 'sultans-scholar',
    title: "His Majesty The Sultan's Scholar Scheme",
    malayTitle: "Biasiswa 'Sultan's Scholar' Yayasan Sultan Haji Hassanal Bolkiah",
    provider: 'Yayasan Sultan Haji Hassanal Bolkiah (YSHHB)',
    type: 'Royal',
    coverageType: 'Full Scholarship',
    destinationAllowed: 'Overseas Only',
    bondYears: 5,
    bondEmployer: "Yayasan Sultan Haji Hassanal Bolkiah / Government Service",
    minPoints: 360,
    minGradesDescription: 'Outstanding academic excellence: Typically minimum 3 to 4 A* / A grades at GCE A-Levels or 38+ IB points, or exceptional Mumtaz at Pra-Universiti SMALHB',
    citizenshipRequirement: 'Citizens of Brunei Darussalam (Holders of Brunei Yellow IC only)',
    monthlyAllowanceEstimate: 'Top-tier prestige living allowance, research stipend, and elite mentor support',
    benefits: [
      'Full tuition at world-renowned institutions (e.g. Oxford, Cambridge, Imperial, Harvard, Al-Azhar)',
      'Generous monthly living allowance & residential housing',
      'Annual academic enhancement & conference travel grant',
      'Full royal sponsorship & bespoke leadership development programs',
      'Direct audience and presentation during the Sultan’s Scholar Award Ceremony'
    ],
    keyCriteria: [
      'Demonstrated high moral character, Islamic values (MIB - Melayu Islam Beraja), and leadership',
      'Unconditional or firm conditional offer at top-ranked universities worldwide',
      'Active participation in national and international competitions / community service',
      'Rigorous multi-stage interview by the Sultan’s Scholar Selection Committee'
    ],
    applicationPeriod: 'February to April annually',
    deadlineDate: '2027-04-15',
    status: 'Opening Soon',
    officialUrl: 'https://www.yshhb.org.bn',
    hecasRequired: false,
    mpecPriorityAligned: true,
    requiredDocuments: [
      'Complete Sultan’s Scholar Application Dossier',
      'Certified copies of Yellow IC, Birth Certificate, and Passport',
      'Comprehensive portfolio of academic awards, Olympiad achievements, and leadership records',
      'Personal essay on contribution to Brunei Darussalam’s sovereign development',
      'Three letters of confidential academic recommendation'
    ],
    selectionStages: [
      'Stage 1: Portfolio assessment & academic audit (A* grade profile)',
      'Stage 2: Comprehensive psychometric & cognitive evaluation',
      'Stage 3: Group discussion & leadership simulation exercise',
      'Stage 4: Final Panel Interview with Yayasan Board of Directors and Cabinet members',
      'Stage 5: Royal endorsement and award conferment'
    ],
    alumniTips: [
      'Reflect deeply on MIB principles and how your chosen discipline bridges tradition with advanced innovation.',
      'Be prepared to articulate your 10-year post-graduation vision for Brunei with concrete milestones.',
      'Show authentic humility, emotional resilience, and deep pride in serving the nation.'
    ]
  },
  {
    id: 'bsp-scholarship',
    title: 'Brunei Shell Petroleum (BSP) Scholarship Scheme',
    malayTitle: 'Skim Biasiswa Syarikat Minyak Brunei Shell (BSP)',
    provider: 'Brunei Shell Petroleum Company Sdn Bhd',
    type: 'Corporate',
    coverageType: 'Full Scholarship',
    destinationAllowed: 'Both Local & Overseas',
    bondYears: 4,
    bondEmployer: 'Brunei Shell Petroleum (BSP) or affiliate Brunei Shell Joint Ventures (BSJV)',
    minPoints: 320,
    minGradesDescription: 'Minimum grades of ABB or AAB at A-Levels (Mathematics and Physics or Chemistry usually mandatory) or equivalent IB/Diploma with high distinction',
    citizenshipRequirement: 'Citizens of Brunei Darussalam (Brunei Yellow IC holders only)',
    monthlyAllowanceEstimate: 'Competitive corporate stipend (GBP £1,200/mo UK, or BND $650/mo local) + paid industrial attachments',
    benefits: [
      'Full tuition fees at approved UK, Australian, or local universities (UTB/UBD)',
      'Guaranteed summer vacation work placement / internship within BSP',
      'Direct pathway to BSP Graduate Development Programme upon degree completion',
      'Laptop & software allowance',
      'Medical insurance and annual return flights (for overseas scholars)'
    ],
    keyCriteria: [
      'Enrolling in disciplines vital to energy transformation: Mechanical, Chemical, Electrical, Petroleum Engineering, Geophysics, Data Analytics, or Renewable Energy',
      'Strong leadership qualities and agility demonstrated through Shell Assessment stages',
      'Pass Shell Health medical standard'
    ],
    applicationPeriod: 'January to mid-March',
    deadlineDate: '2027-03-12',
    status: 'Open',
    officialUrl: 'https://www.bsp.com.bn/careers',
    hecasRequired: false,
    mpecPriorityAligned: true,
    requiredDocuments: [
      'BSP Online Application Form and CV',
      'Certified Yellow IC and Academic Transcripts',
      'Statement of Purpose highlighting motivation for the energy industry',
      'Proof of university applications / offers'
    ],
    selectionStages: [
      'Stage 1: Online Application & Cognitive Numerical/Logical Tests',
      'Stage 2: On-demand video interview (CAR method: Context, Action, Result)',
      'Stage 3: Shell Live Virtual Assessment (Business Case Study & Presentation)',
      'Stage 4: Executive Interview with BSP Technical Leads & HR',
      'Stage 5: Final Contract Signing in Seria / Panaga'
    ],
    alumniTips: [
      'Brush up on the global energy transition and Brunei’s decarbonization roadmap (Brunei National Climate Change Policy).',
      'Structure all interview answers using the STAR/CAR format with measurable outcomes.',
      'Show genuine curiosity about how BSP operates both offshore platforms and digital automation hubs.'
    ]
  },
  {
    id: 'mindef-rbaf-scholarship',
    title: 'Ministry of Defence / RBAF Scholarship Scheme',
    malayTitle: 'Biasiswa Pemerintah Tertinggi ABDB / Biasiswa Angkatan Bersenjata Diraja Brunei',
    provider: 'Ministry of Defence Brunei Darussalam (MinDef)',
    type: 'Government',
    coverageType: 'Full Scholarship',
    destinationAllowed: 'Both Local & Overseas',
    bondYears: 6,
    bondEmployer: 'Royal Brunei Armed Forces (ABDB) / Ministry of Defence',
    minPoints: 120,
    minGradesDescription: 'Minimum BBB at GCE A-Levels or equivalent, strong physical fitness, medical Grade 1',
    citizenshipRequirement: 'Citizens of Brunei Darussalam (Yellow IC), Malay race',
    monthlyAllowanceEstimate: 'Officer cadet training salary + overseas educational allowance',
    benefits: [
      'Full tuition fees at prestigious military academies (e.g. Royal Military Academy Sandhurst, RAF Cranwell, Britannia Royal Naval College) and top universities',
      'Commission as an Officer in the Royal Brunei Armed Forces',
      'Comprehensive defense training, leadership expeditions, and defense diplomacy'
    ],
    keyCriteria: [
      'Pass Defence Fitness Assessment Test (DFAT)',
      'Excellent medical and eye test standards',
      'High patriotism, discipline, and commitment to the sovereign defense of Brunei'
    ],
    applicationPeriod: 'February to April',
    deadlineDate: '2027-04-30',
    status: 'Opening Soon',
    officialUrl: 'https://mindef.gov.bn',
    hecasRequired: false,
    mpecPriorityAligned: true,
    requiredDocuments: [
      'MinDef Scholarship Application Form',
      'Certified Yellow IC and Family details',
      'O-Level and A-Level result slips',
      'Sports and Uniformed Group (Kadet Tentera/Polis/Pengakap) certificates'
    ],
    selectionStages: [
      'Stage 1: Initial physical screening & height/weight audit',
      'Stage 2: Defence Fitness Assessment Test (1.5 mile run, pushups, sit-ups)',
      'Stage 3: Potential Officer Selection Board (POSB) 3-day practical assessment',
      'Stage 4: High-level MinDef Board Interview',
      'Stage 5: Sandhurst / University placement confirmation'
    ],
    alumniTips: [
      'Begin rigorous cardio and endurance preparation at least 3 months in advance.',
      'Demonstrate calm decision-making and teamwork under physical fatigue during POSB.',
      'Understand Brunei’s national security architecture and ASEAN regional peacekeeping.'
    ]
  },
  {
    id: 'brunei-gov-local-scholarship',
    title: 'Brunei Government Local University Scholarship',
    malayTitle: 'Biasiswa Kerajaan Ke Institusi Pengajian Tinggi Tempatan (UBD, UTB, UNISSA, PB)',
    provider: 'Kementerian Pendidikan Brunei (via HECAS)',
    type: 'Government',
    coverageType: 'Tuition & Allowance',
    destinationAllowed: 'Local Only',
    bondYears: 3,
    bondEmployer: 'Public or Private Sector in Brunei Darussalam',
    minPoints: 64,
    minGradesDescription: 'Varies by programme: from 48–64 points for Diplomas and select Arts / Private degrees, 80–112 points for Business / Computing / Engineering, up to 144 points for UBD Medicine. MANDATORY: Credit (C6 or better) in GCE O-Level Bahasa Melayu.',
    citizenshipRequirement: 'Citizens of Brunei Darussalam (Yellow IC holders)',
    monthlyAllowanceEstimate: 'BND $300 – $350 monthly living allowance + book/thesis subsidies (For Scholarship holders only; Fee-Paying students receive no allowance)',
    benefits: [
      'Full tuition fee exemption for all semester years (for students meeting all prerequisites including BM credit)',
      'Monthly living allowance directly deposited to student bank account (BND $350/mo)',
      'Subsidy for Discovery Year study abroad / internship projects at UBD/UTB',
      'Access to on-campus accommodation facilities at The Core (UBD) / Residential halls'
    ],
    keyCriteria: [
      'Offered admission through HECAS into UBD, UTB, UNISSA, or Politeknik Brunei',
      'Citizen of Brunei Darussalam holding Yellow Identity Card',
      'MANDATORY PREREQUISITE: Credit (Grade C6 or better) in GCE O-Level Bahasa Melayu.',
      'FEE-PAYING STATUS CLAUSE: Any student (including Yellow IC citizens) who meets academic points but DOES NOT have a Credit in O-Level Bahasa Melayu will be admitted strictly as a FEE-PAYING student (Pelajar Berbayar), responsible for all university tuition fees and ineligible for the government monthly allowance.',
      'Maintain required minimum GPA / cGPA per academic semester'
    ],
    applicationPeriod: 'Applied automatically when registering through HECAS',
    deadlineDate: '2027-03-05',
    status: 'Open',
    officialUrl: 'https://hecas.moe.gov.bn',
    hecasRequired: true,
    mpecPriorityAligned: true,
    requiredDocuments: [
      'HECAS submission confirmation and fee payment receipt (BND $5 per institution)',
      'Uploaded digital scans of Yellow IC and Birth Certificate',
      'Official GCE O-Level certificate proving Credit in Bahasa Melayu (Code 1201 / 1123)',
      'Official GCE A-Level / IB / Diploma examination certificates and transcripts'
    ],
    selectionStages: [
      'Stage 1: HECAS submission with prioritized university choices (Max 2 institutions, 2 programmes each)',
      'Stage 2: Institutional review by university admissions deanery (Academic grades + O-Level BM Credit audit)',
      'Stage 3: Multiple Mini Interviews (MMI) or written tests (specifically for PAPRSB IHS Medicine/Dentistry & Architecture)',
      'Stage 4: HECAS release of results, verifying either Scholarship status (with BM credit) or Fee-Paying status (without BM credit)'
    ],
    alumniTips: [
      'CRITICAL: Check your O-Level Bahasa Melayu result carefully. Even with straight As at A-Level, failing to have a Credit (C6) means you will be classified as a Fee-Paying student (Pelajar Berbayar) without any monthly allowance ($350/mo).',
      'If you have a D7 or below in O-Level BM, register immediately for the May/June or Oct/Nov Cambridge O-Level resit to convert your status to scholarship holder.',
      'Explore UBD’s Discovery Year or UTB’s Experience+ programme early to tailor your career trajectory.'
    ]
  },
  {
    id: 'chevening-commonwealth',
    title: 'Chevening & Commonwealth Scholarships for Bruneians',
    malayTitle: 'Biasiswa Chevening & Komanwel United Kingdom',
    provider: 'UK Foreign, Commonwealth & Development Office (FCDO)',
    type: 'International',
    coverageType: 'Full Scholarship',
    destinationAllowed: 'Overseas Only',
    bondYears: 0,
    bondEmployer: 'Return to Brunei for minimum 2 years post-graduation',
    minPoints: 340,
    minGradesDescription: 'Primarily targeted at postgraduate master’s level or final-year undergraduate high-flyers with strong leadership portfolio',
    citizenshipRequirement: 'Bruneian citizens eligible to live and study in the UK',
    monthlyAllowanceEstimate: 'Full UK living stipend (£1,300 – £1,500/mo depending on London weighting)',
    benefits: [
      '100% University tuition fees paid in full',
      'Monthly living allowance',
      'Economy return flights to the UK',
      'Arrival allowance and departure allowance',
      'Exclusive networking events with British High Commission in Bandar Seri Begawan'
    ],
    keyCriteria: [
      'Commitment to return to Brunei for at least two years after award completes',
      'Demonstrated potential to be future leaders, decision-makers, and opinion formers in Brunei'
    ],
    applicationPeriod: 'August to early November annually',
    deadlineDate: '2026-11-05',
    status: 'Opening Soon',
    officialUrl: 'https://www.chevening.org/scholarship/brunei/',
    hecasRequired: false,
    mpecPriorityAligned: false,
    requiredDocuments: [
      'Three Chevening leadership essays',
      'Official academic transcripts & certified degree certificates',
      'Two references'
    ],
    selectionStages: [
      'Stage 1: Global essay and application review in London',
      'Stage 2: Shortlisting for face-to-face interview at the British High Commission in Brunei',
      'Stage 3: Conditional offer requiring 3 unconditional university offers'
    ],
    alumniTips: [
      'The Chevening essay questions demand specific, authentic examples of leadership—focus on impact in your school or local Brunei community.'
    ]
  }
];
