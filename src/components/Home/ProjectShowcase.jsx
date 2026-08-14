// src/components/ProjectShowcase.js (repurposed as Skills / Performance Specifications)
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({ skill }) => {
  return (
    <div
      className="group relative w-[80vw] md:w-[40vw] h-[60vh] flex-shrink-0 flex flex-col justify-end p-8 md:p-12 overflow-hidden rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] shadow-md transition-all duration-500 hover:-translate-y-4 hover:shadow-[var(--shadow)] backdrop-blur-md"
      role="group"
      aria-label={`${skill.title} skill card`}
    >
      <div
        className="absolute top-4 right-8 font-[Bebas Neue] text-8xl md:text-[10rem] text-[var(--num-color)] select-none group-hover:text-[var(--accent)] group-hover:opacity-10 transition-colors duration-700"
        aria-hidden
      >
        {skill.id}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="font-[Rajdhani] tracking-widest text-xs font-bold uppercase mb-4 text-[var(--accent-soft)]">
          {skill.tag}
        </div>

        <div className="mt-auto">
          <h4 className="font-[Bebas Neue] text-4xl md:text-5xl text-[var(--text)] uppercase mb-4 group-hover:text-[var(--accent)] transition-colors">
            {skill.title}
          </h4>

          <p className="font-[Inter] text-[var(--muted)] text-sm md:text-base line-clamp-3 mb-6 font-medium">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-2 border-t border-[var(--card-border)] pt-4">
            {skill.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs border border-[var(--stack-border)] px-3 py-1 text-[var(--accent)] bg-[var(--stack-bg)] font-semibold rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)] mt-3">
            <span className="font-[Inter] text-xs text-[var(--muted)] font-semibold uppercase tracking-wider">
              {skill.proficiency}
            </span>
            <button
              className="w-10 h-10 rounded-full border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors"
              type="button"
              aria-label="Skill details"
              onClick={() => {
                window.open(skill.github, "_blank", "noopener,noreferrer");
              }}
            >
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectShowcase = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const skills = useMemo(
    () => [
      {
        id: "01",
        tag: "[Frontend · Arsenal]",
        title: "Personal Portfolio",
        description:
          "Interfaces engineered for speed and clarity: animation, state, and performance—built to feel premium under pressure.",
        stack: ["React", "GSAP", "Tailwind"],
        proficiency: "I Love bikes",
        github: "https://github.com/ChaitanyaPawar21/rapt0r-portfolio",
      },
      {
        id: "02",
        tag: "[Backend · Infrastructure]",
        title: "LeetGPT",
        description:
          "AI- based DSA assistant to help you learn and understand DSA questions",
        stack: ["Node.js", "MongoDB", "Agentic AI", "Auth"],
        proficiency: "Latency-tuned reliability",
        github: "https://github.com/ChaitanyaPawar21/LeetGPT",
      },
      {
        id: "03",
        tag: "[Game Dev · Reality]",
        title: "SOON",
        description:
          "Simulation-minded engineering: gameplay loops, terminal UX, and performant logic for interactive experiences.",
        stack: ["SOON"],
        proficiency: "Systems-first playability",
        github: "https://github.com/ChaitanyaPawar21/",
      },
      {
        id: "04",
        tag: "[AI/ML · DevOps Engine]",
        title: "AI/ML + DevOps",
        description:
          "From pipelines to production: model tooling, orchestration, and deployment discipline—automated where it matters.",
        stack: ["FastAPI", "FAISS", "Docker", "CI/CD"],
        proficiency: "Shipped & monitored",
        github: "https://github.com/ChaitanyaPawar21/",
      },
    ],
    [],
  );

  useEffect(() => {
    const pinWrap = scrollRef.current;
    const container = containerRef.current;
    if (!pinWrap || !container) return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const getScrollWidth = () =>
      Math.max(0, pinWrap.scrollWidth - window.innerWidth);

    ScrollTrigger.refresh();

    let tween = null;
    const createTween = () => {
      if (tween) {
        try {
          tween.scrollTrigger?.kill?.();
          tween.kill?.();
        } catch (e) {
          /* noop */
        }
      }
      tween = gsap.to(pinWrap, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          invalidateOnRefresh: true,
          onLeave: () => {
            const machines = document.getElementById("machines");
            if (!machines) return;
            machines.classList.remove(
              "opacity-0",
              "pointer-events-none",
              "translate-y-8",
            );
            machines.classList.add("opacity-100", "translate-y-0");
          },
          onEnterBack: () => {
            const machines = document.getElementById("machines");
            if (!machines) return;
            machines.classList.add(
              "opacity-0",
              "pointer-events-none",
              "translate-y-8",
            );
            machines.classList.remove("opacity-100", "translate-y-0");
          },
        },
      });
    };

    createTween();

    // Recreate on resize to recalc widths
    let resizeTimeout = null;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        createTween();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      if (tween) {
        try {
          tween.scrollTrigger?.kill?.();
          tween.kill?.();
        } catch (e) {
          /* noop */
        }
      }
    };
  }, [skills]);

  const cssVars = darkMode
    ? {
        "--accent": "#ff6b35",
        "--accent-soft": "rgba(255,107,53,0.85)",
        "--bg": "#070707",
        "--card-bg": "#0f0f0f",
        "--card-border": "rgba(255,107,53,0.25)",
        "--text": "#f0ece4",
        "--muted": "rgba(240,236,228,0.78)",
        "--stack-bg": "rgba(0, 0, 0, 0.4)",
        "--stack-border": "rgba(255,107,53,0.25)",
        "--num-color": "rgba(255,255,255,0.06)",
        "--shadow": "0 0 45px rgba(255,77,0,0.18)",
        "--watermark-stroke": "2px rgba(255,107,53,0.85)",
      }
    : {
        "--accent": "#ea580c",
        "--accent-soft": "#c2410c",
        "--bg": "#f8fafc",
        "--card-bg": "#ffffff",
        "--card-border": "rgba(234,88,12,0.25)",
        "--text": "#0f172a",
        "--muted": "#475569",
        "--stack-bg": "rgba(234,88,12,0.08)",
        "--stack-border": "rgba(234,88,12,0.30)",
        "--num-color": "rgba(0,0,0,0.06)",
        "--shadow": "0 10px 30px rgba(234,88,12,0.12)",
        "--watermark-stroke": "2px rgba(234,88,12,0.35)",
      };

  return (
    <section
      ref={containerRef}
      id="custom-builds"
      className="relative w-full h-screen bg-[var(--bg)] overflow-hidden flex items-center"
      style={cssVars}
      aria-label="Performance Specifications Skills section"
    >
      {/* Background Decor */}
      <div className="absolute top-20 left-20 pointer-events-none opacity-20">
        <h2
          className="font-[Bebas Neue] text-[15vw]"
          style={{
            WebkitTextStroke: "var(--watermark-stroke)",
            color: "transparent",
            letterSpacing: "2px",
          }}
        >
          PROJECTS
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex h-full items-center px-[10vw] gap-[5vw] relative z-10 w-[400vw] lg:w-[250vw]"
      >
        {/* Intro Card */}
        <div className="w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center">
          <h3 className="font-[Bebas Neue] text-5xl md:text-7xl text-[var(--accent)] uppercase tracking-wide">
            Built Different
          </h3>
          <p className="font-[Inter] text-[var(--muted)] mt-6 text-sm md:text-base leading-relaxed max-w-sm font-medium">
            Horizontal scroll through my capabilities—UI craft, systems depth,
            interactive logic, and deployment discipline.
          </p>
        </div>

        {/* Skill Cards */}
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;

