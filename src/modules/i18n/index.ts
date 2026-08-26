/**
 * i18n module — Public API
 *
 * Architecture: server-driven translations from the (((app-backend-title))).
 * Translations are fetched server-side in `app/[lang]/layout.tsx`,
 * serialized as props, and made available to client components via context.
 *
 * @example Server Component (layout)
 * import { getServerDictionary, TranslationsProvider } from '@modules/i18n';
 * const dictionary = await getServerDictionary(lang);
 * return <TranslationsProvider locale={lang} dictionary={dictionary}>...</TranslationsProvider>;
 *
 * @example Client Component
 * import { useTranslations } from '@modules/i18n';
 * const { t } = useTranslations();
 * return <h1>{t('home.welcome')}</h1>;
 */

// Domain
export type { Locale } from './domain/entities/locale.ts';
export type { Dictionary } from './domain/interfaces/translation-repository.interface.ts';
export { SUPPORTED_LOCALES, DEFAULT_LOCALE, isLocale } from './domain/entities/locale.ts';
export { GetDictionaryUseCase } from './domain/use-cases/get-dictionary.use-case.ts';

// Infrastructure (server-only helper)
export { getServerDictionary } from './infrastructure/repositories/http-translation.repository.ts';

// Presentation
export { TranslationsProvider } from './presentation/context/translations-context.tsx';
export { useTranslations } from './presentation/hooks/use-translations.ts';
