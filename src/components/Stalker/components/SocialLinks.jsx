import React, { useRef, useEffect } from 'react';
import { Instagram, Music, MessageSquare } from 'lucide-react';
import { staggerCards, fadeUp } from '../utils/animations';
import gsap from 'gsap';

const SocialLinks = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    fadeUp(titleRef.current);
    staggerCards(containerRef.current, cardsRef.current);

    // Tilt hover effect
    cardsRef.current.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        gsap.to(card, {
          rotateY: ((x - centerX) / centerX) * 10,
          rotateX: ((centerY - y) / centerY) * 10,
          perspective: 1000,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
      });
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const socials = [
    {
      name: 'Instagram',
      icon: <Instagram size={32} className="text-[#ff0055]" />,
      url: 'https://instagram.com/chaitanyapawar21', // Filled with user's github name base, could be random
      primary: false,
      label: 'Main feed'
    },
    {
      name: 'Spotify',
      icon: <Music size={32} className="text-[#1DB954]" />,
      url: 'https://open.spotify.com/', 
      primary: false,
      label: 'On repeat'
    },
    {
      name: 'Discord',
      icon: <MessageSquare size={32} className="text-[#5865F2]" />,
      url: 'https://discord.com/', 
      primary: false,
      label: 'Late nights'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-4" ref={containerRef}>
      <h2 ref={titleRef} className="text-3xl md:text-5xl font-black uppercase text-center mb-16 tracking-widest neon-text-pink">
        Socials
      </h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {socials.map((social, idx) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={addToRefs}
            className={`
              glass-panel rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all duration-300
              ${social.primary ? 'md:w-1/2 neon-border scale-105 z-10' : 'md:w-1/4 border-[#333] hover:border-[#ff0055]'}
              group
            `}
          >
            <div className={`
              rounded-full flex items-center justify-center bg-[#111] transition-transform duration-500 group-hover:scale-110
              ${social.primary ? 'w-20 h-20' : 'w-20 h-20'}
            `}>
              {social.icon}
            </div>
            <div className="text-center">
              <h3 className={`font-bold ${social.primary ? 'text-2xl neon-text-pink' : 'text-xl text-white'}`}>{social.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{social.label}</p>
            </div>
            {social.primary && (
              <div className="absolute inset-0 rounded-2xl bg-[#ff0055] opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
