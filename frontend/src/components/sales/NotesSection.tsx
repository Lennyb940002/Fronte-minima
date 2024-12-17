import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NotesSection() {
  const navigate = useNavigate();

  const handleNoteClick = () => {
    navigate('/e-commerce/note');
  };

  return (
    <div
      className="bg-black text-white border border-white rounded-[28px] text-center cursor-pointer hover:opacity-80 transition-opacity"
      style={{ height: '40%' }}
      onClick={handleNoteClick}
    >
      <h3 className="text-white text-lg mb-5 mt-5">Note</h3>
      <div className="flex justify-center items-center h-32">
        <img className="w-24 mb-50" src="/src/image/Note.png" alt="" />
      </div>
    </div>
  );
}