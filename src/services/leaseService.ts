import API_CONFIG from '../config/api.config';
import type { ApiError, LeaseSubmitRequest } from '../types/api.types';
import { tokenService } from './tokenService';
import { apiClient } from './apiClient';

class LeaseService {
  /**
   * Create a demo lease for the user
   */
  async createDemoLease(data: LeaseSubmitRequest): Promise<any> {
    try {
      // Ensure token is available before making API call
      await tokenService.ensureToken();

      // Use the API client directly with the IFRS16 service as custom base URL
      const response = await apiClient.post<any>(
        API_CONFIG.LEASE_ENDPOINTS.CREATE_DEMO_LEASE,
        data,
        false, // Don't skip auth
        API_CONFIG.IFRS16_SERVICE // Use IFRS16 service as base URL
      );

      return response;
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
      console.error('Lease Service Error:', error.message);
    } else if ((error as ApiError).status !== undefined) {
      console.error('Lease Service Error:', (error as ApiError).message, (error as ApiError).details);
    } else {
      console.error('Unknown lease service error:', error);
    }
  }
}

// Export singleton instance
export const leaseService = new LeaseService();

export default LeaseService;