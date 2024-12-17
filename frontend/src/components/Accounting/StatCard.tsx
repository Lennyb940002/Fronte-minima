// src/components/Accounting/StatCard.tsx
interface StatCardProps {
    title: string;
    value: number | string;
}

export function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-white/70 mb-2">{title}</p>
            <p className="text-xl font-semibold">{value}</p>
        </div>
    )
}
