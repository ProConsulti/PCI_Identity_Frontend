import API_CONFIG from '../config/api.config';
import type { ApiError } from '../types/api.types';

export interface Currency {
    currencyID: number;
    currencyCode: string;
    currencyName: string;
}

class CurrencyService {
    private baseUrl: string;
    private timeout: number;

    constructor(baseUrl: string = API_CONFIG.IFRS16_SERVICE, timeout: number = API_CONFIG.TIMEOUT) {
        this.baseUrl = baseUrl;
        this.timeout = timeout;
    }

    /**
     * Fetch all available currencies
     */
    async getAllCurrencies(): Promise<Currency[]> {
        try {
            const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.GET_ALL_CURRENCIES}`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw {
                    status: response.status,
                    message: errorData.message || `HTTP Error: ${response.status}`,
                    details: errorData,
                } as ApiError;
            }

            return await response.json();
        } catch (error: any) {
            if (error instanceof TypeError) {
                console.error('Network error fetching currencies:', error.message);
                throw {
                    status: 0,
                    message: 'Network error. Please check your connection.',
                    details: error,
                } as ApiError;
            }
            console.error('Error fetching currencies:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const currencyService = new CurrencyService();

export default CurrencyService;
