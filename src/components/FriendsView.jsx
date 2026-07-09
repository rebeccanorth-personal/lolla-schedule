import { useApp } from '../context/AppContext'
import { getStageById, formatTime } from '../data/lineup'

// Group chronologically-sorted events into clusters of overlapping time slots
function groupByOverlap(events) {
  const getInterval = e => e.type === 'show'
    ? { start: e.performer.start, end: e.performer.end }
    : { start: e.foodBreak.start, end: e.foodBreak.end }

  const groups = []
  let group = []
  let groupEnd = null

  for (const event of events) {
    const { start, end } = getInterval(event)
    if (groupEnd === null || start >= groupEnd) {
      if (group.length) groups.push(group)
      group = [event]
      groupEnd = end
    } else {
      group.push(event)
      if (end > groupEnd) groupEnd = end
    }
  }
  if (group.length) groups.push(group)
  return groups
}

export default function CrewView() {
  const { state, dispatch, getCrewScheduleForDay, getAttendees } = useApp()
  const { users, activeDay } = state

  const events = getCrewScheduleForDay(activeDay)
  const groups = groupByOverlap(events)

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

  function renderFood(fb) {
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

  function renderShowFull(event) {
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
          <div className="crew-event-stage" style={{ color: stage.color }}>{stage.shortName}</div>
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
  }

  function renderShowCompact(event) {
    const { performer } = event
    const stage = getStageById(performer.stage)
    const attendeeIds = getAttendees(performer.id)
    const attendees = users.filter(u => attendeeIds.includes(u.id))
    const allGoing = attendees.length === users.length

    return (
      <button
        key={performer.id}
        className="crew-event-compact"
        style={{ borderLeftColor: stage.color }}
        onClick={() => openSheet(performer.id)}
      >
        <div className="crew-compact-time">
          {formatTime(performer.start)}–{formatTime(performer.end)}
        </div>
        <div className="crew-compact-name">
          {performer.name}
          {performer.headliner && <span className="headliner-star"> ★</span>}
        </div>
        <div className="crew-compact-stage" style={{ color: stage.color }}>{stage.shortName}</div>
        <div className="crew-compact-who">
          {allGoing ? (
            <span className="crew-all-tag">Everyone</span>
          ) : attendees.length > 0 ? (
            attendees.map(u => (
              <span key={u.id} className="attendee-dot" style={{ background: u.color, width: 16, height: 16, fontSize: 8 }}>
                {u.name[0]}
              </span>
            ))
          ) : null}
        </div>
      </button>
    )
  }

  return (
    <div className="schedule-list" style={{ paddingBottom: 32 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
        {activeDay} · Our Schedule
      </div>
      <button className="add-food-row" style={{ marginBottom: 12 }} onClick={() => dispatch({ type: 'OPEN_FOOD_MODAL' })}>
        🍕 Add food break
      </button>

      {groups.map((group, gi) => {
        if (group.length === 1) {
          const event = group[0]
          return (
            <div key={gi} style={{ marginBottom: 6 }}>
              {event.type === 'food' ? renderFood(event.foodBreak) : renderShowFull(event)}
            </div>
          )
        }

        // Multiple overlapping events — lay them out side by side
        return (
          <div key={gi} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            {group.map(event =>
              event.type === 'food'
                ? <div key={event.foodBreak.id} style={{ flex: 1 }}>{renderFood(event.foodBreak)}</div>
                : renderShowCompact(event)
            )}
          </div>
        )
      })}
    </div>
  )
}
