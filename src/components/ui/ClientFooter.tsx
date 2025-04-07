'use client';

import dynamic from 'next/dynamic';

const Footer = dynamic(
  () => import('@/components/ui/footer'),
  { ssr: false }
);

export default function ClientFooter() {
  return <Footer />;
} 