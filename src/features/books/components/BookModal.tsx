import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addBook, updateBook } from '../booksSlice';
import type { IBook } from '../types';

interface BookModalProps {
  book?: IBook;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  const dispatch = useAppDispatch();
  const isEditMode = !!book;

  // 使用本地 state 控制受控表单
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    description: '',
  });

  // 如果是编辑模式，回填数据
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        price: book.price.toString(),
        category: book.category,
        description: book.description || '',
      });
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单校验
    if (!formData.title.trim() || !formData.author.trim() || !formData.price || !formData.category.trim()) {
      alert('请填写所有必填字段！');
      return;
    }
    
    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum < 0) {
      alert('请输入有效的价格！');
      return;
    }

    if (isEditMode && book) {
      dispatch(updateBook({
        ...book,
        title: formData.title,
        author: formData.author,
        price: priceNum,
        category: formData.category,
        description: formData.description,
      }));
    } else {
      dispatch(addBook({
        title: formData.title,
        author: formData.author,
        price: priceNum,
        category: formData.category,
        description: formData.description,
      }));
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/80">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditMode ? '📝 编辑图书' : '✨ 新增图书'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">书名 <span className="text-red-500">*</span></label>
            <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500/50 outline-none transition-all" placeholder="例如：React 实战" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">作者 <span className="text-red-500">*</span></label>
            <input name="author" value={formData.author} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500/50 outline-none transition-all" placeholder="例如：张三" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">价格 (¥) <span className="text-red-500">*</span></label>
              <input name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500/50 outline-none transition-all" placeholder="例如：99.9" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">分类 <span className="text-red-500">*</span></label>
              <input name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500/50 outline-none transition-all" placeholder="例如：计算机科学" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">简介</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500/50 outline-none resize-none transition-all" placeholder="选填，简要描述该书内容..." />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2 border text-gray-600 font-medium rounded-md hover:bg-gray-50 transition-colors">取消</button>
            <button type="submit" className="px-5 py-2 bg-blue-600 font-medium text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors">
              {isEditMode ? '保存修改' : '确认添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
