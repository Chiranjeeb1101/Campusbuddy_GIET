import { useState } from 'react';
import { Search, GraduationCap, MapPin, Briefcase, MessageCircle, User, Filter, Sparkles, ChevronRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Alumnus {
  id: string;
  name: string;
  batch: string;
  role: string;
  company: string;
  location: string;
  expertise: string[];
  isAvailableForReferral: boolean;
}

export function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const alumni: Alumnus[] = [
    {
      id: '1',
      name: 'Aarav Sharma',
      batch: '2019',
      role: 'Software Engineer',
      company: 'Google',
      location: 'Bengaluru',
      expertise: ['Cloud Computing', 'Go', 'Distributed Systems'],
      isAvailableForReferral: true
    },
    {
      id: '2',
      name: 'Ishita Patel',
      batch: '2018',
      role: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      expertise: ['Product Strategy', 'UX Research', 'Agile'],
      isAvailableForReferral: true
    },
    {
      id: '3',
      name: 'Rahul Verma',
      batch: '2020',
      role: 'Data Scientist',
      company: 'Meta',
      location: 'London, UK',
      expertise: ['PyTorch', 'NLP', 'Computer Vision'],
      isAvailableForReferral: false
    },
    {
      id: '4',
      name: 'Priya Sundar',
      batch: '2017',
      role: 'Senior Architect',
      company: 'Amazon',
      location: 'Hyderabad',
      expertise: ['System Design', 'AWS', 'Scalability'],
      isAvailableForReferral: true
    }
  ];

  const batches = ['all', '2017', '2018', '2019', '2020'];

  const handleConnect = (name: string) => {
    setToastMessage(`Connection request sent to ${name}!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredAlumni = alumni.filter(alumnis => {
    const matchesSearch = alumnis.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnis.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnis.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnis.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBatch = selectedBatch === 'all' || alumnis.batch === selectedBatch;

    return matchesSearch && matchesBatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <Globe className="h-5 w-5 text-brand-secondary" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Global Network</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Alumni <span className="text-gradient">Directory</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
          Connect with the prestigious network of CampusBuddy graduates.
          Leverage experience from pioneers across the global tech landscape.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[2.5rem] p-4 border border-white/50 mb-12 shadow-2xl relative z-10"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative group">
            <Search className="h-5 w-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name, role, company or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-medium"
            />
          </div>

          <div className="relative">
            <Filter className="h-4 w-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-bold text-sm appearance-none"
            >
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch === 'all' ? 'All Batches' : `Class of ${batch}`}</option>
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
        {filteredAlumni.map((alumnus) => (
          <motion.div
            key={alumnus.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            className="group relative bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 transition-all">
                    <User className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{alumnus.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <GraduationCap className="h-3 w-3" />
                      Batch {alumnus.batch}
                    </div>
                  </div>
                </div>
                {alumnus.isAvailableForReferral && (
                  <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Referral</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">{alumnus.role} at <span className="font-extrabold text-slate-900">{alumnus.company}</span></span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">{alumnus.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {alumnus.expertise.map((exp, index) => (
                  <span key={index} className="px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                    {exp}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleConnect(alumnus.name)}
                  className="flex-1 group relative py-4 bg-brand-surface text-white font-black rounded-2xl shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-[10px]">
                    <MessageCircle className="h-4 w-4" />
                    Connect
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredAlumni.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-slate-100">
            <Search className="h-10 w-10 text-slate-200" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No Alumni Found</h3>
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Status: Request Active</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

