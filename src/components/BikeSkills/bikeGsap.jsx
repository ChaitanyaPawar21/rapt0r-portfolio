// src/components/BikeGsap.js
import React from "react";
import "../BikeSkills/bikeGsap.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faReact } from '@fortawesome/free-brands-svg-icons';
import { faLocationCrosshairs, faRobot } from '@fortawesome/free-solid-svg-icons';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const BikeGsap = () => {
  const navigate = useNavigate();

  useGSAP(() => {
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

    tl.to("#frontEnd", {
      scrollTrigger: {
        start: 2600,
        end: 2800,
        scrub: -1
      },
      x: 400,
      duration: 2,
      ease: "sine.out"
    });

  }, []);

  return (
    <div
      id="skills"
      className="skills-section"
    >
      {/* Big heading */}
      <div
        id="ready"
        className="relative font-[Bebas Neue] text-[5vw] sm:text-[10vw] md:text-[15vw] lg:text-[30vw] font-bold whitespace-nowrap w-max mx-auto pt-32"
      >
        <h1>TIME FOR SOME SKILL...s</h1>
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
          <span className="mb-0 pd-0" id="box head">
            <span className="inline-block">Frontend</span>
          </span>
          <div id="list" className="text-[3rem] relative top-5 -right-2">
            <span>BASE SPECS</span>
          </div>
          <div id="lang">
            <span><FontAwesomeIcon icon={faHtml5} /> html</span>
            <span><FontAwesomeIcon icon={faCss3Alt} /> CSS</span>
            <span><FontAwesomeIcon icon={faReact} /> REACT</span>
          </div>
          <div id="special" className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
            <div id="spSkills" className="text-[3rem] relative top-5 -right-2">SF EDITION</div>
            <span><FontAwesomeIcon icon={faLocationCrosshairs} />GSAP</span>
            <span><FontAwesomeIcon icon={faRobot} />Prompt dev</span>
            <span 
  onClick={() => window.open("/frontend-fairing")}
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