import React, { useState } from 'react';
import { GraduationCap, MessageCircle, Users, BookOpen, LogOut, Home, UserCheck, Calendar, Heart, Briefcase, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function Header({ currentPage, onNavigate, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Home },
    { id: 'doubt' as Page, label: 'Ask AI', icon: MessageCircle },
    { id: 'peers' as Page, label: 'Mentors', icon: Users },
    { id: 'resources' as Page, label: 'Resources', icon: BookOpen },
    { id: 'alumni' as Page, label: 'Alumni', icon: UserCheck },
    { id: 'events' as Page, label: 'Events', icon: Calendar },
    { id: 'mentorship' as Page, label: 'Mentorship', icon: Heart },
    { id: 'donations' as Page, label: 'Donations', icon: Heart },
    { id: 'careers' as Page, label: 'Careers', icon: Briefcase },
  ];

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-white/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="p-2 bg-brand-primary rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gradient tracking-tight">
              CampusBuddy
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/50">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-white text-indigo-700 shadow-premium'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/50'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-semibold text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop More Menu & Logout */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-white/50 transition-all duration-300 font-semibold text-sm">
                <Menu className="h-4 w-4" />
                <span>More</span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-56 glass-card rounded-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 p-2 overflow-hidden">
                {navItems.slice(4).map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-semibold text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200" />

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-slate-500 hover:text-red-500 transition-all px-4 py-2.5 rounded-xl hover:bg-red-50 font-semibold text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-slate-600 hover:text-indigo-600 transition-all"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-6 border-t border-slate-100 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 pt-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-4 rounded-2xl transition-all duration-200 ${isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white border border-slate-100 text-slate-600 hover:border-indigo-100'
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 p-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm tracking-tight col-span-2 border border-red-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
