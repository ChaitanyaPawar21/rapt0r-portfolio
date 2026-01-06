/**
 * gsap.init.js - Central GSAP initializer using matchMedia
 * Automatically switches between desktop/mobile animations on resize
 * Handles cleanup to prevent duplicate timelines
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// BikeGsap and Honda use individual files
import { initBikeGsapDesktop } from "./gsap.bikegsap.desktop";
import { initBikeGsapMobile } from "./gsap.bikegsap.mobile";
import { initHondaDesktop } from "./gsap.honda.desktop";
import { initHondaMobile } from "./gsap.honda.mobile";

// BuildSheet remains in original structure
import { initBuildSheetDesktop } from "./gsap.desktop";
import { initBuildSheetMobile } from "./gsap.mobile";

gsap.registerPlugin(ScrollTrigger);

// Store matchMedia context for cleanup
let mm = null;

/**
 * Initialize all GSAP animations with responsive breakpoints
 * Automatically cleans up and reinitializes on resize
 */
export function initAnimations() {
    // Kill any existing context to prevent duplicates
    if (mm) {
        mm.revert();
    }

    mm = gsap.matchMedia();

    // Desktop animations (≥768px)
    mm.add("(min-width: 768px)", () => {
        console.log("[GSAP] Initializing desktop animations");

        // Initialize all desktop animation timelines
        const bikeTimeline = initBikeGsapDesktop();
        const hondaTimeline = initHondaDesktop();
        const buildSheetTimeline = initBuildSheetDesktop();

        // Return cleanup function (called automatically on breakpoint change)
        return () => {
            console.log("[GSAP] Cleaning up desktop animations");
            if (bikeTimeline) bikeTimeline.kill();
            if (hondaTimeline) hondaTimeline.kill();
            if (buildSheetTimeline) buildSheetTimeline.kill();
        };
    });

    // Mobile animations (≤767px)
    mm.add("(max-width: 767px)", () => {
        console.log("[GSAP] Initializing mobile animations");

        // Initialize simplified mobile animations
        const bikeTimeline = initBikeGsapMobile();
        const hondaTimeline = initHondaMobile();
        const buildSheetTimeline = initBuildSheetMobile();

        // Return cleanup function
        return () => {
            console.log("[GSAP] Cleaning up mobile animations");
            if (bikeTimeline) bikeTimeline.kill();
            if (hondaTimeline) hondaTimeline.kill();
            if (buildSheetTimeline) buildSheetTimeline.kill();
        };
    });

    return mm;
}

/**
 * Cleanup all GSAP animations and ScrollTriggers
 * Call this on component unmount
 */
export function cleanupAnimations() {
    if (mm) {
        mm.revert();
        mm = null;
    }
    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach((st) => st.kill());
    // Kill all active tweens
    gsap.killTweensOf("*");
}

/**
 * Refresh ScrollTrigger calculations
 * Useful after DOM content changes or images load
 */
export function refreshAnimations() {
    ScrollTrigger.refresh();
}
