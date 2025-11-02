import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
  Music,
  Dribbble,
  Palette,
  Code,
  BookOpen,
  Layers,
  Globe,
  ExternalLink
} from "lucide-react"

interface SocialMediaIconsProps {
  className?: string
  showLabels?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

interface SocialLink {
  platform: string
  url: string
  icon: string
}

const iconMap: Record<string, React.ComponentType<any>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  threads: MessageCircle,
  youtube: Youtube,
  tiktok: Music,
  dribbble: Dribbble,
  behance: Palette,
  codepen: Code,
  medium: BookOpen,
  devto: Code,
  stackoverflow: Layers,
  globe: Globe
}

const platformColors: Record<string, string> = {
  github: "hover:bg-gray-900 hover:text-white",
  linkedin: "hover:bg-blue-600 hover:text-white",
  twitter: "hover:bg-sky-500 hover:text-white",
  facebook: "hover:bg-blue-700 hover:text-white",
  instagram: "hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white",
  threads: "hover:bg-black hover:text-white",
  youtube: "hover:bg-red-600 hover:text-white",
  tiktok: "hover:bg-black hover:text-white",
  dribbble: "hover:bg-pink-500 hover:text-white",
  behance: "hover:bg-blue-500 hover:text-white",
  codepen: "hover:bg-black hover:text-white",
  medium: "hover:bg-white hover:text-black hover:border-gray-300",
  devto: "hover:bg-black hover:text-white",
  stackoverflow: "hover:bg-orange-500 hover:text-white",
  globe: "hover:bg-gray-600 hover:text-white"
}

export function SocialMediaIcons({ 
  className = "", 
  showLabels = false,
  size = "md",
  variant = "outline"
}: SocialMediaIconsProps) {
  // Import the social media links from config
  const getSocialMediaLinks = () => {
    // This will be replaced with actual config import
    return [
      { platform: "GitHub", url: "https://github.com/johndoe", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com/johndoe", icon: "twitter" },
      { platform: "Facebook", url: "https://facebook.com/johndoe", icon: "facebook" },
      { platform: "Instagram", url: "https://instagram.com/johndoe", icon: "instagram" },
      { platform: "Threads", url: "https://threads.net/johndoe", icon: "threads" },
      { platform: "YouTube", url: "https://youtube.com/@johndoe", icon: "youtube" },
      { platform: "TikTok", url: "https://tiktok.com/@johndoe", icon: "tiktok" },
      { platform: "Dribbble", url: "https://dribbble.com/johndoe", icon: "dribbble" },
      { platform: "Behance", url: "https://behance.net/johndoe", icon: "behance" },
      { platform: "CodePen", url: "https://codepen.io/johndoe", icon: "codepen" },
      { platform: "Medium", url: "https://medium.com/@johndoe", icon: "medium" },
      { platform: "Dev.to", url: "https://dev.to/johndoe", icon: "devto" },
      { platform: "Stack Overflow", url: "https://stackoverflow.com/users/123456/johndoe", icon: "stackoverflow" },
      { platform: "Website", url: "https://johndoe.com", icon: "globe" }
    ]
  }

  const socialLinks = getSocialMediaLinks()

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  }

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((link) => {
        const IconComponent = iconMap[link.icon] || ExternalLink
        const colorClass = platformColors[link.icon] || "hover:bg-gray-200"
        
        return (
          <Button
            key={link.platform}
            variant={variant}
            size={size === "sm" ? "sm" : "default"}
            className={`${colorClass} ${sizeClasses[size]} ${showLabels ? "flex items-center gap-2" : ""} transition-all duration-200`}
            asChild
          >
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full h-full"
            >
              <IconComponent className={iconSizeClasses[size]} />
              {showLabels && (
                <span className="text-xs font-medium">
                  {link.platform}
                </span>
              )}
            </a>
          </Button>
        )
      })}
    </div>
  )
}

// Individual social media button component
interface SocialMediaButtonProps {
  platform: string
  url: string
  icon?: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function SocialMediaButton({ 
  platform, 
  url, 
  icon,
  className = "",
  size = "md",
  variant = "outline"
}: SocialMediaButtonProps) {
  const IconComponent = iconMap[icon || platform.toLowerCase()] || ExternalLink
  const colorClass = platformColors[icon || platform.toLowerCase()] || "hover:bg-gray-200"

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  }

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  return (
    <Button
      variant={variant}
      size={size === "sm" ? "sm" : "default"}
      className={`${colorClass} ${sizeClasses[size]} ${className} transition-all duration-200`}
      asChild
    >
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full h-full"
      >
        <IconComponent className={iconSizeClasses[size]} />
      </a>
    </Button>
  )
}
