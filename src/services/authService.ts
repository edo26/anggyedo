/**
 * Authentication Service - Handles admin login and session management.
 * Following Single Responsibility Principle (SRP), this service only
 * handles authentication concerns, separated from content management.
 */

import { AUTH_TOKEN_KEY, SESSION_DURATION, GAS_CONFIG_KEY } from '@/lib/constants';
import type { GASConfig } from '@/types/content';

// This interface defines the authentication state
export interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    expiresAt: number | null;
}

// This interface defines the stored session data
interface SessionData {
    username: string;
    expiresAt: number;
}

/**
 * AuthService - Manages admin authentication with local session storage.
 * In production, credentials are validated against the GAS backend.
 * Follows the Single Responsibility Principle for auth-only concerns.
 */
export class AuthService {
    /**
     * This function attempts to authenticate an admin user.
     * It validates credentials against the GAS backend if configured,
     * otherwise uses default admin credentials.
     */
    async login(username: string, password: string): Promise<boolean> {
        try {
            const gasConfig = this.getGASConfig();

            if (gasConfig?.scriptUrl) {
                // Validate against GAS backend
                const response = await fetch(gasConfig.scriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'login', username, password }),
                });

                const result = await response.json();
                if (!result.success) return false;
            } else {
                // Default admin credentials for initial setup
                if (username !== 'admin' || password !== 'admin123') {
                    return false;
                }
            }

            // Store session in localStorage
            const session: SessionData = {
                username,
                expiresAt: Date.now() + SESSION_DURATION,
            };
            localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(session));
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * This function attempts to change the admin credentials on the gas backend.
     */
    async changeCredentials(newUsername: string, newPassword: string): Promise<boolean> {
        try {
            const gasConfig = this.getGASConfig();

            if (gasConfig?.scriptUrl) {
                const response = await fetch(gasConfig.scriptUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'changeCredentials', newUsername, newPassword }),
                });

                const result = await response.json();
                if (result.success) {
                    // Update current session
                    const sessionStr = localStorage.getItem(AUTH_TOKEN_KEY);
                    if (sessionStr) {
                        const session: SessionData = JSON.parse(sessionStr);
                        session.username = newUsername;
                        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(session));
                    }
                    return true;
                }
                return false;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Change credentials error:', error);
            return false;
        }
    }

    /**
     * This function checks if the current user is authenticated.
     * Validates both the existence and expiration of the session token.
     */
    getAuthState(): AuthState {
        try {
            const tokenStr = localStorage.getItem(AUTH_TOKEN_KEY);
            if (!tokenStr) {
                return { isAuthenticated: false, username: null, expiresAt: null };
            }

            const session: SessionData = JSON.parse(tokenStr);

            if (Date.now() > session.expiresAt) {
                this.logout();
                return { isAuthenticated: false, username: null, expiresAt: null };
            }

            return {
                isAuthenticated: true,
                username: session.username,
                expiresAt: session.expiresAt,
            };
        } catch {
            return { isAuthenticated: false, username: null, expiresAt: null };
        }
    }

    /**
     * This function logs out the current user by removing session data.
     */
    logout(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    /**
     * This function retrieves the stored GAS configuration from localStorage.
     */
    private getGASConfig(): GASConfig | null {
        try {
            const configStr = localStorage.getItem(GAS_CONFIG_KEY);
            return configStr ? JSON.parse(configStr) : null;
        } catch {
            return null;
        }
    }

    /**
     * This function saves the GAS configuration to localStorage.
     */
    saveGASConfig(config: GASConfig): void {
        localStorage.setItem(GAS_CONFIG_KEY, JSON.stringify(config));
    }

    /**
     * This function retrieves the current GAS configuration.
     */
    getGASConfigPublic(): GASConfig | null {
        return this.getGASConfig();
    }
}

// This singleton instance ensures consistent auth state across the application
export const authService = new AuthService();
