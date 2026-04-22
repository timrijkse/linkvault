import Link from 'next/link';
import { BookmarkForm } from '@/components/bookmarks/BookmarkForm';

export default function NewBookmarkPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Nieuwe bookmark</h1>
        <Link href="/bookmarks" className="text-sm font-medium text-blue-700 hover:underline">
          Terug naar lijst
        </Link>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <BookmarkForm mode="create" />
      </div>
    </div>
  );
}

