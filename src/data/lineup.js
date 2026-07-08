export const STAGES = [
  { id: 'tmobile',  name: 'T-Mobile',   shortName: 'T-MOBILE',  color: '#FF006E' },
  { id: 'perrys',   name: "Perry's",    shortName: "PERRY'S",   color: '#8338EC' },
  { id: 'allianz',  name: 'Allianz',    shortName: 'ALLIANZ',   color: '#00C2FF' },
  { id: 'bmi',      name: 'BMI',        shortName: 'BMI',       color: '#06D6A0' },
  { id: 'airbnb',   name: 'Airbnb',     shortName: 'AIRBNB',    color: '#FFBE0B' },
  { id: 'titos',    name: "Tito's",     shortName: "TITO'S",    color: '#FB5607' },
  { id: 'budlight', name: 'Bud Light',  shortName: 'BUD LIGHT', color: '#FF9F1C' },
]

export const DAYS = ['Thursday', 'Friday', 'Saturday', 'Sunday']

export const DAY_DATES = {
  Thursday: 'Jul 30',
  Friday:   'Jul 31',
  Saturday: 'Aug 1',
  Sunday:   'Aug 2',
}

// ─── THURSDAY (Jul 30) ────────────────────────────────────────────────────────
const THURSDAY = [
  // T-Mobile
  { id: 'thu-tmo-1', name: 'Asha Banks',          stage: 'tmobile',  day: 'Thursday', start: '12:45', end: '13:30' },
  { id: 'thu-tmo-2', name: 'Haute & Freddy',       stage: 'tmobile',  day: 'Thursday', start: '14:30', end: '15:30' },
  { id: 'thu-tmo-3', name: '5 Seconds of Summer',  stage: 'tmobile',  day: 'Thursday', start: '16:30', end: '17:30' },
  { id: 'thu-tmo-4', name: 'Sombr',                stage: 'tmobile',  day: 'Thursday', start: '18:30', end: '19:30' },
  { id: 'thu-tmo-5', name: 'Lorde',                stage: 'tmobile',  day: 'Thursday', start: '20:30', end: '22:00', headliner: true },
  // Perry's
  { id: 'thu-per-1', name: 'KLO',                  stage: 'perrys',   day: 'Thursday', start: '12:00', end: '12:30' },
  { id: 'thu-per-2', name: 'Know Good',             stage: 'perrys',   day: 'Thursday', start: '12:45', end: '13:30' },
  { id: 'thu-per-3', name: 'Devault',               stage: 'perrys',   day: 'Thursday', start: '13:45', end: '14:45' },
  { id: 'thu-per-4', name: 'MPH',                   stage: 'perrys',   day: 'Thursday', start: '15:00', end: '16:00' },
  { id: 'thu-per-5', name: 'Boys Noize',            stage: 'perrys',   day: 'Thursday', start: '16:15', end: '17:15' },
  { id: 'thu-per-6', name: 'Boris Brejcha',         stage: 'perrys',   day: 'Thursday', start: '17:45', end: '18:45' },
  { id: 'thu-per-7', name: 'Kettama',               stage: 'perrys',   day: 'Thursday', start: '19:00', end: '20:00' },
  { id: 'thu-per-8', name: 'Worship',               stage: 'perrys',   day: 'Thursday', start: '20:30', end: '21:45', headliner: true },
  // Allianz
  { id: 'thu-all-1', name: 'Pearly Drops',          stage: 'allianz',  day: 'Thursday', start: '12:00', end: '12:45' },
  { id: 'thu-all-2', name: 'Bad Nerves',             stage: 'allianz',  day: 'Thursday', start: '13:30', end: '14:30' },
  { id: 'thu-all-3', name: 'SB19',                   stage: 'allianz',  day: 'Thursday', start: '15:30', end: '16:30' },
  { id: 'thu-all-4', name: 'Audrey Hobert',          stage: 'allianz',  day: 'Thursday', start: '17:30', end: '18:30' },
  { id: 'thu-all-5', name: 'Wet Leg',                stage: 'allianz',  day: 'Thursday', start: '19:30', end: '20:30' },
  // BMI
  { id: 'thu-bmi-1', name: 'The Braymores',          stage: 'bmi',      day: 'Thursday', start: '13:00', end: '13:40' },
  { id: 'thu-bmi-2', name: 'Simon Grossmann',        stage: 'bmi',      day: 'Thursday', start: '14:10', end: '14:50' },
  { id: 'thu-bmi-3', name: 'Elizabeth Nichols',      stage: 'bmi',      day: 'Thursday', start: '15:20', end: '16:00' },
  { id: 'thu-bmi-4', name: 'Bella Kay',              stage: 'bmi',      day: 'Thursday', start: '16:30', end: '17:10' },
  { id: 'thu-bmi-5', name: 'Chalk',                  stage: 'bmi',      day: 'Thursday', start: '17:40', end: '18:20' },
  { id: 'thu-bmi-6', name: 'Evening Elephants',      stage: 'bmi',      day: 'Thursday', start: '18:50', end: '19:30' },
  // Airbnb
  { id: 'thu-air-1', name: 'Kim Theory',             stage: 'airbnb',   day: 'Thursday', start: '12:00', end: '12:30' },
  { id: 'thu-air-2', name: 'Penelope Road',          stage: 'airbnb',   day: 'Thursday', start: '12:50', end: '13:30' },
  { id: 'thu-air-3', name: 'Marlon Funaki',          stage: 'airbnb',   day: 'Thursday', start: '13:50', end: '14:30' },
  { id: 'thu-air-4', name: 'Ecca Vandal',            stage: 'airbnb',   day: 'Thursday', start: '14:50', end: '15:30' },
  { id: 'thu-air-5', name: 'Ninajirachi',            stage: 'airbnb',   day: 'Thursday', start: '16:00', end: '16:45' },
  { id: 'thu-air-6', name: 'Amble',                  stage: 'airbnb',   day: 'Thursday', start: '17:15', end: '18:00' },
  { id: 'thu-air-7', name: 'CMAT',                   stage: 'airbnb',   day: 'Thursday', start: '18:30', end: '19:15' },
  { id: 'thu-air-8', name: 'Snow Strippers',         stage: 'airbnb',   day: 'Thursday', start: '19:45', end: '20:30' },
  { id: 'thu-air-9', name: 'Viagra Boys',            stage: 'airbnb',   day: 'Thursday', start: '21:00', end: '22:00' },
  // Tito's
  { id: 'thu-tit-1', name: 'Faouzia',                stage: 'titos',    day: 'Thursday', start: '12:15', end: '13:00' },
  { id: 'thu-tit-2', name: 'Kingfishr',              stage: 'titos',    day: 'Thursday', start: '13:45', end: '14:45' },
  { id: 'thu-tit-3', name: 'Paris Paloma',           stage: 'titos',    day: 'Thursday', start: '15:45', end: '16:45' },
  { id: 'thu-tit-4', name: 'Little Simz',            stage: 'titos',    day: 'Thursday', start: '17:45', end: '18:45' },
  { id: 'thu-tit-5', name: 'Devault',                stage: 'titos',    day: 'Thursday', start: '19:45', end: '20:30' },
  // Bud Light
  { id: 'thu-bud-1', name: 'Bixby',                  stage: 'budlight', day: 'Thursday', start: '13:00', end: '13:45' },
  { id: 'thu-bud-2', name: 'Between Friends',        stage: 'budlight', day: 'Thursday', start: '14:45', end: '15:45' },
  { id: 'thu-bud-3', name: 'Blood Orange',           stage: 'budlight', day: 'Thursday', start: '16:45', end: '17:45' },
  { id: 'thu-bud-4', name: 'Empire of the Sun',      stage: 'budlight', day: 'Thursday', start: '18:45', end: '19:45' },
  { id: 'thu-bud-5', name: 'John Summit',            stage: 'budlight', day: 'Thursday', start: '20:30', end: '22:00', headliner: true },
]

// ─── FRIDAY (Jul 31) ──────────────────────────────────────────────────────────
const FRIDAY = [
  // T-Mobile
  { id: 'fri-tmo-1', name: 'Partyof2',              stage: 'tmobile',  day: 'Friday', start: '12:55', end: '13:40' },
  { id: 'fri-tmo-2', name: 'I-DLE',                 stage: 'tmobile',  day: 'Friday', start: '14:40', end: '15:40' },
  { id: 'fri-tmo-3', name: 'Zara Larsson',          stage: 'tmobile',  day: 'Friday', start: '16:40', end: '17:40' },
  { id: 'fri-tmo-4', name: 'Lil Uzi Vert',          stage: 'tmobile',  day: 'Friday', start: '18:40', end: '19:40' },
  { id: 'fri-tmo-5', name: 'Charli XCX',            stage: 'tmobile',  day: 'Friday', start: '20:40', end: '22:00', headliner: true },
  // Perry's
  { id: 'fri-per-1', name: 'Bradeazy',              stage: 'perrys',   day: 'Friday', start: '12:00', end: '12:30' },
  { id: 'fri-per-2', name: 'Avello',                stage: 'perrys',   day: 'Friday', start: '12:45', end: '13:30' },
  { id: 'fri-per-3', name: 'Lyny',                  stage: 'perrys',   day: 'Friday', start: '13:45', end: '14:45' },
  { id: 'fri-per-4', name: 'Róz',                   stage: 'perrys',   day: 'Friday', start: '15:00', end: '16:00' },
  { id: 'fri-per-5', name: 'Notion',                stage: 'perrys',   day: 'Friday', start: '16:15', end: '17:15' },
  { id: 'fri-per-6', name: 'Sidepiece',             stage: 'perrys',   day: 'Friday', start: '17:45', end: '18:45' },
  { id: 'fri-per-7', name: 'Mustard',               stage: 'perrys',   day: 'Friday', start: '19:00', end: '20:00' },
  { id: 'fri-per-8', name: 'Major Lazer',           stage: 'perrys',   day: 'Friday', start: '20:30', end: '21:45', headliner: true },
  // Allianz
  { id: 'fri-all-1', name: 'The Army, The Navy',    stage: 'allianz',  day: 'Friday', start: '12:10', end: '12:55' },
  { id: 'fri-all-2', name: 'Claire Rosinkranz',     stage: 'allianz',  day: 'Friday', start: '13:40', end: '14:40' },
  { id: 'fri-all-3', name: 'Skye Newman',           stage: 'allianz',  day: 'Friday', start: '15:40', end: '16:40' },
  { id: 'fri-all-4', name: 'Suki Waterhouse',       stage: 'allianz',  day: 'Friday', start: '17:40', end: '18:40' },
  { id: 'fri-all-5', name: 'Not for Radio',         stage: 'allianz',  day: 'Friday', start: '19:40', end: '20:40' },
  // BMI
  { id: 'fri-bmi-1', name: 'Whitney Whitney',       stage: 'bmi',      day: 'Friday', start: '12:00', end: '12:30' },
  { id: 'fri-bmi-2', name: 'Valencia Grace',        stage: 'bmi',      day: 'Friday', start: '13:00', end: '13:40' },
  { id: 'fri-bmi-3', name: 'Ella Boh',              stage: 'bmi',      day: 'Friday', start: '14:10', end: '14:50' },
  { id: 'fri-bmi-4', name: 'Emi Grace',             stage: 'bmi',      day: 'Friday', start: '15:20', end: '16:00' },
  { id: 'fri-bmi-5', name: 'IVRI',                  stage: 'bmi',      day: 'Friday', start: '16:30', end: '17:10' },
  { id: 'fri-bmi-6', name: 'Ella Red',              stage: 'bmi',      day: 'Friday', start: '17:40', end: '18:20' },
  { id: 'fri-bmi-7', name: 'Paloma Morphy',         stage: 'bmi',      day: 'Friday', start: '18:50', end: '19:30' },
  // Airbnb
  { id: 'fri-air-1', name: 'Beno',                  stage: 'airbnb',   day: 'Friday', start: '12:00', end: '12:30' },
  { id: 'fri-air-2', name: 'Day We Ran',            stage: 'airbnb',   day: 'Friday', start: '12:50', end: '13:30' },
  { id: 'fri-air-3', name: 'Love Spells',           stage: 'airbnb',   day: 'Friday', start: '13:50', end: '14:30' },
  { id: 'fri-air-4', name: '54 Ultra',              stage: 'airbnb',   day: 'Friday', start: '14:50', end: '15:30' },
  { id: 'fri-air-5', name: 'Finn Wolfhard',         stage: 'airbnb',   day: 'Friday', start: '16:00', end: '16:45' },
  { id: 'fri-air-6', name: 'Oklou',                 stage: 'airbnb',   day: 'Friday', start: '17:30', end: '18:15' },
  { id: 'fri-air-7', name: 'Slayyyter',             stage: 'airbnb',   day: 'Friday', start: '18:45', end: '19:30' },
  { id: 'fri-air-8', name: 'Horseghrl',             stage: 'airbnb',   day: 'Friday', start: '20:00', end: '20:45' },
  { id: 'fri-air-9', name: 'Freddie Gibbs',         stage: 'airbnb',   day: 'Friday', start: '21:15', end: '22:00' },
  // Tito's
  { id: 'fri-tit-1', name: 'Chicago Made',          stage: 'titos',    day: 'Friday', start: '12:15', end: '13:00' },
  { id: 'fri-tit-2', name: 'Julia Wolf',            stage: 'titos',    day: 'Friday', start: '13:45', end: '14:30' },
  { id: 'fri-tit-3', name: 'Mother Mother',         stage: 'titos',    day: 'Friday', start: '15:30', end: '16:30' },
  { id: 'fri-tit-4', name: 'Loathe',                stage: 'titos',    day: 'Friday', start: '17:30', end: '18:30' },
  { id: 'fri-tit-5', name: 'Nettspend',             stage: 'titos',    day: 'Friday', start: '19:30', end: '20:30' },
  // Bud Light
  { id: 'fri-bud-1', name: 'High Vis',              stage: 'budlight', day: 'Friday', start: '13:00', end: '13:45' },
  { id: 'fri-bud-2', name: 'Balu Brigada',          stage: 'budlight', day: 'Friday', start: '14:30', end: '15:30' },
  { id: 'fri-bud-3', name: 'The Story So Far',      stage: 'budlight', day: 'Friday', start: '16:30', end: '17:30' },
  { id: 'fri-bud-4', name: 'Yungblud',              stage: 'budlight', day: 'Friday', start: '18:30', end: '19:30' },
  { id: 'fri-bud-5', name: 'The Smashing Pumpkins', stage: 'budlight', day: 'Friday', start: '20:30', end: '22:00', headliner: true },
]

// ─── SATURDAY (Aug 1) ─────────────────────────────────────────────────────────
const SATURDAY = [
  // T-Mobile
  { id: 'sat-tmo-1', name: 'Lucy Bedroque',         stage: 'tmobile',  day: 'Saturday', start: '13:10', end: '13:55' },
  { id: 'sat-tmo-2', name: 'Cortis',                stage: 'tmobile',  day: 'Saturday', start: '14:55', end: '15:45' },
  { id: 'sat-tmo-3', name: 'Leon Thomas',           stage: 'tmobile',  day: 'Saturday', start: '16:30', end: '17:30' },
  { id: 'sat-tmo-4', name: 'The Neighbourhood',     stage: 'tmobile',  day: 'Saturday', start: '18:30', end: '19:30' },
  { id: 'sat-tmo-5', name: 'Olivia Dean',           stage: 'tmobile',  day: 'Saturday', start: '20:30', end: '22:00', headliner: true },
  // Perry's
  { id: 'sat-per-1', name: 'Peace Control',         stage: 'perrys',   day: 'Saturday', start: '12:00', end: '12:30' },
  { id: 'sat-per-2', name: 'MC4D',                  stage: 'perrys',   day: 'Saturday', start: '12:45', end: '13:30' },
  { id: 'sat-per-3', name: 'Omnom',                 stage: 'perrys',   day: 'Saturday', start: '13:45', end: '14:45' },
  { id: 'sat-per-4', name: 'Ayybo',                 stage: 'perrys',   day: 'Saturday', start: '15:00', end: '16:00' },
  { id: 'sat-per-5', name: 'Whethan',               stage: 'perrys',   day: 'Saturday', start: '16:15', end: '17:15' },
  { id: 'sat-per-6', name: 'Max Styler',            stage: 'perrys',   day: 'Saturday', start: '17:45', end: '18:45' },
  { id: 'sat-per-7', name: 'Alison Wonderland',     stage: 'perrys',   day: 'Saturday', start: '19:00', end: '20:00' },
  { id: 'sat-per-8', name: 'Disco Lines',           stage: 'perrys',   day: 'Saturday', start: '20:30', end: '21:45', headliner: true },
  // Allianz
  { id: 'sat-all-1', name: 'Sunday (1994)',         stage: 'allianz',  day: 'Saturday', start: '12:25', end: '13:10' },
  { id: 'sat-all-2', name: 'Jim Legxacy',           stage: 'allianz',  day: 'Saturday', start: '13:55', end: '14:55' },
  { id: 'sat-all-3', name: 'Khamari',               stage: 'allianz',  day: 'Saturday', start: '15:45', end: '16:30' },
  { id: 'sat-all-4', name: 'Spacey Jane',           stage: 'allianz',  day: 'Saturday', start: '17:30', end: '18:30' },
  { id: 'sat-all-5', name: 'Geese',                 stage: 'allianz',  day: 'Saturday', start: '19:30', end: '20:30' },
  // BMI
  { id: 'sat-bmi-1', name: 'The Creekers',          stage: 'bmi',      day: 'Saturday', start: '13:00', end: '13:40' },
  { id: 'sat-bmi-2', name: 'Next of Kin',           stage: 'bmi',      day: 'Saturday', start: '14:10', end: '14:50' },
  { id: 'sat-bmi-3', name: 'Ink',                   stage: 'bmi',      day: 'Saturday', start: '15:20', end: '16:00' },
  { id: 'sat-bmi-4', name: 'Calder Allen',          stage: 'bmi',      day: 'Saturday', start: '16:30', end: '17:10' },
  { id: 'sat-bmi-5', name: 'Jae Stephens',          stage: 'bmi',      day: 'Saturday', start: '17:40', end: '18:20' },
  { id: 'sat-bmi-6', name: 'Ryman',                 stage: 'bmi',      day: 'Saturday', start: '18:50', end: '19:30' },
  // Airbnb
  { id: 'sat-air-1', name: 'Nat Myers',             stage: 'airbnb',   day: 'Saturday', start: '12:00', end: '12:30' },
  { id: 'sat-air-2', name: 'Villanelle',             stage: 'airbnb',   day: 'Saturday', start: '12:50', end: '13:30' },
  { id: 'sat-air-3', name: 'Die Spitz',             stage: 'airbnb',   day: 'Saturday', start: '13:50', end: '14:30' },
  { id: 'sat-air-4', name: 'Frost Children',        stage: 'airbnb',   day: 'Saturday', start: '14:50', end: '15:30' },
  { id: 'sat-air-5', name: 'Quadeca',               stage: 'airbnb',   day: 'Saturday', start: '16:00', end: '16:45' },
  { id: 'sat-air-6', name: 'Sienna Spiro',          stage: 'airbnb',   day: 'Saturday', start: '17:15', end: '18:00' },
  { id: 'sat-air-7', name: 'KWN',                   stage: 'airbnb',   day: 'Saturday', start: '18:30', end: '19:15' },
  { id: 'sat-air-8', name: 'Cameron Whitcomb',      stage: 'airbnb',   day: 'Saturday', start: '19:45', end: '20:30' },
  { id: 'sat-air-9', name: 'DJ Trixie Mattel',      stage: 'airbnb',   day: 'Saturday', start: '21:00', end: '22:00' },
  // Tito's
  { id: 'sat-tit-1', name: 'Chezile',               stage: 'titos',    day: 'Saturday', start: '12:45', end: '13:30' },
  { id: 'sat-tit-2', name: 'Goldie Boutilier',      stage: 'titos',    day: 'Saturday', start: '14:15', end: '15:15' },
  { id: 'sat-tit-3', name: 'Momma',                 stage: 'titos',    day: 'Saturday', start: '16:15', end: '17:15' },
  { id: 'sat-tit-4', name: 'BBNo$',                 stage: 'titos',    day: 'Saturday', start: '18:15', end: '19:15' },
  { id: 'sat-tit-5', name: 'Chicago Youth Symphony Orchestra', stage: 'titos', day: 'Saturday', start: '20:15', end: '21:00' },
  // Bud Light
  { id: 'sat-bud-1', name: 'Chace',                 stage: 'budlight', day: 'Saturday', start: '13:30', end: '14:15' },
  { id: 'sat-bud-2', name: 'Wolf Alice',            stage: 'budlight', day: 'Saturday', start: '15:15', end: '16:15' },
  { id: 'sat-bud-3', name: 'Clipse',                stage: 'budlight', day: 'Saturday', start: '17:15', end: '18:15' },
  { id: 'sat-bud-4', name: 'Ethel Cain',            stage: 'budlight', day: 'Saturday', start: '19:15', end: '20:15' },
  { id: 'sat-bud-5', name: 'Jennie',                stage: 'budlight', day: 'Saturday', start: '21:00', end: '22:00', headliner: true },
]

// ─── SUNDAY (Aug 2) ───────────────────────────────────────────────────────────
const SUNDAY = [
  // T-Mobile
  { id: 'sun-tmo-1', name: 'New Constellations',    stage: 'tmobile',  day: 'Sunday', start: '13:15', end: '14:00' },
  { id: 'sun-tmo-2', name: 'Adéla',                 stage: 'tmobile',  day: 'Sunday', start: '15:00', end: '15:45' },
  { id: 'sun-tmo-3', name: 'Muna',                  stage: 'tmobile',  day: 'Sunday', start: '16:45', end: '17:45' },
  { id: 'sun-tmo-4', name: 'Beabadoobee',           stage: 'tmobile',  day: 'Sunday', start: '18:45', end: '19:45' },
  { id: 'sun-tmo-5', name: 'Tate McRae',            stage: 'tmobile',  day: 'Sunday', start: '20:45', end: '22:00', headliner: true },
  // Perry's
  { id: 'sun-per-1', name: 'Zack Martino',          stage: 'perrys',   day: 'Sunday', start: '12:00', end: '12:30' },
  { id: 'sun-per-2', name: 'Jackie Hollander',      stage: 'perrys',   day: 'Sunday', start: '12:45', end: '13:30' },
  { id: 'sun-per-3', name: 'Westend',               stage: 'perrys',   day: 'Sunday', start: '13:45', end: '14:45' },
  { id: 'sun-per-4', name: 'Riordan',               stage: 'perrys',   day: 'Sunday', start: '15:00', end: '16:00' },
  { id: 'sun-per-5', name: 'Dombresky',             stage: 'perrys',   day: 'Sunday', start: '16:15', end: '17:15' },
  { id: 'sun-per-6', name: 'Duke Dumont',           stage: 'perrys',   day: 'Sunday', start: '17:45', end: '18:45' },
  { id: 'sun-per-7', name: 'Eli Brown',             stage: 'perrys',   day: 'Sunday', start: '19:00', end: '20:00' },
  { id: 'sun-per-8', name: 'The Chainsmokers',      stage: 'perrys',   day: 'Sunday', start: '20:30', end: '21:45', headliner: true },
  // Allianz
  { id: 'sun-all-1', name: 'Stella Lefty',          stage: 'allianz',  day: 'Sunday', start: '12:30', end: '13:15' },
  { id: 'sun-all-2', name: 'Destin Conrad',         stage: 'allianz',  day: 'Sunday', start: '14:00', end: '15:00' },
  { id: 'sun-all-3', name: 'Amber Mark',            stage: 'allianz',  day: 'Sunday', start: '15:45', end: '16:45' },
  { id: 'sun-all-4', name: 'Jade',                  stage: 'allianz',  day: 'Sunday', start: '17:45', end: '18:45' },
  { id: 'sun-all-5', name: 'Aespa',                 stage: 'allianz',  day: 'Sunday', start: '19:45', end: '20:45' },
  // BMI
  { id: 'sun-bmi-1', name: 'Snacktime',             stage: 'bmi',      day: 'Sunday', start: '13:00', end: '13:40' },
  { id: 'sun-bmi-2', name: 'Surfing for Daisy',     stage: 'bmi',      day: 'Sunday', start: '14:10', end: '14:50' },
  { id: 'sun-bmi-3', name: 'Case Oats',             stage: 'bmi',      day: 'Sunday', start: '15:20', end: '16:00' },
  { id: 'sun-bmi-4', name: 'Justine Skye',          stage: 'bmi',      day: 'Sunday', start: '16:30', end: '17:10' },
  { id: 'sun-bmi-5', name: 'Porch Light',           stage: 'bmi',      day: 'Sunday', start: '17:40', end: '18:20' },
  { id: 'sun-bmi-6', name: 'Will Swinton',          stage: 'bmi',      day: 'Sunday', start: '18:50', end: '19:30' },
  // Airbnb
  { id: 'sun-air-1', name: 'Sunshine',              stage: 'airbnb',   day: 'Sunday', start: '12:00', end: '12:30' },
  { id: 'sun-air-2', name: 'The Bends',             stage: 'airbnb',   day: 'Sunday', start: '12:50', end: '13:30' },
  { id: 'sun-air-3', name: 'After',                 stage: 'airbnb',   day: 'Sunday', start: '13:50', end: '14:30' },
  { id: 'sun-air-4', name: 'Water from Your Eyes',  stage: 'airbnb',   day: 'Sunday', start: '14:50', end: '15:30' },
  { id: 'sun-air-5', name: 'Inji',                  stage: 'airbnb',   day: 'Sunday', start: '16:00', end: '16:45' },
  { id: 'sun-air-6', name: 'Los Retros',            stage: 'airbnb',   day: 'Sunday', start: '17:15', end: '18:00' },
  { id: 'sun-air-7', name: 'Monaleo',               stage: 'airbnb',   day: 'Sunday', start: '18:30', end: '19:15' },
  { id: 'sun-air-8', name: 'Fakemink',              stage: 'airbnb',   day: 'Sunday', start: '19:45', end: '20:30' },
  { id: 'sun-air-9', name: 'Ado',                   stage: 'airbnb',   day: 'Sunday', start: '21:15', end: '22:00' },
  // Tito's
  { id: 'sun-tit-1', name: 'Easy Honey',            stage: 'titos',    day: 'Sunday', start: '12:45', end: '13:30' },
  { id: 'sun-tit-2', name: 'Cruz Beckham & The Breakers', stage: 'titos', day: 'Sunday', start: '14:15', end: '15:00' },
  { id: 'sun-tit-3', name: 'Wunderhorse',           stage: 'titos',    day: 'Sunday', start: '16:00', end: '17:00' },
  { id: 'sun-tit-4', name: 'Hot Mulligan',          stage: 'titos',    day: 'Sunday', start: '18:00', end: '19:00' },
  { id: 'sun-tit-5', name: 'Vandelux',              stage: 'titos',    day: 'Sunday', start: '20:00', end: '20:45' },
  // Bud Light
  { id: 'sun-bud-1', name: 'Whatmore',              stage: 'budlight', day: 'Sunday', start: '13:30', end: '14:15' },
  { id: 'sun-bud-2', name: 'Waylon Wyatt',          stage: 'budlight', day: 'Sunday', start: '15:00', end: '16:00' },
  { id: 'sun-bud-3', name: 'Yoasobi',               stage: 'budlight', day: 'Sunday', start: '17:00', end: '18:00' },
  { id: 'sun-bud-4', name: 'Turnstile',             stage: 'budlight', day: 'Sunday', start: '19:00', end: '20:00' },
  { id: 'sun-bud-5', name: 'The xx',                stage: 'budlight', day: 'Sunday', start: '20:45', end: '22:00', headliner: true },
]

export const PERFORMERS = [...THURSDAY, ...FRIDAY, ...SATURDAY, ...SUNDAY]

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
