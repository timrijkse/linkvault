import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookmarkForm } from '@/components/bookmarks/BookmarkForm';
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

export default async function EditBookmarkPage({ params }: Params) {
  const { id } = await params;
  const data = await fetchBookmark(id);
  if (!data) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Bookmark wijzigen</h1>
        <Link href={`/bookmarks/${id}`} className="text-sm font-medium text-blue-700 hover:underline">
          Terug
        </Link>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <BookmarkForm mode="edit" id={id} initial={data.bookmark} />
      </div>
    </div>
  );
}

