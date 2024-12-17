import React, { useState } from 'react';
import { X } from 'lucide-react';

const initialFormState = {
    product: '',
    reference: '',
    customReference: '',
    quantity: 1,
    unitPrice: 0,
    salePrice: 0
};

export function AddProductModal({
    isOpen,
    onClose,
    onSubmit
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: typeof initialFormState) => void;
}) {
    const [formData, setFormData] = useState(initialFormState);
    const [referenceType, setReferenceType] = useState<'auto' | 'custom'>('auto');

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:
                ['quantity', 'unitPrice', 'salePrice'].includes(name) ? parseFloat(value) : value
        }));
    };

    const handleReferenceTypeChange = (type: 'auto' | 'custom') => {
        setReferenceType(type);
        setFormData(prev => ({
            ...prev,
            reference: type === 'auto' ? generateAutoReference() : '',
            customReference: type === 'custom' ? prev.customReference : ''
        }));
    };

    const generateAutoReference = () => {
        return `REF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalProduct = {
            ...formData,
            reference: referenceType === 'auto'
                ? generateAutoReference()
                : formData.customReference
        };

        onSubmit(finalProduct);
        onClose();
        setFormData(initialFormState);
        setReferenceType('auto');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Nouveau Produit</h2>
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
                        <label className="block text-sm font-medium text-white mb-1">Produit</label>
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
                            <label className="block text-sm font-medium text-gray-300 mb-1">Type de Référence</label>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => handleReferenceTypeChange('auto')}
                                    className={`px-4 py-2 rounded-xl transition ${referenceType === 'auto'
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-white/10 text-white/70 hover:bg-white/10'}`}
                                >
                                    Automatique
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleReferenceTypeChange('custom')}
                                    className={`px-4 py-2 rounded-xl transition ${referenceType === 'custom'
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-white/10 text-white/70 hover:bg-white/10'}`}
                                >
                                    Personnalisé
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {referenceType === 'auto' ? 'Référence Générée' : 'Référence Personnalisée'}
                            </label>
                            <input
                                type="text"
                                name={referenceType === 'auto' ? 'reference' : 'customReference'}
                                required
                                readOnly={referenceType === 'auto'}
                                className={`w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white 
                  ${referenceType === 'auto' ? 'cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                                value={referenceType === 'auto' ? generateAutoReference() : formData.customReference}
                                onChange={handleChange}
                                placeholder={referenceType === 'auto' ? 'Généré automatiquement' : 'Saisissez une référence'}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Quantité</label>
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
                            <label className="block text-sm font-medium text-gray-300 mb-1">Prix Unitaire</label>
                            <input
                                type="number"
                                name="unitPrice"
                                required
                                min="0"
                                step="0.01"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.unitPrice}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Prix de Vente</label>
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Ajouter le Produit
                    </button>
                </form>
            </div>
        </div>
    );
}