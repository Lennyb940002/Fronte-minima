import React, { useState } from 'react';
import { NoteCard } from '../../components/NotePage/NoteCard';
import { NoteInput } from '../../components/NotePage/NoteInput';
import { EditNoteModal } from '../../components/NotePage/EditNoteModal';
import type { Note } from '../../types/note';

export function NotePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const addNote = () => {
    if (!content.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title.trim() || 'Untitled',
      content: content.trim(),
      createdAt: new Date(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setTitle('');
    setContent('');
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const startEditing = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setEditTitle(noteToEdit.title);
      setEditContent(noteToEdit.content);
      setIsEditModalOpen(true);
    }
  };

  const saveEdit = () => {
    if (!editingNote) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === editingNote.id
          ? {
            ...note,
            title: editTitle.trim() || 'Untitled',
            content: editContent.trim(),
          }
          : note
      )
    );

    setIsEditModalOpen(false);
    setEditingNote(null);
    setEditTitle('');
    setEditContent('');
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingNote(null);
    setEditTitle('');
    setEditContent('');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              createdAt={note.createdAt}
              onDelete={deleteNote}
              onEdit={startEditing}
            />
          ))}
        </div>
      </div>

      <NoteInput
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onAddNote={addNote}
      />

      <EditNoteModal
        isOpen={isEditModalOpen}
        title={editTitle}
        content={editContent}
        onClose={closeEditModal}
        onTitleChange={setEditTitle}
        onContentChange={setEditContent}
        onSave={saveEdit}
      />
    </div>
  );
}