import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { formatDate } from '../../utils/dateFormat';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function NoteCard({ id, title, content, createdAt, onDelete, onEdit }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg relative group">
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(id)}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-neutral-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <h3 className="font-medium text-lg text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 mb-3">{content}</p>
      <p className="text-sm text-neutral-400">{formatDate(createdAt)}</p>
    </div>
  );
}