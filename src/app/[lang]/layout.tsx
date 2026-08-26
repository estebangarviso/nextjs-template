import type { Metadata } from 'next';
import { (((font-family))) } from 'next/font/google';
import { notFound } from 'next/navigation';

import { Providers } from '@core/providers';
import {
  isLocale,
  SUPPORTED_LOCALES,
  TranslationsProvider,
  getServerDictionary,
} from '@modules/i18n';

import '../globals.css';

// ─── Font ────────────────────────────────────────────────────────────────────
// Replace (((font-family))), (((font-family-var))), (((font-weights))) via
// `node scripts/init.mjs` — e.g. Inter → inter, Geist_Sans → geistSans

const (((font-family-var))) = (((font-family)))({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: [(((font-weights)))],
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: '(((app-title)))',
  description: '(((app-description)))',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
};

// ─── Static locale params ─────────────────────────────────────────────────────

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

// ─── Layout ───────────────────────────────────────────────────────────────────

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!isLocale(lang)) notFound();

  // Fetch translations from the (((app-backend-title))) (server-side, cached 1h).
  // Falls back to an empty dictionary on error so the app never hard-crashes.
  const dictionary = await getServerDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={(((font-family-var))).variable}>
        <TranslationsProvider locale={lang} dictionary={dictionary}>
          <Providers>{children}</Providers>
        </TranslationsProvider>
      </body>
    </html>
  );
}
