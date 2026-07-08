import { useState } from 'react'
import { useApp } from '../context/AppContext'

const QUICK_LABELS = ['Lunch', 'Dinner', 'Snack break', 'Food & drinks', 'Coffee run']

export default function FoodModal() {
  const { state, dispatch } = useApp()
  const [label, setLabel] = useState('Lunch')
  const [custom, setCustom] = useState('')
  const [start, setStart] = useState('12:00')
  const [end, setEnd] = useState('13:00')

  if (!state.foodModal) return null

  function close() { dispatch({ type: 'CLOSE_FOOD_MODAL' }) }

  function save() {
    const finalLabel = custom.trim() || label
    if (!finalLabel || !start || !end) return
    dispatch({
      type: 'ADD_FOOD_BREAK',
      foodBreak: { day: state.activeDay, start, end, label: finalLabel },
    })
    setCustom('')
    setStart('12:00')
    setEnd('13:00')
  }

  return (
    <div className="modal-overlay center" onClick={close}>
      <div className="modal-card" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>
        <div className="modal-title" style={{ fontSize: 20 }}>🍕 Food Break</div>
        <div className="modal-subtitle">Add a food stop to {state.activeDay}'s plan</div>

        <div className="modal-body" style={{ paddingTop: 0 }}>
          {/* Quick labels */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {QUICK_LABELS.map(l => (
              <button
                key={l}
                className={`quick-label-btn ${label === l && !custom ? 'active' : ''}`}
                onClick={() => { setLabel(l); setCustom('') }}
              >
                {l}
              </button>
            ))}
          </div>

          <input
            className="name-input"
            placeholder="Or type a custom label…"
            value={custom}
            onChange={e => setCustom(e.target.value)}
            maxLength={30}
            style={{ marginBottom: 14 }}
          />

          <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, letterSpacing: '0.08em' }}>FROM</div>
              <input
                type="time"
                className="name-input"
                value={start}
                onChange={e => setStart(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, letterSpacing: '0.08em' }}>TO</div>
              <input
                type="time"
                className="name-input"
                value={end}
                onChange={e => setEnd(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="btn-row" style={{ paddingBottom: 16 }}>
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Add to Schedule</button>
        </div>
      </div>
    </div>
  )
}
