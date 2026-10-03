import { AlumniForumPost } from '../types';

export const COMMUNITY_THREADS: AlumniForumPost[] = [
  {
    id: 'thread-1',
    title: 'Top 5 mistakes sixth-formers make during the MOE Overseas Scholarship Panel Interview',
    category: 'MOE Overseas Interview',
    authorName: 'Amirul Syafiq Pg Hj Metussin',
    authorRole: 'BSP Senior Engineer / Imperial Alum',
    authorUni: 'Imperial College London',
    content: `Having sat through the MOE interview myself and helped dozens of MD, PTEB, PTET, and PTEM students over the last 4 years, here are the most critical mistakes to avoid:

1. **Not knowing Brunei's economic vision (Wawasan Brunei 2035)**: If you are asking His Majesty's Government to sponsor hundreds of thousands of dollars on your degree, you MUST know how your field fits into the 5 economic clusters (Downstream Oil & Gas, Food, Tourism, ICT, Services).
2. **Stumbling when switched to Malay**: The interview panel often starts in English to test academic fluency, then suddenly switches to Bahasa Melayu to test your cultural grounding and communication with local stakeholders. Practice articulating your technical subject in formal Malay!
3. **Saying "I want to study overseas because it has higher prestige"**: Big red flag. The panel will ask: "Why can't you study this at UBD or UTB?" You must articulate specific technical modules, research labs, or accreditations that only that overseas university provides.
4. **Not knowing current affairs**: Read Pelita Brunei, Borneo Bulletin, and RTB news for the 2 weeks leading up to your interview.
5. **No questions for the panel**: When they ask "Do you have any questions for us?", ask about national talent development initiatives or attachment opportunities.`,
    tags: ['MOE Scholarship', 'Interview Tips', 'Wawasan 2035', 'A-Levels'],
    upvotes: 89,
    timestamp: '2 days ago',
    replies: [
      {
        id: 'rep-1',
        authorName: 'Dr. Nadhirah Hj Awang',
        authorRole: 'Medical Officer / UBD-Aberdeen',
        content: 'Spot on Amirul! For medicine specifically, be prepared to discuss the burden of Non-Communicable Diseases (NCDs like diabetes, cardiovascular illness) in Brunei and how prevention plays into primary healthcare.',
        timestamp: '1 day ago',
        isMentor: true
      },
      {
        id: 'rep-2',
        authorName: 'Siti Sarah (MD Student)',
        authorRole: 'Sixth Former at Maktab Duli',
        content: 'This is super helpful! How long does the panel interview usually last? Is it individual or group?',
        timestamp: '18 hours ago',
        isMentor: false
      },
      {
        id: 'rep-3',
        authorName: 'Amirul Syafiq Pg Hj Metussin',
        authorRole: 'BSP Senior Engineer / Imperial Alum',
        content: 'Individual panel! Usually lasts between 20 to 30 minutes with 4-5 panel members including senior education directors and university faculty reps.',
        timestamp: '14 hours ago',
        isMentor: true
      }
    ]
  },
  {
    id: 'thread-2',
    title: 'How to craft a standout UCAS Personal Statement: 80% Academic vs 20% Extracurricular',
    category: 'UCAS Personal Statement',
    authorName: 'Muhammad Fadhil Hj Bujang',
    authorRole: 'Senior Analyst at BIA / LSE Alum',
    authorUni: 'London School of Economics',
    content: `UK university admissions tutors do NOT want an American-style emotional story about how you wanted to be an economist since age 5. They want evidence of supercurricular engagement:

- **What books, papers, or podcasts have you consumed outside the A-Level syllabus?** (e.g. Read 'Thinking, Fast and Slow' or attended a Royal Society lecture).
- **Reflective analysis, not just a book list**: Don't just say "I read X book". Say: "I read X, which challenged my perspective on Y, prompting me to build a simulation in Python to test Z."
- **Keep extracurriculars (CCAs) to the final 15-20%**: Mention sports, debating, or student council only to show time management, team leadership, and perseverance under pressure.`,
    tags: ['UCAS', 'Personal Statement', 'Supercurriculars', 'UK Admissions'],
    upvotes: 64,
    timestamp: '5 days ago',
    replies: [
      {
        id: 'rep-201',
        authorName: 'Khairul Anwar Hj Mahmud',
        authorRole: 'Senior State Counsel / UCL Alum',
        content: 'For law students: discuss a landmark Bruneian or English court case that challenged you ethically. Show analytical nuance rather than emotional preaching.',
        timestamp: '4 days ago',
        isMentor: true
      }
    ]
  },
  {
    id: 'thread-3',
    title: 'Living on the MOE / Student Allowance in the UK: Budgeting, Halal food & BSUnion Life',
    category: 'Life in UK / Aus',
    authorName: 'Hazimah binti Rosli',
    authorRole: 'Research Officer / Melb Alum',
    authorUni: 'University of Melbourne',
    content: `A lot of Bruneian juniors worry about living abroad for the first time:

1. **Halal food**: In the UK and Melbourne, Halal groceries and butcheries are widely available in most major student towns. Most students cook together in groups of fellow Bruneians (the "BruSociety" potlucks are legendary!).
2. **BSUnion (Brunei Students' Union)**: Join your local Bruneian society (e.g. BruSheff, LBU, BruWick, BruSton). They organize Hari Raya celebrations, sports tournaments (Brunei Hall Games in London), and provide immense emotional support when homesick.
3. **Winter preparation**: Don't buy thick winter jackets in Brunei—they are often too thin or overpriced. Wait until you land or order from Uniqlo UK / Decathlon using your MOE warm clothing allowance.`,
    tags: ['Overseas Living', 'BSUnion', 'Halal Food', 'Budgeting'],
    upvotes: 77,
    timestamp: '1 week ago',
    replies: [
      {
        id: 'rep-301',
        authorName: 'Amirul Syafiq Pg Hj Metussin',
        authorRole: 'BSP Senior Engineer / Imperial Alum',
        content: 'Also: open a local bank account (like Monzo or Lloyds in the UK, CommBank in Australia) as soon as you receive your biometric residence permit (BRP).',
        timestamp: '6 days ago',
        isMentor: true
      }
    ]
  },
  {
    id: 'thread-4',
    title: 'HECAS Strategy: How should I prioritize my 2 university choices and 4 programmes?',
    category: 'HECAS Tips',
    authorName: 'Dk. Sarah Az-Zahra',
    authorRole: 'AI & Cloud Engineer / UTB Alum',
    authorUni: 'Universiti Teknologi Brunei',
    content: `HECAS allows you to select up to 2 institutions, and up to 2 programmes per institution (4 choices total).

- **First Choice**: Put your dream programme that you meet the minimum entry requirements for (e.g. UBD Medicine or UTB Computing).
- **Second Choice**: A closely aligned programme at the same institution (e.g. UBD Applied Physics or UTB Cyber Security).
- **Insurance / Third Choice**: A solid course at your second institution (e.g. UNISSA Islamic Finance or Politeknik Brunei Diploma top-up).
- Always ensure you meet the specific O-Level prerequisites (credit C6 in BM and English is mandatory almost everywhere).`,
    tags: ['HECAS', 'UBD', 'UTB', 'UNISSA', 'Politeknik Brunei'],
    upvotes: 52,
    timestamp: '2 weeks ago',
    replies: []
  }
];
