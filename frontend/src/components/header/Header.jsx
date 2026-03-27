import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// Mock suggestions — replace with your actual courses data or API
const ALL_COURSES = [
  'React for Beginners',
  'React Advanced Patterns',
  'Next.js Full Course',
  'Node.js REST APIs',
  'JavaScript Mastery',
  'TypeScript Deep Dive',
  'Python for Data Science',
  'Machine Learning Basics',
  'System Design Masterclass',
  'PostgreSQL Mastery',
  'MongoDB Essentials',
  'CSS & Tailwind Mastery',
  'UI/UX Design Fundamentals',
  'Docker & Kubernetes',
  'Git & GitHub Pro',
  'Mathematics for Programmers',
  'English Communication Skills',
  'DSA with Java',
]

// ── Search Bar Component ──
const SearchBar = ({ onClose, isMobile = false }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (query.trim().length < 1) { setSuggestions([]); return }
    const filtered = ALL_COURSES.filter(c =>
      c.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6)
    setSuggestions(filtered)
  }, [query])

  const handleSearch = (term = query) => {
    if (!term.trim()) return
    navigate(`/courses?search=${encodeURIComponent(term.trim())}`)
    setQuery('')
    setSuggestions([])
    if (onClose) onClose()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape' && onClose) onClose()
  }

  return (
    <div className={`relative ${isMobile ? 'w-full' : 'w-72 xl:w-96'}`}>
      {/* Input */}
      <div className={`flex items-center gap-2 bg-gray-50 border-2 rounded-xl px-3 py-2
        transition-all duration-200
        ${focused ? 'border-blue-500 bg-white shadow-md shadow-blue-100' : 'border-gray-200'}`}
      >
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={handleKey}
          placeholder="Search courses..."
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none font-medium"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              onClick={() => { setQuery(''); setSuggestions('') }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSearch()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0"
        >
          Search
        </motion.button>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {suggestions.length > 0 && focused && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100
                       rounded-xl shadow-xl shadow-gray-200/60 z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-gray-50">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Suggestions</p>
            </div>
            {suggestions.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onMouseDown={() => handleSearch(s)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-left group"
              >
                <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <span className="text-sm text-gray-700 group-hover:text-blue-700 font-medium transition-colors">
                  {s}
                </span>
                <svg className="w-3 h-3 text-gray-200 group-hover:text-blue-300 ml-auto transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Header ──
const Header = ({ isAuth }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 gap-4">

          {/* Logo */}
          <NavLink to="/" onClick={handleNavClick} className="shrink-0">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">L</span>
              </div>
              <span className="font-extrabold text-2xl text-blue-800 tracking-tight">Learnify</span>
            </motion.div>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200
                  ${isActive ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {isAuth ? (
              <NavLink to="/account" onClick={handleNavClick}>
                <motion.div
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white
                             text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  Account
                </motion.div>
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" onClick={handleNavClick}>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="text-sm font-semibold text-gray-700 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Log in
                  </motion.button>
                </NavLink>
                <NavLink to="/register" onClick={handleNavClick}>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
                  >
                    Sign up
                  </motion.button>
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile: Search icon + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(p => !p)}
              className={`p-2 rounded-lg transition-colors ${searchOpen ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Search Bar (slide down) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-3">
                <SearchBar isMobile onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-black text-xs">L</span>
                  </div>
                  <span className="font-extrabold text-xl text-blue-800">Learnify</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </motion.button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navLinks.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <NavLink
                      to={to}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors
                        ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Auth Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-4 py-5 border-t border-gray-100 space-y-2"
              >
                {isAuth ? (
                  <NavLink to="/account" onClick={handleNavClick}
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">A</div>
                    My Account
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="/login" onClick={handleNavClick}
                      className="flex items-center justify-center w-full border-2 border-blue-200 text-blue-700 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
                    >
                      Log in
                    </NavLink>
                    <NavLink to="/signup" onClick={handleNavClick}
                      className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                      Sign up Free
                    </NavLink>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header