import { formatDate, getTypeConfig } from '../utils/helpers'

// Import icons
import callImg from '../assets/call.png'
import textImg from '../assets/text.png'
import videoImg from '../assets/video.png'
// import meetupImg from '../assets/meetup.png' // Add this when you have the file

export default function TimelineEntry({ entry }) {
  const typeConfig = getTypeConfig(entry.type)

  // ── MAP IMAGES TO ENTRY TYPES ──
  const iconMap = {
    call: callImg,
    text: textImg,
    video: videoImg,
    // meetup: meetupImg, 
  }

  return (
    <div className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
      {/* Icon Area */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg">
        {/* The image now pulls correctly from the map based on entry.type */}
        <img 
          src={iconMap[entry.type]} 
          alt={entry.type} 
          className="w-8 h-8 object-contain" 
          onError={(e) => { e.target.style.display = 'none' }} // Hides broken images
        />
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <p className="font-bold text-[#1B2B41] text-[15px]">
            {typeConfig.label}
          </p>
          <p className="text-gray-400 text-sm">
            with {entry.friendName}
          </p>
        </div>
        <p className="text-gray-400 text-xs font-medium mt-0.5">
          {formatDate(entry.date)}
        </p>
      </div>
    </div>
  )
}