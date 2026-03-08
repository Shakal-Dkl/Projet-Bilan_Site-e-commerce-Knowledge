import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Backoffice Admin</h2>

    <div class="row g-3">
      <div class="col-md-6">
        <div class="knowledge-card p-3">
          <h5>Utilisateurs</h5>
          <ul class="mb-0">
            <li *ngFor="let user of users">{{ user.email }} - {{ user.role }}</li>
          </ul>
        </div>
      </div>

      <div class="col-md-6">
        <div class="knowledge-card p-3">
          <h5>Achats</h5>
          <ul class="mb-0">
            <li *ngFor="let purchase of purchases">Transaction {{ purchase.transactionRef }} - {{ purchase.amount }} €</li>
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
