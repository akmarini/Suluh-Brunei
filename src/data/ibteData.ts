export interface IbteHntecProgram {
  id: string;
  name: string;
  shortCode: string;
  school: string;
  cluster: 'Aviation' | 'Engineering' | 'ICT' | 'Building Services' | 'Applied Sciences' | 'Business' | 'Hospitality';
  campuses: string[];
  bdqfLevel: number; // 4
  duration: string;
  overview: string;
  keyCompetencies: string[];
  pbArticulationDiploma: string; // e.g. "Level 5 Diploma in Civil Engineering"
  utbDegreeTarget: string; // e.g. "Bachelor of Engineering (Hons) in Civil Engineering"
  industryOpportunities: string[];
  entryRequirements: string;
}

export const IBTE_CAMPUSES_OFFICIAL = [
  'IBTE Sultan Saiful Rijal Campus (Jalan Muara)',
  'IBTE Nakhoda Ragam Campus (Lambak Kanan)',
  'IBTE Mechanical Campus (Tungku)',
  'IBTE Business Campus (Gadong)',
  'IBTE Jefri Bolkiah Campus (Kuala Belait)',
  'IBTE Sultan Bolkiah Campus (Seria)',
  'IBTE Agro-Technology Campus (Kampong Wasan)'
];

export const IBTE_SCHOOLS_OFFICIAL = [
  'School of Aviation',
  'School of Energy and Engineering (Central)',
  'School of Energy and Engineering (Satellite)',
  'School of Information and Communication Technology (ICT)',
  'School of Building Technology Services',
  'School of Agro-Technology and Applied Sciences',
  'School of Business',
  'School of Hospitality and Tourism',
  'Brunei Maritime Academy (BMA)'
];

export const IBTE_HNTEC_CATALOG: IbteHntecProgram[] = [
  // --- Aviation ---
  {
    id: 'hntec-ame-airframe-engine',
    name: 'HNTec in Aircraft Maintenance Engineering (Airframe and Engine)',
    shortCode: 'AME-AE',
    school: 'School of Aviation',
    cluster: 'Aviation',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2.5 Years (2,650 hours compliant with BAR 1 Part-66)',
    overview: 'Prepares licensed aircraft maintenance technicians specializing in aircraft structures, jet turbine engines, hydraulics, and flight control systems. Structured to Brunei Aviation Requirements 1 (BAR 1) Category B1.1 standards.',
    keyCompetencies: ['Turbine engine maintenance', 'Aerodynamics & airframe structures', 'Aviation safety & airworthiness', 'Non-destructive testing (NDT)'],
    pbArticulationDiploma: 'Level 5 Diploma in Mechanical Engineering',
    utbDegreeTarget: 'BSc / BEng (Hons) in Mechanical Engineering (Aerospace articulation)',
    industryOpportunities: ['Royal Brunei Airlines (RB Engineering)', 'Royal Brunei Air Force (TUDB)', 'Brunei Gas Carriers (BGC)', 'Offshore helicopter operators'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Physics / Combined Science, and a pass in English.'
  },
  {
    id: 'hntec-ame-avionics',
    name: 'HNTec in Aircraft Maintenance Engineering (Avionics)',
    shortCode: 'AME-AV',
    school: 'School of Aviation',
    cluster: 'Aviation',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2.5 Years (compliant with BAR 1 Part-66 Category B2)',
    overview: 'Covers modern aircraft radar, navigation, flight guidance autopilots, satellite communication systems, and electronic instrumentation for civil and military aviation.',
    keyCompetencies: ['Avionics digital data systems', 'Radar & navigation equipment', 'Aircraft electrical distribution', 'Glass cockpit instrumentation'],
    pbArticulationDiploma: 'Level 5 Diploma in Electrical and Electronic Engineering',
    utbDegreeTarget: 'BEng (Hons) in Electrical & Electronic Engineering',
    industryOpportunities: ['Royal Brunei Airlines (Avionics Dept)', 'Royal Brunei Air Force', 'Civil Aviation Department (DCA Brunei)'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Physics / Science, and pass in English.'
  },

  // --- ICT ---
  {
    id: 'hntec-it',
    name: 'HNTec in Information Technology',
    shortCode: 'IT',
    school: 'School of Information and Communication Technology (ICT)',
    cluster: 'ICT',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)', 'IBTE Jefri Bolkiah Campus (Kuala Belait)'],
    bdqfLevel: 4,
    duration: '2 Years (including 3-month industry attachment)',
    overview: 'Flagship computing program providing hands-on competencies in computer hardware assembly, software development, relational database systems, web applications, and systems administration.',
    keyCompetencies: ['Python & Web Application development', 'Database querying (SQL)', 'Linux & Windows Server administration', 'IT Helpdesk & client support'],
    pbArticulationDiploma: 'Level 5 Diploma in Information Technology',
    utbDegreeTarget: 'BSc (Hons) in Computer Science / Software Development (Direct Year 2 with Merit)',
    industryOpportunities: ['Dynamik Technologies', 'Unified National Networks (UNN)', 'EVYD Technology', 'Government IT departments (EGNC)'],
    entryRequirements: 'Minimum 3 GCE O-Levels with Mathematics or Additional Mathematics and 2 related science/commerce subjects.'
  },
  {
    id: 'hntec-computer-networking',
    name: 'HNTec in Computer Networking',
    shortCode: 'CN',
    school: 'School of Information and Communication Technology (ICT)',
    cluster: 'ICT',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)', 'IBTE Jefri Bolkiah Campus (Kuala Belait)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Focuses on enterprise networking, Cisco router and switch configurations, fiber optic cabling, network security protocols, wireless installations, and server administration.',
    keyCompetencies: ['Cisco CCNA routing & switching', 'Subnetting & VLAN design', 'Network security & firewall policies', 'Structured fiber/copper cabling'],
    pbArticulationDiploma: 'Level 5 Diploma in Telecommunications & Systems Engineering',
    utbDegreeTarget: 'BSc (Hons) in Computer Networking / Cyber Security',
    industryOpportunities: ['UNN (Unified National Networks)', 'DST', 'Progresif', 'imagine', 'BSP Telecommunications'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credit in Mathematics or Computer Studies/Physics.'
  },
  {
    id: 'hntec-info-library',
    name: 'HNTec in Information and Library Studies',
    shortCode: 'ILS',
    school: 'School of Information and Communication Technology (ICT)',
    cluster: 'ICT',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)', 'IBTE Jefri Bolkiah Campus (Kuala Belait)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Equips students with competencies in digital archiving, cataloging systems, metadata management, institutional knowledge repositories, and information retrieval.',
    keyCompetencies: ['Dewey Decimal & MARC cataloging', 'Digital repository management', 'Information ethics & copyright', 'Records management'],
    pbArticulationDiploma: 'Level 5 Diploma in Library & Information Management',
    utbDegreeTarget: 'BSc / BA in Information Management or Digital Humanities',
    industryOpportunities: ['Universiti Brunei Darussalam Library', 'National Archives of Brunei', 'Supreme Court Records', 'Dewan Bahasa dan Pustaka'],
    entryRequirements: 'Minimum 3 GCE O-Levels including English Language.'
  },
  {
    id: 'hntec-electronics-media',
    name: 'HNTec in Electronics and Media Technology',
    shortCode: 'EMT',
    school: 'School of Aviation / ICT',
    cluster: 'ICT',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Bridges audio-visual broadcast electronics, digital video recording, studio sound engineering, lighting control, and multimedia streaming technology.',
    keyCompetencies: ['Broadcast transmission systems', 'Studio audio & acoustics', 'Video switching & live streaming', 'Digital signal processing'],
    pbArticulationDiploma: 'Level 5 Diploma in Digital Media / Telecommunications',
    utbDegreeTarget: 'BSc (Hons) in Creative Computing / Media Technology',
    industryOpportunities: ['Radio Televisyen Brunei (RTB)', 'AITI licensed broadcasters', 'Production houses', 'Government Information Department (JAP)'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credit in Mathematics or Science.'
  },

  // --- Energy & Engineering ---
  {
    id: 'hntec-mechanical-eng',
    name: 'HNTec in Mechanical Engineering',
    shortCode: 'ME',
    school: 'School of Energy and Engineering (Central)',
    cluster: 'Engineering',
    campuses: ['IBTE Mechanical Campus (Tungku)', 'IBTE Jefri Bolkiah Campus (Kuala Belait)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Core engineering discipline encompassing computer-aided design (CAD), CNC machining, thermo-fluids, welding technology, mechanical fabrication, and materials testing.',
    keyCompetencies: ['AutoCAD & SolidWorks CAD modeling', 'CNC lathe & milling machining', 'Pneumatics & hydraulic circuits', 'Mechanical vibration & failure analysis'],
    pbArticulationDiploma: 'Level 5 Diploma in Mechanical Engineering',
    utbDegreeTarget: 'BEng (Hons) in Mechanical Engineering (Direct Year 2 articulation with Merit)',
    industryOpportunities: ['Brunei Shell Petroleum (BSP)', 'Brunei LNG (BLNG)', 'Hengyi Industries (Pulau Muara Besar)', 'Muara Port Company'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Physics/Combined Science, and pass in English.'
  },
  {
    id: 'hntec-plant-eng',
    name: 'HNTec in Plant Engineering',
    shortCode: 'PE',
    school: 'School of Energy and Engineering (Satellite)',
    cluster: 'Engineering',
    campuses: ['IBTE Jefri Bolkiah Campus (Kuala Belait)', 'IBTE Mechanical Campus (Tungku)'],
    bdqfLevel: 4,
    duration: '2 Years (with Hands-on Training / HOT Mini Plant attachment)',
    overview: 'Premier downstream energy training program tailored for refinery, LNG, and petrochemical facilities. Students train on live process loops, heat exchangers, separation columns, and pumps.',
    keyCompetencies: ['Process piping & P&ID interpretation', 'Centrifugal pump & turbine maintenance', 'Plant safety & permit-to-work (PTW)', 'Hazardous area standards (ATEX/IECEx)'],
    pbArticulationDiploma: 'Level 5 Diploma in Petrochemical Engineering',
    utbDegreeTarget: 'BEng (Hons) in Chemical / Petroleum Engineering',
    industryOpportunities: ['Brunei Shell Petroleum', 'Brunei LNG', 'Brunei Fertilizer Industries (BFI)', 'TotalEnergies Brunei', 'Hengyi Industries'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Science / Chemistry / Physics.'
  },
  {
    id: 'hntec-electrical-eng',
    name: 'HNTec in Electrical Engineering',
    shortCode: 'EE',
    school: 'School of Energy and Engineering (Central / Satellite)',
    cluster: 'Engineering',
    campuses: ['IBTE Nakhoda Ragam Campus (Lambak Kanan)', 'IBTE Jefri Bolkiah Campus (Kuala Belait)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Covers high and low voltage power distribution, electrical installations to IET wiring regulations, electrical machine windings, switchgear, and renewable solar installations.',
    keyCompetencies: ['Single & 3-phase wiring installations', 'Motor control & relay circuits', 'High-voltage switchgear safety', 'Transformer maintenance'],
    pbArticulationDiploma: 'Level 5 Diploma in Electrical and Electronic Engineering',
    utbDegreeTarget: 'BEng (Hons) in Electrical & Electronic Engineering',
    industryOpportunities: ['Department of Electrical Services (DES)', 'Berakas Power Management Company (BPMC)', 'BSP Offshore Electrical', 'Hengyi Power Plant'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Physics/Combined Science.'
  },
  {
    id: 'hntec-electronic-eng',
    name: 'HNTec in Electronic Engineering',
    shortCode: 'ELE',
    school: 'School of Energy and Engineering (Central)',
    cluster: 'Engineering',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Microcontroller programming, PCB circuit design, analog/digital signal analysis, sensor integration, and industrial robotics automated assembly.',
    keyCompetencies: ['PCB layout & SMD soldering', 'Microcontroller coding (C/Embedded)', 'Power electronics & inverters', 'Fault diagnosis with oscilloscopes'],
    pbArticulationDiploma: 'Level 5 Diploma in Electrical and Electronic Engineering',
    utbDegreeTarget: 'BEng (Hons) in Mechatronics / Electronic Engineering',
    industryOpportunities: ['Telecommunications providers', 'Industrial automation vendors', 'Medical equipment maintenance contractors'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics and Physics.'
  },
  {
    id: 'hntec-instrumentation-control',
    name: 'HNTec in Instrumentation & Control Engineering',
    shortCode: 'ICE',
    school: 'School of Energy and Engineering (Satellite)',
    cluster: 'Engineering',
    campuses: ['IBTE Jefri Bolkiah Campus (Kuala Belait)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Specialized discipline monitoring industrial process variables (pressure, temperature, flow, level) using PLCs, SCADA systems, distributed control systems (DCS), and calibration.',
    keyCompetencies: ['PLC programming (Ladder / Function Block)', 'Transmitter calibration (4-20mA)', 'DCS & SCADA interface configuration', 'Safety Instrumented Systems (SIS/SIL)'],
    pbArticulationDiploma: 'Level 5 Diploma in Electrical & Electronic Engineering',
    utbDegreeTarget: 'BEng (Hons) in Mechatronics or Chemical Engineering',
    industryOpportunities: ['Brunei Shell Petroleum (Instrumentation Dept)', 'Brunei LNG', 'BFI', 'Yokogawa Brunei', 'Emerson Brunei'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics and Physics/Chemistry.'
  },
  {
    id: 'hntec-building-services-eng',
    name: 'HNTec in Building Services Engineering',
    shortCode: 'BSE',
    school: 'School of Building Technology Services',
    cluster: 'Engineering',
    campuses: ['IBTE Nakhoda Ragam Campus (Lambak Kanan)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Comprehensive training in modern commercial building systems: central air-conditioning (HVAC), fire suppression and alarms, plumbing, vertical elevators, and energy audits.',
    keyCompetencies: ['Central chiller & HVAC design', 'Fire alarm & sprinkler systems', 'Building Management Systems (BMS)', 'Acoustic & lighting efficiency'],
    pbArticulationDiploma: 'Level 5 Diploma in Civil Engineering / Architecture',
    utbDegreeTarget: 'BEng (Hons) in Civil Engineering or Building Services',
    industryOpportunities: ['Public Works Department (JKR Brunei)', 'Leading M&E engineering consultants', 'Commercial property management (DAP)'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics and a Science subject.'
  },
  {
    id: 'hntec-automobile-tech',
    name: 'HNTec in Automobile Technology',
    shortCode: 'AT',
    school: 'School of Energy and Engineering (Central)',
    cluster: 'Engineering',
    campuses: ['IBTE Mechanical Campus (Tungku)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Modern automotive diagnostics, electronic engine management (OBD-II), hybrid and electric vehicle (EV) powertrains, automatic transmission, and anti-lock braking.',
    keyCompetencies: ['Electronic ECU scanning & mapping', 'Hybrid/EV high-voltage battery safety', 'Engine overhaul & rebuilding', 'Automotive CAN bus systems'],
    pbArticulationDiploma: 'Level 5 Diploma in Mechanical Engineering',
    utbDegreeTarget: 'BEng (Hons) in Mechanical Engineering (Automotive option)',
    industryOpportunities: ['NBT (Brunei) Toyota/Lexus', 'QAF Auto (BMW)', 'Grand Motors', 'Setia Motors', 'Royal Brunei Armed Forces Workshop'],
    entryRequirements: 'Minimum 3 GCE O-Levels or relevant NTec certificate with Merit.'
  },
  {
    id: 'hntec-electronics-communication-eng',
    name: 'HNTec in Electronics and Communication Engineering',
    shortCode: 'ECE',
    school: 'School of Aviation / Engineering',
    cluster: 'Engineering',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Microwave radio propagation, satellite communications, optical fiber transmission, cellular networks (4G/5G), and RF circuit design.',
    keyCompetencies: ['RF spectrum analysis', 'Microwave dish alignment', 'Optical time-domain reflectometer (OTDR)', 'Wireless base station maintenance'],
    pbArticulationDiploma: 'Level 5 Diploma in Telecommunications & Systems Engineering',
    utbDegreeTarget: 'BEng (Hons) in Electrical & Electronic Engineering',
    industryOpportunities: ['Unified National Networks (UNN)', 'AITI', 'Maritime and Aviation Telecommunication services'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics and Physics.'
  },
  {
    id: 'hntec-telecom-network-apprenticeship',
    name: 'HNTec Apprenticeship in Telecommunication Network Engineering',
    shortCode: 'TNE',
    school: 'School of Energy and Engineering (Central)',
    cluster: 'Engineering',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2.5 Years (Dual TVET Industry Apprenticeship with UNN)',
    overview: 'Work-based apprenticeship partnership with Unified National Networks (UNN), embedding students directly into nationwide fiber-to-the-home (FTTH) and 5G cellular infrastructure rollouts.',
    keyCompetencies: ['Nationwide optical fiber deployment', 'Subsea cable station maintenance', '5G cell tower rigging & commissioning', 'Carrier Ethernet networking'],
    pbArticulationDiploma: 'Level 5 Diploma in Telecommunications & Systems Engineering',
    utbDegreeTarget: 'BEng (Hons) in Electrical & Electronic Engineering',
    industryOpportunities: ['Unified National Networks (UNN) guaranteed employment pathway', 'Network contractors'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Physics/Science, and pass in English.'
  },

  // --- Building Technology Services ---
  {
    id: 'hntec-construction-draughting',
    name: 'HNTec in Construction & Draughting (Dual TVET)',
    shortCode: 'CD',
    school: 'School of Building Technology Services',
    cluster: 'Building Services',
    campuses: ['IBTE Nakhoda Ragam Campus (Lambak Kanan)'],
    bdqfLevel: 4,
    duration: '2 Years (Dual TVET with construction architectural firms)',
    overview: 'Building Information Modelling (BIM), Revit 3D, structural engineering draughting, quantity takeoff estimation, site inspection, and Brunei building regulations.',
    keyCompetencies: ['Autodesk Revit & BIM workflows', 'Architectural detailing & structural drafting', 'Site supervision & safety standards', 'Bill of quantities preparation'],
    pbArticulationDiploma: 'Level 5 Diploma in Civil Engineering / Architecture',
    utbDegreeTarget: 'BEng (Hons) in Civil Engineering or BSc (Hons) in Architecture',
    industryOpportunities: ['Public Works Department (JKR)', 'Leading architectural & civil engineering firms in Brunei', 'DARA Construction', 'LSL Sdn Bhd'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Art/Design or Science.'
  },
  {
    id: 'hntec-geomatics',
    name: 'HNTec in Geomatics',
    shortCode: 'GEO',
    school: 'School of Building Technology Services',
    cluster: 'Building Services',
    campuses: ['IBTE Nakhoda Ragam Campus (Lambak Kanan)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Land surveying, global navigation satellite systems (GNSS/GPS), geographic information systems (GIS), drone aerial photogrammetry, and cadastral boundary mapping.',
    keyCompetencies: ['Total station & digital level surveying', 'GNSS RTK field data collection', 'ArcGIS & QGIS spatial mapping', 'Cadastral title boundary verification'],
    pbArticulationDiploma: 'Level 5 Diploma in Civil Engineering',
    utbDegreeTarget: 'BEng (Hons) in Civil Engineering or BSc in Geomatics / Surveying',
    industryOpportunities: ['Survey Department (Jabatan Ukur Brunei)', 'Town and Country Planning Department', 'BSP Geomatics & Hydrographic Survey'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics, Geography or Physics.'
  },
  {
    id: 'hntec-real-estate',
    name: 'HNTec in Real Estate Management & Agency',
    shortCode: 'REMA',
    school: 'School of Building Technology Services',
    cluster: 'Building Services',
    campuses: ['IBTE Nakhoda Ragam Campus (Lambak Kanan)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Property valuation fundamentals, estate agency law, facility leasing management, municipal rates, building inspection, and land administration in Brunei.',
    keyCompetencies: ['Property market appraisal', 'Land code & tenancy law', 'Commercial facility management', 'Real estate marketing & sales'],
    pbArticulationDiploma: 'Level 5 Diploma in Business Studies / Architecture',
    utbDegreeTarget: 'BSc (Hons) in Real Estate / Estate Management',
    industryOpportunities: ['Land Department (Jabatan Tanah)', 'Brunei Investment Agency properties', 'Chartered valuation agencies', 'Darussalam Assets'],
    entryRequirements: 'Minimum 3 GCE O-Levels including Mathematics and English.'
  },

  // --- Agro-Technology & Applied Sciences ---
  {
    id: 'hntec-agrotechnology',
    name: 'HNTec in Agrotechnology',
    shortCode: 'AGRO',
    school: 'School of Agro-Technology and Applied Sciences',
    cluster: 'Applied Sciences',
    campuses: ['IBTE Agro-Technology Campus (Kampong Wasan)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Supports Brunei national food security vision (Wawasan 2035). Covers smart precision farming, hydroponics, aquaculture fisheries, livestock and veterinary health, and agricultural food processing.',
    keyCompetencies: ['Smart greenhouse & IoT irrigation', 'Aquaculture water quality testing', 'Crop pest & disease diagnosis', 'Veterinary health monitoring & animal nutrition'],
    pbArticulationDiploma: 'Level 5 Diploma in Science / Agrotechnology',
    utbDegreeTarget: 'BSc (Hons) in Applied Science / Food Science at UBD or UTB',
    industryOpportunities: ['Department of Agriculture and Agrifood (DAA)', 'Ghanim International Food (bruneihalalfoods)', 'Commercial poultry & aquaculture farms in Wasan/Tutong'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Biology/Chemistry/Combined Science and Mathematics.'
  },
  {
    id: 'hntec-laboratory-science',
    name: 'HNTec in Laboratory Science',
    shortCode: 'LAB',
    school: 'School of Agro-Technology and Applied Sciences',
    cluster: 'Applied Sciences',
    campuses: ['IBTE Agro-Technology Campus (Kampong Wasan)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Comprehensive laboratory disciplines spanning microbiological culturing, analytical chemistry titration, spectrophotometry, pathology testing, and laboratory safety management (GLP).',
    keyCompetencies: ['Aseptic microbiological techniques', 'Spectrophotometry & chromatography', 'Clinical specimen processing', 'ISO 17025 laboratory accreditation standards'],
    pbArticulationDiploma: 'Level 5 Diploma in Health Sciences (Medical Laboratory Technology)',
    utbDegreeTarget: 'BSc (Hons) in Biomedical Science / Chemistry',
    industryOpportunities: ['Ministry of Health (RIPAS Hospital Clinical Labs)', 'Department of Scientific Services (DSS)', 'BFI/BSP Quality Assurance Labs', 'Biotechnology firms'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Chemistry, Biology or Combined Science, and Mathematics.'
  },
  {
    id: 'hntec-pharmacy-technician',
    name: 'HNTec in Pharmacy Technician',
    shortCode: 'PHARM',
    school: 'School of Agro-Technology and Applied Sciences',
    cluster: 'Applied Sciences',
    campuses: ['IBTE Agro-Technology Campus (Kampong Wasan)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Prepares certified pharmacy support personnel in hospital dispensaries, sterile compounding, pharmacology classifications, inventory management, and pharmaceutical regulations in Brunei.',
    keyCompetencies: ['Prescription dispensing & label verification', 'Aseptic IV compounding', 'Pharmaceutical dosage calculations', 'Cold chain inventory management'],
    pbArticulationDiploma: 'Level 5 Diploma in Health Sciences (Pharmacy)',
    utbDegreeTarget: 'Bachelor of Pharmacy (BPharm) / BSc Pharmacology',
    industryOpportunities: ['Ministry of Health (Hospital & Clinic Pharmacies)', 'Guardian / retail pharmacies in Brunei', 'Pharmaceutical distribution agencies'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Chemistry, Biology or Combined Science, and Mathematics.'
  },

  // --- Business & Management ---
  {
    id: 'hntec-business-finance',
    name: 'HNTec in Business & Finance',
    shortCode: 'BF',
    school: 'School of Business',
    cluster: 'Business',
    campuses: ['IBTE Business Campus (Gadong)', 'IBTE Jefri Bolkiah Campus (Kuala Belait)'],
    bdqfLevel: 4,
    duration: '2 Years (with 3-month industrial attachment)',
    overview: 'Financial and management accounting, corporate taxation, Islamic banking fundamentals, computerized accounting software, microeconomics, and business communications.',
    keyCompetencies: ['Double-entry ledger & financial statements', 'Taxation calculations & filing', 'Payroll management & SPK compliance', 'Enterprise accounting software'],
    pbArticulationDiploma: 'Level 5 Diploma in Business Accounting and Finance',
    utbDegreeTarget: 'Bachelor of Business (Hons) in Finance and Risk Management (Direct Year 2 with Merit)',
    industryOpportunities: ['Bank Islam Brunei Darussalam (BIBD)', 'Baiduri Bank', 'Audit firms (PwC, Deloitte, Ernst & Young Brunei)', 'Corporate finance teams'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credits in Mathematics/Principles of Accounts and 2 other subjects.'
  },
  {
    id: 'hntec-business-management',
    name: 'HNTec in Business (Business Management)',
    shortCode: 'BM',
    school: 'School of Business',
    cluster: 'Business',
    campuses: ['IBTE Business Campus (Gadong)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Organizational behavior, digital marketing, human resource administration, supply chain logistics, business law, and entrepreneurial venture launching in Brunei.',
    keyCompetencies: ['Marketing strategy & social media campaigns', 'Human resource recruitment & appraisals', 'Inventory & warehouse logistics', 'Business plan pitching'],
    pbArticulationDiploma: 'Level 5 Diploma in Business Studies (Marketing & Management)',
    utbDegreeTarget: 'Bachelor of Business (Hons) in Marketing / Management',
    industryOpportunities: ['Darussalam Enterprise (DARe)', 'Government statutory bodies', 'Retail & FMCG corporate distributors', 'Private enterprises'],
    entryRequirements: 'Minimum 3 GCE O-Levels including Mathematics and English.'
  },
  {
    id: 'hntec-business-office-admin',
    name: 'HNTec in Business (Office Administration)',
    shortCode: 'BOA',
    school: 'School of Business',
    cluster: 'Business',
    campuses: ['IBTE Business Campus (Gadong)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Executive secretarial management, business document filing, meeting minutes recording, corporate correspondence, event coordination, and office automation.',
    keyCompetencies: ['Advanced document processing & spreadsheet modeling', 'Executive calendar & meeting coordination', 'Business protocol & customer service', 'Records management'],
    pbArticulationDiploma: 'Level 5 Diploma in Business Studies',
    utbDegreeTarget: 'Bachelor of Business (Hons) in Management',
    industryOpportunities: ['Government Ministries and Departments', 'Law firms & corporate legal secretariats', 'Healthcare administration', 'Diplomatic missions'],
    entryRequirements: 'Minimum 3 GCE O-Levels including English Language.'
  },

  // --- Hospitality & Tourism ---
  {
    id: 'hntec-hospitality-operations',
    name: 'HNTec in Hospitality Operations',
    shortCode: 'HO',
    school: 'School of Hospitality and Tourism',
    cluster: 'Hospitality',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2 Years (with Long-term Hotel Attachment)',
    overview: 'Front office management, concierge operations, housekeeping supervision, food and beverage service standards, banquet event coordination, and guest relations.',
    keyCompetencies: ['Hotel property management systems (PMS)', 'Fine dining silver service & beverage management', 'Banquet & conference planning', 'Hospitality revenue management'],
    pbArticulationDiploma: 'Level 5 Diploma in Hospitality Management',
    utbDegreeTarget: 'BA (Hons) in International Tourism and Hospitality Management at LCB / overseas',
    industryOpportunities: ['The Empire Brunei', 'Radisson Hotel Brunei Darussalam', 'The Rizqun International Hotel', 'Royal Brunei Culinary (RBC)'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credit in English Language.'
  },
  {
    id: 'hntec-travel-tourism',
    name: 'HNTec in Travel and Tourism',
    shortCode: 'TT',
    school: 'School of Hospitality and Tourism',
    cluster: 'Hospitality',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Eco-tourism planning, Temburong national park tour operations, international airline ticketing (Amadeus/Sabre GDS), destination marketing, and travel agency administration.',
    keyCompetencies: ['Airline reservation & GDS ticketing', 'Eco-tourism itinerary curation', 'Tour guiding & safety protocol', 'Destination branding'],
    pbArticulationDiploma: 'Level 5 Diploma in Tourism & Hospitality Management',
    utbDegreeTarget: 'BA (Hons) in Tourism and Event Management',
    industryOpportunities: ['Tourism Development Department (MPRT)', 'Royal Brunei Airlines (Travel ticketing)', 'Inbound tour operators (Freme Travel, Antara Travel)'],
    entryRequirements: 'Minimum 3 GCE O-Levels with credit in English Language or Geography.'
  },
  {
    id: 'hntec-culinary-operations',
    name: 'HNTec in Culinary Operations',
    shortCode: 'CO',
    school: 'School of Hospitality and Tourism',
    cluster: 'Hospitality',
    campuses: ['IBTE Sultan Saiful Rijal Campus (Jalan Muara)'],
    bdqfLevel: 4,
    duration: '2 Years',
    overview: 'Classical culinary techniques, Brunei traditional heritage cuisine, halal food safety & HACCP standards, pastry & baking art, kitchen brigade management, and food cost accounting.',
    keyCompetencies: ['Commercial kitchen brigade operations', 'Halal certification & HACCP auditing', 'Pastry & artisan bread baking', 'Menu engineering & costing'],
    pbArticulationDiploma: 'Level 5 Diploma in Hospitality Management',
    utbDegreeTarget: 'BA (Hons) in Culinary Arts Management (LCB Chester / overseas)',
    industryOpportunities: ['Royal Brunei Culinary (RBC)', '5-Star Hotel Kitchens (The Empire, Radisson)', 'High-end catering establishments', 'Independent culinary enterprise'],
    entryRequirements: 'Minimum 3 GCE O-Levels or relevant NTec certificate with Merit.'
  }
];

export const IBTE_PROGRAMMES_LIST: string[] = IBTE_HNTEC_CATALOG.map(p => p.name);

export function getIbteProgramByName(name: string): IbteHntecProgram | undefined {
  return IBTE_HNTEC_CATALOG.find(p => p.name.toLowerCase() === name.toLowerCase()) ||
         IBTE_HNTEC_CATALOG.find(p => name.toLowerCase().includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(name.toLowerCase()));
}
