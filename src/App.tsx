import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { BookList } from '@/features/books/components/BookList';
import { BookModal } from '@/features/books/components/BookModal';
import type { IBook } from '@/features/books/types';

const App: React.FC = () => {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<IBook | undefined>(undefined);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingBook(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book: IBook) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 relative z-10">
        <div className="p-6 sm:p-8">
          <Header onAddClick={handleOpenAddModal} />
          <BookList onEditClick={handleOpenEditModal} />
        </div>
      </div>
      
      {/* 弹窗渲染：由于挂在在顶层，可以不受列表滚动和容器影响 */}
      {isModalOpen && (
        <BookModal 
          book={editingBook} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default App;
