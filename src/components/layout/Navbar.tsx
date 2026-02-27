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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={() => handleNavClick('#home')}
                        className="flex items-center space-x-1 group"
                    >
                        <span className="bg-teal-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                            {navbar.logo}
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                            {navbar.logoAccent}
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navbar.links.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors text-sm font-medium"
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
                            className="hidden md:flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-teal-500/25"
                        >
                            <span>{navbar.ctaText}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navbar.links.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="block w-full text-left py-2 px-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <a
                                href={navbar.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-teal-500 text-white py-2 px-3 rounded-full font-medium mt-2"
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
