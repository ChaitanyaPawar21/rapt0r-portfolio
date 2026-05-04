import React, { useEffect } from 'react';
import './styles/stalker.css';

import StalkerHero from './components/StalkerHero';
import SocialLinks from './components/SocialLinks';
import VideoGallery from './components/VideoGallery';
import Activities from './components/Activities';
import Favorites from './components/Favorites';
import ChaosSection from './components/ChaosSection';

const StalkerProfile = () => {

  useEffect(() => {
    // Custom cursor logic
    const cursor = document.getElementById('stalker-cursor');
    const updateCursorPosition = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    const addHoverEffect = () => cursor?.classList.add('hover');
    const removeHoverEffect = () => cursor?.classList.remove('hover');

    window.addEventListener('mousemove', updateCursorPosition);
    
    // Add hover effect to interactive elements
    const interactables = document.querySelectorAll('a, button, .cursor-pointer');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    // Cleanup class to prevent body overflow/cursor issues on other pages
    document.body.classList.add('stalker-theme');

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
      document.body.classList.remove('stalker-theme');
    };
  }, []);

  return (
    <div className="stalker-theme font-sans">
      <div id="stalker-cursor" className="stalker-cursor hidden md:block"></div>
      
      <StalkerHero />
      <SocialLinks />
      <VideoGallery />
      <Activities />
      <ChaosSection />
      <Favorites />

      {/* Footer / Exit */}
      <div className="w-full py-12 bg-black text-center border-t border-[#111]">
        <p className="text-gray-600 text-sm tracking-[0.3em] uppercase">End of transmission.</p>
        <button 
          onClick={() => window.location.href = '/profile'}
          className="mt-6 px-6 py-2 border border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055] hover:text-white transition-colors duration-300 rounded uppercase font-bold text-xs tracking-widest"
        >
          Return to Matrix
        </button>
      </div>
    </div>
  );
};

export default StalkerProfile;
