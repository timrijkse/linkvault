'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface ConfirmDeleteButtonProps {
  id: string;
}

export function ConfirmDeleteButton({ id }: ConfirmDeleteButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onDelete() {
    const ok = window.confirm('Weet je zeker dat je deze bookmark wilt verwijderen?');
    if (!ok) return;

    setPending(true);
    try {
      const res = await fetch(`/api/bookmarks/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) return;
      router.push('/bookmarks');
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={pending}
      className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
    >
      {pending ? 'Verwijderen…' : 'Verwijderen'}
    </button>
  );
}

