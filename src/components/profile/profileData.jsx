// Profile configuration
export const DEFAULT_PROFILES = [
  {
    id: 'profile-1',
    name: 'admin',
    avatarUrl: '%PUBLIC_URL%/assets/profile/admin.png', // Use your existing photo
    colorScheme: '#fa7522ff', // Orange to match your portfolio
    role: 'Controller'
  },
  {
    id: 'profile-2',
    name: 'Recruiter',
    avatarUrl: '%PUBLIC_URL%/assets/profile/gt650.jpg',
    colorScheme: '#ffa500',
    role: 'Business'
  },
  {
    id: 'profile-3',
    name: 'Stalker',
    avatarUrl: '%PUBLIC_URL%/assets/profile/stalker.jpg',
    colorScheme: '#ff0101ff',
    role: 'Viewer'
  },
  {
    id: 'profile-4',
    name: '',
    avatarUrl: '/assets/profile/w175.avif',
    colorScheme: '#00d4aa',
    role: 'Anonymous'
  }
];