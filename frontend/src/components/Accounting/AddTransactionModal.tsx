import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const AddTransactionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'revenus' | 'dépenses'>('revenus');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = {
      type,
      amount: parseFloat(amount),
      date,
      description
    };

    // Ici, vous ajouteriez la logique pour enregistrer la transaction
    console.log('Transaction ajoutée :', transaction);

    // Réinitialiser le formulaire
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200"
      >
        <Plus />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black border border-white rounded-lg p-6 w-96">
            <h2 className="text-white text-xl mb-4">Ajouter une transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white block mb-2">Type</label>
                <div className="flex gap-2">
                  {(['revenus', 'dépenses'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`px-4 py-2 rounded ${type === t ? 'bg-white text-black' : 'text-white border border-white'}`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white block mb-2">Montant</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black border border-white rounded px-3 py-2 text-white"
                  placeholder="Entrez le montant"
                  required
                  step="0.01"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-black border border-white rounded px-3 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-white block mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black border border-white rounded px-3 py-2 text-white"
                  placeholder="Description optionnelle"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-white border border-white px-4 py-2 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};