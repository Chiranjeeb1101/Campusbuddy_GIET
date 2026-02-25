import { useState } from 'react';
import { User, Briefcase, Clock, Sparkles, MessageCircle, Search, Shield, ChevronRight, Zap, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  company: string;
  availability: string;
  rating: number;
  studentsHelped: number;
  bio: string;
  isOnline: boolean;
  year: string;
}

export function Mentorship() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const mentors: Mentor[] = [
    {
      id: 'm1',
      name: 'Neha Gupta',
      expertise: ['Frontend', 'React', 'UI/UX'],
      company: 'Acme Corp',
      availability: '2 hrs/week',
      rating: 4.9,
      studentsHelped: 45,
      bio: 'Senior Frontend Engineer with 5+ years of experience. I specialize in building scalable React applications and design systems.',
      isOnline: true,
      year: 'Class of 2016'
    },
    {
      id: 'm2',
      name: 'Arjun Rao',
      expertise: ['Backend', 'Node.js', 'System Design'],
      company: 'Globex',
      availability: '1 hr/week',
      rating: 4.8,
      studentsHelped: 32,
      bio: 'Backend Architect focusing on microservices and cloud infrastructure. Happy to help with system design and API optimization.',
      isOnline: false,
      year: 'Class of 2018'
    },
    {
      id: 'm3',
      name: 'Kavita Iyer',
      expertise: ['Data Science', 'Python', 'ML'],
      company: 'DeepMind',
      availability: '3 hrs/week',
      rating: 5.0,
      studentsHelped: 18,
      bio: 'Research Scientist passionate about AI ethics and machine learning applications in healthcare.',
      isOnline: true,
      year: 'Class of 2019'
    }
  ];

  const handleRequestMentorship = (name: string) => {
    setToastMessage(`Mentorship request sent to ${name}! Awaiting confirmation.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredMentors = mentors.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
    m.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-5 w-5 text-brand-secondary" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Mentors</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Professional <span className="text-gradient">Mentorship</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
          Accelerate your career with 1-on-1 guidance from our most successful alumni.
          Bridging the gap between academia and industry.
        </p>

        <div className="mt-8 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-brand-primary text-white font-black rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all uppercase tracking-widest text-[10px]"
          >
            Find Matches
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all uppercase tracking-widest text-[10px]"
          >
            Become a Mentor
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[2.5rem] p-4 border border-white/50 mb-12 shadow-2xl relative z-10"
      >
        <div className="relative group">
          <Search className="h-5 w-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text"
            placeholder="Search mentors by name, company, or core expertise (e.g. React, UX)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-medium"
          />
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
        className="grid md:grid-cols-2 gap-8"
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
            <div className="p-8 lg:p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 transition-all">
                      <User className="h-10 w-10 text-indigo-600" />
                    </div>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full animate-pulse shadow-sm"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{mentor.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <GraduationCap className="h-4 w-4" />
                      {mentor.year}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-green-50 text-green-600 px-3 py-1 rounded-lg flex items-center gap-2 border border-green-100 shadow-sm mb-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{mentor.availability}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Sparkles className="h-3 w-3 fill-amber-500" />
                    <span className="text-xs font-black tracking-tight">{mentor.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-[15px] leading-relaxed mb-8 font-medium italic">
                "{mentor.bio}"
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-50 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Briefcase className="h-3 w-3 text-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Expertise</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.slice(0, 2).map((exp, idx) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1.5">
                    <Zap className="h-3 w-3 text-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</span>
                  </div>
                  <p className="text-sm font-black text-slate-900">{mentor.company}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleRequestMentorship(mentor.name)}
                  className="flex-1 group relative py-5 bg-brand-surface text-white font-black rounded-2xl shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 tracking-[0.15em] uppercase text-xs">
                    <MessageCircle className="h-4 w-4" />
                    Request Link
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="p-5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
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
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Try adjusting your search criteria</p>
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Status: Request Synchronized</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

