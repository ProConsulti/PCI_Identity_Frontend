import type {
  CompanyCreateRequest,
  CompanyCreateResponse,
  UserCreateRequest,
  UserCreateResponse,
  UserExistRequest,
  ApiError,
} from '../types/api.types';
import { apiClient } from './apiClient';
import { tokenService } from './tokenService';
import API_CONFIG from '../config/api.config';

class RegistrationService {
  /**
   * Create a new company
   */
  async createCompany(data: CompanyCreateRequest): Promise<CompanyCreateResponse> {
    try {
      // Ensure token is available before making API call
      await tokenService.ensureToken();

      const response = await apiClient.post<CompanyCreateResponse>(
        API_CONFIG.ENDPOINTS.REGISTER_COMPANY,
        data
      );

      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Create a new user
   */
  async createUser(data: UserCreateRequest): Promise<UserCreateResponse> {
    try {
      // Ensure token is available before making API call
      await tokenService.ensureToken();

      const response = await apiClient.post<UserCreateResponse>(
        API_CONFIG.ENDPOINTS.REGISTER_USER,
        data
      );
      if (response.userID) {
        return response;
      }

      throw {
        status: 400,
        message: 'Failed to create user',
      } as ApiError;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  /**
   * Check if a user with the given email already exists
   */
  async checkUserExists(email: string): Promise<boolean> {
    try {
      // Ensure token is available before making API call
      await tokenService.ensureToken();

      const data: UserExistRequest = { email };
      const response = await apiClient.post<boolean>(
        API_CONFIG.ENDPOINTS.USER_EXIST,
        data
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
      console.error('API Error:', error.message);
    } else if ((error as ApiError).status !== undefined) {
      console.error('API Error:', (error as ApiError).message, (error as ApiError).details);
    } else {
      console.error('Unknown error:', error);
    }
  }
}

// Export singleton instance
export const registrationService = new RegistrationService();

export default RegistrationService;
