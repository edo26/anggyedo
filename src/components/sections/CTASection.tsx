/**
 * CTA Section Component - Call-to-action section for reaching out.
 * Following Single Responsibility Principle, this component only handles
 * the CTA display with animated background and prominent button.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useContent } from '@/lib/contentProvider';

/**
 * This component renders the call-to-action section.
 * Features: gradient background card, animated entry, prominent CTA button.
 */
export default function CTASection() {
    const { content } = useContent();
    const { cta } = content;

    return (
        <section id="contact" className="py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="text-[#EF476F] font-bold text-sm tracking-[0.2em] uppercase">
                            Why Choose Me
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] dark:text-white leading-tight">
                            {cta.title || "Ready to Work Together?"}
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                            {cta.description} <br /> Dramatically supply transparent deliverables before backward comp internal or "organic" sources.
                        </p>

                        <div className="pt-6">
                            <a
                                href={cta.buttonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#EF476F] hover:bg-[#D9385E] text-white px-8 py-3.5 rounded-md font-bold tracking-wider text-sm shadow-xl shadow-[#EF476F]/20 transition-all hover:-translate-y-1"
                            >
                                {cta.buttonText}
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column - Stats / Visual matching reference */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD166] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />

                        <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-3xl p-8 lg:p-12">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <h4 className="text-4xl font-extrabold text-[#0A1128] dark:text-white">12k+</h4>
                                    <p className="text-sm font-semibold text-slate-500">Lines of Code</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-4xl font-extrabold text-[#0A1128] dark:text-white">10+</h4>
                                    <p className="text-sm font-semibold text-slate-500">Years Exp.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-4xl font-extrabold text-[#0A1128] dark:text-white">50+</h4>
                                    <p className="text-sm font-semibold text-slate-500">Projects Done</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-4xl font-extrabold text-[#0A1128] dark:text-white">5★</h4>
                                    <p className="text-sm font-semibold text-slate-500">Client Reviews</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
