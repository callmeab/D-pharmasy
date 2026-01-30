import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { POPULAR_MEDICINES, searchMedicines } from '../../data/mock-data';
import { Medicine } from '../../models/pharmacy.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  searchQuery: string = '';
  suggestions: Medicine[] = [];
  popularMedicines = POPULAR_MEDICINES;
  showSuggestions: boolean = false;

  constructor(private router: Router) {}

  onSearchInput(): void {
    if (this.searchQuery.trim().length > 0) {
      this.suggestions = searchMedicines(this.searchQuery).slice(0, 5);
      this.showSuggestions = true;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  selectSuggestion(medicine: Medicine): void {
    this.searchQuery = medicine.name;
    this.showSuggestions = false;
    this.search();
  }

  search(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { medicine: this.searchQuery },
      });
    }
  }

  searchMedicine(medicineName: string): void {
    this.router.navigate(['/search'], {
      queryParams: { medicine: medicineName },
    });
  }
}
