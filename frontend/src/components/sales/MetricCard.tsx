export function MetricCard({ title, value, period, onPeriodChange }) {
  return (
    <div className="relative h-full flex flex-col text-center">
      <div className="flex-grow flex flex-col justify-center items-center pt-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-6xl font-bold flex-grow flex items-center justify-center " style={{ marginBottom: '28%' }}>{value}</p>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 pb-4">
        {['jour', 'semaine', 'mois'].map((p) => (
          <button
            key={p}
            onClick={() => onPeriodChange(p)}
            className={`px-4 py-2 rounded-full ${period === p ? 'bg-white text-black' : 'bg-black text-white border-white'
              }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}