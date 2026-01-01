// src/pages/DevOpsECUPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const DevOpsECUPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Placeholder images - replace with your actual images
  const images = [
    { src: '/assets/bikes/bike-black.png', alt: 'DevOps Project 1' },
    { src: '/assets/bikes/bike-white.png', alt: 'DevOps Project 2' },
    { src: '/assets/bikes/ktm1390.png', alt: 'DevOps Project 3' },
    { src: '/assets/bikes/black.png', alt: 'DevOps Project 4' },
  ];

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

        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.accent}`}>
          DEVOPS ECU
        </h1>
        <p className={`text-lg ${theme.textSecondary} mb-12`}>
          Git, Docker, AWS, Kubernetes
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${theme.bgTertiary} ${theme.border} border overflow-hidden ${theme.cardHover} transition-all`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className={`font-semibold ${theme.text}`}>{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevOpsECUPage;

