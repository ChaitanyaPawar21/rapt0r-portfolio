import React, { useRef, useEffect } from 'react';
import { staggerCards, fadeUp } from '../utils/animations';

const Activities = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fadeUp(titleRef.current);
    staggerCards(containerRef.current, cardsRef.current);
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const activities = [
    { time: '2:00 AM', event: 'Late Night Coding', desc: 'Fixing bugs that don’t exist', icon: '💻' },
    { time: 'Weekend', event: 'Clubing / Events', desc: 'Losing my voice in the crowd', icon: '🔊' },
    { time: 'Randomly', event: 'Anime Binges', desc: 'Just one more episode', icon: '🎌' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-24 px-4" ref={containerRef}>
      <h2 ref={titleRef} className="text-3xl md:text-5xl font-black uppercase text-center mb-16 tracking-[0.2em] text-white">
        Routine <span className="text-[#ff0055]">Chaos</span>
      </h2>

      <div className="relative border-l border-[#333] ml-4 md:ml-0 md:space-y-12">
        {activities.map((act, idx) => (
          <div 
            key={idx}
            ref={addToRefs}
            className="relative pl-8 md:pl-0 md:flex items-center justify-between mb-8 md:mb-0 group"
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-5px] md:left-[50%] md:translate-x-[-50%] w-3 h-3 rounded-full bg-[#333] group-hover:bg-[#ff0055] group-hover:shadow-[0_0_10px_#ff0055] transition-all duration-300"></div>

            {/* Desktop Layout Helper */}
            <div className={`hidden md:block w-5/12 ${idx % 2 === 0 ? 'text-right pr-12' : 'order-last pl-12'}`}>
              {idx % 2 === 0 && (
                <>
                  <p className="text-[#ff0055] font-bold tracking-widest text-sm mb-1">{act.time}</p>
                  <h3 className="text-2xl font-bold text-white mb-2">{act.event} {act.icon}</h3>
                  <p className="text-gray-400">{act.desc}</p>
                </>
              )}
              {idx % 2 !== 0 && (
                <>
                  <p className="text-[#ff0055] font-bold tracking-widest text-sm mb-1">{act.time}</p>
                  <h3 className="text-2xl font-bold text-white mb-2">{act.icon} {act.event}</h3>
                  <p className="text-gray-400">{act.desc}</p>
                </>
              )}
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden glass-panel p-6 rounded-xl border-l-[3px] border-l-[#ff0055]">
              <p className="text-[#ff0055] font-bold tracking-widest text-xs mb-2">{act.time}</p>
              <h3 className="text-xl font-bold text-white mb-2">{act.icon} {act.event}</h3>
              <p className="text-gray-400 text-sm">{act.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
