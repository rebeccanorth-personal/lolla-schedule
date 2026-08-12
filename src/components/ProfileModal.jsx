import { useState } from 'react'
import { useApp } from '../context/AppContext'

const EMOJI_OPTIONS = [
  '😀','😎','🤩','🥳','🎉','🔥','⚡','💃','🕺','🎵',
  '🎸','🎤','🌟','✨','💫','🦋','🌈','🍕','🌙','☀️',
  '🐉','🦄','🎯','🏆','❤️','💜','💙','💛','🩷','🖤',
]

export default function ProfileModal() {
  const { state, dispatch } = useApp()
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editEmoji, setEditEmoji] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [addingNew, setAddingNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('🎉')
  const [showNewEmojiPicker, setShowNewEmojiPicker] = useState(false)

  if (!state.profileModalOpen) return null

  function close() {
    setEditingId(null)
    setAddingNew(false)
    dispatch({ type: 'CLOSE_PROFILE' })
  }

  function startEdit(user) {
    setEditingId(user.id)
    setEditName(user.name)
    setEditEmoji(user.emoji)
    setShowEmojiPicker(false)
    setAddingNew(false)
  }

  function saveEdit() {
    if (editName.trim()) {
      dispatch({ type: 'UPDATE_USER', userId: editingId, name: editName.trim(), emoji: editEmoji })
    }
    setEditingId(null)
    setShowEmojiPicker(false)
  }

  function removeUser(userId) {
    dispatch({ type: 'REMOVE_USER', userId })
    if (editingId === userId) setEditingId(null)
  }

  function addUser() {
    if (!newName.trim()) return
    dispatch({ type: 'ADD_USER', name: newName.trim(), emoji: newEmoji })
    setNewName('')
    setNewEmoji('🎉')
    setAddingNew(false)
    setShowNewEmojiPicker(false)
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-title">Your Crew</div>
        <div className="modal-subtitle">
          Add everyone going — names and icons show up on every show you're added to.
        </div>

        <div className="profile-list">
          {state.users.map(user => {
            const isEditing = editingId === user.id
            const pickCount = Object.keys(state.schedules[user.id] || {}).length

            return (
              <div key={user.id} className="profile-item">
                {/* Avatar / emoji picker trigger */}
                <button
                  className="user-avatar"
                  style={{ background: `${user.color}22`, borderColor: user.color, boxShadow: `0 0 10px ${user.color}33` }}
                  onClick={() => { if (isEditing) { setShowEmojiPicker(p => !p) } else { startEdit(user) } }}
                  title={isEditing ? 'Pick icon' : 'Edit'}
                >
                  {isEditing ? (editEmoji || user.emoji) : user.emoji}
                </button>

                <div className="profile-item-info">
                  {isEditing ? (
                    <input
                      className="name-input"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveEdit() }}
                      autoFocus
                      maxLength={20}
                      placeholder="Name"
                    />
                  ) : (
                    <>
                      <div className="profile-item-name" style={{ color: user.color }}>{user.name}</div>
                      <div className="profile-item-count">{pickCount} show{pickCount !== 1 ? 's' : ''} planned</div>
                    </>
                  )}
                </div>

                {isEditing ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="profile-edit-btn" onClick={saveEdit} style={{ color: 'var(--teal)', borderColor: 'var(--teal)' }}>Save</button>
                    <button className="profile-edit-btn" onClick={() => removeUser(user.id)} style={{ color: 'var(--pink)', borderColor: 'var(--pink)' }}>✕</button>
                  </div>
                ) : (
                  <button className="profile-edit-btn" onClick={() => startEdit(user)}>Edit</button>
                )}

                {/* Inline emoji picker for this user */}
                {isEditing && showEmojiPicker && (
                  <div className="emoji-picker">
                    {EMOJI_OPTIONS.map(e => (
                      <button
                        key={e}
                        className={`emoji-opt ${editEmoji === e ? 'active' : ''}`}
                        onClick={() => { setEditEmoji(e); setShowEmojiPicker(false) }}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Add new crew member */}
          {addingNew ? (
            <div className="profile-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button
                  className="user-avatar"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', fontSize: 22 }}
                  onClick={() => setShowNewEmojiPicker(p => !p)}
                >
                  {newEmoji}
                </button>
                <input
                  className="name-input"
                  style={{ flex: 1 }}
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addUser() }}
                  autoFocus
                  maxLength={20}
                  placeholder="Name"
                />
                <button className="profile-edit-btn" onClick={addUser} style={{ color: 'var(--teal)', borderColor: 'var(--teal)' }}>Add</button>
                <button className="profile-edit-btn" onClick={() => setAddingNew(false)} style={{ color: 'var(--muted)' }}>✕</button>
              </div>
              {showNewEmojiPicker && (
                <div className="emoji-picker">
                  {EMOJI_OPTIONS.map(e => (
                    <button
                      key={e}
                      className={`emoji-opt ${newEmoji === e ? 'active' : ''}`}
                      onClick={() => { setNewEmoji(e); setShowNewEmojiPicker(false) }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button className="profile-add-btn" onClick={() => setAddingNew(true)}>
              + Add crew member
            </button>
          )}
        </div>

        <div style={{ padding: '8px 20px 4px' }}>
          <button className="btn btn-ghost" onClick={close}>Done</button>
        </div>
      </div>
    </div>
  )
}
