import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { deleteBook, toggleBookSelection, toggleAllSelection } from '../booksSlice';
import { BookItem } from './BookItem';
import { IBook } from '../types';

export const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookList, selectedBookIds, sortField, sortOrder, searchQuery } = useAppSelector(state => state.books);

  // 派生状态 (Derived State)：根据 Redux 的状态进行过滤和排序
  const filteredAndSortedBooks = [...bookList]
    .filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleEdit = (book: IBook) => {
    // 占位：将在 Phase 4 结合弹窗实现
    alert(`编辑功能将在下个阶段实现！\n您选中了: ${book.title}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这本书吗？')) {
      dispatch(deleteBook(id));
    }
  };

  const isAllSelected = bookList.length > 0 && selectedBookIds.length === bookList.length;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 批量操作工具栏 (仅在有数据时展示) */}
      {bookList.length > 0 && (
        <div className="flex items-center px-4 py-3 bg-gray-50 border rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700 select-none">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={isAllSelected}
              onChange={() => dispatch(toggleAllSelection())}
            />
            全选当前列表 ({selectedBookIds.length}/{bookList.length})
          </label>
        </div>
      )}

      {/* 列表渲染区 */}
      {filteredAndSortedBooks.length === 0 ? (
        <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg bg-gray-50">
          <div className="text-gray-400 mb-2">📚</div>
          <p className="text-gray-500 font-medium">暂无图书数据，或者没有找到匹配的结果</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredAndSortedBooks.map(book => (
            <BookItem
              key={book.id}
              book={book}
              isSelected={selectedBookIds.includes(book.id)}
              onToggleSelect={(id) => dispatch(toggleBookSelection(id))}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
