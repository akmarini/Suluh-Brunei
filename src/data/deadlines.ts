import { ApplicationDeadline } from '../types';

export const APPLICATION_DEADLINES: ApplicationDeadline[] = [
  {
    id: 'dl-hecas-round1',
    title: 'HECAS 2027 First Round Application Closes',
    category: 'HECAS',
    institutionOrBody: 'Kementerian Pendidikan Brunei Darussalam (Higher Education Section)',
    date: '2027-03-05',
    time: '16:30',
    description: 'Centralized admission for all local public higher education institutions: UBD, UTB, UNISSA, and Politeknik Brunei (PB), as well as Brunei Government Local Scholarship applications.',
    actionRequired: 'Ensure all online choices are locked, application fee of BND $5 paid at designated counters or BIBD online, and physical/digital documents submitted before the strict 4:30 PM deadline.',
    link: 'https://hecas.moe.gov.bn',
    isCrucial: true
  },
  {
    id: 'dl-moe-overseas-scholarship',
    title: 'MOE Overseas Scholarship Application Closes',
    category: 'Scholarship',
    institutionOrBody: 'Jabatan Pengurusan Biasiswa, Kementerian Pendidikan (MOE)',
    date: '2027-03-05',
    time: '16:30',
    description: 'Submission deadline for Brunei Government Overseas Scholarship (Biasiswa Kerajaan Ke Luar Negeri). Students must apply via HECAS simultaneously with hardcopy/electronic document delivery to the Scholarship Section at Lapangan Terbang Lama Berakas.',
    actionRequired: 'Submit certified copies of Yellow IC, Birth Cert, A-Level result slip, university offer letters, and HECAS receipt. Minimum 120 UCAS points (BBB) required.',
    link: 'https://moe.gov.bn',
    isCrucial: true
  },
  {
    id: 'dl-bsp-scholarship-window',
    title: 'Brunei Shell Petroleum (BSP) Scholarship Application Deadline',
    category: 'Scholarship',
    institutionOrBody: 'Brunei Shell Petroleum Co. Sdn Bhd',
    date: '2027-03-12',
    time: '23:59',
    description: 'Prestigious engineering, geoscience, and digital scholarship for UK, Australian, and local degree programs. Complete with summer attachments and career fast-track.',
    actionRequired: 'Complete the Shell online talent assessment and submit transcripts via BSP Careers portal.',
    link: 'https://www.bsp.com.bn/careers',
    isCrucial: true
  },
  {
    id: 'dl-ucas-equal-consideration',
    title: 'UCAS Main UK Undergraduate Application Deadline',
    category: 'UCAS & Overseas',
    institutionOrBody: 'Universities and Colleges Admissions Service (UK)',
    date: '2027-01-29',
    time: '18:00 GMT',
    description: 'Equal consideration deadline for all UK university undergraduate courses (except Oxford, Cambridge, Medicine, and Dentistry).',
    actionRequired: 'Submit 4,000-character Personal Statement, 5 university choices, and school referee statement via UCAS Hub.',
    link: 'https://www.ucas.com',
    isCrucial: true
  },
  {
    id: 'dl-sultans-scholar-deadline',
    title: "His Majesty The Sultan's Scholar Scheme Submissions",
    category: 'Scholarship',
    institutionOrBody: 'Yayasan Sultan Haji Hassanal Bolkiah (YSHHB)',
    date: '2027-04-15',
    time: '16:00',
    description: 'Application deadline for His Majesty The Sultan’s Scholar Scheme. Open to high-flying students holding multiple A* grades at A-Levels or Mumtaz in STPUB.',
    actionRequired: 'Submit physical dossier to Yayasan Headquarters in Bandar Seri Begawan along with personal vision essay.',
    link: 'https://www.yshhb.org.bn',
    isCrucial: true
  },
  {
    id: 'dl-ubd-ihs-mmi',
    title: 'UBD PAPRSB IHS Multiple Mini Interviews (MMI)',
    category: 'University Intake',
    institutionOrBody: 'Universiti Brunei Darussalam',
    date: '2027-04-20',
    description: 'Multi-station clinical and ethical interviews for shortlisted candidates applying for Medicine, Dentistry, and Pharmacy at UBD.',
    actionRequired: 'Check registered email for invitation slot, prepare medical ethics scenarios, and bring original documents.',
    link: 'https://ihs.ubd.edu.bn',
    isCrucial: false
  },
  {
    id: 'dl-ripas-tb-test',
    title: 'RIPAS Hospital TB Clearance & UK/Australia Visa Medicals',
    category: 'Medical & Visa',
    institutionOrBody: 'Ministry of Health Brunei / Berakas Health Centre',
    date: '2027-06-15',
    description: 'Mandatory tuberculosis chest X-ray screening and international student visa health checks for departing overseas scholars and private students.',
    actionRequired: 'Book appointment via BruHealth at Berakas Health Centre / RIPAS Hospital. Obtain physical clearance cert for UKVI TB certificate.',
    link: 'https://www.gov.uk/tb-test-visa',
    isCrucial: false
  },
  {
    id: 'dl-bsunion-pdb',
    title: 'Brunei Students’ Union (BSUnion) Pre-Departure Briefing',
    category: 'UCAS & Overseas',
    institutionOrBody: 'Brunei Students’ Union in the UK & Eire',
    date: '2027-08-14',
    time: '09:00',
    description: 'Annual gathering for all departing students heading to the UK & Ireland. Meet regional student societies (BruWick, BruSheff, LBU, BruSton, etc.), senior scholars, and welfare reps.',
    actionRequired: 'Register online via BSUnion Instagram / website. Free attendance with parents welcome.',
    link: 'https://bsunion.org',
    isCrucial: false
  },
  {
    id: 'dl-hecas-round2',
    title: 'HECAS 2027 Second Round (August Intake / Clearance)',
    category: 'HECAS',
    institutionOrBody: 'Kementerian Pendidikan Brunei Darussalam',
    date: '2027-08-20',
    description: 'Second intake round primarily for students who received late exam remarks or wish to apply for remaining university vacancies.',
    actionRequired: 'Log into HECAS portal to adjust course selections if first-round offer was not secured.',
    link: 'https://hecas.moe.gov.bn',
    isCrucial: false
  }
];
