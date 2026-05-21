import { useApp } from '../context/AppContext'
import { getStageById, formatTime } from '../data/lineup'

export default function FriendsView() {
  const { state, getUserScheduleForDay } = useApp()

  // Build a set of performer IDs that ALL users share on this day
  const allSchedules = state.users.map(u => ({
    user: u,
    items: getUserScheduleForDay(u.id, state.activeDay),
  }))

  const sharedIds = (() => {
    const counts = {}
    allSchedules.forEach(({ items }) => {
      items.forEach(({ performer }) => {
        counts[performer.id] = (counts[performer.id] || 0) + 1
      })
    })
    return new Set(Object.keys(counts).filter(id => counts[id] > 1))
  })()

  return (
    <div className="friends-view">
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 13,
          letterSpacing: '0.12em',
          color: 'var(--muted)',
          marginBottom: 14,
          textTransform: 'uppercase',
        }}
      >
        {state.activeDay} · All Schedules
      </div>

      <div className="friends-grid">
        {allSchedules.map(({ user, items }) => (
          <FriendCard
            key={user.id}
            user={user}
            items={items}
            sharedIds={sharedIds}
            isCurrentUser={user.id === state.currentUserId}
          />
        ))}
      </div>

      {sharedIds.size > 0 && (
        <div
          style={{
            marginTop: 16,
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>
            🤝 {sharedIds.size} shared {sharedIds.size === 1 ? 'act' : 'acts'}
          </span>
          {' '}that multiple people want to see are highlighted.
        </div>
      )}
    </div>
  )
}

function FriendCard({ user, items, sharedIds, isCurrentUser }) {
  return (
    <div
      className="friend-card"
      style={{
        borderColor: isCurrentUser
          ? `${user.color}44`
          : 'var(--border)',
        boxShadow: isCurrentUser
          ? `0 0 16px ${user.color}18`
          : 'none',
      }}
    >
      <div className="friend-card-header">
        <div
          className="user-avatar-sm"
          style={{
            background: `${user.color}22`,
            border: `1px solid ${user.color}`,
          }}
        >
          {user.emoji}
        </div>
        <div
          className="friend-card-name"
          style={{ color: isCurrentUser ? user.color : 'var(--text)' }}
        >
          {isCurrentUser ? 'ME' : user.name.toUpperCase()}
        </div>
        <div className="friend-card-count">{items.length}</div>
      </div>

      <div className="friend-card-body">
        {items.length === 0 ? (
          <div className="friend-empty">No picks</div>
        ) : (
          items.map(({ performer, priority }) => {
            const stage = getStageById(performer.stage)
            const shared = sharedIds.has(performer.id)
            return (
              <div
                key={performer.id}
                className="friend-act"
                style={{
                  background: `${stage.color}${shared ? '44' : '28'}`,
                  border: shared ? `1px solid ${stage.color}60` : 'none',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="friend-act-name">{performer.name}</div>
                  <div className="friend-act-time">
                    {formatTime(performer.start)} · {stage.shortName}
                  </div>
                </div>
                {priority === 1 && (
                  <span style={{ fontSize: 10, color: 'var(--yellow)', flexShrink: 0 }}>★</span>
                )}
                {shared && (
                  <span className="shared-badge">shared</span>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
