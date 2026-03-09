import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="knowledge-page-title">Catalogue des formations</h2>
    <p class="knowledge-feedback knowledge-feedback-success" *ngIf="message">{{ message }}</p>

    <div *ngFor="let theme of themes" class="knowledge-card p-3 p-md-4 mb-3">
      <p class="knowledge-section-label">Thème</p>
      <h4 class="mb-3 d-flex align-items-center gap-2">
        {{ theme.name }}
        <span class="knowledge-pill">{{ theme.Curriculums.length }} cursus</span>
      </h4>

      <div *ngFor="let c of theme.Curriculums" class="border rounded p-3 mb-2">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <strong>{{ c.title }}</strong> - {{ c.price }} €
          </div>
          <button class="btn btn-sm knowledge-btn-primary" (click)="buyCurriculum(c.id)">Acheter le cursus</button>
        </div>

        <ul class="mt-3 mb-0 list-group">
          <li *ngFor="let l of c.Lessons; let index = index" class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span><strong>Leçon n°{{ index + 1 }}</strong> : {{ l.title }} {{ l.price }} €</span>
            <span>
              <button class="btn btn-sm btn-outline-primary ms-2" (click)="buyLesson(l.id)">Acheter la leçon</button>
              <a class="btn btn-sm btn-outline-secondary ms-2" [routerLink]="['/lessons', l.id]">Voir</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class CatalogPageComponent implements OnInit {
  themes: any[] = [];
  message = '';

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.loadCatalog();
  }

  loadCatalog() {
    this.api.get<any[]>('/catalog').subscribe({
      next: (result) => (this.themes = result),
      error: () => (this.message = 'Impossible de charger le catalogue.')
    });
  }

  async buyCurriculum(curriculumId: number) {
    try {
      await this.api.post(`/purchase/curriculums/${curriculumId}`, {}, true);
      this.message = 'Achat du cursus simulé (sandbox) avec succès.';
    } catch {
      this.message = 'Achat cursus impossible (vérifiez activation/connexion).';
    }
  }

  async buyLesson(lessonId: number) {
    try {
      await this.api.post(`/purchase/lessons/${lessonId}`, {}, true);
      this.message = 'Achat de la leçon simulé (sandbox) avec succès.';
    } catch {
      this.message = 'Achat leçon impossible (vérifiez activation/connexion).';
    }
  }
}
