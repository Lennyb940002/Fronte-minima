import React from 'react';
import { Plus } from 'lucide-react';

interface NoteInputProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onAddNote: () => void;
}

export function NoteInput({ title, content, onTitleChange, onContentChange, onAddNote }: NoteInputProps) {
  return (
    <div className="fixed bottom-6 left-0 right-0 bg-black p-6">
      {/* Le parent contenant est déplacé légèrement du bas avec `bottom-6` */}
      <div className="max-w-5xl mx-auto flex items-center gap-6">
        {/* Agrandir les champs d'entrée */}
        <input
          type="text"
          placeholder="Titre de la note"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-56 bg-black border border-white text-white rounded-[28px] px-6 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-700"
        />
        <input
          type="text"
          placeholder="Contenu de la note"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="flex-1 bg-black border border-white text-white rounded-[28px] px-6 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-700"
        />

        {/* Agrandir légèrement le bouton */}
        <button
          onClick={onAddNote}
          className="bg-white text-black px-4 py-3 rounded-[20px] hover:bg-neutral-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
