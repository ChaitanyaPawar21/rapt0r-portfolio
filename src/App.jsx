import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/Home/ThemeContext';
import MotorcyclePortfolio from './MotorcyclePortfolio';
import FrontendFairingPage from './components/certification/frontend';
import BackendEnginePage from './components/certification/backend';
import DevOpsECUPage from './components/certification/DevOps';
import DataStructuresPage from './components/certification/dsa';
import ProfileSelector from './components/profile/ProfileSelector';
import AdminTerminal from './components/admin/AdminTerminal';

function App() {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Restore profile from sessionStorage on mount
  useEffect(() => {
    const raw = sessionStorage.getItem('selectedProfileData');
    if (!raw) {
      if (location.pathname !== '/profile' && location.pathname !== '/') {
        navigate('/profile', { replace: true });
      }
      return;
    }

    try {
      const profile = JSON.parse(raw);
      const minimal = {
        id: profile.id ?? null,
        name: profile.name ?? 'Guest',
        // normalize role to lowercase for consistent checks
        role: (profile.role ?? (profile.name ? profile.name.toLowerCase() : 'guest')).toLowerCase(),
        colorScheme: profile.colorScheme ?? profile.color ?? '#000000',
      };

      setCurrentProfile(minimal);
      setProfileLoaded(true);

      // Auto navigate to role-specific page if at root
      if (location.pathname === '/') {
        if (minimal.name.toLowerCase() === 'admin') {
          navigate('/admin', { replace: true });
        } else if (minimal.name.toLowerCase() === 'recruiter') {
          navigate('/recruiter', { replace: true });
        } else {
          navigate('/portfolio', { replace: true });
        }
      }
    } catch (e) {
      console.error('Failed to parse saved profile data', e);
      sessionStorage.removeItem('selectedProfileData');
      sessionStorage.removeItem('selectedProfileId');
      navigate('/profile', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called when user chooses a profile in ProfileSelector
  const handleProfileSelected = (profile) => {
    const minimal = {
      id: profile.id ?? null,
      name: profile.name ?? 'Guest',
      // normalize incoming role to lowercase
      role: (profile.role ?? (profile.name ? profile.name.toLowerCase() : 'guest')).toLowerCase(),
      colorScheme: profile.colorScheme ?? profile.color ?? '#000000',
    };

    sessionStorage.setItem('selectedProfileData', JSON.stringify(minimal));
    sessionStorage.setItem('selectedProfileId', minimal.id || '');

    setCurrentProfile(minimal);
    setProfileLoaded(true);

    // Navigate to role-specific landing page
    if (minimal.name.toLowerCase() === 'admin') {
      navigate('/admin', { replace: true });
    } else if (minimal.name.toLowerCase() === 'recruiter') {
      navigate('/recruiter', { replace: true });
    } else {
      navigate('/portfolio', { replace: true });
    }
  };

  const handleSwitchProfile = () => {
    sessionStorage.removeItem('selectedProfileData');
    sessionStorage.removeItem('selectedProfileId');
    setCurrentProfile(null);
    setProfileLoaded(false);
    navigate('/profile', { replace: true });
  };

  const handleOpenFile = (path) => console.log('Open file:', path);
  const handleOpenSection = (path) => console.log('Open section:', path);

  return (
    <ThemeProvider currentProfile={currentProfile}>
      {profileLoaded && currentProfile && (
        <button
          onClick={handleSwitchProfile}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white"
          title="Switch profile"
        >
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: currentProfile.colorScheme }}
          />
          <span className="text-sm font-medium">{currentProfile.name}</span>
        </button>
      )}

      <Routes>
        <Route path="/" element={<ProfileSelector onProfileSelected={handleProfileSelected} />} />
        <Route path="/profile" element={<ProfileSelector onProfileSelected={handleProfileSelected} />} />

        {/* Certification routes */}
        <Route path="/frontend-fairing" element={<FrontendFairingPage />} />
        <Route path="/reliable-honda" element={<BackendEnginePage />} />
        <Route path="/devops-ecu" element={<DevOpsECUPage />} />
        <Route path="/data-structures" element={<DataStructuresPage />} />

        {/* Role-specific routes */}
        <Route
          path="/admin"
          element={<AdminTerminal onOpenFile={handleOpenFile} onOpenSection={handleOpenSection} />}
        />
        <Route path="/recruiter" element={<MotorcyclePortfolio profile={currentProfile} />} />
        <Route path="/portfolio" element={<MotorcyclePortfolio profile={currentProfile} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;