import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortOrder, setSearchQuery, deleteBooks } from '@/features/books/booksSlice';
import { SortField, SortOrder } from '@/features/books/types';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, selectedBookIds } = useAppSelector(state => state.books);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
    dispatch(setSortOrder({ field, order }));
  };

  const handleBatchDelete = () => {
    if (selectedBookIds.length === 0) return;
    if (window.confirm(`即将永久删除选中的 ${selectedBookIds.length} 本图书，确定吗？`)) {
      dispatch(deleteBooks(selectedBookIds));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 mb-6 border-b">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">在线图书管理</h1>
        <p className="text-sm text-gray-500 mt-1">基于 Redux Toolkit 的纯前端数据流演示</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        {/* 搜索框 */}
        <div className="relative flex-1 lg:flex-none lg:w-56">
          <input
            type="text"
            placeholder="输入书名搜索..."
            className="w-full pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
        
        {/* 排序下拉 */}
        <select
          onChange={handleSortChange}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm text-gray-700 cursor-pointer"
          defaultValue="createdAt-desc"
        >
          <option value="createdAt-desc">最新添加优先</option>
          <option value="createdAt-asc">最早添加优先</option>
          <option value="price-desc">价格从高到低</option>
          <option value="price-asc">价格从低到高</option>
        </select>

        {/* 批量删除按钮 (动态显隐) */}
        {selectedBookIds.length > 0 && (
          <button
            onClick={handleBatchDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow"
          >
            删除选中 ({selectedBookIds.length})
          </button>
        )}

        {/* 新增按钮 */}
        <button
          onClick={() => alert('新增弹窗将在 Phase 4 中实现！')}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm hover:shadow flex items-center gap-2"
        >
          <span>+</span> 添加书籍
        </button>
      </div>
    </div>
  );
};
