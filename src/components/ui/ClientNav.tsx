'use client';

import dynamic from 'next/dynamic';

const NavigationMenu = dynamic<any>(
  () => import('@/components/ui/navigation-menu').then((mod) => mod.NavigationMenu),
  { 
    ssr: false
  }
);

export default function ClientNav() {
  return <NavigationMenu />;
} 