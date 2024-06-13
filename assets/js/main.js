import { createError } from './creator.js'
import { habits, today, todayDayIndex, updateLocalStorage, weekDays } from './data.js'

// ######################################################################################
const progressBar = document.getElementById('progress-bar')
const progressPercents = document.getElementById('percents')
const habitsContainer = document.getElementById('habits')
const todayDate = document.getElementById('today-date')
const goalsCompleted = document.getElementById('goalsCompleted')
const addHabit = document.getElementById('addHabit')

const addHabitForm = document.getElementById('form')
const habitName = document.getElementById('habit-name')
const addNewHabit = document.getElementById('addNewHabit')

let goalsAmount = 0
let goalsCompletedAmount = 0

// ######################################################################################
const updateProgressBar = (percents) => {
  progressBar.style.background =
    `radial-gradient(closest-side, rgb(39 39 42) 75%, 
  transparent 80% 100%), conic-gradient(rgb(244 244 245) ${percents}%, rgb(63 63 70) 0)`
  progressPercents.innerText =
    `${percents ? percents : 0}%`
}

const updateTodayDate = (today) => todayDate.innerText = `${today[0]}, ${today[2]}`

const updateHabits = () => habitsContainer.innerHTML = habits.map((habit, index) => getHabit(habit, index)).join('')

const updateGoalsCompleted = () => {
  goalsAmount = 0
  goalsCompletedAmount = 0
  document.querySelectorAll('.day').forEach(element => {
    if (element.classList.contains('todayDay')) {
      // toggleHabit(element.innerText)
      element.addEventListener('click', () => toggleHabit(element.parentNode.parentNode.outerText.split('\n')[0]))
      goalsAmount += 1
      if (element.classList.contains('checked')) goalsCompletedAmount += 1
    }
  })
  goalsCompleted.innerText = `${goalsCompletedAmount}/${goalsAmount}`
}

const getWeekDays = (completed) => weekDays.map((day, index) =>
  `<li class="day 
    ${completed[index] ? 'checked' : ''} 
    ${index == todayDayIndex ? 'todayDay' : ''}"
    >
    ${day}
  </li>`)

const getHabit = ({ name, completed }) => `
  <div class="habit">
    <h2>${name}</h2>
    <ul class="habit-days">
      ${getWeekDays(completed).join('')}
    </ul>
  </div >
  `

const toggleHabit = (name) => {
  habits.map(habit => {
    if (habit.name == name) {
      habit.completed[todayDayIndex] = !habit.completed[todayDayIndex]
      habit.completed[todayDayIndex] ? habit.daysCompleted += 1 : habit.daysCompleted -= 1
    }
  })
  updateTracker()
}


addHabit.addEventListener('click', () => {
  window.scrollTo(0, 0)
  addHabitForm.classList.add('openForm')
  document.body.style.overflow = "hidden"
})

document.getElementById('wrapper').addEventListener('click', () => {
  addHabitForm.classList.remove('openForm')
  document.body.style.overflow = "auto"
  habitName.value = ''
})

addNewHabit.addEventListener('click', () => {
  const value = habitName.value
  if (!value) {
    createError('Habit name is required!')
  }
  else if (habits.length >= 10) {
    createError('We recommend do not provide more then 10 habits in one time')
  }
  else {
    habits.push({
      id: habits.length ? habits[habits.length - 1].id + 1 : 0,
      name: value,
      completed: [false, false, false, false, false, false, false],
      daysCompleted: 0
    })
    updateTracker()
    addHabitForm.classList.toggle('openForm')
    document.body.style.overflow = "auto"
    habitName.value = ''
  }
})


const updateTheme = () => {
  localStorage.theme == 'dark_mode' ? '' : document.body.classList.add('light_mode')
}


const updateTracker = () => {
  updateLocalStorage()
  updateHabits()
  updateGoalsCompleted()
  updateProgressBar(Math.round(goalsCompletedAmount * 100 / goalsAmount))
  updateTodayDate(today)
}


window.addEventListener('load', () => {
  updateTracker()
  updateProgressBar(Math.round(goalsCompletedAmount * 100 / goalsAmount))
  updateTheme()
}, false)
