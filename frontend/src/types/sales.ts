// types/sales.ts
export interface Sale {
  id: string;
  product: string;
  quantity: number;
  salePrice: number;
  unitCost: number;
  saleDate: string;
  customer?: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
  paymentStatus: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

export interface SalesTableProps {
  sales: Sale[];
  onAddSale: (sale: Omit<Sale, 'id'>) => void;
  onDeleteSale: (id: string) => void;
}