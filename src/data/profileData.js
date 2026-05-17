/**
 * Profile, projects & personal info (resume-aligned static data).
 */
export const personalInfo = {
  name: 'Abhay Kumar',
  title: 'Senior Technical Lead · Full Stack Java Developer',
  tagline: 'Enterprise Java · Spring Boot · Microservices · Angular & React',
  location: 'Hyderabad, India 500055',
  email: 'abhay.fsd.dev@gmail.com',
  altEmail: 'ancabhay@gmail.com',
  phone: '+91 6200329955',
  linkedIn: 'https://linkedin.com/in/abhay-kumar',
  linkedInLabel: 'linkedin.com/in/abhay-kumar',
  yearsExperience: '8+',
  projectsCount: '10+',
  summary:
    'Results-driven Full Stack Java Developer and Senior Technical Lead with 8+ years of experience designing, building, and delivering enterprise applications. Expert in Spring Boot, microservices architecture, REST APIs, and modern frontends (Angular, React). Proven track record leading cross-functional teams, mentoring developers, and shipping high-impact products for telecom, e-commerce, and healthcare clients.',
  highlights: [
    'Senior Technical Lead on Trinet project at Coforge',
    'Led Verizon B360 e-commerce platform with 6 production sub-modules',
    'Strong in Agile/Scrum, code quality, and production support',
    'Mentoring teams on architecture, APIs, and best practices',
  ],
  languages: ['English', 'Hindi'],
  interests: ['Playing With AI', 'System design', 'Clean architecture', 'Tech blogging', 'Modern web development'],
};

export const projects = [
  {
    id: 'trinet',
    name: 'Trinet Project',
    client: 'Coforge',
    period: '2026 – Present',
    role: 'Senior Technical Lead',
    icon: '🏢',
    color: '#06a8e9',
    description:
      'Enterprise program delivery as Senior Technical Lead — driving technical decisions, solution design, and team mentorship for a large-scale client engagement.',
    highlights: [
      'Technical leadership and architecture decisions',
      'Mentoring developers and enforcing code quality standards',
      'Microservices and API design for scalable systems',
      'Collaboration with cross-functional stakeholders',
    ],
    subProjects: [],
    tech: ['Spring Boot', 'Angular 14', 'Microservices', 'Redis', 'REST API', 'Agile/Scrum', 'Jira', 'Git', 'CI/CD'],
  },
  {
    id: 'verizon-b360',
    name: 'Verizon B360 E-Commerce Platform',
    client: 'Verizon (via ACS Global Tech Solutions)',
    period: '2021 – 2026',
    role: 'Lead / Full Stack Developer',
    icon: '🛒',
    color: '#ef4444',
    description:
      'Large-scale B2B e-commerce platform enabling solution selling, promotions, and bundled offers for enterprise customers. Owned architecture, microservices, and Angular-based UI modules.',
    highlights: [
      'Architected REST APIs and microservices with Spring Boot',
      'Delivered 6 sub-projects end-to-end in production',
      'Managed Jira stories, releases, and cross-team coordination',
      'Integrated Redis caching and performance optimizations',
    ],
    subProjects: [
      'My Solution',
      'Guided Promo',
      'National Offers',
      'Manual Discount',
      'Incipio',
      'View Together',
    ],
    tech: ['Spring Boot', 'Angular 17', 'Microservices', 'Redis', 'REST API', 'Jira'],
  },
  
  {
    id: 'maps',
    name: 'Manufacturing Analysis and Performance Management System (MAPS)',
    client: 'Sainnocare LLC, New Jersey (Neovation Life Sciences)',
    period: '2019 – 2021',
    role: 'Software Developer',
    icon: '💊',
    color: '#22c55e',
    description:
      'Healthcare/pharma management application for US-based client. Built full-stack features with Spring Boot backend and Angular frontend.',
    highlights: [
      'Developed and consumed REST APIs with Spring Boot',
      'Database design and MySQL optimization',
      'Agile/Scrum delivery with faster release cycles',
      'thymeleaf and Angular modules for business workflows',
    ],
    subProjects: [],
    tech: ['Spring Boot', 'MySQL', 'Angular', 'thymeleaf', 'Git'],
  },
  {
    id: 'eagle-software',
    name: 'APPDS (Arunachal Pradesh Public Distribution System)',
    client: 'State of Arunachal Pradesh (Eagle Software)',
    period: '2018 – 2019',
    role: 'Software Developer',
    icon: '⚙️',
    color: '#a855f7',
    description:
      'Custom software development for diverse client requirements — from requirements gathering to deployment and field testing.',
    highlights: [
      'End-to-end Java/Spring application development',
      'Client-facing delivery and performance verification',
      'MySQL-backed business applications',
    ],
    subProjects: [],
    tech: ['Java', 'Spring', 'MySQL', 'Struts', 'Git', 'Hibernate', 'JSP', 'Apache Tomcat','Rest API','Spring Boot'],
  },
];

export const homeFeatures = [
  {
    icon: '📖',
    title: 'Deep explanations',
    text: '200+ word answers with production context, trade-offs, and interview tips.',
  },
  {
    icon: '💻',
    title: 'Real code samples',
    text: 'Java, SQL, and Spring examples with copy-to-clipboard support.',
  },
  {
    icon: '🎯',
    title: 'Topic-wise prep',
    text: '317+ questions across Java, Spring, SQL, Kafka, microservices & more.',
  },
];
