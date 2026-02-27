/**
 * Content Service - Handles all data fetching and mutations for page content.
 * Following Single Responsibility Principle (SRP), this service only handles
 * content-related API calls and data transformations.
 * 
 * Dependency Inversion Principle (DIP): This service depends on abstractions
 * (IContentService interface) rather than concrete implementations.
 */

import type { PageContent, ApiResponse, GASConfig } from '@/types/content';
import { DEFAULT_CONTENT, GAS_CONFIG_KEY } from '@/lib/constants';

// This interface defines the contract for content service implementations
export interface IContentService {
    fetchContent(): Promise<PageContent>;
    updateContent(content: Partial<PageContent>): Promise<ApiResponse<PageContent>>;
}

/**
 * GoogleSheetsContentService - Concrete implementation that fetches content
 * from Google Apps Script web app endpoint connected to Google Sheets.
 */
export class GoogleSheetsContentService implements IContentService {
    private scriptUrl: string;

    // This constructor initializes the service with the GAS web app URL
    constructor(scriptUrl: string) {
        this.scriptUrl = scriptUrl;
    }

    /**
     * This function fetches all page content from the Google Sheets backend.
     * It makes a GET request to the GAS web app and parses the response.
     * Falls back to default content if the request fails.
     */
    async fetchContent(): Promise<PageContent> {
        try {
            if (!this.scriptUrl) {
                return DEFAULT_CONTENT;
            }

            const response = await fetch(this.scriptUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                console.warn('Failed to fetch from GAS, using default content');
                return DEFAULT_CONTENT;
            }

            const data = await response.json();
            return data as PageContent;
        } catch (error) {
            console.error('Content fetch error:', error);
            return DEFAULT_CONTENT;
        }
    }

    /**
     * This function updates page content by sending data to the Google Sheets backend.
     * It makes a POST request to the GAS web app with the updated content.
     */
    async updateContent(content: Partial<PageContent>): Promise<ApiResponse<PageContent>> {
        try {
            if (!this.scriptUrl) {
                return { success: false, error: 'Google Apps Script URL is not configured' };
            }

            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update', data: content }),
            });

            if (!response.ok) {
                return { success: false, error: 'Failed to update content' };
            }

            const data = await response.json();
            return { success: true, data: data as PageContent };
        } catch (error) {
            console.error('Content update error:', error);
            return { success: false, error: 'Network error while updating content' };
        }
    }
}

/**
 * LocalContentService - Fallback implementation that uses local default content.
 * Useful for development or when GAS is not yet configured.
 */
export class LocalContentService implements IContentService {
    /**
     * This function returns the default local content.
     * Used when Google Sheets backend is not configured.
     */
    async fetchContent(): Promise<PageContent> {
        return DEFAULT_CONTENT;
    }

    /**
     * This function simulates content update in local mode.
     * Returns updated content merged with defaults.
     */
    async updateContent(content: Partial<PageContent>): Promise<ApiResponse<PageContent>> {
        const merged = { ...DEFAULT_CONTENT, ...content };
        return { success: true, data: merged };
    }
}

/**
 * This factory function creates the appropriate content service based on configuration.
 * Following the Factory Pattern and Open/Closed Principle - new service types
 * can be added without modifying existing code.
 */
export function createContentService(): IContentService {
    if (typeof window !== 'undefined') {
        try {
            const configStr = localStorage.getItem(GAS_CONFIG_KEY);
            if (configStr) {
                const config: GASConfig = JSON.parse(configStr);
                if (config.scriptUrl) {
                    return new GoogleSheetsContentService(config.scriptUrl);
                }
            }
        } catch {
            console.warn('Failed to parse GAS config, using local content');
        }
    }
    return new LocalContentService();
}
