import { useApp } from '../context/AppContext'
import { STAGES, timeToMinutes, formatTime } from '../data/lineup'

const START_HOUR = 11   // 11 AM
const END_HOUR   = 23   // 11 PM
const HOUR_PX    = 80   // pixels per hour
const TOTAL_H    = (END_HOUR - START_HOUR) * HOUR_PX

function timeToPx(t) {
  const mins = timeToMinutes(t)
  return (mins - START_HOUR * 60) / 60 * HOUR_PX
}

function durationPx(start, end) {
  return (timeToMinutes(end) - timeToMinutes(start)) / 60 * HOUR_PX
}

// Build half-hour tick marks
const TIME_TICKS = []
for (let h = START_HOUR; h <= END_HOUR; h++) {
  TIME_TICKS.push({ label: formatTime(`${String(h).padStart(2,'0')}:00`), mins: h * 60, half: false })
  if (h < END_HOUR) {
    TIME_TICKS.push({ label: '', mins: h * 60 + 30, half: true })
  }
}

export default function LineupTimeline() {
  const { dayPerformers, dispatch, isSelected, getPriority, getConflictsFor } = useApp()

  function handleTap(performer) {
    dispatch({ type: 'TOGGLE_PERFORMER', performer })
  }

  return (
    <div className="timeline-wrapper">
      <div className="timeline-grid">

        {/* ── Sticky time column ── */}
        <div className="timeline-time-col">
          <div className="time-header-spacer" />
          <div className="timeline-body" style={{ height: TOTAL_H, position: 'relative' }}>
            {TIME_TICKS.map(tick => (
              <div key={tick.mins}>
                {tick.half ? (
                  <div
                    className="half-line"
                    style={{ top: timeToPx(`${Math.floor(tick.mins/60)}:30`) }}
                  />
                ) : (
                  <div
                    className="time-label"
                    style={{ top: timeToPx(`${String(Math.floor(tick.mins/60)).padStart(2,'0')}:00`) }}
                  >
                    {tick.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stage columns ── */}
        <div className="timeline-stages">
          {STAGES.map(stage => {
            const stagePerformers = dayPerformers.filter(p => p.stage === stage.id)
            return (
              <div key={stage.id} className="timeline-stage-col">

                {/* Stage header */}
                <div className="stage-header">
                  <div className="stage-header-name" style={{ color: stage.color }}>
                    {stage.shortName}
                  </div>
                  <div className="stage-header-dot" style={{ background: stage.color }} />
                </div>

                {/* Hour grid lines */}
                <div className="timeline-body" style={{ height: TOTAL_H, position: 'relative' }}>
                  {TIME_TICKS.map(tick => (
                    <div
                      key={tick.mins}
                      className={tick.half ? 'half-line' : 'hour-line'}
                      style={{ top: (tick.mins - START_HOUR * 60) / 60 * HOUR_PX }}
                    />
                  ))}

                  {/* Performer blocks */}
                  {stagePerformers.map(performer => {
                    const selected  = isSelected(performer.id)
                    const priority  = getPriority(performer.id)
                    const conflicts = getConflictsFor(performer.id)
                    const hasConflict = selected && conflicts.length > 0
                    const top    = timeToPx(performer.start)
                    const height = Math.max(durationPx(performer.start, performer.end) - 6, 32)

                    return (
                      <div
                        key={performer.id}
                        className={[
                          'performer-block',
                          selected ? 'selected' : '',
                          performer.headliner ? 'headliner' : '',
                        ].join(' ')}
                        style={{
                          top,
                          height,
                          background: selected
                            ? `linear-gradient(160deg, ${stage.color}dd, ${stage.color}88)`
                            : `linear-gradient(160deg, ${stage.color}55, ${stage.color}30)`,
                        }}
                        onClick={() => handleTap(performer)}
                      >
                        <div className="performer-block-content">
                          <div className="performer-name">{performer.name}</div>
                          {height > 42 && (
                            <div className="performer-time-label">
                              {formatTime(performer.start)}–{formatTime(performer.end)}
                            </div>
                          )}
                          {height > 60 && (
                            <div className="performer-genre">{performer.genre}</div>
                          )}
                        </div>

                        {selected && priority && (
                          <div className="priority-badge">{priority}</div>
                        )}

                        {hasConflict && (
                          <div className="conflict-indicator">⚡</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
