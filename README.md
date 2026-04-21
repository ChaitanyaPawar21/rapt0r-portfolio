# 🏍️ Rapt0r Portfolio

> *"Every line of code is a gear shift — AI provides the torque, MERN delivers the speed, and DevOps keeps the engine running smooth."*

A premium, motorcycle-themed developer portfolio built with React, GSAP, and Tailwind CSS. Features scroll-driven animations, a cinematic RPM loader, role-based profile routing, and a horizontally-scrolling skills showcase.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rapt0r--portfolio.vercel.app-orange?style=for-the-badge&logo=vercel)](https://rapt0r-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock)](https://gsap.com)

---

## ✨ Features

- **🎬 Cinematic Intro Loader** — Animated RPM gauge that revs to 12 000 RPM on first visit
- **🖼️ Frame-sequence Hero** — Canvas-rendered scroll-driven animation using ImageKit CDN (separate desktop & mobile sprite sets)
- **↔️ Horizontal Skill Scroll** — GSAP `ScrollTrigger`-pinned horizontal carousel of project / skill cards
- **🌓 Dark / Light Theme** — Global `ThemeContext` with smooth transitions; theme changes propagate to every section
- **👥 Role-Based Routing** — Profile selector dispatches visitors to `/admin`, `/recruiter`, or `/portfolio` automatically
- **🏍️ Motorcycle DNA** — BikeGsap section (scroll-animated bike parts), Honda specs section, cinematic video, and full performance-spec UI language
- **📜 Certification Pages** — Dedicated routes for Frontend, Backend, DevOps, and DSA certifications
- **📬 Contact Form** — Powered by [Web3Forms](https://web3forms.com) — zero backend required
- **📱 Fully Responsive** — Mobile-first layouts across every section
- **⚡ Deployed on Vercel** — Automatic rebuilds on `main` push

---

## 🗂️ Project Structure

```
rapt0r-portfolio/
│
├── public/
│   ├── index.html              # HTML template
│   ├── Chaitanya.pdf           # Resume (served from root)
│   └── assests/
│       ├── bikes/              # Bike images & cinematic video
│       ├── certificates/       # PDF & PNG certificates
│       ├── parts/              # Motorcycle part diagrams
│       ├── profile/            # Profile avatars
│       └── skills/             # Tech / skill images
│
├── src/
│   ├── App.jsx                 # Root router + profile session logic
│   ├── MotorcyclePortfolio.jsx # Main layout shell + RPM loader
│   │
│   ├── components/
│   │   ├── Home/
│   │   │   ├── Hero.jsx            # Canvas frame-sequence hero
│   │   │   ├── Navbar.jsx          # Sticky navigation
│   │   │   ├── BuildSheet.jsx      # "About me" section
│   │   │   ├── ProjectShowcase.jsx # Horizontal skill scroll
│   │   │   └── ThemeContext.jsx    # Global dark/light theme
│   │   │
│   │   ├── BikeSkills/
│   │   │   ├── bikeGsap.jsx        # GSAP scroll bike animation
│   │   │   └── bikeGsap.css
│   │   │
│   │   ├── honda/
│   │   │   └── Honda.jsx           # Base specs / Honda section
│   │   │
│   │   ├── contact/
│   │   │   └── Contact.jsx         # Web3Forms contact form
│   │   │
│   │   ├── certification/
│   │   │   ├── frontend.jsx
│   │   │   ├── backend.jsx
│   │   │   ├── DevOps.jsx
│   │   │   └── dsa.jsx
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileSelector.jsx
│   │   │   ├── ProfileLoader.jsx
│   │   │   └── profileData.jsx
│   │   │
│   │   └── admin/
│   │       └── AdminTerminal.jsx
│   │
│   ├── hooks/
│   │   └── useHeroSequenceAnimation.js   # Canvas frame-sequence logic
│   │
│   └── pages/                    # Legacy page stubs (router targets)
│
├── vite.config.js
├── tailwind.config.js
├── vercel.json                   # SPA fallback routing
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ChaitanyaPawar21/rapt0r-portfolio.git
cd rapt0r-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables (see section below)
cp .env.example .env

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (Vite default).

---

## 🔑 Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEB3FORMS_KEY` | Access key from [web3forms.com](https://web3forms.com) for the contact form | ✅ Yes |

> The Hero section uses **ImageKit** CDN URLs hardcoded in `Hero.jsx`. To use your own CDN, replace the `basePath` values in `useHeroSequenceAnimation`.

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `./build` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Deploy to GitHub Pages (`gh-pages`) |
| `npm run analyze` | Bundle size analysis via `source-map-explorer` |

---

## 🗺️ Application Routes

| Path | Description |
|------|-------------|
| `/` or `/profile` | Profile selector — choose **Admin**, **Recruiter**, or **Portfolio** |
| `/portfolio` | Full motorcycle portfolio (default visitor view) |
| `/recruiter` | Same portfolio, recruiter color-scheme applied |
| `/admin` | Admin terminal interface |
| `/frontend-fairing` | Frontend certification detail page |
| `/reliable-honda` | Backend certification detail page |
| `/devops-ecu` | DevOps certification detail page |
| `/data-structures` | DSA certification detail page |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 |
| **Build Tool** | Vite 7 |
| **Animations** | GSAP 3 + ScrollTrigger |
| **Styling** | Tailwind CSS 3 |
| **Icons** | Lucide React, Font Awesome |
| **Routing** | React Router v6 |
| **Forms** | React Hook Form + Web3Forms |
| **CDN** | ImageKit (hero sprite frames) |
| **Deployment** | Vercel |

---

## 🚢 Deployment

The project deploys automatically to **Vercel** on every push to `main`.

`vercel.json` is configured as a SPA fallback so all routes resolve correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Manual Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and pushes the `build/` folder to the `gh-pages` branch.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Chaitanya Pawar**

[![GitHub](https://img.shields.io/badge/GitHub-ChaitanyaPawar21-181717?style=flat-square&logo=github)](https://github.com/ChaitanyaPawar21)

---

<p align="center">Built with ❤️ React & Tailwind · Powered by GSAP</p>
