import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page.component';
import { CatalogPageComponent } from './pages/catalog-page.component';
import { LessonPageComponent } from './pages/lesson-page.component';
import { CertificationsPageComponent } from './pages/certifications-page.component';
import { AdminPageComponent } from './pages/admin-page.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'catalog', pathMatch: 'full' },
	{ path: 'auth', component: AuthPageComponent },
	{ path: 'catalog', component: CatalogPageComponent },
	{ path: 'lessons/:id', component: LessonPageComponent },
	{ path: 'certifications', component: CertificationsPageComponent },
	{ path: 'admin', component: AdminPageComponent }
];
