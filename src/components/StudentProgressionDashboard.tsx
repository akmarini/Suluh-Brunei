import React, { useState, useEffect } from 'react';
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
  Upload,
  RotateCcw,
  Save,
  Trash2,
  Edit2,
  Check,
  X,
  Building,
  Target
} from 'lucide-react';
import { 
  DEFAULT_TRACKED_APPLICATIONS, 
  DEFAULT_TRACKED_ESSAYS, 
  DEFAULT_SCHEDULED_CALLS, 
  DEFAULT_JOURNEY_MILESTONES,
  PRESET_APPLICATION_TEMPLATES
} from '../data/progressionDefaults';
import { 
  TrackedApplication, 
  TrackedEssay, 
  MentorshipBooking, 
  JourneyMilestone, 
  StudentProfile,
  ApplicationStage
} from '../types';
import { hasOLevelMalayCredit } from '../utils/tariffCalculator';

interface StudentProgressionDashboardProps {
  profile: StudentProfile;
  setProfile?: React.Dispatch<React.SetStateAction<StudentProfile>>;
  tariffPoints: number;
  onNavigateToTab: (tabId: string) => void;
}

export const StudentProgressionDashboard: React.FC<StudentProgressionDashboardProps> = ({
  profile,
  setProfile,
  tariffPoints,
  onNavigateToTab
}) => {
  // Load applications from localStorage or start empty
  const [applications, setApplications] = useState<TrackedApplication[]>(() => {
    try {
      const saved = localStorage.getItem('suluh_progression_applications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TRACKED_APPLICATIONS; // empty array
  });

  // Load essays from localStorage or dynamic draft
  const [essays, setEssays] = useState<TrackedEssay[]>(() => {
    try {
      const saved = localStorage.getItem('suluh_progression_essays');
      if (saved) return JSON.parse(saved);
      const draft = localStorage.getItem('suluh_draft_essay');
      if (draft && draft.trim()) {
        const words = draft.trim().split(/\s+/).length;
        return [{
          id: 'essay-active-draft',
          title: 'Undergraduate Statement Draft (Essay Studio)',
          targetScheme: 'UCAS Personal Statement',
          charCount: draft.length,
          wordCount: words,
          rubricScore: Math.min(95, Math.round((draft.length / 3000) * 80)),
          status: 'Drafting',
          lastEdited: 'In Local Storage',
          notes: 'Active draft from your Essay Studio workspace.'
        }];
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TRACKED_ESSAYS; // empty array
  });

  // Load scheduled calls from localStorage or start empty
  const [scheduledCalls, setScheduledCalls] = useState<MentorshipBooking[]>(() => {
    try {
      const saved = localStorage.getItem('suluh_progression_calls');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SCHEDULED_CALLS; // empty array
  });

  // Load milestones from localStorage or default (all unchecked)
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(() => {
    try {
      const saved = localStorage.getItem('suluh_progression_milestones');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_JOURNEY_MILESTONES;
  });

  // Modal and state controls
  const [activeCallModal, setActiveCallModal] = useState<MentorshipBooking | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name || 'Brunei Student');

  // New application custom form state
  const [customForm, setCustomForm] = useState<{
    title: string;
    type: TrackedApplication['type'];
    provider: string;
    targetInstitution: string;
    deadlineDate: string;
    notes: string;
    initialTask: string;
  }>({
    title: '',
    type: 'Government Scholarship',
    provider: '',
    targetInstitution: '',
    deadlineDate: '2027-03-31',
    notes: '',
    initialTask: 'Submit initial application'
  });

  // New task input state keyed by appId
  const [newTaskInput, setNewTaskInput] = useState<{ [appId: string]: string }>({});

  // Sync state to localStorage automatically on any change
  useEffect(() => {
    try {
      localStorage.setItem('suluh_progression_applications', JSON.stringify(applications));
      localStorage.setItem('suluh_progression_milestones', JSON.stringify(milestones));
      localStorage.setItem('suluh_progression_calls', JSON.stringify(scheduledCalls));
      localStorage.setItem('suluh_progression_essays', JSON.stringify(essays));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('Failed to auto-save progression data', err);
    }
  }, [applications, milestones, scheduledCalls, essays]);

  // Listen to cross-component storage updates (e.g. from Essay Studio or Mentorship booking)
  useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const savedCalls = localStorage.getItem('suluh_progression_calls');
        if (savedCalls) setScheduledCalls(JSON.parse(savedCalls));

        const draft = localStorage.getItem('suluh_draft_essay');
        if (draft && draft.trim()) {
          const words = draft.trim().split(/\s+/).length;
          setEssays([{
            id: 'essay-active-draft',
            title: 'Undergraduate Statement Draft (Essay Studio)',
            targetScheme: 'UCAS Personal Statement',
            charCount: draft.length,
            wordCount: words,
            rubricScore: Math.min(95, Math.round((draft.length / 3000) * 80)),
            status: 'Drafting',
            lastEdited: 'Just now',
            notes: 'Active draft synchronized from your Essay Studio workspace.'
          }]);
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('suluh_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('suluh_storage_update', handleStorageUpdate);
  }, []);

  // Manual save trigger with toast
  const triggerManualSave = () => {
    try {
      localStorage.setItem('suluh_progression_applications', JSON.stringify(applications));
      localStorage.setItem('suluh_progression_milestones', JSON.stringify(milestones));
      localStorage.setItem('suluh_progression_calls', JSON.stringify(scheduledCalls));
      localStorage.setItem('suluh_progression_essays', JSON.stringify(essays));
      if (setProfile) {
        localStorage.setItem('suluh_student_profile', JSON.stringify(profile));
      }
      setSaveToast('Progress saved successfully to your device!');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setTimeout(() => setSaveToast(null), 3000);
    } catch (err) {
      setSaveToast('Error saving data. Please check browser storage settings.');
      setTimeout(() => setSaveToast(null), 3500);
    }
  };

  // Clear / Reset progression tracker
  const handleResetHub = () => {
    setApplications([]);
    setEssays([]);
    setScheduledCalls([]);
    setMilestones(DEFAULT_JOURNEY_MILESTONES.map(m => ({ ...m, isCompleted: false })));
    localStorage.removeItem('suluh_progression_applications');
    localStorage.removeItem('suluh_progression_essays');
    localStorage.removeItem('suluh_progression_calls');
    localStorage.removeItem('suluh_progression_milestones');
    setIsResetConfirmOpen(false);
    setSaveToast('Progression hub cleared and reset to fresh state.');
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Add application from Brunei presets
  const handleAddPreset = (preset: TrackedApplication) => {
    // Generate new unique id
    const newApp: TrackedApplication = {
      ...preset,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      tasks: preset.tasks.map((t, idx) => ({ ...t, id: `t-${Date.now()}-${idx}` }))
    };
    setApplications(prev => [newApp, ...prev]);
    setIsAddModalOpen(false);
    setSaveToast(`Added "${preset.title}" to your application pipeline!`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Add custom application
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.title.trim()) return;

    const newApp: TrackedApplication = {
      id: `custom-app-${Date.now()}`,
      title: customForm.title.trim(),
      type: customForm.type,
      provider: customForm.provider.trim() || 'Higher Education Provider',
      targetInstitution: customForm.targetInstitution.trim() || 'Selected University / College',
      currentStage: 1,
      stageName: 'Stage 1: Preparation & Requirement Verification',
      deadlineDate: customForm.deadlineDate,
      status: 'In Progress',
      notes: customForm.notes.trim() || 'Self-tracked application.',
      tasks: [
        {
          id: `task-${Date.now()}-0`,
          label: customForm.initialTask.trim() || 'Verify entry requirements and prepare application dossier',
          isDone: false
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    setIsAddModalOpen(false);
    setCustomForm({
      title: '',
      type: 'Government Scholarship',
      provider: '',
      targetInstitution: '',
      deadlineDate: '2027-03-31',
      notes: '',
      initialTask: 'Submit initial application'
    });
    setSaveToast(`Added "${newApp.title}" to tracker!`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Delete an application
  const handleDeleteApplication = (appId: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from your tracker?`)) {
      setApplications(prev => prev.filter(a => a.id !== appId));
    }
  };

  // Toggle task checkbox
  const handleToggleTask = (appId: string, taskId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedTasks = app.tasks.map(t => t.id === taskId ? { ...t, isDone: !t.isDone } : t);
        const doneCount = updatedTasks.filter(t => t.isDone).length;
        const total = updatedTasks.length;
        const ratio = total > 0 ? doneCount / total : 0;
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

  // Add custom task to an application
  const handleAddNewTask = (appId: string) => {
    const text = newTaskInput[appId]?.trim();
    if (!text) return;

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          tasks: [
            ...app.tasks,
            { id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`, label: text, isDone: false }
          ]
        };
      }
      return app;
    }));

    setNewTaskInput(prev => ({ ...prev, [appId]: '' }));
  };

  // Delete task from application
  const handleDeleteTask = (appId: string, taskId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          tasks: app.tasks.filter(t => t.id !== taskId)
        };
      }
      return app;
    }));
  };

  // Update application stage
  const handleChangeStage = (appId: string, stageNumber: number) => {
    const stageNames = [
      'Stage 1: Prep & Requirements',
      'Stage 2: Online Submission',
      'Stage 3: Screening & Aptitude',
      'Stage 4: Panel Interview / MMI',
      'Stage 5: Award & Bond'
    ];
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          currentStage: stageNumber as ApplicationStage,
          stageName: stageNames[stageNumber - 1] || `Stage ${stageNumber}`
        };
      }
      return app;
    }));
  };

  // Toggle milestone completion
  const handleToggleMilestone = (mId: string) => {
    setMilestones(prev => prev.map(m => m.id === mId ? { ...m, isCompleted: !m.isCompleted } : m));
  };

  // Save student name
  const handleSaveStudentName = () => {
    if (setProfile && nameInput.trim()) {
      setProfile(prev => ({ ...prev, name: nameInput.trim() }));
    }
    setIsEditingName(false);
  };

  // Export progress as JSON file
  const handleExportData = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      studentProfile: profile,
      applications,
      milestones,
      scheduledCalls,
      essays
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suluh-brunei-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSaveToast('Progress backup downloaded as JSON!');
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Import progress from JSON file
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.milestones) setMilestones(parsed.milestones);
        if (parsed.scheduledCalls) setScheduledCalls(parsed.scheduledCalls);
        if (parsed.essays) setEssays(parsed.essays);
        if (parsed.studentProfile && setProfile) setProfile(parsed.studentProfile);
        setSaveToast('Progress restored successfully from file!');
        setTimeout(() => setSaveToast(null), 3000);
      } catch (err) {
        alert('Invalid JSON file format. Please upload a valid SuluhBrunei backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Delete booked call
  const handleDeleteCall = (callId: string) => {
    if (window.confirm('Do you want to cancel and remove this scheduled mentorship session?')) {
      const updated = scheduledCalls.filter(c => c.id !== callId);
      setScheduledCalls(updated);
      localStorage.setItem('suluh_progression_calls', JSON.stringify(updated));
    }
  };

  // Overall readiness calculation
  const completedMilestones = milestones.filter(m => m.isCompleted).length;
  const overallReadinessPercent = milestones.length > 0 
    ? Math.round((completedMilestones / milestones.length) * 100) 
    : 0;
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
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-slate-900 text-amber-400 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold border border-amber-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* SECTION 1: High-Level Progression Overview */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        {/* Top Control Action Bar: Save, Clear, Export, Add */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/70 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Auto-saved to device ({lastSavedTime})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={triggerManualSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              title="Save current progress to your browser"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              <span>Save Progress</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Track Application</span>
            </button>

            <button
              onClick={handleExportData}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Download backup file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer" title="Restore from backup file">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Import</span>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-lg transition-colors"
              title="Clear all progress and start fresh"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

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

            {/* Student profile info with editable name */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 mt-2">
              <div className="flex items-center gap-1.5">
                <span>Progress for:</span>
                {isEditingName ? (
                  <span className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-2 py-0.5 text-xs font-bold text-slate-900 border border-amber-400 rounded bg-amber-50/50 focus:outline-none"
                      placeholder="Enter your name"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveStudentName}
                      className="p-1 text-emerald-700 hover:text-emerald-900"
                      title="Save name"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setNameInput(profile.name || '');
                      setIsEditingName(true);
                    }}
                    className="group inline-flex items-center gap-1 font-bold text-slate-900 hover:text-amber-800 underline decoration-dotted"
                    title="Click to change your name"
                  >
                    <span>{profile.name || 'Set Your Name'}</span>
                    <Edit2 className="w-3 h-3 text-slate-400 group-hover:text-amber-700" />
                  </button>
                )}
                <span>({profile.school})</span>
              </div>

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
                <span>Active Targets: {applications.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Quick Metric Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block mb-0.5">Tracked Applications</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {applications.length}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {applications.length > 0 ? 'Active admission & scholarship pipelines' : 'Click "+ Track Application" to begin'}
              </span>
            </div>
            <Award className="w-8 h-8 text-amber-600/30" />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block mb-0.5">Essay Drafts Tracked</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {essays.length}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {essays.length > 0 ? 'Synchronized with Essay Studio' : 'Draft in Essay Studio to auto-track'}
              </span>
            </div>
            <FileText className="w-8 h-8 text-emerald-600/30" />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block mb-0.5">Scheduled Alumni Sessions</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {scheduledCalls.length}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {scheduledCalls.length > 0 ? 'Upcoming scholar consultations' : 'Book a session in Alumni Mentorship'}
              </span>
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
              Scholarship & Admission Applications Pipeline
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Multi-stage progression tracking with checklists, dossier requirements, and submission dates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Application</span>
            </button>
            <button
              onClick={() => onNavigateToTab('scholarships')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>Explore Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Empty State when applications array is empty */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="text-base font-bold text-slate-900">
                Your Application Pipeline is Clean & Ready
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add the scholarships, HECAS degree options, or education loan schemes you are applying for. Track tasks and stage milestones in one central place.
              </p>
            </div>

            {/* Quick 1-click Preset Adders */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Quick 1-Click Add Popular Brunei Schemes:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
                {PRESET_APPLICATION_TEMPLATES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleAddPreset(preset)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-slate-200 rounded-lg transition-all text-left shadow-2xs"
                  >
                    <Plus className="w-3 h-3 text-amber-600" />
                    <span>{preset.title.split('(')[0].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Create Custom Application</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const completedCount = app.tasks.filter(t => t.isDone).length;
              const progress = app.tasks.length > 0 ? Math.round((completedCount / app.tasks.length) * 100) : 0;

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
                      <button
                        onClick={() => handleDeleteApplication(app.id, app.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 5-Stage Visual Stepper */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Application Pipeline Status</span>
                      <span className="font-mono font-bold text-slate-800">
                        {completedCount}/{app.tasks.length} ({progress}%) Done
                      </span>
                    </div>

                    {/* Step indicators */}
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      {stageLabels.map((stLabel, idx) => {
                        const stepNum = idx + 1;
                        const isPast = stepNum < app.currentStage;
                        const isCurrent = stepNum === app.currentStage;

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleChangeStage(app.id, stepNum)}
                            className="space-y-1 group cursor-pointer text-left focus:outline-none"
                            title={`Click to set stage to: ${stLabel}`}
                          >
                            <div className={`h-2 rounded-full transition-all ${
                              isPast 
                                ? 'bg-emerald-500' 
                                : isCurrent 
                                ? 'bg-amber-500 ring-2 ring-amber-300' 
                                : 'bg-slate-200 group-hover:bg-slate-300'
                            }`} />
                            <div className={`text-[10px] truncate hidden sm:block ${isCurrent ? 'font-bold text-amber-900' : 'text-slate-500'}`}>
                              Step 0{stepNum}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Task Checklist */}
                  <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                        Action Checklist & Document Dossier:
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Click tasks to check/uncheck
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {app.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`group flex items-start justify-between gap-2 p-2 rounded transition-colors ${
                            task.isDone
                              ? 'bg-emerald-50/80 text-slate-800 border border-emerald-200/60'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div 
                            onClick={() => handleToggleTask(app.id, task.id)}
                            className="flex items-start gap-2 cursor-pointer grow"
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
                          <button
                            onClick={() => handleDeleteTask(app.id, task.id)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 transition-opacity"
                            title="Delete task"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Custom Task Input */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                      <input
                        type="text"
                        value={newTaskInput[app.id] || ''}
                        onChange={(e) => setNewTaskInput(prev => ({ ...prev, [app.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddNewTask(app.id);
                          }
                        }}
                        placeholder="Add custom task or document item..."
                        className="grow text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddNewTask(app.id)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors shrink-0"
                      >
                        + Add Task
                      </button>
                    </div>

                    {app.notes && (
                      <p className="text-[11px] text-slate-500 italic pt-1">
                        Note: {app.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
                Draft metrics and synchronized workspace status
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('studio')}
              className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {essays.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center space-y-3">
              <FileText className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-700">No essay drafts currently tracked</p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Use the Essay Studio to draft your UCAS personal statement or MOE Overseas statement of purpose. It will appear here automatically.
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('studio')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs"
              >
                Draft in Essay Studio →
              </button>
            </div>
          ) : (
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 bg-amber-100 text-amber-900">
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
                      <span className="text-[10px] text-slate-400 block">Readiness</span>
                      <span className="font-mono font-bold text-emerald-700 tabular-nums">
                        {essay.rubricScore}%
                      </span>
                    </div>
                  </div>

                  {essay.notes && (
                    <p className="text-[11px] text-slate-600 leading-relaxed italic">
                      "{essay.notes}"
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">Status: {essay.lastEdited}</span>
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
          )}
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
              className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
            >
              <span>Book Session</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {scheduledCalls.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center space-y-3">
              <Users className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-700">No scheduled mentorship sessions yet</p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Book a free 1-on-1 consultation with verified Bruneian scholars (BSJV, MOE Overseas, UBD/UTB) for essay feedback and mock interview preparation.
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('mentorship')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs"
              >
                Browse Mentors & Book →
              </button>
            </div>
          ) : (
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

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                        {call.selectedSlot}
                      </span>
                      <button
                        onClick={() => handleDeleteCall(call.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        title="Cancel appointment"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-semibold text-slate-900 block">Agenda & Topics:</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{call.topicsToCover}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      {call.notes?.split(':')[1] || 'Room Ready'}
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
          )}
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
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              {completedMilestones}/{milestones.length} Phases Complete
            </span>
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
                  type="button"
                  onClick={() => handleToggleMilestone(m.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 focus:outline-none"
                  title={m.isCompleted ? 'Mark incomplete' : 'Mark complete'}
                >
                  {m.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-emerald-500 transition-colors" />
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

      {/* MODAL 1: Add Application Modal (Presets & Custom) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h4 className="text-base font-bold text-slate-900">Track an Application</h4>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Presets List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Choose a Curated Brunei Scheme:
              </span>
              <div className="space-y-2">
                {PRESET_APPLICATION_TEMPLATES.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => handleAddPreset(preset)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-semibold text-amber-800">{preset.type}</span>
                        <span>·</span>
                        <span>{preset.deadlineDate}</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-950">
                        {preset.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {preset.tasks.length} standard tasks & verification dossier items
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-semibold text-amber-900 bg-amber-200/80 group-hover:bg-amber-300 rounded shrink-0 mt-1"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Application Form */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Or Create a Custom Application:
              </span>
              <form onSubmit={handleAddCustom} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Application Name *</label>
                  <input
                    type="text"
                    required
                    value={customForm.title}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Cambridge Trust / Monash University / BIA"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Scheme Category</label>
                    <select
                      value={customForm.type}
                      onChange={(e) => setCustomForm(prev => ({ ...prev, type: e.target.value as TrackedApplication['type'] }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Government Scholarship">Government Scholarship</option>
                      <option value="Corporate Scholarship">Corporate Scholarship</option>
                      <option value="University HECAS">University HECAS</option>
                      <option value="Education Loan (SBPP)">Education Loan (SBPP)</option>
                      <option value="UCAS Overseas">UCAS Overseas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Target Deadline</label>
                    <input
                      type="date"
                      value={customForm.deadlineDate}
                      onChange={(e) => setCustomForm(prev => ({ ...prev, deadlineDate: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Target Institution / University</label>
                  <input
                    type="text"
                    value={customForm.targetInstitution}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, targetInstitution: e.target.value }))}
                    placeholder="e.g. Imperial College London / UBD PAPRSB IHS"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Initial Task</label>
                  <input
                    type="text"
                    value={customForm.initialTask}
                    onChange={(e) => setCustomForm(prev => ({ ...prev, initialTask: e.target.value }))}
                    placeholder="e.g. Prepare certified copies of IC and O-Level slips"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white font-semibold bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Save Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertCircle className="w-5 h-5" />
              <h4 className="text-base font-bold">Clear Progression Hub?</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will clear all tracked applications, milestones, and sessions from your local browser storage. You can start completely fresh.
            </p>
            <div className="pt-2 flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3 py-2 text-slate-600 hover:text-slate-900 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetHub}
                className="px-4 py-2 text-white font-semibold bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
              >
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Virtual Mentorship Google Meet Modal */}
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
                <strong>Consultation Session:</strong> Launches directly into Google Meet using your student Siswa/school email. Be punctual and prepare your draft questions in advance!
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
                  alert(`Connecting to Google Meet consultation room for session with ${activeCallModal.mentorName}...`);
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
