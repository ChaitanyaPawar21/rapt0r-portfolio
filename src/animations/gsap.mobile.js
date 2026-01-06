/**
 * gsap.mobile.js - Mobile-only BuildSheet animation
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mobile animation for BuildSheet section
 * Simple fade-in reveals
 */
export function initBuildSheetMobile() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#box",
            start: "top 85%",
            end: "+=50%",
            scrub: 0.5,
        },
    });

    // Photo fades in from below
    tl.fromTo(
        "#photo",
        { opacity: 0, y: "10%" },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", force3D: true }
    );

    // Text fades in
    tl.fromTo(
        "#Utext",
        { opacity: 0, y: "5%" },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.3"
    );

    // Paragraphs stagger in
    tl.fromTo(
        "#text p",
        { opacity: 0, y: "5%" },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        "-=0.2"
    );

    return tl;
}
