// src/components/Hero.js
import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeContext";


const Hero = ({ setActiveSection }) => {
  const { darkMode, theme } = useTheme();

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // fine-grained thresholds allow us to respond when section is mostly visible
    const thresholds = new Array(101).fill(0).map((_, i) => i / 100);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // If the section is at least 50% visible, play; otherwise pause.
          if (entry.intersectionRatio >= 0.5) {
            // Ensure muted for autoplay policy
            video.muted = true;
            const p = video.play();
            if (p && p.catch) {
              p.catch(() => {
                // fallback: keep muted and try again
                video.muted = true;
                video.play().catch(() => { });
              });
            }
          } else {
            try {
              video.pause();
            } catch {
              // ignore
            }
          }
        }
      },
      { threshold: thresholds, root: null }
    );

    io.observe(container);

    // Pause video when tab is hidden to save CPU/bandwidth
    const onVisibility = () => {
      if (!video) return;
      if (document.hidden) video.pause();
      else {
        // If the hero is still visible, try to resume (muted)
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const visible = rect.top < vh && rect.bottom > 0;
        if (visible) {
          video.muted = true;
          video.play().catch(() => { });
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="pt-32 pb-20 px-4 relative overflow-hidden "
      aria-label="Hero"
    >
      {/* Background video (absolute) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover absolute inset-0"
          src="./assets/bikes/ktm-ciematic.mp4" // change path if needed
          poster="./assets/bikes/ktm1390.jpg"
          playsInline
          muted
          loop
          preload="metadata"
          aria-label="Hero preview video"
        />
        {/* slight overlay to darken video for text readability */}
        <div
          className={`absolute inset-0 pointer-events-none ${darkMode
              ? "bg-gradient-to-b from-orange-950/20 to-transparent"
              : "bg-gradient-to-b from-orange-100/50 to-transparent"
            }`}
        />
      </div>

      {/* Content (z-10 so it sits above video) */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`mb-4 ${theme.accent} text-sm tracking-widest font-semibold`}>
          Chaitanya Pawar
        </div>

        <h1 className="text-5xl md:text-7xl text-[#FFFFFF] font-bold mb-6 leading-tight">
          BUILT FOR
          <br />
          <span className={theme.accent}>REAL-WORLD</span>
          <br />
          PERFORMANCE
        </h1>

        <p className={`text-xl md:text-2xl text-[#FFFFFF] mb-8 max-w-2xl`}>
          Every line of code is a gear shift — AI provides the torque, MERN delivers the speed, and DevOps keeps the engine running smooth
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveSection("builds")}
            className={`${theme.videoText} ${theme.textWhite} ${darkMode ? "text-white" : "text-black"
              } font-bold px-8 py-4 transition-all hover:scale-105`}
          >
            VIEW BUILDS <ChevronRight className="inline ml-2" size={20} />
          </button>

          <button
            onClick={() => {
              setActiveSection("contact");
              window.open("./Chaitanya.pdf", '_blank', 'noopener,noreferrer');
            }}
            className={`border-2 ${theme.accent} ${theme.card} ${theme.accent.replace(
              "text-",
              "hover:bg-"
            )} ${darkMode ? "hover:text-black" : "hover:text-white"} font-bold px-8 py-4 transition-all`}
          >
            View Resume
          </button>

        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default Hero;
