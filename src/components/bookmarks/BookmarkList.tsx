import type { Bookmark } from '@/lib/bookmarks/types';
import { BookmarkListItem } from './BookmarkListItem';

export interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        Nog geen bookmarks. Voeg er één toe.
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {bookmarks.map((b) => (
        <BookmarkListItem key={b.id} bookmark={b} />
      ))}
    </ul>
  );
}

