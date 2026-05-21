export const STAGES = [
  { id: 'main',    name: 'Grant Park Stage', shortName: 'GRANT PARK', color: '#FF006E' },
  { id: 'perrys',  name: "Perry's",          shortName: "PERRY'S",    color: '#8338EC' },
  { id: 'tmobile', name: 'T-Mobile Stage',   shortName: 'T-MOBILE',   color: '#00C2FF' },
  { id: 'bmi',     name: 'BMI Stage',        shortName: 'BMI',        color: '#FFBE0B' },
  { id: 'pepsi',   name: 'Pepsi Stage',      shortName: 'PEPSI',      color: '#06D6A0' },
  { id: 'samsung', name: 'Samsung Stage',    shortName: 'SAMSUNG',    color: '#FB5607' },
]

export const DAYS = ['Thursday', 'Friday', 'Saturday', 'Sunday']

// ─── THURSDAY ────────────────────────────────────────────────────────────────
const THURSDAY = [
  // Grant Park Stage
  { id: 'thu-main-1', name: 'VELVET CHAOS',       stage: 'main',    day: 'Thursday', start: '11:00', end: '12:30', genre: 'Alt Rock' },
  { id: 'thu-main-2', name: 'THE PHANTOM KEYS',   stage: 'main',    day: 'Thursday', start: '14:00', end: '15:30', genre: 'Indie' },
  { id: 'thu-main-3', name: 'ELECTRIC SERMON',    stage: 'main',    day: 'Thursday', start: '17:30', end: '19:00', genre: 'Pop Rock' },
  { id: 'thu-main-4', name: 'SOLAR ECLIPSE',      stage: 'main',    day: 'Thursday', start: '20:00', end: '22:00', genre: 'Rock', headliner: true },
  // Perry's
  { id: 'thu-per-1',  name: 'QUANTUM DRIFT',      stage: 'perrys',  day: 'Thursday', start: '11:00', end: '12:00', genre: 'Electronic' },
  { id: 'thu-per-2',  name: 'NEON GODDESS',       stage: 'perrys',  day: 'Thursday', start: '13:00', end: '14:30', genre: 'Electronic' },
  { id: 'thu-per-3',  name: 'AFTERGLOW',          stage: 'perrys',  day: 'Thursday', start: '15:30', end: '17:00', genre: 'House' },
  { id: 'thu-per-4',  name: 'ULTRAVIOLET',        stage: 'perrys',  day: 'Thursday', start: '18:00', end: '20:00', genre: 'Techno' },
  { id: 'thu-per-5',  name: 'PRISM BREAK',        stage: 'perrys',  day: 'Thursday', start: '21:00', end: '23:00', genre: 'EDM', headliner: true },
  // T-Mobile
  { id: 'thu-tmo-1',  name: 'CRYSTAL CAVES',      stage: 'tmobile', day: 'Thursday', start: '12:00', end: '13:00', genre: 'Dream Pop' },
  { id: 'thu-tmo-2',  name: 'ZERO GRAVITY',       stage: 'tmobile', day: 'Thursday', start: '14:30', end: '15:30', genre: 'Hip-Hop' },
  { id: 'thu-tmo-3',  name: 'DEAD SATELLITES',    stage: 'tmobile', day: 'Thursday', start: '16:30', end: '18:00', genre: 'Indie Rock' },
  { id: 'thu-tmo-4',  name: 'NOVA COMPLEX',       stage: 'tmobile', day: 'Thursday', start: '19:00', end: '20:30', genre: 'R&B' },
  // BMI
  { id: 'thu-bmi-1',  name: 'THE MIDNIGHT REVIVAL', stage: 'bmi',   day: 'Thursday', start: '11:30', end: '12:30', genre: 'Folk' },
  { id: 'thu-bmi-2',  name: 'STARFALL',            stage: 'bmi',    day: 'Thursday', start: '13:30', end: '14:30', genre: 'Country Pop' },
  { id: 'thu-bmi-3',  name: 'SHADOW PROTOCOL',    stage: 'bmi',    day: 'Thursday', start: '15:30', end: '16:30', genre: 'Electronic' },
  { id: 'thu-bmi-4',  name: 'AURORA RISE',        stage: 'bmi',    day: 'Thursday', start: '17:30', end: '19:00', genre: 'Synth Pop' },
  // Pepsi
  { id: 'thu-pep-1',  name: 'CRASH & BURN',       stage: 'pepsi',  day: 'Thursday', start: '12:30', end: '13:30', genre: 'Punk' },
  { id: 'thu-pep-2',  name: 'THE LOST HOURS',     stage: 'pepsi',  day: 'Thursday', start: '15:00', end: '16:00', genre: 'Alternative' },
  { id: 'thu-pep-3',  name: 'ELECTRIC GOSPEL',    stage: 'pepsi',  day: 'Thursday', start: '17:00', end: '18:30', genre: 'Soul' },
  { id: 'thu-pep-4',  name: 'REBEL ECHO',         stage: 'pepsi',  day: 'Thursday', start: '19:30', end: '21:00', genre: 'Hip-Hop' },
  // Samsung
  { id: 'thu-sam-1',  name: 'WILD CEREMONY',      stage: 'samsung', day: 'Thursday', start: '11:00', end: '12:00', genre: 'Indie Folk' },
  { id: 'thu-sam-2',  name: 'THE NIGHT SHIFT',    stage: 'samsung', day: 'Thursday', start: '13:00', end: '14:00', genre: 'R&B' },
  { id: 'thu-sam-3',  name: 'COSMIC STATIC',      stage: 'samsung', day: 'Thursday', start: '16:00', end: '17:00', genre: 'Experimental' },
  { id: 'thu-sam-4',  name: 'MIDNIGHT TERROR',    stage: 'samsung', day: 'Thursday', start: '18:30', end: '20:00', genre: 'Rock' },
]

// ─── FRIDAY ───────────────────────────────────────────────────────────────────
const FRIDAY = [
  // Grant Park Stage
  { id: 'fri-main-1', name: 'SUGAR CRASH',        stage: 'main',    day: 'Friday', start: '11:00', end: '12:30', genre: 'Pop Punk' },
  { id: 'fri-main-2', name: 'THE GOLDEN HOUR',    stage: 'main',    day: 'Friday', start: '14:30', end: '16:00', genre: 'Folk Rock' },
  { id: 'fri-main-3', name: 'NIGHT PARADE',       stage: 'main',    day: 'Friday', start: '17:30', end: '19:00', genre: 'Indie Pop' },
  { id: 'fri-main-4', name: 'VOID WALKER',        stage: 'main',    day: 'Friday', start: '20:00', end: '22:00', genre: 'Alternative', headliner: true },
  // Perry's
  { id: 'fri-per-1',  name: 'BINARY GHOST',       stage: 'perrys',  day: 'Friday', start: '11:00', end: '12:30', genre: 'Electronic' },
  { id: 'fri-per-2',  name: 'PLASMA WAVE',        stage: 'perrys',  day: 'Friday', start: '13:30', end: '15:00', genre: 'Techno' },
  { id: 'fri-per-3',  name: 'CIRCUIT BREAKER',    stage: 'perrys',  day: 'Friday', start: '16:00', end: '17:30', genre: 'House' },
  { id: 'fri-per-4',  name: 'DARK MATTER',        stage: 'perrys',  day: 'Friday', start: '18:30', end: '20:00', genre: 'EDM' },
  { id: 'fri-per-5',  name: 'FREQUENCY',          stage: 'perrys',  day: 'Friday', start: '21:00', end: '23:00', genre: 'Electronic', headliner: true },
  // T-Mobile
  { id: 'fri-tmo-1',  name: 'THE PAPER TIGERS',   stage: 'tmobile', day: 'Friday', start: '12:00', end: '13:00', genre: 'Indie Rock' },
  { id: 'fri-tmo-2',  name: 'GLASS ECHO',         stage: 'tmobile', day: 'Friday', start: '14:00', end: '15:00', genre: 'Indie' },
  { id: 'fri-tmo-3',  name: 'CHROME HEARTS',      stage: 'tmobile', day: 'Friday', start: '15:30', end: '16:30', genre: 'Alternative' },
  { id: 'fri-tmo-4',  name: 'GOLDEN STATIC',      stage: 'tmobile', day: 'Friday', start: '17:30', end: '19:00', genre: 'R&B' },
  // BMI
  { id: 'fri-bmi-1',  name: 'MORNING FOG',        stage: 'bmi',     day: 'Friday', start: '11:30', end: '12:30', genre: 'Ambient' },
  { id: 'fri-bmi-2',  name: 'THE RIVER WOLVES',   stage: 'bmi',     day: 'Friday', start: '13:00', end: '14:00', genre: 'Country' },
  { id: 'fri-bmi-3',  name: 'SATELLITE RAIN',     stage: 'bmi',     day: 'Friday', start: '15:00', end: '16:00', genre: 'Dream Pop' },
  { id: 'fri-bmi-4',  name: 'PINK THUNDER',       stage: 'bmi',     day: 'Friday', start: '17:00', end: '18:30', genre: 'Pop' },
  // Pepsi
  { id: 'fri-pep-1',  name: 'THE TAPE DECKS',     stage: 'pepsi',   day: 'Friday', start: '12:00', end: '13:00', genre: 'Punk' },
  { id: 'fri-pep-2',  name: 'FEVER DREAM',        stage: 'pepsi',   day: 'Friday', start: '14:30', end: '15:30', genre: 'Psychedelic' },
  { id: 'fri-pep-3',  name: 'OCEAN STATIC',       stage: 'pepsi',   day: 'Friday', start: '16:30', end: '18:00', genre: 'R&B' },
  { id: 'fri-pep-4',  name: 'THE VELVET HOURS',   stage: 'pepsi',   day: 'Friday', start: '19:00', end: '20:30', genre: 'Soul' },
  // Samsung
  { id: 'fri-sam-1',  name: 'PAPER CUTS',         stage: 'samsung', day: 'Friday', start: '11:00', end: '12:00', genre: 'Emo' },
  { id: 'fri-sam-2',  name: 'SUMMER STATIC',      stage: 'samsung', day: 'Friday', start: '13:30', end: '14:30', genre: 'Indie Pop' },
  { id: 'fri-sam-3',  name: 'THE GHOST PARADE',   stage: 'samsung', day: 'Friday', start: '16:00', end: '17:00', genre: 'Alt Rock' },
  { id: 'fri-sam-4',  name: 'NEON HIGHWAY',       stage: 'samsung', day: 'Friday', start: '18:30', end: '20:00', genre: 'Electronic Pop' },
]

// ─── SATURDAY ─────────────────────────────────────────────────────────────────
const SATURDAY = [
  // Grant Park Stage
  { id: 'sat-main-1', name: 'THUNDER ROAD',       stage: 'main',    day: 'Saturday', start: '11:00', end: '12:30', genre: 'Rock' },
  { id: 'sat-main-2', name: 'SATELLITE SOUL',     stage: 'main',    day: 'Saturday', start: '14:00', end: '15:30', genre: 'R&B/Soul' },
  { id: 'sat-main-3', name: 'THE WILD ONES',      stage: 'main',    day: 'Saturday', start: '17:30', end: '19:00', genre: 'Indie' },
  { id: 'sat-main-4', name: 'PHANTOM DRIVE',      stage: 'main',    day: 'Saturday', start: '20:00', end: '22:00', genre: 'Alternative', headliner: true },
  // Perry's
  { id: 'sat-per-1',  name: 'WARP SPEED',         stage: 'perrys',  day: 'Saturday', start: '11:00', end: '12:00', genre: 'Electronic' },
  { id: 'sat-per-2',  name: 'LASER GRID',         stage: 'perrys',  day: 'Saturday', start: '13:00', end: '14:30', genre: 'Techno' },
  { id: 'sat-per-3',  name: 'ELECTRIC MAZE',      stage: 'perrys',  day: 'Saturday', start: '15:30', end: '17:00', genre: 'House' },
  { id: 'sat-per-4',  name: 'DIGITAL SUNRISE',    stage: 'perrys',  day: 'Saturday', start: '18:00', end: '20:00', genre: 'EDM' },
  { id: 'sat-per-5',  name: 'BASS PROTOCOL',      stage: 'perrys',  day: 'Saturday', start: '21:00', end: '23:00', genre: 'Electronic', headliner: true },
  // T-Mobile
  { id: 'sat-tmo-1',  name: 'THE PAPER LANTERNS', stage: 'tmobile', day: 'Saturday', start: '12:00', end: '13:00', genre: 'Dream Pop' },
  { id: 'sat-tmo-2',  name: 'STRANGE WEATHER',    stage: 'tmobile', day: 'Saturday', start: '14:30', end: '15:30', genre: 'Hip-Hop' },
  { id: 'sat-tmo-3',  name: 'VELVET SIGNAL',      stage: 'tmobile', day: 'Saturday', start: '16:30', end: '18:00', genre: 'Shoegaze' },
  { id: 'sat-tmo-4',  name: 'COPPER SUN',         stage: 'tmobile', day: 'Saturday', start: '19:00', end: '20:30', genre: 'R&B' },
  // BMI
  { id: 'sat-bmi-1',  name: 'MORNING THUNDER',    stage: 'bmi',     day: 'Saturday', start: '11:30', end: '12:30', genre: 'Country' },
  { id: 'sat-bmi-2',  name: 'THE COASTAL WOLVES', stage: 'bmi',     day: 'Saturday', start: '13:30', end: '14:30', genre: 'Folk' },
  { id: 'sat-bmi-3',  name: 'RADIO SILENCE',      stage: 'bmi',     day: 'Saturday', start: '15:30', end: '16:30', genre: 'Indie Pop' },
  { id: 'sat-bmi-4',  name: 'ELECTRIC HEARTS',    stage: 'bmi',     day: 'Saturday', start: '17:30', end: '19:00', genre: 'Synth Pop' },
  // Pepsi
  { id: 'sat-pep-1',  name: 'THE RUNAWAYS',       stage: 'pepsi',   day: 'Saturday', start: '12:30', end: '13:30', genre: 'Punk Rock' },
  { id: 'sat-pep-2',  name: 'MIDNIGHT SUN',       stage: 'pepsi',   day: 'Saturday', start: '15:00', end: '16:00', genre: 'Alternative' },
  { id: 'sat-pep-3',  name: 'GOLDEN HOUR',        stage: 'pepsi',   day: 'Saturday', start: '17:00', end: '18:30', genre: 'Soul' },
  { id: 'sat-pep-4',  name: 'NIGHT DRIVE',        stage: 'pepsi',   day: 'Saturday', start: '19:30', end: '21:00', genre: 'Electronic Pop' },
  // Samsung
  { id: 'sat-sam-1',  name: 'STATIC HIGHWAY',     stage: 'samsung', day: 'Saturday', start: '11:00', end: '12:00', genre: 'Indie Rock' },
  { id: 'sat-sam-2',  name: 'PAPER MOON',         stage: 'samsung', day: 'Saturday', start: '13:00', end: '14:00', genre: 'Folk Pop' },
  { id: 'sat-sam-3',  name: 'THE VOID',           stage: 'samsung', day: 'Saturday', start: '16:00', end: '17:00', genre: 'Experimental' },
  { id: 'sat-sam-4',  name: 'CHROME SUNSET',      stage: 'samsung', day: 'Saturday', start: '18:30', end: '20:00', genre: 'R&B' },
]

// ─── SUNDAY ───────────────────────────────────────────────────────────────────
const SUNDAY = [
  // Grant Park Stage
  { id: 'sun-main-1', name: 'THE BURNING FIELDS', stage: 'main',    day: 'Sunday', start: '11:00', end: '12:30', genre: 'Alt Country' },
  { id: 'sun-main-2', name: 'GLASS WALLS',        stage: 'main',    day: 'Sunday', start: '14:00', end: '15:30', genre: 'Indie Pop' },
  { id: 'sun-main-3', name: 'ELECTRIC STORM',     stage: 'main',    day: 'Sunday', start: '17:30', end: '19:00', genre: 'Rock' },
  { id: 'sun-main-4', name: 'SOLAR WIND',         stage: 'main',    day: 'Sunday', start: '20:00', end: '22:00', genre: 'Pop', headliner: true },
  // Perry's
  { id: 'sun-per-1',  name: 'PHASE SHIFT',        stage: 'perrys',  day: 'Sunday', start: '11:00', end: '12:00', genre: 'Ambient Electronic' },
  { id: 'sun-per-2',  name: 'DEEP CURRENT',       stage: 'perrys',  day: 'Sunday', start: '13:00', end: '14:30', genre: 'Techno' },
  { id: 'sun-per-3',  name: 'SPARK ENGINE',       stage: 'perrys',  day: 'Sunday', start: '15:30', end: '17:00', genre: 'House' },
  { id: 'sun-per-4',  name: 'NEURAL DRIFT',       stage: 'perrys',  day: 'Sunday', start: '18:00', end: '20:00', genre: 'EDM' },
  { id: 'sun-per-5',  name: 'BASS HORIZON',       stage: 'perrys',  day: 'Sunday', start: '21:00', end: '23:00', genre: 'Electronic', headliner: true },
  // T-Mobile
  { id: 'sun-tmo-1',  name: 'THE SIGNAL',         stage: 'tmobile', day: 'Sunday', start: '12:00', end: '13:00', genre: 'Indie Rock' },
  { id: 'sun-tmo-2',  name: 'GOLDEN WOLVES',      stage: 'tmobile', day: 'Sunday', start: '14:30', end: '15:30', genre: 'Hip-Hop' },
  { id: 'sun-tmo-3',  name: 'STATIC BLOOM',       stage: 'tmobile', day: 'Sunday', start: '16:30', end: '18:00', genre: 'Alt R&B' },
  { id: 'sun-tmo-4',  name: 'MIDNIGHT ECHO',      stage: 'tmobile', day: 'Sunday', start: '19:00', end: '20:30', genre: 'Soul' },
  // BMI
  { id: 'sun-bmi-1',  name: 'THE FOLK MACHINE',   stage: 'bmi',     day: 'Sunday', start: '11:30', end: '12:30', genre: 'Folk' },
  { id: 'sun-bmi-2',  name: 'PAPER LANTERNS',     stage: 'bmi',     day: 'Sunday', start: '13:30', end: '14:30', genre: 'Singer-Songwriter' },
  { id: 'sun-bmi-3',  name: 'ELECTRIC BLISS',     stage: 'bmi',     day: 'Sunday', start: '15:30', end: '16:30', genre: 'Pop' },
  { id: 'sun-bmi-4',  name: 'NEON COAST',         stage: 'bmi',     day: 'Sunday', start: '17:30', end: '19:00', genre: 'Synth Pop' },
  // Pepsi
  { id: 'sun-pep-1',  name: 'SHATTER POINT',      stage: 'pepsi',   day: 'Sunday', start: '12:30', end: '13:30', genre: 'Post-Punk' },
  { id: 'sun-pep-2',  name: 'THE GOLDEN AGE',     stage: 'pepsi',   day: 'Sunday', start: '15:00', end: '16:00', genre: 'Alternative' },
  { id: 'sun-pep-3',  name: 'RHYTHM MACHINE',     stage: 'pepsi',   day: 'Sunday', start: '17:00', end: '18:30', genre: 'Funk' },
  { id: 'sun-pep-4',  name: 'DIGITAL HEARTS',     stage: 'pepsi',   day: 'Sunday', start: '19:30', end: '21:00', genre: 'Electronic Pop' },
  // Samsung
  { id: 'sun-sam-1',  name: 'STATIC DREAMS',      stage: 'samsung', day: 'Sunday', start: '11:00', end: '12:00', genre: 'Lo-Fi' },
  { id: 'sun-sam-2',  name: 'THE PAPER ROUTE',    stage: 'samsung', day: 'Sunday', start: '13:00', end: '14:00', genre: 'Indie' },
  { id: 'sun-sam-3',  name: 'COPPER WIRE',        stage: 'samsung', day: 'Sunday', start: '16:00', end: '17:00', genre: 'Garage Rock' },
  { id: 'sun-sam-4',  name: 'SATELLITE STATIC',   stage: 'samsung', day: 'Sunday', start: '18:30', end: '20:00', genre: 'Alternative' },
]

export const PERFORMERS = [...THURSDAY, ...FRIDAY, ...SATURDAY, ...SUNDAY]

// helpers
export function getPerformerById(id) {
  return PERFORMERS.find(p => p.id === id)
}

export function getStageById(id) {
  return STAGES.find(s => s.id === id)
}

export function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function overlaps(a, b) {
  const aStart = timeToMinutes(a.start)
  const aEnd   = timeToMinutes(a.end)
  const bStart = timeToMinutes(b.start)
  const bEnd   = timeToMinutes(b.end)
  return aStart < bEnd && bStart < aEnd
}

export function formatTime(t) {
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour   = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${hour}${m > 0 ? `:${String(m).padStart(2, '0')}` : ''}${period}`
}
