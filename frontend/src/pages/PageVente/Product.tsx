import React, { useState, useEffect } from 'react';
import { Trash, Edit, Plus, User } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    status: 'draft' | 'in-progress' | 'validated' | 'rejected';
    totalScore: number;
    tags: string[];
}

// Hook personnalisé pour le stockage local
const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};

// Composant Modal pour créer ou éditer un produit
const ProductModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: Product) => void;
    initialData?: Partial<Product>;
}> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [productData, setProductData] = useState<Partial<Product>>(initialData || { status: 'draft', tags: [] });

    useEffect(() => {
        if (initialData) setProductData(initialData);
    }, [initialData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-white/10">
                <h2 className="text-3xl font-semibold text-white mb-6">
                    {initialData ? 'Modifier Produit' : 'Créer Produit'}
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nom du Produit"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.name || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.category || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, category: e.target.value }))}
                    >
                        <option className='text-black' value="">Sélectionner une Catégorie</option>
                        <option className='text-black' value="tech">Technologie</option>
                        <option className='text-black' value="fashion">Mode</option>
                        <option className='text-black' value="home">Maison</option>
                    </select>
                    <textarea
                        placeholder="Description du Produit"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white h-32"
                        value={productData.description || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.status || 'draft'}
                        onChange={(e) =>
                            setProductData((prev) => ({ ...prev, status: e.target.value as Product['status'] }))
                        }
                    >
                        <option className='text-black' value="draft">Brouillon</option>
                        <option className='text-black' value="in-progress">En Cours</option>
                        <option className='text-black' value="validated">Validé</option>
                        <option className='text-black' value="rejected">Rejeté</option>
                    </select>
                    <div className="flex space-x-4">
                        <button
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                            onClick={() => {
                                if (productData.name && productData.category) {
                                    onSubmit({
                                        id: initialData?.id || Date.now(),
                                        totalScore: 0,
                                        tags: productData.tags || [],
                                        ...productData,
                                    } as Product);
                                    onClose();
                                } else {
                                    alert('Veuillez remplir tous les champs obligatoires.');
                                }
                            }}
                        >
                            {initialData ? 'Sauvegarder' : 'Créer'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant Principal
const ProductApp: React.FC = () => {
    const [products, setProducts] = useLocalStorage<Product[]>('products', []);
    const [filters, setFilters] = useState({ category: '', status: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const handleCreateOrUpdate = (product: Product) => {
        if (productToEdit) {
            setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
        } else {
            setProducts((prev) => [product, ...prev]);
        }
        setProductToEdit(null);
    };

    const handleDelete = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const filteredProducts = products.filter((product) =>
        (!filters.category || product.category === filters.category) &&
        (!filters.status || product.status === filters.status)
    );

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Header */}
            <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Product Lab</h1>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={16} />
                    <span>Créer Produit</span>
                </button>
            </header>

            {/* Filtres */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-4xl mx-auto mt-8">
                <div className="flex space-x-4">
                    <select
                        className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-Black"
                        onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                    >
                        <option value="">Toutes Catégories</option>
                        <option value="tech">Technologie</option>
                        <option value="fashion">Mode</option>
                        <option value="home">Maison</option>
                    </select>
                    <select
                        className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-white"
                        onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                    >
                        <option value="">Tous Statuts</option>
                        <option value="draft">Brouillon</option>
                        <option value="in-progress">En Cours</option>
                        <option value="validated">Validé</option>
                        <option value="rejected">Rejeté</option>
                    </select>
                </div>
            </div>

            {/* Produits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <div className="flex space-x-2">
                                <button
                                    className="hover:bg-white/10 p-1 rounded-full"
                                    onClick={() => {
                                        setProductToEdit(product);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    className="hover:bg-white/10 p-1 rounded-full"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-white/70 mt-2">{product.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${{
                                draft: 'bg-gray-500/20 text-gray-400',
                                'in-progress': 'bg-yellow-500/20 text-yellow-400',
                                validated: 'bg-green-500/20 text-green-400',
                                rejected: 'bg-red-500/20 text-red-400',
                            }[product.status]}`}>
                                {product.status}
                            </span>
                            <span className="text-sm text-white/50">{product.category}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setProductToEdit(null);
                }}
                onSubmit={handleCreateOrUpdate}
                initialData={productToEdit || undefined}
            />
        </div>
    );
};

export default ProductApp;
