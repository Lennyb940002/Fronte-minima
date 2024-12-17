import React, { useState } from 'react';
import { Trash, Edit, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';

interface MarketingCampaign {
    id: number;
    name: string;
    platform: string;
    startDate: string;
    endDate: string;
    budget: number;
    adSpend: number;
    cpc: number;
    impressions: number;
    clicks: number;
    conversions: number;
    roi: number;
}

const CampaignCard: React.FC<{
    campaign: MarketingCampaign;
    onEdit: (campaign: MarketingCampaign) => void;
    onDelete: (id: number) => void;
}> = ({ campaign, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const calculatePerformanceMetrics = () => {
        const clickRate = (campaign.clicks / campaign.impressions) * 100 || 0;
        const conversionRate = (campaign.conversions / campaign.clicks) * 100 || 0;

        return { clickRate, conversionRate };
    };

    const { clickRate, conversionRate } = calculatePerformanceMetrics();

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
            <div className="flex justify-between items-center p-4">
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white truncate">{campaign.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-blue-400 text-sm">{campaign.platform}</span>
                        <span className="text-green-400 font-semibold text-sm">Budget: {campaign.budget}€</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onEdit(campaign)} className="text-yellow-400 hover:text-yellow-300">
                        <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(campaign.id)} className="text-red-400 hover:text-red-300">
                        <Trash size={18} />
                    </button>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-gray-300 hover:text-white"
                    >
                        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                </div>
            </div>

            {expanded && (
                <div className="p-4 bg-gray-900 grid grid-cols-2 gap-4">
                    <div className="text-xs text-gray-400">Période</div>
                    <div className="text-white font-semibold">{campaign.startDate} - {campaign.endDate}</div>
                    <div className="text-xs text-gray-400">Dépenses Pub</div>
                    <div className="text-white font-semibold">{campaign.adSpend}€</div>
                    <div className="text-xs text-gray-400">CPC</div>
                    <div className="text-white font-semibold">{campaign.cpc.toFixed(2)}€</div>
                    <div className="text-xs text-gray-400">Impressions</div>
                    <div className="text-white font-semibold">{campaign.impressions}</div>
                    <div className="text-xs text-gray-400">Taux de Clic</div>
                    <div className="text-white font-semibold">{clickRate.toFixed(2)}%</div>
                    <div className="text-xs text-gray-400">Taux de Conversion</div>
                    <div className="text-white font-semibold">{conversionRate.toFixed(2)}%</div>
                    <div className="text-xs text-gray-400">ROI</div>
                    <div className={`font-semibold ${campaign.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {campaign.roi.toFixed(2)}%
                    </div>
                </div>
            )}
        </div>
    );
};

const MarketingCampaignPage: React.FC = () => {
    const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
    const [formState, setFormState] = useState<Partial<MarketingCampaign> | null>(null);
    const [editing, setEditing] = useState(false);
    const [formExpanded, setFormExpanded] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const addOrUpdateCampaign = () => {
        if (!formState) return;
        if (editing) {
            setCampaigns(prev =>
                prev.map(campaign => (campaign.id === formState.id ? formState as MarketingCampaign : campaign))
            );
            setEditing(false);
        } else {
            setCampaigns(prev => [
                ...prev,
                { ...formState, id: Date.now() } as MarketingCampaign,
            ]);
        }
        setFormState(null);
        setFormExpanded(false);
    };

    const deleteCampaign = (id: number) => {
        setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    };

    const startEditing = (campaign: MarketingCampaign) => {
        setFormState(campaign);
        setEditing(true);
        setFormExpanded(true);
    };

    const platforms = ['Facebook Ads', 'Google Ads', 'Instagram', 'TikTok', 'LinkedIn'];

    const sortedCampaigns = campaigns.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.startDate.localeCompare(b.startDate);
        } else {
            return b.startDate.localeCompare(a.startDate);
        }
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-7xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-gray-800 flex justify-between items-center">
                    <h1 className="text-4xl font-extrabold">Campagnes Marketing</h1>
                    <button
                        onClick={() => setFormExpanded(!formExpanded)}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition duration-300"
                    >
                        <PlusCircle size={20} />
                        <span>{formExpanded ? 'Masquer' : 'Ajouter Campagne'}</span>
                    </button>
                </div>

                {formExpanded && (
                    <div className="p-6 bg-gray-700">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Nom de la Campagne"
                                value={formState?.name || ''}
                                onChange={e => setFormState({ ...formState!, name: e.target.value })}
                                className="p-3 bg-gray-900 border-2 border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={formState?.platform || ''}
                                onChange={e => setFormState({ ...formState!, platform: e.target.value })}
                                className="p-3 bg-gray-900 border-2 border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Sélectionner Plateforme</option>
                                {platforms.map(platform => (
                                    <option key={platform} value={platform}>{platform}</option>
                                ))}
                            </select>
                            {/* Additional form inputs omitted for brevity */}
                        </div>
                        <button
                            onClick={addOrUpdateCampaign}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition duration-300"
                        >
                            {editing ? 'Modifier Campagne' : 'Ajouter Campagne'}
                        </button>
                    </div>
                )}

                {campaigns.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                        Aucune campagne marketing disponible. Ajoutez-en une pour commencer.
                    </div>
                ) : (
                    <div className="p-6">
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-full mb-4 transition duration-300"
                        >
                            Trier par {sortOrder === 'asc' ? 'Date Ascendante' : 'Date Descendante'}
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedCampaigns.map(campaign => (
                                <CampaignCard
                                    key={campaign.id}
                                    campaign={campaign}
                                    onEdit={startEditing}
                                    onDelete={deleteCampaign}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketingCampaignPage;
