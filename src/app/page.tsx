import Link from 'next/link';

export default function Home() {
  // #region agent log
  console.log('[debug 805e02] src/app/page.tsx rendered (LinkVault home)');
  // #endregion

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <main className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold tracking-tight">LinkVault</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Beheer je bookmarks met tags. Alles wordt in-memory opgeslagen (geen database).
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/bookmarks"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 font-medium text-white hover:bg-blue-700"
          >
            Naar mijn bookmarks
          </Link>
          <Link
            href="/bookmarks/new"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 font-medium text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
          >
            Bookmark toevoegen
          </Link>
        </div>
      </main>
    </div>
  );
}

