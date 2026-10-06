import React, { useState, useEffect } from 'react';
import { StudentProfile } from './types';
import { calculateTariffPoints, calculateStudentTariff } from './utils/tariffCalculator';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PathwayNavigator } from './components/PathwayNavigator';
import { AptitudeMatcher } from './components/AptitudeMatcher';
import { ScholarshipGuide } from './components/ScholarshipGuide';
import { SbppGuide } from './components/SbppGuide';
import { DeadlinesTimeline } from './components/DeadlinesTimeline';
import { AlumniMentorship } from './components/AlumniMentorship';
import { EssayStudio } from './components/EssayStudio';
import { StudentProgressionDashboard } from './components/StudentProgressionDashboard';
import { ShareModal } from './components/ShareModal';
import { OwnershipModal } from './components/OwnershipModal';
import { SuluhLogo } from './components/SuluhLogo';
import { Compass, Award, Calendar, Users, FileText, CheckCircle2, Shield, Heart, Share2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pathways');
  const [courseInquiry, setCourseInquiry] = useState<string>('');
  const [scholarshipInquiry, setScholarshipInquiry] = useState<string>('');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isOwnershipModalOpen, setIsOwnershipModalOpen] = useState<boolean>(false);

  // Student profile with local storage persistence
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('suluh_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      name: 'Brunei Student',
      school: 'Maktab Duli Pengiran Muda Al-Muhtadee Billah (MDPMAMB)',
      qualificationType: 'A-Level',
      icStatus: 'Yellow IC (Citizen)',
      oLevelEnglishGrade: 'B3',
      oLevelMalayGrade: 'B3', // Credit (Mandatory for Govt Institutions scholarship / non fee-paying)
      hasMedicalInterest: false,
      pbDiplomaProgram: 'Advanced Diploma in Information Technology',
      pbCgpa: 3.45,
      ibteSchool: 'IBTE Sultan Saiful Rijal Campus',
      ibteProgram: 'HNTec in Information Technology',
      ibteCgpa: 3.30,
      ibteAward: 'Merit',
      ibPoints: 34,
      stpubGrade: 'Jayyid Jiddan',
      targetField: 'all',
      targetDestination: 'all',
      subjects: [
        { id: 'sub-1', subject: 'Mathematics', grade: 'A', isPredicted: true },
        { id: 'sub-2', subject: 'Physics', grade: 'A', isPredicted: true },
        { id: 'sub-3', subject: 'Chemistry', grade: 'B', isPredicted: true }
      ]
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('suluh_student_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  const tariffPoints = calculateStudentTariff(profile);

  const handleBookAlumniForCourse = (courseName: string) => {
    setCourseInquiry(courseName);
    setScholarshipInquiry('');
    setActiveTab('mentorship');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleBookAlumniForScholarship = (scholarshipTitle: string) => {
    setScholarshipInquiry(scholarshipTitle);
    setCourseInquiry('');
    setActiveTab('mentorship');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleBookAlumniForCareer = (careerTitle: string) => {
    setCourseInquiry(`Career guidance for ${careerTitle}`);
    setScholarshipInquiry('');
    setActiveTab('mentorship');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleBookAlumniForSbpp = () => {
    setScholarshipInquiry('SBPP Education Loan Scheme & experience');
    setCourseInquiry('');
    setActiveTab('mentorship');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleRequestAlumniReview = (essayText: string, essayMode: string) => {
    setCourseInquiry(`Personal statement review for ${essayMode.toUpperCase()}`);
    setScholarshipInquiry('');
    setActiveTab('mentorship');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tariffPoints={tariffPoints}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenOwnershipModal={() => setIsOwnershipModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Hero Section */}
        <HeroBanner
          onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          calculatedPoints={tariffPoints}
        />

        {/* Tab Content Display */}
        {activeTab === 'dashboard' && (
          <StudentProgressionDashboard
            profile={profile}
            setProfile={setProfile}
            tariffPoints={tariffPoints}
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'pathways' && (
          <PathwayNavigator
            profile={profile}
            setProfile={setProfile}
            onSelectScholarshipTab={() => {
              setActiveTab('scholarships');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookAlumniForCourse={handleBookAlumniForCourse}
          />
        )}

        {activeTab === 'aptitude' && (
          <AptitudeMatcher
            profile={profile}
            onExploreCourse={(courseName) => {
              setActiveTab('pathways');
              window.scrollTo({ top: 350, behavior: 'smooth' });
            }}
            onExploreSbpp={() => {
              setActiveTab('sbpp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipGuide
            profile={profile}
            setProfile={setProfile}
            onBookAlumniForScholarship={handleBookAlumniForScholarship}
            onNavigateToDeadlines={() => {
              setActiveTab('deadlines');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'sbpp' && (
          <SbppGuide
            profile={profile}
            onNavigateToPathways={() => {
              setActiveTab('pathways');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToAptitude={() => {
              setActiveTab('aptitude');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookAlumniForSbpp={handleBookAlumniForSbpp}
          />
        )}

        {activeTab === 'deadlines' && (
          <DeadlinesTimeline />
        )}

        {activeTab === 'mentorship' && (
          <AlumniMentorship
            profile={profile}
            initialCourseInquiry={courseInquiry}
            initialScholarshipInquiry={scholarshipInquiry}
          />
        )}

        {activeTab === 'studio' && (
          <EssayStudio
            profile={profile}
            onRequestAlumniReview={handleRequestAlumniReview}
          />
        )}
      </main>

      {/* Institutional Dignified Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800/80">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <SuluhLogo size="sm" />
                <span className="font-architectural text-lg font-bold text-white tracking-wider">
                  Suluh Brunei
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Empowering sixth-form and college students across Negara Brunei Darussalam to achieve academic and professional excellence in local and overseas universities.
              </p>
              <div className="text-[11px] text-amber-400/90 font-medium">
                In support of Wawasan Brunei 2035
              </div>
            </div>

            {/* Col 2: Local Universities */}
            <div className="space-y-2">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                Brunei Institutions
              </div>
              <ul className="space-y-1.5 text-xs">
                <li><a href="https://ubd.edu.bn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Universiti Brunei Darussalam (UBD)</a></li>
                <li><a href="https://utb.edu.bn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Universiti Teknologi Brunei (UTB)</a></li>
                <li><a href="https://unissa.edu.bn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Universiti Islam Sultan Sharif Ali (UNISSA)</a></li>
                <li><a href="https://pb.edu.bn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Politeknik Brunei (PB)</a></li>
                <li><a href="https://hecas.moe.gov.bn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">HECAS Online Portal</a></li>
              </ul>
            </div>

            {/* Col 3: Key Scholarships & Financing */}
            <div className="space-y-2">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                Scholarships & SBPP
              </div>
              <ul className="space-y-1.5 text-xs">
                <li><span className="text-slate-300">MOE Government Overseas Scheme</span></li>
                <li><span className="text-slate-300">SBPP Education Loan Scheme (Kementerian Pendidikan)</span></li>
                <li><span className="text-slate-300">His Majesty The Sultan's Scholar</span></li>
                <li><span className="text-slate-300">Brunei Shell Petroleum (BSP) Scholarship</span></li>
                <li><span className="text-slate-300">Brunei Government Local University Scheme</span></li>
              </ul>
            </div>

            {/* Col 4: Community & Mentorship */}
            <div className="space-y-2">
              <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                Alumni Community
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with verified Bruneian scholars and professionals from Oxford, Imperial, Cambridge, Edinburgh, Melbourne, UBD, and UTB.
              </p>
              <div className="pt-2 text-[11px] text-slate-500">
                Independent educational guidance tool for Bruneian students.
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/40 hover:bg-amber-900/80 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Share Portal with Students</span>
                </button>
              </div>
            </div>
          </div>

          {/* Official Academic Disclaimer Banner on page */}
          <div className="my-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Official Non-Endorsement &amp; Academic Guidance Disclaimer</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              SuluhBrunei is an independent academic pathway guidance platform created for Bruneian students and is <strong>not an officially endorsed site</strong> by or affiliated with the Ministry of Education (MOE) Brunei Darussalam, HECAS, BDNAC, or any featured educational institutions or scholarship agencies. While requirements and guidelines are curated from official publications, university entry criteria, tariff equivalencies, and government policies are subject to ongoing updates. Students and parents must always verify all entry requirements, quotas, and circulars directly with the relevant institutions and government agencies before applying.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span>© 2026 SuluhBrunei · Created & Curated by irs.iniramka@gmail.com</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setIsOwnershipModalOpen(true)}
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ownership, Terms & Academic Advisory</span>
              </button>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Maktab Duli · PTEB · PTET · PTEM · PTES · SMALHB · PB · JIS · ISB</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Share Modal Dialog */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />

      {/* Ownership & Terms Modal Dialog */}
      <OwnershipModal
        isOpen={isOwnershipModalOpen}
        onClose={() => setIsOwnershipModalOpen(false)}
        creatorName="SuluhBrunei Initiative"
        creatorContact="irs.iniramka@gmail.com"
      />
    </div>
  );
}
