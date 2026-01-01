// src/MotorcyclePortfolio.js
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BuildSheet from "./components/BuildSheet";
import ProjectShowcase from "./components/ProjectShowcase";
import { useTheme } from "./components/ThemeContext";
import BikeGsap from "./components/BikeSkills/bikeGsap"; 
import Honda from "./components/honda/Honda"; 

/**
 * SmoothRPMMeter + fade-out + optional engine sound
 *
 * Notes:
 * - Optional audio file: put engine-rev.mp3 at public/assets/sounds/engine-rev.mp3
 * - This loader will ALWAYS call onFinish() either from the animation completion
 *   or from a 2s failsafe timeout.
 */

const SmoothRPMMeter = ({ onFinish, darkMode }) => {
  const [rpm, setRpm] = useState(0);
  const [angle, setAngle] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const targetRpm = 12000;
  const mainDuration = 1000;
  const overshoot = 1.035;
  const settleDuration = 100;
  const totalDuration = mainDuration + settleDuration;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);


  // animation loop
  useEffect(() => {
    startRef.current = null;

    const animate = (timestamp) => {
      if (startRef.current == null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      let currentRpm = 0;

      if (elapsed < mainDuration) {
        const t = elapsed / mainDuration;
        currentRpm = targetRpm * easeOutCubic(t);
      } else if (elapsed < totalDuration) {
        const t2 = (elapsed - mainDuration) / settleDuration;
        const overshootTarget = targetRpm * overshoot;

        if (t2 < 0.5) {
          const innerT = t2 / 0.5;
          currentRpm = targetRpm + (overshootTarget - targetRpm) * easeOutCubic(innerT);
        } else {
          const innerT = (t2 - 0.5) / 0.5;
          currentRpm = overshootTarget - (overshootTarget - targetRpm) * innerT;
        }
      } else {
        // reached end of animation
        currentRpm = targetRpm;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;

        // call onFinish reliably (wrapped in try/catch)
        if (onFinish) {
          setTimeout(() => {
            try {
              onFinish();
            } catch (e) {
              console.warn("Loader onFinish() threw:", e);
            }
          }, 250); // small polish delay
        }
        return;
      }

      setRpm(currentRpm);

      const clamped = Math.max(0, Math.min(currentRpm, targetRpm));
      const newAngle = (clamped / targetRpm) * 290;
      setAngle(newAngle);

      // Sync audio playbackRate to rpm (if enabled)
      

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onFinish, totalDuration]); // Add required dependencies
  

 

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        darkMode ? "bg-black/90" : "bg-white/90"
      }`}
      aria-live="polite"
    >
      <div className="relative text-center p-4">

        <div className="relative w-64 h-64 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 200 200" role="img" aria-label="RPM gauge">
            <circle cx="100" cy="100" r="92" fill="none" stroke={darkMode ? "#111827" : "#e6eef8"} strokeWidth="3" />

            {[...Array(70)].map((_, i) => {
              const degreeFromTop = (i * 270) / 69;
              const rad = (degreeFromTop * Math.PI) / 180;
              const inner = 70;
              const outer = i % 5 === 0 ? 88 : 82;
              const x1 = 100 + inner * Math.sin(rad);
              const y1 = 100 - inner * Math.cos(rad);
              const x2 = 100 + outer * Math.sin(rad);
              const y2 = 100 - outer * Math.cos(rad);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={darkMode ? "#374151" : "#9ca3af"}
                  strokeWidth={i % 5 === 0 ? 2 : 1}
                  strokeLinecap="round"
                />
              );
            })}

            {[
              { label: 0, rpm: 0 },
              { label: 2, rpm: 2000 },
              { label: 4, rpm: 4000 },
              { label: 6, rpm: 6000 },
              { label: 8, rpm: 8000 },
              { label: 10, rpm: 10000 },
              { label: 12, rpm: 12000 }
            ].map(({ label, rpm: labelRpm }) => {
              const degreeFromTop = (labelRpm / targetRpm) * 270;
              const rad = (degreeFromTop * Math.PI) / 180;
              const distance = label === 0 || label === 12 ? 50 : 53;
              const lx = 100 + distance * Math.sin(rad);
              const ly = 100 - distance * Math.cos(rad);

              return (
                <text
                  key={label}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={darkMode ? "#d1d5db" : "#374151"}
                  style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto" }}
                >
                  {label}
                </text>
              );
            })}

            <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px" }}>
              <line x1="100" y1="100" x2="100" y2="25" stroke={darkMode ? "#ff6b35" : "#ea580c"} strokeWidth="3" strokeLinecap="round" />
              <circle cx="100" cy="100" r="10" fill={darkMode ? "#ff6b35" : "#ea580c"} stroke={darkMode ? "#ff8c5a" : "#f97316"} strokeWidth="2" />
            </g>

            <circle cx="100" cy="100" r="4" fill={darkMode ? "#111827" : "#f3f4f6"} />
            <circle cx="100" cy="100" r="72" fill="none" stroke={darkMode ? "#0f172a" : "#f3f4f6"} strokeWidth="1" />
          </svg>
        </div>

        <div className={`text-6xl font-extrabold ${darkMode ? "text-orange-400" : "text-orange-600"} mb-1 font-mono`}>
          {Math.round(rpm).toLocaleString()}
        </div>

        <div className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-xl tracking-wider`}>RPM</div>

        <div className={`${darkMode ? "text-gray-500" : "text-gray-500"} mt-3 text-sm`}>ENGINE STARTING...</div>
      </div>
    </div>
  );
};

/**
 * MotorcyclePortfolioInner
 * - Shows SmoothRPMMeter overlay and fade-out transition.
 */
const MotorcyclePortfolioInner = ({ initialSection = null, introMode = "auto" }) => {
  const { darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [showLoader, setShowLoader] = useState(introMode === "force");

  useEffect(() => {
    if (introMode === "auto") return;
    if (introMode === "force") setShowLoader(true);
  }, [introMode]);

  return (
    <div className={darkMode ? "bg-black text-white" : "bg-white text-black"}>
      {showLoader && (
        <SmoothRPMMeter
          darkMode={darkMode}
          onFinish={() => {
            setShowLoader(false);
          }}
        />
      )}

      <div
        className={`transition-opacity duration-700 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

        <main>
          <Hero setActiveSection={setActiveSection} />
          <BuildSheet />
          <BikeGsap />
         <Honda />
           <ProjectShowcase />
        </main>

        <footer className="text-center py-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Chaitanya Pawar — Built with React & Tailwind
        </footer>
      </div>
    </div>
  );
};
export { SmoothRPMMeter };
export default MotorcyclePortfolioInner;
