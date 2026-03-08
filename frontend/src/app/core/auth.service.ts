import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly api: ApiService) {}

  async register(payload: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    return this.api.post('/auth/register', payload);
  }

  async login(payload: { email: string; password: string }) {
    const result = await this.api.post<{ token: string; user: { role: string } }>('/auth/login', payload);
    localStorage.setItem('token', result.token);
    localStorage.setItem('role', result.user.role);
    return result;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  get role() {
    return localStorage.getItem('role');
  }
}
