// Language switching functionality
export const texts = {
  EN: {
    greeting: "👋 Hi, I'm Caleb Condor",
    description: "I am a frontend developer specializing in React and Next.js. I love building amazing UI experiences. I have been working professionally for +6 months and have worked on several projects.",
    projectsTitle: "Projects and tests",
    projectsDesc: "Here you can find some of my projects, both professional and personal.",
    githubText: "My GitHub profile, where I upload my projects.",
    experienceText: "MONTHS EXPERIENCE",
    currentlyText: "Currently focused",
    workText: "Working remotely on amazing projects with talented teams.",
    contactText: "Let's work together",
    offlineText: "Offline",
    skillsText: "Skills & Technologies"
  },
  ES: {
    greeting: "👋 Hola, soy Caleb Condor",
    description: "Soy desarrollador frontend especializado en React y Next.js. Me encanta construir experiencias UI increíbles. He trabajado profesionalmente por +6 meses en varios proyectos.",
    projectsTitle: "Proyectos y pruebas",
    projectsDesc: "Aquí puedes encontrar algunos de mis proyectos profesionales y personales.",
    githubText: "Mi perfil de GitHub donde subo mis proyectos.",
    experienceText: "MESES EXPERIENCIA",
    currentlyText: "Enfocado actualmente",
    workText: "Trabajando remotamente en proyectos increíbles con equipos talentosos.",
    contactText: "Trabajemos juntos",
    offlineText: "Desconectado",
    skillsText: "Habilidades y Tecnologías"
  }
};

export let currentLanguage: 'EN' | 'ES' = 'EN';

// Function to update texts and visual selector
export function updateLangVisual() {
  // Update translatable texts
  const textElements = document.querySelectorAll('[data-text]');
  textElements.forEach(element => {
    const key = element.getAttribute('data-text') as keyof typeof texts.EN;
    if (key && texts[currentLanguage][key]) {
      element.textContent = texts[currentLanguage][key];
    }
  });
  
  // Update large visual selector
  const langCurrent = document.getElementById('lang-current');
  const enLabel = document.getElementById('lang-en-label');
  const esLabel = document.getElementById('lang-es-label');
  
  if (langCurrent) langCurrent.textContent = currentLanguage;
  if (enLabel && esLabel) {
    if (currentLanguage === 'EN') {
      enLabel.classList.add('lang-active');
      esLabel.classList.remove('lang-active');
    } else {
      esLabel.classList.add('lang-active');
      enLabel.classList.remove('lang-active');
    }
  }
  
  // Update age label
  const ageLabel = document.getElementById('age-label');
  if (ageLabel) {
    ageLabel.textContent = currentLanguage === 'EN' ? 'years' : 'años';
  }
}

// Initialize language switcher
export function initLanguageSwitcher() {
  const langSwitcher = document.getElementById('lang-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'EN' ? 'ES' : 'EN';
      updateLangVisual();
    });
  }
  
  // Initialize visual
  updateLangVisual();
} 