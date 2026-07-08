import { useApp } from '../context/AppContext'

export default function Header() {
  const { state, dispatch } = useApp()

  return (
    <header className="header">
      <div>
        <div className="header-title display">LOONIPALOOZA</div>
        <div className="header-subtitle">Lolla 2026 · Jul 30–Aug 2</div>
      </div>
      <div className="header-right">
        <button
          className="crew-btn"
          onClick={() => dispatch({ type: 'OPEN_PROFILE' })}
          title="Edit squad names"
        >
          👯 Squad
        </button>
      </div>
    </header>
  )
}
