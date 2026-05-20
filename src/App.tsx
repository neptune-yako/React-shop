import React from 'react';
import { Header } from '@/components/Header';
import { BookList } from '@/features/books/components/BookList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="p-6 sm:p-8">
          <Header />
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default App;
