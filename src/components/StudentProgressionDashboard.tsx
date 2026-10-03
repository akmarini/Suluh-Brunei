import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  Users, 
  Award, 
  Compass, 
  AlertCircle, 
  Plus, 
  ExternalLink, 
  Video, 
  Sparkles, 
  CheckSquare, 
  Square,
  ArrowRight,
  TrendingUp,
  Download,
  Building,
  Target
} from 'lucide-react';
import { 
  DEFAULT_TRACKED_APPLICATIONS, 
  DEFAULT_TRACKED_ESSAYS, 
  DEFAULT_SCHEDULED_CALLS, 
  DEFAULT_JOURNEY_MILESTONES 
} from '../data/progressionDefaults';
import { 
  TrackedApplication, 
  TrackedEssay, 
  MentorshipBooking, 
  JourneyMilestone, 
  StudentProfile 
} from '../types';
import { hasOLevelMalayCredit } from '../utils/tariffCalculator';

interface StudentProgressionDashboardProps {
  profile: StudentProfile;
  tariffPoints: number;
  onNavigateToTab: (tabId: string) => void;
}

export const StudentProgressionDashboard: React.FC<StudentProgressionDashboardProps> = ({
  profile,
  tariffPoints,
  onNavigateToTab
}) => {
  const [applications, setApplications] = useState<TrackedApplication[]>(DEFAULT_TRACKED_APPLICATIONS);
  const [essays, setEssays] = useState<TrackedEssay[]>(DEFAULT_TRACKED_ESSAYS);
  const [scheduledCalls, setScheduledCalls] = useState<MentorshipBooking[]>(DEFAULT_SCHEDULED_CALLS);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(DEFAULT_JOURNEY_MILESTONES);
  
  // Active call modal
  const [activeCallModal, setActiveCallModal] = useState<MentorshipBooking | null>(null);

  // Toggle application task checkbox
  const handleToggleTask = (appId: string, taskId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedTasks = app.tasks.map(t => t.id === taskId ? { ...t, isDone: !t.isDone } : t);
        // Calculate new stage based on completed tasks percentage
        const doneCount = updatedTasks.filter(t => t.isDone).length;
        const total = updatedTasks.length;
        const ratio = doneCount / total;
        let newStage = app.currentStage;
        if (ratio >= 0.8) newStage = 4;
        else if (ratio >= 0.5) newStage = 3;
        else if (ratio >= 0.2) newStage = 2;
        else newStage = 1;

        return {
          ...app,
          tasks: updatedTasks,
          currentStage: newStage
        };
      }
      return app;
    }));
  };

  // Toggle milestone completion
  const handleToggleMilestone = (mId: string) => {
    setMilestones(prev => prev.map(m => m.id === mId ? { ...m, isCompleted: !m.isCompleted } : m));
  };

  // Overall readiness calculation
  const completedMilestones = milestones.filter(m => m.isCompleted).length;
  const overallReadinessPercent = Math.round((completedMilestones / milestones.length) * 100);
  const hasMalayCredit = hasOLevelMalayCredit(profile.oLevelMalayGrade || 'B3');

  const stageLabels = [
    'Stage 1: Prep & Requirements',
    'Stage 2: Online Submission',
    'Stage 3: Screening & Aptitude',
    'Stage 4: Panel Interview / MMI',
    'Stage 5: Award & Bond'
  ];

  return (
    <div className="space-y-10">
      {/* SECTION 1: High-Level Progression Overview */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <Target className="w-3.5 h-3.5 text-amber-700" />
              <span>Student Progression Hub</span>
              <span aria-hidden="true">·</span>
              <span className="font-architectural text-amber-900 font-bold tracking-wider">Suluh Brunei</span>
            </div>
            <h2 className="text-xl md:text-3xl font-bold font-display text-slate-900 leading-tight">
              Application Journey & Readiness Dashboard
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 mt-1">
              <span>Visualizing progress for <strong className="text-slate-900">{profile.name}</strong> ({profile.school})</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-semibold">{profile.icStatus}</span>
              <span aria-hidden="true">·</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                hasMalayCredit 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-800 border border-rose-300'
              }`}>
                {hasMalayCredit ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>BM Credit Verified ({profile.oLevelMalayGrade || 'B3'}) · Scholarship Eligible</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-rose-600" />
                    <span>No BM Credit ({profile.oLevelMalayGrade}) · Fee-Paying Status</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Overall Readiness Scorecard */}
          <div className="flex items-center gap-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 sm:p-5 rounded-xl border border-slate-800 shrink-0">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-mono font-bold text-amber-400 tabular-nums">
                {overallReadinessPercent}%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mt-0.5">
                Journey Complete
              </div>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{completedMilestones} of {milestones.length} Milestones</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>HECAS Deadline: March 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Quick Metric Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block mb-0.5">Active Applications</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {applications.length}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">MOE, HECAS, BSP & SBPP</span>
            </div>
            <Award className="w-8 h-8 text-amber-600/30" />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block mb-0.5">Essay Drafts in Progress</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {essays.length}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">UCAS & MOE Intent</span>
            </div>
            <FileText className="w-8 h-8 text-emerald-600/30" />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block mb-0.5">Scheduled Alumni Sessions</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {scheduledCalls.length}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Verified Scholars</span>
            </div>
            <Video className="w-8 h-8 text-blue-600/30" />
          </div>
        </div>
      </section>

      {/* SECTION 2: Scholarship & University Applications Progression */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Scholarship & Admission Applications Progression
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Multi-stage progression tracking from dossier assembly to panel interview and award.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('scholarships')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
          >
            <span>Explore More Scholarships</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {applications.map((app) => {
            const completedCount = app.tasks.filter(t => t.isDone).length;
            const progress = Math.round((completedCount / app.tasks.length) * 100);

            return (
              <div
                key={app.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition-shadow space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-amber-800">{app.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{app.provider}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-600">Deadline: {app.deadlineDate}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {app.title}
                    </h4>

                    <div className="text-xs text-slate-600">
                      Target: <strong className="text-slate-800">{app.targetInstitution}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                      {app.stageName}
                    </span>
                  </div>
                </div>

                {/* 5-Stage Visual Stepper */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                    <span>Application Pipeline</span>
                    <span className="font-mono font-bold text-slate-800">{progress}% Tasks Completed</span>
                  </div>

                  {/* Step indicators */}
                  <div className="grid grid-cols-5 gap-1.5 text-center">
                    {stageLabels.map((stLabel, idx) => {
                      const stepNum = idx + 1;
                      const isPast = stepNum < app.currentStage;
                      const isCurrent = stepNum === app.currentStage;

                      return (
                        <div key={idx} className="space-y-1">
                          <div className={`h-2 rounded-full transition-all ${
                            isPast 
                              ? 'bg-emerald-500' 
                              : isCurrent 
                              ? 'bg-amber-500' 
                              : 'bg-slate-200'
                          }`} />
                          <div className="text-[10px] text-slate-500 truncate hidden sm:block">
                            Step 0{stepNum}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Task Checklist */}
                <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-100 space-y-2">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Action Checklist & Document Dossier:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {app.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(app.id, task.id)}
                        className={`flex items-start gap-2.5 p-2 rounded cursor-pointer transition-colors ${
                          task.isDone
                            ? 'bg-emerald-50/80 text-slate-800 border border-emerald-200/60'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {task.isDone ? (
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-[11px] leading-relaxed ${task.isDone ? 'line-through text-slate-500' : ''}`}>
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Two-Column Hub: Essay Drafts & Mentorship Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Column 1: Essay Drafts Status */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Personal Statement & Essay Drafts
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Draft metrics and alumni review statuses
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('studio')}
              className="text-xs font-semibold text-amber-800 hover:underline"
            >
              Open Studio →
            </button>
          </div>

          <div className="space-y-4">
            {essays.map((essay) => (
              <div
                key={essay.id}
                className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-800 block">
                      {essay.targetScheme}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {essay.title}
                    </h5>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    essay.status === 'Alumni Review Requested'
                      ? 'bg-amber-100 text-amber-900'
                      : essay.status === 'Finalized'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    {essay.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Characters</span>
                    <span className="font-mono font-bold text-slate-800 tabular-nums">
                      {essay.charCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Words</span>
                    <span className="font-mono font-bold text-slate-800 tabular-nums">
                      {essay.wordCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rubric Score</span>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums">
                      {essay.rubricScore}%
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed italic">
                  "{essay.notes}"
                </p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">Edited: {essay.lastEdited}</span>
                  <button
                    onClick={() => onNavigateToTab('studio')}
                    className="text-xs font-semibold text-slate-900 hover:text-amber-800"
                  >
                    Edit Draft in Studio →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Scheduled Alumni Mentorship Sessions */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Scheduled 1-on-1 Alumni Mentorship Calls
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Upcoming consultations with verified scholars
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('mentorship')}
              className="text-xs font-semibold text-amber-800 hover:underline"
            >
              Book Another →
            </button>
          </div>

          <div className="space-y-4">
            {scheduledCalls.map((call) => (
              <div
                key={call.id}
                className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{call.status} Appointment</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                      Session with {call.mentorName}
                    </h5>
                    <div className="text-xs text-slate-500">
                      Type: <strong className="text-slate-700">{call.sessionType}</strong>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                    {call.selectedSlot}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-semibold text-slate-900 block">Agenda & Topics:</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{call.topicsToCover}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    {call.notes.split(':')[1] || 'Room Ready'}
                  </span>

                  <button
                    onClick={() => setActiveCallModal(call)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
                  >
                    <Video className="w-3.5 h-3.5 text-amber-400" />
                    <span>Launch Meet Room</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: Comprehensive 7-Phase Journey Roadmap */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Brunei Student to University Journey Roadmap
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Step-by-step master timeline from tariff qualification to overseas/local university departure.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Click milestones to mark progress
          </div>
        </div>

        <div className="space-y-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                m.isCompleted
                  ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleMilestone(m.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-600"
                >
                  {m.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300" />
                  )}
                </button>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800">
                      Phase 0{m.phase}
                    </span>
                    <h5 className={`text-xs sm:text-sm font-bold ${m.isCompleted ? 'text-slate-900' : 'text-slate-700'}`}>
                      {m.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {m.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTab(m.actionTab)}
                className="self-end sm:self-center px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
              >
                Go to Tool →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Simulated Google Meet Room Modal */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-600" />
                <h4 className="text-base font-bold text-slate-900">Virtual Mentorship Room</h4>
              </div>
              <button
                onClick={() => setActiveCallModal(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-lg space-y-2 border border-slate-200">
                <div className="font-semibold text-slate-900 text-sm">
                  Meeting with {activeCallModal.mentorName}
                </div>
                <div className="text-slate-600">
                  Scheduled Time: <strong className="text-slate-900">{activeCallModal.selectedSlot}</strong>
                </div>
                <div className="text-slate-600">
                  Student: <strong className="text-slate-900">{activeCallModal.studentName}</strong> ({activeCallModal.studentSchool})
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg text-amber-950 text-[11px] leading-relaxed border border-amber-200">
                <strong>Simulated Session:</strong> In production, this launches directly into Google Meet using your student BruHealth/Siswa email. Be punctual and prepare your question notes in advance!
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveCallModal(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Connecting to Google Meet room for session with ${activeCallModal.mentorName}...`);
                  setActiveCallModal(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
              >
                Enter Video Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
