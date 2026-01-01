// src/components/certification/dsa.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const DSA = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // DSA certifications - replace with your actual certification PDFs/images
  const certifications = [
    { 
      src: '/assets/certificates/react.jpg', 
      alt: 'DSA Certification 1',
      title: 'Data Structures & Algorithms (C++)',
      description: 'Maps & Sets, Trees & Graphs, Sorting & Searching',
      pdf: '/assets/bikes/react.pdf'
    },
    // { 
    //   src: './assets/bikes/bike-white.png', 
    //   alt: 'DSA Certification 2',
    //   title: 'Next.js Certification',
    //   description: 'Server-side rendering with Next.js',
    //   pdf: './Chaitanya.pdf'
    // },
    // { 
    //   src: './assets/bikes/ktm1390.png', 
    //   alt: 'DSA Certification 3',
    //   title: 'Tailwind CSS Certification',
    //   description: 'Modern UI with Tailwind CSS',
    //   pdf: './Chaitanya.pdf'
    // },
    // { 
    //   src: './assets/bikes/black.png', 
    //   alt: 'DSA Certification 4',
    //   title: 'Framer Motion Certification',
    //   description: 'Smooth animations with Framer Motion',
    //   pdf: './Chaitanya.pdf'
    // },
  ];

  const handleCertClick = (pdfPath) => {
    if (pdfPath) {
      window.open(pdfPath, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`${theme.bg} min-h-screen py-20 px-4`}>
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 ${theme.bgTertiary} ${theme.border} border px-4 py-2 ${theme.textSecondary} hover:${theme.accent} transition-all mb-8`}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.accent}`}>
            DATA STRUCTURES & ALGORITHMS (C++) TORQUE
          </h1>
          <p className={`text-lg ${theme.textSecondary} mb-2`}>
            Maps & Sets, Trees & Graphs, Sorting & Searching
          </p>
          <div className={`${theme.border} border-t pt-4 mt-4`}>
            <p className={`text-sm ${theme.textSecondary}`}>
              Explore my Data Structures & Algorithms certifications and achievements.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className={`${theme.bgTertiary} ${theme.border} border overflow-hidden ${theme.cardHover} transition-all`}
            >
              <button
                onClick={() => handleCertClick(cert.pdf)}
                aria-label={`View ${cert.title} certificate`}
                className="w-full relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                  <div className={`${theme.accent} flex items-center gap-2 font-bold`}>
                    <FileText size={24} />
                    <span>View Certificate</span>
                    <ExternalLink size={20} />
                  </div>
                </div>
              </button>
              <div className="p-6">
                <h3 className={`font-bold text-lg mb-2 ${theme.text}`}>{cert.title}</h3>
                <p className={`text-sm ${theme.textSecondary}`}>{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DSA;
