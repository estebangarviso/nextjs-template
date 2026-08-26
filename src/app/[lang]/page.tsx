'use client';

import { useTranslations } from '@modules/i18n';

/**
 * Home page (locale-aware).
 *
 * This is a Client Component so it can use `useTranslations`.
 * For a purely Server Component version, use `getServerDictionary` directly.
 */

export default function HomePage() {
  const { t } = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">(((project-name)))</h1>
      <p className="mt-4 text-lg text-gray-600">
        {t('home.welcome', 'Template initialized successfully.')}
      </p>
    </main>
  );
}
