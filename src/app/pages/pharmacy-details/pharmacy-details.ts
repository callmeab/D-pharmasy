import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Pharmacy,
  InventoryItem,
  getStockStatusColor,
  getStockStatusLabel,
} from '../../models/pharmacy.model';
import { getPharmacyById, getInventoryByPharmacy } from '../../data/mock-data'; // Need to export getPharmacyStats from mock-data or move it
import {
  sortInventory,
  filterInventoryByStock,
  getPharmacyStats as utilGetPharmacyStats,
} from '../../utils/filter.util';

@Component({
  selector: 'app-pharmacy-details',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pharmacy-details.html',
  styleUrl: './pharmacy-details.scss',
})
export class PharmacyDetailsComponent implements OnInit {
  pharmacy: Pharmacy | undefined;
  inventory: InventoryItem[] = [];
  filteredInventory: InventoryItem[] = [];
  stats: any;

  // Filters
  searchQuery: string = '';
  sortBy: 'name' | 'price' | 'quantity' | 'expiry' = 'name';
  showOutOfStock: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.pharmacy = getPharmacyById(id);
        if (this.pharmacy) {
          this.inventory = getInventoryByPharmacy(id);
          this.stats = utilGetPharmacyStats(id);
          this.applyFilters();
        }
      }
    });
  }

  applyFilters() {
    let result = filterInventoryByStock(this.inventory, this.showOutOfStock);

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.medicine.name.toLowerCase().includes(query) ||
          item.medicine.genericName.toLowerCase().includes(query),
      );
    }

    this.filteredInventory = sortInventory(result, this.sortBy);
  }

  onSearch() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  onStockFilterChange() {
    this.applyFilters();
  }

  getStatusColor(status: any): string {
    return getStockStatusColor(status);
  }

  getStatusLabel(status: any): string {
    return getStockStatusLabel(status);
  }

  getGoogleMapsUrl(): string {
    if (!this.pharmacy) return '';
    const { latitude, longitude } = this.pharmacy.location.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }
}
