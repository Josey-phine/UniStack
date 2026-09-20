import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('unistack-theme') === 'dark'
  })

  const location = useLocation()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem(
        'unistack-theme',
        'dark'
      )
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(
        'unistack-theme',
        'light'
      )
    }
  }, [isDarkMode])

  const calculatorLinks = [
    {
      name: 'CGPA Calculator',
      path: '/cgpa-calculator',
    },
    {
      name: 'GPA Calculator',
      path: '/gpa-calculator',
    },
    {
      name: 'Grade Calculator',
      path: '/grade-calculator',
    },
  ]

  const plannerLinks = [
    {
      name: 'CGPA Target Planner',
      path: '/cgpa-planner',
    },
    {
      name: 'Exam Timetable',
      path: '/exam-timetable',
    },
  ]

  const studyToolLinks = [
    {
      name: 'Study Hours Calculator',
      path: '/study-hours',
    },
    {
      name: 'Pomodoro Timer',
      path: '/pomodoro',
    },
    {
      name: 'Exam Countdown',
      path: '/exam-countdown',
    },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode((previous) => !previous)
  }

  const closeMobileMenu = () => {
    setIsOpen(false)
    setOpenMenu(null)
  }

  const toggleMobileMenu = (menu) => {
    setOpenMenu((previousMenu) =>
      previousMenu === menu ? null : menu
    )
  }

  const isCategoryActive = (links) => {
    return links.some(
      (link) => location.pathname === link.path
    )
  }

  const desktopDropdown = (
    label,
    links
  ) => {
    const isActive = isCategoryActive(links)

    return (
      <div className="group relative">
        <button
          type="button"
          className={`flex items-center gap-1 text-sm font-medium transition ${
            isActive
              ? 'text-primary'
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          {label}

          <ChevronDown
            size={16}
            className="transition-transform group-hover:rotate-180"
          />
        </button>

        <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-2 rounded-xl border border-border bg-surface p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-background hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const mobileDropdown = (
    label,
    links,
    menuName
  ) => {
    const isActive = isCategoryActive(links)
    const isExpanded = openMenu === menuName

    return (
      <div>
        <button
          type="button"
          onClick={() =>
            toggleMobileMenu(menuName)
          }
          className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
            isActive
              ? 'text-primary'
              : 'text-text-secondary hover:bg-background hover:text-primary'
          }`}
        >
          <span>{label}</span>

          <ChevronDown
            size={18}
            className={`transition-transform ${
              isExpanded
                ? 'rotate-180'
                : ''
            }`}
          />
        </button>

        {isExpanded && (
          <div className="ml-3 border-l border-border pl-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`block rounded-lg px-3 py-3 text-sm font-medium transition ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-background hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-2xl font-extrabold tracking-tight text-primary"
        >
          UniStack
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className={`text-sm font-medium transition ${
              location.pathname === '/'
                ? 'text-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            Home
          </Link>

          {desktopDropdown(
            'Calculators',
            calculatorLinks
          )}

          {desktopDropdown(
            'Planners',
            plannerLinks
          )}

          {desktopDropdown(
            'Study Tools',
            studyToolLinks
          )}

          <Link
            to="/about"
            className={`text-sm font-medium transition ${
              location.pathname === '/about'
                ? 'text-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            About
          </Link>

          {/* DARK MODE */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-text-secondary transition hover:bg-background hover:text-primary"
            aria-label={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            title={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {isDarkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-text-secondary transition hover:bg-background hover:text-primary"
            aria-label={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            title={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {isDarkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setIsOpen((previous) => !previous)
            }
            className="rounded-lg p-2 text-text transition hover:bg-background"
            aria-label={
              isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {isOpen && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                location.pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-background hover:text-primary'
              }`}
            >
              Home
            </Link>

            {mobileDropdown(
              'Calculators',
              calculatorLinks,
              'calculators'
            )}

            {mobileDropdown(
              'Planners',
              plannerLinks,
              'planners'
            )}

            {mobileDropdown(
              'Study Tools',
              studyToolLinks,
              'study-tools'
            )}

            <Link
              to="/about"
              onClick={closeMobileMenu}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                location.pathname === '/about'
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-background hover:text-primary'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
