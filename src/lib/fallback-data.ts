import { getConfig } from './config'
import prisma from './prisma'

export interface FallbackPersonalInfo {
  id: number
  fullName: string
  title: string
  bio: string
  location: string
  email: string
  phone: string
  githubUrl: string
  linkedinUrl: string
}

export interface FallbackExperience {
  id: number
  jobTitle: string
  company: string
  startDate: string | null
  endDate: string | null
  description: string
  achievements: string[]
  isCurrent: boolean
}

export interface FallbackProject {
  id: number
  title: string
  description: string
  technologies: string[]
  projectUrl: string
  githubUrl: string
  imageUrl: string | null
  featured: boolean
}

export interface FallbackSkill {
  id: number
  name: string
  category: string
  proficiencyLevel: number
  isTechnical: boolean
}

export function getFallbackPersonalInfo(): FallbackPersonalInfo[] {
  const config = getConfig()
  return [
    {
      id: 1,
      fullName: config.defaultName,
      title: config.portalDescription,
      bio: `I'm a passionate full-stack developer with over 5 years of experience creating beautiful, functional web applications. I love turning complex problems into simple, elegant solutions that provide real value to users.`,
      location: config.defaultLocation,
      email: config.defaultEmail,
      phone: config.defaultPhone,
      githubUrl: config.defaultGithub,
      linkedinUrl: config.defaultLinkedin
    }
  ]
}

export function getFallbackExperience(): FallbackExperience[] {
  return [
    {
      id: 1,
      jobTitle: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      startDate: '2022-01-01',
      endDate: null,
      description: 'Leading development of enterprise web applications using modern technologies.',
      achievements: [
        'Architected and implemented scalable microservices',
        'Mentored junior developers and conducted code reviews',
        'Improved application performance by 40%'
      ],
      isCurrent: true
    },
    {
      id: 2,
      jobTitle: 'Full Stack Developer',
      company: 'Digital Agency Co.',
      startDate: '2020-06-01',
      endDate: '2022-01-01',
      description: 'Developed client websites and web applications with focus on user experience.',
      achievements: [
        'Built 20+ responsive websites for various clients',
        'Integrated third-party APIs and payment systems',
        'Collaborated with designers to implement pixel-perfect UIs'
      ],
      isCurrent: false
    },
    {
      id: 3,
      jobTitle: 'Junior Web Developer',
      company: 'StartUp Hub',
      startDate: '2019-03-01',
      endDate: '2020-06-01',
      description: 'Started my professional journey building web applications for startups.',
      achievements: [
        'Developed and maintained company website and internal tools',
        'Learned modern development practices and frameworks',
        'Participated in agile development processes'
      ],
      isCurrent: false
    }
  ]
}

export function getFallbackProjects(): FallbackProject[] {
  return [
    {
      id: 1,
      title: 'WPGan.com',
      description: 'Nulla ut magna nec purus sodales tincidunt sit amet a ante. Cras at turpis condimentum, luctus erat at, dapibus orci. Nullam non viverra ligula, at placerat ante. Quisque sollicitudin leo cursus blandit elementum. Morbi vel luctus dolor. Sed semper leo nec justo ornare, sit amet euismod velit laoreet.',
      technologies: ['WordPress'],
      projectUrl: 'https://wpgan.com',
      githubUrl: '',
      imageUrl: '/img/showcase/wpgan.webp',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time task management application with drag-and-drop functionality and team collaboration features.',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      projectUrl: 'https://example.com/taskmanager',
      githubUrl: 'https://github.com/johndoe/taskmanager',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, and historical data.',
      technologies: ['Next.js', 'Tailwind CSS', 'Weather API'],
      projectUrl: 'https://example.com/weather',
      githubUrl: 'https://github.com/johndoe/weather',
      imageUrl: 'https://nasikin.web.id/img/img5.webp',
      featured: false
    },
    {
      id: 4,
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for social media metrics with real-time charts and customizable reports.',
      technologies: ['React', 'D3.js', 'Python'],
      projectUrl: 'https://example.com/analytics',
      githubUrl: 'https://github.com/johndoe/analytics',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'Recipe Finder',
      description: 'Mobile-first recipe application with ingredient search, meal planning, and nutritional information.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      projectUrl: 'https://example.com/recipe-finder',
      githubUrl: 'https://github.com/johndoe/recipe-finder',
      imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&h=600&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'Fitness Tracker',
      description: 'Comprehensive fitness tracking app with workout plans, progress monitoring, and social features.',
      technologies: ['Flutter', 'Node.js', 'MongoDB'],
      projectUrl: 'https://example.com/fitness-tracker',
      githubUrl: 'https://github.com/johndoe/fitness-tracker',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      featured: false
    }
  ]
}

export function getFallbackSkills(): FallbackSkill[] {
  return [
    { id: 1, name: 'React', category: 'Frontend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 2, name: 'Vue.js', category: 'Frontend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 3, name: 'Next.js', category: 'Frontend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 4, name: 'TypeScript', category: 'Frontend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 5, name: 'Tailwind CSS', category: 'Frontend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 6, name: 'HTML5', category: 'Frontend Development', proficiencyLevel: 5, isTechnical: true },
    { id: 7, name: 'CSS3', category: 'Frontend Development', proficiencyLevel: 5, isTechnical: true },
    { id: 8, name: 'JavaScript', category: 'Frontend Development', proficiencyLevel: 5, isTechnical: true },
    { id: 9, name: 'Node.js', category: 'Backend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 10, name: 'Express', category: 'Backend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 11, name: 'Python', category: 'Backend Development', proficiencyLevel: 3, isTechnical: true },
    { id: 12, name: 'Django', category: 'Backend Development', proficiencyLevel: 3, isTechnical: true },
    { id: 13, name: 'REST APIs', category: 'Backend Development', proficiencyLevel: 4, isTechnical: true },
    { id: 14, name: 'GraphQL', category: 'Backend Development', proficiencyLevel: 3, isTechnical: true },
    { id: 15, name: 'MySQL', category: 'Database', proficiencyLevel: 3, isTechnical: true },
    { id: 16, name: 'PostgreSQL', category: 'Database', proficiencyLevel: 3, isTechnical: true },
    { id: 17, name: 'MongoDB', category: 'Database', proficiencyLevel: 3, isTechnical: true },
    { id: 18, name: 'Redis', category: 'Database', proficiencyLevel: 2, isTechnical: true },
    { id: 19, name: 'Git', category: 'Tools & Others', proficiencyLevel: 4, isTechnical: true },
    { id: 20, name: 'Docker', category: 'Tools & Others', proficiencyLevel: 3, isTechnical: true },
    { id: 21, name: 'AWS', category: 'Tools & Others', proficiencyLevel: 3, isTechnical: true },
    { id: 22, name: 'Firebase', category: 'Tools & Others', proficiencyLevel: 3, isTechnical: true },
    { id: 23, name: 'Figma', category: 'Tools & Others', proficiencyLevel: 3, isTechnical: true },
    { id: 24, name: 'Problem Solving', category: 'Soft Skills', proficiencyLevel: 5, isTechnical: false },
    { id: 25, name: 'Team Collaboration', category: 'Soft Skills', proficiencyLevel: 5, isTechnical: false },
    { id: 26, name: 'Communication', category: 'Soft Skills', proficiencyLevel: 4, isTechnical: false },
    { id: 27, name: 'Time Management', category: 'Soft Skills', proficiencyLevel: 4, isTechnical: false },
    { id: 28, name: 'Adaptability', category: 'Soft Skills', proficiencyLevel: 5, isTechnical: false },
    { id: 29, name: 'Critical Thinking', category: 'Soft Skills', proficiencyLevel: 4, isTechnical: false },
    { id: 30, name: 'Leadership', category: 'Soft Skills', proficiencyLevel: 3, isTechnical: false }
  ]
}

export function getFallbackContactMessages() {
  return []
}

export async function seedDatabaseFromFallback() {
  const personalInfo = getFallbackPersonalInfo()
  const experiences = getFallbackExperience()
  const projects = getFallbackProjects()
  const skills = getFallbackSkills()

  await prisma.$transaction(async (tx) => {
    await tx.contactMessage.deleteMany()
    await tx.skill.deleteMany()
    await tx.project.deleteMany()
    await tx.experience.deleteMany()
    await tx.personalInfo.deleteMany()

    if (personalInfo.length > 0) {
      const info = personalInfo[0]
      await tx.personalInfo.create({
        data: {
          id: info.id,
          fullName: info.fullName,
          title: info.title,
          bio: info.bio,
          location: info.location,
          email: info.email,
          phone: info.phone,
          githubUrl: info.githubUrl,
          linkedinUrl: info.linkedinUrl
        }
      })
    }

    if (experiences.length > 0) {
      await tx.experience.createMany({
        data: experiences.map((experience) => ({
          id: experience.id,
          jobTitle: experience.jobTitle,
          company: experience.company,
          startDate: experience.startDate ? new Date(experience.startDate) : null,
          endDate: experience.endDate ? new Date(experience.endDate) : null,
          description: experience.description,
          achievements: JSON.stringify(experience.achievements),
          isCurrent: experience.isCurrent
        }))
      })
    }

    if (projects.length > 0) {
      await tx.project.createMany({
        data: projects.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          technologies: JSON.stringify(project.technologies),
          projectUrl: project.projectUrl,
          githubUrl: project.githubUrl,
          imageUrl: project.imageUrl,
          featured: project.featured
        }))
      })
    }

    if (skills.length > 0) {
      await tx.skill.createMany({
        data: skills.map((skill) => ({
          id: skill.id,
          name: skill.name,
          category: skill.category,
          proficiencyLevel: skill.proficiencyLevel,
          isTechnical: skill.isTechnical
        }))
      })
    }
  })
}

