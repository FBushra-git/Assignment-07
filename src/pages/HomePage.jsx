import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, AlertTriangle, Calendar, Target, Plus, Search } from 'lucide-react'
import { useFriends } from '../hooks/useFriends'
import { getSummaryStats } from '../utils/helpers'
import FriendCard from '../components/FriendCard'
import SummaryCard from '../components/SummaryCard'
import { FriendCardSkeleton, PageLoader } from '../components/LoadingStates'

export default function HomePage() {
  const { friends, loading } = useFriends()
  const [search, setSearch] = useState('')
  const stats = getSummaryStats(friends)

  const filtered = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page-enter">
      {/* ── Hero Banner ── */}
      <section className="bg-gray-50 text-black relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Friends to keep close in your life
           
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the
            relationships that matter most.
          </p>

          <button
            onClick={() => document.getElementById('friends-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary inline-flex items-center gap-2.5 bg-[#244D3F] text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus size={18} />
            Add a friend
          </button>
        </div>

        
      </section>

      
    
{/* ── Summary Cards Section ── */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <SummaryCard 
      label="Total Friends" 
      value={stats.total} 
      loading={loading} 
    />
    <SummaryCard 
      label="On Track" 
      value={stats.onTrack} 
      loading={loading} 
    />
    <SummaryCard 
      label="Need Attention" 
      value={stats.overdue} 
      loading={loading} 
    />
    <SummaryCard 
      label="Interactions This Month" 
      // If stats.thisMonth is missing from your helper, it will now show 0
      value={stats.thisMonth} 
      loading={loading} 
    />
  </div>
</section>

      {/* ── Friends Grid ── */}
      <section
        id="friends-grid"
        className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12"
      >
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
              Your Friends
            </h2>
            
          </div>

          
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <FriendCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
           
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}