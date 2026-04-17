export const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatTime = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatRelativeDate = (isoString) => {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(isoString)
}

export const getStatusConfig = (status) => {
  const configs = {
    overdue: {
      label: 'Overdue',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      dot: 'bg-red-500',
      className: 'status-overdue',
    },
    'almost due': {
      label: 'Almost Due',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      className: 'status-almost-due',
    },
    'on-track': {
      label: 'On Track',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      dot: 'bg-green-500',
      className: 'status-on-track',
    },
  }
  return configs[status] || configs['on-track']
}

export const getTypeConfig = (type) => {
  const configs = {
    call: { icon: '📞', color: '#0ea5e9', label: 'Call', bg: '#e0f2fe' },
    text: { icon: '💬', color: '#8b5cf6', label: 'Text', bg: '#ede9fe' },
    video: { icon: '🎥', color: '#22c55e', label: 'Video', bg: '#dcfce7' },
  }
  return configs[type] || configs.call
}

export const getSummaryStats = (friends) => {
  const total = friends.length
  const overdue = friends.filter(f => f.status === 'overdue').length
  const onTrack = friends.filter(f => f.status === 'on-track').length
  const avgGoal = friends.length
    ? Math.round(friends.reduce((acc, f) => acc + f.goal, 0) / friends.length)
    : 0

  // "this week" means within 7 days
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const thisWeek = friends.filter(f => f.days_since_contact <= 7).length

  return { total, overdue, onTrack, thisWeek, avgGoal }
}
