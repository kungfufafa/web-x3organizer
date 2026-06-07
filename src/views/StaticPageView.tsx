/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageHero, Button } from '../components/ui';

interface StaticPageViewProps {
  title: string;
  eyebrow?: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export default function StaticPageView({ title, eyebrow, onNavigate, children }: StaticPageViewProps) {
  return (
    <div className="w-full font-sans bg-white text-slate-900 md:pb-24">
      <PageHero eyebrow={eyebrow} title={title} centered />
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 space-y-6 prose prose-slate prose-headings:font-display">
        {children}
        <Button variant="outline" onClick={() => onNavigate('/')} className="mt-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Home
        </Button>
      </div>
    </div>
  );
}
