import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: ':language', component: HomeComponent },
  { path: '', redirectTo: 'fr', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
