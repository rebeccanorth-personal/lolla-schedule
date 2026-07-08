import { useApp } from '../context/AppContext'
import { DAYS, getStageById, formatTime } from '../data/lineup'

export default function GroupSchedule() {
  const { state, dispatch, getGroupScheduleForDay, getAttendees } = useApp()
  const { users, activeDay } = state

  const shows = getGroupScheduleForDay(activeDay)

  function openSheet(performerId) {
    dispatch({ type: 'OPEN_ATTENDEE_SHEET', performerId })
  }

  if (shows.length === 0) {
    return (
      <div className="schedule-list">
        <div className="schedule-empty">
          <div className="schedule-empty-icon">🎪</div>
          <div className="schedule-empty-title">No shows planned</div>
          <div className="schedule-empty-text">
            Go to <strong>Lineup</strong>, tap any show, and pick who's going.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="schedule-list">
      <div style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>
        {activeDay} · {shows.length} show{shows.length !== 1 ? 's' : ''} planned
      </div>

      {shows.map(performer => {
        const stage = getStageById(performer.stage)
        const attendeeIds = getAttendees(performer.id)
        const attendees = users.filter(u => attendeeIds.includes(u.id))

        return (
          <button
            key={performer.id}
            className="group-show-item"
            style={{ borderLeft: `4px solid ${stage.color}` }}
            onClick={() => openSheet(performer.id)}
          >
            <div className="group-show-time">
              {formatTime(performer.start)}
              <span style={{ color: 'var(--muted)', fontSize: 10 }}>–{formatTime(performer.end)}</span>
            </div>

            <div className="group-show-info">
              <div className="group-show-name">
                {performer.name}
                {performer.headliner && <span className="headliner-star">★</span>}
              </div>
              <div className="group-show-meta">
                <span style={{ color: stage.color }}>{stage.shortName}</span>
                <span style={{ color: 'var(--muted)' }}>· {performer.genre}</span>
              </div>
            </div>

            <div className="group-show-avatars">
              {attendees.map(u => (
                <span
                  key={u.id}
                  className="attendee-dot"
                  style={{ background: u.color }}
                  title={u.name}
                >
                  {u.name[0]}
                </span>
              ))}
            </div>
          </button>
        )
      })}
    </div>
  )
}
