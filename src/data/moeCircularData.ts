/**
 * SURAT PEMBERITAHUAN KEMENTERIAN PENDIDIKAN, NEGARA BRUNEI DARUSSALAM
 * BILANGAN: 14 / 2025
 * 
 * BIASISWA KERAJAAN KEBAWAH DULI YANG MAHA MULIA PADUKA SERI BAGINDA SULTAN
 * DAN YANG DI-PERTUAN NEGARA BRUNEI DARUSSALAM KE LUAR NEGERI (UMUM)
 * BAGI SESI AKADEMIK 2026/2027
 * 
 * Rujukan: KPE/S19/C/SUT
 * Bertarikh: 02 Rejab 1447 / 23 Disember 2025
 * Ditandatangani oleh: Dr Haji Azman bin Ahmad (Setiausaha Tetap Pengajian Tinggi)
 */

export interface MoePriorityCourse {
  number: number;
  category: 'A' | 'B' | 'C';
  categoryTitle: string;
  isEducatorScheme?: boolean; // Skim Pendidik (Diikat Janji sebagai Pendidik)
  title: string;
  field: string;
  degreeType: string;
  careerOutcomes: string[];
  featuredInstitutions?: string[];
}

export interface MoeScholarshipCircular {
  circularNumber: string;
  academicSession: string;
  reference: string;
  dateMalay: string;
  dateGregorian: string;
  signatory: {
    name: string;
    role: string;
    ministry: string;
  };
  generalFirstDegree: {
    citizenship: string;
    bmRequirement: string;
    englishOptions: string[];
    ageLimit: string;
    ageCutoffDate: string;
    aLevelRequirement: {
      minSubjects: number;
      sittingRule: string;
      validityPeriod: string;
      minTariffPointsNew: number;
      minTariffPointsOld: number;
      minGradeRule: string;
      tariffTable: { grade: string; newPoints: number; oldPoints: number }[];
    };
    ibRequirement: {
      minPoints: number;
      validityPeriod: string;
    };
    diplomaRequirement: {
      types: string;
      minAchievement: string;
      validityPeriod: string;
    };
  };
  medicineDentistry: {
    englishRequirement: string;
    aLevelRequirement: {
      minSubjects: number;
      sittingRule: string;
      validityPeriod: string;
      minTariffPointsNew: number;
      minTariffPointsOld: number;
      minGradeRule: string;
    };
    ibRequirement: {
      minPoints: number;
      validityPeriod: string;
    };
  };
  universityRankingRules: {
    generalRule: string;
    subjectRule: string;
    top20OverallRule: string;
    outside250Rule: string;
    acceptedRankings: string[];
    mandatoryAccreditation: string;
  };
  applicationProcedures: {
    portal: string;
    round: string;
    physicalCounter: string;
    requiredDocuments: string[];
    emailSoftcopy: string;
    submissionGracePeriod: string;
    intakeMonths: string[];
  };
  additionalConditions: string[];
  ineligibilityClauses: string[];
  courses: MoePriorityCourse[];
}

export const MOE_CIRCULAR_14_2025: MoeScholarshipCircular = {
  circularNumber: '14 / 2025',
  academicSession: '2026/2027',
  reference: 'KPE/S19/C/SUT',
  dateMalay: '02 Rejab 1447',
  dateGregorian: '23 Disember 2025',
  signatory: {
    name: 'Dr Haji Azman bin Ahmad',
    role: 'Setiausaha Tetap (Pengajian Tinggi)',
    ministry: 'Kementerian Pendidikan, Negara Brunei Darussalam'
  },
  generalFirstDegree: {
    citizenship: 'Rakyat Kebawah Duli Yang Maha Mulia Paduka Seri Baginda Sultan dan Yang Di-Pertuan Negara Brunei Darussalam yang memegang kad pengenalan berwarna kuning.',
    bmRequirement: 'Memperolehi sekurang-kurangnya Kredit C6 bagi matapelajaran Bahasa Melayu dalam Peperiksaan Sijil Am Pelajaran Brunei Cambridge Peringkat Biasa (BC-GCE ‘O’ Level).',
    englishOptions: [
      'Sekurang-kurangnya Kredit C6 bagi mata pelajaran Bahasa Inggeris BC-GCE ‘O’ Level',
      'Sekurang-kurangnya Gred C bagi mata pelajaran IGCSE English as a Second Language atau yang sebanding dengannya',
      'Sekurang-kurangnya Gred c bagi mata pelajaran General Paper BC-GCE ‘AS’ Level',
      'Band keseluruhan sekurang-kurangnya 6.5 dalam ujian IELTS yang diperolehi tidak melebihi dua tahun kebelakangan'
    ],
    ageLimit: 'Umur tidak melebihi 26 tahun',
    ageCutoffDate: '01/09/2026',
    aLevelRequirement: {
      minSubjects: 3,
      sittingRule: 'Dalam sekali duduk (single sitting)',
      validityPeriod: 'Dalam tempoh 2 tahun kebelakangan',
      minTariffPointsNew: 120,
      minTariffPointsOld: 300,
      minGradeRule: 'Bagi 3 (tiga) mata pelajaran terbaik dan setiap mata pelajaran hendaklah tidak kurang daripada Gred C',
      tariffTable: [
        { grade: 'A*', newPoints: 56, oldPoints: 140 },
        { grade: 'A', newPoints: 48, oldPoints: 120 },
        { grade: 'B', newPoints: 40, oldPoints: 100 },
        { grade: 'C', newPoints: 32, oldPoints: 80 },
        { grade: 'D', newPoints: 24, oldPoints: 60 },
        { grade: 'E', newPoints: 16, oldPoints: 40 }
      ]
    },
    ibRequirement: {
      minPoints: 32,
      validityPeriod: 'Dalam tempoh 2 tahun kebelakangan'
    },
    diplomaRequirement: {
      types: 'Diploma Lanjutan (Advanced Diploma) / Diploma Tertinggi Kebangsaan (HND) / Level 5 Diploma',
      minAchievement: 'Mencapai tahap Distinction atau Gred A mengikut penggredan dari institusi berkenaan',
      validityPeriod: 'Dalam tempoh 2 tahun kebelakangan'
    }
  },
  medicineDentistry: {
    englishRequirement: 'Memperolehi sekurang-kurangnya Kredit B3 bagi matapelajaran Bahasa Inggeris dalam peperiksaan BC-GCE ‘O’ Level, ATAU sekurang-kurangnya Gred B bagi matapelajaran IGCSE English Language as a Second Language atau yang sebanding dengannya.',
    aLevelRequirement: {
      minSubjects: 3,
      sittingRule: 'Dalam mata-mata pelajaran yang bersesuaian dalam sekali duduk',
      validityPeriod: 'Dalam tempoh 2 tahun kebelakangan',
      minTariffPointsNew: 144,
      minTariffPointsOld: 360,
      minGradeRule: 'Bagi 3 (tiga) mata pelajaran terbaik dan setiap matapelajaran hendaklah tidak kurang daripada Gred A (e.g. AAA = 144 mata)'
    },
    ibRequirement: {
      minPoints: 38,
      validityPeriod: 'Dalam tempoh 2 tahun kebelakangan'
    }
  },
  universityRankingRules: {
    generalRule: 'Mendapat tawaran untuk mengikuti pengajian di universiti yang berkedudukan 250 teratas dunia (Top 250 World Universities) mengikut QS World University (QSWU) Rankings 2026 atau Times Higher Education World University (THEWU) Rankings 2026.',
    subjectRule: 'Mendapat tawaran untuk mengikuti pengajian di universiti yang berkedudukan 20 teratas dunia (Top 20 World Universities) mengikut bidang (subjek) QSWU Rankings 2026 atau THEWU Rankings 2026.',
    top20OverallRule: 'Pemohon yang mendapat tawaran di universiti berkedudukan 20 teratas dunia secara keseluruhan (Top 20 World Universities) akan diberi pertimbangan secara case by case.',
    outside250Rule: 'Pemohon yang mendapat tawaran di luar 250 universiti teratas dunia dalam bidang-bidang keperluan negara, akan dinilai secara case by case.',
    acceptedRankings: [
      'QS World University (QSWU) Rankings 2026',
      'Times Higher Education World University (THEWU) Rankings 2026'
    ],
    mandatoryAccreditation: 'Diiktiraf oleh Majlis Kebangsaan Pengiktirafan Kelulusan (MKPK), Kementerian Pendidikan Brunei Darussalam.'
  },
  applicationProcedures: {
    portal: 'https://hecas.moe.gov.bn',
    round: 'HECAS Pusingan Pertama sahaja',
    physicalCounter: 'Jabatan Pengurusan Biasiswa, Kaunter No. 3, Lantai Dasar, Blok C, Pusat Perkhidmatan Setempat, Kementerian Pendidikan',
    requiredDocuments: [
      'Senarai semak permohonan Biasiswa (diperolehi dari sistem HECAS)',
      'Salinan borang HECAS (1 keping) dan Borang B (3 keping)',
      'Salinan kad pengenalan pintar Brunei (Kuning)',
      'Salinan surat tawaran tempat pengajian (Conditional / Unconditional Offer) - pengesahan membuat permohonan adalah memadai jika belum menerima',
      'Isi kandungan kursus (course content / structure)',
      'Salinan sijil dan dokumen yang disahkan (certified true copies) oleh Pengetua Sekolah / Pendaftar Mahkamah',
      'Surat pengiktirafan kursus atau program dan tempat pengajian oleh Majlis Kebangsaan Pengiktirafan Kelulusan (MKPK)',
      'Borang deklarasi maklumat Biasiswa'
    ],
    emailSoftcopy: 'applyscholarship@moe.gov.bn',
    submissionGracePeriod: '3 hari waktu bekerja selepas tarikh tutup HECAS (kedua-dua hardcopy dan softcopy)',
    intakeMonths: ['Ogos / September 2026', 'Januari / Februari 2027']
  },
  additionalConditions: [
    'Lulus dalam proses-proses pemilihan (temuduga dan sebagainya) yang ditetapkan oleh Kementerian Pendidikan dengan mencapai tahap peratus yang ditetapkan.',
    'Bersih dalam tapisan keselamatan.',
    'Disahkan sihat dalam pemeriksaan kesihatan (sahlaku untuk 6 bulan).',
    'Kursus atau program dan tempat pengajian yang akan diikuti hendaklah diiktiraf oleh Majlis Kebangsaan Pengiktirafan Kelulusan (MKPK).',
    'Pemohon yang berjaya akan diikatjanji untuk berkhidmat dengan Kerajaan mengikut tempoh ikatjanji yang telah ditetapkan.'
  ],
  ineligibilityClauses: [
    'Tidak memenuhi syarat-syarat utama dan tambahan.',
    'Sedang berkhidmat dengan Kerajaan sama ada dalam jawatan tetap, percubaan, open vote atau gaji hari (Surat Keliling JPM bil. 27/1988 & 10/2006) dan mana-mana syarikat swasta yang established.',
    'Permohonan yang dihantar selepas tarikh tutup, tidak lengkap, tidak disahkan, atau mempunyai maklumat palsu.',
    'Pemohon yang sudah diterima atau sedang mengikuti pengajian di IPTA tempatan di bawah Biasiswa Kerajaan Dalam Negeri di tahap pengajian yang sama mengikut BDQF.',
    'Pemohon yang memperolehi kelulusan di tahap pengajian yang sama mengikut BDQF sama ada di luar atau dalam negara.'
  ],
  courses: [
    // --- SECTION A: LIFE SCIENCES AND MEDICINE (1-15) ---
    {
      number: 1,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc Medical and Surgery (MBBS)',
      field: 'Medicine & Health Sciences',
      degreeType: 'Clinical Medical Degree',
      careerOutcomes: ['Medical Officer at Ministry of Health', 'Specialist Physician / Surgeon', 'Clinical Researcher'],
      featuredInstitutions: [
        'Universiti Brunei Darussalam (PAPRSB IHS - Twinning Track)',
        'University of Aberdeen (UK - IHS Partner)',
        'University of Glasgow (UK - IHS Partner)',
        'King’s College London (UK)',
        'Imperial College London (UK)',
        'University College London (UCL - UK)',
        'University of Edinburgh (UK)',
        'Queen Mary University of London (Barts - UK)',
        'University of Oxford (UK)',
        'University of Cambridge (UK)'
      ]
    },
    {
      number: 2,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc / BDS / DDS Dental Surgery',
      field: 'Medicine & Health Sciences',
      degreeType: 'Clinical Dental Degree',
      careerOutcomes: ['Dental Officer at MOH Brunei', 'Dental Surgeon / Orthodontist', 'Community Dental Specialist'],
      featuredInstitutions: [
        'Universiti Brunei Darussalam (PAPRSB IHS)',
        'King’s College London (UK - Top 5 Global)',
        'University of Dundee (UK - #1 UK Dental School)',
        'Queen Mary University of London (Barts - UK)',
        'University of Glasgow (UK)'
      ]
    },
    {
      number: 3,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc in Forensic Science',
      field: 'Medicine & Health Sciences',
      degreeType: 'Bachelor of Science (Forensics)',
      careerOutcomes: ['Forensic Scientist at Department of Scientific Services (DSS)', 'Criminalistics Officer', 'Toxicology Specialist'],
      featuredInstitutions: [
        'University of Strathclyde (UK - #1 Forensics UK)',
        'University of Kent (UK)',
        'King’s College London (UK)'
      ]
    },
    {
      number: 4,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'Bachelor of Education (Special Education - offering specialization in Deaf and Hard of Hearing education) / Bachelor of Special Education (Deaf Studies) / Bachelor of Education (teaching Deaf and Hard of Hearing)',
      field: 'Arts & Humanities',
      degreeType: 'Bachelor of Education (Special Education)',
      careerOutcomes: ['Special Education Educator at MOE Special Education Unit', 'Deaf & Hard of Hearing Specialist', 'Inclusive Education Officer'],
      featuredInstitutions: [
        'University of Manchester (UK)',
        'University of Birmingham (UK)',
        'University of Leeds (UK)'
      ]
    },
    {
      number: 5,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc / BSc (Hons) / BMedSci (Hons) / Bachelor of Speech and Language Therapy / Speech and Language Pathology / Applied Science (Speech Pathology) / Speech Pathology (Honours)',
      field: 'Medicine & Health Sciences',
      degreeType: 'Allied Health Degree',
      careerOutcomes: ['Speech-Language Therapist at MOH', 'Rehabilitation Specialist at Child Development Centre', 'Clinical Pathologist'],
      featuredInstitutions: [
        'University of Manchester (UK)',
        'Newcastle University (UK)',
        'University of Sheffield (UK)',
        'University of Sydney (Australia)'
      ]
    },
    {
      number: 6,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc (Hons) / Bachelor of Occupational Therapy / Occupational Therapy (Hons)',
      field: 'Medicine & Health Sciences',
      degreeType: 'Allied Health Degree',
      careerOutcomes: ['Occupational Therapist at RIPAS Hospital / Suri Seri Begawan Hospital', 'Ergonomics Consultant', 'Pediatric Rehabilitation Specialist'],
      featuredInstitutions: [
        'University of Liverpool (UK)',
        'Cardiff University (UK)',
        'University of Southampton (UK)',
        'Monash University (Australia)'
      ]
    },
    {
      number: 7,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc (Hons) / Bachelor of Nutrition and Dietetics / Dietetics and Nutrition / Dietetics',
      field: 'Medicine & Health Sciences',
      degreeType: 'Allied Health Degree',
      careerOutcomes: ['Clinical Dietitian at MOH', 'Public Health Nutritionist', 'Sports Dietetics Specialist'],
      featuredInstitutions: [
        'University of Nottingham (UK)',
        'King’s College London (UK)',
        'University of Surrey (UK)'
      ]
    },
    {
      number: 8,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc / BSc (Hons) / Bachelor of Podiatry / Podiatric Medicine / Podiatric Medicine / Podiatry Practice (Honours) / Health Science (Podiatry)',
      field: 'Medicine & Health Sciences',
      degreeType: 'Allied Health Degree',
      careerOutcomes: ['Podiatrist at Diabetic Foot Clinic MOH', 'Lower Limb Biomechanics Specialist', 'Rehabilitation Clinician'],
      featuredInstitutions: [
        'University of Southampton (UK)',
        'University of Brighton (UK)',
        'University of Salford (UK)'
      ]
    },
    {
      number: 9,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc (Hons) Health Science (Cardiac Physiology) / Cardiac Physiology (Healthcare Science)',
      field: 'Medicine & Health Sciences',
      degreeType: 'Clinical Science Degree',
      careerOutcomes: ['Cardiac Physiologist at Gleneagles JPMC / RIPAS Heart Centre', 'Echocardiographer', 'Cardiac Rhythm Device Specialist'],
      featuredInstitutions: [
        'University of Southampton (UK)',
        'University of Leeds (UK)',
        'Manchester Metropolitan University (UK)'
      ]
    },
    {
      number: 10,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BA (Hons) / BSc (Hons) Social Work',
      field: 'Arts & Humanities',
      degreeType: 'Professional Social Work Degree',
      careerOutcomes: ['Welfare Officer at Jabatan Pembangunan Masyarakat (JAPEM)', 'Medical Social Worker at Hospital RIPAS', 'Family Protection Counselor'],
      featuredInstitutions: [
        'University of Edinburgh (UK)',
        'University of York (UK)',
        'University of Bristol (UK)'
      ]
    },
    {
      number: 11,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc (Hons) / Bachelor of Paramedic Science / Paramedicine / Paramedic Practice (Hons)',
      field: 'Medicine & Health Sciences',
      degreeType: 'Emergency Medicine Degree',
      careerOutcomes: ['Paramedic Officer at Emergency Medical Ambulance Services (EMAS)', 'Trauma Response Specialist', 'Critical Care Flight Paramedic'],
      featuredInstitutions: [
        'University of Surrey (UK)',
        'Oxford Brookes University (UK)',
        'University of Hertfordshire (UK)'
      ]
    },
    {
      number: 12,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'Bachelor of Applied Science in Entomology and Parasitology with honours',
      field: 'Medicine & Health Sciences',
      degreeType: 'Applied Biological Science Degree',
      careerOutcomes: ['Vector Control Specialist at MOH Health Enforcement', 'Parasitology Officer', 'Agricultural Biosecurity Entomologist'],
      featuredInstitutions: [
        'University of Liverpool / Liverpool School of Tropical Medicine (UK)',
        'University of Glasgow (UK)'
      ]
    },
    {
      number: 13,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc (Hons) Environmental Health',
      field: 'Medicine & Health Sciences',
      degreeType: 'Public Health Degree',
      careerOutcomes: ['Environmental Health Officer at MOH', 'Food Safety & Hygiene Inspector', 'Epidemiological Surveillance Officer'],
      featuredInstitutions: [
        'University of Birmingham (UK)',
        'Cardiff Metropolitan University (UK)',
        'Universiti Brunei Darussalam (PAPRSB IHS)'
      ]
    },
    {
      number: 14,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc (Hons) Public Health',
      field: 'Medicine & Health Sciences',
      degreeType: 'Public Health Degree',
      careerOutcomes: ['Public Health Epidemiologist at Health Promotion Centre', 'Healthcare Policy Analyst', 'Biostatistics Officer'],
      featuredInstitutions: [
        'University of Edinburgh (UK)',
        'King’s College London (UK)',
        'Universiti Brunei Darussalam (PAPRSB IHS)'
      ]
    },
    {
      number: 15,
      category: 'A',
      categoryTitle: 'Life Sciences and Medicine',
      title: 'BSc / BSc (Hons) Safety, Health and Environmental Management / Occupational Safety, Health and Environment',
      field: 'Engineering & Technology',
      degreeType: 'HSE Management Degree',
      careerOutcomes: ['HSE Regulator at SHENA (Safety, Health & Environment National Authority)', 'Industrial Safety Inspector', 'Environmental Risk Auditor'],
      featuredInstitutions: [
        'University of Leeds (UK)',
        'Loughborough University (UK)',
        'Universiti Teknologi Brunei (UTB)'
      ]
    },

    // --- SECTION B: SOCIAL SCIENCES AND MANAGEMENT (16-27) ---
    {
      number: 16,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BA Forensic Accounting',
      field: 'Business, Economics & Finance',
      degreeType: 'Professional Accounting Degree',
      careerOutcomes: ['Anti-Corruption Financial Investigator at BMR / ACB', 'Forensic Auditor at Jabatan Audit', 'Financial Intelligence Analyst']
    },
    {
      number: 17,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BA (Hons) Journalism and Mass Communication',
      field: 'Arts & Humanities',
      degreeType: 'Media & Communications Degree',
      careerOutcomes: ['Government Communications Officer at Information Department (Jabatan Penerangan)', 'Broadcaster at RTB', 'Strategic Media Analyst']
    },
    {
      number: 18,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BA / BSc Criminology',
      field: 'Arts & Humanities',
      degreeType: 'Criminology & Justice Degree',
      careerOutcomes: ['Research & Crime Analyst at Royal Brunei Police Force (RBPF)', 'Penal Reform Officer at Prisons Department', 'National Security Strategist']
    },
    {
      number: 19,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BA Politics and Chinese',
      field: 'Arts & Humanities',
      degreeType: 'International Relations & Asian Studies',
      careerOutcomes: ['Diplomatic Foreign Service Officer at Ministry of Foreign Affairs (MFA)', 'Bilateral Trade Analyst', 'Regional Geopolitical Strategist']
    },
    {
      number: 20,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BA (Hons) Digital Media and Society',
      field: 'Arts & Humanities',
      degreeType: 'Digital Media Degree',
      careerOutcomes: ['Digital Transformation Specialist at AITI', 'Strategic Cyber Policy Analyst', 'Interactive Media Content Director']
    },
    {
      number: 21,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BA (Hons) / BSoSci (Hons) Sociology',
      field: 'Arts & Humanities',
      degreeType: 'Social Research Degree',
      careerOutcomes: ['Social Policy Researcher at CSPS (Centre for Strategic and Policy Studies)', 'Demographic Analyst at DEPS', 'Community Development Officer']
    },
    {
      number: 22,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'Bachelor of Computing in AI and Society',
      field: 'Computer Science & AI',
      degreeType: 'Applied Computing & AI Ethics Degree',
      careerOutcomes: ['AI Solutions Architect at Brunei Digital Economy Hub', 'Data Governance Specialist', 'Machine Learning Product Manager']
    },
    {
      number: 23,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BA / BSc / BSc (Hons) / Bachelor of Human Resource Management / Management (Human Resources) / Business Management and Human Resource / Human Resource Development / People Development / Organisational Development / Management (HR / Organisational Behaviour Specialization)',
      field: 'Business, Economics & Finance',
      degreeType: 'Strategic Human Resources Degree',
      careerOutcomes: ['Talent Development Lead at MPEC (Manpower Planning and Employment Council)', 'Civil Service HR Director at JPA', 'Workforce Capability Strategist']
    },
    {
      number: 24,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'LLB - Bachelor in Law',
      field: 'Law & Shariah',
      degreeType: 'Qualifying Law Degree (LLB)',
      careerOutcomes: ['State Counsel / Deputy Public Prosecutor at Attorney General’s Chambers (AGC)', 'Judicial Officer', 'Legal Counsel in Government Ministries']
    },
    {
      number: 25,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BSc in Psychology',
      field: 'Arts & Humanities',
      degreeType: 'Behavioral Science Degree',
      careerOutcomes: ['Clinical Psychologist at MOH Psychiatric Department', 'Educational Psychologist at MOE', 'Organizational Psychologist at JPA']
    },
    {
      number: 26,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'BSc in Land Administration and Development',
      field: 'Architecture & Built Environment',
      degreeType: 'Land Economics & Spatial Planning',
      careerOutcomes: ['Land Officer at Lands Department (Jabatan Tanah), Ministry of Development', 'Town & Country Planner', 'Geospatial Asset Valuer']
    },
    {
      number: 27,
      category: 'B',
      categoryTitle: 'Social Sciences and Management',
      title: 'Bachelor of Arts (Hons) Translation with Interpretation',
      field: 'Arts & Humanities',
      degreeType: 'Linguistics & Translation Degree',
      careerOutcomes: ['Diplomatic Simultaneous Interpreter at MFA', 'Official Court Interpreter at State Judiciary', 'State Treaty Translation Officer']
    },

    // --- SECTION C: SKIM PENDIDIK (DIIKAT JANJI SEBAGAI PENDIDIK) - SOCIAL SCIENCES AND MANAGEMENT (28-32) ---
    {
      number: 28,
      category: 'C',
      categoryTitle: 'Skim Pendidik (Diikat Janji sebagai Pendidik)',
      isEducatorScheme: true,
      title: 'BSc (Hons) / Bachelor of Food Science and Nutrition / Nutrition and Food Science / Nutrition Science',
      field: 'Natural & Environmental Sciences',
      degreeType: 'Food Science Degree (Teacher Bond)',
      careerOutcomes: ['Secondary / Sixth Form Science & Nutrition Educator at MOE', 'Curriculum Development Officer at DCD', 'Vocational Technical Lecturer']
    },
    {
      number: 29,
      category: 'C',
      categoryTitle: 'Skim Pendidik (Diikat Janji sebagai Pendidik)',
      isEducatorScheme: true,
      title: 'BSc (Hons) Agriculture',
      field: 'Natural & Environmental Sciences',
      degreeType: 'Agricultural Science Degree (Teacher Bond)',
      careerOutcomes: ['Agricultural Science Educator at MOE Secondary Schools', 'Agro-Technology Lecturer at IBTE Wasan', 'Agricultural Education Specialist']
    },
    {
      number: 30,
      category: 'C',
      categoryTitle: 'Skim Pendidik (Diikat Janji sebagai Pendidik)',
      isEducatorScheme: true,
      title: 'BSc (Hons) Marine Science / Earth, Environmental and Marine Sciences / Biology and Marine Biology / Marine Biology',
      field: 'Natural & Environmental Sciences',
      degreeType: 'Marine Biology Degree (Teacher Bond)',
      careerOutcomes: ['Marine Biology & Environmental Science Educator at MOE', 'Marine Ecology Curriculum Officer', 'School Environmental Program Lead']
    },
    {
      number: 31,
      category: 'C',
      categoryTitle: 'Skim Pendidik (Diikat Janji sebagai Pendidik)',
      isEducatorScheme: true,
      title: 'BSc (Hons) Architectural Design Technology / Architectural Design and Technology / Product Design and Technology',
      field: 'Architecture & Built Environment',
      degreeType: 'Design Technology Degree (Teacher Bond)',
      careerOutcomes: ['Design & Technology (D&T) Educator at MOE Secondary Schools', 'Architectural Draughting Instructor at IBTE Nakhoda Ragam', 'Technical Curriculum Officer']
    },
    {
      number: 32,
      category: 'C',
      categoryTitle: 'Skim Pendidik (Diikat Janji sebagai Pendidik)',
      isEducatorScheme: true,
      title: 'BSc (Hons) Environmental Management',
      field: 'Natural & Environmental Sciences',
      degreeType: 'Environmental Science Degree (Teacher Bond)',
      careerOutcomes: ['Geography & Environmental Science Educator at MOE', 'Education for Sustainable Development Officer', 'Environmental Club Lead']
    }
  ]
};
