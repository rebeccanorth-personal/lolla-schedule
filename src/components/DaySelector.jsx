import { useApp } from '../context/AppContext'
import { DAYS } from '../data/lineup'

const DAY_DATES = {
  Thursday: 'Jul 30',
  Friday:   'Jul 31',
  Saturday: 'Aug 1',
  Sunday:   'Aug 2',
}

export default function DaySelector() {
  const { state, dispatch } = useApp()

  return (
    <div className="day-selector">
      {DAYS.map(day => (
        <button
          key={day}
          className={`day-btn ${state.activeDay === day ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_DAY', day })}
        >
          {day.slice(0, 3).toUpperCase()}
          <span style={{ fontSize: 9, display: 'block', opacity: 0.7, marginTop: 1 }}>
            {DAY_DATES[day]}
          </span>
        </button>
      ))}
    </div>
  )
}
