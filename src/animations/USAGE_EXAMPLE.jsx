/**
 * Example: How to use the modular GSAP animation system
 * 
 * OPTION 1: Using the hook (Recommended)
 * Add this to your main layout component (e.g., MotorcyclePortfolio.jsx)
 */

import React from 'react';
import { useGsapAnimations, useGsapRefresh } from '../hooks/useGsapAnimations';

function MotorcyclePortfolioExample({ profile }) {
    // Initialize all GSAP animations (auto-switches for mobile/desktop)
    useGsapAnimations();

    // Optional: refresh after images load for accurate ScrollTrigger calculations
    useGsapRefresh();

    return (
        <div>
            {/* Your existing portfolio content */}
            {/* BikeGsap, Honda, BuildSheet components... */}
        </div>
    );
}

/**
 * OPTION 2: Direct initialization (for non-React or advanced control)
 */
import { initAnimations, cleanupAnimations } from '../animations/gsap.init';

function useCustomGsapSetup() {
    React.useEffect(() => {
        // Wait for DOM to be ready
        const timer = setTimeout(() => {
            initAnimations();
        }, 100);

        return () => {
            clearTimeout(timer);
            cleanupAnimations();
        };
    }, []);
}

/**
 * IMPORTANT: Remove the useGSAP hook from individual components
 * 
 * In BikeGsap.jsx, Honda.jsx, BuildSheet.jsx:
 * 
 * 1. Remove the entire useGSAP(() => { ... }, []) block
 * 2. Keep only the JSX return statement
 * 3. The animations are now centrally managed by gsap.init.js
 * 
 * This prevents duplicate animations and enables proper cleanup on resize.
 */

export { MotorcyclePortfolioExample };
