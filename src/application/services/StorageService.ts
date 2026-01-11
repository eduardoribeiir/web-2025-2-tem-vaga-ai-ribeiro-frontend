/**
 * Local Storage Service - Handles persistence logic
 * Single Responsibility: Manage local storage operations
 */

const STORAGE_KEY = 'temVagaAi.user';
const TOKEN_KEY = 'temVagaAi.token';

export class StorageService {
  /**
   * Save user to localStorage
   */
  saveUser(user: any): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  }

  /**
   * Get user from localStorage
   */
  getUser(): any | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to get user from storage:', error);
      return null;
    }
  }

  /**
   * Remove user from localStorage
   */
  removeUser(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove user from storage:', error);
    }
  }

  /**
   * Save token to localStorage
   */
  saveToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save token to storage:', error);
    }
  }

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token from storage:', error);
      return null;
    }
  }

  /**
   * Remove token from localStorage
   */
  removeToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token from storage:', error);
    }
  }

  /**
   * Clear all auth data
   */
  clearAll(): void {
    this.removeUser();
    this.removeToken();
  }
}
