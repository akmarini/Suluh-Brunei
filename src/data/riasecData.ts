import { RiasecType, RiasecDimension, RiasecArchetype, CareerMatch } from '../types';

export const RIASEC_DIMENSIONS: Record<RiasecType, RiasecDimension> = {
  R: {
    code: 'R',
    name: 'Realistic',
    trait: 'The Doer',
    tagline: 'Practical, Hands-on, Mechanical & Field-Oriented',
    color: 'emerald',
    description: 'You thrive when working with physical tools, mechanical equipment, natural environments, and tangible engineering systems. You prefer concrete solutions over abstract theories.',
    keySkills: ['Mechanical Diagnosing', 'Hardware & Circuitry', 'Field Operations', 'Spatial Coordination', 'Technical Troubleshooting'],
    bruneiSectors: ['Energy & Offshore Operations (BSP)', 'Downstream Petrochemicals (Hengyi, BFI)', 'Aviation & Marine (RB, BGC)', 'Agritech & Aquaculture']
  },
  I: {
    code: 'I',
    name: 'Investigative',
    trait: 'The Thinker',
    tagline: 'Analytical, Scientific, Inquisitive & Research-Driven',
    color: 'blue',
    description: 'You are naturally curious and driven to understand how systems work. You enjoy deep research, formulating hypotheses, dissecting scientific puzzles, and analyzing complex data.',
    keySkills: ['Scientific Method', 'Algorithmic Logic', 'Data Modeling', 'Clinical Diagnosis', 'Quantitative Research'],
    bruneiSectors: ['Biomedical & Healthcare Research', 'Software & AI Architecture (EVYD, UNN)', 'Subsurface Geoscience (Petroleum Authority)', 'Environmental Science']
  },
  A: {
    code: 'A',
    name: 'Artistic',
    trait: 'The Creator',
    tagline: 'Imaginative, Expressive, Original & Design-Led',
    color: 'amber',
    description: 'You view the world through aesthetics, storytelling, and novel concepts. You dislike rigid repetition and excel in synthesizing ideas into evocative visual, spatial, or written forms.',
    keySkills: ['Architectural Conception', 'Digital Media & UI/UX', 'Creative Writing & Narrative', 'Aesthetic Harmony', 'Cultural Curation'],
    bruneiSectors: ['Sustainable Architecture (JKR, Private Firms)', 'Digital Media & Creative Tech (DARe)', 'Brunei Heritage & Arts Curating', 'Urban & Environmental Design']
  },
  S: {
    code: 'S',
    name: 'Social',
    trait: 'The Helper',
    tagline: 'Empathetic, Supportive, Collaborative & People-Focused',
    color: 'rose',
    description: 'You find your highest fulfillment in mentoring, healing, teaching, and uplifting human beings. You are attuned to interpersonal dynamics and societal well-being.',
    keySkills: ['Patient Empathy & Bedside Manner', 'Classroom Pedagogy', 'Psychological Counseling', 'Community Outreach', 'Active Listening'],
    bruneiSectors: ['Clinical Medicine & Nursing (RIPAS, PJSC)', 'Sixth Form & Higher Education (MOE)', 'Community & Special Needs Development (KACA, JAPEM)', 'Public Health Advocacy']
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    trait: 'The Persuader',
    tagline: 'Strategic, Ambitious, Influential & Leadership-Driven',
    color: 'purple',
    description: 'You are motivated by initiative, negotiation, leadership, and bringing high-impact projects from concept to execution. You thrive in competitive, fast-paced decision rooms.',
    keySkills: ['Strategic Negotiation', 'Venture Leadership', 'Corporate Law Advocacy', 'Commercial Acumen', 'Public Speaking & Pitching'],
    bruneiSectors: ['Islamic Banking & Sovereign Wealth (BIA, BIBD)', 'Corporate Legal Advisory (AGC)', 'Energy Commercial Contracts (BSJV)', 'Tech Entrepreneurship (DARe)']
  },
  C: {
    code: 'C',
    name: 'Conventional',
    trait: 'The Organizer',
    tagline: 'Methodical, Detail-Oriented, Structured & Systematic',
    color: 'cyan',
    description: 'You value clarity, accuracy, procedural integrity, and structured data. You take pride in ensuring that governance, audits, finances, and complex logistics run with zero errors.',
    keySkills: ['Forensic Auditing', 'Regulatory Compliance', 'Database & Records Administration', 'Risk Assessment', 'Systematic Quality Control'],
    bruneiSectors: ['Monetary Authority & Central Banking (BDCB)', 'Auditing & Accounting (PwC, Deloitte, EY, KPMG)', 'Civil Service Administration (JPA)', 'Supply Chain Logistics (Muara Port)']
  }
};

export interface RiasecQuestionItem {
  id: number;
  category: string;
  scenario: string;
  options: {
    text: string;
    riasecType: RiasecType;
    contextHint: string;
  }[];
}

export const RIASEC_QUESTIONS: RiasecQuestionItem[] = [
  {
    id: 1,
    category: 'Problem-Solving Style',
    scenario: 'When you are faced with a challenging problem in a project or academic task, what is your first natural instinct?',
    options: [
      {
        text: 'Dismantle physical hardware, inspect circuit boards, or test mechanical equipment to locate the physical fault.',
        riasecType: 'R',
        contextHint: 'Hands-on mechanical & physical troubleshooting'
      },
      {
        text: 'Conduct in-depth background literature review, isolate scientific variables, or build a mathematical model.',
        riasecType: 'I',
        contextHint: 'Analytical investigation & scientific hypothesis'
      },
      {
        text: 'Sketch visual concepts, rethink the structural aesthetics, or explore an unconventional creative angle.',
        riasecType: 'A',
        contextHint: 'Creative conceptualization & lateral thinking'
      },
      {
        text: 'Gather the team to discuss how each person feels, understand personal blockers, and facilitate consensus.',
        riasecType: 'S',
        contextHint: 'Empathetic facilitation & interpersonal support'
      },
      {
        text: 'Take immediate charge, align the team around a strategic milestone, and negotiate key deliverables.',
        riasecType: 'E',
        contextHint: 'Executive leadership & decisive direction'
      },
      {
        text: 'Audit the data tables, checklist protocols, and verify compliance against established regulations.',
        riasecType: 'C',
        contextHint: 'Systematic verification & methodical organization'
      }
    ]
  },
  {
    id: 2,
    category: 'Sixth Form Capstone Project',
    scenario: 'If you were given full funding to lead an independent discovery project for Brunei, which one would excite you most?',
    options: [
      {
        text: 'Designing and building an autonomous ROV (remotely operated vehicle) for offshore marine inspection off Muara.',
        riasecType: 'R',
        contextHint: 'Mechatronics & marine robotics'
      },
      {
        text: 'Analyzing genomic data of local flora to isolate bioactive compounds for pharmaceutical and cancer research.',
        riasecType: 'I',
        contextHint: 'Biomedical & molecular biochemistry'
      },
      {
        text: 'Creating an immersive 3D spatial exhibition celebrating Brunei Kampong Ayer architecture and modern eco-living.',
        riasecType: 'A',
        contextHint: 'Architectural storytelling & digital spatial design'
      },
      {
        text: 'Developing a free mental wellness and academic mentorship curriculum for underprivileged students across all four districts.',
        riasecType: 'S',
        contextHint: 'Youth empowerment & social counseling'
      },
      {
        text: 'Launching a student-led social enterprise incubator connecting young local artisans with international e-commerce.',
        riasecType: 'E',
        contextHint: 'Venture innovation & commercial enterprise'
      },
      {
        text: 'Building a standardized national public expenditure auditing model to track efficiency in municipal public services.',
        riasecType: 'C',
        contextHint: 'Forensic accounting & fiscal governance'
      }
    ]
  },
  {
    id: 3,
    category: 'Ideal Workplace Atmosphere',
    scenario: 'Imagine walking into your ideal career workplace in Brunei. Which environment feels most energizing?',
    options: [
      {
        text: 'A high-precision engineering hangar, solar farm, or industrial petrochemical operations center.',
        riasecType: 'R',
        contextHint: 'Field engineering & technical infrastructure'
      },
      {
        text: 'An advanced data analytics lab or sterile biotechnology research suite with microscopes and computing clusters.',
        riasecType: 'I',
        contextHint: 'Scientific research & computational analytics'
      },
      {
        text: 'A collaborative design studio filled with sketches, moodboards, CAD models, and architectural prototypes.',
        riasecType: 'A',
        contextHint: 'Design studio & creative agency'
      },
      {
        text: 'A lively hospital clinic, pediatric ward, or sixth-form lecture hall interacting directly with people every hour.',
        riasecType: 'S',
        contextHint: 'Healthcare center & educational community'
      },
      {
        text: 'A fast-paced executive boardroom or corporate deal suite pitching cross-border investment strategies.',
        riasecType: 'E',
        contextHint: 'Sovereign wealth & corporate management'
      },
      {
        text: 'A calm, orderly financial institution or regulatory agency where records, audits, and compliance are immaculate.',
        riasecType: 'C',
        contextHint: 'Central banking & regulatory authority'
      }
    ]
  },
  {
    id: 4,
    category: 'Core Work Tools',
    scenario: 'Which set of instruments and tools would you feel most natural and proficient using on a daily basis?',
    options: [
      {
        text: 'Diagnostic multimeters, 3D printers, hand-tools, surveying equipment, and heavy machinery controls.',
        riasecType: 'R',
        contextHint: 'Technical & mechanical apparatus'
      },
      {
        text: 'Statistical software (R, Python), lab centrifuges, scientific sensors, and algorithm compilers.',
        riasecType: 'I',
        contextHint: 'Scientific research & algorithmic software'
      },
      {
        text: 'Graphics tablets, 3D CAD modeling software, cameras, typography guides, and creative writing suites.',
        riasecType: 'A',
        contextHint: 'Visual & spatial design instruments'
      },
      {
        text: 'Diagnostic clinical tools, pedagogical lesson frameworks, therapeutic rubrics, and consultation spaces.',
        riasecType: 'S',
        contextHint: 'People-centric & clinical diagnostic gear'
      },
      {
        text: 'Keynote pitch decks, contract term sheets, financial balance sheets, and CRM negotiation trackers.',
        riasecType: 'E',
        contextHint: 'Executive & deal-making assets'
      },
      {
        text: 'Spreadsheets, SQL databases, regulatory compliance frameworks, ledger balances, and audit trails.',
        riasecType: 'C',
        contextHint: 'Structured data & compliance registers'
      }
    ]
  },
  {
    id: 5,
    category: 'Wawasan Brunei 2035 Contribution',
    scenario: 'When you envision your long-term legacy serving Negara Brunei Darussalam, what impact resonates most deeply?',
    options: [
      {
        text: 'Building reliable renewable energy grids, resilient ports, and cutting-edge industrial infrastructure.',
        riasecType: 'R',
        contextHint: 'Physical infrastructure & industrial capability'
      },
      {
        text: 'Discovering medical breakthroughs, publishing scientific discoveries, and pioneering national AI systems.',
        riasecType: 'I',
        contextHint: 'Knowledge discovery & technological research'
      },
      {
        text: 'Shaping Brunei’s modern architectural identity and elevating our visual arts and national culture globally.',
        riasecType: 'A',
        contextHint: 'Cultural elevation & architectural landmarks'
      },
      {
        text: 'Ensuring every Bruneian family has access to compassionate, world-class medical treatment and quality education.',
        riasecType: 'S',
        contextHint: 'Human development & social welfare'
      },
      {
        text: 'Diversifying the national economy, driving foreign direct investments, and expanding Brunei’s global commercial footprint.',
        riasecType: 'E',
        contextHint: 'Economic diversification & market leadership'
      },
      {
        text: 'Securing national financial stability, eliminating fraud, and maintaining institutional governance and regulatory trust.',
        riasecType: 'C',
        contextHint: 'Institutional integrity & fiscal stability'
      }
    ]
  },
  {
    id: 6,
    category: 'Team Dynamics & Collaboration',
    scenario: 'In a group project that has stalled or become confused, what specific contribution do you naturally make?',
    options: [
      {
        text: 'I step up to assemble the physical presentation board, test the equipment, and ensure all hardware operates seamlessly.',
        riasecType: 'R',
        contextHint: 'Practical execution & technical setup'
      },
      {
        text: 'I scrutinize the logic, fact-check every assertion against verified sources, and correct scientific inconsistencies.',
        riasecType: 'I',
        contextHint: 'Critical fact-checking & logic verification'
      },
      {
        text: 'I redesign the visual formatting, refine the narrative flow, and make sure the deliverable is visually stunning.',
        riasecType: 'A',
        contextHint: 'Aesthetic elevation & storytelling polish'
      },
      {
        text: 'I check in with stressed teammates, defuse interpersonal conflict, and make sure everyone feels valued and motivated.',
        riasecType: 'S',
        contextHint: 'Team morale & interpersonal cohesion'
      },
      {
        text: 'I clarify the strategic goal, re-assign responsibilities decisively, and rehearse the final high-stakes pitch.',
        riasecType: 'E',
        contextHint: 'Strategic realignment & leadership drive'
      },
      {
        text: 'I create a detailed timeline, color-coded task matrix, and ensure every requirement in the marking rubric is ticked off.',
        riasecType: 'C',
        contextHint: 'Matrix coordination & rubric verification'
      }
    ]
  },
  {
    id: 7,
    category: 'Reading & Learning Preferences',
    scenario: 'Which type of reading or learning material keeps you engaged for hours without feeling tired?',
    options: [
      {
        text: 'Schematics, engineering diagrams, mechanics repair manuals, or construction time-lapse documentaries.',
        riasecType: 'R',
        contextHint: 'Engineering diagrams & technical mechanics'
      },
      {
        text: 'Peer-reviewed scientific journals, deep-dive epidemiological papers, mathematical proofs, or tech whitepapers.',
        riasecType: 'I',
        contextHint: 'Scientific journals & academic research'
      },
      {
        text: 'Architectural monographs, design portfolios, literary fiction, cinematography essays, or typography blogs.',
        riasecType: 'A',
        contextHint: 'Design publications & artistic culture'
      },
      {
        text: 'Biographies of humanitarian leaders, books on child psychology, counseling case studies, or medical memoirs.',
        riasecType: 'S',
        contextHint: 'Psychology, medicine & human connection'
      },
      {
        text: 'Case studies of corporate turnarounds, geopolitical histories, venture capital strategies, or legal court battles.',
        riasecType: 'E',
        contextHint: 'Business strategy & executive dealmaking'
      },
      {
        text: 'Tax law commentaries, statistical census data, macroeconomic reports, accounting principles, or regulatory codes.',
        riasecType: 'C',
        contextHint: 'Statutory codes & financial statements'
      }
    ]
  },
  {
    id: 8,
    category: 'Handling Uncertainty & Pressure',
    scenario: 'When plans suddenly change and a deadline is in jeopardy, how do you handle the pressure?',
    options: [
      {
        text: 'I roll up my sleeves and build a practical, functional workaround with whatever materials and equipment are at hand.',
        riasecType: 'R',
        contextHint: 'Pragmatic physical troubleshooting'
      },
      {
        text: 'I step back to collect objective data, diagnose the underlying root cause, and re-engineer the theoretical model.',
        riasecType: 'I',
        contextHint: 'Root cause analysis & systematic diagnosis'
      },
      {
        text: 'I embrace the chaos as a creative challenge and craft an inventive, original presentation format that surprises everyone.',
        riasecType: 'A',
        contextHint: 'Creative adaptability & originality'
      },
      {
        text: 'I ensure no team member panics, provide emotional stability, and distribute tasks gently to maintain group wellness.',
        riasecType: 'S',
        contextHint: 'Emotional grounding & collective care'
      },
      {
        text: 'I immediately contact the stakeholders, negotiate an extension or revised scope, and re-motivate the team to execute.',
        riasecType: 'E',
        contextHint: 'Stakeholder negotiation & decisive command'
      },
      {
        text: 'I immediately review the contingency plan, double-check checklist dependencies, and systematically eliminate errors.',
        riasecType: 'C',
        contextHint: 'Contingency adherence & systematic triage'
      }
    ]
  }
];

export const HOLLAND_ARCHETYPES: Record<string, RiasecArchetype> = {
  IRC: {
    code: 'IRC',
    title: 'The Industrial & Systems Architect',
    summary: 'You combine deep scientific curiosity with hands-on mechanical instincts and methodical precision. You excel at turning theoretical physics and data into physical machines, offshore systems, and reliable infrastructure.',
    topStrengths: ['Subsurface and mechanical modeling', 'Systemic diagnosis under pressure', 'Translating scientific concepts into concrete hardware'],
    idealWorkEnvironment: 'Energy engineering facilities, offshore platform operations, subsurface reservoir simulation labs, high-tech industrial plants.',
    growthAreas: ['Remember to articulate business ROI alongside technical perfection', 'Incorporate user experience and human factors into engineering specs']
  },
  IAC: {
    code: 'IAC',
    title: 'The Digital & Algorithmic Pioneer',
    summary: 'You sit at the cutting edge where data science, creative architecture, and computational rigor intersect. You enjoy building elegant software systems, AI pipelines, and digital services.',
    topStrengths: ['Algorithmic problem solving', 'User-centric software architecture', 'Data-driven decision making'],
    idealWorkEnvironment: 'National digital transformation hubs, health-tech startups (EVYD), telecommunications data centers (UNN/DST).',
    growthAreas: ['Communicate technical architecture simply to non-technical stakeholders', 'Balance perfectionism with speed of deployment']
  },
  ISA: {
    code: 'ISA',
    title: 'The Clinical & Biomedical Specialist',
    summary: 'You pair rigorous diagnostic thinking with a genuine calling to care for individuals and society. You see every patient or clinical case as both an intellectual puzzle and a sacred duty to heal.',
    topStrengths: ['Empathetic bedside manner backed by diagnostic rigor', 'Meticulous observation of clinical parameters', 'Commitment to lifelong medical learning'],
    idealWorkEnvironment: 'Specialized tertiary hospitals (RIPAS, PJSC), specialized pediatric units, medical research laboratories.',
    growthAreas: ['Protect personal boundaries to prevent clinical burnout', 'Develop comfort with administrative and healthcare policy workflows']
  },
  EIC: {
    code: 'EIC',
    title: 'The Strategic Legal & Governance Counsel',
    summary: 'You combine ambitious leadership with sharp intellectual debate and an unwavering eye for statutory rules. You thrive in the courtroom, boardrooms, and regulatory policy negotiation.',
    topStrengths: ['Constructing persuasive legal and commercial arguments', 'Navigating complex statutory and Shariah regulatory frameworks', 'Executive negotiation and crisis management'],
    idealWorkEnvironment: 'Attorney General’s Chambers (AGC), sovereign wealth investment firms (BIA), central banking legal departments (BDCB).',
    growthAreas: ['Ensure empathy and human context are considered alongside pure legal technicalities', 'Patience with slower institutional processes']
  },
  ECS: {
    code: 'ECS',
    title: 'The Chartered Fiscal & Risk Strategist',
    summary: 'You possess the commercial drive of a business leader alongside the rigorous precision of an auditor and a commitment to public welfare. You protect institutional capital and guide financial growth.',
    topStrengths: ['Forensic financial examination', 'Capital risk assessment and Islamic finance acumen', 'Clear communication of complex financial statements'],
    idealWorkEnvironment: 'Big Four audit practices (PwC, Deloitte, EY, KPMG), Islamic corporate banks (BIBD, Baiduri), Ministry of Finance & Economy.',
    growthAreas: ['Embrace calculated entrepreneurial risks when appropriate', 'Look beyond historical spreadsheets to forecast disruptive trends']
  },
  AIR: {
    code: 'AIR',
    title: 'The Sustainable Spatial & Architectural Designer',
    summary: 'You are imaginative yet deeply grounded in the physical realities of materials, structures, and green technology. You want to shape Brunei’s skyline, tropical dwellings, and urban environments.',
    topStrengths: ['Spatial vision and aesthetic harmony', 'Understanding physical structural properties and climate-responsive design', 'Translating cultural heritage into modern architecture'],
    idealWorkEnvironment: 'Architectural practices, Public Works Department (JKR), urban design agencies, sustainable building consultancies.',
    growthAreas: ['Stay patient through municipal planning approval processes', 'Develop strong financial estimating and project management skills']
  },
  SIE: {
    code: 'SIE',
    title: 'The Transformative Educational & Community Leader',
    summary: 'You are dedicated to shaping minds and empowering youth. You combine pedagogical empathy with analytical curriculum design and leadership to inspire the next generation of Bruneian scholars.',
    topStrengths: ['Inspiring and uplifting young learners', 'Curriculum innovation and clear academic communication', 'Mentorship and community mobilization'],
    idealWorkEnvironment: 'Sixth form centres (MDPMAMB, PTEB, PTET, PTEM), university faculties (UBD, UTB, UNISSA), Ministry of Education curriculum directorates.',
    growthAreas: ['Incorporate digital EdTech and analytics into teaching strategies', 'Advocate assertively for institutional resource allocations']
  },
  RIC: {
    code: 'RIC',
    title: 'The Petrochemical & Industrial Safety Engineer',
    summary: 'You are the backbone of continuous, high-reliability industrial operations. You care about process engineering safety, automated valves, thermodynamic efficiency, and asset integrity.',
    topStrengths: ['Industrial process safety and HAZOP evaluation', 'Hands-on hardware troubleshooting', 'Rigorous adherence to technical international standards'],
    idealWorkEnvironment: 'Downstream refinery complexes (Hengyi Pulau Muara Besar), fertilizer plants (BFI), offshore gas processing plants.',
    growthAreas: ['Develop public speaking skills for non-engineering executive briefings', 'Explore green hydrogen and decarbonization technologies']
  },
  CIE: {
    code: 'CIE',
    title: 'The Central Bank Regulatory & FinTech Analyst',
    summary: 'You excel at keeping markets fair, stable, and transparent. You understand both the statutory rules and the technological innovations disrupting banking, digital payments, and sovereign capital.',
    topStrengths: ['Regulatory policy drafting and compliance monitoring', 'Macroeconomic and quantitative market analysis', 'Islamic financial jurisprudence integration'],
    idealWorkEnvironment: 'Brunei Darussalam Central Bank (BDCB), Ministry of Finance and Economy, regulatory compliance divisions of financial institutions.',
    growthAreas: ['Foster innovation alongside risk mitigation', 'Maintain open dialogue with tech innovators to build supportive regulatory sandboxes']
  },
  REC: {
    code: 'REC',
    title: 'The Maritime Operations & Supply Chain Director',
    summary: 'You enjoy orchestrating global cargo flows, container logistics, and maritime assets. You love tangible container terminals and precise schedule management.',
    topStrengths: ['Maritime port logistics and route optimization', 'Asset maintenance and operational safety', 'Customs and trade compliance coordination'],
    idealWorkEnvironment: 'Muara Port terminals, Brunei Gas Carriers (BGC), international shipping and air-freight logistics hubs.',
    growthAreas: ['Adopt AI-driven predictive supply chain tools', 'Cultivate international cross-cultural relationship management']
  },
  SIA: {
    code: 'SIA',
    title: 'The Specialized Healthcare & Therapy Clinician',
    summary: 'You bring creativity, patience, and scientific knowledge to rehabilitate individuals with physical, speech, or developmental needs. You transform lives one session at a time.',
    topStrengths: ['Tailoring creative therapeutic exercises for diverse age groups', 'Scientific diagnostic assessment', 'Immense patience and positive encouragement'],
    idealWorkEnvironment: 'Child development centres (KACA), specialized therapy clinics at RIPAS and PJSC, inclusive education schools.',
    growthAreas: ['Advocate for wider public awareness of occupational and speech therapy', 'Document longitudinal clinical case studies for peer review']
  },
  AEC: {
    code: 'AEC',
    title: 'The Digital Product & UI/UX Design Strategist',
    summary: 'You connect user psychology and beautiful design with commercial business viability. You ensure that apps, websites, and digital experiences delight users while achieving strategic KPIs.',
    topStrengths: ['Human-computer interface design (UI/UX)', 'Translating user pain points into elegant visual solutions', 'Collaborating across business and engineering teams'],
    idealWorkEnvironment: 'Digital product agencies, corporate digital transformation teams (Baiduri Digital, DST, EVYD), tech ventures.',
    growthAreas: ['Deepen understanding of frontend code constraints', 'Use quantitative user metrics to validate design decisions']
  }
};

// Default fallback archetype for any code combination not explicitly mapped
export function resolveHollandArchetype(code: string): RiasecArchetype {
  if (HOLLAND_ARCHETYPES[code]) {
    return HOLLAND_ARCHETYPES[code];
  }
  // Construct archetype dynamically from top 3 letters
  const primary = RIASEC_DIMENSIONS[code[0] as RiasecType];
  const secondary = RIASEC_DIMENSIONS[code[1] as RiasecType];
  const tertiary = RIASEC_DIMENSIONS[code[2] as RiasecType];

  return {
    code,
    title: `The ${primary.name}-${secondary.name} Specialist`,
    summary: `Your Holland profile (${code}) blends the ${primary.trait.toLowerCase()} strengths of the ${primary.name} theme with ${secondary.name.toLowerCase()} and ${tertiary.name.toLowerCase()} capabilities. You are uniquely equipped to bridge ${primary.keySkills[0].toLowerCase()} with ${secondary.keySkills[0].toLowerCase()}.`,
    topStrengths: [
      `${primary.name}: ${primary.keySkills.slice(0, 2).join(' & ')}`,
      `${secondary.name}: ${secondary.keySkills[0]}`,
      `${tertiary.name}: ${tertiary.keySkills[0]}`
    ],
    idealWorkEnvironment: `Organizations spanning ${primary.bruneiSectors[0]} and ${secondary.bruneiSectors[0]}.`,
    growthAreas: [
      `Balance your dominant ${primary.name} perspective with collaborative input from complementary types`,
      `Leverage your ${tertiary.name} dimension for well-rounded professional impact`
    ]
  };
}

export const RIASEC_CAREER_PROFILES: CareerMatch[] = [
  {
    id: 'career-petroleum-geoscientist',
    title: 'Subsurface Reservoir Geoscientist',
    malayTitle: 'Pakar Geosains & Takungan Bawah Tanah',
    industryCluster: 'Energy & Natural Resources',
    primaryDomain: 'engineering',
    hollandCode: 'IRC',
    riasecPrimary: 'I',
    averageSalaryBnd: 'BND $4,200 - $7,800/month (Chartered / Senior)',
    keyEmployersInBrunei: ['Brunei Shell Petroleum (BSP)', 'Petroleum Authority of Brunei Darussalam', 'TotalEnergies Brunei', 'Hengyi Industries'],
    wawasanAlignment: 'Goal 3: Dynamic and Sustainable Economy through high-value energy maximization and carbon capture.',
    recommendedDegrees: [
      { programName: 'BSc Geology / Earth Science', institution: 'Universiti Brunei Darussalam (UBD)', country: 'Brunei', minTariff: 220 },
      { programName: 'BSc Geoscience', institution: 'Imperial College London', country: 'United Kingdom', minTariff: 320 },
      { programName: 'BSc Earth & Planetary Sciences', institution: 'University of Edinburgh', country: 'United Kingdom', minTariff: 280 }
    ],
    fundingPathways: ['BSP Scholarship', 'MOE Scholarship', "Sultan's Scholar", 'Local Govt Scheme'],
    roleOverview: 'Analyze seismic surveys, 3D rock porosity models, and subsurface core samples to locate hydrocarbon reservoirs and explore subterranean carbon capture storage sites.',
    dayInTheLife: 'Interpreting 3D seismic cubes on high-performance visualization workstations, collaborating with drilling engineers in Seria, and presenting well appraisal risk models.'
  },
  {
    id: 'career-clinical-doctor',
    title: 'Specialist Medical Physician / Surgeon',
    malayTitle: 'Pegawai Perubatan Pakar / Pakar Bedah',
    industryCluster: 'Healthcare & Biomedical Sciences',
    primaryDomain: 'medical',
    hollandCode: 'ISA',
    riasecPrimary: 'I',
    averageSalaryBnd: 'BND $3,800 - $8,500/month (Registrar / Consultant)',
    keyEmployersInBrunei: ['Ministry of Health (Raja Isteri Pengiran Anak Saleha Hospital)', 'Pantai Jerudong Specialist Centre (PJSC)', 'Suri Seri Begawan Hospital Kuala Belait', 'Jerudong Park Medical Centre (JPMC)'],
    wawasanAlignment: 'Goal 1 & 2: Highly Educated & Skilled Population with First-Class Quality of Life.',
    recommendedDegrees: [
      { programName: 'Bachelor of Health Sciences (Medicine)', institution: 'Universiti Brunei Darussalam (PAPRSB IHS)', country: 'Brunei', minTariff: 300 },
      { programName: 'MBBS / MBChB Medicine', institution: 'University of Aberdeen / Glasgow / Dundee', country: 'United Kingdom', minTariff: 320 },
      { programName: 'Bachelor of Medical Studies / MD', institution: 'University of Melbourne', country: 'Australia', minTariff: 320 }
    ],
    fundingPathways: ['MOE Scholarship', 'Local Govt Scheme', "Sultan's Scholar"],
    roleOverview: 'Diagnose and treat complex acute and chronic illnesses, perform surgical interventions, and conduct clinical research to raise national health standards.',
    dayInTheLife: 'Conducting early morning ward rounds at RIPAS, leading specialized outpatient clinics, counseling anxious patients and families, and performing surgical procedures.'
  },
  {
    id: 'career-ai-cloud-architect',
    title: 'Cloud Architect & Artificial Intelligence Engineer',
    malayTitle: 'Arkitek Awan & Jurutera Kecerdasan Buatan',
    industryCluster: 'Digital Economy & Telecommunications',
    primaryDomain: 'computing',
    hollandCode: 'IAC',
    riasecPrimary: 'I',
    averageSalaryBnd: 'BND $3,500 - $6,500/month',
    keyEmployersInBrunei: ['EVYD Technology', 'Unified National Networks (UNN)', 'Datastream Digital (DST)', 'Brunei Innovation Lab'],
    wawasanAlignment: 'Goal 3: Knowledge-based digital nation under the Digital Economy Masterplan 2025.',
    recommendedDegrees: [
      { programName: 'BSc (Hons) in Computing (Data Analytics)', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 220 },
      { programName: 'BEng Computer Science', institution: 'University College London (UCL)', country: 'United Kingdom', minTariff: 320 },
      { programName: 'BSc Software Engineering', institution: 'University of Edinburgh', country: 'United Kingdom', minTariff: 280 }
    ],
    fundingPathways: ['MOE Scholarship', 'SBPP Education Loan', 'Local Govt Scheme'],
    roleOverview: 'Design national-scale cloud platforms, train machine learning models for public health predictive analytics, and ensure low-latency data pipelines.',
    dayInTheLife: 'Reviewing automated CI/CD deployment pipelines, optimizing neural network training on cloud clusters, and collaborating with epidemiological teams on national health indicators.'
  },
  {
    id: 'career-shariah-corporate-counsel',
    title: 'Corporate Legal Counsel & Shariah Jurist',
    malayTitle: 'Peguam Korporat & Penasihat Undang-Undang Syariah',
    industryCluster: 'Public Policy, Law & Islamic Finance',
    primaryDomain: 'law_policy',
    hollandCode: 'EIC',
    riasecPrimary: 'E',
    averageSalaryBnd: 'BND $3,600 - $7,200/month',
    keyEmployersInBrunei: ["Attorney General's Chambers (AGC)", 'Bank Islam Brunei Darussalam (BIBD)', 'Brunei Investment Agency (BIA)', 'Leading Private Law Firms'],
    wawasanAlignment: 'Goal 2 & 3: Sovereign governance rooted in Melayu Islam Beraja (MIB) and international commercial excellence.',
    recommendedDegrees: [
      { programName: 'Bachelor of Laws (LL.B) & Bachelor of Shariah (BSL)', institution: 'UNISSA', country: 'Brunei', minTariff: 240 },
      { programName: 'Bachelor of Laws (LL.B)', institution: 'King’s College London / LSE', country: 'United Kingdom', minTariff: 320 },
      { programName: 'LL.B (Hons) Law', institution: 'University of Bristol', country: 'United Kingdom', minTariff: 280 }
    ],
    fundingPathways: ['MOE Scholarship', "Sultan's Scholar", 'Local Govt Scheme'],
    roleOverview: 'Draft statutes, negotiate international bilateral trade agreements, and structure Islamic financing contracts conforming to Shariah standards.',
    dayInTheLife: 'Reviewing cross-border syndicated Sukuk agreements, preparing legal opinions for government ministries, and appearing before regulatory tribunals.'
  },
  {
    id: 'career-chartered-accountant',
    title: 'Chartered Accountant & Forensic Auditor',
    malayTitle: 'Akauntan Bertauliah & Juruaudit Forensik',
    industryCluster: 'Finance, Banking & Audit',
    primaryDomain: 'business_finance',
    hollandCode: 'ECS',
    riasecPrimary: 'E',
    averageSalaryBnd: 'BND $3,200 - $6,500/month (Chartered CA / ACCA)',
    keyEmployersInBrunei: ['Brunei Investment Agency (BIA)', 'PwC Brunei / Deloitte / EY / KPMG', 'Brunei Darussalam Central Bank (BDCB)', 'BIBD Securities'],
    wawasanAlignment: 'Goal 3: Robust financial ecosystem and sound sovereign wealth management.',
    recommendedDegrees: [
      { programName: 'BSc (Hons) in Accounting and Information Systems', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 220 },
      { programName: 'BSc Accounting and Finance', institution: 'London School of Economics (LSE)', country: 'United Kingdom', minTariff: 320 },
      { programName: 'BSc Accounting & Finance', institution: 'University of Warwick', country: 'United Kingdom', minTariff: 280 }
    ],
    fundingPathways: ['MOE Scholarship', 'SBPP Education Loan', 'Local Govt Scheme'],
    roleOverview: 'Conduct external audits, evaluate corporate balance sheets, detect fraudulent financial discrepancies, and provide strategic fiscal counsel.',
    dayInTheLife: 'Auditing high-value asset valuations, reviewing internal control systems against International Financial Reporting Standards (IFRS), and presenting audit findings to corporate boards.'
  },
  {
    id: 'career-sustainable-architect',
    title: 'Sustainable Architectural & Urban Designer',
    malayTitle: 'Arkitek Lestari & Pereka Bandar',
    industryCluster: 'Architecture & Environmental Design',
    primaryDomain: 'environmental_creative',
    hollandCode: 'AIR',
    riasecPrimary: 'A',
    averageSalaryBnd: 'BND $3,000 - $5,800/month',
    keyEmployersInBrunei: ['Public Works Department (JKR)', 'Ministry of Development (Town & Country Planning)', 'Leading Brunei Architectural Firms', 'Ecological Tourism Resorts'],
    wawasanAlignment: 'Goal 2: Clean and green environment with world-class, culturally rooted civic architecture.',
    recommendedDegrees: [
      { programName: 'BSc (Hons) in Architecture', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 240 },
      { programName: 'BSc Architecture', institution: 'University of Bath', country: 'United Kingdom', minTariff: 300 },
      { programName: 'BA (Hons) Architecture', institution: 'Manchester School of Architecture', country: 'United Kingdom', minTariff: 280 }
    ],
    fundingPathways: ['MOE Scholarship', 'SBPP Education Loan', 'Local Govt Scheme'],
    roleOverview: 'Conceive and design climate-responsive, culturally inspired public buildings, residential communities, and green spaces integrating tropical passive cooling.',
    dayInTheLife: 'Developing 3D BIM models on Revit, visiting construction sites along Jalan Tutong to inspect structural finishes, and collaborating with structural engineers on solar shading.'
  },
  {
    id: 'career-stem-educator',
    title: 'Sixth Form & Secondary STEM Educator',
    malayTitle: 'Pendidik STEM Tingkatan Enam & Menengah',
    industryCluster: 'Education, Pedagogy & Youth Development',
    primaryDomain: 'law_policy',
    hollandCode: 'SIE',
    riasecPrimary: 'S',
    averageSalaryBnd: 'BND $2,800 - $5,200/month (Civil Service Education Scale)',
    keyEmployersInBrunei: ['Ministry of Education (Maktab Duli, PTEB, PTET, PTEM, PTES)', 'Department of Schools', 'IBTE Campuses', 'International Schools (JIS, ISB)'],
    wawasanAlignment: 'Goal 1: World-Class Educated and Highly Skilled Human Capital.',
    recommendedDegrees: [
      { programName: 'Master of Teaching (MTeach) / BSc Education', institution: 'Universiti Brunei Darussalam (SHBIE)', country: 'Brunei', minTariff: 220 },
      { programName: 'BSc Mathematics with Education', institution: 'University of Bristol', country: 'United Kingdom', minTariff: 260 },
      { programName: 'BSc Physics / Chemistry', institution: 'UBD Faculty of Science', country: 'Brunei', minTariff: 200 }
    ],
    fundingPathways: ['MOE Scholarship', 'Local Govt Scheme'],
    roleOverview: 'Teach A-Level and O-Level sciences, mentor students toward university admissions, design inquiry-based science lab experiments, and coach academic teams.',
    dayInTheLife: 'Delivering an interactive Organic Chemistry practical in the laboratory, reviewing students’ UCAS personal statement drafts, and coordinating science Olympiad training.'
  },
  {
    id: 'career-petrochemical-process-engineer',
    title: 'Petrochemical Process & Safety Engineer',
    malayTitle: 'Jurutera Proses & Keselamatan Petrokimia',
    industryCluster: 'Industrial Engineering & Energy Downstream',
    primaryDomain: 'engineering',
    hollandCode: 'RIC',
    riasecPrimary: 'R',
    averageSalaryBnd: 'BND $3,500 - $6,500/month',
    keyEmployersInBrunei: ['Hengyi Industries (Pulau Muara Besar)', 'Brunei Fertilizer Industries (BFI)', 'Brunei LNG (BLNG)', 'Brunei Methanol Company (BMC)'],
    wawasanAlignment: 'Goal 3: Downstream petrochemical diversification adding immense value to Brunei’s hydrocarbon exports.',
    recommendedDegrees: [
      { programName: 'BEng (Hons) in Chemical Engineering', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 240 },
      { programName: 'MEng Chemical Engineering', institution: 'Imperial College London', country: 'United Kingdom', minTariff: 320 },
      { programName: 'BEng Chemical Engineering', institution: 'University of Manchester', country: 'United Kingdom', minTariff: 280 }
    ],
    fundingPathways: ['Hengyi Joint Scholarship', 'BSP Scholarship', 'MOE Scholarship', 'Local Govt Scheme'],
    roleOverview: 'Optimize distillation columns, chemical synthesis reactors, and catalytic crackers while strictly maintaining zero-incident safety protocols on offshore islands.',
    dayInTheLife: 'Inspecting automated distributed control systems (DCS) at Pulau Muara Besar, tuning thermodynamic pressure valves, and running safety hazard assessments.'
  },
  {
    id: 'career-central-banker',
    title: 'Central Bank Regulatory & FinTech Officer',
    malayTitle: 'Pegawai Pengawalseliaan & FinTech Bank Pusat',
    industryCluster: 'Financial Regulation & Monetary Policy',
    primaryDomain: 'business_finance',
    hollandCode: 'CIE',
    riasecPrimary: 'C',
    averageSalaryBnd: 'BND $3,200 - $5,800/month',
    keyEmployersInBrunei: ['Brunei Darussalam Central Bank (BDCB)', 'Financial Intelligence Unit (FIU)', 'Ministry of Finance and Economy', 'Brunei Institute of Leadership & Islamic Finance (BILIF)'],
    wawasanAlignment: 'Goal 3: Sound and stable monetary system and leading Islamic financial hub.',
    recommendedDegrees: [
      { programName: 'BSc in Economics and Finance', institution: 'UBD School of Business and Economics', country: 'Brunei', minTariff: 220 },
      { programName: 'BSc Economics', institution: 'London School of Economics (LSE)', country: 'United Kingdom', minTariff: 320 },
      { programName: 'BSc Economics and Econometrics', institution: 'University of Nottingham', country: 'United Kingdom', minTariff: 260 }
    ],
    fundingPathways: ['MOE Scholarship', "Sultan's Scholar", 'Local Govt Scheme'],
    roleOverview: 'Monitor banking liquidity standards, inspect payment gateway compliance, evaluate digital asset regulations, and maintain currency stability.',
    dayInTheLife: 'Analyzing liquidity coverage ratios across commercial banks, drafting FinTech regulatory sandbox guidelines, and attending international central banking conferences.'
  },
  {
    id: 'career-maritime-logistics',
    title: 'Maritime & Port Operations Manager',
    malayTitle: 'Pengurus Operasi Maritim & Pelabuhan',
    industryCluster: 'Maritime, Transport & Trade Logistics',
    primaryDomain: 'engineering',
    hollandCode: 'REC',
    riasecPrimary: 'R',
    averageSalaryBnd: 'BND $3,000 - $5,500/month',
    keyEmployersInBrunei: ['Muara Port Company (MPC)', 'Brunei Gas Carriers (BGC)', 'Maritime and Port Authority of Brunei Darussalam (MPABD)', 'Bolkiah Garrison Logistics'],
    wawasanAlignment: 'Goal 3: International trade hub connecting Brunei to ASEAN and the BIMP-EAGA maritime corridors.',
    recommendedDegrees: [
      { programName: 'BSc Logistics & Supply Chain Management', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 200 },
      { programName: 'BSc Maritime Business and Logistics', institution: 'University of Plymouth', country: 'United Kingdom', minTariff: 220 },
      { programName: 'BEng Naval Architecture', institution: 'University of Southampton', country: 'United Kingdom', minTariff: 260 }
    ],
    fundingPathways: ['BGC Cadetship', 'MOE Scholarship', 'SBPP Education Loan', 'Local Govt Scheme'],
    roleOverview: 'Direct container vessel berthing, quay crane logistics, customs clearance efficiency, and fleet safety across LNG tankers and cargo vessels.',
    dayInTheLife: 'Coordinating container terminal turnarounds at Muara Port, reviewing maritime hydrographic charts, and liaising with port authorities across Southeast Asia.'
  },
  {
    id: 'career-occupational-therapist',
    title: 'Occupational & Speech-Language Therapist',
    malayTitle: 'Terapis Cara Kerja & Pertuturan',
    industryCluster: 'Rehabilitation Medicine & Special Needs',
    primaryDomain: 'medical',
    hollandCode: 'SIA',
    riasecPrimary: 'S',
    averageSalaryBnd: 'BND $2,800 - $4,800/month',
    keyEmployersInBrunei: ['Ministry of Health (Rehabilitation Centres)', 'Child Development Centre (CDC Kiarong)', 'KACA Association', 'Special Education Unit (MOE)'],
    wawasanAlignment: 'Goal 2: Inclusive society empowering every citizen regardless of physical or developmental challenges.',
    recommendedDegrees: [
      { programName: 'BSc (Hons) Occupational Therapy', institution: 'Cardiff University / University of Liverpool', country: 'United Kingdom', minTariff: 260 },
      { programName: 'BSc Speech and Language Therapy', institution: 'University of Manchester', country: 'United Kingdom', minTariff: 260 },
      { programName: 'Bachelor of Occupational Therapy', institution: 'University of Queensland', country: 'Australia', minTariff: 260 }
    ],
    fundingPathways: ['MOE Scholarship', 'Local Govt Scheme', 'SBPP Education Loan'],
    roleOverview: 'Help children with neurodevelopmental delays and stroke patients regain motor skills, speech articulation, and daily living independence.',
    dayInTheLife: 'Conducting sensory integration therapy sessions with young children in Kiarong, prescribing assistive communication tablets, and training parents on home exercises.'
  },
  {
    id: 'career-digital-product-designer',
    title: 'Digital Product & UI/UX Experience Designer',
    malayTitle: 'Pereka Pengalaman Produk Digital & UI/UX',
    industryCluster: 'Creative Tech & Digital Economy',
    primaryDomain: 'environmental_creative',
    hollandCode: 'AEC',
    riasecPrimary: 'A',
    averageSalaryBnd: 'BND $2,800 - $5,200/month',
    keyEmployersInBrunei: ['Baiduri Digital / Bank Islam Brunei Darussalam', 'EVYD Technology', 'InnovAero', 'Darussalam Enterprise (DARe) Startups'],
    wawasanAlignment: 'Goal 3: Citizen-friendly e-government and private sector consumer digital excellence.',
    recommendedDegrees: [
      { programName: 'BSc (Hons) in Creative Computing', institution: 'Universiti Teknologi Brunei (UTB)', country: 'Brunei', minTariff: 200 },
      { programName: 'BSc User Experience Design', institution: 'Loughborough University', country: 'United Kingdom', minTariff: 260 },
      { programName: 'BA Interaction Design', institution: 'University of the Arts London (UAL)', country: 'United Kingdom', minTariff: 240 }
    ],
    fundingPathways: ['MOE Scholarship', 'SBPP Education Loan', 'Local Govt Scheme'],
    roleOverview: 'Craft intuitive mobile banking apps, healthcare dashboards, and web interfaces grounded in user psychology and visual elegance.',
    dayInTheLife: 'Running usability testing sessions with local Bruneian users, refining high-fidelity Figma prototypes with smooth micro-interactions, and handing off design systems to engineers.'
  }
];
