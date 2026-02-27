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
    const SectionIcon = variant === 'professional' ? Briefcase : GraduationCap;

    return (
        <section id={id} className="py-24 relative bg-white dark:bg-slate-900 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column - 3D Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-square max-w-md mx-auto"
                    >
                        {/* Yellow Circle Background - matches reference */}
                        <div className="absolute inset-4 rounded-full bg-[#FFD166] dark:bg-[#FFD166]/80 -z-10" />

                        {/* Floating 3D image */}
                        <div className="relative w-full h-full animate-[float_6s_ease-in-out_infinite]">
                            <img
                                src="/about_3d.png"
                                alt="Experience Professional 3D"
                                className="object-contain w-full h-full drop-shadow-2xl scale-110"
                            />
                        </div>

                        {/* Decorative dots inspired by reference */}
                        <div className="absolute top-1/2 -left-10 w-20 h-20 border-4 border-slate-200 dark:border-slate-800 rounded-lg animate-spin" style={{ animationDuration: '20s' }} />
                        <div className="absolute bottom-10 -right-5 w-4 h-4 bg-teal-400 rounded-full animate-pulse" />
                    </motion.div>

                    {/* Right Column - Content */}
                    <div className="space-y-8">
                        {/* Header Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-500 text-xs font-bold px-4 py-2 rounded-full tracking-wider uppercase mb-1">
                                <SectionIcon className="w-4 h-4 text-[#FFD166]" />
                                <span>{variant === 'professional' ? 'Experience & Background' : 'Education'}</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] dark:text-white leading-tight">
                                Delivering <span className="text-teal-500 border-b-4 border-[#FFD166]">Excellence</span> <br /> in Every {variant === 'professional' ? 'Project' : 'Class'}
                            </h2>
                            <p className="text-slate-500 text-base leading-relaxed">
                                Dramatically supply transparent deliverables before backward comp internal or "organic" sources. Building scalable and robust solutions for enterprise clients worldwide.
                            </p>
                        </motion.div>

                        {/* Experience Grid */}
                        <div className="grid gap-6">
                            {data.entries.map((entry, index) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:border-teal-400 transition-colors group"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-[#0A1128] dark:text-white group-hover:text-teal-500">
                                                    {entry.role}
                                                </h3>
                                                <p className="text-sm font-semibold text-teal-600">
                                                    {entry.company}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pl-16 sm:pl-0">
                                            <span className="text-xs bg-slate-100 dark:bg-slate-900 text-slate-500 px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
                                                {entry.period}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pl-16">
                                        {entry.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {entry.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-[10px] px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 font-bold"
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

                        {/* CTA Button similar to reference */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="pt-6"
                        >
                            <a
                                href="#contact"
                                className="inline-block bg-[#FCA311] hover:bg-[#E59800] text-white px-8 py-3.5 rounded-md font-bold text-sm tracking-wide transition-colors shadow-lg shadow-[#FCA311]/20"
                            >
                                MORE DETAILS
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
