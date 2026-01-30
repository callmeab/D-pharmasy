// ============================================
// Pharmacy Model
// ============================================

export interface Pharmacy {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  location: PharmacyLocation;
  operatingHours: OperatingHours;
  rating: number;
  verified: boolean;
  registrationNumber: string;
}

export interface PharmacyLocation {
  address: string;
  city: string;
  area: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface OperatingHours {
  open: string;
  close: string;
  days: string[];
  is24Hours: boolean;
}

// ============================================
// Medicine Model
// ============================================

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: MedicineCategory;
  dosageForm: DosageForm;
  strength: string;
  description?: string;
  imageUrl?: string;
}

export type MedicineCategory =
  | 'Analgesics'
  | 'Antibiotics'
  | 'Antihistamines'
  | 'Antacids'
  | 'Vitamins'
  | 'Cardiovascular'
  | 'Diabetes'
  | 'Respiratory'
  | 'Dermatology'
  | 'Other';

export type DosageForm =
  | 'Tablet'
  | 'Capsule'
  | 'Syrup'
  | 'Injection'
  | 'Cream'
  | 'Drops'
  | 'Inhaler'
  | 'Suspension';

// ============================================
// Inventory Model
// ============================================

export interface InventoryItem {
  id: string;
  pharmacyId: string;
  medicineId: string;
  medicine: Medicine; // Denormalized for easier access
  quantity: number;
  price: number; // in PKR
  expiryDate: Date;
  batchNumber: string;
  lastUpdated: Date;
  stockStatus: StockStatus;
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

// ============================================
// Search Result Model
// ============================================

export interface PharmacySearchResult {
  pharmacy: Pharmacy;
  inventoryItem: InventoryItem;
  distance: number; // in kilometers
}

// ============================================
// Helper Functions
// ============================================

export function getStockStatus(quantity: number): StockStatus {
  if (quantity === 0) return 'out-of-stock';
  if (quantity < 10) return 'low-stock';
  return 'in-stock';
}

export function getStockStatusColor(status: StockStatus): string {
  switch (status) {
    case 'in-stock':
      return '#10b981'; // green
    case 'low-stock':
      return '#f59e0b'; // amber
    case 'out-of-stock':
      return '#ef4444'; // red
  }
}

export function getStockStatusLabel(status: StockStatus): string {
  switch (status) {
    case 'in-stock':
      return 'In Stock';
    case 'low-stock':
      return 'Low Stock';
    case 'out-of-stock':
      return 'Out of Stock';
  }
}
