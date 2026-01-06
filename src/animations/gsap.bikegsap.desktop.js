/**
 * gsap.bikegsap.desktop.js - BikeGsap (Frontend Skills) Desktop Animation
 * Cinematic ScrollTrigger timeline with layered effects
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop animation for BikeGsap (Frontend Skills) section
 * Full cinematic timeline: bike enters, moves, skills stagger in
 */
export function initBikeGsapDesktop() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
        },
    });

    // Initial state
    gsap.set("#special", { opacity: 0 });

    // 1) Move heading out of screen
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

    // 3) Scale down TV with rounded corners
    tl.to("#tvBox", {
        scale: 0.8,
        borderRadius: "20%",
        duration: 7,
        ease: "power2.out",
        transformOrigin: "center center",
        force3D: true,
    });

    // 4) Frontend title pop
    tl.from("#title-h1", { scale: 0 });

    // 5) Bike: center → left
    tl.fromTo(
        "#ducati",
        { xPercent: 0 },
        { xPercent: -50, duration: 4, ease: "power1.inOut", force3D: true }
    );

    // 6) Stagger in skill labels
    tl.fromTo(
        "#lang span",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.5, ease: "back.out(1.7)" }
    );

    // 7) Hold bike position
    tl.fromTo(
        "#ducati",
        { xPercent: -50 },
        { xPercent: -50, duration: 4, ease: "power1.inOut" }
    );

    // 8) Bike: left → right exit
    tl.to("#ducati", {
        xPercent: 60,
        duration: 10,
        ease: "power1.inOut",
        force3D: true,
    });

    // 9) Fade out base skills
    tl.to("#lang", { opacity: 0, duration: 3, ease: "power1.inOut" }, "<");
    tl.to("#list", { opacity: 0, duration: 1 }, "<");

    // 10) Show special skills section
    tl.to("#special", { opacity: 1, duration: 0.3 });
    tl.from("#spSkills", { scale: 0, duration: 0.5 });

    // 11) Stagger special skill badges
    tl.fromTo(
        "#special span",
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
    );

    return tl;
}
