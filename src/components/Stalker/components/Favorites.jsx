import React, { useRef, useEffect } from 'react';
import { staggerCards, fadeUp } from '../utils/animations';

const Favorites = () => {
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

  const targets = [
    {
      category: 'Anime',
      title: 'Current Obsession',
      img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', // Anime vibe
      desc: 'Usually dark fantasy or psychological. If it messes with my head, I watch it.'
    },
    {
      category: 'Music',
      title: 'Midnight Playlist',
      img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=600&q=80', // Music/Neon vibe
      desc: 'Heavy bass, synthwave, or just pure noise. Depends on the mood.'
    },
    {
      category: 'Series',
      title: 'Binge Material',
      img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80', // Cinematic vibe
      desc: 'Sci-fi thrillers and anything with a chaotic anti-hero.'
    }
  ];

  return (
    <div className="w-full bg-[#050505] py-24" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl md:text-5xl font-black uppercase text-center mb-16 tracking-widest text-[#00ffff]">
          Hall of <span className="text-white">Fame</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((item, idx) => (
            <div 
              key={idx}
              ref={addToRefs}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group"
            >
              <img 
                src={item.img} 
                alt={item.category} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-[#00ffff]/20 border border-[#00ffff] text-[#00ffff] text-xs font-bold uppercase tracking-widest rounded-full w-max mb-3">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
