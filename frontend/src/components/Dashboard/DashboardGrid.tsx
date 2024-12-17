import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardCard } from './DashboardCard';
import { DASHBOARD_SECTIONS } from './dashboardConfig';

export const DashboardGrid: React.FC = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Déclenche l'animation après un court délai pour assurer le rendu initial
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 
                gap-5 p-6 
                transition-all duration-1000 ease-out
                ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'}
            `}
            style={{
                width: '1250px',
                marginLeft: '5%',
                marginTop: '7.5%'
            }}
        >
            {DASHBOARD_SECTIONS.map((section, index) => (
                <div
                    key={section.title}
                    onClick={() => navigate(section.path)}
                    className={`
                        w-3/4 mx-auto cursor-pointer
                        transition-all duration-700 ease-out delay-${index * 100}
                        ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'}
                    `}
                >
                    <DashboardCard
                        title={section.title}
                        image={section.imageBlanc}
                        imageSurvol={section.imageNoir}
                    />
                </div>
            ))}
        </div>
    );
};