import { useApp } from '../context/AppContext'

export default function Header() {
  const { state, dispatch } = useApp()
  const isLight = state.theme === 'light'

  return (
    <header className="header">
      <div>
        <div className="header-title display">LOONIPALOOZA</div>
        <div className="header-subtitle">Lolla 2026 · Jul 30–Aug 2</div>
      </div>
      <div className="header-right">
        <button
          className="crew-btn"
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {isLight ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  )
}
