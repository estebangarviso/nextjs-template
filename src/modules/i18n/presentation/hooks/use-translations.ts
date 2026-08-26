'use client';

import { useTranslationsContext } from '../context/translations-context.tsx';
import type { Locale } from '../../domain/entities/locale.ts';

interface UseTranslationsReturn {
  /** Current active locale. */
  locale: Locale;
  /**
   * Translates a dot-notation key.
   *
   * @param key     - Translation key (e.g. `'auth.login'`)
   *
   * @example
   * const { t } = useTranslations();
   * <button>{t('auth.login')}</button>
   * <button>{t('auth.logout')}</button>
   */
  t: (key: string) => string;
}

/**
 * Hook for translating keys in client components.
 *
 * @example
 * const { t, locale } = useTranslations();
 * return <h1>{t('home.welcome')}</h1>;
 */
export function useTranslations(): UseTranslationsReturn {
  const { locale, dictionary } = useTranslationsContext();

  function t(key: string): string {
    return dictionary[key] ?? key;
  }

  return { locale, t };
}
