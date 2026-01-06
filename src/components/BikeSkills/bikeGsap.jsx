// src/components/BikeGsap.jsx
import React from "react";
import "./bikeGsap.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faHtml5, faCss3Alt } from '@fortawesome/free-brands-svg-icons';
import { faLocationCrosshairs, faRobot, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../Home/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const BikeGsap = () => {
  const { isMobile } = useTheme() || {};

  // Only run animations on desktop
  useGSAP(() => {
    if (isMobile) return; // Skip animations on mobile

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
      },
    });

    // SET initial state for special (hidden)
    gsap.set("#special", { opacity: 0 });

    // 1) Move the text out of the screen
    tl.to("#ready h1", {
      xPercent: -150,
      duration: 19,
      ease: "power1.inOut",
    });

    // 2) Fade in TV box
    tl.from("#tvBox", {
      opacity: 0,
      duration: 0.6,
      ease: "power1.out",
    });

    // 3) Scale down TV and round corners
    tl.to("#tvBox", {
      scale: 0.8,
      borderRadius: "20%",
      duration: 7,
      ease: "power2.out",
      transformOrigin: "center center",
    });

    // frontend pop
    tl.from("#title-h1", {
      scale: 0,
    });

    // 4) Bike: center → left
    tl.fromTo(
      "#ducati",
      { xPercent: 0 },
      {
        xPercent: -50,
        duration: 4,
        ease: "power1.inOut",
      },
    );

    // Stagger in lang spans
    tl.fromTo("#lang span", {
      opacity: 0,
      scale: 0.5,
    }, {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.5,
      ease: "back.out(1.7)",
    });

    // Hold bike position
    tl.fromTo(
      "#ducati",
      { xPercent: -50 },
      {
        xPercent: -50,
        duration: 4,
        ease: "power1.inOut",
      }
    );

    // 5) Bike: left → right
    tl.to("#ducati", {
      xPercent: 60,
      duration: 10,
      ease: "power1.inOut",
    });

    // Fade out lang and list
    tl.to("#lang", {
      opacity: 0,
      duration: 3,
      ease: "power1.inOut",
    }, "<");

    tl.to("#list", {
      opacity: 0,
      duration: 1,
    }, "<");

    // Show special section
    tl.to("#special", {
      opacity: 1,
      duration: 0.3,
    });

    // Animate the "specials" title
    tl.from("#spSkills", {
      scale: 0,
      duration: 0.5,
    });

    // Animate each special skill span with stagger
    tl.fromTo("#special span", {
      opacity: 0,
      scale: 0.5,
      y: 20,
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

  }, [isMobile]);

  // Mobile static view
  if (isMobile) {
    return (
      <div id="skills" className="skills-mobile-container">
        {/* Frontend Title */}
        <h1 className="mobile-frontend-title">Frontend</h1>

        {/* Bike Image */}
        <div className="mobile-bike-wrapper">
          <img
            src="/assets/skills/ducati.png"
            alt="Ducati Bike"
            className="mobile-ducati-img"
          />
        </div>

        {/* Skills and Base Specs */}
        <div className="mobile-skills-layout">
          {/* Left Side - Skills */}
          <div className="mobile-skills-badges">
            <div className="skill-badge">
              <div className="skill-icon">
                <FontAwesomeIcon icon={faHtml5} />
              </div>
              <span>HTML</span>
            </div>
            <div className="skill-badge">
              <div className="skill-icon">
                <FontAwesomeIcon icon={faCss3Alt} />
              </div>
              <span>CSS</span>
            </div>
            <div className="skill-badge">
              <div className="skill-icon">
                <FontAwesomeIcon icon={faReact} />
              </div>
              <span>REACT</span>
            </div>
          </div>

          {/* Right Side - BASE SPECS */}
          <div className="mobile-base-specs">
            <span className="base-specs-line1">BASE</span>
            <span className="base-specs-line2">SPECS</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view with animations
  return (
    <div
      id="skills"
      className="Skills-section"
    >
      {/* Big heading */}
      <div
        id="ready"
        className="relative font-[Bebas Neue] text-[5vw] sm:text-[10vw] md:text-[15vw] lg:text-[30vw] font-bold whitespace-nowrap w-max mx-auto pt-32"
      >
        <h1>TIME FOR MORE SKILLS</h1>
      </div>

      {/* TV box with bike inside */}
      <div id="tvBox" className="tvBox-panel bg-white text-black">
        <img
          id="ducati"
          src="/assets/skills/ducati.png"
          alt="Ducati Bike"
          className="ducati-img"
        />

        <div id="title-h1" className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
          <span className="mb-0 pd-0">
            <span className="inline-block">Frontend</span>
          </span>
          <div id="list" className="text-[3rem] relative top-5 -right-2">
            <span>BASE SPECS</span>
          </div>
          <div id="lang">
            <span><FontAwesomeIcon icon={faReact} /> React</span>
            <span><FontAwesomeIcon icon={faHtml5} /> HTML</span>
            <span><FontAwesomeIcon icon={faCss3Alt} /> CSS3</span>
          </div>
          <div id="special" className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
            <div id="spSkills" className="text-[3rem] relative top-5 -right-2">SF EDITION</div>
            <span><FontAwesomeIcon icon={faLocationCrosshairs} />GSAP</span>
            <span><FontAwesomeIcon icon={faRobot} />Tailwind</span>
            <span
              onClick={() => window.open("/reliable-frontend")}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faPaperclip} />certificate
            </span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeGsap;
