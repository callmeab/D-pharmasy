import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SearchResultsComponent } from './pages/search-results/search-results';
import { PharmacyDetailsComponent } from './pages/pharmacy-details/pharmacy-details';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'pharmacy/:id', component: PharmacyDetailsComponent },
];
