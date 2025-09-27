import React, { useState } from 'react';
import { Search, Filter, Star, MessageCircle, User, Clock, BookOpen } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  year: string;
  subjects: string[];
  rating: number;
  responseTime: string;
  helpedStudents: number;
  expertise: string[];
  isOnline: boolean;
  bio: string;
}

export function PeerConnect() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      year: '4th Year',
      subjects: ['Computer Science', 'Data Structures', 'Algorithms'],
      rating: 4.9,
      responseTime: '< 30 min',
      helpedStudents: 127,
      expertise: ['Programming', 'Problem Solving', 'Interview Prep'],
      isOnline: true,
      bio: 'CS senior with internship experience at tech companies. Love helping juniors with coding challenges and career guidance.',
    },
    {
      id: '2',
      name: 'Alex Chen',
      year: '3rd Year',
      subjects: ['Mathematics', 'Statistics', 'Machine Learning'],
      rating: 4.8,
      responseTime: '< 1 hour',
      helpedStudents: 89,
      expertise: ['Math Concepts', 'ML Fundamentals', 'Research'],
      isOnline: false,
      bio: 'Math enthusiast working on ML research. Specialized in making complex mathematical concepts easy to understand.',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      year: '4th Year',
      subjects: ['Database Systems', 'Web Development', 'Software Engineering'],
      rating: 4.7,
      responseTime: '< 45 min',
      helpedStudents: 156,
      expertise: ['Database Design', 'Full-Stack Development', 'System Design'],
      isOnline: true,
      bio: 'Full-stack developer with experience in multiple frameworks. Passionate about teaching practical programming skills.',
    },
    {
      id: '4',
      name: 'David Park',
      year: '3rd Year',
      subjects: ['Physics', 'Engineering Mathematics', 'Electronics'],
      rating: 4.6,
      responseTime: '< 2 hours',
      helpedStudents: 73,
      expertise: ['Physics Problems', 'Circuit Analysis', 'Engineering Math'],
      isOnline: true,
      bio: 'Engineering student with strong foundation in physics and mathematics. Great at breaking down complex problems.',
    },
  ];

  const subjects = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Database Systems', 'Web Development', 'Machine Learning'];
  const years = ['all', '2nd Year', '3rd Year', '4th Year'];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || 
                          mentor.subjects.some(subject => subject.includes(selectedSubject));
    
    const matchesYear = selectedYear === 'all' || mentor.year === selectedYear;
    
    return matchesSearch && matchesSubject && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Mentor</h1>
        <p className="text-gray-600">Connect with experienced peers and seniors who can help guide your academic journey.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search mentors, subjects, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year === 'all' ? 'All Years' : year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Profile Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{mentor.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{mentor.bio}</p>
              
              {/* Subjects */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.subjects.slice(0, 2).map((subject, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
                    {subject}
                  </span>
                ))}
                {mentor.subjects.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                    +{mentor.subjects.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 bg-gray-50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">Response Time</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{mentor.responseTime}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <BookOpen className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">Students Helped</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{mentor.helpedStudents}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Connect & Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}