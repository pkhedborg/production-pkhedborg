'use client';

import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('404.title', '404')}</h1>
        <p className="text-lg">{t('404.description', 'Page Not Found')}</p>
      </div>
    </div>
  );
} 