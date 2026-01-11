/// <reference types="vite/client" />

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

class HttpClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const headers = { ...this.getHeaders(), ...options.headers };
    
    // Se body é string e Content-Type é form-urlencoded, não fazer JSON.stringify
    const isFormData = headers['Content-Type'] === 'application/x-www-form-urlencoded';
    const body = options.body 
      ? (isFormData && typeof options.body === 'string' ? options.body : JSON.stringify(options.body))
      : undefined;

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: options.method || 'GET',
      headers,
      body,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  get<T>(url: string) {
    return this.request<T>(url, { method: 'GET' });
  }

  post<T>(url: string, body: unknown, options?: { headers?: Record<string, string> }) {
    return this.request<T>(url, { method: 'POST', body, ...options });
  }

  put<T>(url: string, body: unknown) {
    return this.request<T>(url, { method: 'PUT', body });
  }

  delete<T>(url: string) {
    return this.request<T>(url, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient();
