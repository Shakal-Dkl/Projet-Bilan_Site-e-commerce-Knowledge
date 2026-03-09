import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';

type ThemeCertificationCard = {
  theme: string;
  title: string;
  lorem: string;
  obtained: boolean;
};

@Component({
  selector: 'app-certifications-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="knowledge-page-title">Mes certifications</h2>

    <p class="knowledge-muted mb-3">Voici les certifications disponibles pour chaque thème.</p>

    <div class="row g-3">
      <div class="col-md-6" *ngFor="let card of themeCards">
        <div class="knowledge-card p-4 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <p class="knowledge-section-label mb-0">{{ card.theme }}</p>
            <span class="knowledge-pill" [class.border-success]="card.obtained" [class.text-success]="card.obtained">
              {{ card.obtained ? 'Obtenue' : 'À débloquer' }}
            </span>
          </div>

          <h5 class="mb-2">{{ card.title }}</h5>
          <p class="knowledge-muted mb-0">{{ card.lorem }}</p>
        </div>
      </div>
    </div>
  `
})
export class CertificationsPageComponent implements OnInit {
  certifications: any[] = [];

  themeCards: ThemeCertificationCard[] = [
    {
      theme: 'Musique',
      title: 'Certification Knowledge Learning - Musique',
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius, sapien non lacinia commodo, lacus justo posuere velit, ut dapibus purus arcu vitae justo.',
      obtained: false
    },
    {
      theme: 'Informatique',
      title: 'Certification Knowledge Learning - Informatique',
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, velit a volutpat feugiat, lacus ante luctus sem, quis consectetur nibh nunc non odio.',
      obtained: false
    },
    {
      theme: 'Jardinage',
      title: 'Certification Knowledge Learning - Jardinage',
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum nulla at faucibus commodo. Maecenas iaculis finibus nibh, nec hendrerit augue.',
      obtained: false
    },
    {
      theme: 'Cuisine',
      title: 'Certification Knowledge Learning - Cuisine',
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada mi vitae nisi iaculis, id facilisis nisi commodo. Sed euismod purus sed nisl suscipit.',
      obtained: false
    }
  ];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.get<any[]>('/certifications').subscribe({
      next: (result) => {
        this.certifications = result;

        const obtainedThemes = new Set(result.map((cert) => cert.Theme?.name));
        this.themeCards = this.themeCards.map((card) => ({
          ...card,
          obtained: obtainedThemes.has(card.theme)
        }));
      },
      error: () => {
        this.certifications = [];
      }
    });
  }
}
