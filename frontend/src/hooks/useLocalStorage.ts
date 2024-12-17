import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // État pour stocker la valeur
  // Passer la fonction d'initialisation à useState pour que la lecture
  // du localStorage ne se fasse qu'une seule fois au montage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Retourner une version wrappée de la fonction useState's setter qui ...
  // ... persiste la nouvelle valeur dans localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permettre à la valeur d'être une fonction pour avoir la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}