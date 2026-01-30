import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Pharmacy, InventoryItem, getStockStatusColor } from '../../models/pharmacy.model';
import { Coordinates } from '../../utils/distance.util';

// Fix Leaflet marker icon issue
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() center: Coordinates = { latitude: 31.5204, longitude: 74.3587 }; // Default Lahore
  @Input() zoom: number = 13;
  @Input() pharmacies: { pharmacy: Pharmacy; inventoryItem?: InventoryItem }[] = [];
  @Input() radius: number = 0; // km, 0 means no circle

  private map: L.Map | undefined;
  private markers: L.Marker[] = [];
  private radiusCircle: L.Circle | undefined;

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map) {
      if (changes['center'] && !changes['center'].firstChange) {
        this.updateCenter();
      }
      if (changes['pharmacies']) {
        this.updateMarkers();
      }
      if (changes['radius']) {
        this.updateRadius();
      }
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    if (this.map) return; // Already initialized

    this.map = L.map('map', {
      center: [this.center.latitude, this.center.longitude],
      zoom: this.zoom,
      zoomControl: false, // We'll add it in a custom position if needed
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(this.map);

    this.updateMarkers();
    this.updateRadius();

    // Invalidate size after a small delay to handle container resize
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  private updateCenter(): void {
    if (!this.map) return;
    this.map.setView([this.center.latitude, this.center.longitude], this.zoom);
  }

  private updateMarkers(): void {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    // Add new markers
    this.pharmacies.forEach((item) => {
      const { latitude, longitude } = item.pharmacy.location.coordinates;

      // Determine marker color based on stock status if available
      let markerHtml = `
        <div style="
          background-color: ${item.inventoryItem ? getStockStatusColor(item.inventoryItem.stockStatus) : '#3b82f6'};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(this.map!);

      // Create popup content
      const popupContent = `
        <div class="map-popup">
          <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: 600;">${item.pharmacy.name}</h3>
          <p style="margin: 0 0 5px; color: #666; font-size: 13px;">${item.pharmacy.location.address}</p>
          ${
            item.inventoryItem
              ? `
            <div style="
              display: inline-block;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              background-color: ${getStockStatusColor(item.inventoryItem.stockStatus)}20;
              color: ${getStockStatusColor(item.inventoryItem.stockStatus)};
            ">
              Rs. ${item.inventoryItem.price} - ${item.inventoryItem.stockStatus}
            </div>
          `
              : ''
          }
        </div>
      `;

      marker.bindPopup(popupContent);
      this.markers.push(marker);
    });
  }

  private updateRadius(): void {
    if (!this.map) return;

    if (this.radiusCircle) {
      this.radiusCircle.remove();
    }

    if (this.radius > 0) {
      this.radiusCircle = L.circle([this.center.latitude, this.center.longitude], {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        radius: this.radius * 1000, // Convert km to meters
      }).addTo(this.map);

      // Fit bounds to include radius circle if radius is significant
      if (this.radius > 1) {
        this.map.fitBounds(this.radiusCircle.getBounds());
      }
    }
  }
}
