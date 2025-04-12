"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export interface MenuItem {
  text: string;
  link: string;
}

export interface NavigationMenuProps {
  menuItems: MenuItem[];
}

export function NavigationMenu({ menuItems }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background">
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <Image
              src="/icons/Logo/Logo_1x.webp"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-base font-medium transition-colors hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === item.link ? "text-primary after:w-full" : "text-foreground"
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-in menu */}
      <div
        id="navigation-menu"
        className={`fixed right-0 top-0 z-40 h-full transform bg-background shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full lg:w-[350px]`}
      >
        {/* Close button inside menu */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex h-full flex-col p-6">
          <div className="mt-12 flex flex-col items-center space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`rounded-md px-4 py-3 text-base font-medium transition-all duration-300 hover:bg-muted hover:scale-105 text-center w-full ${
                  pathname === item.link 
                    ? "bg-muted text-primary shadow-sm" 
                    : "text-foreground hover:text-primary"
                } sm:py-4 sm:text-lg`}
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}