/**
 * Theme Provider - Handles dark/light theme switching with next-themes.
 * Following Single Responsibility Principle, this component only handles theming.
 */

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

/**
 * This component wraps the application with theme support.
 * Provides system-aware dark/light mode toggling.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
        </NextThemesProvider>
    );
}
