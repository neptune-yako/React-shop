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
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border">
        <div className="p-6 sm:p-8">
          <Header onAddClick={handleOpenAddModal} />
          <BookList onEditClick={handleOpenEditModal} />
        </div>
      </div>
      
      <BookModal 
        book={editingBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default App;
