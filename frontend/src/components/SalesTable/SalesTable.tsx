import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SalesTableRow } from './SalesTableRow';
import { AddSaleModal } from './AddSaleModal';

interface Sale {
  _id: string;
  product: string;
  quantity: number;
  salePrice: number;
  unitCost: number;
  date: string;
  client: string;
  paymentMethod: string;
  paymentStatus: string;
  notes?: string;
}

export function SalesTable() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);

  // Constantes pour les calculs de ventes
  const {
    totalQuantity,
    totalSales,
    totalCosts,
    totalMargin,
    totalMarginPercentage
  } = React.useMemo(() => {
    const quantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const salesValue = sales.reduce((sum, sale) => sum + sale.salePrice * sale.quantity, 0);
    const costsValue = sales.reduce((sum, sale) => sum + sale.unitCost * sale.quantity, 0);
    const margin = salesValue - costsValue;

    return {
      totalQuantity: quantity,
      totalSales: salesValue,
      totalCosts: costsValue,
      totalMargin: margin,
      totalMarginPercentage: salesValue && costsValue
        ? ((margin / salesValue) * 100).toFixed(2)
        : '0.00'
    };
  }, [sales]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/sales');
        setSales(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/sales/${id}`);
      setSales((prevSales) => prevSales.filter((sale) => sale._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression de la vente');
    }
  };

  const handleAddSale = async (newSale: Omit<Sale, '_id'>) => {
    try {
      const response = await axios.post('http://localhost:3001/api/sales', newSale);
      setSales((prevSales) => [response.data, ...prevSales]);
      setIsAddSaleModalOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de l\'ajout de la vente');
    }
  };

  if (loading) return <p className='text-white'>Chargement...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ventes</h1>
        <button
          onClick={() => setIsAddSaleModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2"
        >
          <span>Ajouter Vente</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-white mt-5">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix de vente</th>
              <th>Coût unitaire</th>
              <th>Marge</th>
              <th>Date</th>
              <th>Client</th>
              <th>Méthode de paiement</th>
              <th>Statut</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <SalesTableRow
                key={sale._id}
                sale={{
                  ...sale,
                  id: sale._id,
                  saleDate: sale.date,
                  paymentMethod: sale.paymentMethod as 'cash' | 'card' | 'transfer',
                  paymentStatus: sale.paymentStatus as 'completed' | 'pending' | 'cancelled',
                }}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-black text-white font-bold">
              <td className="p-4 text-center">Totaux</td>
              <td className="p-4 text-center">{totalQuantity}</td>
              <td className="p-4 text-center">{totalSales.toFixed(2)} €</td>
              <td className="p-4 text-center">{totalCosts.toFixed(2)} €</td>
              <td className="p-4 text-center">{totalMarginPercentage}%</td>
              <td className="p-4 text-center">-</td>
              <td className="p-4 text-center">-</td>
              <td className="p-4 text-center">-</td>
              <td className="p-4 text-center">-</td>
              <td className="p-4 text-center">-</td>
              <td className="p-4 text-center">-</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <AddSaleModal
        isOpen={isAddSaleModalOpen}
        onClose={() => setIsAddSaleModalOpen(false)}
        onSubmit={handleAddSale}
      />
    </div>
  );
}