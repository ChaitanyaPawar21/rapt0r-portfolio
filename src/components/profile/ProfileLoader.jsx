import React from 'react';
import { User } from 'lucide-react';

const ProfileLoader = ({ profile }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated Avatar */}
        <div 
          className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center animate-pulse"
          style={{ backgroundColor: profile.colorScheme + '40' }}
        >
          {profile.avatarUrl ? (
            <img 
              src={profile.avatarUrl} 
              alt={profile.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User 
              size={64} 
              className="text-white"
              style={{ color: profile.colorScheme }}
            />
          )}
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-semibold text-white mb-4">
          Loading {profile.name}'s Portfolio
        </h2>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full animate-loading-bar"
            style={{ backgroundColor: profile.colorScheme }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 50%; margin-left: 25%; }
          100% { width: 100%; margin-left: 0%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfileLoader;