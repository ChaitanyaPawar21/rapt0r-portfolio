// src/components/Hero.js
import React from "react";
import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeContext";

const Hero = ({ setActiveSection }) => {
  const { darkMode, theme } = useTheme();

  return (
    <section
      className="relative h-screen overflow-hidden"
      aria-label="Hero"
    >
      {/* KTM Cinematic Bike Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        src="https://ik.imagekit.io/1elzedpwu/ktm-ciematic.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Dark Overlay for Text Legibility */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 ${
          darkMode
            ? "bg-gradient-to-b from-black/60 via-black/40 to-black/80"
            : "bg-gradient-to-b from-black/50 via-black/35 to-black/70"
        }`}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28 md:pb-20">
        <div
          className={`mb-4 ${theme.accent} text-sm tracking-widest font-semibold`}
        >
          Chaitanya Pawar
        </div>

        <h1
          className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl"
        >
          BUILT FOR
          <br />
          <span className={theme.accent}>REAL-WORLD</span>
          <br />
          PERFORMANCE
        </h1>

        <p
          className="mb-8 max-w-2xl text-lg text-white/95 sm:text-xl md:text-2xl"
        >
          Every line of code is a gear shift — AI provides the torque, MERN delivers the speed, and DevOps keeps the engine running smooth
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
          <button
            onClick={() => setActiveSection("builds")}
            className={`${theme.videoText} ${theme.textWhite} ${
              darkMode ? "text-white" : "text-black"
            } w-full sm:w-auto font-bold px-8 py-4 transition-all text-center justify-center flex items-center gap-2 rounded`}
          >
            VIEW BUILDS <ChevronRight className="inline ml-1" size={20} />
          </button>

          <button
            onClick={() => {
              setActiveSection("contact");
              window.open("https://ik.imagekit.io/mqketzb2v2/Chaitanya_Pawar_amazon.pdf", "_blank", "noopener,noreferrer");
            }}
            className={`w-full sm:w-auto border-2 ${theme.accent} ${theme.card} ${theme.accent.replace(
              "text-",
              "hover:bg-"
            )} ${darkMode ? "hover:text-black" : "hover:text-white"} font-bold px-8 py-4 transition-all text-center justify-center rounded`}
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

