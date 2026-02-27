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
            className="min-h-screen flex items-center pt-16 pb-20 relative overflow-hidden bg-white dark:bg-slate-950"
        >
            {/* Main Image Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60">
                <Image
                    src="/hero-bg.png"
                    alt="Abstract metallic ripples"
                    fill
                    priority
                    className="object-cover"
                />
            </div>
            {/* Elegant overlay gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white dark:from-slate-950/80 dark:via-slate-950/50 dark:to-slate-950 z-0 pointer-events-none" />

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
                            <span className="inline-flex items-center space-x-2 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{hero.badgeText}</span>
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                                {hero.greeting}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-200 dark:to-slate-400">
                                    {hero.name}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            variants={itemVariants}
                            className="text-xl sm:text-3xl font-medium text-slate-600 dark:text-slate-300 tracking-wide"
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
                                className="inline-flex items-center space-x-2 bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl group"
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
                                        className="p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all hover:scale-110 shadow-sm"
                                        aria-label={social.platform}
                                    >
                                        {getSocialIcon(social.icon)}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Profile Card */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center lg:justify-end relative"
                    >
                        <div className="relative group">
                            {/* Glassmorphism Profile Card */}
                            <div className="w-72 h-80 sm:w-80 sm:h-96 rounded-[2rem] bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-2xl overflow-hidden relative group-hover:shadow-3xl transition-shadow duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
                                <Image
                                    src={hero.profileImageUrl}
                                    alt={`${hero.name} profile`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />

                                {/* Status Badge - Bottom of card */}
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-white text-sm font-medium">
                                            {hero.statusText}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Experience Badge */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-4 -right-4 sm:-right-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-xl px-5 py-3 border border-slate-200/50 dark:border-slate-700/50"
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-slate-800 dark:text-white">
                                        {hero.yearsExperience}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                                        Years Experience
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative floating dots */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute -bottom-6 -left-6 w-16 h-16 border border-slate-300 dark:border-slate-600 rounded-full opacity-60 backdrop-blur-md"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
