import React from 'react';
import { Question } from '../types/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="w-full max-w-2xl font-mono">
      <h2 className="text-xl text-white mb-6 border-b border-white/10 pb-4">
        <span className="text-green-500">&gt;</span> {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left px-4 py-3 
                     bg-black hover:bg-white/5
                     transition-colors duration-200 
                     text-white font-mono
                     border border-white/10 hover:border-white/30
                     flex items-center space-x-3"
          >
            <span className="text-white/40">{index + 1}.</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};