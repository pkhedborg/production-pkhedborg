"use client"; // Mark this file as a client component

import localFont from "next/font/local";
import { Raleway, Merriweather } from 'next/font/google';
import "./globals.css";
import Script from 'next/script'
import I18nProvider from '../components/providers/I18nProvider';
import { NavigationMenu } from "@/components/ui/navigation-menu";
import ClientFooter from "@/components/ui/ClientFooter";
import { useTranslation } from "react-i18next";


// Custom fonts setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const raleway = Raleway({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway'
});

const merriweather = Merriweather({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather'
});

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  const menuItems = [
    { text: t("nav.home"), link: "/" },
    { text: t("nav.history"), link: "/history" },
    { text: t("nav.apply"), link: "/application" },
    { text: t("nav.contact"), link: "/contact" },
  ];

  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} ${merriweather.variable} overflow-x-hidden light`}
      style={{ colorScheme: 'light' }}
    >
      <Script
        id="Cookiebot"
        strategy="afterInteractive"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="963772c6-0923-412c-bd9e-5fb7a53f30e5"
        data-blockingmode="auto"
      />
      <body
        className={`${merriweather.variable} font-serif antialiased flex flex-col min-h-screen overflow-x-hidden bg-white text-black`}
        style={{ backgroundColor: 'white' }}
        aria-labelledby="main-content"
      >        
        <I18nProvider>
          <div className="max-w-[2000px] mx-auto w-full relative bg-white">
            <header>
              <NavigationMenu menuItems={menuItems} />
            </header>
            <main className="flex-grow bg-white">
              {children}
            </main>
            <footer className="w-full bg-white">
              <ClientFooter />
            </footer>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}