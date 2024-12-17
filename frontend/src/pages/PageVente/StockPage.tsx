// pages/Stock/StockPage.tsx
import React, { useState } from 'react';
import { StatCard } from '../../components/Stock/StatCard';
import { ProductTable } from '../../components/Stock/ProductTable';
import { CriticalStockAlert } from '../../components/Stock/CriticalStockAlert';
import { AddProductModal } from '../../components/Stock/AddProductModal';
import { Product } from '../../types/stock';

export const StockPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apercu' | 'alertes'>('apercu');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([
    {
      title: 'T-Shirt',
      reference: 'Noir/M',
      quantity: 1,
      unitPrice: 7.99,
      totalPrice: 958.80,
      salePrice: 19.99
    },
  ]);

  const criticalStockProducts = lowStockProducts.filter(product => product.quantity <= 5);

  const handleRemoveAlert = (productToRemove: Product) => {
    setLowStockProducts(prevProducts =>
      prevProducts.filter(product =>
        product.title !== productToRemove.title ||
        product.reference !== productToRemove.reference
      )
    );
  };

  const handleAddProduct = (newProduct: Product) => {
    setLowStockProducts(prevProducts => [...prevProducts, {
      ...newProduct,
      totalPrice: Number((newProduct.quantity * newProduct.unitPrice).toFixed(2))
    }]);
    setIsAddProductModalOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen space-y-8 p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'apercu' ? 'bg-blue-600 text-white' : 'border border-white text-white'}`}
            onClick={() => setIsAddProductModalOpen(true)}
          >
            Ajouter du stock
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Produits" value="725" />
        <StatCard title="Valeur Stock" value="13 600,80€" />
        <StatCard title="Commandes en Attente" value="15" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div className="bg-black/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Détails des Produits</h2>
          <ProductTable products={lowStockProducts} />
        </div>

        <div className={`
          rounded-xl p-6 space-y-4 
          ${criticalStockProducts.length > 0
            ? 'bg-red-900/30 border border-red-600'
            : 'bg-black/50 border border-white/10'}
        `}>
          <div className="flex items-center justify-between">
            <h3 className={`
              text-xl font-semibold 
              ${criticalStockProducts.length > 0 ? 'text-red-300' : 'text-white/70'}
            `}>
              {criticalStockProducts.length > 0 ? 'Stocks Critiques' : 'Stocks'}
            </h3>
            {criticalStockProducts.length > 0 && (
              <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                {criticalStockProducts.length}
              </span>
            )}
          </div>

          <CriticalStockAlert
            criticalStockProducts={criticalStockProducts}
            onRemoveAlert={handleRemoveAlert}
          />
        </div>
      </div>

      {activeTab === 'alertes' && (
        <div className="bg-black/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Aucune alerte pour le moment</h2>
          <p className="text-white/70">Tout semble en ordre pour vos stocks.</p>
        </div>
      )}

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};