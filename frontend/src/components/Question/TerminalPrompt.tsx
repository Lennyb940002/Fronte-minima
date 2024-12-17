import React from 'react';
import { Terminal } from 'lucide-react';

export const TerminalPrompt: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mb-6 flex items-center space-x-2 font-mono">
      <Terminal size={20} className="text-white" />
      <div className="text-white opacity-60">questionnaire@1.0.0 ~</div>
      <div className="text-green-500">$</div>
    </div>
  );
};