import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-ink-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-md">
        {/* 404 number */}
        <div className="font-display text-[120px] sm:text-[160px] font-bold leading-none bg-gradient-to-br from-green-500 to-green-500 bg-clip-text text-transparent select-none mb-2">
          404
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-3">
          Lost in the network
        </h1>
        <p className="text-ink-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. Perhaps the friendship has moved on — but we can help you find your way back.
        </p>

        {/* Decorative emoji */}
        <div className="text-5xl mb-8 animate-float">🗺️</div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Home size={16} />
            Back to Home
          </Link>
          
        </div>
      </div>
    </div>
  )
}