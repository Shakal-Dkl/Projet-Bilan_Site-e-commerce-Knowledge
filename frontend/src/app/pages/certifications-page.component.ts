import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-certifications-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Mes certifications</h2>
    <ul class="list-group" *ngIf="certifications.length > 0">
      <li class="list-group-item" *ngFor="let cert of certifications">
        {{ cert.title }} - {{ cert.Theme?.name }}
      </li>
    </ul>
    <p *ngIf="certifications.length === 0">Aucune certification pour le moment.</p>
  `
})
export class CertificationsPageComponent implements OnInit {
  certifications: any[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.get<any[]>('/certifications').subscribe({
      next: (result) => (this.certifications = result),
      error: () => (this.certifications = [])
    });
  }
}
