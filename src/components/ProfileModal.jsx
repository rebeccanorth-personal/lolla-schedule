import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function ProfileModal() {
  const { state, dispatch } = useApp()
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')

  if (!state.profileModalOpen) return null

  function startEdit(user) {
    setEditingId(user.id)
    setEditName(user.name)
  }

  function saveEdit() {
    if (editName.trim()) {
      dispatch({ type: 'UPDATE_USER_NAME', userId: editingId, name: editName.trim() })
    }
    setEditingId(null)
  }

  function close() {
    dispatch({ type: 'CLOSE_PROFILE' })
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-title">Your Crew</div>
        <div className="modal-subtitle">
          Rename anyone below — your names show up on every show you're added to.
        </div>

        <div className="profile-list">
          {state.users.map(user => {
            const isEditing = editingId === user.id
            const pickCount = Object.keys(state.schedules[user.id] || {}).length

            return (
              <div key={user.id} className="profile-item">
                <div
                  className="user-avatar"
                  style={{
                    background: `${user.color}22`,
                    borderColor: user.color,
                    boxShadow: `0 0 10px ${user.color}33`,
                  }}
                >
                  {user.emoji}
                </div>

                <div className="profile-item-info">
                  {isEditing ? (
                    <input
                      className="name-input"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveEdit() }}
                      autoFocus
                      maxLength={20}
                    />
                  ) : (
                    <>
                      <div className="profile-item-name" style={{ color: user.color }}>
                        {user.name}
                      </div>
                      <div className="profile-item-count">
                        {pickCount} show{pickCount !== 1 ? 's' : ''} planned
                      </div>
                    </>
                  )}
                </div>

                {isEditing ? (
                  <button
                    className="profile-edit-btn"
                    onClick={saveEdit}
                    style={{ color: 'var(--teal)', borderColor: 'var(--teal)' }}
                  >
                    Save
                  </button>
                ) : (
                  <button className="profile-edit-btn" onClick={() => startEdit(user)}>
                    Rename
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ padding: '8px 20px 4px' }}>
          <button className="btn btn-ghost" onClick={close}>Done</button>
        </div>
      </div>
    </div>
  )
}
