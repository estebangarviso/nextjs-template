'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Middleware } from 'openapi-fetch';

import { createApiCoreClient, type ApiCoreClient } from './client';

export interface ApiProviderProps {
	children: ReactNode;
	baseUrl: string;
	tenantId: string;
	authToken?: string;
	tenantHeaderKey?: string;
}

interface ApiContextValue {
	client: ApiCoreClient;
	tenantId: string;
}

const ApiContext = createContext<ApiContextValue | null>(null);

/**
 * Injects a tenant-scoped API client into the React tree.
 *
 * A fresh client is memoized per (baseUrl, tenantId, authToken, header key)
 * tuple and enriched with a middleware that stamps the multi-tenant header and
 * an optional bearer token onto every outgoing request.
 *
 * `tenantHeaderKey` defaults to the `(((tenant-header-key)))` placeholder,
 * which `scripts/init.mjs` rewrites to the operator's chosen header on setup.
 */
export function ApiProvider({
	children,
	baseUrl,
	tenantId,
	authToken,
	tenantHeaderKey = '(((tenant-header-key)))',
}: ApiProviderProps) {
	const client = useMemo<ApiCoreClient>(() => {
		const instance = createApiCoreClient(baseUrl);

		const tenantMiddleware: Middleware = {
			onRequest({ request }) {
				request.headers.set(tenantHeaderKey, tenantId);
				if (authToken) {
					request.headers.set(
						'Authorization',
						`Bearer ${authToken}`,
					);
				}
				return request;
			},
		};

		instance.use(tenantMiddleware);
		return instance;
	}, [baseUrl, tenantId, authToken, tenantHeaderKey]);

	const value = useMemo<ApiContextValue>(
		() => ({ client, tenantId }),
		[client, tenantId],
	);

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

/**
 * Reads the tenant-scoped API client from the nearest {@link ApiProvider}.
 *
 * @throws {Error} if called outside of an `<ApiProvider>` tree.
 */
export function useApiClient(): ApiContextValue {
	const context = useContext(ApiContext);
	if (context === null) {
		throw new Error(
			'useApiClient must be used within an <ApiProvider>.',
		);
	}
	return context;
}
