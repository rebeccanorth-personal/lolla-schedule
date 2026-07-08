import { AppProvider, useApp } from './context/AppContext'
import Header        from './components/Header'
import DaySelector   from './components/DaySelector'
import Navigation    from './components/Navigation'
import LineupTimeline from './components/LineupTimeline'
import CrewView      from './components/FriendsView'
import AttendeeSheet from './components/AttendeeSheet'
import FoodModal     from './components/FoodModal'
import ProfileModal  from './components/ProfileModal'

function AppInner() {
  const { state } = useApp()

  return (
    <div className="app-shell">
      <Header />
      <DaySelector />

      <div className="content-area">
        {state.activeTab === 'schedule' && <LineupTimeline />}
        {state.activeTab === 'friends'  && <CrewView />}
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
