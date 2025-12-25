import type { TokenRequest, TokenResponse, ApiError } from '../types/api.types';
import { apiClient } from './apiClient';
import API_CONFIG from '../config/api.config';

const TOKEN_STORAGE_KEY = 'pci_access_token';

class TokenService {
    /**
     * Generate and store access token
     */
    async generateToken(credentials?: TokenRequest): Promise<string> {
        try {
            // Use provided credentials or default ones
            const tokenRequest: TokenRequest = credentials || {
                grant_type: 'client_credentials',
                client_id: import.meta.env.VITE_CLIENT_ID || 'default_client_id',
                client_secret: import.meta.env.VITE_CLIENT_SECRET || 'default_client_secret',
                scope: import.meta.env.VITE_SCOPE || 'api',
            };

            // Skip auth for token generation endpoint
            const response = await apiClient.post<TokenResponse>(
                API_CONFIG.ENDPOINTS.GENERATE_TOKEN,
                tokenRequest,
                true // skipAuth = true
            );

            if (response.access_token) {
                this.setToken(response.access_token);
                return response.access_token;
            }

            throw {
                status: 400,
                message: 'No access token received from server',
            } as ApiError;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get token from sessionStorage
     */
    getToken(): string | null {
        try {
            return sessionStorage.getItem(TOKEN_STORAGE_KEY);
        } catch (error) {
            console.error('Failed to get token from sessionStorage:', error);
            return null;
        }
    }

    /**
     * Store token in sessionStorage
     */
    setToken(token: string): void {
        try {
            sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
        } catch (error) {
            console.error('Failed to store token in sessionStorage:', error);
        }
    }

    /**
     * Remove token from sessionStorage
     */
    clearToken(): void {
        try {
            sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear token from sessionStorage:', error);
        }
    }

    /**
     * Check if token exists
     */
    hasToken(): boolean {
        return !!this.getToken();
    }

    /**
     * Ensure token is available, generate if not present
     */
    async ensureToken(): Promise<string> {
        const existingToken = this.getToken();

        if (existingToken) {
            return existingToken;
        }

        // Generate new token if not present
        return await this.generateToken();
    }

    /**
     * Handle and log API errors
     */
    private handleError(error: any): void {
        if (error instanceof Error) {
            console.error('Token Service Error:', error.message);
        } else if ((error as ApiError).status !== undefined) {
            console.error('Token Service Error:', (error as ApiError).message, (error as ApiError).details);
        } else {
            console.error('Unknown token service error:', error);
        }
    }
}

// Export singleton instance
export const tokenService = new TokenService();

export default TokenService;
