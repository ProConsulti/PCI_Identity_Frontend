import API_CONFIG from '../config/api.config';
import type { ApiError } from '../types/api.types';
import { apiClient } from './apiClient';
import { tokenService } from './tokenService';

export interface Currency {
    currencyID: number;
    currencyCode: string;
    currencyName: string;
}

class CurrencyService {

    /**
     * Fetch all available currencies
     * Ensures token is generated before making the API call
     */
    async getAllCurrencies(): Promise<Currency[]> {
        try {
            // Ensure token is available before making API call
            await tokenService.ensureToken();
            // Make API call with token automatically included using the IFRS16 service
            const currencies = await apiClient.get<Currency[]>(
                API_CONFIG.ENDPOINTS.GET_ALL_CURRENCIES,
                false, // Don't skip auth
                API_CONFIG.IFRS16_SERVICE // Use IFRS16 service as base URL
            );

            return currencies;
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
            console.error('Currency Service Error:', error.message);
        } else if ((error as ApiError).status !== undefined) {
            console.error('Currency Service Error:', (error as ApiError).message, (error as ApiError).details);
        } else {
            console.error('Unknown currency service error:', error);
        }
    }
}

// Export singleton instance
export const currencyService = new CurrencyService();

export default CurrencyService;
