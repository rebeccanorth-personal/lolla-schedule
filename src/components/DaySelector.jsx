import { useApp } from '../context/AppContext'
import { DAYS } from '../data/lineup'

const DAY_DATES = {
  Thursday: 'Jul 30',
  Friday:   'Jul 31',
  Saturday: 'Aug 1',
  Sunday:   'Aug 2',
}

const DAY_COLORS = {
  Thursday: '#FF006E',  // pink
  Friday:   '#8338EC',  // purple
  Saturday: '#00C2FF',  // cyan
  Sunday:   '#FFBE0B',  // yellow
}

export default function DaySelector() {
  const { state, dispatch } = useApp()

  return (
    <div className="day-selector">
      {DAYS.map(day => {
        const isActive = state.activeDay === day
        const color = DAY_COLORS[day]
        return (
          <button
            key={day}
            className={`day-btn ${isActive ? 'active' : ''}`}
            style={isActive ? {
              background: color,
              boxShadow: `0 0 14px ${color}55`,
            } : {}}
            onClick={() => dispatch({ type: 'SET_DAY', day })}
          >
            {day.slice(0, 3).toUpperCase()}
            <span style={{ fontSize: 9, display: 'block', opacity: 0.75, marginTop: 1 }}>
              {DAY_DATES[day]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
