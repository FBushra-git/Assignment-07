import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {
  ArrowLeft, Phone, MessageSquare, Video,
  Clock, Target, CalendarDays, Edit, Archive, Trash2,
  AlarmClock, Mail,
} from 'lucide-react'
import { useFriends } from '../hooks/useFriends'
import { useTimeline } from '../hooks/useTimeline'
import { getTypeConfig } from '../utils/helpers'
import StatusBadge from '../components/StatusBadge'
import { PageLoader } from '../components/LoadingStates'

export default function FriendDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { friends, loading } = useFriends()
  const { addEntry } = useTimeline()

  const friend = friends.find((f) => f.id === parseInt(id))

  const handleCheckIn = (type) => {
    const typeConfig = getTypeConfig(type)
    addEntry({
      friendId: friend.id,
      friendName: friend.name,
      type,
      title: `${typeConfig.label} with ${friend.name}`,
    })
    toast.success(`${typeConfig.label} logged!`, {
      style: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534' },
    })
  }

  if (loading) return <PageLoader />
  if (!friend) return null

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Profile Card ── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover mb-6 shadow-md border-4 border-white"
              />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{friend.name}</h1>
              
              <div className="flex flex-col items-center gap-2 mb-4">
                <StatusBadge status={friend.status} size="sm" />
                <span className="px-3 py-1 bg-[#DCFCE7] text-[#166534] text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {friend.tags[0]}
                </span>
              </div>

              <p className="text-sm italic text-gray-500 mb-2">"{friend.bio || 'Former colleague, great mentor'}"</p>
              <p className="text-xs text-gray-400 mb-8">Preferred: {friend.preferred_method || 'email'}</p>

              {/* Action Sidebar Buttons */}
              <div className="w-full space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  <AlarmClock size={16} /> Snooze 2 Weeks
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  <Archive size={16} /> Archive
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>

         {/* ── Right Content Area ── */}
<div className="lg:col-span-8 space-y-6">
  
  {/* Top Stats Grid - Fixed for Large Data */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[
      { label: 'Days Since Contact', value: friend.days_since_contact },
      { label: 'Goal (Days)', value: friend.goal },
      { label: 'Next Due', value: friend.next_due_date || 'Feb 27, 2026' }
    ].map((stat, i) => (
      <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[140px]">
        {/* Dynamic font size: smaller for the date, larger for numbers */}
        <span className={`font-bold text-[#244D3F] mb-1 leading-tight ${
          String(stat.value).length > 3 ? 'text-2xl' : 'text-4xl'
        }`}>
          {stat.value}
        </span>
        <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider">
          {stat.label}
        </span>
      </div>
    ))}
  </div>

  {/* Relationship Goal Card - Clean Layout */}
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-bold text-[#244D3F]">Relationship Goal</h3>
      <button className="px-3 py-1 bg-gray-50 text-gray-600 rounded-md text-[10px] font-bold hover:bg-gray-100 border border-gray-200 transition-all uppercase">
        Edit
      </button>
    </div>
    <p className="text-gray-500 text-sm">
      Connect every <span className="font-bold text-gray-900">{friend.goal} days</span>
    </p>
  </div>

  {/* Quick Check-In Card */}
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-base font-bold text-[#244D3F] mb-6">Quick Check-In</h3>
    <div className="grid grid-cols-3 gap-4">
      {[
        { icon: Phone, label: 'Call', type: 'call' },
        { icon: MessageSquare, label: 'Text', type: 'text' },
        { icon: Video, label: 'Video', type: 'video' }
      ].map((action) => (
        <button
          key={action.type}
          onClick={() => handleCheckIn(action.type)}
          className="flex flex-col items-center justify-center py-6 bg-[#FBFBFB] rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-white transition-all group"
        >
          <action.icon size={24} className="text-gray-700 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-gray-600">{action.label}</span>
        </button>
      ))}
    </div>
  </div>

</div>
        </div>
      </div>
    </div>
  )
}