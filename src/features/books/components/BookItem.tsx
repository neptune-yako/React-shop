import React from 'react';
import { Pencil, Trash2 } from "lucide-react";
import type { IBook } from '../types';

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <Card className={`transition-all hover:shadow-md ${isSelected ? 'border-primary bg-primary/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-hidden flex-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(book.id)}
              className="flex-shrink-0"
            />
            <div className="truncate min-w-0">
              <h3 className="text-lg font-semibold truncate">{book.title}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-sm text-muted-foreground">{book.author}</span>
                <span className="text-muted-foreground">·</span>
                <Badge variant="secondary" className="font-mono">
                  ¥{book.price.toFixed(2)}
                </Badge>
                <Badge variant="outline">{book.category}</Badge>
              </div>
              {book.description && (
                <p className="text-sm text-muted-foreground mt-2 truncate">{book.description}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(book)}
              className="gap-1"
            >
              <Pencil className="h-3.5 w-3.5" />
              编辑
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(book.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1"
            >
              <Trash2 className="h-3.5 w-3.5" />
              删除
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
