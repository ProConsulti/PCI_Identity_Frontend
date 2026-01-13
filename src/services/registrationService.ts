import type {
  CompanyCreateRequest,
  CompanyCreateResponse,
  UserCreateRequest,
  UserCreateResponse,
  UserExistRequest,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  ApiError,
} from '../types/api.types';
import { apiClient } from './apiClient';
import { tokenService } from './tokenService';
import API_CONFIG from '../config/api.config';

class RegistrationService {
  /**
   * Send OTP to email
   */
  async sendOtp(email: string, fromForgotPassword: boolean = false): Promise<SendOtpResponse> {
    try {
      // Ensure token is available before making API call
      await tokenService.ensureToken();

      const data: SendOtpRequest = { email, fromForgotPassword };
      const response = await apiClient.post<SendOtpResponse>(
        API_CONFIG.ENDPOINTS.SEND_OTP,
        data
      );

      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Verify OTP
   */
  async verifyOtp(email: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      // Ensure token is available before making API call
      await tokenService.ensureToken();

      const data: VerifyOtpRequest = { email, otp };
      const response = await apiClient.post<{ success: boolean; message: string }>(
        API_CONFIG.ENDPOINTS.VERIFY_OTP,
        data
      );

      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

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
      if (response.data.userId) {
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
