import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { PERFORMERS, overlaps, getPerformerById } from '../data/lineup'

const AppContext = createContext(null)

const USER_COLORS = ['#FF006E', '#8338EC', '#00C2FF', '#FFBE0B', '#06D6A0', '#FB5607']

// schedules[userId][performerId] = true
// foodBreaks: [{ id, day, start, end, label }]
const INITIAL_STATE = {
  users: [],
  activeDay: 'Thursday',
  activeTab: 'schedule',
  schedules: {},
  foodBreaks: [],
  theme: 'dark',
  attendeeSheet: null,
  foodModal: false,
  profileModalOpen: false,
}

function loadState() {
  try {
    const raw = localStorage.getItem('loonipalooza-state')
    if (!raw) return INITIAL_STATE
    const saved = JSON.parse(raw)
    return {
      ...INITIAL_STATE,
      ...saved,
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

function nextColor(users) {
  return USER_COLORS[users.length % USER_COLORS.length]
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_DAY':
      return { ...state, activeDay: action.day, activeTab: 'schedule' }

    case 'SET_TAB':
      return { ...state, activeTab: action.tab }

    case 'ADD_USER': {
      const id = `u-${Date.now()}`
      const color = nextColor(state.users)
      const user = { id, name: action.name, emoji: action.emoji, color }
      return {
        ...state,
        users: [...state.users, user],
        schedules: { ...state.schedules, [id]: {} },
      }
    }

    case 'UPDATE_USER': {
      const users = state.users.map(u =>
        u.id === action.userId
          ? { ...u, name: action.name ?? u.name, emoji: action.emoji ?? u.emoji }
          : u
      )
      return { ...state, users }
    }

    case 'REMOVE_USER': {
      const users = state.users.filter(u => u.id !== action.userId)
      const schedules = { ...state.schedules }
      delete schedules[action.userId]
      return { ...state, users, schedules }
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

    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }

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

  function getCrewScheduleForDay(day) {
    const events = []
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

  const allUserIds = state.users.map(u => u.id)

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      dayPerformers,
      getAttendees,
      getFoodBreaksForDay,
      getCrewScheduleForDay,
      hasConflict,
      allUserIds,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
