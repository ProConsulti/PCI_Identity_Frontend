import type {
  CompanyCreateRequest,
  CompanyCreateResponse,
  UserCreateRequest,
  UserCreateResponse,
  LeaseCreateRequest,
  LeaseCreateResponse,
  UserExistRequest,
  ApiResponse,
  ApiError,
} from '../types/api.types';
import { apiClient } from './apiClient';
import API_CONFIG from '../config/api.config';

class RegistrationService {
  /**
   * Create a new company
   */
  async createCompany(data: CompanyCreateRequest): Promise<CompanyCreateResponse> {
    try {
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
      const response = await apiClient.post<ApiResponse<UserCreateResponse>>(
        API_CONFIG.ENDPOINTS.REGISTER_USER,
        data
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw {
        status: 400,
        message: response.error || 'Failed to create user',
      } as ApiError;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Create a new lease
   */
  async createLease(data: LeaseCreateRequest): Promise<LeaseCreateResponse> {
    try {
      const response = await apiClient.post<ApiResponse<LeaseCreateResponse>>(
        API_CONFIG.ENDPOINTS.REGISTER_LEASE,
        data
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw {
        status: 400,
        message: response.error || 'Failed to create lease',
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
