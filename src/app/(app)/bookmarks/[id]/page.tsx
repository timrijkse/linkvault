import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ConfirmDeleteButton } from '@/components/bookmarks/ConfirmDeleteButton';
import { TagFilter } from '@/components/bookmarks/TagFilter';
import type { Bookmark } from '@/lib/bookmarks/types';
import { getBaseUrl } from '@/lib/http/getBaseUrl';

type Params = { params: Promise<{ id: string }> };

async function fetchBookmark(id: string) {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/bookmarks/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch');
  return (await res.json()) as { bookmark: Bookmark };
}

export default async function BookmarkDetailPage({ params }: Params) {
  const { id } = await params;
  const data = await fetchBookmark(id);
  if (!data) notFound();

  const b = data.bookmark;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{b.title}</h1>
          <a className="mt-1 block break-all text-blue-700 hover:underline" href={b.url} target="_blank" rel="noreferrer">
            {b.url}
          </a>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/bookmarks/${b.id}/edit`}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            Wijzigen
          </Link>
          <ConfirmDeleteButton id={b.id} />
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tags</h2>
        <div className="mt-3">
          <TagFilter selectedTag={undefined} bookmarks={[b]} />
        </div>
      </section>
    </div>
  );
}

