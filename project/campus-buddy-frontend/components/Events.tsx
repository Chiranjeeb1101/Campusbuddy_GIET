import { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  status: 'upcoming' | 'past';
  attendees: number;
  description: string;
  isVirtual: boolean;
}

export function Events() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const events: Event[] = useMemo(() => ([
    {
      id: 'e1',
      title: 'Annual Alumni Networking Meet',
      date: '2025-10-15',
      location: 'Campus Multi-Purpose Hall',
      type: 'Networking',
      status: 'upcoming',
      attendees: 156,
      description: 'The largest annual gathering of alumni, featuring industry panels and 1-on-1 networking sessions.',
      isVirtual: false
    },
    {
      id: 'e2',
      title: 'Mentorship Program Induction',
      date: '2025-08-30',
      location: 'Virtual Portal',
      type: 'Mentorship',
      status: 'past',
      attendees: 420,
      description: 'Kick-off session for the 2025-26 mentorship cohort with guest speakers from Fortune 500 companies.',
      isVirtual: true
    },
    {
      id: 'e3',
      title: 'Gala Fundraising Dinner',
      date: '2025-12-05',
      location: 'Grand Regency, City Centre',
      type: 'Fundraising',
      status: 'upcoming',
      attendees: 89,
      description: 'An evening of celebration and philanthropy to support the new Innovation Lab initiatives.',
      isVirtual: false
    },
    {
      id: 'e4',
      title: 'Global Tech Careers Symposium',
      date: '2025-11-20',
      location: 'Virtual Portal',
      type: 'Careers',
      status: 'upcoming',
      attendees: 1200,
      description: '24-hour global symposium featuring recruiters from top tech hubs worldwide.',
      isVirtual: true
    }
  ]), []);

  const handleRegister = (title: string) => {
    setToastMessage(`Confirmed: Registered for ${title}!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredEvents = events.filter((e) => e.status === tab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-5 w-5 text-brand-secondary" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Academic Calendar</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2">
            Campus <span className="text-gradient">Events</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-xl">
            Stay connected with the pulse of the community through our curated events and workshops.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${tab === 'upcoming'
              ? 'bg-white text-slate-900 shadow-premium'
              : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setTab('past')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${tab === 'past'
              ? 'bg-white text-slate-900 shadow-premium'
              : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            Past Logs
          </button>
        </div>
      </motion.div>

      <motion.div
        layout
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
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">{event.type}</span>
                      <p className="text-sm font-black text-slate-900 mt-0.5">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  {event.isVirtual && (
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg flex items-center gap-2 border border-emerald-100 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Virtual</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10 pb-8 border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-slate-300" />
                    <span className="text-xs font-bold text-slate-400 truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-slate-300" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{event.attendees} Registered</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  {tab === 'upcoming' ? (
                    <button
                      onClick={() => handleRegister(event.title)}
                      className="flex-1 group relative py-4 bg-brand-surface text-white font-black rounded-2xl shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3 tracking-[0.15em] uppercase text-xs">
                        <CheckCircle className="h-4 w-4" />
                        Join Event
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ) : (
                    <button className="flex-1 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl border border-slate-100 cursor-not-allowed text-xs uppercase tracking-widest">
                      Event Concluded
                    </button>
                  )}
                  <button className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-95 group">
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-black tracking-tight">{toastMessage}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Status: Registered</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

