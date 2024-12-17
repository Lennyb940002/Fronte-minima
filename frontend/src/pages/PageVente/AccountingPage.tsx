import React, { useState } from 'react';
import { Euro, TrendingUp, TrendingDown, Calculator, FileText, Tag, ShoppingCart, TrendingDown as Expense } from 'lucide-react';
import { StatCard } from '../../components/Accounting/StatCard';

interface Transaction {
  type: 'revenus' | 'dépenses' | 'déclaration' | 'restock';
  amount: number;
  date: string;
  description?: string;
  category?: string;
}

export function AccountingPage() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');
  const [calculatorMemory, setCalculatorMemory] = useState(0);

  const [transactions, setTransactions] = useState<{
    revenues: Record<string, number>;
    expenses: Record<string, number>;
  }>({
    revenues: {
      '10/12/24': 1200,
      '09/12/24': 800,
      total: 2000,
    },
    expenses: {
      marketing: 300,
      ursaff: 150,
      other: 100,
      total: 550,
    },
  });

  // Données de transactions enrichies
  const transactionData: Transaction[] = [
    {
      type: 'revenus',
      amount: 1200,
      date: '10/12/24',
      description: 'Vente en ligne',
      category: 'E-commerce'
    },
    {
      type: 'revenus',
      amount: 800,
      date: '09/12/24',
      description: 'Vente boutique',
      category: 'Magasin physique'
    },
    {
      type: 'dépenses',
      amount: 300,
      date: '08/12/24',
      description: 'Campagne publicitaire',
      category: 'Marketing'
    },
    {
      type: 'dépenses',
      amount: 150,
      date: '07/12/24',
      description: 'Charges sociales',
      category: 'Administratif'
    },
    {
      type: 'déclaration',
      amount: 100,
      date: '06/12/24',
      description: 'Déclaration trimestrielle',
      category: 'Impôts'
    },
    {
      type: 'restock',
      amount: 500,
      date: '05/12/24',
      description: 'Achat de stock',
      category: 'Inventaire'
    },
  ];

  // Couleurs pour différents types de transactions
  const typeColors = {
    'revenus': 'bg-green-500/20 text-green-400',
    'dépenses': 'bg-red-500/20 text-red-400',
    'déclaration': 'bg-purple-500/20 text-purple-400',
    'restock': 'bg-yellow-500/20 text-yellow-400'
  };

  // Icônes pour les catégories
  const categoryIcons = {
    'E-commerce': <ShoppingCart className="w-4 h-4 mr-2" />,
    'Magasin physique': <FileText className="w-4 h-4 mr-2" />,
    'Marketing': <Tag className="w-4 h-4 mr-2" />,
    'Administratif': <FileText className="w-4 h-4 mr-2" />,
    'Impôts': <Expense className="w-4 h-4 mr-2" />,
    'Inventaire': <ShoppingCart className="w-4 h-4 mr-2" />
  };

  // Calculatrice
  const handleCalculatorClick = (value: string) => {
    switch (value) {
      case 'C':
        setCalculatorDisplay('0');
        break;
      case '=':
        try {
          setCalculatorDisplay(eval(calculatorDisplay).toString());
        } catch {
          setCalculatorDisplay('Erreur');
        }
        break;
      case 'M+':
        setCalculatorMemory(prev => prev + parseFloat(calculatorDisplay));
        break;
      case 'M-':
        setCalculatorMemory(prev => prev - parseFloat(calculatorDisplay));
        break;
      case 'MR':
        setCalculatorDisplay(calculatorMemory.toString());
        break;
      default:
        setCalculatorDisplay(prev =>
          prev === '0' ? value : prev + value
        );
    }
  };

  const profit = transactions.revenues.total - transactions.expenses.total;

  return (
    <div className="bg-black text-white min-h-screen space-y-8 p-6 relative">
      {/* En-tête */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Comptabilité</h1>
        <button
          onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
          className="bg-blue-600 text-white p-1 rounded-lg hover:bg-blue-700 transition"
        >
          <div className="text-white text-lg font mb-1 flex items-center space-x-2">
            <span>Calculatrice</span>
            <Calculator className="w-5 h-5" />
          </div>

        </button>
      </header>

      {/* Calculatrice */}
      {isCalculatorOpen && (
        <div className="absolute top-20 right-6 z-50 bg-gray-800 border border-white/10 rounded-xl p-4 shadow-lg">
          <div className="bg-black/50 rounded-lg p-2 mb-4 text-right text-2xl">
            {calculatorDisplay}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', 'C', '4', '5', '6', '÷', '1', '2', '3', '×', '0', '.', '=', '+', '-', 'M+', 'M-', 'MR'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalculatorClick(btn)}
                className="bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Revenus"
          value={`${transactions.revenues.total.toLocaleString()}€`}
          icon={<Euro className="w-6 h-6 text-white" />}
        />
        <StatCard
          title="Dépenses"
          value={`${transactions.expenses.total.toLocaleString()}€`}
          icon={<TrendingDown className="w-6 h-6 text-white" />}
        />
        <StatCard
          title="Bénéfices"
          value={`${profit.toLocaleString()}€`}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
        />
      </div>

      {/* Tableau des transactions */}
      <div className="bg-black/50 rounded-xl p-1" style={{ marginLeft: '10%', marginRight: '10%' }}>
        <h2 className="text-2xl font-semibold mb-6">Transactions</h2>
        <div className="overflow-x-auto">
          <table style={{ width: '100%' }}>
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Catégorie</th>
                <th className="py-2 text-left">Description</th>
                <th className="py-2 text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction, index) => (
                <tr key={index} className="border-b border-white/10 last:border-b-0">
                  <td className="py-2">{transaction.date}</td>
                  <td className="py-2">
                    <div className="flex items-center">
                      {categoryIcons[transaction.category]}
                      <span>{transaction.category}</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-s ${typeColors[transaction.type]}`}
                    >
                      {transaction.description}
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    <span className={typeColors[transaction.type]}>
                      {transaction.amount.toLocaleString()}€
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}