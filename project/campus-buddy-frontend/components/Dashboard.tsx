import { MessageCircle, Users, BookOpen, TrendingUp, Clock, ChevronRight, Sparkles, Zap, Shield, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  userName?: string;
}

export function Dashboard({ onNavigate, userName }: DashboardProps) {
  const quickActions = [
    {
      id: 'doubt' as Page,
      title: 'AI Assistant',
      description: 'Instant resolution for your academic doubts',
      icon: MessageCircle,
      color: 'from-blue-500 to-indigo-600',
      tag: 'New'
    },
    {
      id: 'peers' as Page,
      title: 'Peer Connect',
      description: 'Connect with mentors and study groups',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      tag: 'Popular'
    },
    {
      id: 'resources' as Page,
      title: 'Resource Hub',
      description: 'Access and share academic materials',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      tag: 'Updated'
    },
  ];

  const stats = [
    { label: 'Study Progress', value: '85%', icon: Target, change: '+12%', color: 'text-blue-600' },
    { label: 'Network', value: '12', icon: Shield, change: '+25%', color: 'text-purple-600' },
    { label: 'Resources', value: '1.2k', icon: Zap, change: '+8%', color: 'text-emerald-600' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-5 w-5 text-brand-secondary" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Study Mode: Active</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Welcome back <span className="text-gradient">{userName || 'Student'}</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium mt-2 max-w-2xl">
          Your academic journey is on track. You've made significant progress today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={item}
              className="group relative p-8 glass-card rounded-[2rem] border border-white/50 hover:shadow-premium transition-all duration-500"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                  <div className="flex items-center gap-1.5 mt-2 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full w-fit">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-[10px] font-black uppercase tracking-wider">{stat.change} Gain</span>
                  </div>
                </div>
                <div className={`p-4 bg-slate-50 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dynamic Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions - Primary Focus */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between mb-2 px-2">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Priority Modules</h2>
            <Target className="h-4 w-4 text-slate-400" />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-6"
          >
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  variants={item}
                  onClick={() => onNavigate(action.id)}
                  className={`group relative p-10 bg-gradient-to-br ${action.color} rounded-[2.5rem] text-white overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-500 ${idx === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
                  <div className="absolute top-6 right-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                    {action.tag}
                  </div>

                  <div className="relative z-10 flex flex-col items-start text-left">
                    <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-8 group-hover:rotate-12 transition-transform duration-500">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-black mb-3 tracking-tight">{action.title}</h3>
                    <p className="text-white/80 font-medium text-lg leading-relaxed max-w-sm">
                      {action.description}
                    </p>
                    <div className="mt-8 flex items-center gap-2 font-bold text-sm tracking-tight group-hover:translate-x-2 transition-transform">
                      Initialize Interface <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-2 px-2">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Activity</h2>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[2.5rem] p-4 border border-white/50"
          >
            <div className="space-y-2">
              {[
                { type: 'doubt' as Page, title: 'Calculus IV Synchronization', time: '2m ago', state: 'SUCCESS' },
                { type: 'resources' as Page, title: 'OS Kernel Documentation', time: '14m ago', state: 'SYNCED' },
                { type: 'peers' as Page, title: 'Neural Link Established', time: '1h ago', state: 'ACTIVE' },
                { type: 'doubt' as Page, title: 'Physics Vector Analysis', time: '4h ago', state: 'STORED' },
              ].map((activity, index) => (
                <div
                  key={index}
                  onClick={() => onNavigate(activity.type)}
                  className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-all rounded-3xl cursor-pointer group"
                >
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-brand-primary' : 'bg-slate-200'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900 leading-tight">{activity.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{activity.time} — {activity.state}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-primary transition-all">
              View Extended logs
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
