// No "use client" directive needed

import Link from 'next/link';
import { useState } from 'react';

interface NavigationMenuProps {
  menuItems: {
    text: string;
    link: string;
  }[];
}

const NavigationMenu = ({ menuItems }: NavigationMenuProps) => {
  return (
    <nav>
      {menuItems.map((item, index) => (
        <Link key={index} href={item.link}>
          {item.text}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;