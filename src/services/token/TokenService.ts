import { jwtDecode } from 'jwt-decode';
import { appAxios } from '../index.ts';
import { BASE_URL } from '../../utils/types/constants.ts';

class TokenService {
  private static instance: TokenService;

  private constructor() {}

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  saveToken(token: string): void {
    if (token) localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  decodeToken(): Record<string, string> | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token) as Record<string, string>;
    } catch (error) {
      console.error('Decode token error:', error);
      return null;
    }
  }

  isValidToken(): boolean {
    const decodedToken = this.decodeToken();
    if (!decodedToken) return false;
    const currentTime = Date.now() / 1000;
    // @ts-ignore
    return decodedToken.exp > currentTime;
  }

  async refreshToken(): Promise<void> {
    try {
      const response = await appAxios.post(`${BASE_URL}/auth/refresh`, {
        token: this.getToken(),
      });
      const { token: newToken } = response.data;
      this.saveToken(newToken);
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
}

export const tokenService = TokenService.getInstance();
