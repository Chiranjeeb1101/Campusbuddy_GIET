import React from 'react';
import { GraduationCap, MessageCircle, Users, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Powered Doubt Resolution',
      description: 'Get instant answers to your academic questions using advanced Gemini AI technology.',
    },
    {
      icon: Users,
      title: 'Smart Peer Matching',
      description: 'Connect with the right mentors and study partners based on subjects and expertise.',
    },
    {
      icon: BookOpen,
      title: 'Resource Sharing Hub',
      description: 'Access and share verified academic materials, notes, and project resources.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-8">
              <GraduationCap className="h-16 w-16 text-white" />
              <span className="text-5xl font-bold text-white">CampusBuddy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Smart Peer Support for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                College Success
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Connect with mentors, get AI-powered academic help, and access verified resources 
              all in one intelligent platform designed for students.
            </p>
            
            <button
              onClick={onLogin}
              className="inline-flex items-center space-x-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <div className="mt-6 flex items-center justify-center space-x-2 text-blue-200">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Powered by Google Gemini AI & Firebase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines AI technology with peer collaboration to create 
              the ultimate academic support system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your academic journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students already using CampusBuddy to excel in their studies.
          </p>
          <button
            onClick={onLogin}
            className="inline-flex items-center space-x-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Start Learning Today</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}