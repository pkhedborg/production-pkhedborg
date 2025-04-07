'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import i18n from '@/config/i18n';

export default function I18nProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only initialize i18n on the client side
    if (typeof window !== 'undefined' && !i18n.isInitialized) {
      i18n.init();
    }
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by hiding content until client-side
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
}