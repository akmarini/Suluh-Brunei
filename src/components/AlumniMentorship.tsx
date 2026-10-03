import React, { useState } from 'react';
import { AlumniMentor, MentorshipBooking, AlumniForumPost, StudentProfile } from '../types';
import { ALUMNI_MENTORS } from '../data/alumni';
import { COMMUNITY_THREADS } from '../data/adviceThreads';
import alumniVisual from '../assets/images/alumni_mentorship_1790996873188.jpg';
import { 
  Users, 
  CheckCircle, 
  Calendar, 
  MessageSquare, 
  Star, 
  Send, 
  ThumbsUp, 
  MapPin, 
  Building, 
  GraduationCap, 
  Award,
  Clock,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

interface AlumniMentorshipProps {
  profile: StudentProfile;
  initialCourseInquiry?: string;
  initialScholarshipInquiry?: string;
}

export const AlumniMentorship: React.FC<AlumniMentorshipProps> = ({
  profile,
  initialCourseInquiry,
  initialScholarshipInquiry
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'mentors' | 'forum'>('mentors');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Booking Modal State
  const [selectedMentor, setSelectedMentor] = useState<AlumniMentor | null>(null);
  const [bookingForm, setBookingForm] = useState<{
    sessionType: MentorshipBooking['sessionType'];
    selectedSlot: string;
    topicsToCover: string;
    studentName: string;
    studentSchool: string;
    studentEmail: string;
  }>({
    sessionType: '1-on-1 Video Advice',
    selectedSlot: '',
    topicsToCover: initialCourseInquiry ? `Guidance regarding ${initialCourseInquiry}` : (initialScholarshipInquiry ? `Questions on ${initialScholarshipInquiry}` : ''),
    studentName: profile.name || '',
    studentSchool: profile.school || 'Maktab Duli PMAMB',
    studentEmail: ''
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<MentorshipBooking | null>(null);

  // Forum state
  const [forumPosts, setForumPosts] = useState<AlumniForumPost[]>(COMMUNITY_THREADS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newQuestionModalOpen, setNewQuestionModalOpen] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<AlumniForumPost['category']>('MOE Overseas Interview');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleOpenBooking = (mentor: AlumniMentor) => {
    setSelectedMentor(mentor);
    setBookingForm(prev => ({
      ...prev,
      selectedSlot: mentor.availableSlots[0] || '',
      topicsToCover: initialCourseInquiry ? `Questions about ${initialCourseInquiry}` : (initialScholarshipInquiry ? `Questions on ${initialScholarshipInquiry}` : '')
    }));
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    const booking: MentorshipBooking = {
      id: `book-${Date.now()}`,
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      studentName: bookingForm.studentName || 'Sixth Form Scholar',
      studentSchool: bookingForm.studentSchool,
      studentEmail: bookingForm.studentEmail || 'student@siswa.moe.edu.bn',
      sessionType: bookingForm.sessionType,
      selectedSlot: bookingForm.selectedSlot,
      topicsToCover: bookingForm.topicsToCover,
      notes: 'Confirmation sent to student email with Google Meet room link.',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setBookingConfirmed(booking);
    setSelectedMentor(null);
  };

  const handleUpvote = (postId: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle || !newQuestionContent) return;

    const newPost: AlumniForumPost = {
      id: `thread-${Date.now()}`,
      title: newQuestionTitle,
      category: newQuestionCategory,
      authorName: profile.name || 'Sixth Form Student',
      authorRole: `${profile.school} Student`,
      authorUni: 'Prospective Undergraduate',
      content: newQuestionContent,
      tags: ['Student Question', 'Mentorship'],
      upvotes: 1,
      timestamp: 'Just now',
      replies: [
        {
          id: `rep-${Date.now()}`,
          authorName: 'SuluhBrunei Mentor Desk',
          authorRole: 'Verified Alumni Moderator',
          content: 'Thank you for asking! We have routed this inquiry to alumni mentors from UBD, UTB, and UK universities. You will receive advice shortly.',
          timestamp: 'Just now',
          isMentor: true
        }
      ]
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewQuestionModalOpen(false);
    setNewQuestionTitle('');
    setNewQuestionContent('');
  };

  const handleAddReply = (postId: string) => {
    if (!replyText.trim()) return;

    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: profile.name || 'Sixth Form Peer',
              authorRole: `${profile.school} Student`,
              content: replyText,
              timestamp: 'Just now',
              isMentor: false
            }
          ]
        };
      }
      return p;
    }));

    setReplyText('');
    setActiveReplyId(null);
  };

  // Filter mentors
  const filteredMentors = ALUMNI_MENTORS.filter(mentor => {
    if (selectedSpecialty !== 'all') {
      const matchSpecialty = mentor.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase())) ||
                             mentor.scholarshipAwarded.toLowerCase().includes(selectedSpecialty.toLowerCase());
      if (!matchSpecialty) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        mentor.name.toLowerCase().includes(q) ||
        mentor.university.toLowerCase().includes(q) ||
        mentor.companyOrMinistry.toLowerCase().includes(q) ||
        mentor.currentRole.toLowerCase().includes(q) ||
        mentor.bio.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-10">
      {/* SECTION 1: Alumni Network Feature Spotlight */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Verified Alumni Network</span>
              <span aria-hidden="true">·</span>
              <span>1-on-1 Mentorship</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 leading-tight">
              Connect directly with Bruneian graduates from world-class institutions.
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Navigating university applications and scholarship interviews can feel overwhelming. Our mentors are former sixth-form students from Maktab Duli, PTET, PTEM, and SMALHB who studied at UBD, UTB, Oxford, Imperial, UCL, LSE, and Melbourne, and are now serving in key national roles.
            </p>

            {/* Proof numbers */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <div className="font-mono font-bold text-slate-900 text-lg tabular-nums">100%</div>
                <div className="text-slate-500">Verified Alumni</div>
              </div>
              <div>
                <div className="font-mono font-bold text-slate-900 text-lg tabular-nums">320+</div>
                <div className="text-slate-500">Students Guided</div>
              </div>
              <div>
                <div className="font-mono font-bold text-slate-900 text-lg tabular-nums">Free</div>
                <div className="text-slate-500">Non-Profit Mentorship</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
              <img
                src={alumniVisual}
                alt="Bruneian alumni mentoring students"
                className="w-full h-56 object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-3 bg-slate-900 text-white text-xs">
                <span className="font-medium text-amber-300">Active Mentorship Hub:</span> 1-on-1 mock interviews, personal statement critiques, and career pathway advice.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Confirmation Banner if recently booked */}
      {bookingConfirmed && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-emerald-900">
                Mentorship Session Confirmed with {bookingConfirmed.mentorName}!
              </h4>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Slot: <strong className="font-mono">{bookingConfirmed.selectedSlot}</strong> · Type: {bookingConfirmed.sessionType}.
                A calendar invitation with the Google Meet link has been simulated for {bookingConfirmed.studentEmail}.
              </p>
            </div>
          </div>
          <button
            onClick={() => setBookingConfirmed(null)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 p-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Sub-Navigation: Mentors Directory vs Alumni Advice Forum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab('mentors')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'mentors'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Alumni Mentors ({filteredMentors.length})
          </button>

          <button
            onClick={() => setActiveSubTab('forum')}
            className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'forum'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Community Advice ({forumPosts.length})
          </button>
        </div>

        {activeSubTab === 'forum' && (
          <button
            onClick={() => setNewQuestionModalOpen(true)}
            className="self-start sm:self-auto px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            Ask a Question to Alumni
          </button>
        )}
      </div>

      {/* SUB-TAB 1: MENTORS DIRECTORY */}
      {activeSubTab === 'mentors' && (
        <section className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentors by name, university, ministry or role (e.g. BSP, RIPAS, Imperial, UBD)..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
              />
            </div>

            {/* Specialty filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {[
                { id: 'all', label: 'All Specialties' },
                { id: 'MOE', label: 'MOE Overseas' },
                { id: 'BSP', label: 'BSP Shell' },
                { id: 'Sultan', label: "Sultan's Scholar" },
                { id: 'MMI', label: 'Medicine & MMI' },
                { id: 'HECAS', label: 'HECAS / Local' }
              ].map(spec => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                    selectedSpecialty === spec.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Top unboxed metadata */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1 font-semibold text-emerald-800">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Alumni Mentor</span>
                    </div>
                    <span className="font-mono text-slate-400">Class of {mentor.graduationYear}</span>
                  </div>

                  {/* Mentor Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-base shrink-0 border border-slate-800">
                      {mentor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {mentor.name}
                      </h3>
                      <div className="text-xs font-medium text-slate-700">
                        {mentor.currentRole}
                      </div>
                      <div className="text-xs text-slate-500">
                        {mentor.companyOrMinistry}
                      </div>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-900">{mentor.university}</span>
                    </div>
                    <div className="text-slate-600 pl-5">
                      {mentor.degree}
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-700 pt-1">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-amber-900 font-medium">{mentor.scholarshipAwarded}</span>
                    </div>
                    <div className="text-slate-500 pl-5 text-[11px]">
                      Sixth Form: {mentor.sixthFormSchool}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {mentor.bio}
                  </p>

                  {/* Specialties (Anti-slop: clean text with dividers, no candy pills) */}
                  <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700 block mb-1">Mentoring Topics:</span>
                    <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                      {mentor.specialties.map((s, i) => (
                        <span key={i} className="inline-flex items-center">
                          <span className="text-slate-700">{s}</span>
                          {i < mentor.specialties.length - 1 && <span className="mx-1 text-slate-300">/</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 italic">
                    "{mentor.adviceQuote}"
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{mentor.totalMenteesHelped}</span> students mentored
                  </div>

                  <button
                    onClick={() => handleOpenBooking(mentor)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
                  >
                    Request 1-on-1 Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUB-TAB 2: ALUMNI ADVICE FORUM */}
      {activeSubTab === 'forum' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Alumni Advice & Sixth Form Community Threads
            </h3>
            <span className="text-xs text-slate-500">
              Written by Bruneian scholars and university graduates
            </span>
          </div>

          <div className="space-y-5">
            {forumPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs hover:shadow-md transition-shadow"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-amber-800">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700">{post.authorName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.authorRole}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.timestamp}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {post.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-mono tabular-nums">{post.upvotes}</span>
                  </button>
                </div>

                {/* Content */}
                <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed my-4 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  {post.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Replies Accordion */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-medium">{post.replies.length} Responses</span>
                    <button
                      onClick={() => setActiveReplyId(activeReplyId === post.id ? null : post.id)}
                      className="text-amber-800 font-semibold hover:underline"
                    >
                      {activeReplyId === post.id ? 'Cancel Reply' : 'Add Reply'}
                    </button>
                  </div>

                  {/* Reply Input */}
                  {activeReplyId === post.id && (
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your response or follow-up question..."
                        className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddReply(post.id)}
                      />
                      <button
                        onClick={() => handleAddReply(post.id)}
                        className="px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                      >
                        Reply
                      </button>
                    </div>
                  )}

                  {/* List of Replies */}
                  {post.replies.map(rep => (
                    <div
                      key={rep.id}
                      className={`p-3 rounded-lg text-xs space-y-1 ${
                        rep.isMentor
                          ? 'bg-amber-50/60 border border-amber-200/60 text-slate-800'
                          : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5 font-medium">
                          {rep.isMentor && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                          <span className={rep.isMentor ? 'text-amber-950 font-semibold' : 'text-slate-700'}>
                            {rep.authorName}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{rep.authorRole}</span>
                        </div>
                        <span>{rep.timestamp}</span>
                      </div>
                      <div className="leading-relaxed">{rep.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking Form Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="text-xs text-slate-500">Book Direct Mentorship</div>
                <h3 className="text-lg font-bold text-slate-900">
                  Session with {selectedMentor.name}
                </h3>
                <div className="text-xs text-amber-800 font-medium">
                  {selectedMentor.university} · {selectedMentor.currentRole}
                </div>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4 my-5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Type of Mentorship Requested
                </label>
                <select
                  value={bookingForm.sessionType}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, sessionType: e.target.value as any }))}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="1-on-1 Video Advice">1-on-1 Video Advice & Q&A</option>
                  <option value="Personal Statement Review">Personal Statement / Essay Review</option>
                  <option value="Interview Simulation">MOE Scholarship / MMI Mock Interview Simulation</option>
                  <option value="Scholarship Q&A">BSP / Overseas Living & Budgeting Advice</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Choose Available Mentor Slot (Brunei Time)
                </label>
                <select
                  value={bookingForm.selectedSlot}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, selectedSlot: e.target.value }))}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {selectedMentor.availableSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.studentName}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, studentName: e.target.value }))}
                    placeholder="Full Name"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Sixth Form / College
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.studentSchool}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, studentSchool: e.target.value }))}
                    placeholder="e.g. Maktab Duli / PTET"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Student Email (For Google Meet Link)
                </label>
                <input
                  type="email"
                  required
                  value={bookingForm.studentEmail}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, studentEmail: e.target.value }))}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Specific Questions or Areas to Focus
                </label>
                <textarea
                  rows={3}
                  required
                  value={bookingForm.topicsToCover}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, topicsToCover: e.target.value }))}
                  placeholder="Tell your mentor about your target degree, current predicted grades, and what specific questions you'd like answered..."
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg text-[11px] text-amber-900 leading-relaxed border border-amber-200">
                SuluhBrunei mentors volunteer their time to guide junior students. All sessions are 100% free and conducted over secure video calls.
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ask Question to Alumni Modal */}
      {newQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Post Inquiry to Alumni Network</h3>
              <button
                onClick={() => setNewQuestionModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Topic / Category
                </label>
                <select
                  value={newQuestionCategory}
                  onChange={(e) => setNewQuestionCategory(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="MOE Overseas Interview">MOE Overseas Scholarship Interview</option>
                  <option value="UCAS Personal Statement">UCAS Personal Statement</option>
                  <option value="Life in UK / Aus">Living in the UK / Australia as a Bruneian</option>
                  <option value="HECAS Tips">HECAS Choices & Course Ranking</option>
                  <option value="Medicine & MMI">Medicine & MMI Interviews</option>
                  <option value="Career in Brunei">Careers in Brunei (Wawasan 2035)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  required
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder="e.g. How does the MOE panel test our knowledge on Brunei's economy?"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Background / Context
                </label>
                <textarea
                  rows={4}
                  required
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  placeholder="Provide context about your current subjects, predicted grades, or the university you're applying for..."
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewQuestionModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Post to Alumni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
