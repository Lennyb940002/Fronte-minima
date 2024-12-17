import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Sale } from '../../types/sales';

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sale: Omit<Sale, 'id'>) => void;
}

const initialFormState = {
  product: '',
  quantity: 1,
  salePrice: 0,
  unitCost: 0,
  customer: '',
  paymentMethod: 'cash' as const,
  paymentStatus: 'pending' as const,
  notes: ''
};

export function AddSaleModal({
  isOpen,
  onClose,
  onSubmit
}: AddSaleModalProps) {
  const [formData, setFormData] = useState(initialFormState);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:
        name === 'quantity' ? parseInt(value, 10) :
          name === 'salePrice' || name === 'unitCost' ? parseFloat(value) :
            value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSale: Omit<Sale, 'id'> = {
      ...formData,
      saleDate: new Date().toISOString()
    };

    onSubmit(newSale);
    onClose();
    setFormData(initialFormState); // Reset form after submission
    console.log("INITIALFORMSTATE => ", initialFormState);

  };


  const sendData = async () => {
    console.log(formData);
    const req = await fetch('http://localhost:3001/api/sales', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, client: formData.customer }),
    })
    const data = await req.json();
    onClose();
    console.log(data);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Nouvelle Vente</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Produit
            </label>
            <input
              type="text"
              name="product"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.product}
              onChange={handleChange}
              placeholder="Nom du produit"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Quantité
              </label>
              <input
                type="number"
                name="quantity"
                required
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prix de vente
              </label>
              <input
                type="number"
                name="salePrice"
                required
                min="0"
                step="0.01"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Coût unitaire
            </label>
            <input
              type="number"
              name="unitCost"
              required
              min="0"
              step="0.01"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.unitCost}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Client (Optionnel)
            </label>
            <input
              type="text"
              name="customer"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Nom du client"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Mode de paiement
              </label>
              <select
                name="paymentMethod"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="cash">Espèces</option>
                <option value="card">Carte</option>
                <option value="transfer">Virement</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Statut du paiement
              </label>
              <select
                name="paymentStatus"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option value="pending">En attente</option>
                <option value="completed">Effectué</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Notes (Optionnel)
            </label>
            <textarea
              name="notes"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes supplémentaires"
            />
          </div>

          <button
            type="button"
            onClick={sendData}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Ajouter la vente
          </button>
        </form>
      </div>
    </div>
  );
}