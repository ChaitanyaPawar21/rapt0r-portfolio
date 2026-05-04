import React, { useRef, useEffect } from 'react';
import { heroTextReveal } from '../utils/animations';
import gsap from 'gsap';

const StalkerHero = () => {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Background Ken Burns effect
    gsap.to(bgRef.current, {
      scale: 1.15,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Text reveal
    heroTextReveal([textRef1.current, textRef2.current, textRef3.current]);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Layer - Image Carousel/Parallax ready for Video */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')` }}
      ></div>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 glitch-wrapper">
          <span ref={textRef1} className="glitch-text block text-white" data-text="THIS IS THE">THIS IS THE</span>
          <span ref={textRef2} className="glitch-text block neon-text-pink" data-text="REAL ME">REAL ME</span>
        </h1>
        
        <p ref={textRef3} className="text-xl md:text-2xl text-gray-400 font-light mt-6 max-w-xl">
          Not the recruiter version. <br/>
          <span className="text-white font-medium">You weren't supposed to see this.</span>
        </p>

        {/* CTA */}
        <div className="absolute bottom-12 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Stalk more</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#ff0055] to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default StalkerHero;
