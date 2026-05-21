import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { getStageById, formatTime } from '../data/lineup'

export default function ConflictModal() {
  const { state, dispatch } = useApp()
  const { pendingConflict } = state

  const [priorityId, setPriorityId] = useState(null)

  if (!pendingConflict) return null

  const { newPerformer, conflicts } = pendingConflict
  const allActs = [newPerformer, ...conflicts]

  function handleKeepBoth() {
    const chosen = priorityId || newPerformer.id
    dispatch({ type: 'RESOLVE_CONFLICT', keepNew: true, priorityId: chosen })
    setPriorityId(null)
  }

  function handleSwitchToNew() {
    // Remove all conflicting, add new as priority 1
    conflicts.forEach(c => {
      dispatch({ type: 'TOGGLE_PERFORMER', performer: c })
    })
    dispatch({ type: 'RESOLVE_CONFLICT', keepNew: true, priorityId: newPerformer.id })
    setPriorityId(null)
  }

  function handleDismiss() {
    dispatch({ type: 'CLEAR_CONFLICT' })
    setPriorityId(null)
  }

  const newStage = getStageById(newPerformer.stage)

  return (
    <div className="modal-overlay center" onClick={handleDismiss}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <div style={{ padding: '18px 20px 4px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              letterSpacing: '0.06em',
              background: 'linear-gradient(90deg, var(--yellow), var(--orange))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ⚡ SCHEDULE CONFLICT
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, marginBottom: 14 }}>
            These sets overlap — who's your priority?
          </div>
        </div>

        <div className="conflict-overlap-note" style={{ margin: '0 20px 14px' }}>
          {newPerformer.name} overlaps with{' '}
          {conflicts.map(c => c.name).join(' & ')}
        </div>

        <div className="conflict-acts" style={{ padding: '0 20px' }}>
          {allActs.map((act, i) => {
            const stage = getStageById(act.stage)
            const isChosen = priorityId === act.id
            const defaultPriority = act.id === newPerformer.id ? (i === 0 ? '?' : '?') : '1'
            return (
              <div
                key={act.id}
                className={`conflict-act-card ${isChosen ? 'selected-priority' : ''}`}
                style={{ background: `${stage.color}22` }}
                onClick={() => setPriorityId(act.id)}
              >
                <div
                  className={`priority-ring ${isChosen ? 'active' : ''}`}
                  style={{ borderColor: isChosen ? stage.color : undefined, color: stage.color }}
                >
                  {isChosen ? '★' : ''}
                </div>
                <div className="conflict-act-card-info">
                  <div className="conflict-act-name">{act.name}</div>
                  <div className="conflict-act-meta">
                    {formatTime(act.start)} – {formatTime(act.end)} · {stage.shortName} · {act.genre}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {priorityId && (
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--teal)', padding: '8px 20px 0', fontWeight: 600 }}>
            ★ Priority: {allActs.find(a => a.id === priorityId)?.name}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 20px' }}>
          <button className="btn btn-primary" onClick={handleKeepBoth}>
            Keep Both {priorityId ? '(priority set)' : '— tap an act to set priority'}
          </button>
          <button className="btn btn-secondary" onClick={handleSwitchToNew}>
            Switch to {newPerformer.name} only
          </button>
          <button className="btn btn-ghost" onClick={handleDismiss}>
            Keep original, discard {newPerformer.name}
          </button>
        </div>
      </div>
    </div>
  )
}
