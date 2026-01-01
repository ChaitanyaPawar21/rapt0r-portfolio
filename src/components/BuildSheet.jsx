// src/components/BuildSheet.js
import React from 'react';
import { useTheme } from './ThemeContext';
import PerformanceSpecs from './PerformanceSpecs';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const BuildSheet = () => {
  const { theme } = useTheme();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#box",
        start: "-30% top",
        end: "+=100%",
        pin: false,
        markers: true
      }
    });

    tl.from("#photo", {
      x: 200,
      opacity: 0,
      duration: 1
    })
      .from("#Utext", {
        y: 300,
        opacity: 0,
        duration: 1
      }, "-=0.5");

    tl.from("#text p", {
      x: -300,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    }, "-=0.5")

  }, [])

  return (
    <section id="garage" className={`${theme.bgSecondary} py-20 px-4`}>
      <div className="max-w-6xl mx-auto">

        <div id="box">
          <div id="Utext" className={`mb-4 ${theme.accent} text-sm tracking-widest font-semibold`}>
            <span>Introduction</span>
          </div>
          <h2 id="Utext" className="text-4xl md:text-5xl font-bold mb-12"><span>WHO'S IN THE GARAGE</span></h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div
              //className={`${theme.bgTertiary} ${theme.border} border h-80 mb-6 flex items-center justify-center`}
              >
                <div className="text-center">

                  <div id="photo" className={`${theme.textTertiary} mt-4`}><img src="/assets/bikes/myself.jpg" alt="Motorcycle" /></div>
                </div>

              </div>
            </div>
            <div id="text" className="flex flex-col justify-center">
              <p className={`text-lg ${theme.textSecondary} leading-relaxed mb-6`}>
                I'm <span className={`${theme.accent} font-semibold`}>Chaitanya Pawar</span> also known as <span className={`${theme.accent} font-semibold`}>calm_aadmi</span>, a
                full-stack developer who approaches every project like a custom build—understanding
                the terrain, selecting the right components, and tuning every detail for maximum
                performance.
              </p>
              <p className={`text-lg ${theme.textSecondary} leading-relaxed`}>
                Where others see templates, I see chassis. Where they see features, I see
                performance specs. Every line of code, every design decision is a wrench turn toward
                something that actually works in the wild.
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