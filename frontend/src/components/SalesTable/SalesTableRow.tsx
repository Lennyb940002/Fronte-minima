import React from 'react';
import { Trash } from 'lucide-react';

interface SalesTableRowProps {
  sale: {
    id: string;
    product: string;
    quantity: number;
    salePrice: number;
    unitCost: number;
    saleDate: string;
    client: string;
    paymentMethod: 'cash' | 'card' | 'transfer';
    paymentStatus: 'completed' | 'pending' | 'cancelled';
    notes?: string;
  };
  index?: number;
  onDelete: (id: string) => void;
}

export function SalesTableRow({ sale, index = 0, onDelete }: SalesTableRowProps) {
  const margin =
    sale.salePrice && sale.unitCost && sale.quantity
      ? ((sale.salePrice - sale.unitCost * sale.quantity) /
        (sale.unitCost * sale.quantity) *
        100
      ).toFixed(2)
      : '0.00';

  const statusColors: Record<'completed' | 'pending' | 'cancelled', string> = {
    completed: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  const statusTranslations: Record<'completed' | 'pending' | 'cancelled', string> = {
    completed: 'Effectué',
    pending: 'En attente',
    cancelled: 'Annulé',
  };

  const paymentMethodTranslations: Record<'cash' | 'card' | 'transfer', string> = {
    cash: 'Espèces',
    card: 'Carte',
    transfer: 'Virement',
  };

  return (
    <tr
      className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-black/5' : 'bg-black/10'
        } hover:bg-white/10 group`}
    >
      <td className="px-4 py-3">{sale.product || 'N/A'}</td>
      <td className="px-4 py-3 text-center">{sale.quantity || 0}</td>
      <td className="px-4 py-3 text-right">{(sale.salePrice || 0).toFixed(2)} €</td>
      <td className="px-4 py-3 text-right">{(sale.unitCost || 0).toFixed(2)} €</td>
      <td className="px-4 py-3 text-right">{margin}%</td>
      <td className="px-4 py-3">
        {sale.saleDate
          ? new Date(sale.saleDate).toLocaleDateString('fr-FR')
          : 'Date non définie'}
      </td>
      <td className="px-4 py-3">{sale.client || '-'}</td>
      <td className="px-4 py-3">{paymentMethodTranslations[sale.paymentMethod] || 'N/A'}</td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[sale.paymentStatus] || ''
            }`}
        >
          {statusTranslations[sale.paymentStatus] || 'Statut inconnu'}
        </span>
      </td>
      <td className="px-4 py-3">{sale.notes || '-'}</td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onDelete(sale.id)}
          className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash size={18} />
        </button>
      </td>
    </tr>
  );
}