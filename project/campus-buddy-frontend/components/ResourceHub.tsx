import { useState } from 'react';
import { Search, Upload, Download, BookOpen, FileText, Star, Eye, Share2, Layers, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDownload = (title: string) => {
    setToastMessage(`Downloading "${title}"... check your browser downloads!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpload = () => {
    setShowUploadModal(false);
    setToastMessage(`Resource successfully uploaded to the knowledge base!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Data Structures Notes',
      description: 'Comprehensive notes covering all data structures from arrays to advanced trees. Perfect for quick revision.',
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
      title: 'Database Management Project',
      description: 'Project template for database design. Includes ER diagrams and SQL scripts for common operations.',
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
      description: 'Collection of calculus problems with step-by-step solutions. Essential for exam preparation.',
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
      title: 'Physics Lab Guide',
      description: 'Standard lab manual for mechanics experiments. Includes theoretical foundations and calculation models.',
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
      case 'notes': return Layers;
      case 'assignment': return FileText;
      case 'project': return Zap;
      case 'lab': return BookOpen;
      case 'reference': return Share2;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notes': return 'text-indigo-600 bg-indigo-50';
      case 'assignment': return 'text-emerald-600 bg-emerald-50';
      case 'project': return 'text-purple-600 bg-purple-50';
      case 'lab': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
      >
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Resource <span className="text-gradient">Hub</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">Access and share academic materials with your peers.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowUploadModal(true)}
          className="mt-6 md:mt-0 bg-brand-surface text-white font-black px-8 py-4 rounded-[1.5rem] shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center space-x-3 overflow-hidden group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Upload className="h-5 w-5 relative z-10" />
          <span className="relative z-10 uppercase tracking-widest text-xs">Upload Resource</span>
        </motion.button>
      </motion.div>

      {/* Persistent Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[2.5rem] p-4 border border-white/50 mb-12 shadow-2xl"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative group">
            <Search className="h-5 w-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-medium"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-bold text-sm appearance-none"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject === 'all' ? 'All Subjects' : subject}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white transition-all text-slate-900 font-bold text-sm appearance-none"
          >
            {types.map(type => (
              <option key={type} value={type}>{type === 'all' ? 'All Types' : type.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Assets Grid */}
      <motion.div
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
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);

          return (
            <motion.div
              key={resource.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="group relative bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${getTypeColor(resource.type)} shadow-sm group-hover:scale-110 transition-transform`}>
                    <TypeIcon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{resource.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-indigo-600 transition-colors">{resource.title}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed mb-6 font-medium line-clamp-2">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>{resource.subject}</span>
                  <span className="bg-slate-100 px-2 py-1 rounded-md">{resource.fileSize}</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="px-8 py-4 bg-slate-50/50 grid grid-cols-2 gap-4 border-y border-slate-50">
                <div className="flex items-center gap-2">
                  <Download className="h-3 w-3 text-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500">{resource.downloads} Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-3 w-3 text-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500">{resource.views} Views</span>
                </div>
              </div>

              {/* Action */}
              <div className="p-8">
                <button
                  onClick={() => handleDownload(resource.title)}
                  className="w-full py-4 bg-brand-primary/5 hover:bg-brand-primary text-brand-primary hover:text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  Download File
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredResources.length === 0 && (
        <div className="text-center py-24">
          <Layers className="h-20 w-20 text-slate-100 mx-auto mb-6" />
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No Resources Found</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Try adjusting your filters</p>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border border-white/20 relative"
            >
              <div className="absolute top-8 right-8 cursor-pointer text-slate-300 hover:text-slate-900" onClick={() => setShowUploadModal(false)}>
                <Share2 className="h-6 w-6 rotate-45" />
              </div>
              <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-8">
                <Upload className="h-10 w-10 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Upload Resource</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Share your academic materials with the community. Please ensure the file is relevant and correctly categorized.
              </p>
              <button
                onClick={handleUpload}
                className="w-full py-5 bg-brand-surface text-white font-black rounded-3xl hover:shadow-xl transition-all uppercase tracking-[0.2em] text-xs"
              >
                Upload File
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-black tracking-tight">{toastMessage}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Status: Success</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
