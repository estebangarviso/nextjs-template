import 'server-only';

import type { Locale } from '../../domain/entities/locale.ts';
import type {
  Dictionary,
  TranslationRepository,
} from '../../domain/interfaces/translation-repository.interface.ts';

/**
 * Adapter: fetches translations from the (((app-backend-title))).
 *
 * Expected backend endpoint:
 *   GET {NEXT_PUBLIC_API_URL}/translations/{locale}
 *
 * Expected response shape (flat or nested JSON — flat is preferred):
 *   { "auth.login": "Sign In", "auth.logout": "Sign Out", ... }
 *
 * Responses are cached by Next.js for 1 hour (ISR-compatible).
 * On error (network failure, non-2xx), returns an empty dictionary so the
 * app degrades gracefully (keys become their own fallback text).
 */
export class HttpTranslationRepository implements TranslationRepository {
  constructor(private readonly apiBaseUrl: string) {}

  async getDictionary(locale: Locale): Promise<Dictionary> {
    try {
      const response = await fetch(
        `${this.apiBaseUrl}/translations/${locale}`,
        {
          next: { revalidate: 3600 }, // cache for 1 hour (Next.js ISR)
          headers: { Accept: 'application/json' },
        },
      );

      if (!response.ok) {
        console.warn(
          `[i18n] Failed to fetch translations for locale "${locale}": ${response.status} ${response.statusText}`,
        );
        return {};
      }

      const data: unknown = await response.json();

      if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        console.warn(
          `[i18n] Unexpected translations payload for locale "${locale}" — expected an object.`,
        );
        return {};
      }

      return flattenDictionary(data as Record<string, unknown>);
    } catch (error) {
      console.error(`[i18n] Error fetching translations for "${locale}":`, error);
      return {};
    }
  }
}

/**
 * Flattens a nested JSON object to dot-notation keys.
 *
 * @example
 * flattenDictionary({ auth: { login: 'Sign In' } })
 * // → { 'auth.login': 'Sign In' }
 */
function flattenDictionary(
  obj: Record<string, unknown>,
  prefix = '',
): Dictionary {
  return Object.entries(obj).reduce<Dictionary>((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenDictionary(value as Record<string, unknown>, fullKey));
    } else if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      acc[fullKey] = String(value);
    }
    return acc;
  }, {});
}

/**
 * Server-side helper — resolves a dictionary without DI container.
 * Use this in Server Components and layouts.
 *
 * @example
 * const dictionary = await getServerDictionary('en');
 */
export async function getServerDictionary(locale: Locale): Promise<Dictionary> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
  const repository = new HttpTranslationRepository(apiUrl);
  return repository.getDictionary(locale);
}
