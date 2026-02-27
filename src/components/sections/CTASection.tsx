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
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 p-8 sm:p-12 lg:p-16"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />

                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-400 text-xs font-semibold px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Let&apos;s Collaborate</span>
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {cta.title}
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
                            {cta.description}
                        </p>
                        <a
                            href={cta.buttonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-teal-500/25 group"
                        >
                            <span>{cta.buttonText}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
