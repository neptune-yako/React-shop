import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

// 导出强类型的 RootState 和 AppDispatch 供业务组件和 Selector 使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
