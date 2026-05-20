export interface IBook {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description?: string;
  createdAt: string; // ISO 8601 string
}

export type SortField = 'createdAt' | 'price' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface BooksState {
  bookList: IBook[];
  selectedBookIds: string[]; // 用于批量删除
  sortField: SortField;
  sortOrder: SortOrder;
  searchQuery: string; // 用于模糊搜索
}
