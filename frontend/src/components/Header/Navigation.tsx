import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Activer les animations après un petit délai
    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => clearTimeout(timer);
  }, []);

  const baseClass =
    'px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-white rounded-[20px]';
  const activeClass = 'bg-white text-black border border-white';
  const inactiveClass = 'text-white';

  // Vérifiez si l'URL correspond à '/intro' ou '/signup'
  const isExcludedRoute = location.pathname === '/intro' || location.pathname === '/signup';

  // Si la route actuelle est '/intro' ou '/signup', ne pas afficher le header
  if (isExcludedRoute) {
    return null; // Cela masquera le composant Header sur ces routes
  }

  return (
    <nav className="flex gap-8">
      {/* Lien pour E-commerce */}
      <NavLink
        to=""
        className={({ isActive }) =>
          `${baseClass} ${isActive || location.pathname.startsWith('/e-commerce') ? activeClass : inactiveClass}`
        }
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: `opacity 0.2s ease-out 0s, transform 0.2s ease-out 0s`, // Pas de délai pour E-commerce
        }}
      >
        E-commerce
      </NavLink>

      {/* Autres liens */}
      {['/Investissements', '/Suivi Personnel', '/Assistance'].map((path, index) => (
        <NavLink
          key={index}
          to={path}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.2s ease-out ${0.2 * (index + 1)}s, transform 0.2s ease-out ${0.2 * (index + 1)}s`,
            // Le délai commence à 0.2s pour Investissements, 0.4s pour Suivi Personnel, etc.
          }}
        >
          {path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
        </NavLink>
      ))}
    </nav>
  );
}
