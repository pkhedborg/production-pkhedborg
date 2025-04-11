"use client"; // Mark this file as a client component

import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import Script from 'next/script'
import I18nProvider from '../components/providers/I18nProvider';
import { NavigationMenu } from "@/components/ui/navigation-menu";
import ClientFooter from "@/components/ui/ClientFooter";
import { useTranslation } from "react-i18next";

// Custom fonts setup
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  const menuItems = [
    { text: t("home.hero.title"), link: "/" },
    { text: t("history.heroTitle"), link: "/history" },
    { text: t("application.heroTitle"), link: "/application" },
    { text: t("contactUs.heading"), link: "/contact" },
  ];

  return (
    <html 
      lang="en" 
      className={`${jakarta.variable} overflow-x-hidden light`}
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
        className={`${jakarta.variable} font-sans antialiased flex flex-col min-h-screen overflow-x-hidden bg-white text-black`}
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