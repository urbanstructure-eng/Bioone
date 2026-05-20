/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  year: string;
  dimensions: string;
  paperWeight: string;
  description: string;
  metrics: string[];
}

export interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  specialty: string[];
}

export interface MaterialParams {
  grain: number;       // 0 to 100
  warmth: number;      // 0 to 100
  fibres: number;      // 0 to 100
  shadowDepth: number; // 0 to 100
  crease: number;      // 0 to 100
}

export interface JournalEntry {
  id: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
}

export interface AICustomDesign {
  id: string;
  brandName: string;
  packagingType: string;
  ecoMaterial: string;
  promptText: string;
  recommendedSubstrate: string;
  suggestedTagline: string;
  designAnalysis: string;
  colorPalette: string[];
  aestheticStyleName: string;
  prototypeSpecs: string;
  estimatedPrice: number;
}

export interface UnifiedCartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
  isCustomAI?: boolean;
  customDetails?: AICustomDesign;
  quantity: number;
}

