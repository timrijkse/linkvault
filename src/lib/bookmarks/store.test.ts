import { describe, expect, it, vi } from 'vitest';

async function freshStore() {
  vi.resetModules();
  return await import('./store');
}

describe('bookmark tag filtering', () => {
  it('Filteren op een bestaande tag werkt', async () => {
    const { createBookmark, listBookmarks } = await freshStore();

    const a = createBookmark({ url: 'https://example.com/a', title: 'A', tags: ['werk'] });
    const b = createBookmark({ url: 'https://example.com/b', title: 'B', tags: ['lezen'] });
    const c = createBookmark({ url: 'https://example.com/c', title: 'C', tags: ['werk', 'lezen'] });

    const filtered = listBookmarks({ tag: 'werk' });

    expect(filtered.map((x) => x.id).sort()).toEqual([a.id, c.id].sort());
    expect(filtered.every((x) => x.tags.includes('werk'))).toBe(true);
    expect(filtered.some((x) => x.id === b.id)).toBe(false);
  });

  it("'Alles' toont alle bookmarks", async () => {
    const { createBookmark, listBookmarks } = await freshStore();

    const a = createBookmark({ url: 'https://example.com/a', title: 'A', tags: ['werk'] });
    const b = createBookmark({ url: 'https://example.com/b', title: 'B', tags: ['lezen'] });

    expect(listBookmarks().map((x) => x.id).sort()).toEqual([a.id, b.id].sort());
    expect(listBookmarks({ tag: undefined }).map((x) => x.id).sort()).toEqual([a.id, b.id].sort());
    expect(listBookmarks({ tag: '' }).map((x) => x.id).sort()).toEqual([a.id, b.id].sort());
    expect(listBookmarks({ tag: '   ' }).map((x) => x.id).sort()).toEqual([a.id, b.id].sort());
  });

  it('Case-insensitive filtering werkt', async () => {
    const { createBookmark, listBookmarks } = await freshStore();

    const a = createBookmark({ url: 'https://example.com/a', title: 'A', tags: ['Werk'] });
    const b = createBookmark({ url: 'https://example.com/b', title: 'B', tags: ['WERK'] });
    const c = createBookmark({ url: 'https://example.com/c', title: 'C', tags: ['lezen'] });

    const filtered = listBookmarks({ tag: 'wErK' });

    expect(filtered.map((x) => x.id).sort()).toEqual([a.id, b.id].sort());
    expect(filtered.some((x) => x.id === c.id)).toBe(false);
  });
});

