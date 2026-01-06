import React, { createContext, useContext, useState, useEffect } from 'react';
import BikeGsap from '../BikeSkills/bikeGsap';

const ThemeContext = createContext();

// Mobile detection helper
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 767;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Force light mode on mobile by default
  const [darkMode, setDarkMode] = useState(() => !isMobileDevice());
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [bikeColor, setBikeColor] = useState(() => isMobileDevice() ? 'white' : 'black');
  const [isMobile, setIsMobile] = useState(isMobileDevice);

  // Listen for resize and force light mode on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = isMobileDevice();
      setIsMobile(mobile);

      // Force light mode on mobile
      if (mobile) {
        setDarkMode(false);
        setBikeColor('white');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bikeImages = {
    white: '/assets/bikes/bike-white.png',
    black: '/assets/bikes/bike-black.png',
  };

  const raptor = {
    white: '/assets/bikes/logoWhite.png',
    black: '/assets/bikes/logo.png',
  }
  const logoColor = {
    white: '/assets/bikes/white-c.png',
    black: '/assets/bikes/black-c.png',
  };

  const theme = darkMode
    ? {
      bg: 'bg-black',
      bgSecondary: 'bg-gray-900',
      bgTertiary: 'bg-gray-800',
      text: 'text-white',
      textSecondary: 'text-gray-400',
      textTertiary: 'text-gray-500',
      border: 'border-transparent',
      borderSecondary: 'border-gray-700',
      accent: 'text-orange-500',
      accentBg: 'bg-orange-500',
      accentBorder: 'border-orange-500',
      accentHover: 'hover:bg-orange-600',
      card: 'bg-white',
      cardHover: 'hover:border-orange-500',
      input: 'bg-gray-800 border-gray-700',
      videoText: '#FF8533',
      textWhite: 'text-white',

    }
    : {
      bg: 'bg-gray-50',
      bgSecondary: 'bg-white',
      bgTertiary: 'bg-gray-100',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textTertiary: 'text-gray-500',
      border: 'border-transparent',
      borderSecondary: 'border-gray-300',
      accent: 'text-orange-600',
      accentBg: 'bg-orange-600',
      accentBorder: 'border-orange-600',
      accentHover: 'hover:bg-orange-700',
      card: 'bg-white',
      cardHover: 'hover:border-orange-600',
      input: 'bg-white border-gray-300',
      videoText: 'bg-orange-600',
      textWhite: 'text-white',
    };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode: isMobile ? () => { } : setDarkMode, // Disable theme switching on mobile
        theme,
        showThemeSelector,
        setShowThemeSelector: isMobile ? () => { } : setShowThemeSelector, // Disable on mobile
        bikeColor,
        bikeImages,
        isMobile, // Expose isMobile to components
      }}
    >
      {children}

      {/* Theme Selector Modal - Hidden on mobile */}
      {showThemeSelector && !isMobile && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowThemeSelector(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setShowThemeSelector(false);
          }}
          tabIndex={-1}
        >
          <div
            role="document"
            className={`${theme.card} ${theme.border} border-2 rounded-lg p-8 max-w-2xl w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={`text-3xl font-bold mb-6 ${theme.accent}`}>
              CHOOSE YOUR RIDE'S COLOR
            </h2>

            {/* Bike Preview with Color Picker */}
            <div className="mb-8">
              <img
                src={bikeImages[bikeColor]}
                alt="BMW S1000RR"
                className="w-full h-64 object-contain mb-4"
              />
              <div className="flex justify-center gap-4">
                {['black', 'white'].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      if (color === 'black') {
                        setDarkMode(true);
                      } else {
                        setDarkMode(false);
                      }
                      setBikeColor(color);
                    }}
                    className={`relative overflow-hidden rounded-lg border-4 transition-all ${bikeColor === color
                      ? 'border-orange-500 scale-110'
                      : 'border-gray-500 hover:scale-105'
                      }`}
                    aria-label={`Select ${color} bike`}
                  >
                    <img
                      src={logoColor[color]}
                      alt={`${color} bike`}
                      className="w-24 h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowThemeSelector(false)}
                className={`${theme.accentBg} text-white px-8 py-3 rounded-lg font-bold ${theme.accentHover} transition-colors`}
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
};

// Demo component to show the theme selector
function App() {
  const { theme, setShowThemeSelector } = useTheme();

  return (
    <div className={`${theme.bg} ${theme.text} min-h-screen p-8`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">BMW S1000RR Configurator</h1>
        <p className={`${theme.textSecondary} mb-8`}>
          Customize your ultimate riding machine
        </p>
        <button
          onClick={() => setShowThemeSelector(true)}
          className={`${theme.accentBg} text-white px-6 py-3 rounded-lg font-bold ${theme.accentHover} transition-colors`}
        >
          Choose Your Bike Color
        </button>
      </div>
    </div>
  );
}

// Wrap the app with ThemeProvider
export default function WrappedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}