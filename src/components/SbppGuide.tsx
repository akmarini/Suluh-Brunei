import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle2, 
  HelpCircle, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Calculator, 
  ExternalLink,
  Users,
  Award,
  AlertCircle,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { SBPP_TIERS, SBPP_APPLICATION_STEPS, SBPP_DOCUMENT_CHECKLIST, SBPP_FAQ } from '../data/sbppData';
import { StudentProfile } from '../types';

interface SbppGuideProps {
  profile: StudentProfile;
  onNavigateToPathways: () => void;
  onNavigateToAptitude: () => void;
  onBookAlumniForSbpp: () => void;
}

export const SbppGuide: React.FC<SbppGuideProps> = ({
  profile,
  onNavigateToPathways,
  onNavigateToAptitude,
  onBookAlumniForSbpp
}) => {
  // Calculator state
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(0);
  const [durationYears, setDurationYears] = useState(3);
  const [includeLivingAllowance, setIncludeLivingAllowance] = useState(true);
  const [repaymentTenureYears, setRepaymentTenureYears] = useState(10);

  const currentTier = SBPP_TIERS[selectedDestinationIndex];

  // Calculate loan figures
  const annualTuition = currentTier.tuitionLoanMaxPerYear;
  const annualAllowance = includeLivingAllowance ? currentTier.monthlyAllowanceBnd * 12 : 0;
  const totalLoanPrincipal = (annualTuition + annualAllowance) * durationYears;
  
  // Total months for repayment
  const totalMonths = repaymentTenureYears * 12;
  const monthlyRepaymentBnd = Math.round(totalLoanPrincipal / totalMonths);

  return (
    <div className="space-y-10">
      {/* SECTION 1: SBPP Hero & Core Philosophy */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <span>Kementerian Pendidikan Brunei Darussalam</span>
              <span aria-hidden="true">·</span>
              <span>Skim Bantuan Pinjaman Pendidikan</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 leading-tight">
              SBPP Education Loan Assistance Scheme
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              An official government financing facility provided by the Ministry of Education for Bruneian students pursuing accredited higher education locally or overseas. Designed for students who missed the non-repayable scholarship threshold or who choose independent career paths without civil service bonds.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-lg text-xs text-amber-950">
              <span className="font-semibold block mb-0.5">Citizenship Eligibility:</span>
              <span>Brunei Yellow IC (Priority) & approved Red IC Permanent Residents</span>
            </div>
            <button
              onClick={onBookAlumniForSbpp}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors text-center shadow-2xs"
            >
              Ask an Alumni Who Used SBPP
            </button>
          </div>
        </div>

        {/* 3 Pillar Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>First-Class Honours Incentive</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Graduating with First Class Honours allows you to formally petition the Ministry of Education to <strong className="text-slate-900">convert your loan into a full scholarship</strong>, waiving repayment!
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Civil Service Bond</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Unlike the 5-year government scholarship bond, SBPP gives you complete freedom upon graduation to work in the private sector (BSP, telcos, banks), establish startups, or work abroad.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Local & Overseas Coverage</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Fund UK-partnered degrees at Laksamana College of Business (LCB) in Brunei, fee-paying degrees at UBD/UTB, or accredited overseas universities recognized by MKPK.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Interactive SBPP Loan & Repayment Calculator */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          <Calculator className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive Financing Tool</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          SBPP Loan & Repayment Estimator
        </h3>
        <p className="text-xs text-slate-600 mb-6">
          Calculate your estimated total study loan, living subsidies, and post-graduation monthly installment.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Study Destination & Institution Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SBPP_TIERS.map((tier, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDestinationIndex(idx)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedDestinationIndex === idx
                        ? 'bg-amber-50/80 border-amber-400 text-amber-950 font-semibold shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs">{tier.destination}</div>
                    <div className="text-[11px] text-slate-500 mt-1 font-mono">
                      Min Points: {tier.minPoints} pts
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Course Duration
                </label>
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                  {[3, 4].map(yrs => (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setDurationYears(yrs)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        durationYears === yrs ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                      }`}
                    >
                      {yrs} Years
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Repayment Tenure
                </label>
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
                  {[5, 10, 15].map(yrs => (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setRepaymentTenureYears(yrs)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        repaymentTenureYears === yrs ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600'
                      }`}
                    >
                      {yrs} Yrs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-800">
                <input
                  type="checkbox"
                  checked={includeLivingAllowance}
                  onChange={(e) => setIncludeLivingAllowance(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <span className="font-medium">
                  Include Monthly Living Allowance (approx BND ${currentTier.monthlyAllowanceBnd}/mo)
                </span>
              </label>
              <p className="text-[11px] text-slate-500 pl-6 mt-0.5">
                Students can opt for Tuition-Only loan if they have personal accommodations or family support.
              </p>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl p-6 flex flex-col justify-between border border-slate-800 shadow-md">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                <span>Financing Breakdown</span>
                <span className="font-mono text-amber-400">Zero Interest Rate</span>
              </div>

              <div className="space-y-3 my-5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Annual Tuition Cap:</span>
                  <span className="font-mono font-semibold">BND ${annualTuition.toLocaleString()}</span>
                </div>
                {includeLivingAllowance && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Annual Living Allowance:</span>
                    <span className="font-mono font-semibold">BND ${annualAllowance.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm">
                  <span className="text-slate-300 font-medium">Estimated Total Loan:</span>
                  <span className="font-mono font-bold text-amber-400 text-lg">
                    BND ${totalLoanPrincipal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Monthly Repayment Callout */}
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  Estimated Repayment After Grace Period
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-bold text-2xl text-white">
                    BND ${monthlyRepaymentBnd}
                  </span>
                  <span className="text-xs text-slate-400">/ month over {repaymentTenureYears} years</span>
                </div>
                <div className="text-[10px] text-slate-400 leading-tight pt-1">
                  Repayment begins 6–12 months after graduation or upon gaining employment.
                </div>
              </div>
            </div>

            {/* Conversion highlight */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-amber-300/90 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <span>
                <strong>First Class Incentive:</strong> Achieve First Class Honours to petition for 100% scholarship loan waiver!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Step-by-Step Application Roadmap & Guarantors */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            SBPP Application Stages & Guarantor (Penjamin) Guidelines
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Administered by Jabatan Pengurusan Biasiswa at Lapangan Terbang Lama Berakas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {SBPP_APPLICATION_STEPS.map((st) => (
            <div key={st.step} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="font-mono font-bold text-amber-800 text-sm">
                Step 0{st.step}
              </div>
              <div className="font-bold text-slate-900 leading-snug">
                {st.title}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantors Callout */}
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3 text-xs text-amber-950">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <span className="font-bold block">Important Guarantor (Penjamin) Requirements:</span>
            <span>
              The applicant must be supported by <strong>two (2) gainfully employed Bruneian citizen guarantors</strong> (e.g. permanent government civil servants, BSP staff, or established corporate employees with clean credit records). They must submit verified salary slips and employer validation letters.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: Document Checklist & Official FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Document Checklist */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-800" />
            <h4 className="text-base font-bold text-slate-900">
              Required SBPP Dossier
            </h4>
          </div>
          <div className="space-y-2 text-xs text-slate-700">
            {SBPP_DOCUMENT_CHECKLIST.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900">
              Frequently Asked Questions on SBPP
            </h4>
            <span className="text-xs text-slate-500">Ministry of Education Policies</span>
          </div>

          <div className="space-y-3">
            {SBPP_FAQ.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-900 leading-snug">
                  {faq.q}
                </div>
                <div className="text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Want to see if your target course qualifies for SBPP?</span>
            <button
              onClick={onNavigateToPathways}
              className="text-amber-800 font-semibold hover:underline"
            >
              Explore Degree Pathways →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
