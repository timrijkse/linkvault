import Link from 'next/link';
import { BookmarkList } from '@/components/bookmarks/BookmarkList';
import { TagFilter } from '@/components/bookmarks/TagFilter';
import type { Bookmark } from '@/lib/bookmarks/types';
import { getBaseUrl } from '@/lib/http/getBaseUrl';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function normalizeTag(value?: string) {
  const t = value?.trim().toLowerCase();
  return t ? t : undefined;
}

async function fetchBookmarks(tag?: string) {
  const baseUrl = await getBaseUrl();
  const qs = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  const res = await fetch(`${baseUrl}/api/bookmarks${qs}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return (await res.json()) as { bookmarks: Bookmark[] };
}

export default async function BookmarksPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const tagParam = sp.tag;
  const rawTag = Array.isArray(tagParam) ? tagParam[0] : tagParam;
  const tag = normalizeTag(rawTag);

  const data = await fetchBookmarks(tag);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Bookmarks</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Alles wordt in-memory opgeslagen. Bij herstart kan data verdwijnen.
          </p>
        </div>
        <Link
          href="/bookmarks/new"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 font-medium text-white hover:bg-blue-700"
        >
          Bookmark toevoegen
        </Link>
      </header>

      <TagFilter selectedTag={tag} bookmarks={data.bookmarks} />
      <BookmarkList bookmarks={data.bookmarks} />
    </div>
  );
}

