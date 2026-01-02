// src/components/Navbar.js
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import gsap from 'gsap';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, theme = {}, setShowThemeSelector } = useTheme() || {};

  const navRef = useRef(null);
  const navButtonsRef = useRef([]);

  const navItems = ['GARAGE', 'BUILD SHEET', 'CUSTOM BUILDS', 'ROAD HISTORY', 'PIT STOP'];
  const navSections = ['garage', 'buildsheet', 'builds', 'history', 'contact'];
  const scrollToIds = ['garage', 'skills', 'custom-builds', null, null]; // IDs to scroll to

  const handleNavClick = (idx) => {
    const scrollId = scrollToIds[idx];
    if (scrollId) {
      const element = document.getElementById(scrollId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveSection(navSections[idx]);
  };

  // helper to safely get hover class
  const hoverAccent = typeof theme.accent === 'string' ? theme.accent.replace('text-', 'hover:text-') : '';

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full ${theme.border || 'border-gray-200'}/90 backdrop-blur-sm z-40 ${theme.border || ''} border-b`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-16 lg:px-18">
        <div className="flex items-center justify-between h-16">
          <div className={`text-2xl font-bold ${theme.accent || 'text-black'} flex items-center gap-2`}>
            <img
              src={darkMode ? '/assets/bikes/logoWhite.png' : '/assets/bikes/logo.png'}
              alt="Rapt0r logo"
              className="h-16 w-auto object-contain"
            />
            rapt0r
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setShowThemeSelector(true)}
            aria-label="Change ride / theme"
            className={`hidden md:flex items-center gap-2 ${theme.bgTertiary || ''} ${theme.border || ''} border px-4 py-2 ${theme.textSecondary || ''} ${hoverAccent} transition-all`}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            <span className="text-sm font-semibold">CHANGE RIDE</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, idx) => (
              <button
                key={item}
                ref={(el) => (navButtonsRef.current[idx] = el)}
                onClick={() => handleNavClick(idx)}
                className={`${theme.textSecondary || ''} ${hoverAccent} transition-colors font-semibold tracking-wider text-sm nav-item`}
                aria-current={activeSection === navSections[idx] ? 'page' : undefined}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${theme.textSecondary || ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden ${theme.bgSecondary || ''} ${theme.border || ''} border-t`}>
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => setShowThemeSelector(true)}
              className={`flex items-center gap-2 w-full ${theme.bgTertiary || ''} ${theme.border || ''} border px-4 py-2 ${theme.textSecondary || ''}`}
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span className="text-sm font-semibold">CHANGE RIDE</span>
            </button>
            {navItems.map((item, idx) => (
              <button
                key={item}
                onClick={() => {
                  handleNavClick(idx);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left ${theme.textSecondary || ''} ${hoverAccent} transition-colors font-semibold tracking-wider text-sm py-2`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired
};

export default Navbar;
