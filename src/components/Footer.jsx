import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import footerlogo from '../assets/logo-xl.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1B4332] text-white/80 py-5 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand/Logo Section */}
        <div className="mb-4">
          <h2 className="text-5xl font-bold text-white tracking-tight mb-4">
            KeenKeeper
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
        </div>

        {/* Social Links Section */}
        <div className="mt-8 mb-16">
          <h3 className="text-lg font-medium mb-4">Social Links</h3>
          <div className="flex justify-center gap-4">
            {[
              { Icon: Instagram, href: "#" },
              { Icon: Facebook, href: "#" },
              { Icon: Twitter, href: "#" }, // Lucide Twitter serves as X or Twitter
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1B4332] hover:bg-opacity-90 transition-all"
              >
                <Icon size={20} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-70">
          <p>© {year} KeenKeeper. All rights reserved.</p>
          
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}