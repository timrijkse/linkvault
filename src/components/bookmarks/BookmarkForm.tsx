'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { Bookmark } from '@/lib/bookmarks/types';

export interface BookmarkFormProps {
  mode: 'create' | 'edit';
  id?: string;
  initial?: Bookmark;
}

function parseTags(value: string) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of value.split(',')) {
    const t = raw.trim().toLowerCase();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    result.push(t);
  }
  return result;
}

export function BookmarkForm({ mode, id, initial }: BookmarkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState(initial?.url ?? '');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(', '));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tags = useMemo(() => parseTags(tagsText), [tagsText]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const payload = { url, title, tags };
    const endpoint = mode === 'create' ? '/api/bookmarks' : `/api/bookmarks/${encodeURIComponent(id ?? '')}`;
    const method = mode === 'create' ? 'POST' : 'PATCH';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { error?: string; bookmark?: Bookmark } | null;
      if (!res.ok) {
        setError(data?.error ?? 'Opslaan mislukt.');
        return;
      }
      const nextId = mode === 'create' ? data?.bookmark?.id : id;
      router.push(nextId ? `/bookmarks/${nextId}` : '/bookmarks');
      router.refresh();
    } catch {
      setError('Opslaan mislukt.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1">
        <span className="text-sm font-medium">URL</span>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950"
          required
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Titel</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mijn favoriete link"
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950"
          required
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Tags (komma-gescheiden)</span>
        <input
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="werk, inspiratie, lezen"
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950"
        />
      </label>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium dark:bg-slate-800">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? 'Opslaan…' : 'Opslaan'}
      </button>
    </form>
  );
}

