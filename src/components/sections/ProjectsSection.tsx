/**
 * Projects Section Component - Displays featured works.
 * Following Single Responsibility Principle, this component only handles
 * rendering the projects grid with its heading.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useContent } from '@/lib/contentProvider';
import Image from 'next/image';

/**
 * This component renders the projects section of the landing page.
 * Features an animated grid of project cards with hover effects and direct links.
 */
export default function ProjectsSection() {
    const { content } = useContent();
    const { projects } = content;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
    };

    if (!projects || !projects.items || projects.items.length === 0) return null;

    return (
        <section id="projects" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
                    >
                        {projects.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-slate-600 dark:text-slate-400"
                    >
                        {projects.subtitle}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {projects.items.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow"
                        >
                            <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                {project.imageUrl ? (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        No Image
                                    </div>
                                )}
                                {/* Overlay with actions */}
                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {project.projectUrl && project.projectUrl !== '#' && (
                                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-teal-500 hover:text-white transition-colors" aria-label="View Project">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.githubUrl && project.githubUrl !== '#' && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-teal-500 hover:text-white transition-colors" aria-label="View Code">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-teal-50 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400 rounded-full text-xs font-medium border border-teal-500/20">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
