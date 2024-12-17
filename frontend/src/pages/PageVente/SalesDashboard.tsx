import React, { useState, useMemo } from 'react';
import { MetricCard } from '../../components/sales/MetricCard';
import { SalesChart } from '../../components/sales/SalesChart';
import { NotesSection } from '../../components/sales/NotesSection';
import { StatsCard } from '../../components/sales/StatsCard';
import { SalesTable as SalesTableComponent } from '../../components/sales/SalesTable';

// Define Sale interface if not already defined
interface Sale {
  quantity: number;
  salePrice: number;
  unitCost: number;
}

export function SalesDashboard() {
  const [salesPeriod, setSalesPeriod] = useState<'jour' | 'semaine' | 'mois'>('jour');
  const [revenuePeriod, setRevenuePeriod] = useState<'jour' | 'semaine' | 'mois'>('jour');
  const [profitPeriod, setProfitPeriod] = useState<'jour' | 'semaine' | 'mois'>('jour');

  // Sales state moved here since it's used in the dashboard
  const [sales, setSales] = useState<Sale[]>([]);

  // Memoized calculations for sales metrics
  const {
    totalQuantity,
    totalSales,
    totalCosts,
    totalMargin,
    totalMarginPercentage
  } = useMemo(() => {
    const quantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const salesValue = sales.reduce((sum, sale) => sum + sale.salePrice * sale.quantity, 0);
    const costsValue = sales.reduce((sum, sale) => sum + sale.unitCost * sale.quantity, 0);
    const margin = salesValue - costsValue;

    return {
      totalQuantity: quantity,
      totalSales: salesValue,
      totalCosts: costsValue,
      totalMargin: margin,
      totalMarginPercentage: salesValue && costsValue
        ? ((margin / salesValue) * 100).toFixed(2)
        : '0.00'
    };
  }, [sales]);

  return (
    <div className="grid grid-cols-3 grid-rows-6 gap-4" style={{ width: '80%', marginLeft: '10%', marginTop: '-3%' }}>
      {/* Section 1: Vue d'ensemble des ventes avec Note */}
      <div className="row-span-4">
        <div className="bg-black text-white border border-white rounded-[28px] mb-4" style={{ height: '80%' }}>
          <MetricCard
            title="Vue d'ensemble des ventes"
            value={totalQuantity}
            period={salesPeriod}
            onPeriodChange={setSalesPeriod}
          />
        </div>
        <NotesSection />
      </div>

      {/* Section 2: Tableau des ventes */}
      <div className="col-span-2 row-span-2 col-start-1 row-start-5" style={{ marginTop: '17%' }}>
        <SalesTableComponent />
      </div>

      {/* Section 3: Vue d'ensemble du CA et Bénéfices */}
      <div className="row-span-4 col-start-2 row-start-1 space-y-4">
        <div className="bg-black text-white border border-white rounded-[28px]" style={{ height: '60%' }}>
          <MetricCard
            title="Vue d'ensemble du CA"
            value={totalSales}
            period={revenuePeriod}
            onPeriodChange={setRevenuePeriod}
          />
        </div>
        <div className="bg-black text-white border border-white rounded-[28px]" style={{ height: '60%' }}>
          <MetricCard
            title="Bénéfices"
            value={totalMargin}
            period={profitPeriod}
            onPeriodChange={setProfitPeriod}
          />
        </div>
      </div>

      {/* Section 4: Évolution des ventes et Statistiques */}
      <div className="row-span-6 col-start-3 row-start-1 space-y-4">
        <SalesChart />
        <StatsCard />
      </div>
    </div>
  );
}