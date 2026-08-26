import type { Metadata } from 'next';
import { (((font-family))) } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { Providers } from '@core/providers';
import { isLocale, SUPPORTED_LOCALES } from '@modules/i18n';

import '../globals.css';

const (((font-family-var))) = (((font-family)))({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: [(((font-weights)))],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '(((app-title)))',
  description: '(((app-description)))',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
  ),
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={(((font-family-var))).variable}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
