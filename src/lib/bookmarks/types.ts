export interface Bookmark {
  id: string;
  url: string;
  title: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkCreateInput {
  url: string;
  title: string;
  tags?: string[];
}

export interface BookmarkUpdateInput {
  url?: string;
  title?: string;
  tags?: string[];
}

