import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mb-8 font-mono">
      <div className="h-px w-full bg-white/10">
        <div
          className="h-full bg-white/40 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-white/40 text-sm">
        [Progress: {current + 1}/{total}]
      </div>
    </div>
  );
};