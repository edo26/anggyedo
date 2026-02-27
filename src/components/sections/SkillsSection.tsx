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
function getCategoryIcon(title: string, className = "w-5 h-5") {
    const lower = title.toLowerCase();
    if (lower.includes('core') || lower.includes('frontend')) return <Code2 className={className} />;
    if (lower.includes('framework') || lower.includes('library')) return <Layers className={className} />;
    if (lower.includes('engineering') || lower.includes('tool')) return <Wrench className={className} />;
    if (lower.includes('working') || lower.includes('knowledge')) return <BookOpen className={className} />;
    if (lower.includes('language')) return <Globe className={className} />;
    return <Code2 className={className} />;
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
        <section id="skills" className="py-24 relative bg-[#FAFBFF] dark:bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header matches reference "FEATURES" */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="text-[#FFD166] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                        Tech Stack
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128] dark:text-white mb-6">
                        {skills.title || "Key Technologies"}
                    </h2>
                </motion.div>

                {/* Skills Categories mapped as Key Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {skills.categories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center group"
                        >
                            {/* Card Icon */}
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-[#FAFBFF] dark:bg-slate-800 flex items-center justify-center text-teal-500 group-hover:scale-110 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 transition-all duration-300">
                                {getCategoryIcon(category.title, "w-8 h-8")}
                            </div>

                            {/* Card Title */}
                            <h3 className="text-xl font-bold text-[#0A1128] dark:text-white mb-4">
                                {category.title}
                            </h3>

                            {/* Skills represented as description text */}
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                Dramatically supply transparent deliverables. Expertise in {category.skills.map(s => s.name).slice(0, 4).join(', ')}{category.skills.length > 4 ? ', and more.' : '.'}
                            </p>

                            {/* Fake Read More Link matching reference */}
                            <div className="mt-auto text-xs font-bold text-[#0A1128] dark:text-teal-400 group-hover:text-teal-500 flex items-center gap-1 cursor-pointer transition-colors">
                                Read More
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Soft background shape */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-50/50 to-transparent dark:from-slate-900/50 -z-10 skew-x-12" />
        </section>
    );
}
