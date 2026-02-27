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
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
    };

    if (!projects || !projects.items || projects.items.length === 0) return null;

    return (
        <section id="projects" className="py-24 relative bg-[#0A1128] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header matching Reference "OUR SERVICES" */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-[#FFD166] font-bold text-sm tracking-[0.2em] uppercase mb-4"
                    >
                        Portfolio
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
                    >
                        {projects.title || "Projects That You Can Rely On"}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-slate-400"
                    >
                        {projects.subtitle}
                    </motion.p>
                </div>

                {/* Project Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {projects.items.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="bg-[#101A36] dark:bg-slate-900 border border-white/5 rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 relative flex flex-col"
                        >
                            {/* Accent line on hover */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD166] to-[#06D6A0] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-20" />

                            <div className="relative h-48 w-full overflow-hidden bg-[#0A1128]">
                                {project.imageUrl ? (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                                        No Image
                                    </div>
                                )}
                                {/* Overlay with actions */}
                                <div className="absolute inset-0 bg-[#0A1128]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {project.projectUrl && project.projectUrl !== '#' && (
                                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#FFD166] text-[#0A1128] rounded-full hover:bg-white transition-colors hover:scale-110 transform" aria-label="View Project">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.githubUrl && project.githubUrl !== '#' && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-[#0A1128] rounded-full hover:bg-[#FFD166] transition-colors hover:scale-110 transform" aria-label="View Code">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFD166] transition-colors">{project.title}</h3>
                                <p className="text-slate-400 mb-6 line-clamp-2 text-sm flex-grow">{project.description}</p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                            <span key={idx} className="px-2.5 py-1 bg-white/5 text-slate-300 rounded text-[10px] font-bold uppercase tracking-wider">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Button styled like the reference */}
                                    {project.projectUrl && project.projectUrl !== '#' && (
                                        <div className="inline-flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#FFD166] transition-colors">
                                            <span>View Live</span>
                                            <div className="w-6 h-6 rounded-full bg-[#EF476F] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                <span className="text-white text-[10px] leading-none">→</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button matching reference */}
                <div className="mt-16 text-center">
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-block bg-[#EF476F] hover:bg-[#D9385E] text-white px-8 py-3 rounded-md font-bold tracking-wider text-sm shadow-xl shadow-[#EF476F]/20 transition-all hover:-translate-y-1"
                    >
                        ALL PROJECTS
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
