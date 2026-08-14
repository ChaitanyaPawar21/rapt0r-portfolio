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
import IntroSequence from './components/IntroSequence';

// ─── Helpers ────────────────────────────────────────────────────────────────

const SESSION_KEYS = {
  profileData: 'selectedProfileData',
  profileId: 'selectedProfileId',
};

/**
 * Normalise a raw profile object into the minimal shape the app needs.
 * Works whether the profile comes from sessionStorage or the selector.
 */
const normaliseProfile = (raw) => ({
  id: raw.id ?? null,
  name: raw.name ?? 'Guest',
  role: (raw.role ?? raw.name ?? 'guest').toLowerCase(),
  colorScheme: raw.colorScheme ?? raw.color ?? '#000000',
});

/** Map a profile to its landing route. */
const landingRoute = (profile) => {
  switch (profile.name.toLowerCase()) {
    case 'admin':     return '/admin';
    case 'recruiter': return '/recruiter';
    case 'stalker':   return '/recruiter';
    default:          return '/portfolio';
  }
};

const saveProfile = (profile) => {
  sessionStorage.setItem(SESSION_KEYS.profileData, JSON.stringify(profile));
  sessionStorage.setItem(SESSION_KEYS.profileId, profile.id ?? '');
};

const clearProfile = () => {
  sessionStorage.removeItem(SESSION_KEYS.profileData);
  sessionStorage.removeItem(SESSION_KEYS.profileId);
};

// ─── ProfileSwitcher button ──────────────────────────────────────────────────

const ProfileSwitcher = ({ profile, onSwitch }) => (
  <button
    onClick={onSwitch}
    title="Switch profile"
    className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm font-medium"
  >
    <span
      className="w-6 h-6 rounded-full shrink-0"
      style={{ backgroundColor: profile.colorScheme }}
    />
    {profile.name}
  </button>
);

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  // ── Restore session on mount ──────────────────────────────────────────────
  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEYS.profileData);

    if (!raw) {
      const isPublicPath = ['/', '/profile'].includes(location.pathname);
      if (!isPublicPath) navigate('/profile', { replace: true });
      return;
    }

    try {
      const profile = normaliseProfile(JSON.parse(raw));
      setCurrentProfile(profile);

      // Only auto-redirect when landing on root; deep-links are preserved.
      if (location.pathname === '/') {
        navigate(landingRoute(profile), { replace: true });
      }
    } catch {
      clearProfile();
      navigate('/profile', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleProfileSelected = (raw) => {
    const profile = normaliseProfile(raw);
    saveProfile(profile);
    setCurrentProfile(profile);

    const hasSeen = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeen) {
      setShowIntro(true);
    }
    navigate(landingRoute(profile), { replace: true });
  };

  const handleSwitchProfile = () => {
    clearProfile();
    setCurrentProfile(null);
    navigate('/profile', { replace: true });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <ThemeProvider currentProfile={currentProfile}>
      {showIntro && (
        <IntroSequence onComplete={() => setShowIntro(false)} />
      )}
      {currentProfile && (
        <ProfileSwitcher profile={currentProfile} onSwitch={handleSwitchProfile} />
      )}

      <Routes>
        {/* Auth / Profile selection */}
        <Route
          path="/"
          element={<ProfileSelector onProfileSelected={handleProfileSelected} />}
        />
        <Route
          path="/profile"
          element={<ProfileSelector onProfileSelected={handleProfileSelected} />}
        />

        {/* Certification pages */}
        <Route path="/frontend-fairing" element={<FrontendFairingPage />} />
        <Route path="/reliable-honda"   element={<BackendEnginePage />} />
        <Route path="/devops-ecu"       element={<DevOpsECUPage />} />
        <Route path="/data-structures"  element={<DataStructuresPage />} />

        {/* Role-based landing pages */}
        <Route
          path="/admin"
          element={
            <AdminTerminal
              onOpenFile={(path) => console.log('Open file:', path)}
              onOpenSection={(path) => console.log('Open section:', path)}
            />
          }
        />
        <Route path="/recruiter" element={<MotorcyclePortfolio profile={currentProfile} />} />
        <Route path="/stalker" element={<MotorcyclePortfolio profile={currentProfile} />} />
        <Route path="/portfolio" element={<MotorcyclePortfolio profile={currentProfile} />} />
      </Routes>
    </ThemeProvider>
  );
}