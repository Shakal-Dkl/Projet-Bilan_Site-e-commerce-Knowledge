import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-lesson-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="knowledge-page-title">Espace leçon</h2>

    <div *ngIf="lesson" class="knowledge-card p-4">
      <p class="knowledge-section-label">Contenu acheté</p>
      <h3>
        <ng-container *ngIf="lessonNumber">Leçon n°{{ lessonNumber }} :</ng-container>
        {{ lesson.title }}
      </h3>
      <p class="knowledge-muted">{{ lesson.content }}</p>
      <p><strong>Vidéo :</strong> {{ lesson.videoUrl }}</p>
      <button class="btn knowledge-btn-primary" (click)="validateLesson()">Valider cette leçon</button>
    </div>
    <p class="knowledge-feedback knowledge-feedback-success" *ngIf="message">{{ message }}</p>
  `
})
export class LessonPageComponent implements OnInit {
  lesson: any;
  lessonNumber: number | null = null;
  message = '';

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.message = 'Leçon introuvable.';
      return;
    }

    this.api.get(`/lessons/${id}`).subscribe({
      next: (result: any) => {
        this.lesson = result;

        const lessons = result?.Curriculum?.Lessons ?? [];
        const orderedLessons = [...lessons].sort((a, b) => {
          const orderA = a.displayOrder ?? 999;
          const orderB = b.displayOrder ?? 999;
          if (orderA === orderB) {
            return String(a.id).localeCompare(String(b.id));
          }
          return orderA - orderB;
        });
        const index = orderedLessons.findIndex((item) => item.id === result.id);
        this.lessonNumber = index >= 0 ? index + 1 : null;
      },
      error: () => (this.message = 'Accès refusé : achetez cette leçon ou son cursus.')
    });
  }

  async validateLesson() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) {
        this.message = 'Leçon introuvable.';
        return;
      }
      await this.api.post(`/lessons/${id}/validate`, {}, true);
      this.message = 'Leçon validée avec succès.';
    } catch {
      this.message = 'Validation impossible.';
    }
  }
}
