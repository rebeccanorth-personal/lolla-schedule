import { useApp } from '../context/AppContext'

export default function Header() {
  const { state, dispatch, currentUser } = useApp()

  return (
    <header className="header">
      <div>
        <div className="header-title display">LOLLA 2026</div>
        <div className="header-subtitle">Schedule Planner · Grant Park</div>
      </div>
      <div className="header-right">
        <button
          className="share-btn"
          onClick={() => dispatch({ type: 'OPEN_SHARE' })}
        >
          ↑ Share
        </button>
        <button
          className="user-avatar"
          style={{
            background: `${currentUser.color}22`,
            borderColor: currentUser.color,
            boxShadow: `0 0 12px ${currentUser.color}44`,
          }}
          onClick={() => dispatch({ type: 'OPEN_PROFILE' })}
          title="Switch profile"
        >
          {currentUser.emoji}
        </button>
      </div>
    </header>
  )
}
