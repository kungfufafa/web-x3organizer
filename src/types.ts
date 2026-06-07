/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 1. Layanan (trip_categories)
export interface Layanan {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  summary: string;
  description: string;
  iconName: string;
}

// 2. Destinasi (destinations)
export interface Destinasi {
  id: number;
  name: string;
  slug: string;
  region: string;
  summary: string;
  description: string;
  status: 'active' | 'inactive';
  sort_order: number;
  imageUrl: string;
}

// 4. Harga Paket (package_price_tiers)
export interface HargaPaket {
  name: string;
  label: string;
  price: number; // IDR value for comparison
  price_suffix: string; // e.g. "/pax", "/mobil"
  min_pax: number;
  max_pax: number;
  is_primary: boolean;
  sort_order: number;
}

// 5. Fasilitas Paket (package_features)
export type FeatureType = 'highlight' | 'included' | 'excluded' | 'facility' | 'note';

export interface FasilitasPaket {
  type: FeatureType;
  label: string;
  description: string;
  icon: string; // Lucide icon identifier
  sort_order: number;
}

// 6. Itinerary Paket (trip_itineraries)
export interface ItineraryPaket {
  day_number: number;
  time: string;
  title: string;
  description: string;
  sort_order: number;
}

// 3. Paket Trip (trip_packages)
export interface PaketTrip {
  id: number;
  name: string;
  slug: string;
  type: string; // Open Trip, Private Trip, etc.
  summary: string;
  description: string;
  duration_label: string; // e.g., "1 Hari", "3 Hari 2 Malam"
  starting_price: number; // For filtering
  price_label: string; // e.g., "Rp 350.000"
  rating: number;
  review_label: string; // e.g., "120+ Ulasan"
  booking_message: string; // Default WhatsApp message template
  is_featured: boolean;
  status: 'published' | 'draft';
  published_at: string;
  imageUrl: string;
  
  // Relations
  layanan_ids: number[];
  destinasi_ids: number[];
  prices: HargaPaket[];
  features: FasilitasPaket[];
  itineraries: ItineraryPaket[];
}

// 7. Blog / Artikel SEO (content_posts)
export interface BlogArtikel {
  id: number;
  title: string;
  slug: string;
  primary_keyword: string;
  secondary_keywords: string[];
  search_intent: 'Informational' | 'Transactional' | 'Commercial' | 'Navigational';
  category: 'Panduan' | 'Rekomendasi' | 'Perbandingan' | 'Tips' | 'Cara Booking';
  excerpt: string;
  body: string; // Rich text simulation
  is_featured: boolean;
  imageUrl: string;
  status: 'published' | 'draft';
  sort_order: number;
  published_at: string;
  
  // Relations
  related_package_ids: number[];
  related_destinasi_ids: number[];
}
