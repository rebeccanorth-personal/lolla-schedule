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

  function selectUser(userId) {
    dispatch({ type: 'SET_USER', userId })
    dispatch({ type: 'CLOSE_PROFILE' })
  }

  return (
    <div className="modal-overlay" onClick={() => dispatch({ type: 'CLOSE_PROFILE' })}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-title">Who are you?</div>
        <div className="modal-subtitle">
          Each person builds their own schedule. Tap to switch profiles.
        </div>

        <div className="profile-list">
          {state.users.map(user => {
            const isActive = user.id === state.currentUserId
            const isEditing = editingId === user.id
            const pickCount = Object.keys(state.schedules[user.id] || {}).length

            return (
              <div key={user.id} className="profile-item" onClick={() => !isEditing && selectUser(user.id)}>
                <div
                  className="user-avatar"
                  style={{
                    background: `${user.color}22`,
                    borderColor: isActive ? user.color : 'transparent',
                    boxShadow: isActive ? `0 0 12px ${user.color}44` : 'none',
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
                      onClick={e => e.stopPropagation()}
                      maxLength={20}
                    />
                  ) : (
                    <>
                      <div
                        className="profile-item-name"
                        style={{ color: isActive ? user.color : 'var(--text)' }}
                      >
                        {user.name}
                      </div>
                      <div className="profile-item-count">
                        {pickCount} total picks
                      </div>
                    </>
                  )}
                </div>

                {isEditing ? (
                  <button
                    className="profile-edit-btn"
                    onClick={e => { e.stopPropagation(); saveEdit() }}
                    style={{ color: 'var(--teal)', borderColor: 'var(--teal)' }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="profile-edit-btn"
                    onClick={e => { e.stopPropagation(); startEdit(user) }}
                  >
                    Rename
                  </button>
                )}

                {isActive && !isEditing && (
                  <div className="profile-active-indicator">✓</div>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ padding: '8px 20px 4px' }}>
          <button
            className="btn btn-ghost"
            onClick={() => dispatch({ type: 'CLOSE_PROFILE' })}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
