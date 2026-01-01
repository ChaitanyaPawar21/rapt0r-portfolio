// src/components/ProjectShowcase.js
import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ProjectShowcase = () => {
  const { darkMode, theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'BMW S1000RR',
      subtitle: 'E-Commerce Platform',
      description:
        'High-performance online marketplace built for speed and reliability',
      imageDark:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      imageLight:
        'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&h=500&fit=crop',
      specs: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      stats: { speed: '98', power: '50K users', torque: '1.2s load' },
      challenge:
        'Built a scalable platform handling 50K daily users with real-time inventory sync',
      results: [
        '98/100 Lighthouse score',
        '340% conversion increase',
        'Sub 1.5s page loads',
      ],
    },
    {
      id: 2,
      name: 'KTM 390 Duke',
      subtitle: 'SaaS Dashboard',
      description:
        'Agile analytics platform for real-time business intelligence',
      imageDark:
        'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=500&fit=crop',
      imageLight:
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=500&fit=crop',
      specs: ['Next.js', 'TypeScript', 'MongoDB', 'D3.js'],
      stats: { speed: '95', power: '10K queries/sec', torque: '0.8s response' },
      challenge:
        'Created a lightweight yet powerful analytics dashboard with complex data visualizations',
      results: [
        'Real-time data processing',
        'Custom chart library',
        'Mobile-first responsive',
      ],
    },
    {
      id: 3,
      name: 'Xtreme 250R',
      subtitle: 'Social Network App',
      description:
        'Rugged community platform built for engagement and scalability',
      imageDark:
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=500&fit=crop',
      imageLight:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      specs: ['React Native', 'Firebase', 'Redux', 'WebSockets'],
      stats: { speed: '92', power: '100K users', torque: 'Real-time' },
      challenge:
        'Developed cross-platform mobile app with real-time messaging and content feeds',
      results: [
        'iOS & Android support',
        'Push notifications',
        'Offline-first architecture',
      ],
    },
    {
      id: 4,
      name: 'Honda CBR650R',
      subtitle: 'AI Content Generator',
      description:
        'Refined ML-powered tool for automated content creation',
      imageDark:
        'https://images.unsplash.com/photo-1599819177910-c7e9b4c6277a?w=800&h=500&fit=crop',
      imageLight:
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=500&fit=crop',
      specs: ['Python', 'TensorFlow', 'FastAPI', 'React'],
      stats: { speed: '96', power: '1M tokens/day', torque: '200ms latency' },
      challenge:
        'Integrated GPT models with custom training for brand-specific content generation',
      results: [
        '90% time savings',
        'Multi-language support',
        'Custom fine-tuning pipeline',
      ],
    },
  ];

  return (
    <section id="custom-builds" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-4 ${theme.accent} text-sm tracking-widest font-semibold`}>
          CUSTOM BUILDS
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-12">THE SHOWROOM</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`${theme.card} ${theme.border} border ${theme.cardHover} transition-all cursor-pointer group overflow-hidden`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={darkMode ? project.imageDark : project.imageLight}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 ${darkMode
                      ? 'bg-gradient-to-t from-black via-black/50 to-transparent'
                      : 'bg-gradient-to-t from-white via-white/50 to-transparent'
                    }`}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className={`${theme.accent} text-sm font-bold mb-1`}>
                    BUILD #{String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
                  <p className={theme.textSecondary}>{project.subtitle}</p>
                </div>
              </div>
              <div className="p-6">
                <p className={`${theme.textSecondary} mb-4`}>{project.description}</p>
                <div className="mb-4">
                  <div className={`text-xs ${theme.textTertiary} mb-2 font-semibold`}>
                    SPECS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.specs.map((spec, i) => (
                      <span
                        key={i}
                        className={`text-xs ${theme.bgTertiary} px-3 py-1 ${theme.accent} ${theme.borderSecondary} border`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`grid grid-cols-3 gap-4 text-center ${theme.border} border-t pt-4`}
                >
                  <div>
                    <div className={`${theme.accent} font-bold text-lg`}>
                      {project.stats.speed}
                    </div>
                    <div className={`text-xs ${theme.textTertiary}`}>SPEED</div>
                  </div>
                  <div>
                    <div className={`${theme.accent} font-bold text-lg`}>
                      {project.stats.power}
                    </div>
                    <div className={`text-xs ${theme.textTertiary}`}>POWER</div>
                  </div>
                  <div>
                    <div className={`${theme.accent} font-bold text-lg`}>
                      {project.stats.torque}
                    </div>
                    <div className={`text-xs ${theme.textTertiary}`}>TORQUE</div>
                  </div>
                </div>
                <button
                  className={`w-full mt-4 ${theme.bgTertiary} ${theme.accent.replace(
                    'text-',
                    'hover:bg-'
                  )} ${theme.accent} ${darkMode ? 'hover:text-black' : 'hover:text-white'
                    } font-bold py-3 transition-all`}
                >
                  VIEW BLUEPRINT <ExternalLink className="inline ml-2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedProject(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedProject(null);
          }}
          tabIndex={-1}
        >
          <div
            role="document"
            className={`${theme.card} ${theme.border} border max-w-3xl w-full p-6 relative`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-3 right-3" onClick={() => setSelectedProject(null)}>
              <X />
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedProject.name}</h3>
            <p className={theme.textSecondary}>{selectedProject.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectShowcase;