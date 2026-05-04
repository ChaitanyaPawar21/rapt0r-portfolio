import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeUp = (element, delay = 0, yOffset = 50) => {
  gsap.fromTo(element, 
    { opacity: 0, y: yOffset },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: 'power3.out', 
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
};

export const staggerCards = (container, elements, staggerTime = 0.1) => {
  gsap.fromTo(elements,
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: staggerTime,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
};

export const parallaxEffect = (element, speed = 0.5) => {
  gsap.to(element, {
    y: () => (window.innerHeight * speed),
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });
};

export const heroTextReveal = (elements) => {
  gsap.fromTo(elements,
    { y: 100, opacity: 0, rotateX: -45 },
    { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      duration: 1.2, 
      stagger: 0.2, 
      ease: 'power4.out',
      delay: 0.5
    }
  );
};

export const floatAnimation = (element, yVar = 15, duration = 3) => {
  gsap.to(element, {
    y: yVar,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
};
