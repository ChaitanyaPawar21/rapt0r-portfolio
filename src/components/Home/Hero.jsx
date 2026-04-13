// src/components/Hero.js
import React from "react";
import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useHeroSequenceAnimation } from "../../hooks/useHeroSequenceAnimation";


const Hero = ({ setActiveSection }) => {
  const { darkMode, theme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const {
    refs: {
      sectionRef,
      canvasRef,
      overlayRef,
      eyebrowRef,
      titleRef,
      subtitleRef,
      ctaRef,
    },
  } = useHeroSequenceAnimation({
    totalFrames: 100,
    basePath: isMobile ? "https://ik.imagekit.io/ht1e6kqd8/hero" : "https://ik.imagekit.io/1elzedpwu/hero",
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full will-change-transform pointer-events-none"
          style={{ display: "block" }}
          aria-hidden="true"
        />
        <div
          ref={overlayRef}
          className={`absolute inset-0 pointer-events-none ${darkMode
              ? "bg-gradient-to-b from-black/30 via-black/20 to-black/45"
              : "bg-gradient-to-b from-black/10 via-black/20 to-black/40"
            }`}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28 md:pb-20">
        <div
          ref={eyebrowRef}
          className={`mb-4 ${theme.accent} text-sm tracking-widest font-semibold`}
        >
          Chaitanya Pawar
        </div>

        <h1
          ref={titleRef}
          className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl"
        >
          BUILT FOR
          <br />
          <span className={theme.accent}>REAL-WORLD</span>
          <br />
          PERFORMANCE
        </h1>

        <p
          ref={subtitleRef}
          className="mb-8 max-w-2xl text-lg text-white/95 sm:text-xl md:text-2xl"
        >
          Every line of code is a gear shift — AI provides the torque, MERN delivers the speed, and DevOps keeps the engine running smooth
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
          <button
            onClick={() => setActiveSection("builds")}
            className={`${theme.videoText} ${theme.textWhite} ${darkMode ? "text-white" : "text-black"
              } w-full sm:w-auto font-bold px-8 py-4 transition-all text-center justify-center`}
          >
            VIEW BUILDS <ChevronRight className="inline ml-2" size={20} />
          </button>

          <button
            onClick={() => {
              setActiveSection("contact");
              window.open("./Chaitanya.pdf", '_blank', 'noopener,noreferrer');
            }}
            className={`w-full sm:w-auto border-2 ${theme.accent} ${theme.card} ${theme.accent.replace(
              "text-",
              "hover:bg-"
            )} ${darkMode ? "hover:text-black" : "hover:text-white"} font-bold px-8 py-4 transition-all text-center justify-center`}
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
