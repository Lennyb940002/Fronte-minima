import { CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <img src="/src/image/logo.png" alt="Logo" className="h-24 w-24" />
      <span className="text-2xl font text-white">Minima</span>
    </Link>
  );
}
