export const weekDays = [
  'M', 'T', 'W', 'T', 'F', 'S', 'S'
]

if (!localStorage.habits) {
  localStorage.habits = JSON.stringify([
    {
      id: 0,
      name: 'No caffeine',
      completed: [true, false, true, false, false, false, false]
    }
  ])
}

if (!localStorage.theme) localStorage.theme = 'dark_mode'

export const setHabits = (habitsArr) => habits = habitsArr

export const updateLocalStorage = () => {
  localStorage.habits = JSON.stringify([...habits])
  habits = JSON.parse(localStorage.habits)
}

export let habits = JSON.parse(localStorage.habits)

const date = new Date() //стандартное форматирование
//2023-08-29T14:47:07.820Z
export let today = date.toDateString().split(' ')

const getTodayDayIndex = (dayName) => {
  switch (dayName) {
    case 'Mon': return 0
    case 'Tue': return 1
    case 'Wed': return 2
    case 'Thu': return 3
    case 'Fri': return 4
    case 'Sat': return 5
    case 'Sun': return 6
    default: return
  }
}

export const todayDayIndex = getTodayDayIndex(today[0])