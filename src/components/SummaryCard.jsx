// src/components/SummaryCard.jsx
export default function SummaryCard({ label, value, loading }) {
  // Logic to handle "missing" values so the UI doesn't break
  const displayValue = loading ? '—' : (value ?? 0);

  return (
    <div className="bg-white rounded-xl py-10 px-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center text-center h-full">
      {/* Value - Deep Green */}
      <span className="text-4xl md:text-5xl font-bold text-[#244D3F] mb-3">
        {displayValue}
      </span>
      
      {/* Label - Muted Blue/Grey */}
      <span className="text-sm font-medium text-[#64748B] tracking-tight">
        {label}
      </span>
    </div>
  )
}