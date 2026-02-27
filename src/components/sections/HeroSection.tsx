/**
 * Hero Section Component - The main banner/hero area of the landing page.
 * Following Single Responsibility Principle, this component only handles
 * the hero section display with profile info, social links, and badges.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Github, Instagram, MapPin, Sparkles } from 'lucide-react';
import { useContent } from '@/lib/contentProvider';
import Image from 'next/image';

/**
 * This function maps social platform names to their respective Lucide icons.
 * Used for rendering the correct icon based on content data.
 */
function getSocialIcon(platform: string) {
    const icons: Record<string, React.ReactNode> = {
        linkedin: <Linkedin className="w-5 h-5" />,
        github: <Github className="w-5 h-5" />,
        instagram: <Instagram className="w-5 h-5" />,
    };
    return icons[platform.toLowerCase()] || <MapPin className="w-5 h-5" />;
}

/**
 * This component renders the hero/banner section of the landing page.
 * Features: animated entry, glassmorphism profile card, floating badges,
 * social links, and gradient text effects.
 */
export default function HeroSection() {
    const { content } = useContent();
    const { hero } = content;

    // This defines animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center pt-16 pb-20 relative overflow-hidden"
        >
            {/* Background gradient decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                >
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        {/* Available Badge */}
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center space-x-2 bg-teal-500/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400 text-xs font-semibold px-4 py-2 rounded-full border border-teal-500/20">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{hero.badgeText}</span>
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                                {hero.greeting}{' '}
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
                                    {hero.name}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300"
                        >
                            {hero.title}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg text-base"
                        >
                            {hero.description}
                        </motion.p>

                        {/* Social Links + CTA */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-4 pt-2"
                        >
                            <a
                                href={content.navbar.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-teal-500/25 group"
                            >
                                <span>{content.navbar.ctaText}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <div className="flex items-center space-x-3">
                                {hero.socialLinks.map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-teal-500 hover:text-white transition-all hover:scale-110 hover:shadow-lg"
                                        aria-label={social.platform}
                                    >
                                        {getSocialIcon(social.icon)}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - 3D Illustration */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center lg:justify-end relative w-full h-[350px] sm:h-[450px] lg:h-[600px] z-10"
                    >
                        <div className="relative w-full h-full animate-[float_6s_ease-in-out_infinite]">
                            <Image
                                src="/hero_3d.png"
                                alt="Modern Web Development 3D Illustration"
                                fill
                                className="object-contain object-right drop-shadow-2xl"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        {/* Decorative floating elements inspired by reference */}
                        <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-yellow-400 animate-pulse" />
                        <div className="absolute bottom-20 left-10 w-6 h-6 rounded-sm bg-teal-400 rotate-45 animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Dark Blue Diagonal Background element inspired by reference */}
            <div className="absolute bottom-0 left-0 w-full h-[35%] bg-[#0a1128] transform -skew-y-3 origin-bottom-right rounded-tl-[100px] dark:bg-slate-900" />
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-[#0a1128] dark:bg-slate-900" />
        </section>
    );
}
