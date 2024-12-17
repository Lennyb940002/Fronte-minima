import React, { useState } from 'react';
import {
    AlertCircle, Link, Calculator,
    ArrowRight, ArrowLeft, Bell
} from 'lucide-react';

interface Declaration {
    id: number;
    date: string;
    ca: number;
    versement: number;
    status: 'À déclarer' | 'Payé' | 'Historique';
    urgence?: boolean;
}

const typeColors = {
    revenus: 'bg-green-500/20 text-green-400',
    dépenses: 'bg-red-500/20 text-red-400',
    déclaration: 'bg-purple-500/20 text-purple-400',
    restock: 'bg-yellow-500/20 text-yellow-400',
};

const DeclarationPage: React.FC = () => {
    const [periodicity, setPeriodicity] = useState<'mensuel' | 'trimestriel'>('mensuel');
    const [declarations, setDeclarations] = useState<{
        aDeclarer: Declaration[];
        paye: Declaration[];
        historique: Declaration[];
    }>({
        aDeclarer: [
            {
                id: 1,
                date: '31/01/2025',
                ca: 300,
                versement: 36,
                status: 'À déclarer',
                urgence: true,
            },
            {
                id: 2,
                date: '30/04/2025',
                ca: 0,
                versement: 0,
                status: 'À déclarer',
            },
        ],
        paye: [],
        historique: [],
    });

    const [simulationResult, setSimulationResult] = useState<{
        chargeServices: string;
        chargeMarchandises: string;
        totalCharges: string;
    } | null>(null);

    const simulateCharges = (ca: number) => {
        const chargeServices = (ca * 0.22).toFixed(2);
        const chargeMarchandises = (ca * 0.12).toFixed(2);
        const totalCharges = (parseFloat(chargeServices) + parseFloat(chargeMarchandises)).toFixed(2);

        setSimulationResult({
            chargeServices,
            chargeMarchandises,
            totalCharges,
        });
    };

    const declareDeclaration = (declarationId: number) => {
        const declarationToDeclare = declarations.aDeclarer.find(d => d.id === declarationId);
        if (declarationToDeclare) {
            setDeclarations(prev => ({
                ...prev,
                aDeclarer: prev.aDeclarer.filter(d => d.id !== declarationId),
                paye: [...prev.paye, { ...declarationToDeclare, status: 'Payé' }],
            }));
        }
    };

    return (
        <div className="bg-black text-white min-h-screen p-5">
            {/* En-tête */}
            <header className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="text-3xl font-semibold">Mes Déclarations</h1>
                    <p className="text-gray-400 flex items-center">
                        <AlertCircle className="inline mr-2 text-orange-500" size={16} />
                        Prochaine déclaration dans 52 jours
                    </p>
                </div>
                <a
                    href="https://mon.urssaf.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center"
                >
                    <Link className="mr-2" /> URSSAF
                </a>
            </header>

            {/* Simulateur de Charges */}
            <div className="border border-white/10 p-6 rounded-2xl mb-8 bg-white/10 backdrop-blur-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                        <Calculator className="mr-2 text-blue-400" />
                        Simulateur de Charges
                    </h2>
                </div>

                {simulationResult && (
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Charges Services (22%)</span>
                            <span className="font-semibold">{simulationResult.chargeServices} €</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Charges Marchandises (12%)</span>
                            <span className="font-semibold">{simulationResult.chargeMarchandises} €</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total des Charges</span>
                            <span className="text-blue-400">{simulationResult.totalCharges} €</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Boutons de Périodicité */}
            <div className="flex justify-center space-x-6 mb-8">
                <button
                    onClick={() => setPeriodicity('mensuel')}
                    className={`px-4 py-2 rounded-full ${periodicity === 'mensuel' ? 'bg-blue-600 hover:bg-blue-700 transition' : 'bg-gray-700'}`}
                >
                    Mensuel
                </button>
                <button
                    onClick={() => setPeriodicity('trimestriel')}
                    className={`px-4 py-2 rounded-full ${periodicity === 'trimestriel' ? 'bg-blue-600 hover:bg-blue-700 transition' : 'bg-gray-700'}`}
                >
                    Trimestriel
                </button>
            </div>

            {/* Sections Déclarations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-x divide-white/10">
                {/* À Déclarer */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">À Déclarer</h3>
                    {declarations.aDeclarer.map(decla => (
                        <div key={decla.id} className="bg-white/5 p-4 rounded-2xl mb-4 hover:bg-white/10 transition">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold">{decla.date}</span>
                                {decla.urgence && <Bell className="text-red-500 animate-pulse" size={16} />}
                            </div>
                            <div className="text-sm mb-2">{decla.ca} €</div>
                            <div className="text-xs text-gray-500 mb-3">Versement : {decla.versement} €</div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => simulateCharges(decla.ca)}
                                    className="flex-1 bg-gray-700 text-white py-2 rounded-xl flex items-center justify-center hover:bg-gray-600 transition"
                                >
                                    <ArrowLeft className="mr-2" size={16} /> Simuler
                                </button>
                                <button
                                    onClick={() => declareDeclaration(decla.id)}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center hover:bg-blue-700 transition"
                                >
                                    Déclarer <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payé */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Payé</h3>
                    {declarations.paye.map(decla => (
                        <div key={decla.id} className="bg-white/5 p-4 rounded-2xl mb-4 hover:bg-white/10 transition">
                            <div className="font-semibold mb-2">{decla.date}</div>
                            <div className="mb-2">{decla.ca} €</div>
                            <div className="text-xs text-gray-500 mb-3">Versement : {decla.versement} €</div>
                        </div>
                    ))}
                </div>

                {/* Historique */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Historique</h3>
                    {declarations.historique.map(decla => (
                        <div key={decla.id} className="bg-white/5 p-4 rounded-2xl mb-4 hover:bg-white/10 transition">
                            <div className="font-semibold mb-2">{decla.date}</div>
                            <div className="mb-2">{decla.ca} €</div>
                            <div className="text-xs text-gray-500 mb-3">Versement : {decla.versement} €</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DeclarationPage;
