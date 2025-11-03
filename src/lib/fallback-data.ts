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
      bio: `I'm a passionate and enthusiastic professional Customer Service with hands-on experience over 2 years in the IT.
      Has a deep love for WordPress and all things related to website development and troubleshooting.
      With a keen interest in managing and fixing website errors, especially those involving WordPress, Laravel, and CodeIgniter, I'm excels in ensuring smooth and efficient website performance.
      My expertise in web hosting and domain management is complemented by my critical problem-solving skills. Known for thinking outside the box, I approaches challenges from various perspectives to find innovative solutions.
      This unique approach not only resolves issues efficiently but also enhances the overall functionality of websites.`,
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
      jobTitle: 'Customer Care',
      company: 'CV. Jogjacamp',
      startDate: '2022-10',
      endDate: null,
      description: 'Assist and guide customers of IDwebhost, Resellercamp, and Jogjacamp to ensure their services operate smoothly and without issues.',
      achievements: [
        'Managed a high volume of customer inquiries with efficiency and professionalism through Live Chat and Whatsapp',
        'Assist IDwebhost and Diskon.com customers to aid their issues related to websites, hosting, domains, email, and/or related issues',
        'Assist Resellercamp customers in resolving issues and processing reseller account deposits.',
        'Provided timely solutions to customer issues, enhancing overall satisfaction',
        'Utilize knowledge of domain, hosting, website, and server management to assist customers effectively',
        'Do Live Streaming in Tiktok and Instagram to reach and assist more customers for IDwebhost in real-time',
      ],
      isCurrent: true
    },
    {
      id: 2,
      jobTitle: 'Owner',
      company: 'Store Dot2',
      startDate: '2017-06',
      endDate: '2022-01',
      description: 'Own and manage the online store Store Dot2 to market digital products and in-game items.',
      achievements: [
        'Manage sales across various platforms such as Itemku, Bitskins, PlayerAuction, G2G, Instagram, and other online platforms.',
        'Ensure product inventory is always well-maintained and available.',
        'Run advertising campaigns on marketplaces to increase product exposure.',
        'Process customer orders and provide after-sales service.',
      ],
      isCurrent: false
    },
  ]
}

export function getFallbackProjects(): FallbackProject[] {
  return [
    {
      id: 1,
      title: 'WPGan.com',
      description: 'WPGan.com is one of my blog to share about my experiences when facing error or a cheat when developing or troubleshooting websites and servers (VPS) especially when using WordPress, cPanel, and Linux server.',
      technologies: ['WordPress', 'CloudFlare',],
      projectUrl: 'https://wpgan.com',
      githubUrl: '',
      imageUrl: '/img/showcase/wpgan.webp',
      featured: true
    },
    {
      id: 2,
      title: 'PRIFITRA',
      description: 'PRIFITRA is a web-based application that lets you migrate data across server, especially designed if your hosting doesn&apos;t support SSH.',
      technologies: ['Javascript', 'CSS', 'Native PHP',],
      projectUrl: 'https://github.com/mnasikin/prifitra',
      githubUrl: 'https://github.com/mnasikin/prifitra',
      imageUrl: '/img/showcase/prifitra.webp',
      featured: true
    },
    {
      id: 3,
      title: 'BtW Importer',
      description: 'A powerful yet simple migration tool (plugin), BtW Importer helps you seamlessly transfer posts, images, and formatting from Blogger (Blogspot) to WordPress. Whether you&apos;re a casual blogger or managing a large archive, this plugin handles the complex parts so you don&apos;t have to.',
      technologies: ['PHP', 'Javascript', 'CSS'],
      projectUrl: 'https://wordpress.org/plugins/btw-importer/',
      githubUrl: 'https://github.com/mnasikin/btw-importer',
      imageUrl: '/img/showcase/btw-importer.webp',
      featured: true
    },
    {
      id: 4,
      title: 'Profee',
      description: 'A full-stack portfolio starter built with Next.js 15 (App Router), TypeScript, and Tailwind + shadcn/ui on the front-end, backed by Prisma and SQLite.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Prisma', 'SQLite'],
      projectUrl: 'https://nasikin.web.id',
      githubUrl: 'https://github.com/mnasikin/Profee',
      imageUrl: '/img/showcase/profee.webp',
      featured: true
    },
    {
      id: 5,
      title: 'Ezha',
      description: 'A simple and lightwight plugin designed to effortlessly integrate share buttons adorned with captivating Font Awesome icons into your single posts and pages.',
      technologies: ['PHP', 'CSS', 'Javascript'],
      projectUrl: 'https://wordpress.org/plugins/ezsha/',
      githubUrl: 'https://github.com/mnasikin/Ezsha',
      imageUrl: '/img/showcase/ezsha.webp',
      featured: false
    },
    {
      id: 6,
      title: 'Propagasi Web',
      description: 'A website based appliaction to check DNS propagation from many Indonesia public DNS server, Global DNS server, and WHOIS Check.',
      technologies: ['Codeigniter', 'RDAP', 'WHOIS'],
      projectUrl: 'https://propagasi.web.id/',
      githubUrl: '',
      imageUrl: '/img/showcase/propagasi.webp',
      featured: false
    },
    {
      id: 7,
      title: 'PRIFITRA - Landing Page',
      description: 'A landing page built with basic CSS and HTML for PRIFITRA application.',
      technologies: ['CSS', 'HTML', 'Javascript'],
      projectUrl: 'https://github.com/mnasikin/Prifitra-Landing-Page',
      githubUrl: 'https://github.com/mnasikin/Prifitra-Landing-Page',
      imageUrl: '/img/showcase/prifitra-lp.webp',
      featured: false
    },
    {
      id: 8,
      title: 'Carimonitor',
      description: 'Websites for checking specifications and comparing monitors available in the Indonesian market.',
      technologies: ['Laravel', 'Tailwind CSS', ],
      projectUrl: 'https://carimonitor.web.id',
      githubUrl: '',
      imageUrl: '/img/showcase/carimonitor.webp',
      featured: false
    }
  ]
}

export function getFallbackSkills(): FallbackSkill[] {
  return [
    { id: 1, name: 'WordPress Management', category: 'Experienced', proficiencyLevel: 5, isTechnical: true },
    { id: 2, name: 'WordPress Troubleshooting', category: 'Experienced', proficiencyLevel: 5, isTechnical: true },
    { id: 3, name: 'CloudFlare Management', category: 'Experienced', proficiencyLevel: 5, isTechnical: true },

    { id: 5, name: 'Domain & Hosting', category: 'Advanced', proficiencyLevel: 4, isTechnical: true },
    { id: 6, name: 'Website Troubleshooting', category: 'Advanced', proficiencyLevel: 4, isTechnical: true },
    { id: 7, name: 'On-Page SEO', category: 'Advanced', proficiencyLevel: 4, isTechnical: true },
    { id: 8, name: 'WHM/cPanel', category: 'Advanced', proficiencyLevel: 4, isTechnical: true },

    { id: 9, name: 'Linux Server', category: 'Intermediate', proficiencyLevel: 3, isTechnical: true },

    { id: 10, name: 'Problem Solving', category: 'Soft Skills', proficiencyLevel: 2, isTechnical: false },
    { id: 11, name: 'Team Collaboration', category: 'Soft Skills', proficiencyLevel: 2, isTechnical: false },
    { id: 12, name: 'Communication', category: 'Soft Skills', proficiencyLevel: 2, isTechnical: false },
    { id: 14, name: 'Adaptability', category: 'Soft Skills', proficiencyLevel: 2, isTechnical: false },
    { id: 15, name: 'Critical Thinking', category: 'Soft Skills', proficiencyLevel: 2, isTechnical: false },
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

