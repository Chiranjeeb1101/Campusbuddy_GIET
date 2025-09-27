import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AskDoubt } from './components/AskDoubt';
import { PeerConnect } from './components/PeerConnect';
import { ResourceHub } from './components/ResourceHub';
import { LandingPage } from './components/LandingPage';
import { AlumniDirectory } from './components/AlumniDirectory';
import { Events } from './components/Events';
import { Mentorship } from './components/Mentorship';
import { Donations } from './components/Donations';
import { Careers } from './components/Careers';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './hooks/useAuth';

export type Page = 'landing' | 'dashboard' | 'doubt' | 'peers' | 'resources' | 'alumni' | 'events' | 'mentorship' | 'donations' | 'careers';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [demoMode, setDemoMode] = useState(false); // Show login interface first
  const { user, profile, loading, isAuthenticated, setDemoUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    if (!isAuthenticated && !isLoggedIn) {
      return <LandingPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'doubt':
        return <AskDoubt />;
      case 'peers':
        return <PeerConnect />;
      case 'resources':
        return <ResourceHub />;
      case 'alumni':
        return <AlumniDirectory />;
      case 'events':
        return <Events />;
      case 'mentorship':
        return <Mentorship />;
      case 'donations':
        return <Donations />;
      case 'careers':
        return <Careers />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  if (loading && !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CampusBuddy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {(isAuthenticated || isLoggedIn) && (
        <Header 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      )}
      {renderPage()}
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;