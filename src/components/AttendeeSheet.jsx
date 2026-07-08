import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getPerformerById, getStageById, formatTime } from '../data/lineup'

export default function AttendeeSheet() {
  const { state, dispatch, getAttendees, hasConflict, allUserIds } = useApp()
  const { attendeeSheet, users } = state

  const performer = attendeeSheet ? getPerformerById(attendeeSheet) : null
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (!performer) return
    const current = getAttendees(performer.id)
    // Default: if nobody is going yet, select everyone
    setSelected(current.length > 0 ? current : [...allUserIds])
  }, [attendeeSheet])

  if (!performer) return null

  const stage = getStageById(performer.stage)
  const isAdding = getAttendees(performer.id).length === 0

  function toggle(userId) {
    setSelected(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    )
  }

  function selectAll() { setSelected([...allUserIds]) }
  function save() {
    dispatch({ type: 'SET_SHOW_ATTENDEES', performerId: performer.id, attendeeIds: selected })
  }
  function remove() {
    dispatch({ type: 'SET_SHOW_ATTENDEES', performerId: performer.id, attendeeIds: [] })
  }
  function close() { dispatch({ type: 'CLOSE_ATTENDEE_SHEET' }) }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div className="attendee-show-info" style={{ borderLeft: `4px solid ${stage.color}` }}>
          <div className="attendee-show-name">{performer.name}</div>
          <div className="attendee-show-meta">
            <span style={{ color: stage.color }}>{stage.shortName}</span>
            <span>·</span>
            <span>{formatTime(performer.start)} – {formatTime(performer.end)}</span>
            {performer.headliner && <span className="headliner-tag">HEADLINER</span>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 6px', gap: 10 }}>
          <div className="attendee-question" style={{ padding: 0, flex: 1 }}>Who's going?</div>
          <button
            className="select-all-btn"
            onClick={selectAll}
          >
            Select all
          </button>
        </div>

        <div className="attendee-people">
          {users.map(u => {
            const isOn = selected.includes(u.id)
            const conflict = !isOn && hasConflict(u.id, performer)

            return (
              <button
                key={u.id}
                className={`person-toggle ${isOn ? 'on' : ''}`}
                style={{ '--person-color': u.color }}
                onClick={() => toggle(u.id)}
              >
                <span className="person-emoji">{u.emoji}</span>
                <span className="person-name">{u.name}</span>
                {conflict && <span className="conflict-warn" title="Has a conflict">⚡</span>}
                <span className="person-check">{isOn ? '✓' : ''}</span>
              </button>
            )
          })}
        </div>

        <div style={{ padding: '4px 20px 4px', display: 'flex', gap: 10 }}>
          {!isAdding && (
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={remove}>
              Remove
            </button>
          )}
          <button className="btn btn-secondary" onClick={close} style={{ flex: 1 }}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 2 }}
            onClick={save}
            disabled={selected.length === 0}
          >
            {selected.length === 0
              ? 'No one selected'
              : selected.length === users.length
              ? '✓ Everyone going'
              : `Save (${selected.length} going)`}
          </button>
        </div>
      </div>
    </div>
  )
}
