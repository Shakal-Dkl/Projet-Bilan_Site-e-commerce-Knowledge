import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-lesson-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="lesson" class="knowledge-card p-3">
      <h3>{{ lesson.title }}</h3>
      <p>{{ lesson.content }}</p>
      <p><strong>Vidéo :</strong> {{ lesson.videoUrl }}</p>
      <button class="btn knowledge-btn-primary text-white" (click)="validateLesson()">Valider cette leçon</button>
    </div>
    <p class="mt-2" *ngIf="message">{{ message }}</p>
  `
})
export class LessonPageComponent implements OnInit {
  lesson: any;
  message = '';

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.get(`/lessons/${id}`).subscribe({
      next: (result) => (this.lesson = result),
      error: () => (this.message = 'Accès refusé : achetez cette leçon ou son cursus.')
    });
  }

  async validateLesson() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      await this.api.post(`/lessons/${id}/validate`, {}, true);
      this.message = 'Leçon validée avec succès.';
    } catch {
      this.message = 'Validation impossible.';
    }
  }
}
