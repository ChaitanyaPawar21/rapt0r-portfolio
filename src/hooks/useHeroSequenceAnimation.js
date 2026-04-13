import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const padFrameNumber = (frameNumber) => String(frameNumber).padStart(3, "0");

export const buildHeroFramePaths = (totalFrames, basePath) =>
  Array.from(
    { length: totalFrames },
    (_, index) =>
      `${basePath}/ezgif-frame-${padFrameNumber(index + 1)}.jpg`
  );

export const preloadImageSequence = (frames, loadedImagesArray, onImageLoad) => {
  const concurrency = 8;

  let inFlight = 0;
  let cursor = 0;
  let doneCount = 0;

  return new Promise((resolve) => {
    const startNext = () => {
      if (doneCount === frames.length) {
        resolve(loadedImagesArray);
        return;
      }

      while (inFlight < concurrency && cursor < frames.length) {
        const index = cursor;
        const src = frames[index];
        cursor += 1;
        inFlight += 1;

        new Promise((res) => {
          const image = new Image();
          image.src = src;
          image.decoding = "async";
          image.onload = () => {
            loadedImagesArray[index] = image;
            if (onImageLoad) onImageLoad();
            res();
          };
          image.onerror = () => res();
        }).then(() => {
          inFlight -= 1;
          doneCount += 1;
          startNext();
        });
      }
    };

    startNext();
  });
};

const getNearestLoadedFrameIndex = (loadedImages, targetIndex) => {
  if (loadedImages[targetIndex]) return targetIndex;
  for (let delta = 1; delta < loadedImages.length; delta += 1) {
    const nextIndex = targetIndex + delta;
    const prevIndex = targetIndex - delta;
    if (nextIndex < loadedImages.length && loadedImages[nextIndex]) return nextIndex;
    if (prevIndex >= 0 && loadedImages[prevIndex]) return prevIndex;
  }
  return -1;
};

const drawCoverImage = (canvas, context, image) => {
  if (!canvas || !context || !image?.width || !image?.height) return;

  const canvasWidth = canvas.clientWidth || window.innerWidth;
  const canvasHeight = canvas.clientHeight || window.innerHeight;
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  const hRatio = canvasWidth / image.width;
  const vRatio = canvasHeight / image.height;
  const ratio = Math.max(hRatio, vRatio);
  const drawWidth = image.width * ratio;
  const drawHeight = image.height * ratio;
  const offsetX = (canvasWidth - drawWidth) / 2;
  const offsetY = (canvasHeight - drawHeight) / 2;

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
};

export const useHeroSequenceAnimation = ({ totalFrames = 80, basePath = "/assets/hero" } = {}) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const loadedImagesRef = useRef([]);

  const framePaths = useMemo(
    () => buildHeroFramePaths(totalFrames, basePath),
    [basePath, totalFrames]
  );

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current || framePaths.length === 0) return undefined;

    let mounted = true;
    let rafId = null;
    let lastDrawnFrame = -1;
    let heroTimeline = null;
    let textTimeline = null;
    const playhead = { frame: 0 };
    const canvas = canvasRef.current;

    // Ensure canvas is non-interactive and block-level
    try {
      canvas.style.pointerEvents = "none";
      canvas.style.display = "block";
    } catch (e) {
      // ignore (server-side rendering safety)
    }

    let context;
    try {
      context = canvas.getContext("2d", { alpha: false });
    } catch (e) {
      console.warn("Unable to acquire 2D context for hero canvas:", e);
      return undefined;
    }
    if (!context) return undefined;

    let lastDrawnImageIndex = -1;

    const setCanvasSize = () => {
      const cssWidth = Math.max(1, Math.round(window.innerWidth));
      const cssHeight = Math.max(1, Math.round(window.innerHeight));
      const dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      
      // Force redraw after canvas is cleared
      lastDrawnImageIndex = -1;
    };

    const queueFrameDraw = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const loadedImages = loadedImagesRef.current || [];
        if (!loadedImages.length) return;

        const frameIndex = Math.min(loadedImages.length - 1, Math.round(playhead.frame));
        const nearestIndex = getNearestLoadedFrameIndex(loadedImages, frameIndex);
        
        if (nearestIndex === -1 || nearestIndex === lastDrawnImageIndex) return;
        
        lastDrawnImageIndex = nearestIndex;
        const image = loadedImages[nearestIndex];
        drawCoverImage(canvasRef.current, context, image);
      });
    };

    const firstImage = new Image();
    firstImage.src = framePaths[0];
    firstImage.decoding = "sync";
    firstImage.onload = () => {
      if (!mounted) return;
      setCanvasSize();
      drawCoverImage(canvasRef.current, context, firstImage);
    };

    let resizeTimeout = null;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        try { ScrollTrigger.refresh(); } catch (e) { /* noop */ }
      }, 100);
    };
    window.addEventListener("resize", onResize);

    // Create ScrollTriggers immediately so ScrollTrigger's start/end mapping
    // stays stable even while images are still loading.
    loadedImagesRef.current = new Array(framePaths.length);

    heroTimeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        id: "hero-sequence-trigger",
        trigger: sectionRef.current,
        start: "top top",
        end: "+=140%",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    heroTimeline
      .to(playhead, {
        frame: framePaths.length - 1,
        snap: "frame",
        onUpdate: queueFrameDraw,
      }, 0)
      .fromTo(canvasRef.current, { scale: 1 }, { scale: 1 }, 0)
      .fromTo(overlayRef.current, { opacity: 0.2 }, { opacity: 0.5 }, 0);

    textTimeline = gsap.timeline({
      scrollTrigger: {
        id: "hero-text-trigger",
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    });

    textTimeline
      .fromTo(eyebrowRef.current, { yPercent: 20, opacity: 0.7 }, { yPercent: -10, opacity: 1 }, 0)
      .fromTo(titleRef.current, { yPercent: 18, opacity: 0.75 }, { yPercent: -15, opacity: 1 }, 0)
      .fromTo(subtitleRef.current, { yPercent: 20, opacity: 0.7 }, { yPercent: -12, opacity: 1 }, 0)
      .fromTo(ctaRef.current, { yPercent: 24, opacity: 0.65 }, { yPercent: -8, opacity: 1 }, 0);

    requestAnimationFrame(() => {
      if (!mounted) return;
      try { ScrollTrigger.refresh(); } catch (e) { /* noop */ }
    });

    preloadImageSequence(framePaths, loadedImagesRef.current, () => {
      if (mounted) queueFrameDraw();
    }).then(() => {
      if (!mounted || !sectionRef.current || !canvasRef.current) return;
      try { ScrollTrigger.refresh(); } catch (e) { /* noop */ }
    });

    return () => {
      mounted = false;
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      try {
        if (heroTimeline) { heroTimeline.scrollTrigger?.kill?.(); heroTimeline.kill?.(); }
        if (textTimeline) { textTimeline.scrollTrigger?.kill?.(); textTimeline.kill?.(); }
      } catch (e) {
        /* ignore */
      }
      loadedImagesRef.current = [];
    };
  }, [framePaths]);

  return {
    refs: {
      sectionRef,
      canvasRef,
      overlayRef,
      eyebrowRef,
      titleRef,
      subtitleRef,
      ctaRef,
    },
  };
};
