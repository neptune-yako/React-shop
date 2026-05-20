import React from 'react';
import { BookOpen } from "lucide-react";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { deleteBook, toggleBookSelection, toggleAllSelection } from '../booksSlice';
import { BookItem } from './BookItem';
import type { IBook } from '../types';

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BookListProps {
  onEditClick: (book: IBook) => void;
}

export const BookList: React.FC<BookListProps> = ({ onEditClick }) => {
  const dispatch = useAppDispatch();
  const { bookList, selectedBookIds, sortField, sortOrder, searchQuery } = useAppSelector(state => state.books);

  // 派生状态 (Derived State)
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

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这本书吗？')) {
      dispatch(deleteBook(id));
    }
  };

  const isAllSelected = bookList.length > 0 && selectedBookIds.length === bookList.length;

  return (
    <div className="flex flex-col gap-4">
      {/* 批量操作工具栏 (仅在有数据时展示) */}
      {bookList.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="select-all"
                checked={isAllSelected}
                onCheckedChange={() => dispatch(toggleAllSelection())}
              />
              <Label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                全选当前列表 ({selectedBookIds.length}/{bookList.length})
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 列表渲染区 */}
      {filteredAndSortedBooks.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">暂无图书数据，或者没有找到匹配的结果</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredAndSortedBooks.map(book => (
            <BookItem
              key={book.id}
              book={book}
              isSelected={selectedBookIds.includes(book.id)}
              onToggleSelect={(id) => dispatch(toggleBookSelection(id))}
              onEdit={onEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
