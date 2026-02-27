/**
 * Navbar Component - Responsive navigation bar with glassmorphism effect.
 * Following Single Responsibility Principle, this component only handles
 * navigation display and theme toggling.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ExternalLink } from 'lucide-react';
import { useContent } from '@/lib/contentProvider';

/**
 * This component renders the main navigation bar.
 * Features: glassmorphism on scroll, theme toggle, mobile hamburger menu.
 */
export default function Navbar() {
    const { content } = useContent();
    const { theme, setTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // This effect prevents hydration mismatch by waiting for mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // This effect adds scroll listener for glassmorphism activation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * This function toggles between dark and light themes
     */
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    /**
     * This function handles smooth scroll navigation to sections
     */
    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const { navbar } = content;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-5xl rounded-full ${isScrolled
                ? 'bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 border border-white/30 dark:border-slate-800'
                : 'bg-white/30 dark:bg-slate-900/30 backdrop-blur-md shadow-lg shadow-black/5 border border-white/20 dark:border-slate-800'
                }`}
        >
            <div className="px-5 sm:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={() => handleNavClick('#home')}
                        className="flex items-center space-x-2 group"
                    >
                        <span className="bg-slate-800 dark:bg-white text-white dark:text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform shadow-inner">
                            {navbar.logo}
                        </span>
                        <span className="text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase letter-spacing-[0.2em] ml-1">
                            {navbar.logoAccent}
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-full p-1 px-4 border border-white/40 dark:border-slate-700/50">
                        {navbar.links.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 px-4 py-1.5 rounded-full transition-all text-sm font-medium"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-slate-600" />
                                )}
                            </button>
                        )}

                        <a
                            href={navbar.ctaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center space-x-2 bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-xl"
                        >
                            <span>{navbar.ctaText}</span>
                        </a>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 text-slate-600 dark:text-white" />
                            ) : (
                                <Menu className="w-5 h-5 text-slate-600 dark:text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-[110%] left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-slate-800 shadow-2xl p-4 overflow-hidden"
                    >
                        <div className="space-y-1">
                            {navbar.links.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="block w-full text-center py-3 px-4 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <a
                                href={navbar.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 px-4 rounded-xl font-semibold mt-4 shadow-md"
                            >
                                {navbar.ctaText}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
