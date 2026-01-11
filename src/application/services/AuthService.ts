/**
 * Authentication Service - Separates auth logic from Context
 * Single Responsibility: Handle authentication operations
 */
import { httpClient } from '../../infrastructure/api/HttpClient';

export interface User {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: User;
  token: {
    access_token: string;
    token_type: string;
  };
}

export class AuthService {
  /**
   * Register new user
   */
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/register', {
      name,
      email,
      password
    });
    return response;
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    // Backend expects OAuth2PasswordRequestForm format
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await httpClient.post<AuthResponse>('/auth/login', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response;
  }

  /**
   * Verify token is valid (optional - could call backend)
   */
  isTokenValid(token: string): boolean {
    if (!token) return false;
    
    try {
      // Basic check - in production, should verify signature and expiration
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Decode payload
      const payload = JSON.parse(atob(parts[1]));
      
      // Check expiration
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  }
}
