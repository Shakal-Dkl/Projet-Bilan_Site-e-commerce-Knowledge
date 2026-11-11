import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page.component';
import { CatalogPageComponent } from './pages/catalog-page.component';
import { LessonPageComponent } from './pages/lesson-page.component';
import { CertificationsPageComponent } from './pages/certifications-page.component';
import { AdminPageComponent } from './pages/admin-page.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'catalog', pathMatch: 'full' },
	{ path: 'auth', component: AuthPageComponent, title: 'Connexion | Knowledge Learning' },
	{ path: 'catalog', component: CatalogPageComponent, title: 'Catalogue | Knowledge Learning' },
	{ path: 'lessons/:id', component: LessonPageComponent, title: 'Leçon | Knowledge Learning' },
	{ path: 'certifications', component: CertificationsPageComponent, title: 'Certifications | Knowledge Learning' },
	{ path: 'admin', component: AdminPageComponent, canActivate: [adminGuard], title: 'Backoffice | Knowledge Learning' }
];
