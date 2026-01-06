/**
 * gsap.desktop.js - Desktop-only BuildSheet animation
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop animation for BuildSheet section
 * Photo slides in, text reveals with stagger
 */
export function initBuildSheetDesktop() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#box",
            start: "-30% top",
            end: "+=100%",
            pin: false,
        },
    });

    tl.from("#photo", {
        x: 200,
        opacity: 0,
        duration: 1,
        force3D: true,
    }).from(
        "#Utext",
        { y: 300, opacity: 0, duration: 1 },
        "-=0.5"
    );

    tl.from(
        "#text p",
        { x: -300, opacity: 0, duration: 1, stagger: 0.2, force3D: true },
        "-=0.5"
    );

    return tl;
}
