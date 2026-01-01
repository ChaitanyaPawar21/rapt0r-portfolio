// src/components/PerformanceSpecs.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useTheme } from './ThemeContext';
import './BikeSkills/bikeGsap.css'; // keep styling

const PerformanceSpecs = () => {
  const { darkMode, theme } = useTheme();
  const navigate = useNavigate();

  // All your cards (unchanged)
  const skills = [
    {
      category: 'Skills',
      items: [],
      level: 50,
      route: '#skills',
      backgroundImage: '/assets/parts/bike.png',
    },
    {
      category: 'Backend Engine',
      items: ['Node.js', 'MongoDB', 'GoLang'],
      level: 10,
      route: '/reliable-honda',
      backgroundImage: '/assets/parts/inline.png',
    },
    {
      category: 'DevOps ECU',
      items: ['Docker', 'AWS', 'Kubernetes'],
      level: 60,
      route: '#skills',                    // ⬅ scroll target
      backgroundImage: '/assets/parts/ecu.png',
    },
    {
      category: 'DSA (C++) Torque',
      items: ['Maps & Sets', 'Trees & Graphs', 'Sorting & Searching'],
      level: 30,
      route: '/data-structures',
      backgroundImage: '/assets/parts/torque.png',
    },
  ];

  // 🔥 Scroll or Navigate Based on Route
  const handleClick = (skill) => {
    if (skill.route.startsWith('#')) {
      const target = document.getElementById(skill.route.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(skill.route);
    }
  };

  return (
    <div className={`${theme.border} border-t pt-12`}>
      <h3 className={`text-2xl font-bold mb-8 ${theme.accent}`}>
        PERFORMANCE SPECIFICATIONS
      </h3>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {skills.map((skill) => (
          <button
            key={skill.category}
            type="button"
            onClick={() => handleClick(skill)}  // ⬅ UI same, action changed
            className={`
              relative w-full p-6 rounded-xl cursor-pointer
              overflow-hidden select-none text-left
              ${theme.bgTertiary} ${theme.border} border
              ${theme.cardHover} hover:scale-105 active:scale-95
              transition-all duration-300 focus:ring-2
              focus:ring-orange-500 outline-none
            `}
            style={{
              backgroundImage: `url('${skill.backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

            <div className="relative z-10 text-white">

              {/* TITLE + ICON */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-base md:text-lg tracking-wider">
                  {skill.category.toUpperCase()}
                </h4>
                <Zap size={20} className={theme.accent} />
              </div>

              {/* PROGRESS BAR */}
              <div className="mb-4">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-300'} h-2 rounded-full`}>
                  <div
                    className={`h-full transition-all duration-1000 
                      ${darkMode
                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                        : 'bg-gradient-to-r from-orange-600 to-red-600'
                      }`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className={`text-right text-sm font-bold ${theme.accent}`}>
                  {skill.level}%
                </p>
              </div>

              {/* SKILLS LIST */}
              <ul className="space-y-2 text-sm">
                {skill.items.map((item) => (
                  <li key={item} className="flex">
                    <span className={`${theme.accent} mr-2`}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          </button>
        ))}
      </div>

      <br />
      (If bar is less than 50% = skill is still in progress 🚧)
    </div>
  );
};

export default PerformanceSpecs;
