import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  PharmacySearchResult,
  Medicine,
  getStockStatusColor,
  getStockStatusLabel,
} from '../../models/pharmacy.model';
import { searchPharmaciesWithMedicine, filterPharmaciesByRadius } from '../../utils/filter.util';
import { searchMedicines } from '../../data/mock-data';
import {
  getUserLocation,
  DEFAULT_LOCATION,
  Coordinates,
  formatDistance,
} from '../../utils/distance.util';

import { MapComponent } from '../../components/map/map';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, RouterModule, FormsModule, MapComponent],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  selectedMedicine: Medicine | null = null;
  results: PharmacySearchResult[] = [];
  filteredResults: PharmacySearchResult[] = [];

  // Filters
  radius: number = 5; // km
  userLocation: Coordinates = DEFAULT_LOCATION;
  isLoading: boolean = true;
  viewMode: 'list' | 'map' = 'list';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit() {
    // Try to get real user location
    const location = await getUserLocation();
    if (location) {
      this.userLocation = location;
    }

    this.route.queryParams.subscribe((params) => {
      if (params['medicine']) {
        this.searchQuery = params['medicine'];
        this.performSearch();
      }
    });
  }

  performSearch() {
    this.isLoading = true;

    // First find the medicine
    const medicines = searchMedicines(this.searchQuery);

    if (medicines.length > 0) {
      this.selectedMedicine = medicines[0]; // Pick the best match

      // Find pharmacies that have this medicine
      this.results = searchPharmaciesWithMedicine(this.selectedMedicine!.id, this.userLocation);

      this.applyFilters();
    } else {
      this.selectedMedicine = null;
      this.results = [];
      this.filteredResults = [];
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 800); // Simulate network delay for effect
  }

  applyFilters() {
    this.filteredResults = this.results.filter((r) => r.distance <= this.radius);
  }

  onRadiusChange() {
    this.applyFilters();
  }

  formatDist(dist: number): string {
    return formatDistance(dist);
  }

  getStatusColor(status: any): string {
    return getStockStatusColor(status);
  }

  getStatusLabel(status: any): string {
    return getStockStatusLabel(status);
  }
}
