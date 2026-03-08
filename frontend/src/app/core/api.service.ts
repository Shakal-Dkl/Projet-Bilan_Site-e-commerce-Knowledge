import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(`${this.baseUrl}${url}`, { withCredentials: true });
  }

  async post<T>(url: string, body: unknown, withAuth = false): Promise<T> {
    const headers = await this.buildHeaders(withAuth);
    return firstValueFrom(
      this.http.post<T>(`${this.baseUrl}${url}`, body, {
        headers,
        withCredentials: true
      })
    );
  }

  private async buildHeaders(withAuth: boolean): Promise<HttpHeaders> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // EN: We fetch CSRF token before POST requests.
    // FR: On récupère le token CSRF avant les requêtes POST.
    const csrfResult = await firstValueFrom(this.http.get<{ csrfToken: string | null }>(`${this.baseUrl}/csrf-token`, { withCredentials: true }));
    if (csrfResult.csrfToken) {
      headers = headers.set('x-csrf-token', csrfResult.csrfToken);
    }

    if (withAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }
}
