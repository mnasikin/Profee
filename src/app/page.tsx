"use client"
import { useState, useEffect, useMemo, type ComponentType } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Loader2, Twitter, Facebook, Instagram, Dribbble, MessageCircle, Youtube, Music, Palette, Code2, BookOpen, Terminal, Layers, Globe } from "lucide-react"
import { ProjectCard } from "@/components/ProjectCard"
import { MasonryColumns, MasonryStyles } from "@/components/MasonryGrid"
// Types for our data
interface PersonalInfo {
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
interface Experience {
  id: number
  jobTitle: string
  company: string
  startDate: string
  endDate: string | null
  description: string
  achievements: string[]
  isCurrent: boolean
}
interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  projectUrl: string
  githubUrl: string
  imageUrl: string
  featured: boolean
}
interface Skill {
  id: number
  name: string
  category: string
  proficiencyLevel: number
  isTechnical: boolean
}
interface Config {
  portalTitle: string
  portalDescription: string
  defaultName: string
  defaultEmail: string
  defaultPhone: string
  defaultLocation: string
  defaultGithub: string
  defaultLinkedin: string
  githubUrl: string
  linkedinUrl: string
  avatarUrl: string
  theme: 'light' | 'dark'
  primaryColor: string
  backgroundColor: string
  textColor: string
  enableContactForm: boolean
  siteTitle: string
  siteDescription: string
  siteUrl: string
  siteKeywords: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  dribbbleUrl: string
  threadsUrl: string
  youtubeUrl: string
  tiktokUrl: string
  behanceUrl: string
  codepenUrl: string
  mediumUrl: string
  devtoUrl: string
  stackoverflowUrl: string
  websiteUrl: string
  googleAnalyticsId: string
  googleTagManagerId: string
  nodeEnv: string
}
type SocialButton = {
  key: string
  label: string
  icon: ComponentType<{ className?: string }>
  url: string
}
const sanitizeUrl = (value?: string | null) => {
  if (!value) {
    return ''
  }
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : ''
}
const safeImageSource = (value?: string, fallback?: string) => {
  if (value && value.trim().length > 0) {
    return value.trim()
  }
  if (fallback && fallback.trim().length > 0) {
    return fallback.trim()
  }
  return ''
}
const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('') || 'JD'
export default function Portfolio() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [experience, setExperience] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [contactMessage, setContactMessage] = useState('')
  const avatarSrc = safeImageSource(config?.avatarUrl)
  const primaryColor = config?.primaryColor
  const backgroundColor = config?.backgroundColor
  const textColor = config?.textColor || '#1f2937'

  const initials = useMemo(() => {
    if (personalInfo?.fullName) return getInitials(personalInfo.fullName)
    if (config?.defaultName) return getInitials(config.defaultName)
    return 'JD'
  }, [personalInfo, config])
  const socialButtons = useMemo(() => {
    const links: SocialButton[] = [
      {
        key: 'github',
        label: 'GitHub',
        icon: Github,
        url: sanitizeUrl(personalInfo?.githubUrl || config?.githubUrl || config?.defaultGithub)
      },
      {
        key: 'linkedin',
        label: 'LinkedIn',
        icon: Linkedin,
        url: sanitizeUrl(personalInfo?.linkedinUrl || config?.linkedinUrl || config?.defaultLinkedin)
      },
      {
        key: 'twitter',
        label: 'Twitter',
        icon: Twitter,
        url: sanitizeUrl(config?.twitterUrl)
      },
      {
        key: 'facebook',
        label: 'Facebook',
        icon: Facebook,
        url: sanitizeUrl(config?.facebookUrl)
      },
      {
        key: 'instagram',
        label: 'Instagram',
        icon: Instagram,
        url: sanitizeUrl(config?.instagramUrl)
      },
      {
        key: 'threads',
        label: 'Threads',
        icon: MessageCircle,
        url: sanitizeUrl(config?.threadsUrl)
      },
      {
        key: 'youtube',
        label: 'YouTube',
        icon: Youtube,
        url: sanitizeUrl(config?.youtubeUrl)
      },
      {
        key: 'tiktok',
        label: 'TikTok',
        icon: Music,
        url: sanitizeUrl(config?.tiktokUrl)
      },
      {
        key: 'dribbble',
        label: 'Dribbble',
        icon: Dribbble,
        url: sanitizeUrl(config?.dribbbleUrl)
      },
      {
        key: 'behance',
        label: 'Behance',
        icon: Palette,
        url: sanitizeUrl(config?.behanceUrl)
      },
      {
        key: 'codepen',
        label: 'CodePen',
        icon: Code2,
        url: sanitizeUrl(config?.codepenUrl)
      },
      {
        key: 'medium',
        label: 'Medium',
        icon: BookOpen,
        url: sanitizeUrl(config?.mediumUrl)
      },
      {
        key: 'devto',
        label: 'Dev.to',
        icon: Terminal,
        url: sanitizeUrl(config?.devtoUrl)
      },
      {
        key: 'stackoverflow',
        label: 'Stack Overflow',
        icon: Layers,
        url: sanitizeUrl(config?.stackoverflowUrl)
      },
      {
        key: 'website',
        label: 'Website',
        icon: Globe,
        url: sanitizeUrl(config?.websiteUrl)
      }
    ]
    return links.filter((link) => !!link.url)
  }, [personalInfo, config])
  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize database if needed
        await fetch('/api/init-db')
        // Fetch all data
        const [personalRes, experienceRes, projectsRes, skillsRes, configRes] = await Promise.all([
          fetch('/api/personal-info'),
          fetch('/api/experience'),
          fetch('/api/projects'),
          fetch('/api/skills'),
          fetch('/api/config')
        ])
        if (personalRes.ok) {
          const personalData = await personalRes.json()
          setPersonalInfo(personalData)
        }
        if (experienceRes.ok) {
          const experienceData = await experienceRes.json()
          setExperience(experienceData)
        }
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json()
          setProjects(projectsData)
        }
        if (skillsRes.ok) {
          const skillsData = await skillsRes.json()
          setSkills(skillsData)
        }
        if (configRes.ok) {
          const configData = await configRes.json()
          setConfig(configData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  // Update document title and meta tags when config is loaded
  useEffect(() => {
    if (config) {
      document.title = config.siteTitle
      // Update meta tags
      const metaDescription = document.querySelector('meta[name="description"]')
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', config.siteDescription)
      } else {
        const newMeta = document.createElement('meta')
        newMeta.name = 'description'
        newMeta.content = config.siteDescription
        document.head.appendChild(newMeta)
      }
      if (metaKeywords) {
        metaKeywords.setAttribute('content', config.siteKeywords)
      } else {
        const newMeta = document.createElement('meta')
        newMeta.name = 'keywords'
        newMeta.content = config.siteKeywords
        document.head.appendChild(newMeta)
      }
      // Add Google Analytics if ID is provided
      if (config.googleAnalyticsId && config.nodeEnv === 'production') {
        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`
        document.head.appendChild(script)
        const inlineScript = document.createElement('script')
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.googleAnalyticsId}');
        `
        document.head.appendChild(inlineScript)
      }
    }
  }, [config])
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitting(true)
    setContactMessage('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      })
      if (response.ok) {
        setContactMessage('Message sent successfully!')
        setContactForm({ name: '', email: '', message: '' })
      } else {
        setContactMessage('Failed to send message. Please try again.')
      }
    } catch (error) {
      setContactMessage('An error occurred. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long' 
    })
  }
  const getSkillsByCategory = () => {
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)
    return grouped
  }
  const getSocialIcon = (url: string) => {
    if (url.includes('twitter.com') || url.includes('x.com')) return Twitter
    if (url.includes('facebook.com')) return Facebook
    if (url.includes('instagram.com')) return Instagram
    if (url.includes('dribbble.com')) return Dribbble
    return ExternalLink
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading portfolio...</p>
        </div>
      </div>
    )
  }
  return (
    <>
      <MasonryStyles />
      <div className="min-h-screen bg-background p-4 md:p-8" style={{
        backgroundColor: config?.backgroundColor,
        color: config?.textColor
      }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="mb-4">
              {avatarSrc ? (
                <div
                  className="group relative mx-auto h-24 w-24 [perspective:1200px]"
                  style={{ color: textColor }}
                >
                  <div
                    className="relative h-full w-full transform rounded-full border-1 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                    style={{
                      backgroundColor
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full opacity-100 transition-opacity duration-300 group-hover:opacity-0 [backface-visibility:hidden]"
                      style={{ backgroundColor }}
                    >
                      <img
                        src={avatarSrc}
                        alt={personalInfo?.fullName || config?.defaultName || 'Profile avatar'}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        style={{ backfaceVisibility: 'hidden' }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 [transform:rotateY(180deg)] [backface-visibility:hidden] text-muted-foreground"
                      
                    >
                      <span className="text-3xl font-bold">
                        {initials}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4"
                >
                  <span className="text-3xl font-bold">
                    {initials}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {personalInfo?.fullName || config?.defaultName || 'John Doe'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {personalInfo ? personalInfo.title : config?.portalDescription || 'Full Stack Developer'}
            </p>
          </header>
          {/* Main Content */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full mb-8">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="showcase">Showcase</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            {/* About Me Tab */}
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                  <CardDescription>Get to know me better</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {personalInfo?.bio || 
                      "I'm a passionate full-stack developer with over 5 years of experience creating " +
                      "beautiful, functional web applications. I love turning complex problems into " +
                      "simple, elegant solutions that provide real value to users."
                    }
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When I'm not coding, you can find me exploring new technologies, contributing 
                    to open-source projects, or enjoying a good cup of coffee while reading about 
                    the latest developments in the tech world.
                  </p>
                  <div className="flex gap-2 pt-4">
                    <Badge variant="secondary">Problem Solver</Badge>
                    <Badge variant="secondary">Team Player</Badge>
                    <Badge variant="secondary">Continuous Learner</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Experience Tab */}
            <TabsContent value="experience">
              <div className="space-y-6">
                {experience.map((exp) => (
                  <Card key={exp.id}>
                    <CardHeader>
                      <CardTitle>{exp.jobTitle}</CardTitle>
                      <CardDescription>
                        {exp.company} • {formatDate(exp.startDate)} - {
                          exp.isCurrent ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '')
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Showcase Tab */}
            <TabsContent value="showcase">
              <div className="space-y-6 max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">My Projects</h2>
                  <p className="text-muted-foreground">A collection of my recent work and personal projects</p>
                </div>
                <MasonryColumns columnWidth={320}>
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </MasonryColumns>
              </div>
            </TabsContent>
            {/* Skills Tab */}
            <TabsContent value="skills">
              <div className="space-y-6">
                {Object.entries(getSkillsByCategory()).map(([category, categorySkills]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle>{category}</CardTitle>
                      <CardDescription>Technologies I work with</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge key={skill.id}>{skill.name}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Contact Tab */}
            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get In Touch</CardTitle>
                    <CardDescription>I'd love to hear from you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(personalInfo || config) && (
                      <>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <span>{personalInfo?.email || config?.defaultEmail}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <span>{personalInfo?.phone || config?.defaultPhone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <span>{personalInfo?.location || config?.defaultLocation}</span>
                        </div>
                        <div className="pt-4">
                          <h4 className="font-medium mb-3">Connect with me</h4>
                          {socialButtons.length > 0 && (
                            <div className="flex gap-3 flex-wrap">
                              {socialButtons.map(({ key, label, icon: Icon, url }) => (
                                <Button key={key} variant="outline" size="sm" asChild>
                                  <a href={url} target="_blank" rel="noopener noreferrer">
                                    <Icon className="w-4 h-4 mr-2" />
                                    {label}
                                  </a>
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                {config?.enableContactForm !== false && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Message</CardTitle>
                      <CardDescription>Fill out the form below</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            rows={4}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Your message..."
                            required
                          />
                        </div>
                        {contactMessage && (
                          <p className={`text-sm ${contactMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                            {contactMessage}
                          </p>
                        )}
                        <Button type="submit" className="w-full" disabled={contactSubmitting}>
                          {contactSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
