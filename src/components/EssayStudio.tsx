import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, Send, Sparkles, Copy, Check, RotateCcw, BookOpen } from 'lucide-react';
import { StudentProfile } from '../types';

interface EssayStudioProps {
  profile: StudentProfile;
  onRequestAlumniReview: (essayText: string, essayMode: string) => void;
}

export const EssayStudio: React.FC<EssayStudioProps> = ({ profile, onRequestAlumniReview }) => {
  const [essayMode, setEssayMode] = useState<'ucas' | 'moe' | 'bsp'>('ucas');
  const [essayText, setEssayText] = useState<string>(() => {
    return localStorage.getItem('suluh_draft_essay') || '';
  });
  const [copied, setCopied] = useState(false);

  const handleTextChange = (val: string) => {
    setEssayText(val);
    localStorage.setItem('suluh_draft_essay', val);
  };

  // Metrics
  const charCount = essayText.length;
  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const lineCount = essayText ? essayText.split('\n').length : 0;

  // Limits based on mode
  const maxChars = essayMode === 'ucas' ? 4000 : (essayMode === 'moe' ? 3500 : 3000);
  const maxLines = essayMode === 'ucas' ? 47 : 50;
  const targetWords = essayMode === 'moe' ? 500 : (essayMode === 'ucas' ? 650 : 500);

  // Rubric checks
  const hasBruneiKeyword = /(brunei|wawasan|vision 2035|mpec|national development|diversification|ripas|bsp|pantai jerudong)/i.test(essayText);
  const hasSupercurricular = /(read|book|journal|podcast|research|paper|project|experiment|coursera|extended project|olympiad)/i.test(essayText);
  const hasCliches = /(since I was young|since childhood|from a young age|always had a passion|in conclusion)/i.test(essayText);
  const hasLeadership = /(leader|team|council|prefect|cca|captain|volunteer|organis|community)/i.test(essayText);

  const handleCopy = () => {
    navigator.clipboard.writeText(essayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => {
    const sample = `My fascination with distributed software systems deepened when investigating how national data infrastructure can bridge healthcare services across Brunei's four districts. Reading Martin Kleppmann's 'Designing Data-Intensive Applications', I was intrigued by replication algorithms and consistency models under network partitions. 

To explore this practically, I developed a lightweight prototype in Python that simulated clinical triage queuing, testing FIFO versus priority-based scheduling under burst loads. This raised challenging questions regarding database latency, which motivated me to study multithreading in C beyond the A-Level Computer Science curriculum.

In Mathematics, solving differential equations taught me the elegance of modeling dynamic rates of change, a principle I recognized when studying packet throughput in computer networks. During my tenure as IT coordinator on the Sixth Form Student Council, I managed our school's first digital event ticketing portal, balancing stringent deadlines with academic rigor. 

Studying Computer Science at a world-class level will equip me with the technical rigor to contribute directly to Brunei Darussalam's Digital Economy Masterplan and the realization of Wawasan Brunei 2035.`;

    handleTextChange(sample);
  };

  return (
    <div className="space-y-10">
      {/* SECTION 1: Workspace Header */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Essay Studio & Rubric Inspector</span>
              <span aria-hidden="true">·</span>
              <span>Personal Statement Drafting</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Personal Statement & Scholarship Essay Studio
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Draft your statement with live character limit tracking and rubrics vetted by Bruneian alumni mentors.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs self-start sm:self-auto">
            <button
              onClick={() => setEssayMode('ucas')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                essayMode === 'ucas' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              UCAS UK (4,000 Chars)
            </button>
            <button
              onClick={() => setEssayMode('moe')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                essayMode === 'moe' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              MOE Overseas (500 Words)
            </button>
            <button
              onClick={() => setEssayMode('bsp')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                essayMode === 'bsp' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              BSP Motivation Letter
            </button>
          </div>
        </div>

        {/* Live Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5">Characters (UCAS Limit)</span>
            <div className="font-mono font-bold text-slate-900 text-lg tabular-nums">
              {charCount} / <span className="text-slate-400 text-sm">{maxChars}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {maxChars - charCount >= 0 ? `${maxChars - charCount} left` : `${Math.abs(maxChars - charCount)} over limit!`}
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5">Word Count</span>
            <div className="font-mono font-bold text-slate-900 text-lg tabular-nums">
              {wordCount} <span className="text-slate-400 text-sm font-normal">/ ~{targetWords} target</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Optimal reading rhythm
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5">Line Count</span>
            <div className="font-mono font-bold text-slate-900 text-lg tabular-nums">
              {lineCount} / <span className="text-slate-400 text-sm">{maxLines}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              UCAS strictly caps at 47 lines
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5">Alumni Rubric Score</span>
            <div className="font-mono font-bold text-amber-900 text-lg tabular-nums">
              {[hasSupercurricular, hasBruneiKeyword, !hasCliches, hasLeadership].filter(Boolean).length * 25}%
            </div>
            <div className="text-[11px] text-slate-500">
              Based on Brunei criteria
            </div>
          </div>
        </div>

        {/* Editor Main Canvas & Rubric Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Main Drafting Box */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Statement Draft Editor
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadSample}
                  className="text-xs text-amber-800 hover:text-amber-900 flex items-center gap-1 font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Load High-Scoring Sample
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium ml-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              </div>
            </div>

            <textarea
              rows={16}
              value={essayText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Start drafting your personal statement here... Focus on what inspired your academic passion, books/research explored outside class, and how this degree contributes back to Brunei Darussalam..."
              className="w-full text-sm font-sans p-4 bg-slate-50/60 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed text-slate-900"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400">
                Draft auto-saved to your browser.
              </span>

              <button
                onClick={() => onRequestAlumniReview(essayText, essayMode)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span>Submit to Alumni Mentor for Detailed Review</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bruneian Rubric Diagnostics */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Alumni Rubric Diagnostics
              </h4>

              {/* Check 1: Supercurriculars */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">1. Supercurricular Engagement</span>
                  {hasSupercurricular ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Mention specific books, academic research papers, or hands-on projects you investigated beyond the A-Level syllabus.
                </p>
              </div>

              {/* Check 2: Brunei Vision & Impact */}
              <div className="space-y-1 text-xs pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">2. Brunei Context & Vision 2035</span>
                  {hasBruneiKeyword ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Essential for MOE Overseas & Sultan's Scholar: articulate how this qualification serves Brunei Darussalam's future.
                </p>
              </div>

              {/* Check 3: Clichés */}
              <div className="space-y-1 text-xs pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">3. Anti-Cliché Discipline</span>
                  {!hasCliches ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {hasCliches 
                    ? "Warning: Avoid openings like 'Since I was young' or generic phrases like 'passion'." 
                    : "No common cliché traps detected. Well done."}
                </p>
              </div>

              {/* Check 4: Leadership & CCAs */}
              <div className="space-y-1 text-xs pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">4. Sixth Form Co-Curriculars</span>
                  {hasLeadership ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="text-[11px] text-slate-400">Optional</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Reserve the final 15-20% for student council, sports, or volunteer work to prove resilience.
                </p>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-2">
              <span className="font-bold text-amber-950 block">Alumni Mentor Advice:</span>
              <p className="text-amber-900 leading-relaxed">
                "UK admissions tutors want to see curiosity, not just enthusiasm. If you read a book or completed an online lecture, explain how it changed your perspective, and what you did next as a result."
              </p>
              <div className="text-[11px] text-amber-800 font-medium text-right">
                — Amirul Syafiq (Imperial / BSP Alum)
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
