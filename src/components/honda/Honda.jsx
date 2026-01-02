// src/components/honda/Honda.jsx
import React from "react";
import "./Honda.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { faLocationCrosshairs, faRobot, faPaperclip, faDatabase, faGear } from '@fortawesome/free-solid-svg-icons';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Honda = () => {
    const navigate = useNavigate();
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#Skills2",
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,

            },
        });

        // SET initial state for special (hidden)
        gsap.set("#special2", { opacity: 0 });

        // 1) Move the text out of the screen
        tl.to("#ready2 h1", {
            yPercent: -190,
            duration: 35,
            ease: "power1.inOut",
        });

        // 2) Fade in TV box
        tl.from("#tvBox2", {
            opacity: 0,
            duration: 0.6,
            ease: "power1.out",
        });

        // 3) Scale down TV and round corners
        tl.to("#tvBox2", {
            scale: 0.8,
            borderRadius: "20%",
            duration: 7,
            ease: "power2.out",
            transformOrigin: "center center",
        });

        // frontend pop
        tl.from("#title-h2", {
            scale: 0,
        });

        // 4) Bike: center → left
        tl.fromTo(
            "#Honda",
            { xPercent: 0 },
            {
                xPercent: -50,
                duration: 4,
                ease: "power1.inOut",
            },
        );

        // Stagger in lang spans
        tl.fromTo("#lang2 span", {
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
            "#Honda",
            { xPercent: -50 },
            {
                xPercent: -50,
                duration: 4,
                ease: "power1.inOut",
            }
        );

        // 5) Bike: left → right
        tl.to("#Honda", {
            xPercent: 50,
            duration: 10,
            ease: "power1.inOut",
        });

        // Fade out lang and list2
        tl.to("#lang2", {
            opacity: 0,
            duration: 3,
            ease: "power1.inOut",
        }, "<");

        tl.to("#list2", {
            opacity: 0,
            duration: 1,
        }, "<");

        // Show special section
        tl.to("#special2", {
            opacity: 1,
            duration: 0.3,
        });

        // Animate the "specials" title
        tl.from("#spSkills2", {
            scale: 0,
            duration: 0.5,
        });

        // Animate each special skill span with stagger
        tl.fromTo("#special2 span", {
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
            id="Skills2"
            className="Skills2-section"
        >
            {/* Big heading */}
            <div
                id="ready2"
                className="relative font-[Bebas Neue] text-[5vw] sm:text-[10vw] md:text-[15vw] lg:text-[30vw] font-bold whitespace-nowrap w-max mx-auto pt-32"
            >
                <h1>BACKEND</h1>
            </div>

            {/* TV box with bike inside */}
            <div id="tvBox2" className="tvBox-panel bg-white text-black">
                <img
                    id="Honda"
                    src="/assets/skills/honda.png"
                    alt="Honda Bike"
                    className="Honda-img"
                />

                <div id="title-h2" className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                    <span className="mb-0 pd-0">
                        <span className="inline-block">Backend</span>
                    </span>
                    <div id="list2" className="text-[3rem] relative top-5 -right-2">
                        <span>BASE SPECS</span>
                    </div>
                    <div id="lang2">
                        <span><FontAwesomeIcon icon={faNodeJs} /> Node.js</span>
                        <span><FontAwesomeIcon icon={faDatabase} />MongoDB</span>
                        <span><FontAwesomeIcon icon={faGear} /> APIs</span>
                    </div>
                    <div id="special2" className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                        <div id="spSkills2" className="text-[3rem] relative top-5 -right-2">SF EDITION</div>
                        <span><FontAwesomeIcon icon={faLocationCrosshairs} />DevOps</span>
                        <span><FontAwesomeIcon icon={faRobot} />Vercel</span>
                        <span
                            onClick={() => window.open("/reliable-honda")}
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

export default Honda;