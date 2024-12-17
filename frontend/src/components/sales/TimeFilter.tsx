import React from 'react';

interface TimeFilterProps {
  selected: 'jour' | 'semaine' | 'mois';
  onChange: (period: 'jour' | 'semaine' | 'mois') => void;
}

export function TimeFilter({ selected, onChange }: TimeFilterProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange('jour')}
        className={`px-4 py-1 rounded-full text-sm ${
          selected === 'jour'
            ? 'bg-white text-black'
            : 'text-white border border-white'
        }`}
      >
        Jour
      </button>
      <button
        onClick={() => onChange('semaine')}
        className={`px-4 py-1 rounded-full text-sm ${
          selected === 'semaine'
            ? 'bg-white text-black'
            : 'text-white border border-white'
        }`}
      >
        Semaine
      </button>
      <button
        onClick={() => onChange('mois')}
        className={`px-4 py-1 rounded-full text-sm ${
          selected === 'mois'
            ? 'bg-white text-black'
            : 'text-white border border-white'
        }`}
      >
        Mois
      </button>
    </div>
  );
}