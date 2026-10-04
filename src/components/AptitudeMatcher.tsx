import React, { useState, useEffect } from 'react';
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
  Share2,
  Sliders,
  Check,
  Info,
  BookOpen
} from 'lucide-react';
import { 
  RIASEC_DIMENSIONS, 
  RIASEC_QUESTIONS, 
  RIASEC_CAREER_PROFILES, 
  resolveHollandArchetype,
  RiasecQuestionItem
} from '../data/riasecData';
import { RiasecType, CareerMatch, StudentProfile, RiasecArchetype } from '../types';

interface AptitudeMatcherProps {
  profile: StudentProfile;
  onExploreCourse: (courseName: string) => void;
  onExploreSbpp: () => void;
  onNavigateToTab?: (tabId: string) => void;
}

export const AptitudeMatcher: React.FC<AptitudeMatcherProps> = ({
  profile,
  onExploreCourse,
  onExploreSbpp,
  onNavigateToTab
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store selected option index for each question id
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('suluh_riasec_answers');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  // Cached completed result
  const [riasecResult, setRiasecResult] = useState<{
    hollandCode: string;
    scores: Record<RiasecType, number>;
    primaryType: RiasecType;
    secondaryType: RiasecType;
    tertiaryType: RiasecType;
    archetype: RiasecArchetype;
    matchedCareers: CareerMatch[];
  } | null>(() => {
    try {
      const saved = localStorage.getItem('suluh_riasec_result');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [careerFilter, setCareerFilter] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState(false);

  const totalQuestions = RIASEC_QUESTIONS.length;
  const currentQuestion = RIASEC_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    const updated = {
      ...selectedAnswers,
      [currentQuestion.id]: optionIndex
    };
    setSelectedAnswers(updated);
    try {
      localStorage.setItem('suluh_riasec_answers', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Auto-advance if not on the last question after brief visual feedback
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    } else {
      setTimeout(() => {
        calculateRiasecProfile(updated);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateRiasecProfile(selectedAnswers);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateRiasecProfile = (answersToUse: Record<number, number>) => {
    const scores: Record<RiasecType, number> = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0
    };

    RIASEC_QUESTIONS.forEach(q => {
      const optIdx = answersToUse[q.id];
      if (optIdx !== undefined && q.options[optIdx]) {
        const chosen = q.options[optIdx];
        scores[chosen.riasecType] += 1;
      }
    });

    // Rank the 6 types by score
    const rankedTypes = (Object.keys(scores) as RiasecType[]).sort(
      (a, b) => scores[b] - scores[a]
    );

    const primaryType = rankedTypes[0];
    const secondaryType = rankedTypes[1];
    const tertiaryType = rankedTypes[2];
    const hollandCode = `${primaryType}${secondaryType}${tertiaryType}`;

    const archetype = resolveHollandArchetype(hollandCode);

    // Filter matching careers: Careers whose primary or secondary letters match the top 3 Holland letters
    const topThreeSet = new Set([primaryType, secondaryType, tertiaryType]);
    const matchedCareers = RIASEC_CAREER_PROFILES.filter(c => {
      if (!c.hollandCode) return true;
      const codeLetters = c.hollandCode.split('');
      // Matches if at least 2 letters overlap or primary letter matches
      const matchesPrimary = c.hollandCode.includes(primaryType);
      const matchesSecondary = c.hollandCode.includes(secondaryType);
      return matchesPrimary || matchesSecondary;
    }).sort((a, b) => {
      // Prioritize careers where the 1st letter matches primaryType
      const aScore = (a.hollandCode?.[0] === primaryType ? 2 : 0) + (a.hollandCode?.includes(secondaryType) ? 1 : 0);
      const bScore = (b.hollandCode?.[0] === primaryType ? 2 : 0) + (b.hollandCode?.includes(secondaryType) ? 1 : 0);
      return bScore - aScore;
    });

    const result = {
      hollandCode,
      scores,
      primaryType,
      secondaryType,
      tertiaryType,
      archetype,
      matchedCareers
    };

    setRiasecResult(result);
    try {
      localStorage.setItem('suluh_riasec_result', JSON.stringify(result));
    } catch (e) {
      console.error(e);
    }

    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setRiasecResult(null);
    setCurrentQuestionIndex(0);
    try {
      localStorage.removeItem('suluh_riasec_answers');
      localStorage.removeItem('suluh_riasec_result');
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = () => {
    if (!riasecResult) return;
    const textToCopy = `My Holland Career Code is ${riasecResult.hollandCode} (${riasecResult.archetype.title}) on Suluh Brunei!`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  // Filter careers in results view
  const displayedCareers = riasecResult ? riasecResult.matchedCareers.filter(career => {
    if (careerFilter === 'all') return true;
    if (careerFilter === 'primary') return career.hollandCode?.includes(riasecResult.primaryType);
    if (careerFilter === 'energy') return career.industryCluster.toLowerCase().includes('energy') || career.industryCluster.toLowerCase().includes('petrochemical');
    if (careerFilter === 'medical') return career.industryCluster.toLowerCase().includes('health') || career.industryCluster.toLowerCase().includes('medical');
    if (careerFilter === 'tech') return career.industryCluster.toLowerCase().includes('digital') || career.industryCluster.toLowerCase().includes('computing');
    if (careerFilter === 'finance_law') return career.industryCluster.toLowerCase().includes('finance') || career.industryCluster.toLowerCase().includes('law');
    return true;
  }) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION 1: HEADER & RIASEC CONSTITUTION */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Vocational Psychology & Career Profiling</span>
              <span aria-hidden="true">·</span>
              <span>Negara Brunei Darussalam</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 leading-tight">
              RIASEC Holland Career Profiler
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Based on Dr. John Holland’s Theory of Vocational Choice—the gold standard used by universities worldwide. Discover your personalized 3-letter Holland Code, explore your cognitive work archetype, and match with high-impact careers and university degree pathways across Brunei Darussalam and abroad.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
            {riasecResult ? (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleRetake}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Profiler</span>
                </button>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied Code!' : 'Share Holland Code'}</span>
                </button>
              </div>
            ) : (
              <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-950 max-w-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <BrainCircuit className="w-4 h-4 text-amber-700" />
                  <span>8 Thought Scenarios</span>
                </div>
                <span>Takes ~3 minutes. Answer honestly based on what naturally excites you.</span>
              </div>
            )}
          </div>
        </div>

        {/* 6 RIASEC Theme Legend Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 text-xs">
          {(Object.keys(RIASEC_DIMENSIONS) as RiasecType[]).map((type) => {
            const dim = RIASEC_DIMENSIONS[type];
            const isTop = riasecResult?.primaryType === type;
            return (
              <div 
                key={type} 
                className={`p-3 rounded-xl border transition-all ${
                  isTop 
                    ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/20 shadow-xs' 
                    : 'bg-slate-50/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-sm px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-900 shadow-2xs">
                    {dim.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {dim.trait}
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-xs truncate">
                  {dim.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                  {dim.tagline}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: THE INTERACTIVE TEST CANVAS */}
      {!riasecResult ? (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              </span>
              <span className="font-mono font-bold text-slate-600">
                {progressPercent}% Complete
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current Question Canvas */}
          <div className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                {currentQuestion.category}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                {currentQuestion.scenario}
              </h3>
              <p className="text-xs text-slate-500">
                Select the option that best reflects your natural inclinations and working preferences.
              </p>
            </div>

            {/* 6 Choices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === idx;
                const dim = RIASEC_DIMENSIONS[option.riasecType];

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-3 cursor-pointer group ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-500 ring-2 ring-amber-400/30 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-amber-600 text-white shadow-2xs' 
                          : 'bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-900'
                      }`}>
                        {option.riasecType}
                      </div>

                      <div className="space-y-1 flex-1">
                        <p className={`text-xs md:text-sm font-medium leading-relaxed ${
                          isSelected ? 'text-slate-950 font-semibold' : 'text-slate-800'
                        }`}>
                          {option.text}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                      <span className="text-slate-500 italic">
                        {option.contextHint}
                      </span>
                      <span className="font-semibold text-slate-600">
                        {dim.name} ({dim.trait})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                currentQuestionIndex === 0
                  ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer'
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg transition-all ${
                selectedAnswers[currentQuestion.id] === undefined
                  ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                  : 'text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-sm cursor-pointer'
              }`}
            >
              <span>{currentQuestionIndex === totalQuestions - 1 ? 'Generate Holland Profile' : 'Next Scenario'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      ) : (
        /* SECTION 3: RICH RIASEC PROFILE & HOLLAND CODE RESULTS */
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Main Holland Code Hero Card */}
          <section className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your Holland Occupational Code</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="font-mono text-4xl sm:text-5xl font-black tracking-wider text-white">
                      {riasecResult.hollandCode}
                    </span>
                    <div className="h-10 w-px bg-slate-700 mx-1 hidden sm:block" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-architectural text-amber-200">
                        {riasecResult.archetype.title}
                      </h3>
                      <p className="text-xs text-slate-300">
                        Primary: <strong>{RIASEC_DIMENSIONS[riasecResult.primaryType].name}</strong> · Secondary: <strong>{RIASEC_DIMENSIONS[riasecResult.secondaryType].name}</strong> · Tertiary: <strong>{RIASEC_DIMENSIONS[riasecResult.tertiaryType].name}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRetake}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Retake Test
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-950" />
                    <span>{copiedCode ? 'Copied!' : 'Share Profile'}</span>
                  </button>
                </div>
              </div>

              {/* Archetype Summary & Key Attributes */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                <div className="md:col-span-7 space-y-3">
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    Archetype Overview & Cognitive Pattern
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {riasecResult.archetype.summary}
                  </p>

                  <div className="pt-2">
                    <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-2">
                      Ideal Work Environment in Brunei Darussalam
                    </div>
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 text-slate-200 leading-relaxed">
                      {riasecResult.archetype.idealWorkEnvironment}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-4">
                  <div>
                    <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-2">
                      Key Holland Strengths
                    </div>
                    <div className="space-y-1.5">
                      {riasecResult.archetype.topStrengths.map((str, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-slate-200">{str}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1.5">
                      Growth Focus
                    </div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      {riasecResult.archetype.growthAreas[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6-Dimension Score Breakdown */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Your Complete RIASEC Profile Spectrum
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparative balance across all six Holland vocational dimensions
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Scores range from 0 to {totalQuestions} based on chosen instincts</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {(Object.keys(RIASEC_DIMENSIONS) as RiasecType[]).map((type) => {
                const dim = RIASEC_DIMENSIONS[type];
                const score = riasecResult.scores[type];
                const maxPossible = totalQuestions;
                const percentage = Math.round((score / maxPossible) * 100);
                const isPrimary = riasecResult.primaryType === type;
                const isSecondary = riasecResult.secondaryType === type;
                const isTertiary = riasecResult.tertiaryType === type;

                return (
                  <div 
                    key={type} 
                    className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
                      isPrimary 
                        ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20' 
                        : isSecondary
                        ? 'bg-slate-50/90 border-slate-300'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-sm px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                          {type}
                        </span>
                        {isPrimary && (
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                        {isSecondary && (
                          <span className="text-[10px] font-semibold text-slate-700 bg-slate-200 px-1.5 py-0.5 rounded">
                            Secondary
                          </span>
                        )}
                        {isTertiary && (
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            Tertiary
                          </span>
                        )}
                      </div>

                      <div className="font-bold text-slate-900 text-xs mt-1">
                        {dim.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {dim.trait}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-slate-800">{score} pts</span>
                        <span className="text-[11px] text-slate-500">{percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            isPrimary ? 'bg-amber-500' : isSecondary ? 'bg-slate-700' : 'bg-slate-400'
                          }`}
                          style={{ width: `${Math.max(8, percentage)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 4: MATCHED BRUNEIAN CAREER PATHWAYS & DEGREE REQUIREMENTS */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-architectural text-slate-900">
                  Recommended Career Pathways for {riasecResult.hollandCode}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Cross-matched with Brunei Wawasan 2035 key economic sectors, salary benchmarks, and degree prerequisites.
                </p>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 text-xs shadow-2xs">
                <button
                  onClick={() => setCareerFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    careerFilter === 'all' ? 'bg-amber-100 font-bold text-amber-950' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({displayedCareers.length})
                </button>
                <button
                  onClick={() => setCareerFilter('primary')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    careerFilter === 'primary' ? 'bg-amber-100 font-bold text-amber-950' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Top {riasecResult.primaryType} Match
                </button>
                <button
                  onClick={() => setCareerFilter('energy')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    careerFilter === 'energy' ? 'bg-amber-100 font-bold text-amber-950' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Energy & Engineering
                </button>
                <button
                  onClick={() => setCareerFilter('medical')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    careerFilter === 'medical' ? 'bg-amber-100 font-bold text-amber-950' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Healthcare
                </button>
                <button
                  onClick={() => setCareerFilter('tech')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    careerFilter === 'tech' ? 'bg-amber-100 font-bold text-amber-950' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tech & Digital
                </button>
                <button
                  onClick={() => setCareerFilter('finance_law')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    careerFilter === 'finance_law' ? 'bg-amber-100 font-bold text-amber-950' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Finance & Law
                </button>
              </div>
            </div>

            {/* Career Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayedCareers.map((career) => (
                <div 
                  key={career.id} 
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    {/* Header: Title, Malay Title & Cluster */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300/80">
                            Holland: {career.hollandCode}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {career.industryCluster}
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                          {career.title}
                        </h4>
                        <div className="text-xs text-slate-500 font-serif italic mt-0.5">
                          {career.malayTitle}
                        </div>
                      </div>

                      <div className="shrink-0 p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <Briefcase className="w-5 h-5 text-slate-700" />
                      </div>
                    </div>

                    {/* Role Overview */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {career.roleOverview}
                    </p>

                    {/* Salary & Employers in Brunei */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Estimated Entry Salary</span>
                        </div>
                        <div className="font-mono font-bold text-slate-900 text-xs">
                          {career.averageSalaryBnd}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-blue-600" />
                          <span>Key Brunei Employers</span>
                        </div>
                        <div className="text-slate-600 truncate text-[11px]">
                          {career.keyEmployersInBrunei.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Recommended Degree Pathways */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        <span>Recommended Higher Education Qualifications:</span>
                      </div>
                      <div className="space-y-1.5">
                        {career.recommendedDegrees.map((deg, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between text-xs p-2 bg-slate-50/80 rounded-lg border border-slate-200/60"
                          >
                            <div className="space-y-0.5">
                              <span className="font-medium text-slate-900 block">{deg.programName}</span>
                              <span className="text-[11px] text-slate-500">{deg.institution} ({deg.country})</span>
                            </div>
                            <span className="font-mono font-bold text-[11px] text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200 shrink-0 ml-2">
                              {deg.minTariff} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={onExploreSbpp}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                    >
                      Check SBPP Loan Details →
                    </button>

                    <button
                      onClick={() => onExploreCourse(career.recommendedDegrees[0]?.programName || career.title)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      <span>Explore Degree Pathways</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
