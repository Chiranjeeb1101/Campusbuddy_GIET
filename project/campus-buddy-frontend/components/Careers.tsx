import { useState } from 'react';
import { Briefcase, MapPin, Sparkles, Send, UserCheck, Search, ChevronRight, Zap, Building2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  salary: string;
  postedAt: string;
  referralAvailable: boolean;
  tags: string[];
  description: string;
}

export function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const jobs: JobListing[] = [
    {
      id: 'j1',
      title: 'Senior Frontend Engineer',
      company: 'NextGen Labs',
      location: 'Remote, Global',
      type: 'Full-time',
      salary: '$120k - $160k',
      postedAt: '2 days ago',
      referralAvailable: true,
      tags: ['React', 'TypeScript', 'Tailwind'],
      description: 'Join our core platform team to build high-performance web experiences. You will lead the migration to Next.js 14 and establish design system best practices.'
    },
    {
      id: 'j2',
      title: 'Data Analyst Associate',
      company: 'DataWorks AI',
      location: 'Pune, India',
      type: 'Full-time',
      salary: '₹12L - ₹18L',
      postedAt: '5 hours ago',
      referralAvailable: true,
      tags: ['Python', 'SQL', 'Tableau'],
      description: 'Help us derive insights from massive academic datasets. You will work closely with product managers to define tracking strategies and build internal dashboards.'
    },
    {
      id: 'j3',
      title: 'Product Design Intern',
      company: 'Creatify',
      location: 'Bengaluru / Hybrid',
      type: 'Internship',
      salary: '₹40k / month',
      postedAt: '1 week ago',
      referralAvailable: false,
      tags: ['Figma', 'Prototyping', 'User Testing'],
      description: 'A 6-month internship focused on refining our mobile app interface. Ideal for students with a strong portfolio in visual design and human factors.'
    },
    {
      id: 'j4',
      title: 'Cloud Infrastructure Architect',
      company: 'BlueCloud Systems',
      location: 'Remote, US',
      type: 'Contract',
      salary: '$100/hr',
      postedAt: '3 days ago',
      referralAvailable: true,
      tags: ['AWS', 'Terraform', 'Kubernetes'],
      description: 'Design and implement resilient cloud architectures for our enterprise clients. Strong focus on security automation and cost optimization.'
    }
  ];

  const handleApply = (title: string) => {
    setToastMessage(`Application initiated for ${title}. Redirecting...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReferral = (title: string, company: string) => {
    setToastMessage(`Referral request sent to alumni at ${company} for ${title}.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="h-5 w-5 text-brand-secondary" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Career Portal</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Opportunity <span className="text-gradient">Hub</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
          Unlock your potential with exclusive job listings and direct alumni referrals.
          Where academic dreams meet industry reality.
        </p>
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
            placeholder="Search by role, company, or skills (e.g. Python, AWS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-medium"
          />
        </div>
      </motion.div>

      <div className="space-y-8">
        {filteredJobs.map((job) => (
          <motion.div
            layout
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            <div className="p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 transition-all">
                      <Building2 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-0.5">{job.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-300" />
                      <span className="text-xs font-bold tracking-tight">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4 text-slate-300" />
                      <span className="text-xs font-bold tracking-tight">{job.postedAt}</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Zap className="h-4 w-4" />
                      <span className="text-xs font-black tracking-widest uppercase">{job.salary}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 line-clamp-2 max-w-3xl">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:w-64">
                  <button
                    onClick={() => handleApply(job.title)}
                    className="group relative py-4 bg-brand-surface text-white font-black rounded-2xl shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3 tracking-[0.15em] uppercase text-[10px]">
                      <Send className="h-4 w-4" />
                      Apply Now
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {job.referralAvailable ? (
                    <button
                      onClick={() => handleReferral(job.title, job.company)}
                      className="py-4 bg-white border-2 border-indigo-100 text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 flex items-center justify-center gap-3 tracking-[0.15em] uppercase text-[10px]"
                    >
                      <UserCheck className="h-4 w-4" />
                      Get Referral
                    </button>
                  ) : (
                    <div className="py-4 bg-slate-50 text-slate-300 font-black rounded-2xl border border-slate-100 flex items-center justify-center gap-3 tracking-[0.15em] uppercase text-[10px] cursor-not-allowed">
                      Direct Apply Only
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 p-8 flex gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-6 w-6 text-slate-200" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-slate-100">
            <Briefcase className="h-10 w-10 text-slate-200" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No Openings Found</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Try searching for other keywords</p>
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
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-black tracking-tight">{toastMessage}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Status: Pipeline Updated</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

