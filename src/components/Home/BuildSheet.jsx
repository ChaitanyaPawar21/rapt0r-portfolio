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
    <section ref={sectionRef} id="garage" className={`relative z-20 ${theme.bgSecondary} py-20 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="js-buildsheet-box">
          <div className={`js-buildsheet-heading mb-4 ${theme.accent} text-sm tracking-widest font-semibold`}>
            <span>Introduction</span>
          </div>
          <h2 className="js-buildsheet-heading text-4xl md:text-5xl font-bold mb-12">
            <span>WHO'S IN THE GARAGE</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div>
                <div className="text-center">
                  <div className={`js-buildsheet-photo ${theme.textTertiary} mt-4`}>
                    <img src="/assets/bikes/myself.jpg" alt="Motorcycle" />
                  </div>
                </div>
              </div>
            </div>
            <div className="js-buildsheet-text flex flex-col justify-center">
              <p className={`text-lg ${theme.textSecondary} leading-relaxed mb-6`}>
                I'm <span className={`${theme.accent} font-semibold`}>Chaitanya Pawar</span> also known as{" "}
                <span className={`${theme.accent} font-semibold`}>calm_aadmi</span>, a full-stack developer who
                approaches every project like a custom build—understanding the terrain, selecting the right
                components, and tuning every detail for maximum performance.
              </p>
              <p className={`text-lg ${theme.textSecondary} leading-relaxed`}>
                Where others see templates, I see chassis. Where they see features, I see performance specs.
                Every line of code, every design decision is a wrench turn toward something that actually works
                in the wild.
              </p>
            </div>
          </div>
        </div>
        <PerformanceSpecs />
      </div>
    </section>
  );
};

export default BuildSheet;