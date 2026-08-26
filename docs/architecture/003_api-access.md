# API access

`src/core/api/` wraps `openapi-fetch` so every request is checked against the backend's OpenAPI 3.1 schema. Repository adapters use `getHttpClient()` + Zod for paths not in the spec.

## Quick path

1. Generate types: `OPENAPI_SPEC_URL=… pnpm openapi:gen` → `src/core/api/v1.ts` (git-ignored).
2. Use `useApiClient()` in presentation hooks for typed OpenAPI paths.
3. Use `getHttpClient()` in `infrastructure/repositories/` for other endpoints.

## Transport split

| Use case | Transport | Where |
| --- | --- | --- |
| Typed OpenAPI paths in UI hooks | `useApiClient()` / openapi-fetch | `presentation/hooks/` |
| Repository adapters, non-spec endpoints | `getHttpClient()` + Zod | `infrastructure/repositories/` |

## Typed client setup

1. `createApiCoreClient(baseUrl)` builds a client with a request interceptor for dynamic headers and a `401` hook for global logout.
2. `ApiProvider` injects a tenant-scoped client; components read it via `useApiClient()`.
3. Multi-tenancy is parameterized: the tenant header key defaults to `(((tenant-header-key)))`, replaced by `scripts/init.mjs` on setup (e.g. `X-Tenant-ID`).

Do **not** hardcode API URLs — use env vars and the provider.

## Repository HTTP example

For endpoints not covered by the generated OpenAPI spec:

```typescript
export class HttpAuthRepository implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<Session> {
    return this.http.post('/auth/login', credentials, SessionSchema);
  }
}
```

Wire the singleton in the module factory (`*.factory.ts`): `new HttpAuthRepository(getHttpClient())`.

See `HttpAuthRepository` in `src/modules/auth/infrastructure/repositories/http-auth.repository.ts`.

## Checklist

- [ ] `pnpm openapi:gen` run after spec changes
- [ ] Hooks use `useApiClient()` for spec-covered paths
- [ ] Repositories validate responses with Zod schemas
- [ ] Tenant header set via `ApiProvider`, not hardcoded

## Next step

[004 Module contract](./004_module-contract.md) — scaffold and expose a feature module.
