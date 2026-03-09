import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // EN: Single API base URL for all frontend calls.
  // FR: URL de base unique pour tous les appels frontend.
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(`${this.baseUrl}${url}`, { withCredentials: true });
  }

  async post<T>(url: string, body: unknown, withAuth = false): Promise<T> {
    // EN: POST calls go through shared header builder (CSRF + JWT).
    // FR: Les appels POST passent par un builder d'en-têtes commun (CSRF + JWT).
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

    // EN: Fetch CSRF token before write operations.
    // FR: Récupère le token CSRF avant les opérations d'écriture.
    const csrfResult = await firstValueFrom(this.http.get<{ csrfToken: string | null }>(`${this.baseUrl}/csrf-token`, { withCredentials: true }));
    if (csrfResult.csrfToken) {
      headers = headers.set('x-csrf-token', csrfResult.csrfToken);
    }

    if (withAuth) {
      // EN: Add Bearer token when route requires authentication.
      // FR: Ajoute le token Bearer quand la route demande une authentification.
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }
}
