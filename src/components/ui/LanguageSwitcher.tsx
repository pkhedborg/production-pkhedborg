"use client";

import { useState, useEffect } from 'react';
import i18next from '../../config/i18n';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'fr', label: 'FR', fullName: 'French' },
  { code: 'nl', label: 'NL', fullName: 'Dutch' },
  { code: 'sv', label: 'SV', fullName: 'Swedish' },
];

export default function LanguageSwitcher() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  
  // Use a stable initial state
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [ariaLabel, setAriaLabel] = useState('Language switcher');

  useEffect(() => {
    setMounted(true);
    const savedLang = i18n.language || 'en';
    setCurrentLanguage(savedLang);
    const currentLang = languages.find((lang) => lang.code === savedLang);
    setAriaLabel(`Selected language: ${currentLang?.fullName || 'English'}`);
  }, [i18n.language]);

  // Don't render anything until after mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-[48px] h-[32px] bg-[#252932] rounded-full" />
    );
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (code: string) => {
    setCurrentLanguage(code);
    i18next.changeLanguage(code);
    i18n.changeLanguage(code);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center min-w-[48px] h-[32px] bg-[#252932] 
                   rounded-full text-sm font-medium text-white px-3"
        aria-expanded={dropdownOpen}
        aria-label={ariaLabel}
      >
        {currentLang?.label}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg z-50">
          <ul className="py-1">
            {languages.map((lang) => (
              <li
                key={lang.code}
                className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-900 ${
                  lang.code === currentLanguage ? 'font-medium bg-gray-50' : ''
                }`}
                onClick={() => changeLanguage(lang.code)}
                role="menuitem"
                aria-label={lang.fullName}
              >
                {lang.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
