/**
 * Footer Component - Minimalist footer with copyright and back-to-top.
 * Following Single Responsibility Principle, this component only handles
 * footer display and back-to-top navigation.
 */

'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useContent } from '@/lib/contentProvider';

/**
 * This component renders the page footer with copyright info.
 * Features: back-to-top button with smooth scroll.
 */
export default function Footer() {
    const { content } = useContent();
    const { footer } = content;

    /**
     * This function scrolls the page back to the top smoothly
     */
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        {footer.copyright}
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-400 dark:text-slate-500">
                            {footer.builtWith}
                        </span>
                        <button
                            onClick={scrollToTop}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-500 hover:text-white text-slate-500 dark:text-slate-400 transition-all group"
                            aria-label="Back to top"
                        >
                            <ArrowUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
