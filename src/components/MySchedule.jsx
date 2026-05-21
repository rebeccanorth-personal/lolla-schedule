import { useApp } from '../context/AppContext'
import { getStageById, formatTime, overlaps } from '../data/lineup'

export default function MySchedule() {
  const { state, dispatch, getUserScheduleForDay, getConflictsFor } = useApp()
  const items = getUserScheduleForDay(state.currentUserId, state.activeDay)

  if (items.length === 0) {
    return (
      <div className="schedule-list">
        <div className="schedule-empty">
          <div className="schedule-empty-icon">🎪</div>
          <div className="schedule-empty-title">No picks yet</div>
          <div className="schedule-empty-text">
            Tap the <strong>LINEUP</strong> tab and tap any act to add it to your schedule.
          </div>
        </div>
      </div>
    )
  }

  // Group conflicting items together
  const seen = new Set()
  const groups = []

  items.forEach(item => {
    if (seen.has(item.performer.id)) return
    const conflicts = items.filter(
      other =>
        other.performer.id !== item.performer.id &&
        overlaps(item.performer, other.performer)
    )
    if (conflicts.length > 0) {
      const group = [item, ...conflicts].sort((a, b) => (a.priority || 1) - (b.priority || 1))
      group.forEach(g => seen.add(g.performer.id))
      groups.push({ type: 'conflict', items: group })
    } else {
      seen.add(item.performer.id)
      groups.push({ type: 'single', item })
    }
  })

  function removePerformer(performer) {
    dispatch({ type: 'TOGGLE_PERFORMER', performer })
  }

  return (
    <div className="schedule-list">
      {groups.map((group, gi) => {
        if (group.type === 'single') {
          return <ScheduleItem key={gi} item={group.item} onRemove={removePerformer} />
        }
        return (
          <div key={gi} className="conflict-group">
            <div className="conflict-group-header">
              ⚡ Overlap — {group.items.length} acts at once
            </div>
            {group.items.map((item, ii) => (
              <ScheduleItem key={ii} item={item} onRemove={removePerformer} inGroup />
            ))}
          </div>
        )
      })}
    </div>
  )
}

function ScheduleItem({ item, onRemove, inGroup = false }) {
  const { performer, priority } = item
  const stage = getStageById(performer.stage)

  return (
    <div className="schedule-item-inner" style={{ borderRadius: inGroup ? 0 : 12, borderLeft: `4px solid ${stage.color}` }}>
      <div className="schedule-item-body">
        <div className="schedule-item-info">
          <div className="schedule-item-name">{performer.name}</div>
          <div className="schedule-item-meta">
            <span
              className="stage-pill"
              style={{
                background: `${stage.color}22`,
                color: stage.color,
                border: `1px solid ${stage.color}44`,
              }}
            >
              {stage.shortName}
            </span>
            <span>{formatTime(performer.start)} – {formatTime(performer.end)}</span>
            <span style={{ color: 'var(--muted)' }}>{performer.genre}</span>
          </div>
        </div>

        {priority && (
          <div
            className="schedule-item-priority"
            style={{
              background: priority === 1 ? 'rgba(255,190,11,0.15)' : 'rgba(255,255,255,0.05)',
              color: priority === 1 ? 'var(--yellow)' : 'var(--muted)',
              border: `1px solid ${priority === 1 ? 'rgba(255,190,11,0.3)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {priority === 1 ? '★' : '☆'}
          </div>
        )}
      </div>

      <button
        className="schedule-item-remove"
        onClick={() => onRemove(performer)}
        aria-label="Remove"
      >
        ✕
      </button>
    </div>
  )
}
