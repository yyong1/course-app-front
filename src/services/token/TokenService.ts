import { jwtDecode } from 'jwt-decode';

class TokenService {
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
}

export default new TokenService();
