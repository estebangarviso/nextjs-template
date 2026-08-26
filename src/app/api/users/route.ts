import { NextResponse, type NextRequest } from 'next/server';

import {
  CreateUserSchema,
  SearchSchema,
  createUser,
  users,
} from './_store';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const parsed = SearchSchema.safeParse({ search: searchParams.get('search') ?? undefined });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let results = Array.from(users.values());

  if (parsed.data.search) {
    const term = parsed.data.search.toLowerCase();
    results = results.filter(
      (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term),
    );
  }

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();
  const parsed = CreateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = createUser(parsed.data);
  return NextResponse.json(user, { status: 201 });
}
