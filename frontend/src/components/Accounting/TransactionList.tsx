// src/components/Accounting/TransactionList.tsx
interface TransactionListProps {
    data: Record<string, number>;
    period: 'jour' | 'semaine' | 'mois';
}

export function TransactionList({ data, period }: TransactionListProps) {
    return (
        <div>
            <h2 className="text-white text-xl font-bold">Transactions</h2>
            <ul className="space-y-2 mt-4">
                {Object.entries(data).map(([date, amount]) => (
                    <li key={date} className="text-white">
                        {date}: {amount}€
                    </li>
                ))}
            </ul>
        </div>
    );
}
