'use client';

import dynamic from 'next/dynamic';
import type { NavigationMenuProps } from '@/components/ui/navigation-menu';

const NavigationMenu = dynamic<NavigationMenuProps>(
  () => import('@/components/ui/navigation-menu').then((mod) => mod.NavigationMenu),
  {
    ssr: false
  }
);

export default function ClientNav() {
  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'Contact', link: '/contact' }
  ];

  return <NavigationMenu menuItems={menuItems} />;
} 