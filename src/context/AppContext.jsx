import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { PERFORMERS, overlaps, getPerformerById } from '../data/lineup'

const AppContext = createContext(null)

const DEFAULT_USERS = [
  { id: 'u1', name: 'Me',       color: '#FF006E', emoji: '🎵' },
  { id: 'u2', name: 'Friend 1', color: '#8338EC', emoji: '🎸' },
  { id: 'u3', name: 'Friend 2', color: '#00C2FF', emoji: '🎤' },
  { id: 'u4', name: 'Friend 3', color: '#FFBE0B', emoji: '🥁' },
]

const INITIAL_STATE = {
  users: DEFAULT_USERS,
  currentUserId: 'u1',
  activeDay: 'Thursday',
  activeTab: 'lineup',
  // schedules[userId][performerId] = { priority: 1|2 }
  schedules: { u1: {}, u2: {}, u3: {}, u4: {} },
  pendingConflict: null, // { newPerformer, conflicts: Performer[] }
  shareModalOpen: false,
  profileModalOpen: false,
}

function loadState() {
  try {
    const raw = localStorage.getItem('lolla-2026-state')
    if (!raw) return INITIAL_STATE
    const saved = JSON.parse(raw)
    return {
      ...INITIAL_STATE,
      ...saved,
      pendingConflict: null,
      shareModalOpen: false,
      profileModalOpen: false,
    }
  } catch {
    return INITIAL_STATE
  }
}

function saveState(state) {
  try {
    const { pendingConflict, shareModalOpen, profileModalOpen, ...toSave } = state
    localStorage.setItem('lolla-2026-state', JSON.stringify(toSave))
  } catch {}
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_USER':
      return { ...state, currentUserId: action.userId }

    case 'SET_DAY':
      return { ...state, activeDay: action.day, activeTab: 'lineup' }

    case 'SET_TAB':
      return { ...state, activeTab: action.tab }

    case 'UPDATE_USER_NAME': {
      const users = state.users.map(u =>
        u.id === action.userId ? { ...u, name: action.name } : u
      )
      return { ...state, users }
    }

    case 'TOGGLE_PERFORMER': {
      const { performer } = action
      const uid = state.currentUserId
      const userSchedule = state.schedules[uid] || {}

      // Remove if already selected
      if (userSchedule[performer.id]) {
        const next = { ...userSchedule }
        delete next[performer.id]
        return {
          ...state,
          schedules: { ...state.schedules, [uid]: next },
        }
      }

      // Check for conflicts with existing picks on same day
      const conflicts = Object.keys(userSchedule)
        .map(id => getPerformerById(id))
        .filter(p => p && p.day === performer.day && overlaps(performer, p))

      if (conflicts.length > 0) {
        return { ...state, pendingConflict: { newPerformer: performer, conflicts } }
      }

      // No conflict — add with priority 1
      return {
        ...state,
        schedules: {
          ...state.schedules,
          [uid]: { ...userSchedule, [performer.id]: { priority: 1 } },
        },
      }
    }

    case 'RESOLVE_CONFLICT': {
      // action: { keepNew, priority } where priority = id of the one to mark #1
      const { keepNew, priorityId } = action
      const { newPerformer, conflicts } = state.pendingConflict
      const uid = state.currentUserId
      const userSchedule = { ...state.schedules[uid] }

      if (!keepNew) {
        // discard new, keep existing as-is
        return { ...state, pendingConflict: null }
      }

      // Add new performer
      userSchedule[newPerformer.id] = { priority: priorityId === newPerformer.id ? 1 : 2 }

      // Update existing conflicting acts' priorities
      conflicts.forEach(c => {
        if (userSchedule[c.id]) {
          userSchedule[c.id] = { priority: priorityId === c.id ? 1 : 2 }
        }
      })

      return {
        ...state,
        pendingConflict: null,
        schedules: { ...state.schedules, [uid]: userSchedule },
      }
    }

    case 'CLEAR_CONFLICT':
      return { ...state, pendingConflict: null }

    case 'OPEN_SHARE':
      return { ...state, shareModalOpen: true }

    case 'CLOSE_SHARE':
      return { ...state, shareModalOpen: false }

    case 'OPEN_PROFILE':
      return { ...state, profileModalOpen: true }

    case 'CLOSE_PROFILE':
      return { ...state, profileModalOpen: false }

    case 'IMPORT_SCHEDULE': {
      // action: { userId, schedule } — schedule is { [performerId]: { priority } }
      return {
        ...state,
        schedules: { ...state.schedules, [action.userId]: action.schedule },
      }
    }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  // Helpers derived from state
  const currentUser   = state.users.find(u => u.id === state.currentUserId)
  const dayPerformers = PERFORMERS.filter(p => p.day === state.activeDay)
  const userSchedule  = state.schedules[state.currentUserId] || {}

  function isSelected(performerId) {
    return !!userSchedule[performerId]
  }

  function getPriority(performerId) {
    return userSchedule[performerId]?.priority ?? null
  }

  function getConflictsFor(performerId) {
    const perf = getPerformerById(performerId)
    if (!perf) return []
    return Object.keys(userSchedule)
      .filter(id => id !== performerId)
      .map(id => getPerformerById(id))
      .filter(p => p && p.day === perf.day && overlaps(perf, p))
  }

  function getUserScheduleForDay(userId, day) {
    const schedule = state.schedules[userId] || {}
    return Object.entries(schedule)
      .map(([id, meta]) => ({ performer: getPerformerById(id), ...meta }))
      .filter(e => e.performer && e.performer.day === day)
      .sort((a, b) => a.performer.start.localeCompare(b.performer.start))
  }

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      currentUser,
      dayPerformers,
      userSchedule,
      isSelected,
      getPriority,
      getConflictsFor,
      getUserScheduleForDay,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
