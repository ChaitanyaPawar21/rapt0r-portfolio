// src/components/honda/Honda.jsx
import React, { useRef, useEffect } from "react";
import "./Honda.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { faLocationCrosshairs, faRobot, faPaperclip, faDatabase, faGear } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../Home/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Honda = () => {
    const navigate = useNavigate();
    const { isMobile } = useTheme() || {};
    const rootRef = useRef(null);

    useEffect(() => {
        if (isMobile || !rootRef.current) return;

        const root = rootRef.current;
        const ctx = gsap.context(() => {
            // SET initial state for special (hidden)
            gsap.set("#special2", { opacity: 0, visibility: "hidden" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: () => `+=${Math.max(1200, root.offsetHeight * 2)}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // 1) Move the text out of the screen
            tl.to("#ready2 h1", {
                yPercent: -140,
                duration: 20,
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
                borderRadius: "20px",
                duration: 7,
                ease: "power2.out",
                transformOrigin: "center center",
            });

            // backend pop
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
                visibility: "visible",
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
        }, root);

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile static view
    if (isMobile) {
        return (
            <div id="Skills2" className="skills-mobile-container-honda">
                {/* Backend Title */}
                <h1 className="mobile-backend-title">Backend</h1>

                {/* Bike Image */}
                <div className="mobile-bike-wrapper-honda">
                    <img
                        src="/assets/skills/honda.png"
                        alt="Honda Bike"
                        className="mobile-honda-img"
                    />
                </div>

                {/* Skills and Base Specs */}
                <div className="mobile-skills-layout-honda">
                    {/* Left Side - Skills */}
                    <div className="mobile-skills-badges-honda">
                        <div className="skill-badge-honda">
                            <div className="skill-icon-honda">
                                <FontAwesomeIcon icon={faNodeJs} />
                            </div>
                            <span>NODE.JS</span>
                        </div>
                        <div className="skill-badge-honda">
                            <div className="skill-icon-honda">
                                <FontAwesomeIcon icon={faDatabase} />
                            </div>
                            <span>MONGODB</span>
                        </div>
                        <div className="skill-badge-honda">
                            <div className="skill-icon-honda">
                                <FontAwesomeIcon icon={faGear} />
                            </div>
                            <span>APIs</span>
                        </div>
                    </div>

                    {/* Right Side - BASE SPECS */}
                    <div className="mobile-base-specs-honda">
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
            id="Skills2"
            ref={rootRef}
            className="Skills2-section"
        >
            {/* Big heading */}
            <div
                id="ready2"
                className="ready2-heading"
            >
                <h1>BACKEND</h1>
            </div>

            {/* TV box with bike inside */}
            <div id="tvBox2" className="tvBox2-panel">
                <img
                    id="Honda"
                    src="/assets/skills/honda.png"
                    alt="Honda Bike"
                    className="Honda-img"
                />

                <div id="title-h2" className="title2-overlay">
                    <span className="mb-0 pd-0">
                        <span className="inline-block">Backend</span>
                    </span>
                    <div id="list2" className="list2-label">
                        <span>BASE SPECS</span>
                    </div>
                    <div id="lang2">
                        <span><FontAwesomeIcon icon={faNodeJs} /> Node.js</span>
                        <span><FontAwesomeIcon icon={faDatabase} />MongoDB</span>
                        <span><FontAwesomeIcon icon={faGear} /> </span>
                    </div>
                    <div id="special2" className="special2-overlay">
                        <div id="spSkills2" className="spSkills2-label">SF EDITION</div>
                        <span><FontAwesomeIcon icon={faLocationCrosshairs} />DevOps</span>
                        <span><FontAwesomeIcon icon={faRobot} />FastAPI</span>
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