'use client';

import {
  createContext,
  useMemo,
  useContext,
  type ReactNode,
  JSX,
} from 'react';

import type { Dictionary } from '../../domain/interfaces/translation-repository.interface.ts';
import type { Locale } from '../../domain/entities/locale.ts';
import { DEFAULT_LOCALE } from '../../domain/entities/locale.ts';

interface TranslationsContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const TranslationsContext = createContext<TranslationsContextValue>({
  locale: DEFAULT_LOCALE,
  dictionary: {},
});

interface TranslationsProviderProps {
  readonly locale: Locale;
  readonly dictionary: Dictionary;
  readonly children: ReactNode;
}

/**
 * Client-side provider that makes the server-fetched translations dictionary
 * available to the entire component tree.
 *
 * Place this just inside the `<body>` in `app/[lang]/layout.tsx`.
 */
export function TranslationsProvider({
  locale,
  dictionary,
  children,
}: TranslationsProviderProps): JSX.Element {
  const value = useMemo(
    () => ({ locale, dictionary }),
    [locale, dictionary],
  );
  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}

/** Raw context access — prefer `useTranslations()` for component usage. */
export function useTranslationsContext(): TranslationsContextValue {
  return useContext(TranslationsContext);
}
