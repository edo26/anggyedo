/**
 * Content Types - Defines all data structures for the portfolio landing page.
 * Following the Interface Segregation Principle (ISP), each content section
 * has its own dedicated interface rather than one monolithic type.
 */

// This interface defines the structure for the navigation bar content
export interface NavbarContent {
  logo: string;
  logoAccent: string;
  links: NavLink[];
  ctaText: string;
  ctaUrl: string;
}

// This interface defines a single navigation link item
export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

// This interface defines the hero/banner section content
export interface HeroContent {
  badgeText: string;
  greeting: string;
  name: string;
  title: string;
  description: string;
  profileImageUrl: string;
  yearsExperience: string;
  statusText: string;
  socialLinks: SocialLink[];
}

// This interface defines a single social media link
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// This interface defines a single professional experience entry
export interface ExperienceEntry {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'professional' | 'education';
}

// This interface defines the experiences section content
export interface ExperiencesContent {
  title: string;
  subtitle?: string;
  entries: ExperienceEntry[];
}

// This interface defines a single skill item
export interface SkillItem {
  name: string;
  subtitle: string;
  icon?: string;
}

// This interface defines a skill category group
export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

// This interface defines the skills section content
export interface SkillsContent {
  title: string;
  description: string;
  categories: SkillCategory[];
}

// This interface defines the call-to-action section content
export interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

// This interface defines the footer content
export interface FooterContent {
  copyright: string;
  builtWith: string;
}

// This interface defines the complete page content structure
export interface PageContent {
  navbar: NavbarContent;
  hero: HeroContent;
  professionalExperiences: ExperiencesContent;
  earlierExperiences: ExperiencesContent;
  skills: SkillsContent;
  cta: CTAContent;
  footer: FooterContent;
}

// This interface defines the admin authentication credentials
export interface AdminCredentials {
  username: string;
  password: string;
}

// This interface defines the API response wrapper following Single Responsibility
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// This interface defines the Google Apps Script configuration
export interface GASConfig {
  scriptUrl: string;
  sheetId: string;
}
