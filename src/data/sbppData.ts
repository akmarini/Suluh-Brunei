import { SbppTier } from '../types';

export const SBPP_TIERS: SbppTier[] = [
  {
    destination: 'Local Institutions (e.g. LCB, PB, UBD, UTB)',
    minPoints: 64,
    tuitionLoanMaxPerYear: 12000,
    monthlyAllowanceBnd: 300,
    currency: 'BND',
    firstClassConversionEligible: true,
    notes: 'Ideal for students pursuing UK-awarded degrees at Laksamana College of Business (University of Chester/Essex) or fee-paying admissions at UBD/UTB.'
  },
  {
    destination: 'United Kingdom & Europe',
    minPoints: 96,
    tuitionLoanMaxPerYear: 32000,
    monthlyAllowanceBnd: 1200,
    currency: 'GBP / BND',
    firstClassConversionEligible: true,
    notes: 'Covers MKPK-recognized UK universities. Students with 96–112 UCAS points who missed the 120-point MOE Overseas Scholarship threshold often use this route.'
  },
  {
    destination: 'Australia & New Zealand',
    minPoints: 96,
    tuitionLoanMaxPerYear: 34000,
    monthlyAllowanceBnd: 1300,
    currency: 'AUD / BND',
    firstClassConversionEligible: true,
    notes: 'Applicable for Group of Eight and accredited Australian institutions recognized by Brunei National Accreditation Council (MKPK).'
  },
  {
    destination: 'Malaysia / Regional',
    minPoints: 80,
    tuitionLoanMaxPerYear: 15000,
    monthlyAllowanceBnd: 500,
    currency: 'MYR / BND',
    firstClassConversionEligible: true,
    notes: 'Popular for medical, engineering, and multimedia programs in Kuala Lumpur, Penang, and Sarawak (e.g. Monash Malaysia, Curtin Malaysia, UTM).'
  }
];

export const SBPP_APPLICATION_STEPS = [
  {
    step: 1,
    title: 'Obtain Firm / Conditional University Offer',
    desc: 'Secure an official offer letter from an MKPK-recognized institution. Ensure the qualification meets the Brunei National Qualifications Framework (BNQF) Level 6.'
  },
  {
    step: 2,
    title: 'Verification by MKPK (Majlis Kebangsaan Pengiktirafan Kelayakan)',
    desc: 'Verify that your intended degree and university are listed on the official recognized register by the Brunei National Accreditation Council.'
  },
  {
    step: 3,
    title: 'Complete Online SBPP Application Form',
    desc: 'Submit your personal particulars, Sixth Form academic transcripts, university offer letter, and study budget through the Ministry of Education portal.'
  },
  {
    step: 4,
    title: 'Appoint Two Working Bruneian Guarantors (Penjamin)',
    desc: 'Prepare identity cards, latest 3 months salary slips, and employment confirmation letters for two working Brunei citizens.'
  },
  {
    step: 5,
    title: 'Ministry Interview & Agreement Signing',
    desc: 'Attend the SBPP vetting interview at Lapangan Terbang Lama Berakas and execute the formal loan agreement before disbursement.'
  }
];

export const SBPP_DOCUMENT_CHECKLIST = [
  'Certified true copy of applicant’s Brunei Yellow IC (Kad Pengenalan Kuning) or approved Red IC',
  'Certified true copy of Sijil Beranak (Birth Certificate)',
  'Certified copies of GCE O-Level, A-Level / IB / Diploma Certificates and Transcripts',
  'Firm / Conditional Offer Letter from the University specifying tuition fees and course duration',
  'Confirmation letter of Course Recognition from MKPK (Surat Pengiktirafan MKPK)',
  'Certified copies of ICs for two working Bruneian Guarantors (Penjamin 1 & Penjamin 2)',
  'Latest 3 months official salary slips (Penyata Gaji) and employment confirmation letters of both guarantors',
  'Applicant’s active local bank account details in Brunei (BIBD or Baiduri)'
];

export const SBPP_FAQ = [
  {
    q: 'What is the main difference between the MOE Government Scholarship and SBPP?',
    a: 'The Government Scholarship (Biasiswa Kerajaan) is a non-repayable award that carries an employment service bond (typically 5 years with His Majesty’s Government) and requires a minimum of 120 UCAS points (BBB). SBPP (Skim Bantuan Pinjaman Pendidikan) is an education loan assistance scheme that provides financing (tuition + optional living allowance) with a lower entry threshold (typically 64–96 points / CC). There is no government service bond, allowing graduates full freedom to choose their employer in the private sector or start a business.'
  },
  {
    q: 'How does the First-Class Honours (Ijazah Kelas Pertama) conversion work?',
    a: 'Under the Ministry of Education incentive policy, SBPP recipients who graduate with First Class Honours (or distinction equivalent) can formally petition the Government to convert their loan into a full scholarship. Upon approval by the Ministry, the outstanding repayment is waived, transforming the loan into an honorary scholarship reward.'
  },
  {
    q: 'When do loan repayments start, and what is the interest rate?',
    a: 'SBPP loans have zero commercial interest. Repayment commences after a grace/moratorium period, typically 6 to 12 months following graduation or immediately upon securing gainful employment in Brunei. Repayments are structured affordably over a 5 to 15 year repayment schedule.'
  },
  {
    q: 'Can Red IC (Permanent Resident) holders apply for SBPP?',
    a: 'Yes, under specific Ministry regulations, children of permanent residents with approved educational background in Brunei who do not qualify for the full government scholarship can be considered for SBPP financing subject to additional guarantor and residency vetting.'
  },
  {
    q: 'Can I use SBPP for local colleges like Laksamana College of Business (LCB)?',
    a: 'Yes! SBPP is very widely utilized by students taking University of Chester and University of Essex franchised degree programs at LCB in Bandar Seri Begawan, covering their annual tuition and study expenses without leaving Brunei.'
  }
];
