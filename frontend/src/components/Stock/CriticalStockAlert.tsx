// components/Stock/CriticalStockAlert.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Product } from '../../types/stock';

interface CriticalStockAlertProps {
    criticalStockProducts: Product[];
    onRemoveAlert: (product: Product) => void;
}

export const CriticalStockAlert: React.FC<CriticalStockAlertProps> = ({
    criticalStockProducts,
    onRemoveAlert
}) => {
    if (criticalStockProducts.length === 0) {
        return (
            <div className="text-white/70 text-center">
                <p>Aucun stock critique</p>
                <p className="text-sm">Tous les produits sont bien approvisionnés</p>
            </div>
        );
    }

    return (
        <>
            {criticalStockProducts.map((product, index) => (
                <div
                    key={`${product.title}-${product.reference}`}
                    className="bg-black/50 rounded-lg p-4 flex justify-between items-center"
                >
                    <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-white/70">{product.reference}</p>
                        <p className="text-sm text-red-400">Stock: {product.quantity}</p>
                    </div>
                    <button
                        onClick={() => onRemoveAlert(product)}
                        className="bg-red-600 text-white px-1 py-1 rounded-lg flex items-center space-x-0 hover:bg-red-700 transition"
                    >
                        <Trash2 className="w-5 h-5" />
                        <span>Supprimer</span>
                    </button>
                </div>
            ))}
        </>
    );
};