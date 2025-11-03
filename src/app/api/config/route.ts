import { NextResponse } from 'next/server'
import { getConfig } from '@/lib/config'

// GET configuration
export async function GET() {
  try {
    const config = getConfig()
    
    // Return only safe configuration values (exclude sensitive data)
    const safeConfig = {
      // Portfolio
      portalTitle: config.portalTitle,
      portalDescription: config.portalDescription,
      defaultName: config.defaultName,
      defaultEmail: config.defaultEmail,
      defaultPhone: config.defaultPhone,
      defaultLocation: config.defaultLocation,
      defaultGithub: config.defaultGithub,
      defaultLinkedin: config.defaultLinkedin,
      avatarUrl: config.avatarUrl,
      defaultHighlights: config.defaultHighlights,
      defaultQuote: config.defaultQuote,
      
      // UI
      theme: config.theme,
      primaryColor: config.primaryColor,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      
      // Contact Form
      enableContactForm: config.enableContactForm,
      contactEmailRecipient: config.contactEmailRecipient,
      smtpConfigured: Boolean(config.smtpHost && config.smtpUser && config.smtpPassword),
      
      // SEO
      siteTitle: config.siteTitle,
      siteDescription: config.siteDescription,
      siteUrl: config.siteUrl,
      siteKeywords: config.siteKeywords,
      
      // Social Media
      githubUrl: config.githubUrl,
      linkedinUrl: config.linkedinUrl,
      twitterUrl: config.twitterUrl,
      facebookUrl: config.facebookUrl,
      instagramUrl: config.instagramUrl,
      threadsUrl: config.threadsUrl,
      youtubeUrl: config.youtubeUrl,
      tiktokUrl: config.tiktokUrl,
      dribbbleUrl: config.dribbbleUrl,
      behanceUrl: config.behanceUrl,
      codepenUrl: config.codepenUrl,
      mediumUrl: config.mediumUrl,
      devtoUrl: config.devUrl,
      stackoverflowUrl: config.stackoverflowUrl,
      websiteUrl: config.websiteUrl,
      
      // Analytics (only in production or if explicitly enabled)
      googleAnalyticsId: config.googleAnalyticsId,
      googleTagManagerId: config.googleTagManagerId,
      
      // Environment
      nodeEnv: config.nodeEnv
    }

    return NextResponse.json(safeConfig)
  } catch (error) {
    console.error('Error fetching configuration:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
