import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2 class="knowledge-page-title">Connexion et inscription</h2>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="knowledge-card p-4 h-100">
          <p class="knowledge-section-label">Nouveau compte</p>
          <h3 class="mb-3">Inscription</h3>
          <input class="form-control mb-2" placeholder="Email" [(ngModel)]="registerForm.email" />
          <input class="form-control mb-2" placeholder="Prénom" [(ngModel)]="registerForm.firstName" />
          <input class="form-control mb-2" placeholder="Nom" [(ngModel)]="registerForm.lastName" />
          <input class="form-control mb-2" type="password" placeholder="Mot de passe" [(ngModel)]="registerForm.password" />
          <button class="btn knowledge-btn-primary mt-2" (click)="register()">Créer un compte</button>
        </div>
      </div>

      <div class="col-md-6">
        <div class="knowledge-card p-4 h-100">
          <p class="knowledge-section-label">Compte existant</p>
          <h3 class="mb-3">Connexion</h3>
          <input class="form-control mb-2" placeholder="Email" [(ngModel)]="loginForm.email" />
          <input class="form-control mb-2" type="password" placeholder="Mot de passe" [(ngModel)]="loginForm.password" />
          <button class="btn knowledge-btn-primary me-2 mt-2" (click)="login()">Se connecter</button>
          <button class="btn btn-outline-secondary" (click)="logout()">Se déconnecter</button>
        </div>
      </div>
    </div>

    <p class="knowledge-feedback knowledge-feedback-success" *ngIf="message">{{ message }}</p>
  `
})
export class AuthPageComponent {
  // EN: Message area shared by register/login/logout actions.
  // FR: Zone de message partagée par inscription/connexion/déconnexion.
  message = '';

  registerForm = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  loginForm = {
    email: '',
    password: ''
  };

  constructor(private readonly authService: AuthService) {}

  async register() {
    // EN: Creates account; activation link is shown in backend console (prototype mode).
    // FR: Crée le compte ; le lien d'activation est affiché dans la console backend (mode prototype).
    try {
      await this.authService.register(this.registerForm);
      this.message = 'Compte créé. Activez votre compte via le lien reçu (console backend).';
    } catch {
      this.message = 'Erreur pendant l’inscription.';
    }
  }

  async login() {
    // EN: Stores JWT and role in localStorage through AuthService.
    // FR: Stocke le JWT et le rôle dans le localStorage via AuthService.
    try {
      await this.authService.login(this.loginForm);
      this.message = 'Connexion réussie.';
    } catch {
      this.message = 'Erreur de connexion.';
    }
  }

  logout() {
    // EN: Clears local session from localStorage.
    // FR: Supprime la session locale du localStorage.
    this.authService.logout();
    this.message = 'Déconnecté.';
  }
}
