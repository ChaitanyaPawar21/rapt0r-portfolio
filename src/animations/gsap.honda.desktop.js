/**
 * gsap.honda.desktop.js - Honda (Backend Skills) Desktop Animation
 * Cinematic ScrollTrigger timeline with layered effects
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop animation for Honda (Backend Skills) section
 * Full cinematic timeline similar to BikeGsap
 */
export function initHondaDesktop() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#Skills2",
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
        },
    });

    // Initial state
    gsap.set("#special2", { opacity: 0 });

    // 1) Move heading up
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

    // 3) Scale down TV with rounded corners
    tl.to("#tvBox2", {
        scale: 0.8,
        borderRadius: "20%",
        duration: 7,
        ease: "power2.out",
        transformOrigin: "center center",
        force3D: true,
    });

    // 4) Backend title pop
    tl.from("#title-h2", { scale: 0 });

    // 5) Bike: center → left
    tl.fromTo(
        "#Honda",
        { xPercent: 0 },
        { xPercent: -50, duration: 4, ease: "power1.inOut", force3D: true }
    );

    // 6) Stagger in skill labels
    tl.fromTo(
        "#lang2 span",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.5, ease: "back.out(1.7)" }
    );

    // 7) Hold bike position
    tl.fromTo(
        "#Honda",
        { xPercent: -50 },
        { xPercent: -50, duration: 4, ease: "power1.inOut" }
    );

    // 8) Bike: left → right exit
    tl.to("#Honda", {
        xPercent: 50,
        duration: 10,
        ease: "power1.inOut",
        force3D: true,
    });

    // 9) Fade out base skills
    tl.to("#lang2", { opacity: 0, duration: 3, ease: "power1.inOut" }, "<");
    tl.to("#list2", { opacity: 0, duration: 1 }, "<");

    // 10) Show special skills section
    tl.to("#special2", { opacity: 1, duration: 0.3 });
    tl.from("#spSkills2", { scale: 0, duration: 0.5 });

    // 11) Stagger special skill badges
    tl.fromTo(
        "#special2 span",
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
    );

    return tl;
}
