import createClient, { type Middleware } from 'openapi-fetch';

import type { paths } from './v1';

/**
 * Per-request escape hatch for headers that are only known at call time
 * (e.g. an idempotency key, a correlation id, or a one-off scope override).
 *
 * Pass it through the standard openapi-fetch request options:
 *
 * ```ts
 * client.GET('/resource', { runtimeHeaders: { 'X-Request-Id': id } });
 * ```
 */
export interface RuntimeRequestOptions {
	runtimeHeaders?: Record<string, string>;
}

/**
 * Safely extracts `runtimeHeaders` from the opaque fetch options object without
 * widening the type surface to `any`. Missing or malformed values collapse to
 * an empty record so the interceptor never throws on a bad call site.
 */
function readRuntimeHeaders(options: unknown): Record<string, string> {
	if (
		typeof options === 'object' &&
		options !== null &&
		'runtimeHeaders' in options
	) {
		const candidate = (options as RuntimeRequestOptions).runtimeHeaders;
		if (candidate && typeof candidate === 'object') {
			return candidate;
		}
	}
	return {};
}

/**
 * Builds a type-safe transport client bound to a single API `baseUrl`.
 *
 * The returned client is fully typed against the generated OpenAPI `paths`,
 * so request paths, params, bodies, and responses are all checked at compile
 * time. Cross-cutting concerns (dynamic headers, auth-expiry handling) live in
 * middleware so call sites stay declarative.
 */
export function createApiCoreClient(baseUrl: string) {
	const client = createClient<paths>({
		baseUrl,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const transportMiddleware: Middleware = {
		onRequest({ request, options }) {
			const runtimeHeaders = readRuntimeHeaders(options);
			for (const [key, value] of Object.entries(runtimeHeaders)) {
				request.headers.set(key, value);
			}
			return request;
		},
		onResponse({ response }) {
			if (response.status === 401) {
				// Global logout / session-expiry handling goes here
				// (e.g. clear the auth token and redirect to the sign-in route).
			}
			return response;
		},
	};

	client.use(transportMiddleware);

	return client;
}

export type ApiCoreClient = ReturnType<typeof createApiCoreClient>;
