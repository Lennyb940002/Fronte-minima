// components/Stock/ProductTable.tsx
import React from 'react';
import { Product } from '../../types/stock';

interface ProductTableProps {
    products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => (
    <table className="w-full">
        <thead>
            <tr className="border-b border-white/10">
                <th className="text-left py-2">Produit</th>
                <th className="text-left py-2">Référence</th>
                <th className="text-right py-2">Quantité</th>
                <th className="text-right py-2">Prix Unitaire</th>
                <th className="text-right py-2">Prix Total</th>
                <th className="text-right py-2">Prix de Vente</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (
                <tr key={index} className="border-b border-white/10 last:border-b-0">
                    <td className="py-2">{product.title}</td>
                    <td className="py-2">{product.reference}</td>
                    <td className="text-right py-2">{product.quantity}</td>
                    <td className="text-right py-2">{product.unitPrice}€</td>
                    <td className="text-right py-2">{product.totalPrice}€</td>
                    <td className="text-right py-2">{product.salePrice}€</td>
                </tr>
            ))}
        </tbody>
    </table>
);