import { useMemo } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { PhoneCall, MessageSquare, Video, Activity, TrendingUp } from 'lucide-react'
import { useTimeline } from '../hooks/useTimeline'
import { useFriends } from '../hooks/useFriends'
import { getTypeConfig } from '../utils/helpers'

const PIE_COLORS = ['#0ea5e9', '#8b5cf6', '#22c55e']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-card-hover border border-ink-100 px-4 py-3">
        <p className="font-semibold text-ink-800">{payload[0].name}</p>
        <p className="text-2xl font-display font-bold" style={{ color: payload[0].payload.fill }}>
          {payload[0].value}
        </p>
        <p className="text-xs text-ink-400">interactions</p>
      </div>
    )
  }
  return null
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      className="text-xs font-semibold" style={{ fontSize: 13, fontWeight: 600 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function StatsPage() {
  const { entries } = useTimeline()
  const { friends, loading } = useFriends()

  const typeCounts = useMemo(() => {
    const c = { call: 0, text: 0, video: 0 }
    entries.forEach((e) => { if (c[e.type] !== undefined) c[e.type]++ })
    return c
  }, [entries])

  const pieData = [
    { name: 'Calls', value: typeCounts.call, fill: '#0ea5e9' },
    { name: 'Texts', value: typeCounts.text, fill: '#8b5cf6' },
    { name: 'Videos', value: typeCounts.video, fill: '#22c55e' },
  ]

  // Per-friend interaction bar data
  const friendBarData = useMemo(() => {
    if (!friends.length) return []
    const counts = {}
    entries.forEach((e) => {
      if (e.friendName) {
        counts[e.friendName] = (counts[e.friendName] || 0) + 1
      }
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name: name.split(' ')[0], count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
  }, [entries, friends])

  const statusCounts = useMemo(() => {
    return {
      overdue: friends.filter(f => f.status === 'overdue').length,
      'almost due': friends.filter(f => f.status === 'almost due').length,
      'on-track': friends.filter(f => f.status === 'on-track').length,
    }
  }, [friends])

  const statCards = [
    { label: 'Total Interactions', value: entries.length, icon: Activity, color: 'brand' },
    { label: 'Calls Logged', value: typeCounts.call, icon: PhoneCall, color: 'sky' },
    { label: 'Texts Logged', value: typeCounts.text, icon: MessageSquare, color: 'violet' },
    { label: 'Videos Logged', value: typeCounts.video, icon: Video, color: 'green' },
  ]

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 mb-2">
          Friendship Analytics
        </h1>
        <p className="text-ink-500">Insights into your interaction patterns and friendship health.</p>
      </div>

      

      <div >
        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-ink-100/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-ink-900 text-base">Interaction Breakdown</h2>
              <p className="text-xs text-ink-400 mt-0.5">By type</p>
            </div>
            <TrendingUp size={18} className="text-ink-400" />
          </div>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-ink-400 text-sm">No interactions logged yet.<br/>Start from a friend's profile!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={CustomLabel}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-ink-600 font-medium">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        
      </div>

    </div>
  )
}