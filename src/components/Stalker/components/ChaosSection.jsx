import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ChaosSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.chaos-element');
    
    // Random float animations for elements
    elements.forEach(el => {
      gsap.to(el, {
        y: `random(-20, 20)`,
        x: `random(-20, 20)`,
        rotation: `random(-5, 5)`,
        duration: `random(2, 4)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

  }, []);

  return (
    <div className="relative w-full min-h-[80vh] bg-[#111] overflow-hidden py-20" ref={containerRef}>
      <h2 className="text-center text-4xl md:text-6xl font-black text-white mix-blend-difference z-10 relative pointer-events-none uppercase tracking-tighter mb-10">
        Mind <span className="glitch-wrapper"><span className="glitch-text" data-text="PALACE">PALACE</span></span>
      </h2>

      {/* Chaotic Masonry / Random Placement Container */}
      <div className="relative max-w-6xl mx-auto h-[600px]">
        {/* Item 1 */}
        <div className="chaos-element absolute top-[10%] left-[5%] w-64 p-4 glass-panel border-[#ff0055] border rotate-[-3deg]">
          <p className="text-xs text-[#ff0055] mb-2 font-mono">LOG_01</p>
          <img src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=400&q=80" alt="random" className="w-full h-32 object-cover grayscale opacity-70 mb-2"/>
          <p className="text-white font-bold">Sleep is a myth.</p>
        </div>

        {/* Item 2 */}
        <div className="chaos-element absolute top-[40%] right-[10%] w-72 p-6 bg-black border border-[#00ffff] rotate-[2deg] shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <p className="text-xl font-bold text-[#00ffff] mb-1">Meme.exe</p>
          <p className="text-gray-400 text-sm">Error 404: Motivation not found until 2 AM.</p>
        </div>

        {/* Item 3 */}
        <div className="chaos-element absolute bottom-[15%] left-[25%] md:left-[40%] text-6xl md:text-8xl font-black text-transparent [-webkit-text-stroke:2px_#333] hover:[-webkit-text-stroke:2px_#ff0055] transition-colors cursor-crosshair">
          CHAOS
        </div>

        {/* Item 4 */}
        <div className="chaos-element absolute top-[5%] right-[30%] w-48 hidden md:block">
          <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80" alt="abstract" className="w-full rounded-full border-4 border-[#111] shadow-[0_0_30px_#ff0055] aspect-square object-cover" />
        </div>

        {/* Item 5 */}
        <div className="chaos-element absolute bottom-[5%] right-[5%] w-56 p-4 glass-panel border-[#333]">
          <p className="font-mono text-gray-500 text-xs">System check... FAILED.</p>
          <div className="w-full h-2 bg-[#333] mt-2 rounded">
            <div className="w-3/4 h-full bg-[#ff0055] rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaosSection;
