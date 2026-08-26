import { NextResponse, type NextRequest } from 'next/server';

import { UpdateUserSchema, users } from '../_store';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const user = users.get(id);

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const user = users.get(id);

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body: unknown = await request.json();
  const parsed = UpdateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = { ...user, ...parsed.data };
  users.set(id, updated);
  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!users.has(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  users.delete(id);
  return new NextResponse(null, { status: 204 });
}
