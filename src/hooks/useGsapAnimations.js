/**
 * useGsapAnimations.js - React hook for safe GSAP initialization
 * Handles setup and cleanup in useEffect
 */
import { useEffect } from "react";
import { initAnimations, cleanupAnimations, refreshAnimations } from "../animations/gsap.init";

/**
 * Hook to initialize GSAP animations safely in React
 * @param {Array} deps - Optional dependency array to reinitialize animations
 * 
 * @example
 * // Basic usage in a component
 * function App() {
 *   useGsapAnimations();
 *   return <div>...</div>;
 * }
 * 
 * @example
 * // With dependencies (reinitialize when data changes)
 * function App({ content }) {
 *   useGsapAnimations([content]);
 *   return <div>...</div>;
 * }
 */
export function useGsapAnimations(deps = []) {
    useEffect(() => {
        // Small delay to ensure DOM is fully rendered
        const timer = setTimeout(() => {
            initAnimations();
        }, 100);

        // Debounced resize handler to prevent excessive refresh calls
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                refreshAnimations();
            }, 150); // Debounce 150ms
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            clearTimeout(timer);
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", handleResize);
            cleanupAnimations();
        };
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Hook to refresh animations after images/content loads
 * Call when dynamic content affects layout
 */
export function useGsapRefresh() {
    useEffect(() => {
        // Refresh after images load
        const images = document.querySelectorAll("img");
        let loadedCount = 0;

        const handleLoad = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                refreshAnimations();
            }
        };

        images.forEach((img) => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener("load", handleLoad);
            }
        });

        // Final refresh after all images
        if (loadedCount === images.length) {
            refreshAnimations();
        }

        return () => {
            images.forEach((img) => {
                img.removeEventListener("load", handleLoad);
            });
        };
    }, []);
}

export default useGsapAnimations;
