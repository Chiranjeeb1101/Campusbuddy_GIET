import React, { useState } from 'react';
import { GraduationCap, MessageCircle, Users, BookOpen, LogOut, Home, UserCheck, Calendar, Heart, Briefcase, Menu, X } from 'lucide-react';
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
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CampusBuddy
            </span>
          </div>
          
          {/* Desktop Navigation - Show first 4 items */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop More Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                <Menu className="h-4 w-4" />
                <span className="font-medium text-sm">More</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navItems.slice(4).map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 pt-4">
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
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile Logout */}
              <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-3 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 col-span-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}