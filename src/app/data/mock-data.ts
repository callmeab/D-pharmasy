// ============================================
// Pakistan Trace Pharma Mock Data
// Realistic Pakistani Pharmacy Data
// ============================================

import {
  Pharmacy,
  Medicine,
  InventoryItem,
  getStockStatus,
  MedicineCategory,
  DosageForm,
} from '../models/pharmacy.model';

// ============================================
// Mock Medicines
// ============================================

export const MOCK_MEDICINES: Medicine[] = [
  // Analgesics
  {
    id: 'm1',
    name: 'Panadol',
    genericName: 'Paracetamol',
    manufacturer: 'GlaxoSmithKline',
    category: 'Analgesics',
    dosageForm: 'Tablet',
    strength: '500mg',
  },
  {
    id: 'm2',
    name: 'Brufen',
    genericName: 'Ibuprofen',
    manufacturer: 'Abbott',
    category: 'Analgesics',
    dosageForm: 'Tablet',
    strength: '400mg',
  },
  {
    id: 'm3',
    name: 'Disprin',
    genericName: 'Aspirin',
    manufacturer: 'Reckitt Benckiser',
    category: 'Analgesics',
    dosageForm: 'Tablet',
    strength: '300mg',
  },
  {
    id: 'm4',
    name: 'Ponstan',
    genericName: 'Mefenamic Acid',
    manufacturer: 'Pfizer',
    category: 'Analgesics',
    dosageForm: 'Tablet',
    strength: '250mg',
  },

  // Antibiotics
  {
    id: 'm5',
    name: 'Augmentin',
    genericName: 'Amoxicillin + Clavulanic Acid',
    manufacturer: 'GlaxoSmithKline',
    category: 'Antibiotics',
    dosageForm: 'Tablet',
    strength: '625mg',
  },
  {
    id: 'm6',
    name: 'Flagyl',
    genericName: 'Metronidazole',
    manufacturer: 'Sanofi',
    category: 'Antibiotics',
    dosageForm: 'Tablet',
    strength: '400mg',
  },
  {
    id: 'm7',
    name: 'Zithromax',
    genericName: 'Azithromycin',
    manufacturer: 'Pfizer',
    category: 'Antibiotics',
    dosageForm: 'Tablet',
    strength: '500mg',
  },
  {
    id: 'm8',
    name: 'Ciproxin',
    genericName: 'Ciprofloxacin',
    manufacturer: 'Bayer',
    category: 'Antibiotics',
    dosageForm: 'Tablet',
    strength: '500mg',
  },

  // Antihistamines
  {
    id: 'm9',
    name: 'Avil',
    genericName: 'Pheniramine',
    manufacturer: 'Sanofi',
    category: 'Antihistamines',
    dosageForm: 'Tablet',
    strength: '25mg',
  },
  {
    id: 'm10',
    name: 'Zyrtec',
    genericName: 'Cetirizine',
    manufacturer: 'UCB',
    category: 'Antihistamines',
    dosageForm: 'Tablet',
    strength: '10mg',
  },

  // Antacids
  {
    id: 'm11',
    name: 'Gaviscon',
    genericName: 'Sodium Alginate',
    manufacturer: 'Reckitt Benckiser',
    category: 'Antacids',
    dosageForm: 'Suspension',
    strength: '10ml',
  },
  {
    id: 'm12',
    name: 'Nexium',
    genericName: 'Esomeprazole',
    manufacturer: 'AstraZeneca',
    category: 'Antacids',
    dosageForm: 'Tablet',
    strength: '40mg',
  },

  // Vitamins
  {
    id: 'm13',
    name: 'Neurobion',
    genericName: 'Vitamin B Complex',
    manufacturer: 'Merck',
    category: 'Vitamins',
    dosageForm: 'Tablet',
    strength: '100mg',
  },
  {
    id: 'm14',
    name: 'Centrum',
    genericName: 'Multivitamin',
    manufacturer: 'Pfizer',
    category: 'Vitamins',
    dosageForm: 'Tablet',
    strength: '1 tab',
  },
  {
    id: 'm15',
    name: 'Folic Acid',
    genericName: 'Folic Acid',
    manufacturer: 'Various',
    category: 'Vitamins',
    dosageForm: 'Tablet',
    strength: '5mg',
  },

  // Cardiovascular
  {
    id: 'm16',
    name: 'Concor',
    genericName: 'Bisoprolol',
    manufacturer: 'Merck',
    category: 'Cardiovascular',
    dosageForm: 'Tablet',
    strength: '5mg',
  },
  {
    id: 'm17',
    name: 'Lipitor',
    genericName: 'Atorvastatin',
    manufacturer: 'Pfizer',
    category: 'Cardiovascular',
    dosageForm: 'Tablet',
    strength: '20mg',
  },

  // Diabetes
  {
    id: 'm18',
    name: 'Glucophage',
    genericName: 'Metformin',
    manufacturer: 'Merck',
    category: 'Diabetes',
    dosageForm: 'Tablet',
    strength: '500mg',
  },
  {
    id: 'm19',
    name: 'Diamicron',
    genericName: 'Gliclazide',
    manufacturer: 'Servier',
    category: 'Diabetes',
    dosageForm: 'Tablet',
    strength: '80mg',
  },

  // Respiratory
  {
    id: 'm20',
    name: 'Ventolin',
    genericName: 'Salbutamol',
    manufacturer: 'GlaxoSmithKline',
    category: 'Respiratory',
    dosageForm: 'Inhaler',
    strength: '100mcg',
  },
  {
    id: 'm21',
    name: 'Mucolator',
    genericName: 'Ambroxol',
    manufacturer: 'Boehringer Ingelheim',
    category: 'Respiratory',
    dosageForm: 'Syrup',
    strength: '30mg/5ml',
  },
];

// ============================================
// Mock Pharmacies
// ============================================

export const MOCK_PHARMACIES: Pharmacy[] = [
  // Lahore Pharmacies
  {
    id: 'p1',
    name: 'Sehat Medical Store',
    ownerName: 'Dr. Ahmed Ali',
    phone: '+92-300-1234567',
    email: 'sehat@pharmacy.pk',
    location: {
      address: 'Main Boulevard, Gulberg III',
      city: 'Lahore',
      area: 'Gulberg',
      coordinates: { latitude: 31.5204, longitude: 74.3587 },
    },
    operatingHours: {
      open: '08:00',
      close: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: false,
    },
    rating: 4.5,
    verified: true,
    registrationNumber: 'LHR-2019-001',
  },
  {
    id: 'p2',
    name: 'City Pharmacy',
    ownerName: 'Muhammad Hassan',
    phone: '+92-300-2345678',
    email: 'city@pharmacy.pk',
    location: {
      address: 'MM Alam Road',
      city: 'Lahore',
      area: 'Gulberg',
      coordinates: { latitude: 31.515, longitude: 74.3534 },
    },
    operatingHours: {
      open: '00:00',
      close: '23:59',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: true,
    },
    rating: 4.8,
    verified: true,
    registrationNumber: 'LHR-2018-045',
  },
  {
    id: 'p3',
    name: 'Al-Shifa Pharmacy',
    ownerName: 'Dr. Fatima Khan',
    phone: '+92-300-3456789',
    email: 'alshifa@pharmacy.pk',
    location: {
      address: 'Jail Road, near PU',
      city: 'Lahore',
      area: 'Allama Iqbal Town',
      coordinates: { latitude: 31.5, longitude: 74.32 },
    },
    operatingHours: {
      open: '09:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      is24Hours: false,
    },
    rating: 4.3,
    verified: true,
    registrationNumber: 'LHR-2020-089',
  },
  {
    id: 'p4',
    name: 'Medicare Pharmacy',
    ownerName: 'Bilal Ahmed',
    phone: '+92-300-4567890',
    email: 'medicare@pharmacy.pk',
    location: {
      address: 'Ferozepur Road, near Kalma Chowk',
      city: 'Lahore',
      area: 'Kalma Chowk',
      coordinates: { latitude: 31.47, longitude: 74.27 },
    },
    operatingHours: {
      open: '08:00',
      close: '23:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: false,
    },
    rating: 4.6,
    verified: true,
    registrationNumber: 'LHR-2019-123',
  },
  {
    id: 'p5',
    name: 'Life Care Pharmacy',
    ownerName: 'Dr. Sana Malik',
    phone: '+92-300-5678901',
    email: 'lifecare@pharmacy.pk',
    location: {
      address: 'DHA Phase 5, Y Block',
      city: 'Lahore',
      area: 'DHA',
      coordinates: { latitude: 31.47, longitude: 74.4 },
    },
    operatingHours: {
      open: '10:00',
      close: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: false,
    },
    rating: 4.7,
    verified: true,
    registrationNumber: 'LHR-2021-045',
  },

  // Karachi Pharmacies
  {
    id: 'p6',
    name: 'Karachi Medical Store',
    ownerName: 'Asif Mahmood',
    phone: '+92-321-1234567',
    email: 'karachi@pharmacy.pk',
    location: {
      address: 'Shahrah-e-Faisal, near Airport',
      city: 'Karachi',
      area: 'Clifton',
      coordinates: { latitude: 24.8607, longitude: 67.0011 },
    },
    operatingHours: {
      open: '08:00',
      close: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: false,
    },
    rating: 4.4,
    verified: true,
    registrationNumber: 'KHI-2019-067',
  },
  {
    id: 'p7',
    name: 'Agha Khan Pharmacy',
    ownerName: 'Dr. Zainab Ali',
    phone: '+92-321-2345678',
    email: 'aku@pharmacy.pk',
    location: {
      address: 'Stadium Road, near AKUH',
      city: 'Karachi',
      area: 'Saddar',
      coordinates: { latitude: 24.89, longitude: 67.07 },
    },
    operatingHours: {
      open: '00:00',
      close: '23:59',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: true,
    },
    rating: 4.9,
    verified: true,
    registrationNumber: 'KHI-2017-001',
  },

  // Islamabad Pharmacies
  {
    id: 'p8',
    name: 'Capital Pharmacy',
    ownerName: 'Imran Shah',
    phone: '+92-333-1234567',
    email: 'capital@pharmacy.pk',
    location: {
      address: 'Blue Area, F-6',
      city: 'Islamabad',
      area: 'Blue Area',
      coordinates: { latitude: 33.7077, longitude: 73.0563 },
    },
    operatingHours: {
      open: '09:00',
      close: '21:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      is24Hours: false,
    },
    rating: 4.5,
    verified: true,
    registrationNumber: 'ISB-2020-034',
  },
  {
    id: 'p9',
    name: 'PIMS Pharmacy',
    ownerName: 'Dr. Ayesha Iqbal',
    phone: '+92-333-2345678',
    email: 'pims@pharmacy.pk',
    location: {
      address: 'G-8/3, near PIMS Hospital',
      city: 'Islamabad',
      area: 'G-8',
      coordinates: { latitude: 33.6844, longitude: 73.0479 },
    },
    operatingHours: {
      open: '00:00',
      close: '23:59',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: true,
    },
    rating: 4.7,
    verified: true,
    registrationNumber: 'ISB-2018-012',
  },
  {
    id: 'p10',
    name: 'F-7 Medical Store',
    ownerName: 'Kamran Hussain',
    phone: '+92-333-3456789',
    email: 'f7medical@pharmacy.pk',
    location: {
      address: 'Jinnah Super Market, F-7',
      city: 'Islamabad',
      area: 'F-7',
      coordinates: { latitude: 33.7215, longitude: 73.0433 },
    },
    operatingHours: {
      open: '08:00',
      close: '22:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      is24Hours: false,
    },
    rating: 4.6,
    verified: true,
    registrationNumber: 'ISB-2019-078',
  },
];

// ============================================
// Mock Inventory Items
// ============================================

export const MOCK_INVENTORY: InventoryItem[] = [];

// Generate inventory for each pharmacy
MOCK_PHARMACIES.forEach((pharmacy, pharmacyIndex) => {
  // Each pharmacy has 10-15 random medicines
  const medicineCount = 10 + Math.floor(Math.random() * 6);
  const selectedMedicines = [...MOCK_MEDICINES]
    .sort(() => Math.random() - 0.5)
    .slice(0, medicineCount);

  selectedMedicines.forEach((medicine, medIndex) => {
    const quantity = Math.floor(Math.random() * 100);
    const basePrice = 50 + Math.floor(Math.random() * 500);
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6 + Math.floor(Math.random() * 18));

    MOCK_INVENTORY.push({
      id: `inv-${pharmacy.id}-${medicine.id}`,
      pharmacyId: pharmacy.id,
      medicineId: medicine.id,
      medicine: medicine,
      quantity: quantity,
      price: basePrice,
      expiryDate: expiryDate,
      batchNumber: `BATCH-${Math.floor(Math.random() * 10000)}`,
      lastUpdated: new Date(),
      stockStatus: getStockStatus(quantity),
    });
  });
});

// ============================================
// Helper Functions
// ============================================

export function getMedicineById(id: string): Medicine | undefined {
  return MOCK_MEDICINES.find((m) => m.id === id);
}

export function getPharmacyById(id: string): Pharmacy | undefined {
  return MOCK_PHARMACIES.find((p) => p.id === id);
}

export function getInventoryByPharmacy(pharmacyId: string): InventoryItem[] {
  return MOCK_INVENTORY.filter((i) => i.pharmacyId === pharmacyId);
}

export function searchMedicines(query: string): Medicine[] {
  const lowerQuery = query.toLowerCase();
  return MOCK_MEDICINES.filter(
    (m) =>
      m.name.toLowerCase().includes(lowerQuery) || m.genericName.toLowerCase().includes(lowerQuery),
  );
}

export function findPharmaciesWithMedicine(medicineId: string): InventoryItem[] {
  return MOCK_INVENTORY.filter(
    (i) => i.medicineId === medicineId && i.stockStatus !== 'out-of-stock',
  );
}

// ============================================
// Popular Medicines (for home page)
// ============================================

export const POPULAR_MEDICINES = [
  MOCK_MEDICINES[0], // Panadol
  MOCK_MEDICINES[1], // Brufen
  MOCK_MEDICINES[4], // Augmentin
  MOCK_MEDICINES[9], // Zyrtec
  MOCK_MEDICINES[11], // Nexium
  MOCK_MEDICINES[17], // Glucophage
];
