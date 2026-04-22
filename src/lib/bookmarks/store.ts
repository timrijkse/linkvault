import type { Bookmark, BookmarkCreateInput, BookmarkUpdateInput } from './types';

type ListFilter = { tag?: string };

const bookmarksById = new Map<string, Bookmark>();

function nowIso() {
  return new Date().toISOString();
}

export function normalizeTags(tags: string[]): string[] {
  const seen = new Set<string>();
  for (const raw of tags) {
    const t = raw.trim().toLowerCase();
    if (!t) continue;
    seen.add(t);
  }
  return Array.from(seen);
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function listBookmarks(filter: ListFilter = {}): Bookmark[] {
  const all = Array.from(bookmarksById.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  if (!filter.tag) return all;

  const tag = filter.tag.trim().toLowerCase();
  if (!tag) return all;
  return all.filter((b) => b.tags.includes(tag));
}

export function getBookmark(id: string): Bookmark | null {
  return bookmarksById.get(id) ?? null;
}

export function createBookmark(input: BookmarkCreateInput): Bookmark {
  const url = input.url?.trim();
  const title = input.title?.trim();
  const tags = normalizeTags(input.tags ?? []);

  if (!url || !isValidUrl(url)) throw new Error('INVALID_URL');
  if (!title) throw new Error('INVALID_TITLE');

  const ts = nowIso();
  const bookmark: Bookmark = {
    id: crypto.randomUUID(),
    url,
    title,
    tags,
    createdAt: ts,
    updatedAt: ts,
  };

  bookmarksById.set(bookmark.id, bookmark);
  return bookmark;
}

export function updateBookmark(id: string, patch: BookmarkUpdateInput): Bookmark | null {
  const existing = bookmarksById.get(id);
  if (!existing) return null;

  const nextUrl = patch.url === undefined ? existing.url : patch.url.trim();
  const nextTitle = patch.title === undefined ? existing.title : patch.title.trim();
  const nextTags = patch.tags === undefined ? existing.tags : normalizeTags(patch.tags);

  if (!nextUrl || !isValidUrl(nextUrl)) throw new Error('INVALID_URL');
  if (!nextTitle) throw new Error('INVALID_TITLE');

  const updated: Bookmark = {
    ...existing,
    url: nextUrl,
    title: nextTitle,
    tags: nextTags,
    updatedAt: nowIso(),
  };

  bookmarksById.set(id, updated);
  return updated;
}

export function deleteBookmark(id: string): boolean {
  return bookmarksById.delete(id);
}

