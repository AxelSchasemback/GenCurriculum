/**
 * Datos de ejemplo para la previsualización de plantillas de CV
 * Estos datos se utilizan para mostrar cómo se verían las plantillas con información real
 */

// Datos de ejemplo para un perfil de desarrollador
export const developerProfile = {
  personalInfo: {
    name: 'María García',
    title: 'Desarrolladora Full Stack',
    email: 'maria.garcia@ejemplo.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    website: 'www.mariagarcia.dev',
    summary: 'Desarrolladora Full Stack con más de 5 años de experiencia en el desarrollo de aplicaciones web y móviles. Especializada en React, Node.js y arquitecturas cloud. Apasionada por crear soluciones elegantes a problemas complejos y por aprender nuevas tecnologías.',
  },
  experience: [
    {
      position: 'Desarrolladora Full Stack Senior',
      company: 'TechSolutions',
      location: 'Madrid',
      startDate: 'Enero 2020',
      endDate: 'Presente',
      description: 'Desarrollo de aplicaciones web utilizando React, Node.js y AWS. Liderazgo de un equipo de 4 desarrolladores. Implementación de CI/CD con GitHub Actions.',
    },
    {
      position: 'Desarrolladora Frontend',
      company: 'InnovaWeb',
      location: 'Barcelona',
      startDate: 'Marzo 2018',
      endDate: 'Diciembre 2019',
      description: 'Desarrollo de interfaces de usuario con React y TypeScript. Colaboración en la migración de una aplicación legacy a una arquitectura moderna basada en componentes.',
    },
    {
      position: 'Desarrolladora Web Junior',
      company: 'StartupHub',
      location: 'Valencia',
      startDate: 'Junio 2016',
      endDate: 'Febrero 2018',
      description: 'Desarrollo de sitios web responsivos utilizando HTML, CSS y JavaScript. Implementación de diseños desde Figma a código funcional.',
    },
  ],
  education: [
    {
      degree: 'Máster en Ingeniería Web',
      institution: 'Universidad Politécnica de Madrid',
      location: 'Madrid',
      startDate: '2015',
      endDate: '2016',
      description: 'Especialización en desarrollo web avanzado y arquitecturas cloud.',
    },
    {
      degree: 'Grado en Ingeniería Informática',
      institution: 'Universidad Complutense de Madrid',
      location: 'Madrid',
      startDate: '2011',
      endDate: '2015',
      description: 'Enfoque en desarrollo de software y sistemas distribuidos.',
    },
  ],
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 
    'PostgreSQL', 'AWS', 'Docker', 'Git', 'CI/CD', 'HTML5', 'CSS3', 
    'Sass', 'Redux', 'REST APIs', 'GraphQL', 'Jest', 'Cypress'
  ],
};

// Datos de ejemplo para un perfil de marketing
export const marketingProfile = {
  personalInfo: {
    name: 'Carlos Rodríguez',
    title: 'Especialista en Marketing Digital',
    email: 'carlos.rodriguez@ejemplo.com',
    phone: '+34 623 456 789',
    location: 'Barcelona, España',
    website: 'www.carlosrodriguez.com',
    summary: 'Especialista en Marketing Digital con 7 años de experiencia en la creación y ejecución de estrategias de marketing online. Experto en SEO, SEM, redes sociales y análisis de datos. Enfocado en aumentar la visibilidad de marca y generar leads cualificados.',
  },
  experience: [
    {
      position: 'Jefe de Marketing Digital',
      company: 'BrandBoost',
      location: 'Barcelona',
      startDate: 'Abril 2019',
      endDate: 'Presente',
      description: 'Dirección de la estrategia de marketing digital para clientes de diversos sectores. Gestión de un equipo de 6 especialistas. Implementación de campañas que han aumentado el tráfico web en un 150% y las conversiones en un 75%.',
    },
    {
      position: 'Especialista SEO/SEM',
      company: 'DigitalGrowth',
      location: 'Madrid',
      startDate: 'Febrero 2017',
      endDate: 'Marzo 2019',
      description: 'Optimización de sitios web para mejorar el posicionamiento en buscadores. Gestión de campañas de Google Ads con un ROI promedio del 300%. Análisis y reporting de métricas de rendimiento.',
    },
    {
      position: 'Community Manager',
      company: 'SocialMedia Agency',
      location: 'Valencia',
      startDate: 'Enero 2015',
      endDate: 'Enero 2017',
      description: 'Gestión de redes sociales para marcas de retail y hostelería. Creación de contenido y planificación de calendarios editoriales. Aumento de la comunidad en un 200% en 18 meses.',
    },
  ],
  education: [
    {
      degree: 'Máster en Marketing Digital',
      institution: 'ESIC Business & Marketing School',
      location: 'Barcelona',
      startDate: '2014',
      endDate: '2015',
      description: 'Especialización en estrategias de marketing online, analítica web y publicidad digital.',
    },
    {
      degree: 'Grado en Marketing',
      institution: 'Universidad de Barcelona',
      location: 'Barcelona',
      startDate: '2010',
      endDate: '2014',
      description: 'Formación en fundamentos de marketing, comportamiento del consumidor y estrategias de comunicación.',
    },
  ],
  skills: [
    'SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 
    'Google Analytics', 'Email Marketing', 'Content Marketing', 'Inbound Marketing', 
    'Hootsuite', 'Semrush', 'Ahrefs', 'Mailchimp', 'HubSpot', 'WordPress', 'Shopify'
  ],
};

// Datos de ejemplo para un perfil de diseñador
export const designerProfile = {
  personalInfo: {
    name: 'Laura Martínez',
    title: 'Diseñadora UX/UI',
    email: 'laura.martinez@ejemplo.com',
    phone: '+34 634 567 890',
    location: 'Sevilla, España',
    website: 'www.lauramartinez.design',
    summary: 'Diseñadora UX/UI con 6 años de experiencia creando experiencias digitales centradas en el usuario. Especializada en investigación de usuarios, wireframing, prototipos y diseño visual. Comprometida con la creación de productos digitales accesibles e intuitivos.',
  },
  experience: [
    {
      position: 'Senior UX/UI Designer',
      company: 'DesignStudio',
      location: 'Sevilla',
      startDate: 'Mayo 2018',
      endDate: 'Presente',
      description: 'Diseño de interfaces para aplicaciones web y móviles. Realización de investigación de usuarios y pruebas de usabilidad. Colaboración con equipos de desarrollo para implementar diseños.',
    },
    {
      position: 'UI Designer',
      company: 'CreativeAgency',
      location: 'Madrid',
      startDate: 'Junio 2016',
      endDate: 'Abril 2018',
      description: 'Creación de interfaces visuales para sitios web y aplicaciones. Desarrollo de sistemas de diseño y bibliotecas de componentes. Colaboración con equipos de marketing para mantener la coherencia de marca.',
    },
    {
      position: 'Diseñadora Gráfica',
      company: 'BrandIdentity',
      location: 'Barcelona',
      startDate: 'Febrero 2014',
      endDate: 'Mayo 2016',
      description: 'Diseño de identidad visual para marcas. Creación de materiales impresos y digitales. Participación en sesiones de brainstorming y presentaciones a clientes.',
    },
  ],
  education: [
    {
      degree: 'Máster en Diseño de Experiencia de Usuario',
      institution: 'ELISAVA Escuela Universitaria de Diseño',
      location: 'Barcelona',
      startDate: '2013',
      endDate: '2014',
      description: 'Especialización en metodologías de diseño centrado en el usuario, arquitectura de información y prototipado.',
    },
    {
      degree: 'Grado en Diseño Gráfico',
      institution: 'Universidad de Sevilla',
      location: 'Sevilla',
      startDate: '2009',
      endDate: '2013',
      description: 'Formación en principios de diseño, tipografía, color, composición y técnicas de comunicación visual.',
    },
  ],
  skills: [
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InVision', 
    'Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 
    'Design Systems', 'Responsive Design', 'Accesibilidad Web', 'HTML/CSS', 
    'Design Thinking', 'User Flows', 'Information Architecture'
  ],
};

// Datos de ejemplo para un perfil ejecutivo
export const executiveProfile = {
  personalInfo: {
    name: 'Javier López',
    title: 'Director General',
    email: 'javier.lopez@ejemplo.com',
    phone: '+34 645 678 901',
    location: 'Madrid, España',
    website: 'www.linkedin.com/in/javierlopez',
    summary: 'Director General con más de 15 años de experiencia liderando empresas del sector tecnológico. Especializado en transformación digital, gestión del cambio y desarrollo de negocio. Historial probado de aumento de ingresos y optimización de operaciones.',
  },
  experience: [
    {
      position: 'Director General',
      company: 'TechInnovation',
      location: 'Madrid',
      startDate: 'Enero 2017',
      endDate: 'Presente',
      description: 'Dirección estratégica de una empresa de 120 empleados. Implementación de un plan de transformación digital que ha aumentado los ingresos en un 45%. Desarrollo de alianzas estratégicas con partners internacionales.',
    },
    {
      position: 'Director de Operaciones',
      company: 'GlobalSolutions',
      location: 'Barcelona',
      startDate: 'Marzo 2013',
      endDate: 'Diciembre 2016',
      description: 'Supervisión de todas las operaciones de la empresa. Optimización de procesos que resultó en una reducción de costes del 30%. Liderazgo de un equipo de 50 personas distribuidas en 3 países.',
    },
    {
      position: 'Director Comercial',
      company: 'BusinessTech',
      location: 'Valencia',
      startDate: 'Febrero 2008',
      endDate: 'Febrero 2013',
      description: 'Desarrollo e implementación de estrategias comerciales. Expansión del negocio a nuevos mercados europeos. Consecución de un crecimiento anual de ventas del 25%.',
    },
  ],
  education: [
    {
      degree: 'MBA',
      institution: 'IE Business School',
      location: 'Madrid',
      startDate: '2007',
      endDate: '2008',
      description: 'Especialización en gestión empresarial, liderazgo y estrategia corporativa.',
    },
    {
      degree: 'Licenciatura en Administración de Empresas',
      institution: 'Universidad Complutense de Madrid',
      location: 'Madrid',
      startDate: '2002',
      endDate: '2006',
      description: 'Formación en finanzas, marketing, recursos humanos y gestión estratégica.',
    },
  ],
  skills: [
    'Liderazgo Estratégico', 'Gestión de Equipos', 'Desarrollo de Negocio', 
    'Transformación Digital', 'Gestión del Cambio', 'Negociación', 
    'Planificación Estratégica', 'Finanzas Corporativas', 'Gestión de Proyectos', 
    'Análisis de Mercado', 'Relaciones Públicas', 'Inglés Bilingüe', 'Francés Avanzado'
  ],
};

// Exportar un objeto con todos los perfiles para facilitar su uso
export const profilesData = {
  developer: developerProfile,
  marketing: marketingProfile,
  designer: designerProfile,
  executive: executiveProfile,
};

export default profilesData; 