export const INITIAL_PORTFOLIO_DATA = {
  personal: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    aboutMe: '',
    linkedinUrl: '',
    githubUrl: '',
    websiteUrl: '',
    profilePhoto: '', // base64 or URL
  },
  education: [],
  // Example education entry structure:
  // { id: '', institution: '', degree: '', specialization: '', startYear: '', endYear: '', grade: '' }

  skills: {
    technical: [], // array of string names
    languages: [], // array of language strings
  },

  projects: [],
  // Example project entry structure:
  // { id: '', name: '', description: '', technologies: '', liveUrl: '', githubUrl: '' }

  experience: [],
  // Example experience entry structure:
  // { id: '', company: '', role: '', startDate: '', endDate: '', description: '' }

  certifications: [],
  // Example certification entry structure:
  // { id: '', name: '', organization: '', year: '' }

  templateId: 'modern-professional', // 'modern-professional' | 'minimalist' | 'modern-developer'
};

export const SKILL_CATEGORIES = {
  'Programming Languages': [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C', 'Go', 'Rust', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ],
  'Web Development': [
    'React', 'Node.js', 'Express.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vue.js', 'REST APIs', 'GraphQL'
  ],
  'Database': [
    'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase', 'SQLite'
  ],
  'Frameworks': [
    'Django', 'Spring Boot', 'FastAPI', 'Flask', 'ASP.NET Core', 'Laravel'
  ],
  'Tools & Technologies': [
    'Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS', 'Linux', 'Vite', 'Postman', 'CI/CD', 'VS Code'
  ]
};

export const COMMON_LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic', 'Japanese', 'Russian', 'Portuguese'
];

export const TEMPLATES = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Premium professional appearance, elegant typography, balanced spacing, and clean navy/blue accents.',
    badge: 'Popular'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean white background, simple typography, generous whitespace, and minimal decoration.',
    badge: 'Clean'
  },
  {
    id: 'modern-developer',
    name: 'Modern Tech',
    description: 'Developer-focused design, strong project presentation, technical visual elements, and GitHub links.',
    badge: 'Tech'
  }
];
