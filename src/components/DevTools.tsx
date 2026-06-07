/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Database, Code, BookOpen, Layers, X, Sparkles, FileText, Layout } from 'lucide-react';

export default function DevTools({ onClose }: { onClose?: () => void }) {
 const [activeTab, setActiveTab] = useState<'system' | 'mapping' | 'wireframes' | 'laravel'>('system');
 const [copiedText, setCopiedText] = useState<string | null>(null);

 const handleCopy = (text: string, id: string) => {
 navigator.clipboard.writeText(text);
 setCopiedText(id);
 setTimeout(() => setCopiedText(null), 2000);
 };

 const dbSchemaCode = `
// DATABASE SCHEMA (LARAVEL MIGRATIONS)

Schema::create('trip_categories', function (Blueprint $table) {
 $table->id();
 $table->string('name');
 $table->string('slug')->unique();
 $table->integer('sort_order')->default(0);
 $table->boolean('is_active')->default(true);
 $table->timestamps();
});

Schema::create('destinations', function (Blueprint $table) {
 $table->id();
 $table->string('name');
 $table->string('slug')->unique();
 $table->string('region');
 $table->text('summary');
 $table->text('description');
 $table->string('status')->default('active'); // active, inactive
 $table->integer('sort_order')->default(0);
 $table->string('image_path')->nullable();
 $table->timestamps();
});

Schema::create('trip_packages', function (Blueprint $table) {
 $table->id();
 $table->string('name');
 $table->string('slug')->unique();
 $table->string('type'); // Open Trip, Private Trip, Corporate, Family
 $table->text('summary');
 $table->text('description');
 $table->string('duration_label'); // e.g. "3 Hari 2 Malam"
 $table->decimal('starting_price', 12, 2);
 $table->string('price_label'); // e.g. "Rp 1.250.000"
 $table->decimal('rating', 3, 2)->default(5.0);
 $table->string('review_label')->nullable(); // e.g. "120+ Ulasan"
 $table->text('booking_message')->nullable();
 $table->boolean('is_featured')->default(false);
 $table->string('status')->default('published'); // published, draft
 $table->timestamp('published_at')->nullable();
 $table->string('image_path')->nullable();
 $table->timestamps();
});

// Relational Tables (Pivot Tables)
Schema::create('category_trip_package', function (Blueprint $table) {
 $table->foreignId('trip_category_id')->constrained()->cascadeOnDelete();
 $table->foreignId('trip_package_id')->constrained()->cascadeOnDelete();
});

Schema::create('destination_trip_package', function (Blueprint $table) {
 $table->foreignId('destination_id')->constrained()->cascadeOnDelete();
 $table->foreignId('trip_package_id')->constrained()->cascadeOnDelete();
});

// Price Tiers Table
Schema::create('package_price_tiers', function (Blueprint $table) {
 $table->id();
 $table->foreignId('trip_package_id')->constrained()->cascadeOnDelete();
 $table->string('name'); // e.g. "Privat 4 Pax"
 $table->string('label'); // e.g. "Grup Keluarga (4-6 Orang)"
 $table->decimal('price', 12, 2);
 $table->string('price_suffix')->default('/pax');
 $table->integer('min_pax')->default(1);
 $table->integer('max_pax')->default(100);
 $table->boolean('is_primary')->default(false);
 $table->integer('sort_order')->default(0);
 $table->timestamps();
});

// Features Table
Schema::create('package_features', function (Blueprint $table) {
 $table->id();
 $table->foreignId('trip_package_id')->constrained()->cascadeOnDelete();
 $table->string('type'); // highlight, included, excluded, facility, note
 $table->string('label');
 $table->text('description')->nullable();
 $table->string('icon')->default('check'); // Lucide icon name
 $table->integer('sort_order')->default(0);
 $table->timestamps();
});

// Itineraries Table
Schema::create('trip_itineraries', function (Blueprint $table) {
 $table->id();
 $table->foreignId('trip_package_id')->constrained()->cascadeOnDelete();
 $table->integer('day_number')->default(1);
 $table->string('time'); // e.g. "08.00 - 10.00"
 $table->string('title');
 $table->text('description')->nullable();
 $table->integer('sort_order')->default(0);
 $table->timestamps();
});

// Blog / Content Table
Schema::create('content_posts', function (Blueprint $table) {
 $table->id();
 $table->string('title');
 $table->string('slug')->unique();
 $table->string('primary_keyword');
 $table->json('secondary_keywords')->nullable(); // JSON Array
 $table->string('search_intent'); // Informational, Commercial, etc.
 $table->string('category'); // Panduan, Tips, etc.
 $table->text('excerpt');
 $table->longText('body');
 $table->boolean('is_featured')->default(false);
 $table->string('status')->default('published');
 $table->integer('sort_order')->default(0);
 $table->string('image_path')->nullable();
 $table->timestamp('published_at')->nullable();
 $table->timestamps();
});

// Post Package Pivot for Internal Linking SEO
Schema::create('content_post_trip_package', function (Blueprint $table) {
 $table->foreignId('content_post_id')->constrained()->cascadeOnDelete();
 $table->foreignId('trip_package_id')->constrained()->cascadeOnDelete();
});

// Post Destination Pivot
Schema::create('content_post_destination', function (Blueprint $table) {
 $table->foreignId('content_post_id')->constrained()->cascadeOnDelete();
 $table->foreignId('destination_id')->constrained()->cascadeOnDelete();
});
 `;

 const filamentCode = `
// FILAMENT CMS PANEL CLASS: TripPackageResource.php

namespace App\\Filament\\Resources;

use App\\Models\\TripPackage;
use Filament\\Forms;
use Filament\\Forms\\Form;
use Filament\\Resources\\Resource;
use Filament\\Tables;
use Filament\\Tables\\Table;

class TripPackageResource extends Resource
{
 protected static ?string $model = TripPackage::class;
 protected static ?string $navigationIcon = 'heroicon-o-briefcase';
 protected static ?string $navigationGroup = 'Trip Management';

 public static function form(Form $form): Form
 {
 return $form
 ->schema([
 Forms\\Components\\Tabs::make('Trip Details')
 ->tabs([
 Forms\\Components\\Tabs\\Tab::make('Data Utama')
 ->schema([
 Forms\\Components\\TextInput::make('name')
 ->required()
 ->lazy()
 ->afterStateUpdated(fn ($state, callable $set) => $set('slug', str($state)->slug())),
 Forms\\Components\\TextInput::make('slug')
 ->required()
 ->unique(ignoreRecord: true),
 Forms\\Components\\Select::make('type')
 ->options([
 'Open Trip' => 'Open Trip',
 'Private Trip' => 'Private Trip',
 'Corporate Outing' => 'Corporate Outing',
 'Family Trip' => 'Family Trip',
 ])->required(),
 Forms\\Components\\TextInput::make('duration_label')
 ->placeholder('e.g. 3 Hari 2 Malam')
 ->required(),
 Forms\\Components\\TextInput::make('starting_price')
 ->numeric()
 ->prefix('Rp')
 ->required(),
 Forms\\Components\\TextInput::make('price_label')
 ->placeholder('e.g. Rp 1.250.000')
 ->required(),
 Forms\\Components\\Textarea::make('summary')
 ->required()
 ->maxLength(255),
 Forms\\Components\\RichEditor::make('description')
 ->required()
 ->columnSpanFull(),
 Forms\\Components\\FileUpload::make('image_path')
 ->image()
 ->directory('trips'),
 ])->columns(2),

 Forms\\Components\\Tabs\\Tab::make('Relasi & Meta SEO')
 ->schema([
 Forms\\Components\\Select::make('categories')
 ->relationship('categories', 'name')
 ->multiple()
 ->preload(),
 Forms\\Components\\Select::make('destinations')
 ->relationship('destinations', 'name')
 ->multiple()
 ->preload(),
 Forms\\Components\\TextInput::make('review_label')
 ->placeholder('e.g. 150+ Ulasan')
 ->default('100+ Ulasan'),
 Forms\\Components\\TextInput::make('rating')
 ->numeric()
 ->default(5.0)
 ->minValue(1)->maxValue(5),
 Forms\\Components\\Textarea::make('booking_message')
 ->label('Pesan WhatsApp Otomatis')
 ->placeholder('Halo Admin, saya ingin mendaftar...')
 ->columnSpanFull(),
 Forms\\Components\\Toggle::make('is_featured'),
 Forms\\Components\\Select::make('status')
 ->options([
 'draft' => 'Draft',
 'published' => 'Published',
 ])->default('published'),
 ])->columns(2),

 Forms\\Components\\Tabs\\Tab::make('Price Tiers')
 ->schema([
 Forms\\Components\\Repeater::make('prices')
 ->relationship('prices')
 ->schema([
 Forms\\Components\\TextInput::make('name')->required(),
 Forms\\Components\\TextInput::make('label')->required(),
 Forms\\Components\\TextInput::make('price')->numeric()->prefix('Rp')->required(),
 Forms\\Components\\TextInput::make('price_suffix')->default('/pax'),
 Forms\\Components\\TextInput::make('min_pax')->numeric()->default(1),
 Forms\\Components\\TextInput::make('max_pax')->numeric()->default(100),
 Forms\\Components\\Toggle::make('is_primary'),
 ])->columns(4)
 ]),

 Forms\\Components\\Tabs\\Tab::make('Fasilitas / Features')
 ->schema([
 Forms\\Components\\Repeater::make('features')
 ->relationship('features')
 ->schema([
 Forms\\Components\\Select::make('type')
 ->options([
 'highlight' => 'Highlight',
 'included' => 'Termasuk (Included)',
 'excluded' => 'Tidak Termasuk (Excluded)',
 'facility' => 'Fasilitas Utama',
 'note' => 'Catatan Penting',
 ])->required(),
 Forms\\Components\\TextInput::make('label')->required(),
 Forms\\Components\\TextInput::make('description'),
 Forms\\Components\\TextInput::make('icon')->default('check'),
 ])->columns(2)
 ]),

 Forms\\Components\\Tabs\\Tab::make('Itinerary Timeline')
 ->schema([
 Forms\\Components\\Repeater::make('itineraries')
 ->relationship('itineraries')
 ->schema([
 Forms\\Components\\TextInput::make('day_number')->numeric()->default(1)->required(),
 Forms\\Components\\TextInput::make('time')->placeholder('e.g. 08:00 - 10:00')->required(),
 Forms\\Components\\TextInput::make('title')->required(),
 Forms\\Components\\Textarea::make('description'),
 ])->columns(3)
 ]),
 ])
 ])->columnSpanFull();
 }
}
 `;

 const livewireBladeCode = `
<!-- LIVEWIRE CONTROLLER VIEW (produk-detail.blade.php) -->
<div class="relative w-full @theme font-sans bg-[#FAF9F6] text-slate-800">
 <!-- Meta SEO Tag Section -->
 @section('title', $package->name . " - Travel Agent Termurah")
 @section('meta_description', Str::limit(strip_tags($package->summary), 150))
 <link rel="canonical" href="{{ url('/produk/' . $package->slug) }}" />

 <!-- Cover Hero Section -->
 <section class="relative w-full h-[320px] md:h-[480px]">
 <img class="w-full h-full object-cover lazy" src="{{ Storage::url($package->image_path) }}" alt="{{ $package->name }}">
 <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
 <div class="absolute bottom-0 inset-x-0 p-6 md:p-6 text-white">
 <span class="bg-amber-400 text-amber-950 font-semibold px-3 py-1 rounded text-xs tracking-wide">
 {{ $package->type }}
 </span>
 <h1 class="text-lg md:text-xl font-bold font-sans tracking-tight mt-2">{{ $package->name }}</h1>
 <div class="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-200">
 <span class="flex items-center"><i class="lucide-map-pin mr-1 text-amber-500"></i> {{ $package->destinations->pluck('name')->implode(', ') }}</span>
 <span class="flex items-center"><i class="lucide-clock mr-1 text-amber-500"></i> {{ $package->duration_label }}</span>
 <span class="flex items-center text-amber-500">★ {{ $package->rating }} ({{ $package->review_label }})</span>
 </div>
 </div>
 </section>

 <!-- Two Column Layout for Desktop -->
 <div class="max-w-5xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
 <!-- Left Column: Primary Content -->
 <div class="lg:col-span-2 space-y-8">
 <div class="bg-white rounded-lg shadow-xs p-6">
 <h2 class="text-xl font-bold border-b pb-3 text-slate-900">Deskripsi Paket</h2>
 <div class="text-slate-600 space-y-4 mt-4 leading-relaxed font-sans">
 {!! $package->description !!}
 </div>
 </div>

 <!-- Price Tiers -->
 <div class="bg-white rounded-lg shadow-xs p-6">
 <h2 class="text-xl font-bold border-b pb-3 mb-4 text-slate-900">Pilihan Harga Paket</h2>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
 @foreach($package->prices as $priceTier)
 <div class="border rounded-lg p-4 {{ $priceTier->is_primary ? 'bg-amber-50/50 border-amber-300' : 'border-slate-200' }}">
 <div class="font-bold text-slate-800">{{ $priceTier->name }}</div>
 <div class="text-xs text-slate-500 mb-2">{{ $priceTier->label }}</div>
 <div class="text-xl font-extrabold text-indigo-900">
 Rp {{ number_format($priceTier->price, 0, ',', '.') }}
 <span class="text-xs font-normal text-slate-500">{{ $priceTier->price_suffix }}</span>
 </div>
 <div class="text-xs bg-white mt-2 inline-block px-2 py-1 rounded text-slate-600">
 Min: {{ $priceTier->min_pax }} - Max: {{ $priceTier->max_pax }} Orang
 </div>
 </div>
 @endforeach
 </div>
 </div>

 <!-- Itinerary Timeline -->
 <div class="bg-white rounded-lg shadow-xs p-6">
 <h2 class="text-xl font-bold border-b pb-3 mb-4 text-slate-900">Itinerary Perjalanan</h2>
 <div class="relative pl-6 border-l-2 border-amber-300 space-y-6">
 @foreach($package->itineraries as $itinerary)
 <div class="relative">
 <div class="absolute -left-[31px] top-1.5 bg-amber-400 text-amber-950 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-xs">
 {{ $itinerary->day_number }}
 </div>
 <span class="text-xs text-amber-600">{{ $itinerary->time }}</span>
 <h3 class="font-bold text-slate-800 text-base mt-0.5">{{ $itinerary->title }}</h3>
 <p class="text-sm text-slate-600 mt-1 leading-relaxed">{{ $itinerary->description }}</p>
 </div>
 @endforeach
 </div>
 </div>
 </div>

 <!-- Right Column: Sticky Booking Card & Sharing widget -->
 <div class="lg:col-span-1">
 <div class="sticky top-6 bg-white border border-slate-200 rounded-lg shadow-md p-6">
 <div class="flex items-center justify-between mb-4">
 <span class="text-xs font-semibold text-slate-500">Harga Mulai</span>
 <span class="text-2xl font-extrabold text-amber-600 font-sans">{{ $package->price_label }}</span>
 </div>
 <div class="space-y-3 mb-6">
 <div class="flex justify-between text-sm py-2 border-b">
 <span class="text-slate-500">Durasi</span>
 <span class="font-semibold text-slate-800">{{ $package->duration_label }}</span>
 </div>
 <div class="flex justify-between text-sm py-2 border-b">
 <span class="text-slate-500">Lokasi</span>
 <span class="font-semibold text-slate-800">{{ $package->destinations->pluck('name')->implode(', ') }}</span>
 </div>
 </div>
 
 <a href="https://wa.me/628123456789?text={{ rawurlencode($package->booking_message) }}" 
 class="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200 shadow-sm shadow-emerald-200">
 <i class="lucide-phone text-white w-5 h-5"></i>
 Konsultasi via WhatsApp
 </a>
 </div>
 </div>
 </div>
</div>
 `;

 return (
 <div className="bg-slate-900 text-slate-100 flex flex-col h-full overflow-hidden font-sans">
 {/* Top Banner */}
 <div className="bg-gradient-to-r from-teal-800 to-indigo-900 py-3 px-4 flex justify-between items-center border-b border-white/10 shrink-0">
 <div className="flex items-center gap-2">
 <Sparkles className="text-amber-500 w-5 h-5 animate-pulse" />
 <h2 className="font-sans font-bold text-sm md:text-base tracking-tight">Developer & CMS Integration Hub</h2>
 </div>
 <div className="flex items-center gap-1.5">
 <span className="bg-teal-500/20 text-teal-300 text-[10px] px-2 py-0.5 rounded-full border border-teal-500/30">
 Laravel + Filament Active
 </span>
 {onClose && (
 <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10" aria-label="Close">
 <X className="w-5 h-5" />
 </button>
 )}
 </div>
 </div>

 {/* Tabs list */}
 <div className="flex border-b border-slate-800 bg-slate-900 shrink-0 overflow-x-auto text-xs scrollbar-none">
 <button
 onClick={() => setActiveTab('system')}
 className={`flex items-center gap-1.5 py-3 px-4 font-semibold border-b-2 whitespace-nowrap transition ${
 activeTab === 'system' ? 'border-amber-400 text-amber-500 bg-[#232a39]' : 'border-transparent text-slate-500 hover:color-slate-200'
 }`}
 >
 <Layers className="w-4 h-4" /> Recommended Design System
 </button>
 <button
 onClick={() => setActiveTab('mapping')}
 className={`flex items-center gap-1.5 py-3 px-4 font-semibold border-b-2 whitespace-nowrap transition ${
 activeTab === 'mapping' ? 'border-amber-400 text-amber-500 bg-[#232a39]' : 'border-transparent text-slate-500 hover:color-slate-200'
 }`}
 >
 <Database className="w-4 h-4" /> Data Mapping & ERD
 </button>
 <button
 onClick={() => setActiveTab('wireframes')}
 className={`flex items-center gap-1.5 py-3 px-4 font-semibold border-b-2 whitespace-nowrap transition ${
 activeTab === 'wireframes' ? 'border-amber-400 text-amber-500 bg-[#232a39]' : 'border-transparent text-slate-500 hover:color-slate-200'
 }`}
 >
 <Layout className="w-4 h-4" /> Text-Based Wireframes
 </button>
 <button
 onClick={() => setActiveTab('laravel')}
 className={`flex items-center gap-1.5 py-3 px-4 font-semibold border-b-2 whitespace-nowrap transition ${
 activeTab === 'laravel' ? 'border-amber-400 text-amber-500 bg-[#232a39]' : 'border-transparent text-slate-500 hover:color-slate-200'
 }`}
 >
 <Code className="w-4 h-4" /> Laravel / Filament Code Bundle
 </button>
 </div>

 {/* Content Scroller */}
 <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
 {activeTab === 'system' && (
 <div className="space-y-6 max-w-4xl mx-auto">
 <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700/50">
 <h3 className="text-amber-500 font-bold text-lg mb-2 flex items-center gap-2">
 <Sparkles className="w-5 h-5 text-amber-500" />
 CMS Travel Agent Design System
 </h3>
 <p className="text-slate-300 text-sm leading-relaxed">
 Rekomendasi visual system yang menggabungkan kemudahan navigasi perangkat seluler (mobile-first) dengan kelegaan visual desktop (minimalis, anggun, dengan penataan whitespace yang longgar).
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
 <h4 className="text-white font-bold text-sm mb-3 text-slate-200">1. PALET WARNA (BRAND IDENTITY)</h4>
 <div className="space-y-3 text-xs">
 <div className="flex items-center gap-3">
 <span className="w-8 h-8 rounded-lg bg-primary-blue border border-slate-700 block"></span>
 <div>
 <p className="text-primary-blue font-bold text-slate-200">Primary: Blue (#0064D2)</p>
 <p className="text-slate-500">Navigasi, CTA utama, dan link interaktif.</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <span className="w-8 h-8 rounded-lg bg-amber-500 border border-slate-700 block"></span>
 <div>
 <p className="text-amber-500 font-bold text-slate-200">Accent: Yellow (#F7C400)</p>
 <p className="text-slate-500">Badge, rating, dan CTA sekunder.</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <span className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-700 block"></span>
 <div>
 <p className="text-slate-200 font-bold">Background Base: Soft (#F4F7FA)</p>
 <p className="text-slate-500">Surface halaman listing dan section muted.</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <span className="w-8 h-8 rounded-lg bg-[#25D366] border border-slate-700 block"></span>
 <div>
 <p className="text-[#25D366] font-bold text-teal-400">CTA/Success: Emerald Green (#25D366)</p>
 <p className="text-slate-500">Apresiasi tinggi konversi langsung ke WhatsApp.</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
 <h4 className="text-white font-bold text-sm mb-3">2. TYPOGRAPHY SYSTEM</h4>
 <div className="space-y-3 font-sans">
 <div>
 <p className="text-slate-500 text-xs">Display Font (Headers, Headlines):</p>
 <p className="font-bold text-white text-lg tracking-tight font-display">Instrument Sans (Bold)</p>
 <p className="text-slate-500 text-xs">Mengedepankan struktur geometris modern, mudah dieja.</p>
 </div>
 <div>
 <p className="text-slate-500 text-xs">Body Font (Copywriting, Descriptions):</p>
 <p className="text-slate-300 text-sm font-sans">Instrument Sans Regular (Line Height 1.625)</p>
 <p className="text-slate-500 text-xs">Whitespace yang luas di antara baris teks untuk peningkatan keterbacaan ponsel.</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
 <h4 className="text-white font-bold text-sm mb-3">3. TOUCH-TARGETS AND SHADOWS</h4>
 <ul className="text-slate-300 text-sm space-y-2.5 list-disc pl-5">
 <li><strong>Touch Target Size:</strong> Semua tombol, tautan, dan checkbox di mobile minimum berukuran <strong>44px x 44px</strong> untuk mempermudah tap jempol tangan dalam kendaraan.</li>
 <li><strong>Shadows:</strong> Bayangan yang sangat halus untuk memisahkan tingkatan visual (<code>shadow-xs</code>, <code>shadow-sm</code>). Menghidupkan kesan elegan bebas gangguan visual kaku.</li>
 <li><strong>Lazy Loading & Speed:</strong> Gambar di-render dengan size terkompresi & tag <code>lazy</code> untuk menjaga page speed di atas 90 untuk SEO mobile crawlers Google.</li>
 </ul>
 </div>
 </div>
 )}

 {activeTab === 'mapping' && (
 <div className="space-y-6 max-w-4xl mx-auto">
 <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700/50">
 <h3 className="text-amber-500 font-bold text-lg mb-2 flex items-center gap-2">
 <Database className="w-5 h-5 text-amber-500" />
 ERD Mapping Table to Frontend Sections
 </h3>
 <p className="text-slate-300 text-sm">
 Lihat di bawah ini bagaimana data dinamis dari Laravel database di-petakan ke setiap elemen User Interface di aplikasi travel agent ini.
 </p>
 </div>

 <div className="space-y-4">
 <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
 <h4 className="text-amber-500 font-bold text-sm mb-3 border-b border-slate-800 pb-2">1. DETAIL PRODUK (trip_packages) DETAILED MAPPING</h4>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs ">
 <div className="p-3 bg-slate-900 rounded border border-slate-800">
 <p className="text-teal-400 font-semibold mb-1">UI Section: Header Hero</p>
 <ul className="space-y-1.5 text-slate-300">
 <li>• Cover Image: <code className="text-amber-300">trip_packages.image_path</code></li>
 <li>• Title: <code className="text-amber-300">trip_packages.name</code></li>
 <li>• Type Badge: <code className="text-amber-300">trip_packages.type</code> (computed)</li>
 <li>• Rating Score: <code className="text-amber-300">trip_packages.rating</code></li>
 <li>• Review Count: <code className="text-amber-300">trip_packages.review_label</code></li>
 </ul>
 </div>
 <div className="p-3 bg-slate-900 rounded border border-slate-800">
 <p className="text-teal-400 font-semibold mb-1">UI Section: Price Cards & Sticky Bar</p>
 <ul className="space-y-1.5 text-slate-300">
 <li>• Starting Price: <code className="text-amber-300">trip_packages.starting_price / price_label</code></li>
 <li>• Price List: <code className="text-amber-300">package_price_tiers</code> relation</li>
 <li>• Pricing Tier Name: <code className="text-amber-300">package_price_tiers.name</code></li>
 <li>• Price Numeric: <code className="text-amber-300">package_price_tiers.price</code></li>
 </ul>
 </div>
 <div className="p-3 bg-slate-900 rounded border border-slate-800">
 <p className="text-teal-400 font-semibold mb-1">UI Section: Facilities Tab Accordion</p>
 <ul className="space-y-1.5 text-slate-300">
 <li>• Included Items: <code className="text-amber-300">package_features</code> (where type = included)</li>
 <li>• Excluded Items: <code className="text-amber-300">package_features</code> (where type = excluded)</li>
 <li>• Notes: <code className="text-amber-300">package_features</code> (where type = note)</li>
 <li>• Highlight: <code className="text-amber-300">package_features</code> (where type = highlight)</li>
 </ul>
 </div>
 <div className="p-3 bg-slate-900 rounded border border-slate-800">
 <p className="text-teal-400 font-semibold mb-1">UI Section: Itinerary vertical timeline</p>
 <ul className="space-y-1.5 text-slate-300">
 <li>• Sequence: <code className="text-amber-300">trip_itineraries.day_number</code></li>
 <li>• Clock: <code className="text-amber-300">trip_itineraries.time</code></li>
 <li>• Title: <code className="text-amber-300">trip_itineraries.title</code></li>
 <li>• Desc: <code className="text-amber-300">trip_itineraries.description</code></li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
 <h4 className="text-amber-500 font-bold text-sm mb-3 border-b border-slate-800 pb-2">2. SEO ENGINE & BLOG CONTENT (content_posts) MAPPING</h4>
 <p className="text-slate-300 text-sm mb-3">
 Untuk mendukung performa SEO, internal-linking dilakukan secara dinamis di CMS kami. Detail relasi diatur sebagai berikut:
 </p>
 <div className="space-y-2 text-xs ">
 <div className="p-3 bg-slate-900 rounded border border-slate-800">
 <p className="text-teal-400 font-semibold mb-1">Canonical & Meta Headers</p>
 <p className="text-slate-500 mb-1">URL: <code className="text-amber-300">/blog/{'{content_posts.slug}'}</code></p>
 <p className="text-slate-500 mb-1">Canonical: <code className="text-amber-300">{'href="{{ url(\'/blog/\' . $post->slug) }}"'}</code></p>
 <p className="text-slate-500">Meta Description: Diambil melalui pemotongan 150 huruf pertama dari string field <code className="text-amber-300">content_posts.excerpt</code>.</p>
 </div>
 <div className="p-3 bg-slate-900 rounded border border-slate-800">
 <p className="text-teal-400 font-semibold mb-1">Related Objects & Dynamic Linking</p>
 <p className="text-slate-500 mb-1">
 Setiap kali post memuat kata bernilai slug, ia akan ditransformasi secara dinamis menjadi HTML Link (Internal Link) menuju <code className="text-amber-300">/produk/slug</code> atau <code className="text-amber-300">/layanan/slug</code> berdasarkan relasi tabel pivot.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}

 {activeTab === 'wireframes' && (
 <div className="space-y-6 max-w-4xl mx-auto">
 <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700/50">
 <h3 className="text-amber-500 font-bold text-lg mb-2 flex items-center gap-2">
 <Layout className="w-5 h-5 text-amber-500" />
 Text-Based Interface Wireframe
 </h3>
 <p className="text-slate-300 text-sm">
 Berikut rancangan tata letak kawat (wireframe) halaman Detail Produk guna memastikan struktur SEO yang ramah perayap Google diletakkan paling utama sebelum konten hiasan.
 </p>
 </div>

 <div className="bg-slate-900 p-5 rounded-lg border border-slate-800 text-xs text-emerald-400 space-y-1">
 <p className="text-slate-500">/* --- MOBILE VIEW GRID SYSTEM WIREFRAME --- */</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Header]: Logo (Kiri) - - - - - - - - - [Hamburger] (Kanan) |</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Hero Cover Image]: Banner Wisata / Tombol Kembali |</p>
 <p>| - Title: Open Trip Bromo Midnight |</p>
 <p>| - Price: Rp 350.000 (starting price) |</p>
 <p>| - Sub: Rating 4.8 / 185+ Reviews |</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Highlight Section] |</p>
 <p>| - 4 Box horizontal scroll: Hardtop Jeep 4x4, Sunrise, etc. |</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Tabs Section] |</p>
 <p>| - Deskripsi (Default Active) | Fasilitas | Itinerary |</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Pricing Cards Grid - Vertically Stacked] |</p>
 <p>| - Card: Sharing Per Orang ==&gt; Rp 350k / pax |</p>
 <p>| - Card: Duo Traveler ==&gt; Rp 330k / pax |</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Itinerary List - Vertical Timeline] |</p>
 <p>| (1. Sunrise Penanjakan) --- (2. Kawah Bromo) --- (3. Savana)|</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Related Articles - Internal Linking] |</p>
 <p>| - "Panduan Mengunjungi Bromo 2026" (Blog Card) |</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Sticky Bottom Conversion Bar] |</p>
 <p>| Price: Rp 350.000 / pax | [Booking WhatsApp Button] (Gold) |</p>
 <p>+-------------------------------------------------------------+</p>
 <p className="mt-4 text-slate-500">/* --- DESKTOP VIEW GRID SYSTEM WIREFRAME --- */</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| [Header]: Logo (Kiri) -----[Home | Layanan | Trip| Blog]-- [WA]|</p>
 <p>+-------------------------------------------------------------+</p>
 <p>| |</p>
 <p>| GRID COLUMN system (3 columns: col-span-2 / col-span-1) |</p>
 <p>| |</p>
 <p>| +----------------------------------+ +------------------+ |</p>
 <p>| | [LEFT SIDE: Main Content] | | [RIGHT SIDE] | |</p>
 <p>| | - Cover & Title | | [Sticky Card] | |</p>
 <p>| | - Highlight Icons Carousel | | - Price Headline | |</p>
 <p>| | - Detailed Description RichText | | - Copy Link icon | |</p>
 <p>| | - Price Card Tables | | - Duration label | |</p>
 <p>| | - Vertical Timeline Itinerary | | - CTA WA Button | |</p>
 <p>| | - Included / Excluded Checkboxes | | | |</p>
 <p>| | - Related Blog Articles Grid | | | |</p>
 <p>| +----------------------------------+ +------------------+ |</p>
 <p>| |</p>
 <p>+-------------------------------------------------------------+</p>
 </div>
 </div>
 )}

 {activeTab === 'laravel' && (
 <div className="space-y-6 max-w-4xl mx-auto">
 <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700/50">
 <h3 className="text-amber-500 font-bold text-lg mb-2 flex items-center gap-2">
 <Code className="w-5 h-5 text-amber-500" />
 Laravel Code Bundle & Filament Blueprint
 </h3>
 <p className="text-slate-300 text-sm">
 Salin dan gunakan struktur kode asli Laravel Migration, Filament Resource Builder Form, dan Livewire Blade template di bawah ini untuk memulai integrasi CMS Anda.
 </p>
 </div>

 {/* Laravel Migration SQL Boilerplate */}
 <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
 <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
 <span className="text-xs text-amber-500">Database Migration (Laravel Migrations Schema)</span>
 <button
 onClick={() => handleCopy(dbSchemaCode, 'migration')}
 className="text-slate-500 hover:text-white flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-800"
 >
 {copiedText === 'migration' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
 {copiedText === 'migration' ? 'Copied' : 'Copy Schema'}
 </button>
 </div>
 <pre className="p-4 overflow-x-auto text-xs text-slate-300 max-h-72">
 {dbSchemaCode}
 </pre>
 </div>

 {/* Filament Form Repeater Field Component Boilerplate */}
 <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
 <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
 <span className="text-xs text-amber-500">Filament Resource Form Scheme (TripPackageResource.php)</span>
 <button
 onClick={() => handleCopy(filamentCode, 'filament')}
 className="text-slate-500 hover:text-white flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-800"
 >
 {copiedText === 'filament' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
 {copiedText === 'filament' ? 'Copied' : 'Copy Filament Code'}
 </button>
 </div>
 <pre className="p-4 overflow-x-auto text-xs text-slate-300 max-h-72">
 {filamentCode}
 </pre>
 </div>

 {/* Livewire HTML Render Engine */}
 <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
 <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
 <span className="text-xs text-amber-500">Livewire Interactive Blade Render (produk-detail.blade.php)</span>
 <button
 onClick={() => handleCopy(livewireBladeCode, 'livewire')}
 className="text-slate-500 hover:text-white flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-800"
 >
 {copiedText === 'livewire' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
 {copiedText === 'livewire' ? 'Copied' : 'Copy Blade Template'}
 </button>
 </div>
 <pre className="p-4 overflow-x-auto text-xs text-slate-300 max-h-72">
 {livewireBladeCode}
 </pre>
 </div>
 </div>
 )}
 </div>

 {/* Action Footer */}
 <div className="bg-slate-900/80 backdrop-blur-md p-3.5 border-t border-slate-800 flex justify-between items-center shrink-0">
 <p className="text-[11px] text-slate-500 ">
 © 2026 CMS Tour Agent Developer Kit. Complete copy-paste code schema.
 </p>
 <button
 onClick={onClose}
 className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-semibold py-1.5 px-3 rounded-lg border border-slate-700 transition"
 aria-label="Close">
 Tutup Panel
 </button>
 </div>
 </div>
 );
}
