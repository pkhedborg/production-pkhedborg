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
      {/* Main navigation container - adjusted padding */}
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <div className="relative h-[45px] w-[220px]">
              <Image
                src="/PKhedborg-logo.svg"
                alt="PK Hedborg Foundation Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center space-x-6">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:h-12 md:w-12"
              aria-expanded={isOpen}
              aria-controls="navigation-menu"
            >
              {isOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <Menu className="h-5 w-5 md:h-6 md:w-6" />}
              <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Break line */}
      <div className="flex justify-center">
        <div className="w-full md:w-[80%] h-[1px] bg-gray-200"></div>
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
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary"
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
                className={`rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted text-center w-full ${
                  pathname === item.link ? "bg-muted text-primary" : "text-foreground"
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