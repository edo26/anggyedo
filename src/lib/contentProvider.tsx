/**
 * Content Provider - React context for page content state management.
 * Following the Dependency Inversion Principle (DIP), components depend
 * on this context abstraction rather than directly on services.
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { PageContent } from '@/types/content';
import { createContentService, type IContentService } from '@/services/contentService';
import { DEFAULT_CONTENT } from '@/lib/constants';

// This interface defines the shape of the content context
interface ContentContextType {
    content: PageContent;
    isLoading: boolean;
    error: string | null;
    refreshContent: () => Promise<void>;
    updateContent: (content: Partial<PageContent>) => Promise<boolean>;
}

// This creates the React context with undefined default
const ContentContext = createContext<ContentContextType | undefined>(undefined);

/**
 * This component provides page content to all child components.
 * It manages loading states, error handling, and content updates.
 */
export function ContentProvider({ children }: { children: React.ReactNode }) {
    const [content, setContent] = useState<PageContent>(DEFAULT_CONTENT);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [service, setService] = useState<IContentService | null>(null);

    // This effect initializes the content service on mount
    useEffect(() => {
        const svc = createContentService();
        setService(svc);
    }, []);

    /**
     * This function fetches fresh content from the configured data source.
     * Called on initial load and when admin triggers a refresh.
     */
    const refreshContent = useCallback(async () => {
        if (!service) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await service.fetchContent();
            setContent(data);
        } catch (err) {
            setError('Failed to load content');
            console.error('Content refresh error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [service]);

    // This effect fetches content when the service is ready
    useEffect(() => {
        if (service) {
            refreshContent();
        }
    }, [service, refreshContent]);

    /**
     * This function updates content via the configured data source.
     * Returns true on success, false on failure.
     */
    const updateContent = useCallback(
        async (updates: Partial<PageContent>): Promise<boolean> => {
            if (!service) return false;
            try {
                const result = await service.updateContent(updates);
                if (result.success && result.data) {
                    setContent(result.data);
                    return true;
                }
                setError(result.error || 'Update failed');
                return false;
            } catch (err) {
                console.error('Content update error:', err);
                setError('Failed to update content');
                return false;
            }
        },
        [service]
    );

    return (
        <ContentContext.Provider
            value={{ content, isLoading, error, refreshContent, updateContent }}
        >
            {children}
        </ContentContext.Provider>
    );
}

/**
 * This custom hook provides access to the content context.
 * Ensures the hook is used within a ContentProvider.
 */
export function useContent(): ContentContextType {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
}
