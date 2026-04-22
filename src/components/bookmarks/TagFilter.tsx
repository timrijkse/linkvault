import Link from 'next/link';
import type { Bookmark } from '@/lib/bookmarks/types';

export interface TagFilterProps {
  selectedTag?: string;
  bookmarks: Bookmark[];
}

function uniqueTags(bookmarks: Bookmark[]) {
  const s = new Set<string>();
  for (const b of bookmarks) for (const t of b.tags) s.add(t);
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

export function TagFilter({ selectedTag, bookmarks }: TagFilterProps) {
  const tags = uniqueTags(bookmarks);
  const normalizedSelectedTag = selectedTag?.trim().toLowerCase() || undefined;
  if (tags.length === 0 && !normalizedSelectedTag) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Filter:</span>
      <Link
        href="/bookmarks"
        className={`rounded-full px-3 py-1 text-sm font-medium ${
          normalizedSelectedTag
            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Alles
      </Link>
      {tags.map((t) => {
        const active = normalizedSelectedTag === t;
        return (
          <Link
            key={t}
            href={`/bookmarks?tag=${encodeURIComponent(t)}`}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              active
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t}
          </Link>
        );
      })}
    </div>
  );
}

