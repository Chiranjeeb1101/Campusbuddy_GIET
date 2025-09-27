import React from 'react';
import { MessageCircle, Users, BookOpen, TrendingUp, Clock, Star } from 'lucide-react';
import type { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const quickActions = [
    {
      id: 'doubt' as Page,
      title: 'Ask AI Assistant',
      description: 'Get instant help with your academic doubts',
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      id: 'peers' as Page,
      title: 'Find Mentors',
      description: 'Connect with experienced peers and seniors',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    },
    {
      id: 'resources' as Page,
      title: 'Browse Resources',
      description: 'Access shared notes, projects, and materials',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
    },
  ];

  const recentActivity = [
    { type: 'doubt', title: 'Database Normalization Help', time: '2 hours ago', status: 'resolved' },
    { type: 'resource', title: 'Data Structures Notes', time: '5 hours ago', status: 'downloaded' },
    { type: 'mentor', title: 'Connected with Sarah M.', time: '1 day ago', status: 'active' },
  ];

  const stats = [
    { label: 'Doubts Resolved', value: '24', icon: MessageCircle, change: '+12%' },
    { label: 'Mentors Connected', value: '8', icon: Users, change: '+25%' },
    { label: 'Resources Accessed', value: '156', icon: BookOpen, change: '+8%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex! 👋</h1>
        <p className="text-gray-600">Ready to continue your learning journey? Here's what you can do today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} this week
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`group p-8 bg-gradient-to-br ${action.color} ${action.hoverColor} rounded-2xl text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
            >
              <Icon className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-2">{action.title}</h3>
              <p className="text-white/90">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'resolved' ? 'bg-green-500' :
                  activity.status === 'downloaded' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  activity.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  activity.status === 'downloaded' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}