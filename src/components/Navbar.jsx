import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Home, Clock, BarChart2, Menu, X, Heart } from 'lucide-react'
import navlogo from '../assets/logo.png'

const navLinks = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/timeline', label: 'Timeline', icon: Clock },
  { to: '/stats', label: 'Stats', icon: BarChart2 },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={` transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-card border-b border-ink-100'
          : 'bg-white/80 backdrop-blur-md border-b border-ink-100/60'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            
             
            
            <div className="leading-none">
              <img src={navlogo} classname="h-7 md:h-8 lg:h-9 w-auto object-contain"></img>
              
             
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#244D3F] text-white font-semibold'
                      : 'text-ink-500 hover:[#244D3F]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} className={isActive ? 'text-white' : ''} />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-ink-600 hover:bg-ink-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white/95 backdrop-blur-xl z-40 p-6 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map(({ to, label, icon: Icon, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'text-ink-700 hover:bg-ink-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
