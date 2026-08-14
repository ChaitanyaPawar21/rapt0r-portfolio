import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

export default function IntroSequence({ onComplete }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const skipBtnRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const isEndingRef = useRef(false);

  // Mobile viewport optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const baseVideoUrl = 'https://ik.imagekit.io/mqketzb2v2/0814%20finla.mp4';
  const videoUrl = isMobile ? `${baseVideoUrl}?tr=w-750` : baseVideoUrl;

  const handleFinish = () => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;

    sessionStorage.setItem('hasSeenIntro', 'true');

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    } else {
      if (onComplete) onComplete();
    }
  };

  // Skip button fade in after 1s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
      if (skipBtnRef.current) {
        gsap.to(skipBtnRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Autoplay with sound on mount (triggered after profile selection)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn('Autoplay with sound failed, attempting muted fallback:', error);
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => handleFinish());
          setIsLoading(false);
        });
    }

    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 25000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleVideoError = () => {
    console.error('Intro video failed to load.');
    setTimeout(() => {
      handleFinish();
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onEnded={handleFinish}
        onError={handleVideoError}
      />

      {/* Minimal Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 transition-opacity duration-300">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
            <div className="absolute w-10 h-10 border-2 border-red-500/40 border-b-red-500 rounded-full animate-spin [animation-direction:reverse]" />
          </div>
          <span className="mt-4 text-xs font-mono tracking-widest text-red-500 uppercase animate-pulse">
            STARTING ENGINE...
          </span>
        </div>
      )}

      {/* Controls Overlay (Mute / Skip) */}
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
        {/* Top Right: Mute Toggle */}
        <div className="flex justify-end pointer-events-auto">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-3 py-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white text-xs font-mono transition-all border border-white/10 hover:border-red-500/50"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-500" />
                <span className="hidden sm:inline text-gray-400">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-green-400" />
                <span className="hidden sm:inline text-gray-300 font-bold">SOUND ON</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Right: Skip Button */}
        {showSkip && (
          <div className="flex justify-end pointer-events-auto">
            <button
              ref={skipBtnRef}
              onClick={handleFinish}
              style={{ opacity: 0 }}
              className="flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-red-600/90 backdrop-blur-md rounded-lg text-white text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 border border-white/20 hover:border-red-500 group shadow-lg"
            >
              <span>SKIP</span>
              <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
