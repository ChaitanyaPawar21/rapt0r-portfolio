// src/components/BuildSheet.js
import React, { useRef } from "react";
import { useTheme } from "./ThemeContext";
import PerformanceSpecs from "./PerformanceSpecs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BuildSheet = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Set initial state - everything hidden
    gsap.set([".js-buildsheet-photo", ".js-buildsheet-heading", ".js-buildsheet-text p"], {
      autoAlpha: 0
    });

    // Create a master timeline that starts AFTER hero section
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Start when BuildSheet enters viewport
        end: "bottom 20%",
        // markers: true, // Uncomment to debug
      }
    });

    // Animate headings first
    masterTimeline.fromTo(
      ".js-buildsheet-heading",
      { y: -60, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }
    );

    // Then photo
    masterTimeline.fromTo(
      ".js-buildsheet-photo",
      { x: 200, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4" // Overlap slightly
    );

    // Finally paragraphs
    masterTimeline.fromTo(
      ".js-buildsheet-text p",
      { x: -80, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
      },
      "-=0.5" // Overlap slightly
    );



  }, { scope: sectionRef });

  return (
  <section ref={sectionRef} id="garage" className="relative z-20 py-24 px-4 overflow-hidden">
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src="https://ik.imagekit.io/1elzedpwu/ktm-ciematic.mp4"
      autoPlay muted loop playsInline preload="metadata"
    />

    {/* Heavier overlay — was /70, now /85 for legibility */}
    <div className="absolute inset-0 bg-black/75" />

    {/* Vignette */}
    <div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)"
    }} />

    <div className="relative z-10 max-w-6xl mx-auto">
      <div className="js-buildsheet-box">

        {/* Label with accent line */}
        <div className="js-buildsheet-heading mb-3 flex items-center gap-3">
          <span style={{ display: "inline-block", width: 32, height: 1, background: "#f97316" }} />
          <span className={`${theme.accent} text-xs tracking-[0.25em] font-semibold uppercase`}>
            Introduction
          </span>
        </div>

        {/* Heading — white, not theme-dependant */}
        <h2 className="js-buildsheet-heading text-5xl md:text-6xl font-black mb-14 text-white"
          style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          WHO'S IN THE GARAGE
        </h2>

        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">

          {/* Photo with corner-frame accent */}
          <div className="js-buildsheet-photo flex justify-center">
            <div style={{ position: "relative", display: "inline-block" }}>
              <span style={{
                position: "absolute", top: -8, left: -8, width: 48, height: 48,
                borderTop: "3px solid #f97316", borderLeft: "3px solid #f97316"
              }} />
              <span style={{
                position: "absolute", bottom: -8, right: -8, width: 48, height: 48,
                borderBottom: "3px solid #f97316", borderRight: "3px solid #f97316"
              }} />
              <img
                src="/assets/bikes/myself.jpeg"
                alt="Chaitanya Pawar"
                style={{
                  display: "block", width: "100%", maxWidth: 420,
                  aspectRatio: "3/4", objectFit: "cover",
                  filter: "contrast(1.05) brightness(0.95)"
                }}
              />
            </div>
          </div>

          {/* Text — glass card */}
          <div className="js-buildsheet-text flex flex-col justify-center" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "2.5rem",
            backdropFilter: "blur(16px)",
          }}>
            {/* Decorative quote mark */}
            <div style={{
              fontSize: 72, lineHeight: 0.8, marginBottom: 16,
              opacity: 0.4, fontFamily: "Georgia, serif", color: "#f97316"
            }}>"</div>

            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.92)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              I'm <span className={`${theme.accent} font-semibold`}>Chaitanya Pawar</span> also known as{" "}
              <span className={`${theme.accent} font-semibold`}>calm_aadmi</span>, a full-stack developer who
              approaches every project like a custom build — understanding the terrain, selecting the right
              components, and tuning every detail for maximum performance.
            </p>

            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
              Where others see templates, I see chassis. Where they see features, I see performance specs.
              Every line of code, every design decision is a wrench turn toward something that actually works in the wild.
            </p>

            {/* Footer tag */}
            <div style={{
              marginTop: "2rem", paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", gap: 12
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#f97316", display: "inline-block"
              }} />
              <span style={{
                fontSize: "0.72rem", letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.38)", textTransform: "uppercase"
              }}>
                Full-Stack Developer · India
              </span>
            </div>
          </div>
        </div>
      </div>

      <PerformanceSpecs />
    </div>
  </section>
);
};

export default BuildSheet;