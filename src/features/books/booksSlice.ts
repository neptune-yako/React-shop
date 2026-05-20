import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { IBook, BooksState, SortField, SortOrder } from './types';

const initialState: BooksState = {
    bookList: [
        {
            id: uuidv4(),
            title: 'React 进阶之路',
            author: '前端老鸟',
            price: 68.5,
            category: '前端开发',
            description: '深入浅出 React 原理，企业级开发必备',
            createdAt: new Date('2023-01-01').toISOString(),
        },
        {
            id: uuidv4(),
            title: 'TypeScript 实战',
            author: '类型体操大师',
            price: 88.0,
            category: '前端开发',
            description: '掌握 TS 核心概念，杜绝 AnyScript',
            createdAt: new Date('2023-05-12').toISOString(),
        },
    ],
    selectedBookIds: [],
    sortField: 'createdAt',
    sortOrder: 'desc',
    searchQuery: '',
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        // 新增图书 (自动生成 id 和 createdAt)
        addBook: (state, action: PayloadAction<IBook>) => {
            state.bookList.push({
                ...action.payload,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
            });
        },
        // 更新图书信息
        updateBook: (state, action: PayloadAction<IBook>) => {
            const index = state.bookList.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.bookList[index] = action.payload;
            }
        },
        // 删除单本图书
        deleteBook: (state, action: PayloadAction<string>) => {
            state.bookList = state.bookList.filter(b => b.id !== action.payload);
            // 同步清理选中状态，防止冗余数据
            state.selectedBookIds = state.selectedBookIds.filter(id => id !== action.payload);
        },
        // 批量删除
        deleteBooks: (state, action: PayloadAction<string[]>) => {
            state.bookList = state.bookList.filter(b => !action.payload.includes(b.id));
            state.selectedBookIds = []; // 批量删除后自动清空选中态
        },
        // 切换单本图书选中状态
        toggleBookSelection: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.selectedBookIds.includes(id)) {
                state.selectedBookIds = state.selectedBookIds.filter(selectedId => selectedId !== id);
            } else {
                state.selectedBookIds.push(id);
            }
        },
        // 全选/取消全选
        toggleAllSelection: (state) => {
            if (state.selectedBookIds.length === state.bookList.length && state.bookList.length > 0) {
                state.selectedBookIds = [];
            } else {
                state.selectedBookIds = state.bookList.map(b => b.id);
            }
        },
        // 设置排序规则
        setSortOrder: (state, action: PayloadAction<{ field: SortField; order: SortOrder }>) => {
            state.sortField = action.payload.field;
            state.sortOrder = action.payload.order;
        },
        // 设置搜索关键字
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const {
    addBook,
    updateBook,
    deleteBook,
    deleteBooks,
    toggleBookSelection,
    toggleAllSelection,
    setSortOrder,
    setSearchQuery,
} = booksSlice.actions;

export default booksSlice.reducer;
