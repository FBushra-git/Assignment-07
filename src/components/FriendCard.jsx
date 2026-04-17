import { useNavigate } from 'react-router-dom'

export default function FriendCard({ friend }) {
  const navigate = useNavigate()

  // 1. Normalize the status to lowercase to prevent typos/casing issues
  const statusKey = friend.status?.toLowerCase().replace(/\s+/g, '') || ''

  // 2. Define classes using your EXACT tailwind.config.js keys (coral, amber, ink)
  const getStatusClasses = () => {
    switch (statusKey) {
      case 'overdue':
        return 'bg-coral-500 text-white' // Uses your config 'coral'
      case 'almostdue':
        return 'bg-amber-400 text-white' // Uses your config 'amber'
      case 'ontrack':
        return 'bg-[#1B4332] text-white' // The deep green from your footer
      default:
        return 'bg-ink-400 text-white'   // Fallback using your 'ink'
    }
  }

  return (
    <article
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-xl p-8 shadow-card border border-ink-100 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-card-hover"
    >
      {/* Avatar */}
      <div className="mb-5">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-ink-50 shadow-sm"
        />
      </div>

      {/* Identity */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-ink-900 tracking-tight">
          {friend.name}
        </h3>
        <p className="text-xs text-ink-400 font-medium mt-1 uppercase tracking-widest">
          {friend.days_since_contact}d ago
        </p>
      </div>

      {/* Tags (Mint/Green style from image) */}
      {/* Tags - Exact Light Green Match */}
<div className="flex flex-wrap justify-center gap-2 mb-6">
  {friend.tags.map((tag) => (
    <span
      key={tag}
      className="px-3 py-0.5 bg-[#DCFCE7] text-[#166534] text-[10px] font-bold rounded-full uppercase tracking-wider border border-[#BBF7D0]"
    >
      {tag}
    </span>
  ))}
</div>

      {/* Status Pill - The Dynamic Color Part */}
      <div className={`px-6 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-tight shadow-sm ${getStatusClasses()}`}>
        {friend.status}
      </div>
    </article>
  )
}