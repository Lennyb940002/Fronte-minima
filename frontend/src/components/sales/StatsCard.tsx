import { ShoppingCart, TrendingUp, Users, Calendar } from 'lucide-react';

const STATS = [
  { icon: ShoppingCart, label: 'Panier Moyen', value: '30.11 €' },
  { icon: TrendingUp, label: 'Taux de conversion', value: '3.1%' },
  { icon: Calendar, label: 'Vente J.Moyen', value: '0.84' },
  { icon: Calendar, label: 'Vente S.Moyen', value: '14' },
  { icon: Calendar, label: 'Vente M.Moyen', value: '44' },
  { icon: Users, label: 'Nouveaux Clients', value: '4' }
];

export function StatsCard() {
  return (
    <div className="bg-black border border-white rounded-[28px] p-6 text-center" style={{ height: '53.5%' }}>
      <h2 className="text-white text-5xl font-bold mb-6">Stat</h2>
      <div className="space-y-6 flex flex-col h-full">
        {STATS.map(({ icon: Icon, label, value }, index) => (
          <div
            key={index}
            className="flex items-center justify-between hover:bg-white/10 transition-all duration-300 ease-in-out rounded-lg p-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Icon className="text-white w-5 h-5 transition-transform duration-300 ease-in-out group-hover:scale-110" />
              <span className="text-white">{label}</span>
            </div>
            <span className="text-white font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}