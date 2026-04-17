import { getStatusConfig } from '../utils/helpers'

export default function StatusBadge({ status, size = 'sm' }) {
  const config = getStatusConfig(status)
  const sizeClasses = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses} ${config.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}
