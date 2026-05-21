import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function ShareModal() {
  const { state, dispatch } = useApp()
  const [copied, setCopied] = useState(false)
  const [importMode, setImportMode] = useState(false)
  const [importUrl, setImportUrl] = useState('')
  const [importError, setImportError] = useState('')
  const [importTargetUser, setImportTargetUser] = useState(null)

  if (!state.shareModalOpen) return null

  const currentUser = state.users.find(u => u.id === state.currentUserId)

  // Build a shareable URL encoding this user's full schedule
  function buildShareUrl() {
    const scheduleData = {
      userName: currentUser.name,
      userEmoji: currentUser.emoji,
      schedules: state.schedules[state.currentUserId],
    }
    const encoded = btoa(JSON.stringify(scheduleData))
    return `${window.location.origin}${window.location.pathname}#import=${encoded}`
  }

  async function handleCopy() {
    const url = buildShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // fallback: select input
    }
  }

  function handleImport() {
    setImportError('')
    try {
      let raw = importUrl.trim()
      // Extract the hash portion
      const hashIdx = raw.indexOf('#import=')
      if (hashIdx !== -1) raw = raw.slice(hashIdx + 8)
      const data = JSON.parse(atob(raw))
      if (!data.schedules) throw new Error('Invalid schedule data')
      if (!importTargetUser) {
        setImportError('Please select which friend slot to assign this to.')
        return
      }
      dispatch({
        type: 'IMPORT_SCHEDULE',
        userId: importTargetUser,
        schedule: data.schedules,
      })
      // Optionally update name
      if (data.userName) {
        dispatch({ type: 'UPDATE_USER_NAME', userId: importTargetUser, name: data.userName })
      }
      dispatch({ type: 'CLOSE_SHARE' })
    } catch {
      setImportError('Could not read that link. Make sure you pasted the full share URL.')
    }
  }

  const shareUrl = buildShareUrl()

  return (
    <div className="modal-overlay" onClick={() => dispatch({ type: 'CLOSE_SHARE' })}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-title">
          {importMode ? 'Import a Friend\'s Schedule' : 'Share Your Schedule'}
        </div>
        <div className="modal-subtitle">
          {importMode
            ? 'Paste a schedule link from one of your friends.'
            : `Share ${currentUser.name}'s picks with your crew.`}
        </div>

        {!importMode ? (
          <>
            <div className="modal-section">
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontWeight: 500 }}>
                Your share link
              </div>
              <div className="share-url-box">{shareUrl}</div>
              {copied && <div className="copy-success">✓ Copied to clipboard!</div>}
              <button className="btn btn-primary" onClick={handleCopy}>
                📋 Copy Link
              </button>
            </div>

            <div className="modal-section" style={{ paddingTop: 16 }}>
              <div
                style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, lineHeight: 1.6 }}
              >
                Send this link to your friends via iMessage. When they open it, they can import your
                schedule into their app.
              </div>
            </div>

            <div className="btn-row" style={{ paddingTop: 8 }}>
              <button
                className="btn btn-secondary"
                onClick={() => setImportMode(true)}
              >
                📥 Import a Friend's Link
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => dispatch({ type: 'CLOSE_SHARE' })}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-section">
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontWeight: 500 }}>
                Paste their share link
              </div>
              <textarea
                className="name-input"
                style={{ resize: 'none', height: 80, fontSize: 13 }}
                placeholder="Paste link here…"
                value={importUrl}
                onChange={e => setImportUrl(e.target.value)}
              />

              <div style={{ fontSize: 12, color: 'var(--muted)', margin: '12px 0 8px', fontWeight: 500 }}>
                Assign to friend slot
              </div>
              <div className="import-friend-select">
                {state.users.filter(u => u.id !== state.currentUserId).map(u => (
                  <button
                    key={u.id}
                    className="friend-select-btn"
                    style={{ borderColor: importTargetUser === u.id ? u.color : undefined }}
                    onClick={() => setImportTargetUser(u.id)}
                  >
                    <div
                      className="user-avatar-sm"
                      style={{ background: `${u.color}22`, border: `1px solid ${u.color}` }}
                    >
                      {u.emoji}
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.04em' }}>
                      {u.name}
                    </span>
                    {importTargetUser === u.id && (
                      <span style={{ marginLeft: 'auto', color: u.color }}>✓</span>
                    )}
                  </button>
                ))}
              </div>

              {importError && (
                <div style={{ color: 'var(--pink)', fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
                  {importError}
                </div>
              )}
            </div>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleImport}>
                Import Schedule
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => { setImportMode(false); setImportError('') }}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
