import React, { useState } from 'react';
import { Search, Upload, Download, BookOpen, FileText, Star, Eye, Calendar, User, Filter } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'notes' | 'assignment' | 'project' | 'lab' | 'reference';
  uploadedBy: string;
  uploadDate: Date;
  downloads: number;
  rating: number;
  views: number;
  fileSize: string;
  tags: string[];
}

export function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Data Structures Notes',
      description: 'Comprehensive notes covering all data structures from arrays to advanced trees. Includes code examples and practice problems.',
      subject: 'Computer Science',
      type: 'notes',
      uploadedBy: 'Sarah Mitchell',
      uploadDate: new Date('2024-01-15'),
      downloads: 234,
      rating: 4.8,
      views: 567,
      fileSize: '2.3 MB',
      tags: ['data-structures', 'algorithms', 'programming'],
    },
    {
      id: '2',
      title: 'Database Design Project Template',
      description: 'Complete project template for database design course. Includes ER diagrams, normalization examples, and SQL queries.',
      subject: 'Database Systems',
      type: 'project',
      uploadedBy: 'Emily Rodriguez',
      uploadDate: new Date('2024-01-12'),
      downloads: 189,
      rating: 4.9,
      views: 423,
      fileSize: '1.8 MB',
      tags: ['database', 'sql', 'design', 'project'],
    },
    {
      id: '3',
      title: 'Calculus Practice Problems',
      description: 'Collection of solved calculus problems with step-by-step solutions. Great for exam preparation.',
      subject: 'Mathematics',
      type: 'assignment',
      uploadedBy: 'Alex Chen',
      uploadDate: new Date('2024-01-10'),
      downloads: 156,
      rating: 4.7,
      views: 345,
      fileSize: '987 KB',
      tags: ['calculus', 'mathematics', 'problems', 'solutions'],
    },
    {
      id: '4',
      title: 'Physics Lab Manual - Mechanics',
      description: 'Complete lab manual for physics mechanics experiments. Includes theory, procedures, and sample calculations.',
      subject: 'Physics',
      type: 'lab',
      uploadedBy: 'David Park',
      uploadDate: new Date('2024-01-08'),
      downloads: 98,
      rating: 4.6,
      views: 234,
      fileSize: '3.1 MB',
      tags: ['physics', 'lab', 'mechanics', 'experiments'],
    },
    {
      id: '5',
      title: 'Machine Learning Cheat Sheet',
      description: 'Quick reference guide for ML algorithms, formulas, and key concepts. Perfect for exam preparation.',
      subject: 'Machine Learning',
      type: 'reference',
      uploadedBy: 'Lisa Wang',
      uploadDate: new Date('2024-01-05'),
      downloads: 312,
      rating: 4.9,
      views: 678,
      fileSize: '654 KB',
      tags: ['machine-learning', 'algorithms', 'reference', 'cheat-sheet'],
    },
    {
      id: '6',
      title: 'Web Development Starter Kit',
      description: 'Complete starter template for web development projects. Includes HTML, CSS, JavaScript boilerplate and best practices.',
      subject: 'Web Development',
      type: 'project',
      uploadedBy: 'Mark Johnson',
      uploadDate: new Date('2024-01-03'),
      downloads: 445,
      rating: 4.8,
      views: 789,
      fileSize: '1.2 MB',
      tags: ['web-development', 'html', 'css', 'javascript', 'template'],
    },
  ];

  const subjects = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Database Systems', 'Machine Learning', 'Web Development'];
  const types = ['all', 'notes', 'assignment', 'project', 'lab', 'reference'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes': return BookOpen;
      case 'assignment': return FileText;
      case 'project': return BookOpen;
      case 'lab': return FileText;
      case 'reference': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notes': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'lab': return 'bg-orange-100 text-orange-800';
      case 'reference': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Hub</h1>
          <p className="text-gray-600">Discover and share academic resources with your peers.</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Resource</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources, subjects, or tags..."
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
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          
          return (
            <div key={resource.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TypeIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-md capitalize ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{resource.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">{resource.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500">
                  <span className="font-medium">{resource.subject}</span> • {resource.fileSize}
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Download className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Downloads</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{resource.downloads}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Eye className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Views</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{resource.views}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Uploaded</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {resource.uploadDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{resource.uploadedBy}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Resource</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* Upload Modal Placeholder */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Resource</h2>
            <p className="text-gray-600 mb-6">Upload functionality will be integrated with Firebase Storage in the full implementation.</p>
            <button
              onClick={() => setShowUploadModal(false)}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}