import API_CONFIG from '../config/api.config';
import type { ApiError } from '../types/api.types';
import { apiClient } from './apiClient';
import { tokenService } from './tokenService';

export interface ForgotPasswordRequest {
    email: string;
    password: string;
}

class ForgotPasswordService {

    /**
     * Update password using forgot-password flow
     * Ensures token is generated before making the API call
     */
    async updatePassword(data: ForgotPasswordRequest): Promise<void> {
        try {
            // Ensure token is available before making API call
            await tokenService.ensureToken();

            // Call forgot-password API
            await apiClient.post(
                API_CONFIG.ENDPOINTS.FORGOT_PASSWORD,
                data
            );
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Handle and log API errors
     */
    private handleError(error: any): void {
        if (error instanceof Error) {
            console.error('Forgot Password Service Error:', error.message);
        } else if ((error as ApiError).status !== undefined) {
            console.error(
                'Forgot Password Service Error:',
                (error as ApiError).message,
                (error as ApiError).details
            );
        } else {
            console.error('Unknown forgot-password service error:', error);
        }
    }
}

// Export singleton instance
export const forgotPasswordService = new ForgotPasswordService();
export default ForgotPasswordService;
