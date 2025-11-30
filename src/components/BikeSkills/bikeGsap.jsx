// src/components/BikeGsap.js
import React from "react";
import "../BikeSkills/bikeGsap.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck, faHtml5, faCss3Alt, faReact, faG} from '@fortawesome/free-brands-svg-icons';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BikeGsap = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top top",
        end: "+=300%",   // how long the whole animation lasts
        scrub: -1,
        pin: true,
        markers: true,   // remove when done
      },
    });
    tl.to("#special",{
      opacity: 0
    });
    // 1) Move the text out of the screen
    tl.to("#ready h1", {
      xPercent: -150,
      ease: "none",
      duration: 1,
    });

    // 2) Fade in TV box
    tl.from("#tvBox", {
      opacity: 0,
      duration: 0.6,
      ease: "power1.out",
    });

    // 3) Scale down TV and round corners (bike stays centered)
    tl.to("#tvBox", {
      scale: 0.8,
      borderRadius: "20%",
      duration: 1,
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
      { xPercent: 0 },      // start perfectly centered
      {
        xPercent: -50,      // move left inside TV
        duration: 1,

      },
     
    );
    tl.fromTo("#lang", {
      opacity: 0,
      scrollTrigger: {
        trigger: "#title-h1",
        scrub: -1
      }
    }, {
      opacity: 1,
      scale: 1,
    }
    );
    tl.fromTo(
      "#ducati",
      { xPercent: -50 },      // start perfectly centered
      {
        xPercent: -50,      // move left inside TV
        duration: 1,
        ease: "power1.inOut",
      }
    );
    
    // 5) Bike: left → right
    tl.to("#ducati", {
  xPercent: 60,
  duration: 1,
});
tl.to("#lang", {
  opacity: 0,
  duration: 1,
}, "<");
tl.to("#list", {
  opacity: 0,
  duration: 1,
}, "<");
    tl.fromTo("#special",{
      opacity: 0,
      scrollTrigger:{
        trigger: "#special",
        scrub: -1
      }
    },{
      opacity: 1,
    }, )
    
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
          <span className="mb-0 pd-0" id="box head"><span className="inline-block ">Frontend</span>
          </span>
          <div id="list" className="text-[3rem] relative top-5 -right-2 "><span>BASE SPECS</span></div>
          <div id="lang">

            <span><FontAwesomeIcon icon={faHtml5} /> html</span>
            <span><FontAwesomeIcon icon={faCss3Alt} /> CSS</span>
            <span><FontAwesomeIcon icon={faReact} /> REACT</span>

          </div>
          <div id="special" className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
            <div id="spSkills" className="text-[3rem] relative top-5 -right-2 "><span>specials</span></div>
            <span><FontAwesomeIcon icon="fa-solid fa-g" />gsap</span>
            <span><FontAwesomeIcon icon="fa-solid fa-g" />gsap</span>
            <span><FontAwesomeIcon icon="fa-solid fa-g" />gsap</span>
          </div>
        </div>
      </div></div>
  );
};

export default BikeGsap;
