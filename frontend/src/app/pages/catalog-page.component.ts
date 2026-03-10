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
    <p class="knowledge-muted">Le catalogue est visible sans connexion.</p>
    <p class="knowledge-feedback knowledge-feedback-error" *ngIf="!isConnected">
      Connecte-toi pour acheter un cursus ou une leçon.
    </p>
    <p class="knowledge-feedback knowledge-feedback-success" *ngIf="message">{{ message }}</p>

    <div *ngFor="let theme of themes" class="knowledge-card p-3 p-md-4 mb-3">
      <p class="knowledge-section-label">Thème</p>
      <h4 class="mb-3 d-flex align-items-center gap-2">
        {{ theme.name }}
        <span class="knowledge-pill">{{ theme.Curriculums.length }} cursus</span>
      </h4>

      <div *ngFor="let c of getOrderedCurriculums(theme.name, theme.Curriculums)" class="border rounded p-3 mb-2">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <strong>{{ c.title }}</strong> - {{ c.price }} €
          </div>
          <button class="btn btn-sm knowledge-btn-primary" [disabled]="!isConnected" (click)="buyCurriculum(c.id)">Acheter le cursus</button>
        </div>

        <ul class="mt-3 mb-0 list-group">
          <li *ngFor="let l of getOrderedLessons(theme.name, c.title, c.Lessons); let index = index" class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span><strong>Leçon n°{{ index + 1 }}</strong> : {{ l.title }} {{ l.price }} €</span>
            <span>
              <button class="btn btn-sm btn-outline-primary ms-2" [disabled]="!isConnected" (click)="buyLesson(l.id)">Acheter la leçon</button>
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
  isConnected = false;

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.isConnected = Boolean(localStorage.getItem('token'));
    this.loadCatalog();
  }

  loadCatalog() {
    // EN: Load complete catalog and apply official display order.
    // FR: Charge le catalogue complet et applique l'ordre officiel d'affichage.
    this.api.get<any[]>('/catalog').subscribe({
      next: (result) => {
        this.themes = this.getOrderedThemes(result);
      },
      error: () => (this.message = 'Impossible de charger le catalogue.')
    });
  }

  async buyCurriculum(curriculumId: string) {
    // EN: Sandbox purchase call for a full curriculum.
    // FR: Appel d'achat sandbox pour un cursus complet.
    try {
      await this.api.post(`/purchase/curriculums/${curriculumId}`, {}, true);
      this.message = 'Achat du cursus simulé (sandbox) avec succès.';
    } catch {
      this.message = 'Achat cursus impossible (vérifiez activation/connexion).';
    }
  }

  async buyLesson(lessonId: string) {
    // EN: Sandbox purchase call for one lesson.
    // FR: Appel d'achat sandbox pour une seule leçon.
    try {
      await this.api.post(`/purchase/lessons/${lessonId}`, {}, true);
      this.message = 'Achat de la leçon simulé (sandbox) avec succès.';
    } catch {
      this.message = 'Achat leçon impossible (vérifiez activation/connexion).';
    }
  }

  getOrderedThemes(themes: any[]) {
    // EN: Official order from assignment PDF.
    // FR: Ordre officiel issu du PDF de consignes.
    const themePriority: Record<string, number> = {
      Musique: 1,
      Informatique: 2,
      Jardinage: 3,
      Cuisine: 4
    };

    return [...themes].sort((a, b) => (themePriority[a.name] ?? 99) - (themePriority[b.name] ?? 99));
  }

  getOrderedCurriculums(themeName: string, curriculums: any[]) {
    // EN: Curriculum order per theme as specified in assignment.
    // FR: Ordre des cursus par thème tel que demandé dans le sujet.
    const curriculumPriority: Record<string, Record<string, number>> = {
      Musique: {
        'Cursus d’initiation à la guitare': 1,
        'Cursus d’initiation au piano': 2
      },
      Informatique: {
        'Cursus d’initiation au développement web': 1
      },
      Jardinage: {
        'Cursus d’initiation au jardinage': 1
      },
      Cuisine: {
        'Cursus d’initiation à la cuisine': 1,
        'Cursus d’initiation à l’art du dressage culinaire': 2
      }
    };

    const priorities = curriculumPriority[themeName] ?? {};
    return [...curriculums].sort((a, b) => {
      const pa = priorities[a.title] ?? 99;
      const pb = priorities[b.title] ?? 99;
      if (pa === pb) {
        return a.title.localeCompare(b.title);
      }
      return pa - pb;
    });
  }

  getOrderedLessons(themeName: string, curriculumTitle: string, lessons: any[]) {
    // EN: Lesson order per curriculum (Leçon n°1, Leçon n°2, ...).
    // FR: Ordre des leçons par cursus (Leçon n°1, Leçon n°2, ...).
    const lessonPriority: Record<string, Record<string, number>> = {
      'Cursus d’initiation à la guitare': {
        'Découverte de l’instrument': 1,
        'Les accords et les gammes': 2
      },
      'Cursus d’initiation au piano': {
        'Découverte de l’instrument': 1,
        'Les accords et les gammes': 2
      },
      'Cursus d’initiation au développement web': {
        'Les langages Html et CSS': 1,
        'Dynamiser votre site avec Javascript': 2
      },
      'Cursus d’initiation au jardinage': {
        'Les outils du jardinier': 1,
        'Jardiner avec la lune': 2
      },
      'Cursus d’initiation à la cuisine': {
        'Les modes de cuisson': 1,
        'Les saveurs': 2
      },
      'Cursus d’initiation à l’art du dressage culinaire': {
        'Mettre en œuvre le style dans l’assiette': 1,
        'Harmoniser un repas à quatre plats': 2
      }
    };

    const priority = lessonPriority[curriculumTitle] ?? {};

    return [...lessons].sort((a, b) => {
      const pa = priority[a.title] ?? 99;
      const pb = priority[b.title] ?? 99;
      if (pa === pb) {
        return a.title.localeCompare(b.title);
      }
      return pa - pb;
    });
  }
}
