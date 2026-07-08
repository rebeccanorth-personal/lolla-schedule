import { useRef } from 'react'
import { useApp } from '../context/AppContext'
import { STAGES, timeToMinutes, formatTime } from '../data/lineup'

const START_HOUR = 12
const END_HOUR   = 22
const HOUR_PX    = 90
const STAGE_W    = 124
const TIME_COL_W = 46
const TOTAL_H    = (END_HOUR - START_HOUR) * HOUR_PX

function timeToPx(t) {
  return (timeToMinutes(t) - START_HOUR * 60) / 60 * HOUR_PX
}
function durationPx(start, end) {
  return (timeToMinutes(end) - timeToMinutes(start)) / 60 * HOUR_PX
}

const HOUR_TICKS = []
for (let h = START_HOUR; h <= END_HOUR; h++) {
  HOUR_TICKS.push(h)
}

export default function LineupTimeline() {
  const { state, dispatch, dayPerformers, getAttendees, getFoodBreaksForDay } = useApp()
  const foodBreaks = getFoodBreaksForDay(state.activeDay)

  const xScrollRef = useRef(null)
  const stageHeaderInnerRef = useRef(null)

  function openSheet(performerId) {
    dispatch({ type: 'OPEN_ATTENDEE_SHEET', performerId })
  }

  function syncHeader() {
    if (xScrollRef.current && stageHeaderInnerRef.current) {
      stageHeaderInnerRef.current.style.transform =
        `translateX(-${xScrollRef.current.scrollLeft}px)`
    }
  }

  return (
    <div className="grid-wrapper">

      {/* ── Stage header row — fixed above scroll, synced horizontally via JS ── */}
      <div className="grid-header-row">
        <div style={{ width: TIME_COL_W, flexShrink: 0 }} />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div ref={stageHeaderInnerRef} style={{ display: 'flex', willChange: 'transform' }}>
            {STAGES.map(s => (
              <div key={s.id} className="grid-stage-header" style={{ width: STAGE_W, color: s.color }}>
                {s.shortName}
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, margin: '4px auto 0' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body: vertical scroll only ── */}
      <div className="grid-body-yscroll">
        <div style={{ display: 'flex', height: TOTAL_H }}>

          {/* Time column — outside x-scroll, scrolls vertically with body */}
          <div className="grid-time-col" style={{ width: TIME_COL_W, height: TOTAL_H }}>
            {HOUR_TICKS.map(h => (
              <div
                key={h}
                className="grid-time-label"
                style={{ top: (h - START_HOUR) * HOUR_PX }}
              >
                {formatTime(`${h}:00`)}
              </div>
            ))}
          </div>

          {/* Stage columns — horizontal scroll only, syncs stage header */}
          <div
            className="grid-xscroll"
            ref={xScrollRef}
            onScroll={syncHeader}
          >
            <div style={{ display: 'flex', position: 'relative', height: TOTAL_H, width: STAGES.length * STAGE_W }}>

              {/* Hour lines + food break overlays */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                {HOUR_TICKS.map(h => (
                  <div
                    key={h}
                    style={{
                      position: 'absolute',
                      top: (h - START_HOUR) * HOUR_PX,
                      left: 0, right: 0,
                      height: 1,
                      background: 'rgba(255,255,255,0.06)',
                    }}
                  />
                ))}
                {foodBreaks.map(fb => {
                  const top = timeToPx(fb.start)
                  const height = durationPx(fb.start, fb.end)
                  return (
                    <div
                      key={fb.id}
                      style={{
                        position: 'absolute',
                        top, height,
                        left: 0, right: 0,
                        background: 'rgba(255,159,28,0.12)',
                        borderTop: '2px solid rgba(255,159,28,0.5)',
                        borderBottom: '2px solid rgba(255,159,28,0.5)',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <span style={{
                        fontSize: 11,
                        color: '#FF9F1C',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        background: 'rgba(8,1,15,0.7)',
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}>
                        🍕 {fb.label} · {formatTime(fb.start)}–{formatTime(fb.end)}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Stage columns */}
              {STAGES.map(stage => {
                const stagePerformers = dayPerformers.filter(p => p.stage === stage.id)
                return (
                  <div
                    key={stage.id}
                    style={{
                      width: STAGE_W,
                      height: TOTAL_H,
                      position: 'relative',
                      borderRight: '1px solid rgba(255,255,255,0.05)',
                      zIndex: 2,
                    }}
                  >
                    {stagePerformers.map(performer => {
                      const attendeeIds = getAttendees(performer.id)
                      const attendees = state.users.filter(u => attendeeIds.includes(u.id))
                      const isPlanned = attendeeIds.length > 0
                      const top    = timeToPx(performer.start)
                      const height = Math.max(durationPx(performer.start, performer.end) - 3, 28)
                      const allGoing = attendeeIds.length === state.users.length

                      return (
                        <button
                          key={performer.id}
                          className={`grid-block ${isPlanned ? 'grid-block-planned' : ''} ${performer.headliner ? 'grid-block-headliner' : ''}`}
                          style={{
                            top,
                            height,
                            '--stage-color': stage.color,
                            background: isPlanned
                              ? `linear-gradient(160deg, ${stage.color}dd, ${stage.color}88)`
                              : `linear-gradient(160deg, ${stage.color}28, ${stage.color}14)`,
                            borderColor: isPlanned ? `${stage.color}88` : `${stage.color}30`,
                          }}
                          onClick={() => openSheet(performer.id)}
                        >
                          <div className="grid-block-inner">
                            <div className="grid-block-name">{performer.name}</div>
                            {height > 38 && (
                              <div className="grid-block-time">
                                {formatTime(performer.start)}–{formatTime(performer.end)}
                              </div>
                            )}
                            {isPlanned && (
                              <div className="grid-block-dots">
                                {allGoing ? (
                                  <span className="grid-all-badge">ALL</span>
                                ) : (
                                  attendees.map(u => (
                                    <span
                                      key={u.id}
                                      className="grid-dot"
                                      style={{ background: u.color }}
                                    >
                                      {u.name[0]}
                                    </span>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
