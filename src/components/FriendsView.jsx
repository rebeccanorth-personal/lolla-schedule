import { useApp } from '../context/AppContext'
import { getStageById, formatTime } from '../data/lineup'

export default function CrewView() {
  const { state, dispatch, getCrewScheduleForDay, getAttendees } = useApp()
  const { users, activeDay } = state

  const events = getCrewScheduleForDay(activeDay)

  function openSheet(performerId) {
    dispatch({ type: 'OPEN_ATTENDEE_SHEET', performerId })
  }
  function removeFood(id) {
    dispatch({ type: 'REMOVE_FOOD_BREAK', id })
  }

  if (events.length === 0) {
    return (
      <div className="schedule-list">
        <button className="add-food-row" onClick={() => dispatch({ type: 'OPEN_FOOD_MODAL' })}>
          🍕 Add food break
        </button>
        <div className="schedule-empty">
          <div className="schedule-empty-icon">📋</div>
          <div className="schedule-empty-title">Nothing planned yet</div>
          <div className="schedule-empty-text">
            Go to <strong>Schedule</strong> and tap any show to add it. Your crew plan shows up here — screenshot this view to remember it at the festival.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="schedule-list" style={{ paddingBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', flex: 1 }}>
          {activeDay} · Our Schedule
        </div>
        <button className="add-food-row" onClick={() => dispatch({ type: 'OPEN_FOOD_MODAL' })}>
          🍕 Add food break
        </button>
      </div>

      {events.map((event, i) => {
        if (event.type === 'food') {
          const fb = event.foodBreak
          return (
            <div key={fb.id} className="crew-food-item">
              <div className="crew-food-icon">🍕</div>
              <div className="crew-food-info">
                <div className="crew-food-label">{fb.label}</div>
                <div className="crew-food-time">{formatTime(fb.start)} – {formatTime(fb.end)}</div>
              </div>
              <button className="crew-food-remove" onClick={() => removeFood(fb.id)}>✕</button>
            </div>
          )
        }

        const { performer } = event
        const stage = getStageById(performer.stage)
        const attendeeIds = getAttendees(performer.id)
        const attendees = users.filter(u => attendeeIds.includes(u.id))
        const allGoing = attendees.length === users.length
        const isSplit = !allGoing && attendees.length > 0

        return (
          <button
            key={performer.id}
            className="crew-event-item"
            style={{ borderLeft: `4px solid ${stage.color}` }}
            onClick={() => openSheet(performer.id)}
          >
            <div className="crew-event-time">
              <span className="crew-time-start">{formatTime(performer.start)}</span>
              <span className="crew-time-end">{formatTime(performer.end)}</span>
            </div>

            <div className="crew-event-info">
              <div className="crew-event-name">
                {performer.name}
                {performer.headliner && <span className="headliner-star">★</span>}
              </div>
              <div className="crew-event-stage" style={{ color: stage.color }}>
                {stage.shortName}
              </div>
            </div>

            <div className="crew-event-who">
              {allGoing ? (
                <span className="crew-all-tag">Everyone</span>
              ) : isSplit ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                  <span className="split-badge">SPLIT</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {attendees.map(u => (
                      <span key={u.id} className="attendee-dot" style={{ background: u.color, width: 18, height: 18, fontSize: 9 }}>
                        {u.name[0]}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </button>
        )
      })}
    </div>
  )
}
