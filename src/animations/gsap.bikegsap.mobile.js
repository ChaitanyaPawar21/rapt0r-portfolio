/**
 * gsap.bikegsap.mobile.js - BikeGsap (Frontend Skills) Mobile Animation
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
 * Mobile animation for BikeGsap (Frontend Skills) section
 * Simplified: fade in, subtle slide, skills stagger
 */
export function initBikeGsapMobile() {
    // Ensure content is visible immediately (prevent CLS)
    gsap.set(["#tvBox", "#ducati", "#title-h1", "#lang", "#special"], {
        visibility: "visible",
    });
    gsap.set("#special", { opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            end: "+=150%",
            scrub: 0.5,
            pin: pin, // No pinning on mobile for smoother scroll
        },
    });

    // 1) Heading fades up and out (subtle)
    tl.to("#ready h1", {
        yPercent: -50,
        opacity: 0.3,
        duration: 0.5,
        ease: "power2.out",
    });

    // 2) TV box fades in with scale
    tl.fromTo(
        "#tvBox",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }
    );

    // 3) Bike fades in with subtle horizontal slide (max 10%)
    tl.fromTo(
        "#ducati",
        { opacity: 0, xPercent: -10 },
        { opacity: 1, xPercent: 0, duration: 0.6, ease: "power2.out", force3D: true }
    );

    // 4) Frontend title fades in
    tl.fromTo(
        "#title-h1",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3"
    );

    // 5) Skills stagger in quickly
    tl.fromTo(
        "#lang span",
        { opacity: 0, y: "10%" },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" }
    );

    // 6) Bike slides slightly right (stays visible!)
    tl.to("#ducati", {
        xPercent: 10, // Small movement, never off-screen
        duration: 0.5,
        ease: "power2.inOut",
        force3D: true,
    });

    // 7) Fade out base skills, show special
    tl.to("#lang", { opacity: 0, duration: 0.3 }, "-=0.2");
    tl.to("#list", { opacity: 0, duration: 0.3 }, "<");
    tl.to("#special", { opacity: 1, duration: 0.4 });

    // 8) Special skills fade in with stagger
    tl.fromTo(
        "#special span",
        { opacity: 0, y: "10%" },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
    );

    return tl;
}
