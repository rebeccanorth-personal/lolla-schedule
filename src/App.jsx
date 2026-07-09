import { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Header        from './components/Header'
import DaySelector   from './components/DaySelector'
import Navigation    from './components/Navigation'
import LineupTimeline from './components/LineupTimeline'
import CrewView      from './components/FriendsView'
import MapView       from './components/MapView'
import AttendeeSheet from './components/AttendeeSheet'
import FoodModal     from './components/FoodModal'
import ProfileModal  from './components/ProfileModal'

function AppInner() {
  const { state } = useApp()

  useEffect(() => {
    document.documentElement.classList.toggle('light', state.theme === 'light')
  }, [state.theme])

  return (
    <div className="app-shell">
      <Header />
      <div className="header-spacer" />
      <DaySelector />

      <div className="content-area">
        {state.activeTab === 'schedule' && <LineupTimeline />}
        {state.activeTab === 'friends'  && <CrewView />}
        {state.activeTab === 'map'      && <MapView />}
      </div>

      <Navigation />

      <AttendeeSheet />
      <FoodModal />
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
