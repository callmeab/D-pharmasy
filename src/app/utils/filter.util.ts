// ============================================
// Filter Utility Functions
// ============================================

import { Pharmacy, InventoryItem, PharmacySearchResult } from '../models/pharmacy.model';
import { calculateDistance, Coordinates } from './distance.util';
import { MOCK_INVENTORY, MOCK_PHARMACIES } from '../data/mock-data';

/**
 * Search for pharmacies that have a specific medicine in stock
 * @param medicineId Medicine ID to search for
 * @param userLocation User's current location (optional)
 * @param maxDistance Maximum distance in kilometers (optional)
 * @returns Array of pharmacy search results sorted by distance
 */
export function searchPharmaciesWithMedicine(
  medicineId: string,
  userLocation?: Coordinates,
  maxDistance?: number,
): PharmacySearchResult[] {
  // Find all inventory items for this medicine
  const inventoryItems = MOCK_INVENTORY.filter(
    (item) => item.medicineId === medicineId && item.stockStatus !== 'out-of-stock',
  );

  // Map to pharmacy search results
  let results: PharmacySearchResult[] = inventoryItems.map((item) => {
    const pharmacy = MOCK_PHARMACIES.find((p) => p.id === item.pharmacyId)!;
    const distance = userLocation
      ? calculateDistance(userLocation, pharmacy.location.coordinates)
      : 0;

    return {
      pharmacy,
      inventoryItem: item,
      distance,
    };
  });

  // Filter by distance if specified
  if (maxDistance !== undefined && userLocation) {
    results = results.filter((r) => r.distance <= maxDistance);
  }

  // Sort by distance (if user location provided) or by rating
  if (userLocation) {
    results.sort((a, b) => a.distance - b.distance);
  } else {
    results.sort((a, b) => b.pharmacy.rating - a.pharmacy.rating);
  }

  return results;
}

/**
 * Filter pharmacies by location radius
 * @param pharmacies Array of pharmacies
 * @param userLocation User's location
 * @param radiusKm Radius in kilometers
 * @returns Filtered pharmacies within radius
 */
export function filterPharmaciesByRadius(
  pharmacies: Pharmacy[],
  userLocation: Coordinates,
  radiusKm: number,
): Pharmacy[] {
  return pharmacies.filter((pharmacy) => {
    const distance = calculateDistance(userLocation, pharmacy.location.coordinates);
    return distance <= radiusKm;
  });
}

/**
 * Filter inventory by stock status
 * @param inventory Array of inventory items
 * @param includeOutOfStock Whether to include out of stock items
 * @returns Filtered inventory
 */
export function filterInventoryByStock(
  inventory: InventoryItem[],
  includeOutOfStock: boolean = false,
): InventoryItem[] {
  if (includeOutOfStock) {
    return inventory;
  }
  return inventory.filter((item) => item.stockStatus !== 'out-of-stock');
}

/**
 * Sort inventory by various criteria
 * @param inventory Array of inventory items
 * @param sortBy Sort criteria
 * @param order Sort order
 * @returns Sorted inventory
 */
export function sortInventory(
  inventory: InventoryItem[],
  sortBy: 'name' | 'price' | 'quantity' | 'expiry',
  order: 'asc' | 'desc' = 'asc',
): InventoryItem[] {
  const sorted = [...inventory];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.medicine.name.localeCompare(b.medicine.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;
      case 'expiry':
        comparison = a.expiryDate.getTime() - b.expiryDate.getTime();
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Get pharmacy statistics
 * @param pharmacyId Pharmacy ID
 * @returns Statistics object
 */
export function getPharmacyStats(pharmacyId: string) {
  const inventory = MOCK_INVENTORY.filter((item) => item.pharmacyId === pharmacyId);

  return {
    totalProducts: inventory.length,
    inStock: inventory.filter((item) => item.stockStatus === 'in-stock').length,
    lowStock: inventory.filter((item) => item.stockStatus === 'low-stock').length,
    outOfStock: inventory.filter((item) => item.stockStatus === 'out-of-stock').length,
    totalValue: inventory.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}
