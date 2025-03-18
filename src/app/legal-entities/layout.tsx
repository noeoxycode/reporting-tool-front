import type { Metadata } from 'next';
import React from "react";

export const metadata: Metadata = {
  title: 'Legal Entities',
  description: 'Manage your legal entities',
};

export default function LegalEntitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
