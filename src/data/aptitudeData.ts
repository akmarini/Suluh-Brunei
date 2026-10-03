import { AptitudeQuestion, CareerMatch, AptitudeDomain } from '../types';

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: 1,
    contextKicker: 'Problem Solving & Instinct',
    scenario: 'When you are tasked with solving a difficult breakdown during a school project or science practical, what is your immediate reflex?',
    options: [
      {
        text: 'Dismantle the physical components or run diagnostic tests to understand mechanical and circuit failure.',
        domainWeights: { engineering: 4, computing: 2, medical: 1, law_policy: 0, business_finance: 0, environmental_creative: 1 },
        bruneiContextNote: 'Engineering & Industrial Operations'
      },
      {
        text: 'Write a script or spreadsheet formula to automate the data processing and eliminate human error.',
        domainWeights: { engineering: 1, computing: 5, medical: 0, law_policy: 0, business_finance: 2, environmental_creative: 0 },
        bruneiContextNote: 'Software Architecture & Algorithmic Automation'
      },
      {
        text: 'Observe symptoms carefully, review biological/chemical parameters, and look for health or environmental distress.',
        domainWeights: { engineering: 0, computing: 0, medical: 5, law_policy: 0, business_finance: 0, environmental_creative: 3 },
        bruneiContextNote: 'Clinical Diagnosis & Biomedical Science'
      },
      {
        text: 'Review the project guidelines, institutional rules, and ethical protocols to resolve conflicts and set consensus.',
        domainWeights: { engineering: 0, computing: 0, medical: 1, law_policy: 5, business_finance: 2, environmental_creative: 0 },
        bruneiContextNote: 'Legal Governance & Regulatory Compliance'
      }
    ]
  },
  {
    id: 2,
    contextKicker: 'Bruneian Workplace Environment',
    scenario: 'Which daily working environment in Brunei Darussalam would feel most inspiring and energizing to you?',
    options: [
      {
        text: 'A high-tech digital lab or data center collaborating with telecommunications teams (e.g. DST, UNN, or EVYD Technology).',
        domainWeights: { engineering: 2, computing: 5, medical: 1, law_policy: 0, business_finance: 2, environmental_creative: 1 },
        bruneiContextNote: 'National Digital Hub'
      },
      {
        text: 'A bustling hospital ward or specialized clinic (such as RIPAS or Pantai Jerudong Specialist Centre) treating patients.',
        domainWeights: { engineering: 0, computing: 0, medical: 5, law_policy: 1, business_finance: 0, environmental_creative: 1 },
        bruneiContextNote: 'Clinical Care at RIPAS / PJSC'
      },
      {
        text: 'An offshore platform or energy engineering complex in Seria / Belait managing complex assets.',
        domainWeights: { engineering: 5, computing: 1, medical: 0, law_policy: 0, business_finance: 1, environmental_creative: 1 },
        bruneiContextNote: 'Energy & Downstream Operations (BSP / Hengyi)'
      },
      {
        text: 'A financial analytical suite or trading room evaluating sovereign investments and Islamic capital markets (e.g. BIA, BDCB, BIBD).',
        domainWeights: { engineering: 0, computing: 1, medical: 0, law_policy: 2, business_finance: 5, environmental_creative: 0 },
        bruneiContextNote: 'Sovereign Wealth & Central Banking'
      }
    ]
  },
  {
    id: 3,
    contextKicker: 'Wawasan Brunei 2035 Pillar',
    scenario: 'Which strategic goal of Wawasan Brunei 2035 (Brunei Vision 2035) do you feel most compelled to dedicate your career towards?',
    options: [
      {
        text: 'Economic Diversification & Downstream Energy: Transforming Brunei into a diversified sustainable industrial economy.',
        domainWeights: { engineering: 5, computing: 2, medical: 0, law_policy: 1, business_finance: 3, environmental_creative: 2 },
        bruneiContextNote: 'Industrial Growth & Energy Transition'
      },
      {
        text: 'High Quality of Life & National Health: Fortifying Brunei against non-communicable diseases (NCDs) and advancing biomedical care.',
        domainWeights: { engineering: 0, computing: 1, medical: 5, law_policy: 1, business_finance: 0, environmental_creative: 2 },
        bruneiContextNote: 'Universal Healthcare & Wellbeing'
      },
      {
        text: 'Smart Nation & Digital Economy: Building sovereign AI infrastructure, cyber security shields, and digital public services.',
        domainWeights: { engineering: 2, computing: 5, medical: 1, law_policy: 1, business_finance: 2, environmental_creative: 0 },
        bruneiContextNote: 'Digital Economy Masterplan'
      },
      {
        text: 'Pristine Environmental Conservation & Green Energy: Protecting Brunei’s biodiversity, peatland carbon sinks, and climate commitments.',
        domainWeights: { engineering: 2, computing: 0, medical: 1, law_policy: 1, business_finance: 0, environmental_creative: 5 },
        bruneiContextNote: 'National Climate Change Policy (BNCCP)'
      }
    ]
  },
  {
    id: 4,
    contextKicker: 'Intellectual Passion',
    scenario: 'If you had a free weekend to read or watch a documentary, which subject would naturally captivate you for hours?',
    options: [
      {
        text: 'How artificial intelligence models generate reasoning tokens and the cryptographic safety of distributed blockchains.',
        domainWeights: { engineering: 1, computing: 5, medical: 0, law_policy: 1, business_finance: 2, environmental_creative: 0 },
        bruneiContextNote: 'Theoretical Computing & Deep Learning'
      },
      {
        text: 'Landmark judicial arguments, constitutional treaties, and the harmony between Common Law and Islamic Shariah.',
        domainWeights: { engineering: 0, computing: 0, medical: 0, law_policy: 5, business_finance: 2, environmental_creative: 1 },
        bruneiContextNote: 'Comparative Jurisprudence & Policy'
      },
      {
        text: 'How surgical techniques, genetic editing, and immunotherapy can eradicate hereditary illnesses.',
        domainWeights: { engineering: 1, computing: 0, medical: 5, law_policy: 0, business_finance: 0, environmental_creative: 1 },
        bruneiContextNote: 'Cellular Medicine & Pharmacology'
      },
      {
        text: 'Sustainable architectural structures that blend traditional Malay timber craftsmanship with zero-carbon solar tech.',
        domainWeights: { engineering: 3, computing: 1, medical: 0, law_policy: 0, business_finance: 1, environmental_creative: 5 },
        bruneiContextNote: 'Architectural Design & Eco-Engineering'
      }
    ]
  },
  {
    id: 5,
    contextKicker: 'Sixth Form CCA Role',
    scenario: 'During Sixth Form events (such as Maktab Duli / PTET Sports Day, debate tournaments, or school exhibitions), what was your go-to role?',
    options: [
      {
        text: 'The Logistics or Technical Lead: Setting up audio/visual rigs, timer systems, or building the event stage safely.',
        domainWeights: { engineering: 5, computing: 2, medical: 0, law_policy: 0, business_finance: 1, environmental_creative: 2 },
        bruneiContextNote: 'Technical Execution'
      },
      {
        text: 'The Debater or Spokesperson: Constructing persuasive rebuttals, drafting constitutional motions, and speaking on stage.',
        domainWeights: { engineering: 0, computing: 0, medical: 0, law_policy: 5, business_finance: 3, environmental_creative: 1 },
        bruneiContextNote: 'Advocacy & Public Debate'
      },
      {
        text: 'The Treasurer / Commercial Planner: Managing ticket cash flows, sourcing sponsors, and calculating budget surpluses.',
        domainWeights: { engineering: 0, computing: 1, medical: 0, law_policy: 1, business_finance: 5, environmental_creative: 0 },
        bruneiContextNote: 'Financial Stewardship'
      },
      {
        text: 'The First Aider / Health Welfare Officer: Stationed with St. John Ambulance / Red Crescent ready to triage and care for peers.',
        domainWeights: { engineering: 0, computing: 0, medical: 5, law_policy: 1, business_finance: 0, environmental_creative: 0 },
        bruneiContextNote: 'Emergency Care & Empathy'
      }
    ]
  },
  {
    id: 6,
    contextKicker: 'Data & Working Style',
    scenario: 'How do you feel most comfortable working with evidence, figures, and outcomes?',
    options: [
      {
        text: 'Statistical models, yield forecasts, and financial ratios calculating return on sovereign capital investments.',
        domainWeights: { engineering: 1, computing: 2, medical: 0, law_policy: 1, business_finance: 5, environmental_creative: 0 },
        bruneiContextNote: 'Quantitative Analytics'
      },
      {
        text: 'Writing clean code, debugging error logs, and verifying deterministic algorithm logic.',
        domainWeights: { engineering: 2, computing: 5, medical: 0, law_policy: 0, business_finance: 1, environmental_creative: 0 },
        bruneiContextNote: 'Software Engineering'
      },
      {
        text: 'Scrutinizing evidence briefs, questioning inconsistencies, and drafting rigorous contractual clauses.',
        domainWeights: { engineering: 0, computing: 0, medical: 0, law_policy: 5, business_finance: 2, environmental_creative: 0 },
        bruneiContextNote: 'Legal Analysis'
      },
      {
        text: 'Collecting soil and water samples from Temburong or Pulau Muara Besar, mapping ecological health using satellite GIS.',
        domainWeights: { engineering: 1, computing: 1, medical: 1, law_policy: 0, business_finance: 0, environmental_creative: 5 },
        bruneiContextNote: 'Geospatial & Field Ecology'
      }
    ]
  },
  {
    id: 7,
    contextKicker: 'Local Brunei News Focus',
    scenario: 'Which headline from Pelita Brunei or Borneo Bulletin would make you immediately click to read the entire article?',
    options: [
      {
        text: '"Brunei Darussalam launches National AI Computing Cluster to accelerate public services and healthcare analytics."',
        domainWeights: { engineering: 1, computing: 5, medical: 2, law_policy: 1, business_finance: 2, environmental_creative: 0 },
        bruneiContextNote: 'Digital Innovation'
      },
      {
        text: '"Ministry of Health introduces robotic-assisted minimally invasive cardiovascular surgery at RIPAS Hospital."',
        domainWeights: { engineering: 2, computing: 1, medical: 5, law_policy: 0, business_finance: 0, environmental_creative: 0 },
        bruneiContextNote: 'Medical Advancement'
      },
      {
        text: '"Brunei Shell Petroleum achieves major offshore deep-water discovery with advanced seismic inversion technology."',
        domainWeights: { engineering: 5, computing: 1, medical: 0, law_policy: 0, business_finance: 2, environmental_creative: 1 },
        bruneiContextNote: 'Energy Exploration'
      },
      {
        text: '"Brunei Darussalam Central Bank (BDCB) pioneers pioneering Green Sukuk framework for regional Islamic finance."',
        domainWeights: { engineering: 0, computing: 0, medical: 0, law_policy: 2, business_finance: 5, environmental_creative: 2 },
        bruneiContextNote: 'Islamic Sustainable Finance'
      }
    ]
  },
  {
    id: 8,
    contextKicker: 'Five-Year Vision',
    scenario: 'Five years after completing your degree, what accomplishment would make your family and community in Brunei most proud?',
    options: [
      {
        text: 'Serving as a compassionate medical officer or surgeon in Brunei’s government hospitals, directly saving lives.',
        domainWeights: { engineering: 0, computing: 0, medical: 5, law_policy: 1, business_finance: 0, environmental_creative: 0 },
        bruneiContextNote: 'Healthcare Leader'
      },
      {
        text: 'Leading engineering operations at BSP or a national energy asset, optimizing offshore efficiency and safety.',
        domainWeights: { engineering: 5, computing: 1, medical: 0, law_policy: 0, business_finance: 2, environmental_creative: 1 },
        bruneiContextNote: 'Energy Pioneer'
      },
      {
        text: 'Founding or scaling a Bruneian software company that exports digital tech to the ASEAN region.',
        domainWeights: { engineering: 1, computing: 5, medical: 0, law_policy: 0, business_finance: 3, environmental_creative: 0 },
        bruneiContextNote: 'Tech Entrepreneur'
      },
      {
        text: 'Drafting legislation or international trade treaties at Attorney General’s Chambers to defend Brunei’s sovereign interests.',
        domainWeights: { engineering: 0, computing: 0, medical: 0, law_policy: 5, business_finance: 2, environmental_creative: 0 },
        bruneiContextNote: 'State Counsel / Public Leader'
      }
    ]
  }
];

export const CAREER_PROFILES: CareerMatch[] = [
  {
    id: 'career-petroleum-engineer',
    title: 'Senior Reservoir & Subsea Petroleum Engineer',
    malayTitle: 'Jurutera Takungan & Luar Pantai Kanan',
    industryCluster: 'Downstream & Upstream Energy (Cluster 1)',
    primaryDomain: 'engineering',
    averageSalaryBnd: 'BND $4,800 – $8,500 / month',
    keyEmployersInBrunei: ['Brunei Shell Petroleum (BSP)', 'TotalEnergies Brunei', 'Petroleum Authority of Brunei Darussalam', 'Brunei LNG'],
    wawasanAlignment: 'Supports Goal 3 (Dynamic and Sustainable Economy) by maximizing recovery of national hydrocarbon assets while pioneering carbon capture.',
    recommendedDegrees: [
      { programName: 'BEng (Hons) in Petroleum & Chemical Engineering', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 280 },
      { programName: 'MEng Mechanical Engineering with Aerospace', institution: 'University of Southampton', country: 'United Kingdom', minTariff: 320 },
      { programName: 'MEng Chemical / Mechanical Engineering', institution: 'Imperial College London', country: 'United Kingdom', minTariff: 360 }
    ],
    fundingPathways: ['BSP Scholarship', 'MOE Scholarship', 'SBPP Education Loan'],
    roleOverview: 'Designs extraction strategies for offshore reservoirs in Champion, Iron Duke, and Southwest Ampa fields, applying computational fluid dynamics and subsea robotics.',
    dayInTheLife: 'Analyzes pressure transient logs from offshore platforms, meets with drilling geologists in Seria, and designs digital twins of subsea wellheads.'
  },
  {
    id: 'career-ai-architect',
    title: 'Artificial Intelligence & Cloud Infrastructure Architect',
    malayTitle: 'Arkitek Kepintaran Buatan & Prasarana Awan',
    industryCluster: 'Digital Economy & Telecommunications (Cluster 4)',
    primaryDomain: 'computing',
    averageSalaryBnd: 'BND $3,800 – $7,200 / month',
    keyEmployersInBrunei: ['Datastream Digital (DST)', 'Unified National Networks (UNN)', 'Cyber Security Brunei (CSB)', 'EVYD Technology'],
    wawasanAlignment: 'Drives Brunei’s Digital Economy Masterplan 2025 and Smart Nation initiatives by creating sovereign national data systems.',
    recommendedDegrees: [
      { programName: 'BSc in Computer Science & Artificial Intelligence', institution: 'Universiti Brunei Darussalam (UBD)', country: 'Brunei', minTariff: 220 },
      { programName: 'BSc (Hons) in Computing (Software Development)', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 240 },
      { programName: 'MEng Computing (AI & Machine Learning)', institution: 'Imperial College London', country: 'United Kingdom', minTariff: 360 }
    ],
    fundingPathways: ['MOE Scholarship', 'Local Govt Scheme', 'SBPP Education Loan'],
    roleOverview: 'Builds robust distributed computing platforms, deploy large language models, and secures national enterprise clouds against advanced threats.',
    dayInTheLife: 'Configures Kubernetes clusters in Brunei’s national data center, prototypes neural models for BruHealth data, and audits cybersecurity telemetry.'
  },
  {
    id: 'career-medical-officer',
    title: 'Medical Doctor / Clinical Specialist',
    malayTitle: 'Pegawai Perubatan / Pakar Klinikal',
    industryCluster: 'Healthcare, Biomedical & Life Sciences',
    primaryDomain: 'medical',
    averageSalaryBnd: 'BND $4,200 – $9,000 / month',
    keyEmployersInBrunei: ['Ministry of Health (MOH)', 'RIPAS Hospital', 'Suri Seri Begawan Hospital (Kuala Belait)', 'Pantai Jerudong Specialist Centre (PJSC)'],
    wawasanAlignment: 'Directly ensures Goal 2 (High Quality of Life) by safeguarding national public health and delivering specialized clinical medicine.',
    recommendedDegrees: [
      { programName: 'BHSc (Medicine) & Partner MBChB (Aberdeen/Glasgow)', institution: 'Universiti Brunei Darussalam (PAPRSB IHS)', country: 'Brunei / UK', minTariff: 320 },
      { programName: 'BSc Biomedical Sciences / Medical Sciences', institution: 'University of Edinburgh', country: 'United Kingdom', minTariff: 320 }
    ],
    fundingPathways: ['MOE Scholarship', 'Local Govt Scheme'],
    roleOverview: 'Provides diagnostic and therapeutic care, performs emergency interventions, conducts clinical research, and manages complex chronic diseases in Brunei.',
    dayInTheLife: 'Conducts morning clinical rounds in RIPAS wards, performs procedures, liaises with senior consultants, and discusses patient recovery plans.'
  },
  {
    id: 'career-state-counsel',
    title: 'Senior State Counsel / Shariah Legal Advisor',
    malayTitle: 'Peguam Kanan Kerajaan / Penasihat Perundangan Syariah',
    industryCluster: 'Legal, Public Administration & Governance',
    primaryDomain: 'law_policy',
    averageSalaryBnd: 'BND $3,900 – $7,800 / month',
    keyEmployersInBrunei: ['Attorney General’s Chambers (AGC)', 'Prime Minister’s Office (JPM)', 'Brunei Judiciary / Syariah Courts', 'BIBD Legal Dept'],
    wawasanAlignment: 'Upholds national governance, sovereignty, and the national philosophy of Melayu Islam Beraja (MIB).',
    recommendedDegrees: [
      { programName: 'Double Degree: LL.B (Hons) & Bachelor of Shariah (BSL)', institution: 'Universiti Islam Sultan Sharif Ali (UNISSA)', country: 'Brunei', minTariff: 260 },
      { programName: 'Bachelor of Laws (LL.B)', institution: 'University College London (UCL)', country: 'United Kingdom', minTariff: 320 }
    ],
    fundingPathways: ["Sultan's Scholar", 'MOE Scholarship', 'Local Govt Scheme', 'SBPP Education Loan'],
    roleOverview: 'Drafts sovereign government legislation, advises ministries on bilateral treaties, and conducts litigation in both Common Law and Syariah courts.',
    dayInTheLife: 'Drafts legislative amendments in the chambers in Bandar Seri Begawan, reviews international procurement contracts, and prepares court submissions.'
  },
  {
    id: 'career-investment-analyst',
    title: 'Sovereign Investment Strategist & Quantitative Analyst',
    malayTitle: 'Penganalisis Kuantitatif & Pelaburan Berdaulat',
    industryCluster: 'Banking, Finance & Sovereign Wealth (Cluster 5)',
    primaryDomain: 'business_finance',
    averageSalaryBnd: 'BND $4,500 – $8,200 / month',
    keyEmployersInBrunei: ['Brunei Investment Agency (BIA)', 'Brunei Darussalam Central Bank (BDCB)', 'BIBD Securities', 'Baiduri Capital'],
    wawasanAlignment: 'Safeguards Brunei’s fiscal reserves for future generations through strategic global investments.',
    recommendedDegrees: [
      { programName: 'BSc Finance & Econometrics', institution: 'London School of Economics (LSE)', country: 'United Kingdom', minTariff: 340 },
      { programName: 'Bachelor of Business Administration (Accounting & Finance)', institution: 'Universiti Brunei Darussalam (SBE)', country: 'Brunei', minTariff: 200 }
    ],
    fundingPathways: ['MOE Scholarship', 'SBPP Education Loan', 'Local Govt Scheme'],
    roleOverview: 'Evaluates global asset allocations, structures fixed-income sukuk portfolios, and models risk sensitivity across international equity markets.',
    dayInTheLife: 'Analyzes financial markets in London/New York from BIA headquarters, models portfolio volatility in Python, and briefs executive committee directors.'
  },
  {
    id: 'career-environmental-ecologist',
    title: 'Tropical Biodiversity & Carbon Stock Ecologist',
    malayTitle: 'Pakar Ekologi Biodiversiti & Karbon Tropika',
    industryCluster: 'Environment, Agriculture & Green Economy',
    primaryDomain: 'environmental_creative',
    averageSalaryBnd: 'BND $3,400 – $6,200 / month',
    keyEmployersInBrunei: ['Heart of Borneo Centre', 'Ministry of Primary Resources and Tourism (MPRT)', 'JASTRe (Environment Dept)', 'Brunei Climate Change Secretariat'],
    wawasanAlignment: 'Preserves Brunei’s 72% forest cover and spearheads national carbon credit and renewable ecosystem projects.',
    recommendedDegrees: [
      { programName: 'BSc in Environmental & Life Sciences', institution: 'Universiti Brunei Darussalam (UBD)', country: 'Brunei', minTariff: 180 },
      { programName: 'Bachelor of Science (Ecology & Conservation Biology)', institution: 'University of Melbourne', country: 'Australia', minTariff: 310 }
    ],
    fundingPathways: ['MOE Scholarship', 'Local Govt Scheme', 'SBPP Education Loan'],
    roleOverview: 'Monitors pristine primary peatlands, tracks carbon sequestration in Temburong, and shapes environmental policies for industrial developments.',
    dayInTheLife: 'Conducts fieldwork at Kuala Belalong Field Studies Centre, processes satellite multispectral indices, and presents climate impact assessments.'
  }
];
