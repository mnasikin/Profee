// Configuration management for the portfolio

export interface PortfolioConfig {
  // Portfolio
  portalTitle: string
  portalDescription: string
  defaultName: string
  defaultEmail: string
  defaultPhone: string
  defaultLocation: string
  defaultGithub: string
  defaultLinkedin: string
  avatarUrl: string
  
  // UI
  theme: 'light' | 'dark'
  primaryColor: string
  backgroundColor: string
  textColor: string
  
  // Contact Form
  enableContactForm: boolean
  contactEmailRecipient: string
  contactEmailSubject: string
  smtpHost: string
  smtpPort: number
  smtpSecure: boolean
  smtpUser: string
  smtpPassword: string

  // SEO
  siteTitle: string
  siteDescription: string
  siteUrl: string
  siteKeywords: string
  
  // Social Media
  githubUrl: string
  linkedinUrl: string
  twitterUrl: string
  facebookUrl: string
  instagramUrl: string
  threadsUrl: string
  youtubeUrl: string
  tiktokUrl: string
  dribbbleUrl: string
  behanceUrl: string
  codepenUrl: string
  mediumUrl: string
  devUrl: string
  stackoverflowUrl: string
  websiteUrl: string
  
  // Analytics
  googleAnalyticsId: string
  googleTagManagerId: string
  
  // Development
  nodeEnv: string
  debug: boolean
}

class ConfigManager {
  private config: PortfolioConfig

  constructor() {
    this.config = this.loadConfig()
  }

  private loadConfig(): PortfolioConfig {
    const theme = (process.env.THEME as 'light' | 'dark') || 'light'

    return {
      // Portfolio
      portalTitle: process.env.PORTAL_TITLE || 'My Portfolio',
      portalDescription: process.env.PORTAL_DESCRIPTION || 'Full Stack Developer',
      defaultName: process.env.DEFAULT_NAME || 'John Doe',
      defaultEmail: process.env.DEFAULT_EMAIL || 'john.doe@example.com',
      defaultPhone: process.env.DEFAULT_PHONE || '+1 (555) 123-4567',
      defaultLocation: process.env.DEFAULT_LOCATION || 'San Francisco, CA',
      defaultGithub: process.env.DEFAULT_GITHUB || 'https://github.com/johndoe',
      defaultLinkedin: process.env.DEFAULT_LINKEDIN || 'https://linkedin.com/in/johndoe',
      avatarUrl: process.env.AVATAR_URL || '',
      
      // UI
      theme,
      primaryColor: process.env.PRIMARY_COLOR || '#3b82f6',
      backgroundColor: process.env.BACKGROUND_COLOR || (theme === 'dark' ? '#0f172a' : '#ffffff'),
      textColor: process.env.TEXT_COLOR || (theme === 'dark' ? '#f8fafc' : '#1f2937'),
      
      // Contact Form
      enableContactForm: process.env.ENABLE_CONTACT_FORM === 'true',
      contactEmailRecipient: process.env.CONTACT_EMAIL_RECIPIENT || 'admin@example.com',
      contactEmailSubject: process.env.CONTACT_EMAIL_SUBJECT || 'New Contact Form Submission',
      smtpHost: process.env.SMTP_HOST || '',
      smtpPort: parseInt(process.env.SMTP_PORT || '587') || 587,
      smtpSecure: (process.env.SMTP_SECURE || '').toLowerCase() === 'true',
      smtpUser: process.env.SMTP_USER || '',
      smtpPassword: process.env.SMTP_PASSWORD || '',
      
      // SEO
      siteTitle: process.env.SITE_TITLE || 'John Doe - Full Stack Developer',
      siteDescription: process.env.SITE_DESCRIPTION || 'Portfolio website showcasing projects, experience, and skills',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      siteKeywords: process.env.SITE_KEYWORDS || 'full stack developer, web development, portfolio, projects',
      
      // Social Media
      githubUrl: process.env.GITHUB_URL || 'https://github.com/johndoe',
      linkedinUrl: process.env.LINKEDIN_URL || 'https://linkedin.com/in/johndoe',
      twitterUrl: process.env.TWITTER_URL || 'https://twitter.com/johndoe',
      facebookUrl: process.env.FACEBOOK_URL || 'https://facebook.com/johndoe',
      instagramUrl: process.env.INSTAGRAM_URL || 'https://instagram.com/johndoe',
      threadsUrl: process.env.THREADS_URL || 'https://threads.net/johndoe',
      youtubeUrl: process.env.YOUTUBE_URL || 'https://youtube.com/@johndoe',
      tiktokUrl: process.env.TIKTOK_URL || 'https://tiktok.com/@johndoe',
      dribbbleUrl: process.env.DRIBBBLE_URL || 'https://dribbble.com/johndoe',
      behanceUrl: process.env.BEHANCE_URL || 'https://behance.net/johndoe',
      codepenUrl: process.env.CODEPEN_URL || 'https://codepen.io/johndoe',
      mediumUrl: process.env.MEDIUM_URL || 'https://medium.com/@johndoe',
      devUrl: process.env.DEV_URL || 'https://dev.to/johndoe',
      stackoverflowUrl: process.env.STACKOVERFLOW_URL || 'https://stackoverflow.com/users/123456/johndoe',
      websiteUrl: process.env.WEBSITE_URL || 'https://johndoe.com',
      
      // Analytics
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
      googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID || '',
      
      // Development
      nodeEnv: process.env.NODE_ENV || 'development',
      debug: process.env.DEBUG === 'true'
    }
  }

  public get(): PortfolioConfig
  public get<K extends keyof PortfolioConfig>(key: K): PortfolioConfig[K]
  public get<K extends keyof PortfolioConfig>(key?: K) {
    if (typeof key === 'undefined') {
      return this.config
    }

    return this.config[key]
  }

  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development'
  }

  public isProduction(): boolean {
    return this.config.nodeEnv === 'production'
  }

  public shouldDebug(): boolean {
    return this.config.debug || this.isDevelopment()
  }

  public getSocialMediaLinks(): Array<{ platform: string; url: string; icon: string }> {
    const links = [
      { platform: 'GitHub', url: this.config.githubUrl, icon: 'github' },
      { platform: 'LinkedIn', url: this.config.linkedinUrl, icon: 'linkedin' },
      { platform: 'Twitter', url: this.config.twitterUrl, icon: 'twitter' },
      { platform: 'Facebook', url: this.config.facebookUrl, icon: 'facebook' },
      { platform: 'Instagram', url: this.config.instagramUrl, icon: 'instagram' },
      { platform: 'Threads', url: this.config.threadsUrl, icon: 'threads' },
      { platform: 'YouTube', url: this.config.youtubeUrl, icon: 'youtube' },
      { platform: 'TikTok', url: this.config.tiktokUrl, icon: 'tiktok' },
      { platform: 'Dribbble', url: this.config.dribbbleUrl, icon: 'dribbble' },
      { platform: 'Behance', url: this.config.behanceUrl, icon: 'behance' },
      { platform: 'CodePen', url: this.config.codepenUrl, icon: 'codepen' },
      { platform: 'Medium', url: this.config.mediumUrl, icon: 'medium' },
      { platform: 'Dev.to', url: this.config.devUrl, icon: 'devto' },
      { platform: 'Stack Overflow', url: this.config.stackoverflowUrl, icon: 'stackoverflow' }
    ]

    // Add website URL if it exists
    if (this.config.websiteUrl && this.config.websiteUrl.trim() !== '') {
      links.push({ platform: 'Website', url: this.config.websiteUrl, icon: 'globe' })
    }

    // Filter out empty URLs
    return links.filter(link => link.url && link.url.trim() !== '')
  }
}

// Export singleton instance
export const config = new ConfigManager()

// Export convenience functions
export const getConfig = () => config.get()
export const getConfigValue = <K extends keyof PortfolioConfig>(key: K) => config.get(key)
export const isDev = () => config.isDevelopment()
export const isProd = () => config.isProduction()
export const shouldDebug = () => config.shouldDebug()
export const getSocialMediaLinks = () => config.getSocialMediaLinks()
