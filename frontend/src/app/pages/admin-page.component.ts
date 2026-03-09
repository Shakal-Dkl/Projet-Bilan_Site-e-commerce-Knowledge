import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="knowledge-page-title">Backoffice Admin</h2>

    <div class="row g-3">
      <div class="col-md-6">
        <div class="knowledge-card p-4 h-100">
          <p class="knowledge-section-label">Gestion</p>
          <h5>Utilisateurs</h5>
          <ul class="list-group mb-0">
            <li class="list-group-item d-flex justify-content-between align-items-center" *ngFor="let user of users">
              <span>{{ user.email }}</span>
              <span class="knowledge-pill">{{ user.role }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-6">
        <div class="knowledge-card p-4 h-100">
          <p class="knowledge-section-label">Suivi</p>
          <h5>Achats</h5>
          <ul class="list-group mb-0">
            <li class="list-group-item" *ngFor="let purchase of purchases">
              Transaction {{ purchase.transactionRef }} - {{ purchase.amount }} €
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class AdminPageComponent implements OnInit {
  users: any[] = [];
  purchases: any[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.get<any[]>('/admin/users').subscribe({ next: (result) => (this.users = result), error: () => (this.users = []) });
    this.api.get<any[]>('/admin/purchases').subscribe({
      next: (result) => (this.purchases = result),
      error: () => (this.purchases = [])
    });
  }
}
