import apiClient from './apiClient';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserDto,
  RefreshTokenRequest,
} from '../types/api';

/**
 * Authentication Service - .NET Identity Integration
 * 
 * Endpoints match ASP.NET Core Identity patterns:
 * POST /api/auth/login
 * POST /api/auth/register
 * POST /api/auth/refresh-token
 * POST /api/auth/logout
 * GET  /api/auth/user
 */
export const authService = {
  /**
   * Login user
   * Maps to: POST /api/auth/login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    const { token, refreshToken, user } = response.data;
    
    // Store tokens
    localStorage.setItem('auth_token', token);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  /**
   * Register new user
   * Maps to: POST /api/auth/register
   */
  async register(userData: RegisterRequest): Promise<UserDto> {
    const response = await apiClient.post<UserDto>('/auth/register', userData);
    return response.data;
  },

  /**
   * Refresh access token
   * Maps to: POST /api/auth/refresh-token
   */
  async refreshToken(request: RefreshTokenRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/refresh-token', request);
    const { token, refreshToken } = response.data;
    
    localStorage.setItem('auth_token', token);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    
    return response.data;
  },

  /**
   * Logout user
   * Maps to: POST /api/auth/logout
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current user
   * Maps to: GET /api/auth/user
   */
  async getCurrentUser(): Promise<UserDto> {
    const response = await apiClient.get<UserDto>('/auth/user');
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Get stored user
   */
  getUser(): UserDto | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },
};
