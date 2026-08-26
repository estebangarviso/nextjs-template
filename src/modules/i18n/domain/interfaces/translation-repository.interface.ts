import type { Locale } from '../entities/locale.ts';

/**
 * A flat key → value translation map for a given locale.
 *
 * Keys use dot-notation to represent namespaces (e.g. `'auth.login'`).
 * The backend returns this shape from `GET /api/v1/translations/{locale}`.
 */
export type Dictionary = Record<string, string>;

/** Port: fetches translations from the (((app-backend-title))). */
export interface TranslationRepository {
  getDictionary(locale: Locale): Promise<Dictionary>;
}
