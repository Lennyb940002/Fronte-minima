import React, { useState } from 'react';

interface DashboardCardProps {
  title: string;
  image: string;
  imageSurvol: string;
}

export function DashboardCard({ title, image, imageSurvol }: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-black border border-white px-6 py-8 rounded-lg transition-all duration-300 hover:bg-white group cursor-pointer top-10 rounded-[28px]"
      style={{ width: '380px', height: '260px', borderRadius: ' 25px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src={isHovered ? imageSurvol : image}
          alt={title}
          className="w-24 h-24 group-hover:opacity-80"
          style={{ marginTop: '8%' }}
        />
        <h3 className="text-white group-hover:text-black font-medium">{title}</h3>
      </div>
    </div>
  );
}