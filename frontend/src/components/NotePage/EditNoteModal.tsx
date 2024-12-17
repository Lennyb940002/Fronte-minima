import React from 'react';
import { X } from 'lucide-react';

interface EditNoteModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSave: () => void;
}

export function EditNoteModal({
  isOpen,
  title,
  content,
  onClose,
  onTitleChange,
  onContentChange,
  onSave,
}: EditNoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-white">{title ? 'Modifier Note' : 'Créer Note'}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Titre"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Contenu de la note"
          rows={6}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 resize-none mt-4"
        />

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onSave}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
