import React, { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { staggerCards, fadeUp } from '../utils/animations';

const VideoGallery = () => {
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

  const videos = [
    { title: 'Concert Vibes', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80' },
    { title: 'Night Drive', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80' },
    { title: 'Neon Lights', img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80' },
    { title: 'Chaos', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="w-full py-24 bg-[#0a0a0a]" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12" ref={titleRef}>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-widest">
            Visual <span className="neon-text-cyan">Logs</span>
          </h2>
          <span className="text-gray-500 text-sm hidden md:block">Scroll →</span>
        </div>

        {/* Mobile Horizontal Scroll, Desktop Grid */}
        <div className="flex overflow-x-auto hide-scrollbar md:grid md:grid-cols-4 gap-6 pb-8 md:pb-0">
          {videos.map((vid, idx) => (
            <div 
              key={idx}
              ref={addToRefs}
              className="relative min-w-[280px] md:min-w-0 h-[400px] md:h-[300px] rounded-xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={vid.img} 
                alt={vid.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500"></div>
              
              {/* Fake Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="w-16 h-16 rounded-full bg-[#00ffff]/20 border border-[#00ffff] flex items-center justify-center backdrop-blur-md">
                  <Play size={24} className="text-[#00ffff] ml-1" fill="#00ffff" />
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-lg">{vid.title}</p>
                <div className="w-8 h-1 bg-[#00ffff] mt-2 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
