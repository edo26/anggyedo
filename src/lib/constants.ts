/**
 * Application Constants - Centralized configuration values.
 * Following the Open/Closed Principle (OCP), these constants define
 * default configuration that can be extended without modification.
 */

import type { PageContent, GASConfig } from '@/types/content';

// This constant defines the local storage key for admin authentication
export const AUTH_TOKEN_KEY = 'anggyedo_admin_token';

// This constant defines the local storage key for GAS configuration
export const GAS_CONFIG_KEY = 'anggyedo_gas_config';

// This constant defines the session duration in milliseconds (24 hours)
export const SESSION_DURATION = 24 * 60 * 60 * 1000;

// This constant defines the default GAS configuration
export const DEFAULT_GAS_CONFIG: GASConfig = {
    scriptUrl: '',
    sheetId: '',
};

// This constant provides the default/fallback page content when GAS is not configured
export const DEFAULT_CONTENT: PageContent = {
    navbar: {
        logo: 'A',
        logoAccent: 'AnggyEdo.',
        links: [
            { label: 'Home', href: '#home', isActive: true },
            { label: 'Experience', href: '#experience' },
            { label: 'Projects', href: '#projects' },
            { label: 'Skills', href: '#skills' },
        ],
        ctaText: 'Contact Me',
        ctaUrl: 'https://www.linkedin.com/in/anggyedo',
    },
    hero: {
        badgeText: 'AVAILABLE FOR REMOTE WORK',
        greeting: "Hi, I'm",
        name: 'Anggy Edo',
        title: 'Senior Frontend Engineer & Performance Specialist',
        description:
            'Product-minded Senior Frontend Engineer with 8+ years of experience architecting scalable web applications. Proven track record in modernizing legacy architectures, slashing database execution times by 90%, and building robust offline-first systems.',
        profileImageUrl: '/profile.jpg',
        yearsExperience: '8+',
        statusText: 'Open to Opportunities',
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/anggyedo', icon: 'linkedin' },
            { platform: 'GitHub', url: 'https://github.com/anggyedo', icon: 'github' },
            { platform: 'Instagram', url: 'https://instagram.com/anggyedo', icon: 'instagram' },
        ],
    },
    professionalExperiences: {
        title: 'Professional Experiences',
        entries: [
            {
                id: 'exp-1',
                company: 'Tech Company',
                role: 'Frontend Engineer',
                period: '2020 - Present',
                description:
                    'Led frontend initiatives for high-impact national projects including Project Management Systems (PMS), Network Management Systems (NMS) and Asset Management Systems (AMS).',
                achievements: [
                    'Reduced data retrieval time from 30s to under 3s (>90% Improvement)',
                    'Migrated complex PHP/Codeigniter systems to modern Nuxt.js architecture',
                    'Core contributor to internal UI Kit standardizing components across products',
                    'Lead Mentor for Academy, training junior developers on frontend best practices',
                ],
                technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
                type: 'professional',
            },
            {
                id: 'exp-2',
                company: 'EdTech Company',
                role: 'Frontend Engineer',
                period: '2018 - 2020',
                description:
                    'Key developer for large-scale educational platforms used by universities and national school systems.',
                achievements: [
                    'Architected frontend for centralized Academic Information System',
                    'Evaluated and implemented Vuetify to accelerate UI development cycle',
                    'Led frontend delivery for School Quality Management Systems and LMS platforms',
                ],
                technologies: ['Vue.js', 'Vuetify', 'REST API', 'SCSS'],
                type: 'professional',
            },
            {
                id: 'exp-3',
                company: 'Freelance',
                role: 'Freelance Web Developer',
                period: '2016 - Present',
                description:
                    'Developed robust cross-platform applications and delivered pixel-perfect SEO-optimized websites.',
                achievements: [
                    'Built offline-first POS System for Korean Skin Clinic with 100% business continuity',
                    'Delivered SEO-optimized public websites for multiple clients',
                ],
                technologies: ['Electron.js', 'Vue.js', 'React', 'Next.js'],
                type: 'professional',
            },
            {
                id: 'exp-4',
                company: 'Teaching',
                role: 'Programming Instructor & Mentor',
                period: '2016 - 2018',
                description:
                    'Taught private programming classes, focusing on practical frontend development and real-world problem-solving.',
                achievements: [
                    'Mentored aspiring developers on modern frontend technologies',
                ],
                technologies: ['JavaScript', 'HTML/CSS', 'Bootstrap'],
                type: 'professional',
            },
        ],
    },
    earlierExperiences: {
        title: 'Earlier Experience & Education',
        entries: [
            {
                id: 'edu-1',
                company: 'Tech Corp',
                role: 'Frontend Engineer (Internship)',
                period: '2015 - 2016',
                description:
                    'Assisted in development of production web interfaces and bug fixing for live applications.',
                achievements: [],
                technologies: ['HTML', 'CSS', 'JavaScript'],
                type: 'education',
            },
            {
                id: 'edu-2',
                company: 'University',
                role: 'Co-Trainer Workshop Professional Web Programming',
                period: '2015',
                description:
                    'Assisted in teaching how to create websites using Bootstrap 4.0 and CodeIgniter.',
                achievements: [],
                technologies: ['Bootstrap', 'CodeIgniter'],
                type: 'education',
            },
            {
                id: 'edu-3',
                company: 'University',
                role: 'Informatic Laboratory Assistant',
                period: '2013 - 2015',
                description:
                    'S.T. in Informatic Engineering - GPA 3.83 / 4.00 (Cum Laude)',
                achievements: [
                    'Led Laboratory Assistant & taught programming fundamentals to university students',
                ],
                technologies: ['Java', 'C++', 'Data Structures'],
                type: 'education',
            },
        ],
    },
    skills: {
        title: 'Skills & Other',
        description:
            'A curated list of skills & tools I use to build performant, scalable, and beautiful web applications.',
        categories: [
            {
                title: 'Core Frontend Skills',
                skills: [
                    { name: 'HTML 5', subtitle: 'Markup' },
                    { name: 'CSS 3', subtitle: 'Styling' },
                    { name: 'JavaScript', subtitle: 'ES6+' },
                    { name: 'TypeScript', subtitle: 'Strict Typing' },
                    { name: 'Tailwind CSS', subtitle: 'Utility-first' },
                    { name: 'Bootstrap', subtitle: 'UI Kit' },
                ],
            },
            {
                title: 'Frameworks & Libraries',
                skills: [
                    { name: 'Vue JS', subtitle: 'Vue 2/3 & Composition' },
                    { name: 'Nuxt JS', subtitle: 'SSR & SSG' },
                    { name: 'React', subtitle: 'Hooks & Context' },
                    { name: 'Next.js', subtitle: 'SSR & SSG' },
                    { name: 'Electron JS', subtitle: 'Desktop Apps' },
                ],
            },
            {
                title: 'Engineering & Tools',
                skills: [
                    { name: 'REST API', subtitle: 'Integration' },
                    { name: 'Git', subtitle: 'Version Control' },
                    { name: 'Performance', subtitle: 'Optimization' },
                    { name: 'Component Architecture', subtitle: 'Design Patterns' },
                    { name: 'Docker', subtitle: 'Containerization' },
                ],
            },
            {
                title: 'Working Knowledge',
                skills: [
                    { name: 'Java', subtitle: 'Backend' },
                    { name: 'PHP', subtitle: 'Backend Dev' },
                    { name: 'Laravel', subtitle: 'Fullstack' },
                    { name: 'Flutter', subtitle: 'Mobile Dev' },
                    { name: 'Database Design', subtitle: 'SQL & NoSQL' },
                    { name: 'Scrum', subtitle: 'Agile Framework' },
                ],
            },
            {
                title: 'Language',
                skills: [
                    { name: 'English', subtitle: 'Professional Working Proficiency' },
                    { name: 'Indonesian', subtitle: 'Native' },
                ],
            },
        ],
    },
    projects: {
        title: 'Featured Projects',
        subtitle: 'A selection of my recent work',
        items: [
            {
                id: 'proj-1',
                title: 'E-Commerce Dashboard',
                description: 'A comprehensive admin dashboard for e-commerce with real-time analytics.',
                imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                technologies: ['React', 'Next.js', 'Tailwind CSS', 'Chart.js'],
                projectUrl: '#',
                githubUrl: '#',
            },
            {
                id: 'proj-2',
                title: 'AI Image Generator',
                description: 'A web application that generates images from text using OpenAI DALL-E API.',
                imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
                technologies: ['Vue.js', 'Nuxt.js', 'Node.js', 'OpenAI API'],
                projectUrl: '#',
                githubUrl: '#',
            }
        ],
    },
    cta: {
        title: 'Interested in working together?',
        description:
            "I'm currently available for freelance projects and remote full-time roles. Let's build something amazing together.",
        buttonText: "Let's Connect",
        buttonUrl: 'https://www.linkedin.com/in/anggyedo',
    },
    footer: {
        copyright: '© 2024 AnggyEdo. All rights reserved.',
        builtWith: 'Built with Next.js & Tailwind CSS',
    },
};
