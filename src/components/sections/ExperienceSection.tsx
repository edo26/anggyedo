/**
 * Experience Section Component - Displays professional and education timeline.
 * Following Single Responsibility Principle, this component only handles
 * the experiences timeline display with animated cards.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import type { ExperiencesContent } from '@/types/content';

// This interface defines the props for the ExperienceSection component
interface ExperienceSectionProps {
    data: ExperiencesContent;
    id: string;
    variant?: 'professional' | 'education';
}

/**
 * This component renders a timeline of experience entries.
 * Features: vertical timeline connector, animated entry cards,
 * achievement lists, and technology tags.
 */
export default function ExperienceSection({ data, id, variant = 'professional' }: ExperienceSectionProps) {
    // This icon selection is based on the section variant
    const SectionIcon = variant === 'professional' ? Briefcase : GraduationCap;

    return (
        <section id={id} className="py-20 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2 rounded-full mb-4 border border-slate-200/50 dark:border-slate-700/50">
                        <SectionIcon className="w-4 h-4" />
                        <span>{variant === 'professional' ? 'Career' : 'Education'}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                        {data.title}
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-slate-400 via-slate-300/50 to-transparent dark:from-slate-600 dark:via-slate-700/50" />

                    {/* Experience Entries */}
                    <div className="space-y-12">
                        {data.entries.map((entry, index) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-8 md:pl-20"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-3 h-3 bg-slate-400 dark:bg-slate-500 rounded-full ring-4 ring-white dark:ring-slate-950 z-10" />

                                {/* Experience Card */}
                                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-6 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-400/30 dark:hover:border-slate-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 group">
                                    {/* Header */}
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                                {entry.role}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                {entry.company}
                                            </p>
                                        </div>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full font-medium">
                                            {entry.period}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 italic">
                                        {entry.description}
                                    </p>

                                    {/* Achievements */}
                                    {entry.achievements.length > 0 && (
                                        <div className="space-y-2 mb-4">
                                            {entry.achievements.map((achievement, achIndex) => (
                                                <div key={achIndex} className="flex items-start space-x-2">
                                                    <CheckCircle2 className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Technologies */}
                                    {entry.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {entry.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium border border-slate-200 dark:border-slate-700"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
