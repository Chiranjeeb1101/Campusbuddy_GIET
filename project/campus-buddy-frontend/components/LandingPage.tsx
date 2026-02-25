import { GraduationCap, MessageCircle, Users, BookOpen, ArrowRight, Sparkles, Brain, Code, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onLogin: () => void;
  onNavigate: (page: any) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function LandingPage({ onLogin, onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Doubt Solver',
      description: 'Instant academic clarity powered by Google Gemini AI. Complex concepts simplified in seconds.',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Peer Mentorship',
      description: 'Don\'t just study, collaborate. Match with peers who share your goals and academic interests.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Resource Hub',
      description: 'A curated library of notes, research, and project materials. Knowledge sharing reinvented.',
      color: 'from-emerald-400 to-teal-500'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-mesh-gradient opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-200 shadow-sm mb-4">
              <Sparkles className="h-4 w-4 text-brand-secondary" />
              <span className="text-sm font-medium text-slate-600">Smart Academic Success</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900"
            >
              Master Your Studies with <br />
              <span className="text-gradient">CampusBuddy</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Elevate your learning experience with AI-powered insights,
              peer collaboration, and a curated repository of knowledge.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onLogin}
                className="group relative px-8 py-4 bg-brand-primary text-white font-semibold rounded-2xl shadow-premium hover:shadow-indigo-500/25 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started for Free
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>

              <button
                onClick={() => onNavigate('peers')}
                className="px-8 py-4 bg-white/80 backdrop-blur-md text-slate-700 font-semibold rounded-2xl border border-slate-200 hover:bg-white transition-all shadow-sm"
              >
                Explore Community
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-16 flex justify-center items-center gap-8 grayscale opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 overflow-hidden">
              <div className="flex items-center gap-2"><Brain className="h-6 w-6" /> <span className="font-bold">Gemini AI</span></div>
              <div className="flex items-center gap-2"><Rocket className="h-6 w-6" /> <span className="font-bold">NextGen</span></div>
              <div className="flex items-center gap-2"><Code className="h-6 w-6" /> <span className="font-bold">OpenAPI</span></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Decorative Icons */}
        <div className="absolute top-1/4 left-10 animate-float opacity-20 hidden lg:block">
          <BookOpen className="h-12 w-12 text-brand-primary" />
        </div>
        <div className="absolute bottom-1/4 right-10 animate-float opacity-20 hidden lg:block" style={{ animationDelay: '1.5s' }}>
          <MessageCircle className="h-12 w-12 text-brand-accent" />
        </div>
      </section>

      {/* Stats/Features Highlight */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-10 glass-card rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-brand-surface rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>
            <div className="relative z-10 text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white">
                Ready to transform your <br />
                <span className="text-brand-secondary">academic journey?</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                Join thousands of students who are already using CampusBuddy to unlock their full potential.
              </p>
              <button
                onClick={onLogin}
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Start Learning Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <div className="flex justify-center items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-brand-primary" />
            <span className="font-bold text-slate-800">CampusBuddy</span>
          </div>
          <p>© 2026 CampusBuddy. Engineered for Academic Excellence.</p>
        </div>
      </footer>
    </div>
  );
}
