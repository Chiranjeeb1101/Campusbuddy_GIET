import { useState } from 'react';
import { Search, Star, MessageCircle, User, Clock, Filter, Zap, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Mentor {
  id: string;
  name: string;
  year: string;
  subjects: string[];
  rating: number;
  responseTime: string;
  helpedStudents: number;
  expertise: string[];
  isOnline: boolean;
  bio: string;
}

export function PeerConnect() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSendMessage = (mentorName: string) => {
    setToastMessage(`Connecting with ${mentorName}... message sent!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      year: 'Year 4',
      subjects: ['Computer Science', 'Data Structures', 'Algorithms'],
      rating: 4.9,
      responseTime: '< 30 min',
      helpedStudents: 127,
      expertise: ['Programming', 'Problem Solving', 'Interview Prep'],
      isOnline: true,
      bio: 'CS senior with internship experience at tech companies. Love helping juniors with coding challenges and career guidance.',
    },
    {
      id: '2',
      name: 'Alex Chen',
      year: 'Year 3',
      subjects: ['Mathematics', 'Statistics', 'Machine Learning'],
      rating: 4.8,
      responseTime: '< 1 hour',
      helpedStudents: 89,
      expertise: ['Math Concepts', 'ML Fundamentals', 'Research'],
      isOnline: false,
      bio: 'Math enthusiast working on ML research. Specialized in making complex mathematical concepts easy to understand.',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      year: 'Year 4',
      subjects: ['Database Systems', 'Web Development', 'Software Engineering'],
      rating: 4.7,
      responseTime: '< 45 min',
      helpedStudents: 156,
      expertise: ['Database Design', 'Full-Stack Development', 'System Design'],
      isOnline: true,
      bio: 'Full-stack developer with experience in multiple frameworks. Passionate about teaching practical programming skills.',
    },
    {
      id: '4',
      name: 'David Park',
      year: 'Year 3',
      subjects: ['Physics', 'Engineering Mathematics', 'Electronics'],
      rating: 4.6,
      responseTime: '< 2 hours',
      helpedStudents: 73,
      expertise: ['Physics Problems', 'Circuit Analysis', 'Engineering Math'],
      isOnline: true,
      bio: 'Engineering student with strong foundation in physics and mathematics. Great at breaking down complex problems.',
    },
  ];

  const subjects = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Database Systems', 'Web Development', 'Machine Learning'];
  const years = ['all', 'Year 2', 'Year 3', 'Year 4'];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubject = selectedSubject === 'all' ||
      mentor.subjects.some(subject => subject.includes(selectedSubject));

    const matchesYear = selectedYear === 'all' || mentor.year === selectedYear;

    return matchesSearch && matchesSubject && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-5 w-5 text-brand-secondary" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Peer Mentors</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Connect with <span className="text-gradient">Peer Mentors</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
          Access the collective knowledge of our senior students.
          Bridge the gap through direct peer-to-peer connection.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[2.5rem] p-4 border border-white/50 mb-12 shadow-2xl relative z-10"
      >
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative group">
            <Search className="h-5 w-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text"
              placeholder="Filter by name, subject, or core skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-medium"
            />
          </div>

          <div className="relative">
            <Filter className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-bold text-sm appearance-none"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject === 'all' ? 'All Subjects' : subject}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Clock className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-bold text-sm appearance-none"
            >
              {years.map(year => (
                <option key={year} value={year}>{year === 'all' ? 'All Years' : year}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredMentors.map((mentor) => (
          <motion.div
            key={mentor.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            className="group relative bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            <div className="h-3 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-20 group-hover:opacity-100 transition-opacity" />

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 transition-all">
                      <User className="h-8 w-8 text-indigo-600" />
                    </div>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full animate-pulse shadow-sm"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{mentor.name}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{mentor.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{mentor.rating}</span>
                </div>
              </div>

              <p className="text-slate-600 text-[14px] leading-relaxed mb-6 font-medium line-clamp-2 italic">
                "{mentor.bio}"
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {mentor.subjects.slice(0, 2).map((subject, index) => (
                  <span key={index} className="px-3 py-1.5 bg-indigo-50/50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100/30">
                    {subject}
                  </span>
                ))}
                {mentor.subjects.length > 2 && (
                  <span className="px-3 py-1.5 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                    +{mentor.subjects.length - 2} MORE
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Zap className="h-3 w-3 text-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response Time</span>
                  </div>
                  <p className="text-sm font-black text-slate-900">{mentor.responseTime}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-3 w-3 text-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students Helped</span>
                  </div>
                  <p className="text-sm font-black text-slate-900">{mentor.helpedStudents} Students</p>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8">
              <button
                onClick={() => handleSendMessage(mentor.name)}
                className="w-full group relative py-4 bg-brand-surface text-white font-black rounded-2xl shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-xs">
                  <MessageCircle className="h-4 w-4" />
                  Send Message
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredMentors.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-slate-100">
            <Search className="h-10 w-10 text-slate-200" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No Mentors Found</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Try adjusting your filters</p>
        </motion.div>
      )}

      {/* Action Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-black tracking-tight">{toastMessage}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Status: Success</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
