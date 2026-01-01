// /mnt/data/ProfileSelector.js
import React, { useState } from 'react';
import { User, Check, Edit2 } from 'lucide-react';
import { DEFAULT_PROFILES } from './profileData';

// import the engine loader (named export) from your motorcycle file
import { SmoothRPMMeter } from '../../MotorcyclePortfolio';

const ProfileSelector = ({ onProfileSelected }) => {
  const [profiles] = useState(DEFAULT_PROFILES);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedProfileId, setSavedProfileId] = useState(null);

  // NOTE: intentionally no useEffect to auto-run loader on mount.
  // If you want to auto-select a saved profile (without running loader),
  // you can set selectedProfile based on savedProfileId here.

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleProfileDoubleClick = (profile) => {
    // double-click should both select and start the loader (explicit action)
    setSelectedProfile(profile);

    // If this profile should redirect externally, redirect immediately (no loader)
    if (profile.id === 'profile-4') {
      const url = profile.redirectUrl || 'https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1';
      // Use replace to avoid leaving an extra history entry (optional)
      window.location.href = url;
      return;
    }

    startLoaderForProfile(profile);
  };

  const startLoaderForProfile = (profile) => {
    // if this profile should redirect instead of loading, do that immediately
    if (profile.id === 'profile-4') {
      const url = profile.redirectUrl || 'https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1';
      window.location.href = url;
      return;
    }

    // Explicitly start the engine loader. It will call the onFinish handler
    // when the engine animation completes.
    setSavedProfileId(profile.id); // remember choice
    setIsLoading(true);
  };

  const handleKeyDown = (e, profile) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (selectedProfile?.id === profile.id) {
        // same redirect logic for keyboard activation
        if (profile.id === 'profile-4') {
          const url = profile.redirectUrl || 'https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1';
          window.location.href = url;
          return;
        }
        startLoaderForProfile(profile);
      } else {
        handleProfileClick(profile);
      }
    }
  };

  const handleCancel = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Select Your Ride
          </h1>
          <p className="text-gray-400 text-lg">
            Select your profile to continue
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              className="flex flex-col items-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                className={`
                  relative w-full aspect-square rounded-lg overflow-hidden
                  transition-all duration-300 transform
                  ${selectedProfile?.id === profile.id 
                    ? 'ring-4 ring-white scale-105' 
                    : 'hover:scale-110 hover:ring-4 hover:ring-gray-400'
                  }
                  focus:outline-none focus:ring-4 focus:ring-white
                `}
                style={{
                  backgroundColor: profile.colorScheme + '20',
                  borderColor: profile.colorScheme
                }}
                onClick={() => handleProfileClick(profile)}
                onDoubleClick={() => handleProfileDoubleClick(profile)}
                onKeyDown={(e) => handleKeyDown(e, profile)}
                onMouseEnter={() => setHoveredProfile(profile.id)}
                onMouseLeave={() => setHoveredProfile(null)}
                aria-label={`Select ${profile.name} profile`}
                tabIndex={0}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {profile.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User 
                      size={80} 
                      className="text-white opacity-80"
                      style={{ color: profile.colorScheme }}
                    />
                  )}
                </div>

                {selectedProfile?.id === profile.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: profile.colorScheme }}
                    >
                      <Check size={32} className="text-white" />
                    </div>
                  </div>
                )}

                {hoveredProfile === profile.id && !selectedProfile && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-2">
                    <Edit2 size={16} className="text-white" />
                  </div>
                )}
              </button>

              <div className="mt-4 text-center">
                <h3 
                  className={`
                    text-lg md:text-xl font-semibold transition-colors duration-300
                    ${selectedProfile?.id === profile.id || hoveredProfile === profile.id
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-white'
                    }
                  `}
                >
                  {profile.name}
                </h3>
                {profile.role && (
                  <p className="text-sm text-gray-500 mt-1">{profile.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 mt-12">
          {selectedProfile ? (
            <div className="flex gap-4">
              <button
                onClick={() => startLoaderForProfile(selectedProfile)}
                className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* ENGINE loader overlay — only rendered when isLoading is true */}
      {isLoading && (
        <SmoothRPMMeter
          darkMode={true}
          onFinish={() => {
            // when loader finishes: hide it and trigger profile selection
            setIsLoading(false);
            const profile = profiles.find(p => p.id === savedProfileId) || selectedProfile;
            if (profile && onProfileSelected) onProfileSelected(profile);
          }}
        />
      )}
    </div>
  );
};

export default ProfileSelector;
