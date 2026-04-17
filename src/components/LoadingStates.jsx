export function FriendCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-ink-100/60">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-14 h-14 rounded-2xl shimmer flex-shrink-0" />
        <div className="flex-1 pt-1">
          <div className="h-4 w-32 shimmer rounded-lg mb-2" />
          <div className="h-3 w-24 shimmer rounded-lg" />
        </div>
      </div>
      <div className="h-14 shimmer rounded-xl mb-4" />
      <div className="flex gap-2">
        <div className="h-7 w-20 shimmer rounded-lg" />
        <div className="h-7 w-24 shimmer rounded-lg" />
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Animated rings */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-brand-300 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
      </div>
      <div className="text-center">
        <p className="text-ink-600 font-medium text-sm">Loading your friends…</p>
        <p className="text-ink-400 text-xs mt-1">Fetching all connections</p>
      </div>
    </div>
  )
}
