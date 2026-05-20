import React from 'react';
import type { IBook } from '../types';

interface BookItemProps {
  book: IBook;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (book: IBook) => void;
  onDelete: (id: string) => void;
}

export const BookItem: React.FC<BookItemProps> = ({
  book,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all ${isSelected ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200'}`}>
      <div className="flex items-center gap-4 overflow-hidden">
        <input
          type="checkbox"
          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          checked={isSelected}
          onChange={() => onToggleSelect(book.id)}
        />
        <div className="truncate">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {book.author} <span className="mx-1 text-gray-300">|</span> 
            <span className="text-blue-600 font-medium font-mono">¥{book.price.toFixed(2)}</span> 
            <span className="mx-1 text-gray-300">|</span> 
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{book.category}</span>
          </p>
          {book.description && (
            <p className="text-sm text-gray-400 mt-1.5 truncate">{book.description}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0 ml-4">
        <button
          onClick={() => onEdit(book)}
          className="px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
        >
          编辑
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="px-4 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
        >
          删除
        </button>
      </div>
    </div>
  );
};
