/**
 * Skills Section Component - Displays skill categories in a grid layout.
 * Following Single Responsibility Principle, this component only handles
 * the skills grid display with animated cards.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Wrench, BookOpen, Globe } from 'lucide-react';
import { useContent } from '@/lib/contentProvider';

/**
 * This function maps skill category names to appropriate icons.
 * Returns the matching Lucide icon component based on category title keywords.
 */
function getCategoryIcon(title: string) {
    const lower = title.toLowerCase();
    if (lower.includes('core') || lower.includes('frontend')) return <Code2 className="w-5 h-5" />;
    if (lower.includes('framework') || lower.includes('library')) return <Layers className="w-5 h-5" />;
    if (lower.includes('engineering') || lower.includes('tool')) return <Wrench className="w-5 h-5" />;
    if (lower.includes('working') || lower.includes('knowledge')) return <BookOpen className="w-5 h-5" />;
    if (lower.includes('language')) return <Globe className="w-5 h-5" />;
    return <Code2 className="w-5 h-5" />;
}

/**
 * This component renders the skills section with categorized skill cards.
 * Features: animated grid layout, category headers with icons,
 * hover effects, and responsive design.
 */
export default function SkillsSection() {
    const { content } = useContent();
    const { skills } = content;

    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold px-4 py-2 rounded-full mb-4">
                        <Code2 className="w-4 h-4" />
                        <span>Tech Stack</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        {skills.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {skills.description}
                    </p>
                </motion.div>

                {/* Skills Categories */}
                <div className="space-y-12">
                    {skills.categories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                                    {getCategoryIcon(category.title)}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {category.title}
                                </h3>
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                            </div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                                        className="bg-white dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 dark:hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 group text-center cursor-default"
                                    >
                                        <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors mb-1">
                                            {skill.name}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {skill.subtitle}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
