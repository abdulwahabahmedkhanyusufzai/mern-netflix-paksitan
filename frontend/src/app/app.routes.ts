import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'CognitiveStream | Login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    title: 'CognitiveStream | Enterprise Dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'watch/:id',
    title: 'CognitiveStream | Player',
    loadComponent: () => import('./features/video/player/player.component')
      .then(m => m.PlayerComponent)
  },
  {
    path: 'upload',
    title: 'CognitiveStream | Ingestion',
    loadComponent: () => import('./features/video/upload/upload.component')
      .then(m => m.UploadComponent)
  },
  {
    path: '**', // 404 Wildcard
    redirectTo: 'dashboard'
  }
];