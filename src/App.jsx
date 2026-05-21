import { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Header        from './components/Header'
import DaySelector   from './components/DaySelector'
import Navigation    from './components/Navigation'
import LineupTimeline from './components/LineupTimeline'
import MySchedule    from './components/MySchedule'
import FriendsView   from './components/FriendsView'
import ConflictModal from './components/ConflictModal'
import ShareModal    from './components/ShareModal'
import ProfileModal  from './components/ProfileModal'

function AppInner() {
  const { state, dispatch } = useApp()

  // Handle import URLs — e.g. https://app.com/#import=BASE64
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#import=')) {
      const encoded = hash.slice(8)
      if (encoded) {
        // Open share modal in import mode by storing in URL state
        // We surface this via the share modal's import flow
        window.history.replaceState(null, '', window.location.pathname)
        dispatch({ type: 'OPEN_SHARE' })
      }
    }
  }, [])

  return (
    <div className="app-shell">
      <Header />
      <DaySelector />

      <div className="content-area">
        {state.activeTab === 'lineup'   && <LineupTimeline />}
        {state.activeTab === 'schedule' && <MySchedule />}
        {state.activeTab === 'friends'  && <FriendsView />}
      </div>

      <Navigation />

      {/* Modals */}
      <ConflictModal />
      <ShareModal />
      <ProfileModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
