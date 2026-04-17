import { useState, useMemo } from 'react'
import { Trash2, ChevronDown, History } from 'lucide-react'
import { useTimeline } from '../hooks/useTimeline'
import TimelineEntry from '../components/TimelineEntry'

export default function TimelinePage() {
  const { entries, clearAll } = useTimeline()
  const [filter, setFilter] = useState('all')

  const processed = useMemo(() => {
    let list = [...entries]
    if (filter !== 'all') {
      list = list.filter((e) => e.type === filter)
    }
    // Sort newest first
    return list.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [entries, filter])

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-[#1B2B41] mb-8">
          Timeline
        </h1>

        {/* Filter Dropdown */}
        <div className="relative w-full max-w-[240px] mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer"
          >
            <option value="all">Filter timeline</option>
            <option value="call">Calls</option>
            <option value="text">Texts</option>
            <option value="video">Videos</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
            <ChevronDown size={16} />
          </div>
        </div>

        {/* ── Timeline Content ── */}
        <div className="space-y-1">
          {processed.length === 0 ? (
            /* ── EMPTY STATE SECTION ── */
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <History className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#1B2B41] mb-1">
                No history yet
              </h3>
              <p className="text-gray-400 text-sm max-w-[280px] text-center leading-relaxed">
                Interactions with your friends will appear here once you log your first check-in.
              </p>
            </div>
          ) : (
            /* Render Timeline List */
            processed.map((entry) => (
              <TimelineEntry key={entry.id} entry={entry} />
            ))
          )}
        </div>

        {/* Clear All Button */}
        {entries.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                if (window.confirm('Clear all timeline history?')) clearAll()
              }}
              className="flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-600 transition-colors uppercase tracking-widest"
            >
              <Trash2 size={14} />
              Clear Timeline
            </button>
          </div>
        )}
      </div>
    </div>
  )
}