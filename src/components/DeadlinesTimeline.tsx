import React, { useState } from 'react';
import { ApplicationDeadline } from '../types';
import { APPLICATION_DEADLINES } from '../data/deadlines';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendarExport';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ExternalLink, 
  CheckCircle, 
  Bell, 
  Plus, 
  Download, 
  AlertTriangle,
  Info,
  CalendarPlus
} from 'lucide-react';

export const DeadlinesTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [completedDeadlines, setCompletedDeadlines] = useState<Record<string, boolean>>({});
  const [customDeadlines, setCustomDeadlines] = useState<ApplicationDeadline[]>([]);
  
  // Custom deadline form
  const [showAddModal, setShowAddModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customCategory, setCustomCategory] = useState<ApplicationDeadline['category']>('HECAS');
  const [customDesc, setCustomDesc] = useState('');

  const toggleComplete = (id: string) => {
    setCompletedDeadlines(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customDate) return;

    const newDl: ApplicationDeadline = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      category: customCategory,
      institutionOrBody: 'My Sixth Form / Personal Goal',
      date: customDate,
      description: customDesc || 'Custom milestone created by student.',
      actionRequired: 'Review personal notes and complete task.',
      isCrucial: false
    };

    setCustomDeadlines(prev => [...prev, newDl]);
    setShowAddModal(false);
    setCustomTitle('');
    setCustomDate('');
    setCustomDesc('');
  };

  // Combine default and custom deadlines sorted by date
  const allDeadlines = [...APPLICATION_DEADLINES, ...customDeadlines].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filteredDeadlines = allDeadlines.filter(dl => {
    if (selectedCategory === 'all') return true;
    return dl.category === selectedCategory;
  });

  // Calculate days remaining helper
  const getDaysRemaining = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Find next upcoming critical deadline
  const nextCrucial = allDeadlines.find(dl => {
    const days = getDaysRemaining(dl.date);
    return days >= 0 && dl.isCrucial;
  });

  const nextCrucialDays = nextCrucial ? getDaysRemaining(nextCrucial.date) : null;

  return (
    <div className="space-y-10">
      {/* SECTION 1: Countdown Hero Card */}
      {nextCrucial && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-xl border border-slate-700/80 p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              {/* Clean unboxed metadata with separators (Anti-slop) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <span>Priority Milestone</span>
                <span aria-hidden="true">·</span>
                <span>{nextCrucial.category}</span>
                <span aria-hidden="true">·</span>
                <span>{nextCrucial.institutionOrBody}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white">
                {nextCrucial.title}
              </h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {nextCrucial.description}
              </p>
            </div>

            <div className="flex items-center gap-5 bg-slate-950/70 border border-slate-700/80 p-5 rounded-xl shrink-0">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-mono font-bold text-amber-400 tabular-nums">
                  {nextCrucialDays !== null ? (nextCrucialDays > 0 ? nextCrucialDays : 'Today!') : '--'}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium mt-0.5">
                  Days Remaining
                </div>
              </div>

              <div className="h-10 w-px bg-slate-700" />

              <div className="space-y-2">
                <a
                  href={getGoogleCalendarUrl(nextCrucial)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded transition-colors whitespace-nowrap"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Google Calendar</span>
                </a>
                <button
                  onClick={() => downloadIcsFile(nextCrucial)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded border border-slate-600 transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ICS</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: Filterable Timeline & Custom Milestone Planner */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Brunei Higher Education & Scholarship Timeline
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Official HECAS deadlines, MOE scholarship stages, UCAS dates, and RIPAS health checks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Milestone</span>
            </button>
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full text-xs">
          {[
            { id: 'all', label: 'All Dates' },
            { id: 'HECAS', label: 'HECAS Local' },
            { id: 'Scholarship', label: 'Scholarships' },
            { id: 'UCAS & Overseas', label: 'UCAS & Overseas' },
            { id: 'Medical & Visa', label: 'Medical & Visas' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline Items List */}
        <div className="space-y-4">
          {filteredDeadlines.map((dl) => {
            const isCompleted = !!completedDeadlines[dl.id];
            const daysLeft = getDaysRemaining(dl.date);
            const isPast = daysLeft < 0;

            return (
              <div
                key={dl.id}
                className={`bg-white rounded-xl border p-5 transition-all shadow-2xs ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20 opacity-75'
                    : dl.isCrucial
                    ? 'border-slate-300 hover:border-amber-400'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    {/* Unboxed Metadata with separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-amber-800">{dl.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dl.institutionOrBody}</span>
                      {dl.isCrucial && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-rose-700 font-semibold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Crucial
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className={`text-base font-bold leading-snug ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {dl.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dl.description}
                    </p>

                    <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100 mt-2">
                      <strong className="text-slate-900">Action Required:</strong> {dl.actionRequired}
                    </div>
                  </div>

                  {/* Right side date & actions */}
                  <div className="sm:w-60 shrink-0 flex flex-col justify-between items-start sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="sm:text-right">
                      <div className="text-xs text-slate-500">Deadline Date</div>
                      <div className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                        {dl.date} {dl.time && `· ${dl.time}`}
                      </div>
                      <div className="text-[11px] font-medium mt-0.5">
                        {isPast ? (
                          <span className="text-slate-400">Passed / Archived</span>
                        ) : daysLeft === 0 ? (
                          <span className="text-rose-600 font-bold">Due Today!</span>
                        ) : (
                          <span className="text-amber-800 font-semibold">{daysLeft} days remaining</span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={getGoogleCalendarUrl(dl)}
                        target="_blank"
                        rel="noreferrer noopener"
                        title="Add to Google Calendar"
                        className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors text-xs flex items-center gap-1"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Calendar</span>
                      </a>

                      <button
                        onClick={() => downloadIcsFile(dl)}
                        title="Download .ics file"
                        className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors text-xs flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">.ICS</span>
                      </button>

                      <button
                        onClick={() => toggleComplete(dl.id)}
                        className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'Done' : 'Mark Done'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add Custom Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add Sixth Form Milestone</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Maktab Duli Mock Exams / Submit Referee Letter"
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as ApplicationDeadline['category'])}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="HECAS">HECAS</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="UCAS & Overseas">UCAS & Overseas</option>
                    <option value="Medical & Visa">Medical & Visa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Notes / Description
                </label>
                <textarea
                  rows={2}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="Additional reminders, required items..."
                  className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
