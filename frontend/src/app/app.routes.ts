import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchHistoryPageComponent } from './pages/search-history-page/search-history-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { canActivateAuth, canActivatePublic } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [canActivatePublic] },
    { path: 'signup', component: SignUpPageComponent, canActivate: [canActivatePublic] },
    { path: 'watch/:id', component: WatchPageComponent, canActivate: [canActivateAuth] },
    { path: 'search', component: SearchPageComponent, canActivate: [canActivateAuth] },
    { path: 'history', component: SearchHistoryPageComponent, canActivate: [canActivateAuth] },
    { path: '**', component: NotFoundPageComponent }
];
