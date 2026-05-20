import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addBook, updateBook } from '../booksSlice';
import type { IBook } from '../types';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookModalProps {
  book?: IBook;
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ book, isOpen, onClose }) => {
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
    } else {
      setFormData({
        title: '',
        author: '',
        price: '',
        category: '',
        description: '',
      });
    }
  }, [book, isOpen]);

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? '编辑图书' : '新增图书'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              书名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="例如：React 实战"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">
              作者 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="例如：张三"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                价格 (¥) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="例如：99.9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">
                分类 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="例如：计算机科学"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">简介</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              placeholder="选填，简要描述该书内容..."
            />
          </div>
          
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">取消</Button>
            </DialogClose>
            <Button type="submit">
              {isEditMode ? '保存修改' : '确认添加'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
