// pages/TablePage.tsx
import React from 'react';
import { Sale } from '../../types/sales';
import { SalesTable } from '../../components/SalesTable/SalesTable';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function TablePage() {
  const [sales, setSales] = useLocalStorage<Sale[]>('sales', []);

  const handleAddSale = (newSale: Omit<Sale, 'id'>) => {
    setSales(prev => [...prev, { ...newSale, id: crypto.randomUUID() }]);
  };

  const handleDeleteSale = (id: string) => {
    setSales(prev => prev.filter(sale => sale.id !== id));
  };

  return (
    <div className="min-h-screen bg-black">
      <SalesTable
        sales={sales}
        onAddSale={handleAddSale}
        onDeleteSale={handleDeleteSale}
      />
    </div>
  );
}