import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Building, 
  Briefcase, 
  DollarSign, 
  GraduationCap, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Share2
} from 'lucide-react';
import { APTITUDE_QUESTIONS, CAREER_PROFILES } from '../data/aptitudeData';
import { AptitudeDomain, AptitudeResult, CareerMatch, StudentProfile } from '../types';

interface AptitudeMatcherProps {
  profile: StudentProfile;
  onExploreCourse: (courseName: string) => void;
  onBookAlumniForCareer: (careerTitle: string) => void;
  onExploreSbpp: () => void;
}

export const AptitudeMatcher: React.FC<AptitudeMatcherProps> = ({
  profile,
  onExploreCourse,
  onBookAlumniForCareer,
  onExploreSbpp
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<AptitudeResult | null>(null);

  const totalQuestions = APTITUDE_QUESTIONS.length;
  const currentQuestion = APTITUDE_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    const scores: Record<AptitudeDomain, number> = {
      engineering: 0,
      computing: 0,
      medical: 0,
      law_policy: 0,
      business_finance: 0,
      environmental_creative: 0
    };

    // Tally weights
    APTITUDE_QUESTIONS.forEach(q => {
      const selectedOptIdx = selectedAnswers[q.id];
      if (selectedOptIdx !== undefined) {
        const opt = q.options[selectedOptIdx];
        Object.entries(opt.domainWeights).forEach(([domain, weight]) => {
          scores[domain as AptitudeDomain] += weight;
        });
      }
    });

    // Sort domains
    const sortedDomains = (Object.keys(scores) as AptitudeDomain[]).sort(
      (a, b) => scores[b] - scores[a]
    );

    const topDomain = sortedDomains[0];
    const secondaryDomain = sortedDomains[1];

    // Filter matching careers
    const matchedCareers = CAREER_PROFILES.filter(
      c => c.primaryDomain === topDomain || c.primaryDomain === secondaryDomain
    );

    const result: AptitudeResult = {
      scores,
      topDomain,
      secondaryDomain,
      matchedCareers: matchedCareers.slice(0, 3),
      completedAt: new Date().toISOString()
    };

    setAssessmentResult(result);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setAssessmentResult(null);
  };

  const domainLabels: Record<AptitudeDomain, { label: string; desc: string }> = {
    engineering: { label: 'Engineering & Industrial Operations', desc: 'Mechanical, Petroleum, Civil, and Energy Systems' },
    computing: { label: 'Computer Science, AI & Cyber', desc: 'Software architecture, algorithms, and national cloud systems' },
    medical: { label: 'Medicine & Health Sciences', desc: 'Clinical diagnosis, public health, and biomedical research' },
    law_policy: { label: 'Law, Shariah & Public Policy', desc: 'Jurisprudence, constitutional governance, and diplomacy' },
    business_finance: { label: 'Finance, Banking & Economics', desc: 'Sovereign wealth, Islamic finance, and commercial strategy' },
    environmental_creative: { label: 'Environmental Science & Architecture', desc: 'Ecology, green transition, and sustainable built design' }
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: Intro Banner */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
              <span>Career & Degree Matcher</span>
              <span aria-hidden="true">·</span>
              <span>Wawasan Brunei 2035 Aligned</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Brunei Career & Degree Aptitude Assessment
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Discover your natural intellectual strengths and match directly with high-demand careers in Brunei Darussalam and corresponding university degree pathways.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 shrink-0">
            <span className="font-semibold block text-slate-900 mb-0.5">8 Quick Scenarios</span>
            <span>Takes ~3 minutes · Instant degree recommendations</span>
          </div>
        </div>

        {/* If assessment not yet completed: Quiz Canvas */}
        {!assessmentResult && (
          <div className="mt-6 space-y-6">
            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span className="font-mono text-amber-900 font-bold">{progressPercent}% Completed</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                <span>{currentQuestion.contextKicker}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.scenario}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-500 text-slate-900 shadow-2xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm font-medium leading-relaxed">
                          {opt.text}
                        </div>
                        {opt.bruneiContextNote && (
                          <div className="text-[11px] text-amber-800 font-medium">
                            Sector focus: {opt.bruneiContextNote}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion.id] === undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? 'View Career & Degree Matches' : 'Next Scenario'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* If assessment completed: Results & Matches Deck */}
        {assessmentResult && (
          <div className="mt-8 space-y-10">
            {/* Top Analysis Breakdown */}
            <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs text-amber-400 uppercase font-semibold tracking-wider mb-1">
                    Your Aptitude Profile Analysis
                  </div>
                  <h3 className="text-2xl font-bold font-display">
                    {domainLabels[assessmentResult.topDomain].label}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {domainLabels[assessmentResult.topDomain].desc}
                  </p>
                </div>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors self-start sm:self-auto shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>

              {/* Domain distribution bars */}
              <div className="space-y-3 pt-2 text-xs">
                <span className="text-slate-400 block font-medium">Domain Breakdown & Alignment:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {Object.entries(assessmentResult.scores)
                    .sort(([, a], [, b]) => b - a)
                    .map(([domain, score]) => {
                      const maxScore = 30;
                      const percentage = Math.min(100, Math.round((score / maxScore) * 100));
                      return (
                        <div key={domain} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-300 font-medium">
                              {domainLabels[domain as AptitudeDomain].label.split('&')[0]}
                            </span>
                            <span className="font-mono text-amber-400">{score} pts</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-400 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Matched Careers in Brunei */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Top Career Matches in Brunei Darussalam
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    High-impact professions supporting Wawasan Brunei 2035 economic clusters.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {assessmentResult.matchedCareers.map((career) => (
                  <div
                    key={career.id}
                    className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-shadow space-y-4"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-semibold text-amber-800 mb-0.5">
                          {career.industryCluster}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">
                          {career.title}
                        </h4>
                        <div className="text-xs text-slate-500 italic">
                          {career.malayTitle}
                        </div>
                      </div>

                      <div className="text-right sm:text-right shrink-0">
                        <div className="text-[11px] text-slate-500">Average Starting Salary</div>
                        <div className="text-xs font-bold font-mono text-slate-900 tabular-nums">
                          {career.averageSalaryBnd}
                        </div>
                      </div>
                    </div>

                    {/* Overview & Day in life */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-900 block">Role & Scope in Brunei:</span>
                        <p className="text-slate-600 leading-relaxed">{career.roleOverview}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-900 block">Typical Day in the Life:</span>
                        <p className="text-slate-600 leading-relaxed">{career.dayInTheLife}</p>
                      </div>
                    </div>

                    {/* Employers & Alignment */}
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-slate-900">Key Brunei Employers:</span>
                        <div className="flex flex-wrap items-center gap-1.5 text-slate-700">
                          {career.keyEmployersInBrunei.map((emp, i) => (
                            <span key={i} className="inline-flex items-center">
                              <strong>{emp}</strong>
                              {i < career.keyEmployersInBrunei.length - 1 && <span className="mx-1 text-slate-300">·</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-slate-500 text-[11px] leading-relaxed">
                        <span className="font-medium text-amber-900">Wawasan 2035 Impact:</span> {career.wawasanAlignment}
                      </div>
                    </div>

                    {/* Matching Degree Programs */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                        Recommended University Degree Pathways:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {career.recommendedDegrees.map((deg, i) => (
                          <div
                            key={i}
                            onClick={() => onExploreCourse(deg.programName)}
                            className="p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="text-[11px] font-semibold text-slate-900 leading-snug line-clamp-2">
                                {deg.programName}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-1">
                                {deg.institution} ({deg.country})
                              </div>
                            </div>
                            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                              <span className="font-mono text-slate-700">{deg.minTariff} pts</span>
                              <span className="text-amber-800 font-semibold flex items-center gap-0.5">
                                View Course →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span>Funding Routes:</span>
                        <div className="flex flex-wrap items-center gap-1 text-[11px]">
                          {career.fundingPathways.map((fp, i) => (
                            <span key={i} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                              {fp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={onExploreSbpp}
                          className="px-3 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-medium"
                        >
                          Check SBPP Loan Details
                        </button>
                        <button
                          onClick={() => onBookAlumniForCareer(career.title)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          Consult Alumni in this Career
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
