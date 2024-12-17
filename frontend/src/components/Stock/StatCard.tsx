// components/Stock/StatCard.tsx
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
    <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
        <p className="text-white/70 mb-2">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
    </div>
);