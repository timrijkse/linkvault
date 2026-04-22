import { NextResponse } from 'next/server';
import { createBookmark, listBookmarks } from '@/lib/bookmarks/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag') ?? undefined;
  const bookmarks = listBookmarks({ tag: tag ?? undefined });
  return NextResponse.json({ bookmarks }, { status: 200 });
}

export async function POST(request: Request) {
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

  if (typeof url !== 'string' || typeof title !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (tags !== undefined && (!Array.isArray(tags) || tags.some((t) => typeof t !== 'string'))) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    const bookmark = createBookmark({ url, title, tags: tags as string[] | undefined });
    return NextResponse.json({ bookmark }, { status: 201 });
  } catch (e) {
    const code = e instanceof Error ? e.message : 'UNKNOWN';
    const message = code === 'INVALID_URL' ? 'Invalid URL' : 'Invalid title';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

