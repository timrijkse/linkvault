import { NextResponse } from 'next/server';
import { deleteBookmark, getBookmark, updateBookmark } from '@/lib/bookmarks/store';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const bookmark = getBookmark(id);
  if (!bookmark) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ bookmark }, { status: 200 });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const url = (body as { url?: unknown }).url;
  const title = (body as { title?: unknown }).title;
  const tags = (body as { tags?: unknown }).tags;

  if (url !== undefined && typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  if (title !== undefined && typeof title !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  if (tags !== undefined && (!Array.isArray(tags) || tags.some((t) => typeof t !== 'string'))) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    const updated = updateBookmark(id, {
      url: url as string | undefined,
      title: title as string | undefined,
      tags: tags as string[] | undefined,
    });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ bookmark: updated }, { status: 200 });
  } catch (e) {
    const code = e instanceof Error ? e.message : 'UNKNOWN';
    const message = code === 'INVALID_URL' ? 'Invalid URL' : 'Invalid title';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const ok = deleteBookmark(id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true }, { status: 200 });
}

