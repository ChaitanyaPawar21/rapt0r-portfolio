# Portfolio Project - Folder Structure

```
portfolio/
│
├── public/                          # Public assets (served as-is)
│   ├── index.html                  # Main HTML template
│   ├── manifest.json               # PWA manifest
│   ├── robots.txt                  # SEO robots file
│   ├── favicon.ico                 # Site favicon
│   ├── Chaitanya.pdf              # Resume/Portfolio PDF
│   ├── logo.png                    # Logo images
│   ├── logo192.png
│   ├── logo512.png
│   ├── vite.svg                    # Vite logo (legacy)
│   ├── file-tree.json              # File tree data
│   │
│   └── assests/                    # Static assets (note: typo "assests")
│       ├── bikes/                  # Bike-related images/videos
│       │   ├── bike-black.png
│       │   ├── bike-white.png
│       │   ├── black-c.png
│       │   ├── black.png
│       │   ├── white-c.png
│       │   ├── ktm1390.png
│       │   ├── ktm-ciematic.mp4
│       │   ├── logo.png
│       │   ├── logoWhite.png
│       │   └── myself.jpg
│       │
│       ├── certificates/           # Certificate files
│       │   ├── DevOps.pdf
│       │   ├── DevOps.png
│       │   ├── react.pdf
│       │   └── react.jpg
│       │
│       ├── parts/                  # Motorcycle parts images
│       │   ├── bike.png
│       │   ├── ecu.png
│       │   ├── inline.png
│       │   └── torque.png
│       │
│       ├── profile/                # Profile images
│       │   ├── admin.png
│       │   ├── gt650.jpg
│       │   ├── stalker.jpg
│       │   └── w175.avif
│       │
│       └── skills/                 # Skills/tech images
│           └── ducati.png
│
├── src/                            # Source code
│   ├── index.js                    # Application entry point
│   ├── index.css                   # Global styles
│   ├── App.jsx                     # Main App component
│   ├── App.css                     # App-specific styles
│   ├── App.test                    # App tests
│   ├── MotorcyclePortfolio.jsx    # Main portfolio component
│   │
│   ├── assets/                     # Source assets
│   │   └── react.svg
│   │
│   ├── components/                 # React components
│   │   ├── admin/
│   │   │   └── AdminTerminal.jsx
│   │   │
│   │   ├── BikeSkills/
│   │   │   ├── bikeGsap.jsx
│   │   │   └── bikeGsap.css
│   │   │
│   │   ├── certification/          # Certification components
│   │   │   ├── backend.jsx
│   │   │   ├── DevOps.jsx
│   │   │   ├── dsa.jsx
│   │   │   └── frontend.jsx
│   │   │
│   │   ├── profile/                # Profile-related components
│   │   │   ├── profileData.jsx
│   │   │   ├── ProfileLoader.jsx
│   │   │   ├── ProfileSelector.jsx
│   │   │   └── vite
│   │   │
│   │   ├── BuildSheet.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── PerformanceSpecs.jsx
│   │   ├── ProjectShowcase.jsx
│   │   └── ThemeContext.jsx
│   │
│   └── pages/                      # Page components
│       ├── BackendEnginePage.js
│       ├── DataStructuresPage.js
│       ├── DevOpsECUPage.js
│       └── FrontendFairingPage.js
│
├── node_modules/                   # Dependencies (auto-generated)
│
├── package.json                    # Project dependencies & scripts
├── package-lock.json               # Dependency lock file
├── README.md                       # Project documentation
├── .gitignore                      # Git ignore rules
│
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── eslint.config.js                # ESLint configuration
```

## Key Directories

### `/public`
- Static files served directly by the web server
- Contains `index.html` (main HTML template)
- Assets folder contains images, videos, PDFs

### `/src`
- All source code for the React application
- `index.js` - Application entry point
- `components/` - Reusable React components organized by feature
- `pages/` - Page-level components

### Configuration Files
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - Code linting rules

## Component Organization

- **Admin**: Admin terminal interface
- **BikeSkills**: Motorcycle skills visualization with GSAP animations
- **Certification**: Components for displaying certifications (backend, frontend, DevOps, DSA)
- **Profile**: Profile selection and management components
- **Core Components**: Hero, Navbar, BuildSheet, PerformanceSpecs, ProjectShowcase, ThemeContext

## Notes

- This is a **Create React App** project
- Uses **Tailwind CSS** for styling
- Uses **GSAP** for animations
- Uses **React Router** for navigation
- Note: There's a typo in `/public/assests/` (should be "assets")




