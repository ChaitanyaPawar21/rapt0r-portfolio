/**
 * gsap.honda.mobile.js - Honda (Backend Skills) Mobile Animation
 * Simplified, fast, UX-friendly animations
 * - No fixed pixel values (uses vw, vh, %)
 * - Shorter durations (0.4-0.7s)
 * - Bike stays visible, subtle movements only
 * - Text readability prioritized
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mobile animation for Honda (Backend Skills) section
 * Same simplified approach as BikeGsap
 */
export function initHondaMobile() {
    // Ensure content is visible immediately
    gsap.set(["#tvBox2", "#Honda", "#title-h2", "#lang2", "#special2"], {
        visibility: "visible",
    });
    gsap.set("#special2", { opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#Skills2",
            start: "top 80%",
            end: "+=150%",
            scrub: 0.5,
            pin: false,
        },
    });

    // 1) Heading fades up (subtle)
    tl.to("#ready2 h1", {
        yPercent: -30,
        opacity: 0.3,
        duration: 0.5,
        ease: "power2.out",
    });

    // 2) TV box fades in
    tl.fromTo(
        "#tvBox2",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }
    );

    // 3) Honda bike fades in with subtle slide
    tl.fromTo(
        "#Honda",
        { opacity: 0, xPercent: -10 },
        { opacity: 1, xPercent: 0, duration: 0.6, ease: "power2.out", force3D: true }
    );

    // 4) Backend title fades in
    tl.fromTo(
        "#title-h2",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3"
    );

    // 5) Skills stagger in
    tl.fromTo(
        "#lang2 span",
        { opacity: 0, y: "10%" },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" }
    );

    // 6) Bike slides slightly (stays fully visible)
    tl.to("#Honda", {
        xPercent: 10,
        duration: 0.5,
        ease: "power2.inOut",
        force3D: true,
    });

    // 7) Transition to special skills
    tl.to("#lang2", { opacity: 0, duration: 0.3 }, "-=0.2");
    tl.to("#list2", { opacity: 0, duration: 0.3 }, "<");
    tl.to("#special2", { opacity: 1, duration: 0.4 });

    // 8) Special skills stagger in
    tl.fromTo(
        "#special2 span",
        { opacity: 0, y: "10%" },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
    );

    return tl;
}
