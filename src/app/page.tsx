import { redirect } from 'next/navigation';

import { DEFAULT_LOCALE } from '@modules/i18n';

/**
 * Root page — unreachable in practice because the middleware redirects `/`
 * to `/{locale}` before this page is ever rendered. Kept as a safety net.
 */
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
