import Link from 'next/link';
import type { Bookmark } from '@/lib/bookmarks/types';

export interface BookmarkListItemProps {
  bookmark: Bookmark;
}

export function BookmarkListItem({ bookmark }: BookmarkListItemProps) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link href={`/bookmarks/${bookmark.id}`} className="font-medium hover:underline">
            {bookmark.title}
          </Link>
          <a
            className="mt-1 block truncate text-sm text-blue-700 hover:underline"
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            title={bookmark.url}
          >
            {bookmark.url}
          </a>
        </div>
        <Link
          href={`/bookmarks/${bookmark.id}/edit`}
          className="shrink-0 text-sm font-medium text-slate-700 hover:underline dark:text-slate-200"
        >
          Wijzigen
        </Link>
      </div>
      {bookmark.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {bookmark.tags.map((t) => (
            <Link
              key={t}
              href={`/bookmarks?tag=${encodeURIComponent(t)}`}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {t}
            </Link>
          ))}
        </div>
      ) : null}
    </li>
  );
}

