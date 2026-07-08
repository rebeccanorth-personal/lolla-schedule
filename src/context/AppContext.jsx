import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { PERFORMERS, overlaps, getPerformerById } from '../data/lineup'

const AppContext = createContext(null)

export const DEFAULT_USERS = [
  { id: 'u2', name: 'Ilana',   color: '#8338EC', emoji: '⚡' },
  { id: 'u4', name: 'Jamie',   color: '#FFBE0B', emoji: '🔥' },
  { id: 'u3', name: 'Kara',    color: '#00C2FF', emoji: '🎵' },
  { id: 'u1', name: 'Rebecca', color: '#FF006E', emoji: '💃' },
]

const ALL_USER_IDS = DEFAULT_USERS.map(u => u.id)

// schedules[userId][performerId] = true
// foodBreaks: [{ id, day, start, end, label }]
const INITIAL_STATE = {
  users: DEFAULT_USERS,
  activeDay: 'Thursday',
  activeTab: 'schedule',
  schedules: { u1: {}, u2: {}, u3: {}, u4: {} },
  foodBreaks: [],
  attendeeSheet: null,   // performerId when open
  foodModal: false,
  profileModalOpen: false,
}

function loadState() {
  try {
    const raw = localStorage.getItem('loonipalooza-state')
    if (!raw) return INITIAL_STATE
    const saved = JSON.parse(raw)
    // Always use default emoji/color; only restore saved names
    const users = DEFAULT_USERS.map(def => {
      const savedUser = (saved.users || []).find(u => u.id === def.id)
      return { ...def, name: savedUser?.name ?? def.name }
    })
    return {
      ...INITIAL_STATE,
      ...saved,
      users,
      attendeeSheet: null,
      foodModal: false,
      profileModalOpen: false,
    }
  } catch {
    return INITIAL_STATE
  }
}

function saveState(state) {
  try {
    const { attendeeSheet, foodModal, profileModalOpen, ...toSave } = state
    localStorage.setItem('loonipalooza-state', JSON.stringify(toSave))
  } catch {}
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_DAY':
      return { ...state, activeDay: action.day, activeTab: 'schedule' }

    case 'SET_TAB':
      return { ...state, activeTab: action.tab }

    case 'UPDATE_USER_NAME': {
      const users = state.users.map(u =>
        u.id === action.userId ? { ...u, name: action.name } : u
      )
      return { ...state, users }
    }

    case 'OPEN_ATTENDEE_SHEET':
      return { ...state, attendeeSheet: action.performerId }

    case 'CLOSE_ATTENDEE_SHEET':
      return { ...state, attendeeSheet: null }

    case 'SET_SHOW_ATTENDEES': {
      const { performerId, attendeeIds } = action
      const nextSchedules = { ...state.schedules }
      state.users.forEach(u => {
        const current = { ...nextSchedules[u.id] }
        if (attendeeIds.includes(u.id)) {
          current[performerId] = true
        } else {
          delete current[performerId]
        }
        nextSchedules[u.id] = current
      })
      return { ...state, schedules: nextSchedules, attendeeSheet: null }
    }

    case 'OPEN_FOOD_MODAL':
      return { ...state, foodModal: true }

    case 'CLOSE_FOOD_MODAL':
      return { ...state, foodModal: false }

    case 'ADD_FOOD_BREAK': {
      const fb = { ...action.foodBreak, id: `food-${Date.now()}` }
      return { ...state, foodBreaks: [...state.foodBreaks, fb], foodModal: false }
    }

    case 'REMOVE_FOOD_BREAK': {
      return { ...state, foodBreaks: state.foodBreaks.filter(f => f.id !== action.id) }
    }

    case 'OPEN_PROFILE':
      return { ...state, profileModalOpen: true }

    case 'CLOSE_PROFILE':
      return { ...state, profileModalOpen: false }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const dayPerformers = PERFORMERS.filter(p => p.day === state.activeDay)

  function getAttendees(performerId) {
    return state.users
      .filter(u => state.schedules[u.id]?.[performerId])
      .map(u => u.id)
  }

  function getFoodBreaksForDay(day) {
    return state.foodBreaks
      .filter(f => f.day === day)
      .sort((a, b) => a.start.localeCompare(b.start))
  }

  // For the crew view: everyone's schedule + food breaks, sorted by time
  function getCrewScheduleForDay(day) {
    const events = []

    // Shows — collect all shows any person is attending
    const seen = new Set()
    state.users.forEach(u => {
      Object.keys(state.schedules[u.id] || {}).forEach(pid => {
        if (!seen.has(pid)) {
          const p = getPerformerById(pid)
          if (p && p.day === day) {
            seen.add(pid)
            events.push({ type: 'show', performer: p })
          }
        }
      })
    })

    // Food breaks
    getFoodBreaksForDay(day).forEach(fb => {
      events.push({ type: 'food', foodBreak: fb })
    })

    return events.sort((a, b) => {
      const aTime = a.type === 'show' ? a.performer.start : a.foodBreak.start
      const bTime = b.type === 'show' ? b.performer.start : b.foodBreak.start
      return aTime.localeCompare(bTime)
    })
  }

  function hasConflict(userId, performer) {
    const userSchedule = state.schedules[userId] || {}
    return Object.keys(userSchedule).some(pid => {
      const p = getPerformerById(pid)
      return p && p.day === performer.day && p.id !== performer.id && overlaps(performer, p)
    })
  }

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      dayPerformers,
      getAttendees,
      getFoodBreaksForDay,
      getCrewScheduleForDay,
      hasConflict,
      allUserIds: ALL_USER_IDS,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
