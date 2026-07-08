import { useApp } from '../context/AppContext'

const TABS = [
  { id: 'schedule', icon: '🎪', label: 'LINEUP' },
  { id: 'friends',  icon: '👯', label: 'OUR SCHEDULE' },
]

export default function Navigation() {
  const { state, dispatch } = useApp()

  return (
    <nav className="nav-bar">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn ${state.activeTab === tab.id ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_TAB', tab: tab.id })}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
