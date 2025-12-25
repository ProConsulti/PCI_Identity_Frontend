import API_CONFIG from '../config/api.config';
import type { ApiError } from '../types/api.types';
import { tokenService } from './tokenService';

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = API_CONFIG.PCI_IDENTITY_SERVICE, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Get authorization headers with token
   */
  private getAuthHeaders(): Record<string, string> {
    const token = tokenService.getToken();
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
      };
    }
    return {};
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit & { method: string },
    skipAuth: boolean = false,
    customBaseUrl?: string
  ): Promise<T> {
    const url = `${customBaseUrl || this.baseUrl}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      // Add authorization header if not skipped
      if (!skipAuth) {
        Object.assign(headers, this.getAuthHeaders());
      }

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers,
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
        throw {
          status: 0,
          message: 'Network error. Please check your connection.',
          details: error,
        } as ApiError;
      }
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, skipAuth: boolean = false, customBaseUrl?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, skipAuth, customBaseUrl);
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, skipAuth: boolean = false, customBaseUrl?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, skipAuth, customBaseUrl);
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, skipAuth: boolean = false, customBaseUrl?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, skipAuth, customBaseUrl);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, skipAuth: boolean = false, customBaseUrl?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, skipAuth, customBaseUrl);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

export default ApiClient;
